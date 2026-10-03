import Link from "next/link";
import { cn } from "@/lib/utils/cn";

/** Wordmark: a solid square and a hairline offset square — a nod to the grid. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-block size-5 shrink-0", className)}>
      <span className="absolute inset-0 translate-x-[3px] -translate-y-[3px] rounded-[2px] border border-fg/40" />
      <span className="absolute inset-0 rounded-[2px] bg-fg" />
    </span>
  );
}

export function Brand({
  href = "/",
  compact = false,
  className,
}: {
  href?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-control font-semibold tracking-[-0.02em] text-fg",
        className,
      )}
    >
      <BrandMark />
      <span className={cn("text-[15px]", compact && "sr-only")}>Finance</span>
    </Link>
  );
}
