import type { Metadata } from "next";
import Link from "next/link";
import { siteMap } from "@/lib/navigation";

export const metadata: Metadata = { title: "Sitemap" };

export default function SitemapPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-20 xl:px-12">
      <p className="mb-6 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">Index</p>
      <h1 className="text-5xl font-semibold tracking-[-0.045em] md:text-7xl">Sitemap</h1>
      <div className="mt-14 grid gap-12 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {siteMap.map((group) => (
          <section key={group.heading} aria-labelledby={`sitemap-${group.heading}`}>
            <h2
              id={`sitemap-${group.heading}`}
              className="text-[11px] font-medium tracking-[0.08em] text-muted uppercase"
            >
              {group.heading}
            </h2>
            <ul className="mt-4 space-y-1">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-baseline justify-between gap-4 rounded-control py-1.5 text-[15px] font-medium hover:text-accent"
                  >
                    {link.label}
                    <span className="font-mono text-[11px] text-subtle group-hover:text-accent">
                      {link.href}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
