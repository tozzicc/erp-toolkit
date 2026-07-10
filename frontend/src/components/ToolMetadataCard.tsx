import type React from "react";

type ToolMetadataCardProps = {
  children?: React.ReactNode;
  emptyText?: string;
};

export function ToolMetadataCard({ children, emptyText = "Sem processamento" }: ToolMetadataCardProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
      <span className="text-xs font-medium uppercase text-slate-500">Metadados</span>
      <p className="mt-1 text-sm font-semibold text-slate-800">{children ?? emptyText}</p>
    </div>
  );
}
