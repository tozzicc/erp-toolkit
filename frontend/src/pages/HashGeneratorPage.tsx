import { AxiosError } from "axios";
import { Clipboard, Hash, Trash2 } from "lucide-react";
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

type HashAlgorithm = "md5" | "sha1" | "sha256" | "sha384" | "sha512";
type HashStatus = "idle" | "pending" | "loading" | "success" | "error";

type HashResponse = {
  hash: string;
  algorithm: HashAlgorithm;
  uppercase: boolean;
  input_characters: number;
  input_bytes: number;
  hash_characters: number;
  processing_time_ms: number;
};

const algorithmOptions: { label: string; value: HashAlgorithm }[] = [
  { label: "MD5", value: "md5" },
  { label: "SHA-1", value: "sha1" },
  { label: "SHA-256", value: "sha256" },
  { label: "SHA-384", value: "sha384" },
  { label: "SHA-512", value: "sha512" },
];

const statusConfig = {
  idle: { label: "Aguardando texto", tone: "idle" },
  pending: { label: "Alterações pendentes", tone: "pending" },
  loading: { label: "Gerando hash", tone: "loading" },
  success: { label: "Hash gerado com sucesso", tone: "success" },
  error: { label: "Erro ao gerar hash", tone: "error" },
} satisfies Record<HashStatus, { label: string; tone: ToolStatusTone }>;

export function HashGeneratorPage() {
  const [content, setContent] = useState("");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("sha256");
  const [uppercase, setUppercase] = useState(false);
  const [result, setResult] = useState<HashResponse | null>(null);
  const [status, setStatus] = useState<HashStatus>("idle");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const currentStatus = statusConfig[status];
  const selectedAlgorithm = algorithmOptions.find((option) => option.value === algorithm);
  const isLegacyAlgorithm = algorithm === "md5" || algorithm === "sha1";
  const canGenerate = content.length > 0 && !isLoading;

  useEffect(() => {
    if (!toast) return undefined;
    const timeoutId = window.setTimeout(() => setToast(""), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [toast]);

  function markChanged() {
    setResult(null);
    setError("");
    setToast("");
    setStatus("pending");
  }

  async function generateHash() {
    if (!canGenerate) return;
    setIsLoading(true);
    setStatus("loading");
    setError("");
    setToast("");

    try {
      const { data } = await api.post<HashResponse>("/api/tools/hash", { content, algorithm, uppercase });
      setResult(data);
      setStatus("success");
    } catch (err) {
      const detail = (err as AxiosError<{ detail?: string }>).response?.data?.detail;
      setResult(null);
      setStatus("error");
      setError(typeof detail === "string" ? detail : "Não foi possível gerar o hash.");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyHash() {
    if (!result) return;
    await navigator.clipboard.writeText(result.hash);
    setToast("Hash copiado para a área de transferência.");
    setError("");
  }

  function clearAll() {
    setContent("");
    setResult(null);
    setStatus("idle");
    setError("");
    setToast("");
  }

  return (
    <>
      <PageHeader title="Hash Generator" description="Gere hashes MD5, SHA-1, SHA-256, SHA-384 e SHA-512." />
      <ToolPanel title="Gerador">
        <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Algoritmo</span>
            <select
              className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              disabled={isLoading}
              onChange={(event) => {
                setAlgorithm(event.target.value as HashAlgorithm);
                markChanged();
              }}
              value={algorithm}
            >
              {algorithmOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Formato do hash</span>
            <select
              className="mt-2 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              disabled={isLoading}
              onChange={(event) => {
                setUppercase(event.target.value === "uppercase");
                markChanged();
              }}
              value={uppercase ? "uppercase" : "lowercase"}
            >
              <option value="lowercase">Minúsculas</option>
              <option value="uppercase">Maiúsculas</option>
            </select>
          </label>

          <ToolStatusCard label={currentStatus.label} status={currentStatus.tone} />
          <ToolMetadataCard>
            {result
              ? `${selectedAlgorithm?.label} · ${result.input_characters} caracteres · ${result.input_bytes} bytes · hash de ${result.hash_characters} caracteres · ${result.processing_time_ms} ms`
              : null}
          </ToolMetadataCard>
        </div>

        {isLegacyAlgorithm ? (
          <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
            Algoritmo legado. Não recomendado para armazenamento seguro de senhas ou aplicações criptográficas.
          </p>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-2">
          <TextAreaField label="Texto de entrada" onChange={(value) => { setContent(value); markChanged(); }} value={content} />
          <TextAreaField label="Resultado" placeholder="O hash gerado aparecerá aqui." readOnly value={result?.hash ?? ""} />
        </div>

        <p className="mt-4 text-sm text-slate-600">
          Para armazenamento de senhas, utilize algoritmos específicos como Argon2, bcrypt ou scrypt.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PrimaryButton disabled={!canGenerate} isLoading={isLoading} onClick={generateHash}>
            <Hash size={17} />
            Gerar hash
          </PrimaryButton>
          <ActionButton disabled={!result || isLoading} onClick={copyHash}>
            <Clipboard size={17} />
            Copiar
          </ActionButton>
          <ActionButton disabled={isLoading} onClick={clearAll} variant="danger">
            <Trash2 size={17} />
            Limpar
          </ActionButton>
        </div>

        <div className="mt-4"><ErrorMessage message={error} /></div>
      </ToolPanel>
      <CopyToast message={toast} />
    </>
  );
}
