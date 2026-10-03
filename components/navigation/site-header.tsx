import Link from "next/link";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";
import { ButtonLink } from "@/components/ui/button";

/** Header for public pages (landing, sitemap). */
export function SiteHeader() {
  return (
    <header className="mx-auto flex h-16 w-full max-w-[1440px] items-center gap-4 px-4 md:h-20 md:px-8 xl:px-12">
      <Brand />
      <nav aria-label="Site" className="ml-auto flex items-center gap-1 sm:gap-2">
        <Link
          href="/login"
          className="hidden h-8 items-center rounded-control px-3 text-[13px] font-medium text-muted hover:text-fg sm:inline-flex"
        >
          Log in
        </Link>
        <ThemeToggle />
        <ButtonLink href="/dashboard" size="sm">
          Open dashboard
        </ButtonLink>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-[1440px] flex-col gap-3 border-t border-line px-4 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between md:px-8 xl:px-12">
      <p>Finance Dashboard — demonstration build. No real financial data.</p>
      <nav aria-label="Footer">
        <ul className="flex gap-5">
          <li>
            <Link href="/sitemap" className="hover:text-fg">
              Sitemap
            </Link>
          </li>
          <li>
            <Link href="/signup" className="hover:text-fg">
              Create account
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
