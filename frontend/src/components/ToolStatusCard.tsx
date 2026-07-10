import { AlertCircle, CheckCircle2, Circle, Loader2, type LucideIcon } from "lucide-react";

export type ToolStatusTone = "idle" | "pending" | "success" | "error" | "loading";

type ToolStatusCardProps = {
  icon?: LucideIcon;
  label: string;
  status: ToolStatusTone;
};

const toneConfig: Record<ToolStatusTone, { className: string; icon: LucideIcon }> = {
  idle: { className: "text-amber-600", icon: Circle },
  pending: { className: "text-orange-600", icon: Circle },
  success: { className: "text-brand-600", icon: CheckCircle2 },
  error: { className: "text-red-600", icon: AlertCircle },
  loading: { className: "text-brand-600", icon: Loader2 },
};

export function ToolStatusCard({ icon, label, status }: ToolStatusCardProps) {
  const config = toneConfig[status];
  const StatusIcon = icon ?? config.icon;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
      <span className="text-xs font-medium uppercase text-slate-500">Status</span>
      <p className={`mt-1 flex items-center gap-2 text-sm font-semibold ${config.className}`}>
        <StatusIcon className={status === "loading" ? "animate-spin" : undefined} size={16} />
        {label}
      </p>
    </div>
  );
}
