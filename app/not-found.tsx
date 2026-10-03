import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Brand } from "@/components/navigation/brand";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found" };

const destinations = [
  { href: "/dashboard", label: "Dashboard", note: "Your overview" },
  { href: "/transactions", label: "Transactions", note: "Recent activity" },
  { href: "/sitemap", label: "Sitemap", note: "Every page" },
];

export default function NotFound() {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 mx-4 opacity-60 md:mx-8 xl:mx-12"
      />
      <header className="relative mx-auto flex h-16 w-full max-w-[1440px] items-center px-4 md:h-20 md:px-8 xl:px-12">
        <Brand />
      </header>

      <main
        id="main"
        tabIndex={-1}
        className="relative mx-auto grid w-full max-w-[1440px] flex-1 content-center gap-12 px-4 py-12 outline-none md:px-8 lg:grid-cols-12 xl:px-12"
      >
        <div className="lg:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
            Error 404 — Not found
          </p>
          <p
            aria-hidden
            className="tabular mt-6 text-[clamp(7rem,26vw,20rem)] leading-[0.8] font-semibold tracking-[-0.07em]"
          >
            4<span className="text-transparent [-webkit-text-stroke:1.5px_var(--fg)]">0</span>4
          </p>
        </div>
        <div className="flex flex-col justify-end lg:col-span-5">
          <h1 className="text-3xl font-semibold tracking-[-0.035em] text-balance md:text-4xl">
            This page doesn&rsquo;t balance.
          </h1>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
            The address may be mistyped, or the page has moved. Nothing has been lost — try one of
            these instead.
          </p>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {destinations.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex items-center justify-between gap-4 py-4 hover:text-accent"
                >
                  <span className="text-[15px] font-medium">{item.label}</span>
                  <span className="flex items-center gap-3 text-sm text-muted">
                    {item.note}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/" variant="secondary" className="mt-8 self-start">
            Back to home
          </ButtonLink>
        </div>
      </main>
    </div>
  );
}
