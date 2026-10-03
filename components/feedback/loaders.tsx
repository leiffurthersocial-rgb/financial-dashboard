import { cn } from "@/lib/utils/cn";

interface LoaderProps {
  /** Accessible label announced to assistive tech. */
  label?: string;
  className?: string;
}

function LoaderLabel({ label }: { label: string }) {
  return <span className="sr-only">{label}</span>;
}

export function BouncingDots({ label = "Loading", className }: LoaderProps) {
  return (
    <span role="status" className={cn("inline-flex items-center gap-1 text-current", className)}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className="size-1.5 animate-bounce-dot rounded-full bg-current"
          style={{ animationDelay: `${i * 140}ms` }}
        />
      ))}
      <LoaderLabel label={label} />
    </span>
  );
}

export function RingLoader({ label = "Loading", className }: LoaderProps) {
  return (
    <span role="status" className={cn("inline-flex size-5 text-current", className)}>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-full animate-spin [animation-duration:900ms]"
      >
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="2.5"
        />
        <path
          d="M12 2.5a9.5 9.5 0 0 1 9.5 9.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <LoaderLabel label={label} />
    </span>
  );
}

export function EqualizerLoader({ label = "Loading", className }: LoaderProps) {
  return (
    <span
      role="status"
      className={cn("inline-flex h-5 items-end gap-[3px] text-current", className)}
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          aria-hidden
          className="h-full w-[3px] origin-bottom animate-equalize rounded-full bg-current"
          style={{ animationDelay: `${[0, 280, 120, 420][i]}ms` }}
        />
      ))}
      <LoaderLabel label={label} />
    </span>
  );
}
