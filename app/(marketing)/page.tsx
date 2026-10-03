import { ArrowRight } from "lucide-react";
import { SpotlightGrid } from "@/components/effects/spotlight-grid";
import { RollingNumber } from "@/components/feedback/rolling-number";
import { ProgressBar } from "@/components/feedback/progress-bar";
import { Delta } from "@/components/finance/delta";
import { Sparkline } from "@/components/finance/sparkline";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { demoAccounts, demoNetWorthHistory } from "@/lib/demo/data";
import { relativeChange, summarizeAccounts } from "@/lib/finance/calculations";
import { formatCurrency } from "@/lib/utils/format";

const principles = [
  {
    title: "Clarity",
    body: "One number per idea. Hierarchy set by type and the grid, not decoration.",
  },
  {
    title: "Control",
    body: "Accounts, budgets and goals in a single, consistent model you can shape.",
  },
  {
    title: "Calm",
    body: "Quiet surfaces and purposeful motion. Nothing competes for your attention.",
  },
];

export default function HomePage() {
  const { netWorth } = summarizeAccounts(demoAccounts);
  const change = relativeChange(netWorth, demoNetWorthHistory[demoNetWorthHistory.length - 2]);

  return (
    <>
      <section aria-labelledby="hero-heading" className="relative">
        <div
          aria-hidden
          className="grid-lines pointer-events-none absolute inset-0 mx-4 opacity-60 md:mx-8 xl:mx-12"
        />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-4 pt-12 pb-20 md:px-8 md:pt-20 md:pb-28 lg:grid-cols-12 xl:px-12">
          <div className="lg:col-span-8">
            <p className="mb-8 font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
              Personal finance <span aria-hidden>/</span> 2026
            </p>
            <h1
              id="hero-heading"
              className="text-[clamp(3.25rem,11vw,9.5rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-balance"
            >
              Money,
              <br />
              <span className="text-muted">measured.</span>
            </h1>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-pretty text-muted">
              A calm, precise view of your accounts, budgets and goals — set on a strict grid,
              designed to be read at a glance.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/dashboard" size="lg">
                Explore the demo <ArrowRight aria-hidden className="size-4" />
              </ButtonLink>
              <ButtonLink href="/signup" size="lg" variant="secondary">
                Create account
              </ButtonLink>
            </div>
          </div>

          <SpotlightGrid className="flex flex-col justify-end gap-gutter lg:col-span-4">
            <Card as="div" spotlight className="p-card">
              <p className="text-[11px] font-medium tracking-[0.08em] text-muted uppercase">
                Net worth · demo
              </p>
              <RollingNumber
                value={formatCurrency(netWorth, { fractionDigits: 0 })}
                className="mt-6 text-4xl font-semibold tracking-[-0.045em]"
              />
              <div className="mt-2">
                <Delta value={change} suffix="this month" />
              </div>
              <Sparkline values={demoNetWorthHistory} className="mt-6" />
            </Card>
            <Card as="div" spotlight className="p-card">
              <div className="mb-3 flex items-baseline justify-between">
                <p className="text-sm font-medium">Emergency fund</p>
                <p className="tabular text-xs text-muted">86%</p>
              </div>
              <ProgressBar value={0.86} label="Emergency fund progress" />
            </Card>
          </SpotlightGrid>
        </div>
      </section>

      <section aria-labelledby="principles-heading" className="border-t border-line">
        <div className="mx-auto max-w-[1440px] px-4 py-16 md:px-8 md:py-24 xl:px-12">
          <h2 id="principles-heading" className="sr-only">
            Principles
          </h2>
          <ol className="grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
            {principles.map((item, index) => (
              <li key={item.title} className="md:px-8 md:first:pl-0 md:last:pr-0">
                <p className="font-mono text-[11px] text-subtle">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
