import { AxiosError } from "axios";
import { ArrowLeftRight, Clipboard, LockKeyhole, Trash2, UnlockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import { ActionButton } from "../components/ActionButton";
import { CopyToast } from "../components/CopyToast";
import { ErrorMessage } from "../components/ErrorMessage";
import { PageHeader } from "../components/PageHeader";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextAreaField } from "../components/TextAreaField";
import { ToolMetadataCard } from "../components/ToolMetadataCard";
import { ToolPanel } from "../components/ToolPanel";
import { ToolStatusCard, type ToolStatusTone } from "../components/ToolStatusCard";

type Base64Action = "encode" | "decode";
type Base64Status = "idle" | "pending" | "success" | "invalid";

const statusConfig = {
  idle: { label: "Aguardando texto", tone: "idle" },
  pending: { label: "Alterações pendentes", tone: "pending" },
  success: { label: "Processado com sucesso", tone: "success" },
  invalid: { label: "Entrada inválida", tone: "error" },
} satisfies Record<Base64Status, { label: string; tone: ToolStatusTone }>;

export function Base64Page() {
  const [input, setInput] = useState("ERP Toolkit");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState("");
  const [status, setStatus] = useState<Base64Status>("idle");
  const [hasProcessed, setHasProcessed] = useState(false);
  const [processingTimeMs, setProcessingTimeMs] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const hasInput = input.length > 0;
  const canRunAction = hasInput && !isLoading;
  const currentStatus = statusConfig[status];

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function changeInput(value: string) {
    setInput(value);
    setToast("");
    if (hasProcessed) {
      setStatus("pending");
      setSuccess("");
    }
  }

  async function run(action: Base64Action) {
    if (!hasInput) return;
    setIsLoading(true);
    setError("");
    setSuccess("");
    setToast("");
    const startedAt = performance.now();

    try {
      const { data } = await api.post<{ result: string }>(`/api/tools/base64/${action}`, { text: input });
      setOutput(data.result);
      setProcessingTimeMs(Math.max(1, Math.round(performance.now() - startedAt)));
      setStatus("success");
      setHasProcessed(true);
      setSuccess(action === "encode" ? "✔ Texto codificado com sucesso." : "✔ Base64 decodificado com sucesso.");
    } catch (err) {
      const detail = (err as AxiosError<{ detail?: string }>).response?.data?.detail;
      setOutput("");
      setProcessingTimeMs(null);
      setStatus("invalid");
      setHasProcessed(true);
      setError(detail ?? "Não foi possível processar o texto.");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setToast("✔ Resultado copiado para a área de transferência.");
    setError("");
  }

  function swapValues() {
    if (!output) return;
    setInput(output);
    setOutput(input);
    setError("");
    setSuccess("");
    setToast("");
    setProcessingTimeMs(null);
    setStatus("pending");
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    setSuccess("");
    setToast("");
    setProcessingTimeMs(null);
    setStatus("idle");
    setHasProcessed(false);
  }

  return (
    <>
      <PageHeader title="Base64 Toolkit" description="Codifique e decodifique textos com suporte completo a UTF-8 usando a API local do ERP Toolkit." />
      <ToolPanel title="Conversor">
        <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2">
          <ToolStatusCard label={currentStatus.label} status={currentStatus.tone} />
          <ToolMetadataCard>
            {processingTimeMs === null
              ? null
              : `${output.length} caracteres, ${new Blob([output]).size} bytes, ${processingTimeMs} ms`}
          </ToolMetadataCard>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <TextAreaField label="Entrada" onChange={changeInput} placeholder="Digite o texto ou Base64 aqui." value={input} />
          <TextAreaField label="Resultado" placeholder="O resultado aparecerá aqui." readOnly value={output} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PrimaryButton disabled={!hasInput} isLoading={isLoading} onClick={() => run("encode")}>
            <LockKeyhole size={17} /> Codificar
          </PrimaryButton>
          <ActionButton disabled={!canRunAction} onClick={() => run("decode")}>
            <UnlockKeyhole size={17} /> Decodificar
          </ActionButton>
          <ActionButton disabled={!output || isLoading} onClick={copyOutput}>
            <Clipboard size={17} /> Copiar
          </ActionButton>
          <ActionButton disabled={!output || isLoading} onClick={swapValues}>
            <ArrowLeftRight size={17} /> Trocar Entrada/Resultado
          </ActionButton>
          <ActionButton onClick={clearAll} variant="danger">
            <Trash2 size={17} /> Limpar
          </ActionButton>
        </div>

        <div className="mt-4 space-y-3">
          {success ? <p className="rounded-lg border border-brand-100 bg-brand-50 px-3 py-2 text-sm text-brand-700">{success}</p> : null}
          <ErrorMessage message={error} />
        </div>
      </ToolPanel>
      <CopyToast message={toast} />
    </>
  );
}
