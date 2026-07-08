import { Loader2 } from "lucide-react";
import type React from "react";

type PrimaryButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function PrimaryButton({ children, isLoading = false, onClick, type = "button" }: PrimaryButtonProps) {
  return (
    <button
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      disabled={isLoading}
      onClick={onClick}
      type={type}
    >
      {isLoading ? <Loader2 className="animate-spin" size={17} /> : null}
      {children}
    </button>
  );
}
