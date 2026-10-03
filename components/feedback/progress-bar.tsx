import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number;
  label: string;
  className?: string;
}

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const clamped = Math.min(Math.max(value, 0), 1);
  const over = value > 1;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      aria-valuetext={`${Math.round(value * 100)}%${over ? ", over limit" : ""}`}
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-surface-2 shadow-inset",
        className,
      )}
    >
      <div
        className={cn(
          "h-full origin-left rounded-full transition-transform duration-700 ease-out starting:scale-x-0",
          over ? "bg-negative" : "bg-accent",
        )}
        style={{ transform: `scaleX(${clamped})` }}
      />
    </div>
  );
}
