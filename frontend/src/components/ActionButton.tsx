import type React from "react";

type ActionButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  variant?: "default" | "danger";
};

export function ActionButton({ children, disabled = false, onClick, variant = "default" }: ActionButtonProps) {
  const colors =
    variant === "danger"
      ? "border-red-200 text-red-700 hover:bg-red-50"
      : "border-slate-200 text-slate-700 hover:bg-slate-50";

  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${colors}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
