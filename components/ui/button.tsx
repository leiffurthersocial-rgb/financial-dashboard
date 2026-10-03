"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { RingLoader } from "@/components/feedback/loaders";
import { useRipple } from "@/components/effects/use-ripple";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg hover:bg-[color-mix(in_oklch,var(--accent)_88%,var(--fg))] shadow-control",
  secondary: "bg-control text-fg border border-control-border shadow-control hover:bg-surface-2",
  ghost: "text-fg hover:bg-surface-2",
  danger:
    "bg-negative text-white dark:text-canvas hover:bg-[color-mix(in_oklch,var(--negative)_88%,black)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 px-3 text-[13px]",
  md: "h-control gap-2 px-4 text-sm",
  lg: "h-12 gap-2.5 px-6 text-[15px]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string } = {}) {
  return cn(
    "relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden rounded-control font-medium tracking-[-0.005em] whitespace-nowrap select-none",
    "transition-[background-color,color,box-shadow,transform] duration-150 ease-out active:scale-[0.98]",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and blocks interaction while keeping the button's width. */
  loading?: boolean;
  /** Text announced while loading. */
  loadingLabel?: string;
  /** 0–1. Renders a determinate fill behind the label (e.g. upload/export progress). */
  progress?: number;
  ripple?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    loading = false,
    loadingLabel = "Working",
    progress,
    ripple = true,
    className,
    children,
    onClick,
    onPointerDown,
    type = "button",
    ...props
  },
  ref,
) {
  const { onPointerDown: addRipple, ripples } = useRipple();
  const busy = loading || progress !== undefined;

  return (
    <button
      ref={ref}
      type={type}
      aria-busy={busy || undefined}
      aria-disabled={busy || undefined}
      className={buttonClasses({ variant, size, className })}
      onPointerDown={(event) => {
        if (ripple && !busy) addRipple(event);
        onPointerDown?.(event);
      }}
      onClick={(event) => {
        if (busy) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      }}
      {...props}
    >
      {progress !== undefined ? (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 -z-10 w-full origin-left bg-current opacity-15 transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${Math.min(Math.max(progress, 0), 1)})` }}
        />
      ) : null}
      <span className={cn("inline-flex items-center gap-[inherit]", loading && "invisible")}>
        {children}
      </span>
      {loading ? (
        <span className="absolute inset-0 grid place-items-center">
          <RingLoader label={loadingLabel} className="size-4" />
        </span>
      ) : null}
      {progress !== undefined ? (
        <span className="sr-only" role="status">
          {Math.round(progress * 100)}%
        </span>
      ) : null}
      {ripple ? ripples : null}
    </button>
  );
});

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: React.ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}
