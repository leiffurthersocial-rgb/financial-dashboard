import { Card } from "@/components/ui/card";
import { RollingNumber } from "@/components/feedback/rolling-number";
import { cn } from "@/lib/utils/cn";

export function MetricTile({
  label,
  value,
  meta,
  className,
}: {
  label: string;
  /** Formatted value, rendered as a rolling counter. */
  value: string;
  meta?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card
      as="div"
      spotlight
      className={cn("flex flex-col justify-between gap-6 p-card", className)}
    >
      <p className="text-[11px] font-medium tracking-[0.08em] text-muted uppercase">{label}</p>
      <div>
        <RollingNumber
          value={value}
          className="text-[1.375rem] font-semibold tracking-[-0.03em] md:text-2xl"
        />
        {meta ? <div className="mt-1.5">{meta}</div> : null}
      </div>
    </Card>
  );
}
