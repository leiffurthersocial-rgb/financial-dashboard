import { useId } from "react";
import { cn } from "@/lib/utils/cn";

export const inputClasses = cn(
  "h-control w-full rounded-control border border-control-border bg-control px-3 text-sm text-fg shadow-inset",
  "transition-[border-color,box-shadow] duration-150 placeholder:text-subtle",
  "hover:border-line-strong focus-visible:border-accent focus-visible:ring-3 focus-visible:ring-accent/20 focus-visible:outline-none",
  "disabled:opacity-60 aria-invalid:border-negative",
);

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: React.ReactNode;
  error?: string;
  /** Rendered on the label row, e.g. a "Forgot password?" link. */
  labelAction?: React.ReactNode;
}

/** Labelled text input with hint and error wiring for assistive tech. */
export function Field({ label, hint, error, labelAction, id, className, ...props }: FieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={inputId} className="text-[13px] font-medium text-fg">
          {label}
        </label>
        {labelAction}
      </div>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        className={inputClasses}
        {...props}
      />
      {hint && !error ? (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs font-medium text-negative">
          {error}
        </p>
      ) : null}
    </div>
  );
}
