"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type ToastTone = "neutral" | "success" | "error";

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  /** Milliseconds before auto-dismiss. Pass 0 to keep until dismissed. */
  duration?: number;
}

interface ToastRecord extends Required<Omit<ToastOptions, "description">> {
  id: number;
  description?: string;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const MAX_VISIBLE = 4;

const toneIcon = {
  neutral: Info,
  success: CircleCheck,
  error: CircleAlert,
} as const;

const toneLabel = { neutral: "Notice", success: "Success", error: "Error" } as const;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());
  const nextId = useRef(0);
  const [paused, setPaused] = useState(false);

  const dismiss = useCallback((id: number) => {
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const schedule = useCallback(
    (toast: ToastRecord) => {
      if (toast.duration > 0) {
        timers.current.set(
          toast.id,
          setTimeout(() => dismiss(toast.id), toast.duration),
        );
      }
    },
    [dismiss],
  );

  const toast = useCallback(
    ({ title, description, tone = "neutral", duration = 5000 }: ToastOptions) => {
      const record: ToastRecord = { id: ++nextId.current, title, description, tone, duration };
      setToasts((current) => [...current, record].slice(-MAX_VISIBLE));
      schedule(record);
      return record.id;
    },
    [schedule],
  );

  // Pause auto-dismiss while the user hovers or focuses the stack.
  const pause = useCallback(() => {
    setPaused(true);
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current.clear();
  }, []);
  const resume = useCallback(() => {
    setPaused(false);
    toasts.forEach(schedule);
  }, [toasts, schedule]);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <section
        aria-label="Notifications"
        className={cn(
          "pointer-events-none fixed inset-x-0 z-50 flex flex-col items-center gap-2 px-4",
          "bottom-[calc(var(--tabbar-h)+env(safe-area-inset-bottom)+0.75rem)] md:bottom-6",
          "md:inset-x-auto md:right-6 md:items-end md:px-0",
        )}
        onPointerEnter={pause}
        onPointerLeave={resume}
        onFocus={pause}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) resume();
        }}
      >
        <ol
          aria-live="polite"
          aria-relevant="additions"
          className="flex w-full flex-col gap-2 md:w-96"
        >
          {toasts.map((item, index) => {
            const Icon = toneIcon[item.tone];
            const depth = toasts.length - 1 - index;
            return (
              <li
                key={item.id}
                className={cn(
                  "pointer-events-auto flex animate-toast-in items-start gap-3 rounded-card border border-card-border bg-surface p-4 shadow-pop",
                  "transition-[opacity,transform] duration-300 ease-out",
                  !paused && depth > 1 && "opacity-70",
                )}
              >
                <Icon
                  aria-hidden
                  className={cn(
                    "mt-0.5 size-4 shrink-0",
                    item.tone === "success" && "text-positive",
                    item.tone === "error" && "text-negative",
                    item.tone === "neutral" && "text-accent",
                  )}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-fg">
                    <span className="sr-only">{toneLabel[item.tone]}: </span>
                    {item.title}
                  </p>
                  {item.description ? (
                    <p className="mt-0.5 text-sm text-muted">{item.description}</p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(item.id)}
                  className="-m-1 rounded-control p-1 text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                  aria-label={`Dismiss notification: ${item.title}`}
                >
                  <X aria-hidden className="size-4" />
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within <ToastProvider>");
  return context;
}
