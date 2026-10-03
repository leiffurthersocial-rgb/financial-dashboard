"use client";

import { useCallback, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

let rippleId = 0;

/**
 * Material-style ink ripple, toned down. Spread `handlers` on the host element
 * (which must be `relative overflow-hidden`) and render `ripples` inside it.
 */
export function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.hypot(rect.width, rect.height) * 2;
    setRipples((current) => [
      ...current,
      {
        id: ++rippleId,
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
        size,
      },
    ]);
  }, []);

  const ripplesNode = (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute animate-ripple rounded-full bg-current"
          style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }}
          onAnimationEnd={() =>
            setRipples((current) => current.filter((item) => item.id !== ripple.id))
          }
        />
      ))}
    </span>
  );

  return { onPointerDown, ripples: ripplesNode };
}
