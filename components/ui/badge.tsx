import { cn } from "@/lib/utils/cn";

type Tone = "neutral" | "accent" | "positive" | "negative" | "warning";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-surface-2 text-muted",
  accent: "bg-accent-soft text-accent",
  positive: "bg-[color-mix(in_oklch,var(--positive)_12%,transparent)] text-positive",
  negative: "bg-[color-mix(in_oklch,var(--negative)_12%,transparent)] text-negative",
  warning: "bg-[color-mix(in_oklch,var(--warning)_16%,transparent)] text-fg",
};

export function Badge({
  tone = "neutral",
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex h-5 items-center gap-1 rounded-control px-1.5 text-[11px] font-medium tracking-[0.02em] whitespace-nowrap [&_svg]:size-3",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
