"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Tracks the pointer across a grid and exposes its position to every child
 * `.spotlight-card` as CSS variables, so a single soft light sweeps across
 * neighbouring cards and their borders. Decorative only; mouse pointers only.
 */
export function SpotlightGrid({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const container = event.currentTarget;
    container.dataset.spotlightActive = "";
    container.querySelectorAll<HTMLElement>(".spotlight-card").forEach((card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    });
  }, []);

  const onPointerLeave = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    delete event.currentTarget.dataset.spotlightActive;
  }, []);

  return (
    <div
      className={cn(className)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      {...props}
    >
      {children}
    </div>
  );
}
