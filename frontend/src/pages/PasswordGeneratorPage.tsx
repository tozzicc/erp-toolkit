import { AxiosError } from "axios";
import { useState } from "react";
import { api } from "../api/client";
import { ErrorMessage } from "../components/ErrorMessage";
import { PageHeader } from "../components/PageHeader";
import { PrimaryButton } from "../components/PrimaryButton";
import { ToolPanel } from "../components/ToolPanel";

export function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function generate() {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await api.post<{ password: string }>("/api/tools/password", {
        length,
        include_uppercase: true,
        include_lowercase: true,
        include_numbers: true,
        include_symbols: true,
      });
      setPassword(data.password);
    } catch (err) {
      const detail = (err as AxiosError<{ detail?: string }>).response?.data?.detail;
      setError(detail ?? "Nao foi possivel gerar a senha.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageHeader title="Password Generator" description="Crie senhas fortes para ambientes de teste e operacoes internas." />
      <ToolPanel title="Gerador">
        <label className="block max-w-xs">
          <span className="text-sm font-medium text-slate-700">Tamanho</span>
          <input
            className="mt-2 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
            max={128}
            min={4}
            onChange={(event) => setLength(Number(event.target.value))}
            type="number"
            value={length}
          />
        </label>
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 font-mono text-sm text-slate-800 break-all">
          {password || "Clique para gerar uma senha"}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PrimaryButton isLoading={isLoading} onClick={generate}>
            Gerar senha
          </PrimaryButton>
          <ErrorMessage message={error} />
        </div>
      </ToolPanel>
    </>
  );
}
