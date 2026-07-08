import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { api } from "../api/client";
import { ErrorMessage } from "../components/ErrorMessage";
import { PageHeader } from "../components/PageHeader";
import { PrimaryButton } from "../components/PrimaryButton";
import { ToolPanel } from "../components/ToolPanel";

export function UuidGeneratorPage() {
  const [uuid, setUuid] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function generate() {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await api.get<{ uuid: string }>("/api/tools/uuid");
      setUuid(data.uuid);
    } catch {
      setError("Nao foi possivel gerar o UUID.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageHeader title="UUID Generator" description="Gere UUIDs v4 para registros, testes e integracoes." />
      <ToolPanel title="Gerador">
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 font-mono text-sm text-slate-800">
          {uuid || "Clique para gerar um UUID"}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PrimaryButton isLoading={isLoading} onClick={generate}>
            <RefreshCw size={17} />
            Gerar UUID
          </PrimaryButton>
          <ErrorMessage message={error} />
        </div>
      </ToolPanel>
    </>
  );
}
