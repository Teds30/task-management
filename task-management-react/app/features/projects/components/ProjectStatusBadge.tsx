import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  type PriorityLabel,
  type PriorityValue,
  type StatusLabel,
  type StatusValue,
} from "@/features/projects/types";

type BadgeValue = StatusValue | PriorityValue | StatusLabel | PriorityLabel;
type BadgeProps = { value: BadgeValue; kind: "status" | "priority" };

const styles: Record<StatusValue | PriorityValue, string> = {
  planning: "bg-indigo-50 text-indigo-700",
  "in_progress": "bg-amber-50 text-amber-700",
  "on_hold": "bg-slate-100 text-slate-600",
  completed: "bg-emerald-50 text-emerald-700",
  low: "bg-emerald-50 text-emerald-700",
  medium: "bg-amber-50 text-amber-700",
  high: "bg-rose-50 text-rose-700",
};

export function ProjectStatusBadge({ value, kind }: BadgeProps) {
  const option =
    kind === "status"
      ? STATUS_OPTIONS.find((item) => item.value === value || item.label === value)
      : PRIORITY_OPTIONS.find((item) => item.value === value || item.label === value);

  const styleKey = (option?.value ?? value) as StatusValue | PriorityValue;
  const label = option?.label ?? String(value);

  return (
    <span className={`inline-flex min-h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold ${styles[styleKey] ?? "bg-slate-100 text-slate-600"}`}>
      {kind === "status" && <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />}
      {label}
    </span>
  );
}
