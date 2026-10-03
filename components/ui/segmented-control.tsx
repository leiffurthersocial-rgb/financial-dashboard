"use client";

import { useId } from "react";
import { cn } from "@/lib/utils/cn";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedControlProps<T extends string> {
  /** Accessible group name. */
  label: string;
  value: T;
  options: readonly SegmentedOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

/** Native radio group styled as a segmented control — arrow keys work out of the box. */
export function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  const name = useId();
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        "inline-flex max-w-full gap-0.5 overflow-x-auto rounded-control bg-surface-2 p-0.5 shadow-inset",
        className,
      )}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "relative inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-[calc(var(--r-control)-2px)] px-3 text-[13px] font-medium whitespace-nowrap text-muted",
            "transition-[background-color,color,box-shadow] duration-200 ease-out hover:text-fg [&_svg]:size-3.5",
            "has-checked:bg-surface has-checked:text-fg has-checked:shadow-[0_1px_2px_hsl(var(--shadow-color)/0.12),0_0_0_1px_var(--line)]",
            "has-focus-visible:outline-2 has-focus-visible:outline-offset-1 has-focus-visible:outline-accent",
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="sr-only"
          />
          {option.icon}
          {option.label}
        </label>
      ))}
    </div>
  );
}
