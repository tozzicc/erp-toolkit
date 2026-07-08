import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { tools } from "../config/tools";

export function DashboardPage() {
  const dashboardTools = tools.filter((tool) => tool.path !== "/");

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Acesse rapidamente utilitarios comuns para suporte, integracoes e rotinas de ERP."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {dashboardTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              className="group rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lg"
              key={tool.path}
              to={tool.path}
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                <Icon size={22} />
              </div>
              <h3 className="text-lg font-semibold text-slate-950">{tool.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
