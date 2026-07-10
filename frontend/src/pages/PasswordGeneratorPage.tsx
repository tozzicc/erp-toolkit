import { Clipboard, KeyRound, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
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

type PasswordStatus = "idle" | "pending" | "loading" | "success" | "error";
type PasswordStrength = "Muito fraca" | "Fraca" | "Média" | "Forte" | "Muito forte";

type PasswordResponse = {
  password: string;
  strength: PasswordStrength;
  entropy: number;
};

const lengthOptions = [8, 12, 16, 20, 24, 32, 48, 64] as const;

const statusConfig = {
  idle: { label: "Aguardando geração", tone: "idle" },
  pending: { label: "Alterações pendentes", tone: "pending" },
  loading: { label: "Gerando senha", tone: "loading" },
  success: { label: "Senha gerada com sucesso", tone: "success" },
  error: { label: "Erro ao gerar senha", tone: "error" },
} satisfies Record<PasswordStatus, { label: string; tone: ToolStatusTone }>;

const strengthConfig: Record<PasswordStrength, { barClassName: string; textClassName: string }> = {
  "Muito fraca": { barClassName: "w-1/5 bg-red-500", textClassName: "text-red-700" },
  Fraca: { barClassName: "w-2/5 bg-orange-500", textClassName: "text-orange-700" },
  Média: { barClassName: "w-3/5 bg-amber-500", textClassName: "text-amber-700" },
  Forte: { barClassName: "w-4/5 bg-brand-500", textClassName: "text-brand-700" },
  "Muito forte": { barClassName: "w-full bg-brand-600", textClassName: "text-brand-700" },
};

export function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState<PasswordStrength | null>(null);
  const [entropy, setEntropy] = useState<number | null>(null);
  const [processingTimeMs, setProcessingTimeMs] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [status, setStatus] = useState<PasswordStatus>("idle");
  const [isLoading, setIsLoading] = useState(false);

  const currentStatus = statusConfig[status];
  const currentStrength = strength ? strengthConfig[strength] : null;

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function markConfigurationChanged() {
    setToast("");
    if (password) {
      setStatus("pending");
    }
  }

  async function generate() {
    setIsLoading(true);
    setStatus("loading");
    setError("");
    setToast("");
    const startedAt = performance.now();

    try {
      const { data } = await api.post<PasswordResponse>("/api/tools/password", {
        length,
        uppercase,
        lowercase,
        numbers,
        symbols,
        excludeAmbiguous,
      });
      setPassword(data.password);
      setStrength(data.strength);
      setEntropy(data.entropy);
      setProcessingTimeMs(Math.max(1, Math.round(performance.now() - startedAt)));
      setStatus("success");
    } catch (err) {
      const detail = (err as AxiosError<{ detail?: string }>).response?.data?.detail;
      setPassword("");
      setStrength(null);
      setEntropy(null);
      setProcessingTimeMs(null);
      setStatus("error");
      setError(detail ?? "Nao foi possivel gerar a senha.");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyPassword() {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setToast("✔ Senha copiada para a área de transferência.");
    setError("");
  }

  function clearAll() {
    setPassword("");
    setStrength(null);
    setEntropy(null);
    setProcessingTimeMs(null);
    setError("");
    setToast("");
    setStatus("idle");
  }

  const passwordOptions = [
    { label: "Letras maiúsculas", checked: uppercase, onChange: setUppercase },
    { label: "Letras minúsculas", checked: lowercase, onChange: setLowercase },
    { label: "Números", checked: numbers, onChange: setNumbers },
    { label: "Caracteres especiais", checked: symbols, onChange: setSymbols },
    { label: "Evitar caracteres ambíguos", checked: excludeAmbiguous, onChange: setExcludeAmbiguous },
  ];

  return (
    <>
      <PageHeader title="Password Generator" description="Crie senhas fortes para ambientes de teste e operacoes internas." />
      <ToolPanel title="Gerador">
        <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-3">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Comprimento</span>
            <select
              className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              disabled={isLoading}
              onChange={(event) => {
                setLength(Number(event.target.value));
                markConfigurationChanged();
              }}
              value={length}
            >
              {lengthOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <ToolStatusCard label={currentStatus.label} status={currentStatus.tone} />
          <ToolMetadataCard>
            {processingTimeMs === null || entropy === null
              ? null
              : `${password.length} caracteres, ${entropy.toFixed(2)} bits, ${processingTimeMs} ms`}
          </ToolMetadataCard>
        </div>

        <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2 lg:grid-cols-3">
          {passwordOptions.map((option) => (
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
                  markConfigurationChanged();
                }}
                type="checkbox"
              />
              {option.label}
            </label>
          ))}
        </div>

        <div className="mt-4">
          <TextAreaField
            label="Resultado"
            placeholder="Clique para gerar uma senha"
            readOnly
            value={password}
          />
        </div>

        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-slate-700">Força da senha</span>
            <span className={`text-sm font-semibold ${currentStrength?.textClassName ?? "text-slate-500"}`}>
              {strength ?? "Sem avaliação"}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className={`h-full rounded-full transition-all ${currentStrength?.barClassName ?? "w-0"}`} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PrimaryButton isLoading={isLoading} onClick={generate}>
            <KeyRound size={17} />
            Gerar senha
          </PrimaryButton>
          <ActionButton disabled={!password || isLoading} onClick={copyPassword}>
            <Clipboard size={17} />
            Copiar
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
