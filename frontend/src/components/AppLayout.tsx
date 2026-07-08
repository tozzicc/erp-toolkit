import { Menu, Wrench } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { tools } from "../config/tools";

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-950">
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 border-r border-slate-200 bg-white px-4 py-5 shadow-soft transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Wrench size={21} />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">ERP</p>
            <h1 className="text-lg font-bold">Toolkit</h1>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <NavLink
                key={tool.path}
                to={tool.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`
                }
              >
                <Icon size={18} />
                <span>{tool.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {isOpen ? (
        <button
          aria-label="Fechar menu"
          className="fixed inset-0 z-20 bg-slate-950/30 lg:hidden"
          onClick={() => setIsOpen(false)}
          type="button"
        />
      ) : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
          <button
            aria-label="Abrir menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700"
            onClick={() => setIsOpen(true)}
            type="button"
          >
            <Menu size={21} />
          </button>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
