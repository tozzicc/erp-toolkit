import { Clipboard, Download, RefreshCw, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import { ActionButton } from "../components/ActionButton";
import { CopyToast } from "../components/CopyToast";
import { ErrorMessage } from "../components/ErrorMessage";
import { PageHeader } from "../components/PageHeader";
import { PrimaryButton } from "../components/PrimaryButton";
import { ToolMetadataCard } from "../components/ToolMetadataCard";
import { ToolPanel } from "../components/ToolPanel";
import { ToolStatusCard, type ToolStatusTone } from "../components/ToolStatusCard";

type UuidStatus = "idle" | "loading" | "success" | "error";

const quantityOptions = [1, 5, 10, 25, 50, 100] as const;

const statusConfig = {
  idle: { label: "Aguardando geração", tone: "idle" },
  loading: { label: "Gerando UUID", tone: "loading" },
  success: { label: "UUID gerado com sucesso", tone: "success" },
  error: { label: "Erro ao gerar UUID", tone: "error" },
} satisfies Record<UuidStatus, { label: string; tone: ToolStatusTone }>;

export function UuidGeneratorPage() {
  const [quantity, setQuantity] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [status, setStatus] = useState<UuidStatus>("idle");
  const [processingTimeMs, setProcessingTimeMs] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const currentStatus = statusConfig[status];
  const output = uuids.join("\n");
  const characterCount = uuids.reduce((total, value) => total + value.length, 0);

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  async function generate() {
    setIsLoading(true);
    setStatus("loading");
    setError("");
    setToast("");
    const startedAt = performance.now();

    try {
      const { data } = await api.get<{ uuids: string[] }>("/api/tools/uuid", { params: { count: quantity } });
      setUuids(data.uuids);
      setProcessingTimeMs(Math.max(1, Math.round(performance.now() - startedAt)));
      setStatus("success");
    } catch {
      setUuids([]);
      setProcessingTimeMs(null);
      setStatus("error");
      setError("Nao foi possivel gerar o UUID.");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyUuids() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setToast(uuids.length > 1 ? "UUIDs copiados com sucesso." : "✔ UUID copiado para a área de transferência.");
    setError("");
  }

  function downloadTxt() {
    if (!output) return;
    const url = URL.createObjectURL(new Blob([output], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "uuids.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function clearAll() {
    setUuids([]);
    setError("");
    setToast("");
    setProcessingTimeMs(null);
    setStatus("idle");
  }

  return (
    <>
      <PageHeader title="UUID Generator" description="Gere UUIDs v4 para registros, testes e integracoes." />
      <ToolPanel title="Gerador">
        <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-3">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Quantidade</span>
            <select
              className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              disabled={isLoading}
              onChange={(event) => setQuantity(Number(event.target.value))}
              value={quantity}
            >
              {quantityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <ToolStatusCard label={currentStatus.label} status={currentStatus.tone} />
          <ToolMetadataCard>
            {processingTimeMs === null
              ? null
              : `${uuids.length} ${uuids.length === 1 ? "UUID" : "UUIDs"}, ${characterCount} caracteres, ${processingTimeMs} ms`}
          </ToolMetadataCard>
        </div>

        <pre className="min-h-14 overflow-x-auto whitespace-pre rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 font-mono text-sm text-slate-800">
          {output || "Clique para gerar um UUID"}
        </pre>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PrimaryButton isLoading={isLoading} onClick={generate}>
            <RefreshCw size={17} />
            Gerar UUID
          </PrimaryButton>
          <ActionButton disabled={!output || isLoading} onClick={copyUuids}>
            <Clipboard size={17} />
            {uuids.length > 1 ? "Copiar todos" : "Copiar"}
          </ActionButton>
          <ActionButton disabled={!output || isLoading} onClick={downloadTxt}>
            <Download size={17} />
            Download TXT
          </ActionButton>
          <ActionButton disabled={isLoading} onClick={clearAll} variant="danger">
            <Trash2 size={17} />
            Limpar
          </ActionButton>
        </div>

        <div className="mt-4">
          <ErrorMessage message={error} />
        </div>
      </ToolPanel>
      <CopyToast message={toast} />
    </>
  );
}
