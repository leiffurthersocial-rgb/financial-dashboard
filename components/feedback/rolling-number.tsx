import { cn } from "@/lib/utils/cn";

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

interface RollingNumberProps {
  /** Already-formatted value, e.g. "$128,430.00". Digits roll; other characters stay static. */
  value: string;
  className?: string;
}

/**
 * Odometer-style counter. Pure CSS: each digit is a vertical strip translated
 * to its value, animating from zero on mount via @starting-style and between
 * values on update. Screen readers get the plain value.
 */
export function RollingNumber({ value, className }: RollingNumberProps) {
  const chars = [...value];
  let digitIndex = 0;
  return (
    <span className={cn("tabular inline-flex whitespace-nowrap", className)}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="inline-flex">
        {chars.map((char, i) => {
          const digit = DIGITS.indexOf(char);
          if (digit === -1) {
            return (
              <span key={`s${i}`} className="inline-block">
                {char}
              </span>
            );
          }
          const index = digitIndex++;
          return (
            <span
              // Key from the right so columns persist as the number grows.
              key={`d${chars.length - i}`}
              className="relative inline-block h-[1.1em] overflow-hidden leading-[1.1]"
            >
              <span
                className="digit-strip"
                style={{ "--digit": digit, "--index": index } as React.CSSProperties}
              >
                {DIGITS.map((d) => (
                  <span key={d} className="block h-[1.1em]">
                    {d}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
