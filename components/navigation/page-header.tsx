import { cn } from "@/lib/utils/cn";

interface PageHeaderProps {
  /** Small numbered label above the title, e.g. "01 — Overview". */
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ eyebrow, title, description, actions, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "mb-section flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-3 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-[2rem] leading-[1.05] font-semibold tracking-[-0.035em] text-balance md:text-[2.5rem]">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-pretty text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-2">{actions}</div> : null}
    </header>
  );
}
