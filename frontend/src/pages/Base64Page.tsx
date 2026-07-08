import { AxiosError } from "axios";
import { useState } from "react";
import { api } from "../api/client";
import { ErrorMessage } from "../components/ErrorMessage";
import { PageHeader } from "../components/PageHeader";
import { PrimaryButton } from "../components/PrimaryButton";
import { TextAreaField } from "../components/TextAreaField";
import { ToolPanel } from "../components/ToolPanel";

export function Base64Page() {
  const [input, setInput] = useState("ERP Toolkit");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function run(action: "encode" | "decode") {
    setIsLoading(true);
    setError("");
    try {
      const { data } = await api.post<{ result: string }>(`/api/tools/base64/${action}`, { text: input });
      setOutput(data.result);
    } catch (err) {
      const detail = (err as AxiosError<{ detail?: string }>).response?.data?.detail;
      setError(detail ?? "Nao foi possivel processar o texto.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <PageHeader title="Base64" description="Codifique e decodifique textos em Base64 pelo backend local." />
      <ToolPanel title="Conversor">
        <div className="grid gap-4 lg:grid-cols-2">
          <TextAreaField label="Entrada" onChange={setInput} value={input} />
          <TextAreaField label="Resultado" readOnly value={output} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <PrimaryButton isLoading={isLoading} onClick={() => run("encode")}>
            Codificar
          </PrimaryButton>
          <PrimaryButton isLoading={isLoading} onClick={() => run("decode")}>
            Decodificar
          </PrimaryButton>
          <ErrorMessage message={error} />
        </div>
      </ToolPanel>
    </>
  );
}
