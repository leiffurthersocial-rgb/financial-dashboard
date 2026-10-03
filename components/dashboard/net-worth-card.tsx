import { Card } from "@/components/ui/card";
import { RollingNumber } from "@/components/feedback/rolling-number";
import { Delta } from "@/components/finance/delta";
import { Sparkline } from "@/components/finance/sparkline";
import { formatCurrency } from "@/lib/utils/format";

export function NetWorthCard({
  netWorth,
  change,
  assets,
  liabilities,
  history,
}: {
  netWorth: number;
  change: number;
  assets: number;
  liabilities: number;
  history: number[];
}) {
  return (
    <Card
      spotlight
      aria-labelledby="net-worth-heading"
      className="flex h-full flex-col justify-between gap-8 p-card md:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <h2
          id="net-worth-heading"
          className="text-[11px] font-medium tracking-[0.08em] text-muted uppercase"
        >
          Net worth
        </h2>
        <span className="font-mono text-[11px] text-subtle">USD</span>
      </div>

      <div>
        <RollingNumber
          value={formatCurrency(netWorth, { fractionDigits: 0 })}
          className="text-[2.75rem] leading-none font-semibold tracking-[-0.045em] sm:text-6xl xl:text-[4.25rem]"
        />
        <div className="mt-3">
          <Delta value={change} suffix="vs last month" />
        </div>
      </div>

      <div>
        <Sparkline values={history} />
        <p className="sr-only">Net worth has risen over the past seven months.</p>
        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-control border border-line bg-line">
          <div className="bg-card p-3">
            <dt className="text-xs text-muted">Assets</dt>
            <dd className="tabular mt-1 text-sm font-medium">
              {formatCurrency(assets, { fractionDigits: 0 })}
            </dd>
          </div>
          <div className="bg-card p-3">
            <dt className="text-xs text-muted">Liabilities</dt>
            <dd className="tabular mt-1 text-sm font-medium">
              <span aria-hidden>{"−"}</span>
              <span className="sr-only">minus </span>
              {formatCurrency(liabilities, { fractionDigits: 0 })}
            </dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}
