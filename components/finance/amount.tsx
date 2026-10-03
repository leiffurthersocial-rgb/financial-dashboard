import { formatCurrency } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

/**
 * Signed money value. Direction is conveyed by an explicit sign (+ / −) and
 * screen-reader text, with colour as reinforcement only. Outflows stay neutral
 * to keep the interface calm; inflows are marked positive.
 */
export function Amount({
  value,
  currency = "USD",
  className,
}: {
  value: number;
  currency?: string;
  className?: string;
}) {
  const inflow = value > 0;
  const formatted = formatCurrency(Math.abs(value), { currency });
  return (
    <span
      className={cn("tabular whitespace-nowrap", inflow ? "text-positive" : "text-fg", className)}
    >
      <span aria-hidden>{inflow ? "+" : value < 0 ? "−" : ""}</span>
      <span className="sr-only">{inflow ? "Incoming " : value < 0 ? "Outgoing " : ""}</span>
      {formatted}
    </span>
  );
}
