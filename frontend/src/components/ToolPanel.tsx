import type React from "react";

type ToolPanelProps = {
  children: React.ReactNode;
  title: string;
};

export function ToolPanel({ children, title }: ToolPanelProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:p-6">
      <h3 className="mb-4 text-base font-semibold text-slate-950">{title}</h3>
      {children}
    </section>
  );
}
