"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { settingsNav } from "@/lib/navigation";
import { cn } from "@/lib/utils/cn";

/** Horizontal scrolling tabs on phones; vertical list from `lg`. */
export function SettingsNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Settings"
      className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0 lg:sticky lg:top-24"
    >
      <ul className="flex gap-1 border-b border-line lg:flex-col lg:gap-0.5 lg:border-0">
        {settingsNav.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-10 items-center px-3 text-sm font-medium whitespace-nowrap transition-colors lg:rounded-control",
                  active
                    ? "text-fg lg:bg-surface-2 lg:shadow-inset"
                    : "text-muted hover:text-fg lg:hover:bg-surface-2",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 -bottom-px h-[2px] bg-accent transition-transform duration-300 lg:hidden",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
