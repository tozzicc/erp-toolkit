import { useState } from "react";
import { api } from "../api/client";
import { ErrorMessage } from "../components/ErrorMessage";
import { PageHeader } from "../components/PageHeader";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextAreaField } from "../components/TextAreaField";
import { ToolPanel } from "../components/ToolPanel";

export function SqlFormatterPage() {
  const [input, setInput] = useState("select id, name, status from customers where status = 'active' order by name");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function formatSql() {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await api.post<{ result: string }>("/api/tools/sql/format", { sql: input });
      setOutput(data.result);
    } catch {
      setError("Nao foi possivel formatar o SQL.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageHeader title="SQL Formatter" description="Organize consultas SQL comuns para revisao e suporte." />
      <ToolPanel title="Formatador">
        <div className="grid gap-4 lg:grid-cols-2">
          <TextAreaField label="Entrada" onChange={setInput} value={input} />
          <TextAreaField label="Resultado" readOnly value={output} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PrimaryButton isLoading={isLoading} onClick={formatSql}>
            Formatar SQL
          </PrimaryButton>
          <ErrorMessage message={error} />
        </div>
      </ToolPanel>
    </>
  );
}
