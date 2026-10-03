"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight, Ellipsis, Map as MapIcon } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import { isActivePath, primaryNav, secondaryNav } from "@/lib/navigation";
import { cn } from "@/lib/utils/cn";

const tabItems = primaryNav.filter((item) => item.mobile);
const moreItems = [
  ...primaryNav.filter((item) => !item.mobile),
  ...secondaryNav,
  { href: "/sitemap", label: "Sitemap", icon: MapIcon },
];

/** Phone navigation: thumb-reachable tab bar with an overflow sheet. */
export function MobileTabBar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = moreItems.some((item) => isActivePath(pathname, item.href));

  return (
    <>
      <nav
        aria-label="Primary"
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md",
          className,
        )}
      >
        <ul className="grid h-tabbar grid-cols-5">
          {tabItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={tabClasses(active)}
                >
                  <TabIndicator active={active} />
                  <Icon aria-hidden className="size-5" strokeWidth={active ? 2 : 1.75} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={() => setMoreOpen(true)}
              aria-haspopup="dialog"
              className={cn(tabClasses(moreActive), "w-full")}
            >
              <TabIndicator active={moreActive} />
              <Ellipsis aria-hidden className="size-5" strokeWidth={1.75} />
              <span>More</span>
            </button>
          </li>
        </ul>
      </nav>

      <Sheet open={moreOpen} onOpenChange={setMoreOpen} title="More">
        <ul className="-mx-2 flex flex-col">
          {moreItems.map((item) => {
            const Icon = item.icon;
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className="flex h-12 items-center gap-3 rounded-control px-2 text-[15px] font-medium hover:bg-surface-2 aria-[current=page]:text-accent"
                >
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                  {item.label}
                  <ChevronRight aria-hidden className="ml-auto size-4 text-subtle" />
                </Link>
              </li>
            );
          })}
        </ul>
      </Sheet>
    </>
  );
}

function tabClasses(active: boolean) {
  return cn(
    "relative flex h-full flex-col items-center justify-center gap-1 text-[10.5px] font-medium tracking-[0.01em] transition-colors",
    active ? "text-fg [&_svg]:text-accent" : "text-muted",
  );
}

function TabIndicator({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute top-0 left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-accent transition-transform duration-300 ease-out",
        active ? "scale-x-100" : "scale-x-0",
      )}
    />
  );
}
