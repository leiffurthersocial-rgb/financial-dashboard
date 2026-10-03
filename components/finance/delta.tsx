import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { formatPercent } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

/** Change indicator: arrow + signed percentage + text, never colour alone. */
export function Delta({
  value,
  /** Set false for metrics where going up is bad (e.g. spending, debt). */
  upIsGood = true,
  suffix,
  className,
}: {
  value: number;
  upIsGood?: boolean;
  suffix?: string;
  className?: string;
}) {
  const direction = value > 0.0005 ? "up" : value < -0.0005 ? "down" : "flat";
  const good = direction === "flat" ? null : (direction === "up") === upIsGood;
  const Icon = direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus;
  return (
    <span
      className={cn(
        "tabular inline-flex items-center gap-0.5 text-[13px] font-medium",
        good === true && "text-positive",
        good === false && "text-negative",
        good === null && "text-muted",
        className,
      )}
    >
      <Icon aria-hidden className="size-3.5" strokeWidth={2.25} />
      <span className="sr-only">
        {direction === "up" ? "Up" : direction === "down" ? "Down" : "Unchanged"}{" "}
      </span>
      {formatPercent(Math.abs(value))}
      {suffix ? <span className="ml-1 font-normal text-muted">{suffix}</span> : null}
    </span>
  );
}
