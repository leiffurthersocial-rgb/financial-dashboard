import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/navigation/page-header";
import { Card } from "@/components/ui/card";
import { settingsNav } from "@/lib/navigation";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="07 — Settings"
        title="Settings"
        description="Account, appearance and data preferences."
      />
      <ul className="grid gap-gutter sm:grid-cols-2">
        {settingsNav.map((item, index) => (
          <li key={item.href}>
            <Card as="div" interactive className="relative h-full">
              <Link
                href={item.href}
                className="flex h-full flex-col gap-6 rounded-card p-card after:absolute after:inset-0"
              >
                <span className="flex items-center justify-between font-mono text-[11px] text-subtle">
                  {String(index + 1).padStart(2, "0")}
                  <ArrowUpRight aria-hidden className="size-4" />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold tracking-[-0.01em] text-fg">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm text-muted">{item.description}</span>
                </span>
              </Link>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
