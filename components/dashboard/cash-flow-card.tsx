import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CashFlowChart } from "@/components/finance/cash-flow-chart";
import { netCashFlow, savingsRate } from "@/lib/finance/calculations";
import { formatCurrency, formatPercent } from "@/lib/utils/format";
import type { CashFlowPeriod } from "@/types/finance";

export function CashFlowCard({ data }: { data: CashFlowPeriod[] }) {
  // Last complete month — the current month is still in progress.
  const lastComplete = data[data.length - 2];
  return (
    <Card aria-labelledby="cash-flow-heading" className="h-full">
      <CardHeader
        eyebrow="Last six months"
        title={<span id="cash-flow-heading">Cash flow</span>}
        action={
          <dl className="flex gap-6 text-right">
            <div>
              <dt className="text-xs text-muted">Net (Sep)</dt>
              <dd className="tabular text-sm font-medium">
                {formatCurrency(netCashFlow(lastComplete), {
                  signDisplay: "exceptZero",
                  fractionDigits: 0,
                })}
              </dd>
            </div>
            <div className="hidden sm:block">
              <dt className="text-xs text-muted">Savings rate</dt>
              <dd className="tabular text-sm font-medium">
                {formatPercent(savingsRate(lastComplete))}
              </dd>
            </div>
          </dl>
        }
      />
      <CardContent>
        <CashFlowChart data={data} caption="Monthly income and expenses, May to October 2026" />
      </CardContent>
    </Card>
  );
}
