import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface StatePanelProps {
  icon: ReactNode;
  title: string;
  description: ReactNode;
  action?: ReactNode;
  tone?: "default" | "danger";
  compact?: boolean;
  role?: "alert" | "status";
}

export function StatePanel({
  icon,
  title,
  description,
  action,
  tone = "default",
  compact = false,
  role,
}: StatePanelProps) {
  const danger = tone === "danger";

  return (
    <div
      className={cn(
        compact
          ? "flex items-start gap-3 rounded-lg border px-3 py-3 text-left"
          : "flex min-h-72 flex-col items-center justify-center border-t border-slate-100 px-6 py-8 text-center",
        danger && compact && "border-rose-200 bg-rose-50/80",
        !danger && compact && "border-slate-200 bg-slate-50",
      )}
      role={role}
    >
      <span
        className={cn(
          "grid shrink-0 place-items-center",
          compact ? "size-9 rounded-lg" : "mb-3 size-11 rounded-xl",
          danger ? "bg-rose-100 text-rose-600" : "bg-violet-50 text-violet-600",
        )}
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className={cn(compact && "min-w-0 flex-1")}>
        <h3 className={cn("m-0 font-semibold text-slate-800", compact ? "text-sm" : "text-base")}>
          {title}
        </h3>
        <p
          className={cn(
            "leading-relaxed text-slate-500",
            compact ? "mb-0 mt-1 text-sm" : "mb-4 mt-2 max-w-sm text-sm",
          )}
        >
          {description}
        </p>
        {action}
      </div>
    </div>
  );
}
