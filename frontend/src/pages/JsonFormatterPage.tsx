import { AxiosError } from "axios";
import {
  AlertCircle,
  CheckCircle2,
  Circle,
  Clipboard,
  Minimize2,
  Play,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api/client";
import { ActionButton } from "../components/ActionButton";
import { CopyToast } from "../components/CopyToast";
import { ErrorMessage } from "../components/ErrorMessage";
import { PageHeader } from "../components/PageHeader";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextAreaField } from "../components/TextAreaField";
import { ToolPanel } from "../components/ToolPanel";

type JsonMode = "format" | "minify";
type JsonAction = JsonMode | "validate";
type JsonStatus = "idle" | "pending" | "valid" | "invalid";

type JsonMetadata = {
  characters: number;
  lines: number;
  bytes: number;
};

type ProcessedMetadata = JsonMetadata & {
  processingTimeMs: number;
};

type JsonFormatResponse = {
  result: string;
  valid: boolean;
  metadata: JsonMetadata;
};

type JsonErrorDetail =
  | string
  | {
      message?: string;
      line?: number;
      column?: number;
      position?: number;
    };

const sampleJson = JSON.stringify(
  {
    erp: "toolkit",
    status: "ready",
    modules: ["json", "base64", "uuid"],
    metadata: {
      environment: "local",
      version: 1,
    },
  },
  null,
  2,
);

const statusConfig: Record<JsonStatus, { label: string; className: string; icon: typeof Circle }> = {
  idle: {
    label: "Aguardando JSON",
    className: "text-amber-600",
    icon: Circle,
  },
  pending: {
    label: "Alterações pendentes",
    className: "text-orange-600",
    icon: Circle,
  },
  valid: {
    label: "JSON válido",
    className: "text-brand-600",
    icon: CheckCircle2,
  },
  invalid: {
    label: "JSON inválido",
    className: "text-red-600",
    icon: AlertCircle,
  },
};

export function JsonFormatterPage() {
  const [input, setInput] = useState(sampleJson);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState("");
  const [status, setStatus] = useState<JsonStatus>("idle");
  const [hasProcessed, setHasProcessed] = useState(false);
  const [indent, setIndent] = useState(2);
  const [sortKeys, setSortKeys] = useState(true);
  const [metadata, setMetadata] = useState<ProcessedMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const trimmedInput = input.trim();
  const hasInput = trimmedInput.length > 0;
  const canRunAction = hasInput && !isLoading;
  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function markInputChanged(value: string) {
    setInput(value);
    setToast("");

    if (hasProcessed) {
      setStatus("pending");
      setSuccess("");
    }
  }

  function getErrorMessage(detail: JsonErrorDetail | undefined) {
    if (!detail) {
      return "JSON inválido.\n\nDetalhes:\nNão foi possível processar o JSON.";
    }

    if (typeof detail === "string") {
      return `JSON inválido.\n\nDetalhes:\n${detail}`;
    }

    const line = detail.line ? `Linha: ${detail.line}\n` : "";
    return `JSON inválido.\n\n${line}Detalhes:\n${detail.message ?? "Erro de sintaxe."}`;
  }

  function getSuccessMessage(action: JsonAction) {
    if (action === "minify") {
      return "✔ JSON minificado com sucesso.";
    }

    if (action === "validate") {
      return "✔ JSON validado com sucesso.";
    }

    return "✔ JSON formatado com sucesso.";
  }

  async function processJson(action: JsonAction) {
    if (!hasInput) {
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");
    setToast("");

    const startedAt = performance.now();
    try {
      const { data } = await api.post<JsonFormatResponse>("/api/tools/json/format", {
        text: input,
        indent,
        sort_keys: sortKeys,
        mode: action === "minify" ? "minify" : "format",
      });
      const processingTimeMs = Math.max(1, Math.round(performance.now() - startedAt));

      setOutput(data.result);
      setMetadata({ ...data.metadata, processingTimeMs });
      setStatus("valid");
      setHasProcessed(true);
      setSuccess(getSuccessMessage(action));
    } catch (err) {
      const detail = (err as AxiosError<{ detail?: JsonErrorDetail }>).response?.data?.detail;
      setOutput("");
      setMetadata(null);
      setStatus("invalid");
      setHasProcessed(true);
      setError(getErrorMessage(detail));
    } finally {
      setIsLoading(false);
    }
  }

  async function copyOutput() {
    if (!output) {
      return;
    }

    await navigator.clipboard.writeText(output);
    setToast("✔ JSON copiado para a área de transferência.");
    setError("");
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError("");
    setSuccess("");
    setToast("");
    setMetadata(null);
    setStatus("idle");
    setHasProcessed(false);
  }

  function loadSample() {
    setInput(sampleJson);
    setOutput("");
    setError("");
    setSuccess("");
    setToast("");
    setMetadata(null);
    setStatus(hasProcessed ? "pending" : "idle");
  }

  return (
    <>
      <PageHeader
        title="JSON Formatter"
        description="Valide, formate, minifique e revise payloads JSON usando a API local do ERP Toolkit."
      />
      <ToolPanel title="Formatador">
        <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Indentacao</span>
            <select
              className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              onChange={(event) => setIndent(Number(event.target.value))}
              value={indent}
            >
              <option value={2}>2 espacos</option>
              <option value={4}>4 espacos</option>
              <option value={8}>8 espacos</option>
            </select>
          </label>

          <label className="flex min-h-10 items-center gap-3 self-end rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
            <input
              checked={sortKeys}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              onChange={(event) => setSortKeys(event.target.checked)}
              type="checkbox"
            />
            Ordenar chaves
          </label>

          <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
            <span className="text-xs font-medium uppercase text-slate-500">Status</span>
            <p className={`mt-1 flex items-center gap-2 text-sm font-semibold ${currentStatus.className}`}>
              <StatusIcon size={16} />
              {currentStatus.label}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
            <span className="text-xs font-medium uppercase text-slate-500">Metadados</span>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {metadata
                ? `${metadata.lines} linhas, ${metadata.characters} caracteres, ${metadata.processingTimeMs} ms`
                : "Sem processamento"}
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <TextAreaField
            label="Entrada"
            onChange={markInputChanged}
            placeholder='{"chave":"valor"}'
            value={input}
          />
          <TextAreaField label="Resultado" placeholder="O JSON processado aparecera aqui." readOnly value={output} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PrimaryButton disabled={!hasInput} isLoading={isLoading} onClick={() => processJson("format")}>
            <Play size={17} />
            Formatar JSON
          </PrimaryButton>

          <ActionButton disabled={!canRunAction} onClick={() => processJson("minify")}>
            <Minimize2 size={17} />
            Minificar
          </ActionButton>

          <ActionButton disabled={!canRunAction} onClick={() => processJson("validate")}>
            <CheckCircle2 size={17} />
            Validar
          </ActionButton>

          <ActionButton disabled={!output || isLoading} onClick={copyOutput}>
            <Clipboard size={17} />
            Copiar
          </ActionButton>

          <ActionButton onClick={loadSample}>
            <RotateCcw size={17} />
            Exemplo
          </ActionButton>

          <ActionButton onClick={clearAll} variant="danger">
            <Trash2 size={17} />
            Limpar
          </ActionButton>
        </div>

        <div className="mt-4 space-y-3">
          {success ? (
            <p className="rounded-lg border border-brand-100 bg-brand-50 px-3 py-2 text-sm text-brand-700">
              {success}
            </p>
          ) : null}
          <ErrorMessage message={error} />
        </div>
      </ToolPanel>

      <CopyToast message={toast} />
    </>
  );
}
