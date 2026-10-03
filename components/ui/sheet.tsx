"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { IconButton } from "./icon-button";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  /**
   * Presentation from the `md` breakpoint up. Below `md` every sheet becomes a
   * bottom sheet, which is easier to reach one-handed.
   */
  variant?: "dialog" | "side";
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Responsive modal built on the native <dialog> element, which provides focus
 * trapping, Escape to close, inert background and top-layer stacking.
 */
export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  variant = "dialog",
  children,
  footer,
}: SheetProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={() => onOpenChange(false)}
      onClick={(event) => {
        // Clicks on the ::backdrop target the dialog element itself.
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
      className={cn(
        "m-0 mt-auto max-h-[88dvh] w-full max-w-none border-0 bg-surface p-0 text-fg shadow-pop",
        "rounded-t-[max(var(--r-card),16px)] open:flex open:animate-sheet-up open:flex-col",
        variant === "dialog" &&
          "md:m-auto md:max-h-[min(80dvh,720px)] md:w-[min(32rem,calc(100vw-3rem))] md:rounded-card md:open:animate-dialog-in",
        variant === "side" &&
          "md:mr-0 md:ml-auto md:h-dvh md:max-h-none md:w-[26rem] md:rounded-none md:open:animate-fade-in",
      )}
    >
      <div
        aria-hidden
        className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-line-strong md:hidden"
      />
      <header className="flex items-start justify-between gap-4 px-6 pt-5 pb-4">
        <div>
          <h2 id={titleId} className="text-lg font-semibold tracking-[-0.015em]">
            {title}
          </h2>
          {description ? (
            <p id={descriptionId} className="mt-1 text-sm text-muted">
              {description}
            </p>
          ) : null}
        </div>
        <IconButton
          label="Close"
          size="sm"
          onClick={() => onOpenChange(false)}
          className="-mt-1 -mr-2"
        >
          <X aria-hidden />
        </IconButton>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">{children}</div>
      {footer ? (
        <footer className="flex justify-end gap-2 border-t border-line px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {footer}
        </footer>
      ) : null}
    </dialog>
  );
}
