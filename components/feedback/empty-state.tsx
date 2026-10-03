import { cn } from "@/lib/utils/cn";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  children,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-start gap-4 rounded-card border border-dashed border-line-strong p-card md:p-10",
        className,
      )}
    >
      {icon ? (
        <span className="grid size-10 place-items-center rounded-control bg-surface-2 text-muted shadow-inset [&_svg]:size-5">
          {icon}
        </span>
      ) : null}
      <div>
        <h2 className="text-base font-semibold tracking-[-0.01em]">{title}</h2>
        {description ? <p className="mt-1 max-w-prose text-sm text-muted">{description}</p> : null}
      </div>
      {children}
      {action}
    </div>
  );
}
