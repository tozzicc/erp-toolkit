import { AxiosError } from "axios";
import { useState } from "react";
import { api } from "../api/client";
import { ErrorMessage } from "../components/ErrorMessage";
import { PageHeader } from "../components/PageHeader";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextAreaField } from "../components/TextAreaField";
import { ToolPanel } from "../components/ToolPanel";

export function JsonFormatterPage() {
  const [input, setInput] = useState('{"erp":"toolkit","status":"ready"}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function formatJson() {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await api.post<{ result: string }>("/api/tools/json/format", { text: input, indent: 2 });
      setOutput(data.result);
    } catch (err) {
      const detail = (err as AxiosError<{ detail?: string }>).response?.data?.detail;
      setError(detail ?? "Nao foi possivel formatar o JSON.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageHeader title="JSON Formatter" description="Valide e formate JSON usando a API local do ERP Toolkit." />
      <ToolPanel title="Formatador">
        <div className="grid gap-4 lg:grid-cols-2">
          <TextAreaField label="Entrada" onChange={setInput} value={input} />
          <TextAreaField label="Resultado" readOnly value={output} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PrimaryButton isLoading={isLoading} onClick={formatJson}>
            Formatar JSON
          </PrimaryButton>
          <ErrorMessage message={error} />
        </div>
      </ToolPanel>
    </>
  );
}
