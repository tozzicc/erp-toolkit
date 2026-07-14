import { AxiosError } from "axios";
import { CheckCircle2, Clipboard, Minimize2, Play, RotateCcw, Trash2 } from "lucide-react";
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

type SqlAction = "format" | "minify" | "validate";
type SqlStatus = "idle" | "pending" | "loading" | "valid" | "invalid";
type SqlDialect = "sqlserver" | "postgresql" | "mysql" | "mariadb" | "oracle" | "sqlite" | "ansi";

type SqlMetadata = {
  bytes: number;
  characters: number;
  lines: number;
};

type SqlResponse = {
  metadata: SqlMetadata;
  result: string;
  valid: boolean;
};

const sampleSql = `WITH active_customers AS (
  SELECT id, name, status
  FROM customers
  WHERE status = 'active'
)
SELECT c.id,
       c.name,
       CASE WHEN o.total > 1000 THEN 'priority' ELSE 'standard' END AS category
FROM active_customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE c.id IN (SELECT customer_id FROM orders)
ORDER BY c.name`;

const sqlDialects: { label: string; value: SqlDialect }[] = [
  { label: "SQL Server", value: "sqlserver" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "MySQL", value: "mysql" },
  { label: "MariaDB", value: "mariadb" },
  { label: "Oracle", value: "oracle" },
  { label: "SQLite", value: "sqlite" },
  { label: "Genérico / ANSI SQL", value: "ansi" },
];

const statusConfig = {
  idle: { label: "Aguardando SQL", tone: "idle" },
  pending: { label: "Alterações pendentes", tone: "pending" },
  loading: { label: "Processando SQL", tone: "loading" },
  valid: { label: "SQL válido", tone: "success" },
  invalid: { label: "SQL inválido", tone: "error" },
} satisfies Record<SqlStatus, { label: string; tone: ToolStatusTone }>;

export function SqlFormatterPage() {
  const [input, setInput] = useState(sampleSql);
  const [output, setOutput] = useState("");
  const [dialect, setDialect] = useState<SqlDialect>("sqlserver");
  const [keywordsUppercase, setKeywordsUppercase] = useState(true);
  const [breakLines, setBreakLines] = useState(true);
  const [indentJoin, setIndentJoin] = useState(true);
  const [indentCase, setIndentCase] = useState(true);
  const [alignSelect, setAlignSelect] = useState(true);
  const [status, setStatus] = useState<SqlStatus>("idle");
  const [hasProcessed, setHasProcessed] = useState(false);
  const [metadata, setMetadata] = useState<(SqlMetadata & { processingTimeMs: number }) | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const hasInput = input.trim().length > 0;
  const canRunAction = hasInput && !isLoading;
  const currentStatus = statusConfig[status];

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function markChanged() {
    setToast("");
    if (hasProcessed) {
      setStatus("pending");
      setSuccess("");
    }
  }

  function changeInput(value: string) {
    setInput(value);
    markChanged();
  }

  async function processSql(action: SqlAction) {
    if (!hasInput) return;
    setIsLoading(true);
    setStatus("loading");
    setError("");
    setSuccess("");
    setToast("");
    const startedAt = performance.now();

    try {
      const { data } = await api.post<SqlResponse>("/api/tools/sql/format", {
        sql: input,
        dialect,
        mode: action,
        keywords_uppercase: keywordsUppercase,
        break_lines: breakLines,
        indent_join: indentJoin,
        indent_case: indentCase,
        align_select: alignSelect,
      });
      setOutput(data.result);
      setMetadata({ ...data.metadata, processingTimeMs: Math.max(1, Math.round(performance.now() - startedAt)) });
      setStatus("valid");
      setHasProcessed(true);
      setSuccess(
        action === "minify"
          ? "✔ SQL minificado com sucesso."
          : action === "validate"
            ? "✔ SQL validado com sucesso."
            : "✔ SQL formatado com sucesso.",
      );
    } catch (err) {
      const detail = (err as AxiosError<{ detail?: string }>).response?.data?.detail;
      setOutput("");
      setMetadata(null);
      setStatus("invalid");
      setHasProcessed(true);
      setError(detail ?? "Não foi possível processar o SQL.");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setToast("✔ SQL copiado para a área de transferência.");
    setError("");
  }

  function loadSample() {
    setInput(sampleSql);
    setOutput("");
    setMetadata(null);
    setError("");
    setSuccess("");
    setToast("");
    setStatus(hasProcessed ? "pending" : "idle");
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setMetadata(null);
    setError("");
    setSuccess("");
    setToast("");
    setStatus("idle");
    setHasProcessed(false);
  }

  function changeDialect(value: SqlDialect) {
    setDialect(value);
    setOutput("");
    setMetadata(null);
    setError("");
    setSuccess("");
    setToast("");
    setStatus("pending");
  }

  const formatOptions = [
    { label: "Keywords em MAIÚSCULO", checked: keywordsUppercase, onChange: setKeywordsUppercase },
    { label: "Quebrar linhas", checked: breakLines, onChange: setBreakLines },
    { label: "Indentar JOIN", checked: indentJoin, onChange: setIndentJoin },
    { label: "Indentar CASE", checked: indentCase, onChange: setIndentCase },
    { label: "Alinhar SELECT", checked: alignSelect, onChange: setAlignSelect },
  ];

  return (
    <>
      <PageHeader title="SQL Formatter" description="Formate, minifique e valide consultas SQL usando a API local do ERP Toolkit." />
      <ToolPanel title="Formatador">
        <div className="mb-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <label className="block text-sm font-medium text-slate-700" htmlFor="sql-dialect">
            Banco de Dados
          </label>
          <select
            className="mt-2 min-h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100 sm:max-w-xs"
            disabled={isLoading}
            id="sql-dialect"
            onChange={(event) => changeDialect(event.target.value as SqlDialect)}
            value={dialect}
          >
            {sqlDialects.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2 lg:grid-cols-5">
          {formatOptions.map((option) => (
            <label
              className="flex min-h-10 items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
              key={option.label}
            >
              <input
                checked={option.checked}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                disabled={isLoading}
                onChange={(event) => {
                  option.onChange(event.target.checked);
                  markChanged();
                }}
                type="checkbox"
              />
              {option.label}
            </label>
          ))}
        </div>

        <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2">
          <ToolStatusCard label={currentStatus.label} status={currentStatus.tone} />
          <ToolMetadataCard>
            {metadata
              ? `${sqlDialects.find((option) => option.value === dialect)?.label} · ${metadata.lines} linhas · ${metadata.characters} caracteres · ${metadata.processingTimeMs} ms`
              : null}
          </ToolMetadataCard>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <TextAreaField label="Entrada" onChange={changeInput} placeholder="SELECT * FROM tabela" value={input} />
          <TextAreaField label="Resultado" placeholder="O SQL processado aparecerá aqui." readOnly value={output} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PrimaryButton disabled={!hasInput} isLoading={isLoading} onClick={() => processSql("format")}>
            <Play size={17} />
            Formatar SQL
          </PrimaryButton>
          <ActionButton disabled={!canRunAction} onClick={() => processSql("minify")}>
            <Minimize2 size={17} />
            Minificar SQL
          </ActionButton>
          <ActionButton disabled={!canRunAction} onClick={() => processSql("validate")}>
            <CheckCircle2 size={17} />
            Validar SQL
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
          {success ? <p className="rounded-lg border border-brand-100 bg-brand-50 px-3 py-2 text-sm text-brand-700">{success}</p> : null}
          <ErrorMessage message={error} />
        </div>
      </ToolPanel>
      <CopyToast message={toast} />
    </>
  );
}
