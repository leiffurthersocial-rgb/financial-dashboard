"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

export interface IconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "aria-label"
> {
  /** Required accessible name — icon-only buttons have no visible text. */
  label: string;
  size?: "sm" | "md";
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, size = "md", className, type = "button", children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-grid shrink-0 place-items-center rounded-control text-muted",
        "transition-[background-color,color,transform] duration-150 ease-out hover:bg-surface-2 hover:text-fg active:scale-95",
        "[&_svg]:size-[18px]",
        size === "md" ? "size-control" : "size-8",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
