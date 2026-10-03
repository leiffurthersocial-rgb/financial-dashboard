"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./brand";
import { isActivePath, primaryNav, secondaryNav, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils/cn";

/**
 * Tablet (md): 72px icon rail with hover/focus labels.
 * Desktop (xl): full sidebar with labels and section headings.
 */
export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("flex-col border-r border-line bg-canvas", className)}>
      <div className="flex h-16 items-center justify-center px-5 xl:justify-start">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-control font-semibold tracking-[-0.02em]"
        >
          <BrandMark />
          <span className="sr-only text-[15px] xl:not-sr-only">Finance</span>
        </Link>
      </div>

      <nav aria-label="Primary" className="flex flex-1 flex-col gap-8 px-3 pt-6 xl:px-4">
        <NavSection title="Finance" items={primaryNav} pathname={pathname} />
        <NavSection
          title="Workspace"
          items={secondaryNav}
          pathname={pathname}
          className="mt-auto pb-4"
        />
      </nav>
    </aside>
  );
}

function NavSection({
  title,
  items,
  pathname,
  className,
}: {
  title: string;
  items: NavItem[];
  pathname: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="mb-2 hidden px-3 text-[11px] font-medium tracking-[0.08em] text-subtle uppercase xl:block">
        {title}
      </p>
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => (
          <li key={item.href}>
            <SidebarLink item={item} active={isActivePath(pathname, item.href)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SidebarLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex h-10 items-center justify-center gap-3 rounded-control px-3 text-sm font-medium xl:justify-start",
        "transition-colors duration-150",
        active
          ? "bg-surface-2 text-fg shadow-inset"
          : "text-muted hover:bg-surface-2 hover:text-fg",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-2 bottom-2 -left-3 w-[2px] rounded-full bg-accent transition-transform duration-300 ease-out xl:-left-4",
          active ? "scale-y-100" : "scale-y-0",
        )}
      />
      <Icon
        aria-hidden
        className={cn("size-[18px] shrink-0", active && "text-accent")}
        strokeWidth={1.75}
      />
      {/* Rail: floating label on hover/focus. Desktop: inline label. */}
      <span
        className={cn(
          "pointer-events-none absolute left-full z-50 ml-3 rounded-control bg-fg px-2 py-1 text-xs whitespace-nowrap text-canvas opacity-0 shadow-pop",
          "-translate-x-1 transition-[opacity,transform] duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
          "xl:pointer-events-auto xl:static xl:ml-0 xl:translate-x-0 xl:bg-transparent xl:p-0 xl:text-sm xl:text-inherit xl:opacity-100 xl:shadow-none",
        )}
      >
        {item.label}
      </span>
    </Link>
  );
}
