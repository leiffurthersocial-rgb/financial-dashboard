import { cn } from "@/lib/utils/cn";

type CardProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "article" | "div" | "li";
  /** Adds hover elevation for cards that navigate or open something. */
  interactive?: boolean;
  /** Participates in a surrounding <SpotlightGrid>. */
  spotlight?: boolean;
};

export function Card({
  as: Tag = "section",
  interactive,
  spotlight,
  className,
  ...props
}: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-card-border bg-card shadow-card",
        "transition-[box-shadow,transform,border-color] duration-300 ease-out",
        interactive &&
          "focus-within:border-line-strong hover:-translate-y-px hover:border-line-strong hover:shadow-card-hover",
        spotlight && "spotlight-card",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  eyebrow,
  action,
  titleAs: Title = "h2",
  className,
}: {
  title: React.ReactNode;
  eyebrow?: React.ReactNode;
  action?: React.ReactNode;
  titleAs?: "h2" | "h3";
  className?: string;
}) {
  return (
    <header className={cn("flex items-start justify-between gap-4 px-card pt-card", className)}>
      <div className="min-w-0">
        {eyebrow ? (
          <p className="mb-1 text-[11px] font-medium tracking-[0.08em] text-muted uppercase">
            {eyebrow}
          </p>
        ) : null}
        <Title className="text-[15px] font-semibold tracking-[-0.01em] text-fg">{title}</Title>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-card", className)} {...props} />;
}
