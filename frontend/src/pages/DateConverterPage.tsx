import { AxiosError } from "axios";
import { ArrowLeftRight, CalendarSync, Clipboard, Trash2 } from "lucide-react";
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

const dateFormats = ["dd/MM/yyyy", "dd/MM/yyyy HH:mm", "ISO 8601", "Unix Timestamp", "yyyy-MM-dd"] as const;
type DateFormat = (typeof dateFormats)[number];
type DateStatus = "idle" | "pending" | "success" | "error";

type DateConvertResponse = {
  result: string;
  source_format: DateFormat;
  target_format: DateFormat;
  input_characters: number;
  processing_time_ms: number;
};

const statusConfig = {
  idle: { label: "Aguardando conversão", tone: "idle" },
  pending: { label: "Alterações pendentes", tone: "pending" },
  success: { label: "Conversão realizada com sucesso", tone: "success" },
  error: { label: "Data inválida", tone: "error" },
} satisfies Record<DateStatus, { label: string; tone: ToolStatusTone }>;

type FormatSelectProps = {
  label: string;
  value: DateFormat;
  onChange: (format: DateFormat) => void;
};

function FormatSelect({ label, value, onChange }: FormatSelectProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select
        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        onChange={(event) => onChange(event.target.value as DateFormat)}
        value={value}
      >
        {dateFormats.map((format) => <option key={format} value={format}>{format}</option>)}
      </select>
    </label>
  );
}

export function DateConverterPage() {
  const [input, setInput] = useState("10/07/2026 14:30");
  const [output, setOutput] = useState("");
  const [sourceFormat, setSourceFormat] = useState<DateFormat>("dd/MM/yyyy HH:mm");
  const [targetFormat, setTargetFormat] = useState<DateFormat>("ISO 8601");
  const [status, setStatus] = useState<DateStatus>("idle");
  const [metadata, setMetadata] = useState<DateConvertResponse | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const hasInput = input.trim().length > 0;
  const currentStatus = statusConfig[status];

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function markPending() {
    setError("");
    setToast("");
    if (metadata || output) setStatus("pending");
  }

  function changeInput(value: string) {
    setInput(value);
    markPending();
  }

  function changeSource(format: DateFormat) {
    setSourceFormat(format);
    markPending();
  }

  function changeTarget(format: DateFormat) {
    setTargetFormat(format);
    markPending();
  }

  async function convert() {
    if (!hasInput || isLoading) return;
    setIsLoading(true);
    setError("");
    setToast("");
    try {
      const { data } = await api.post<DateConvertResponse>("/api/tools/date/convert", {
        value: input,
        source_format: sourceFormat,
        target_format: targetFormat,
      });
      setOutput(data.result);
      setMetadata(data);
      setStatus("success");
    } catch (caughtError) {
      const detail = (caughtError as AxiosError<{ detail?: string }>).response?.data?.detail;
      setOutput("");
      setMetadata(null);
      setStatus("error");
      setError(detail ?? "Não foi possível converter a data. Verifique o valor e o formato de origem.");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyOutput() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setToast("✔ Resultado copiado para a área de transferência.");
      setError("");
    } catch {
      setError("Não foi possível copiar o resultado.");
    }
  }

  function swapValues() {
    if (!output || isLoading) return;
    setInput(output);
    setOutput(input);
    setSourceFormat(targetFormat);
    setTargetFormat(sourceFormat);
    setMetadata(null);
    setError("");
    setToast("");
    setStatus("pending");
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setMetadata(null);
    setError("");
    setToast("");
    setStatus("idle");
  }

  return (
    <>
      <PageHeader title="Date Converter" description="Converta datas entre formatos comuns de ERPs, bancos de dados e APIs." />
      <ToolPanel title="Conversor de datas">
        <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2 lg:grid-cols-4">
          <FormatSelect label="Formato Origem" onChange={changeSource} value={sourceFormat} />
          <FormatSelect label="Formato Destino" onChange={changeTarget} value={targetFormat} />
          <ToolStatusCard label={currentStatus.label} status={isLoading ? "loading" : currentStatus.tone} />
          <ToolMetadataCard>
            {metadata ? `${metadata.source_format} → ${metadata.target_format}, ${metadata.input_characters} caracteres, ${metadata.processing_time_ms} ms` : null}
          </ToolMetadataCard>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <TextAreaField label="Entrada" onChange={changeInput} placeholder="Digite a data ou timestamp aqui." value={input} />
          <TextAreaField label="Resultado" placeholder="O resultado aparecerá aqui." readOnly value={output} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PrimaryButton disabled={!hasInput} isLoading={isLoading} onClick={convert}>
            <CalendarSync size={17} /> Converter
          </PrimaryButton>
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
        <div className="mt-4"><ErrorMessage message={error} /></div>
      </ToolPanel>
      <CopyToast message={toast} />
    </>
  );
}
