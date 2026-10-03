import { cn } from "@/lib/utils/cn";

interface ProgressRingProps {
  /** 0–1. Values above 1 render as "over" (e.g. an exceeded budget). */
  value: number;
  size?: number;
  strokeWidth?: number;
  /** Accessible name, e.g. "Groceries budget used". */
  label: string;
  /** Optional content rendered in the centre. */
  children?: React.ReactNode;
  className?: string;
}

export function ProgressRing({
  value,
  size = 64,
  strokeWidth = 5,
  label,
  children,
  className,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
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
      className={cn("relative inline-grid shrink-0 place-items-center", className)}
      style={{ width: size, height: size }}
    >
      <svg aria-hidden width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--line)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={over ? "var(--negative)" : "var(--accent)"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
          className="transition-[stroke-dashoffset] duration-700 ease-out starting:[stroke-dashoffset:var(--c)]"
          style={{ "--c": circumference } as React.CSSProperties}
        />
      </svg>
      {children ? <div className="absolute inset-0 grid place-items-center">{children}</div> : null}
    </div>
  );
}
