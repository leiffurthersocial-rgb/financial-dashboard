import Link from "next/link";
import { ArrowRight, TriangleAlert } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProgressRing } from "@/components/feedback/progress-ring";
import { formatCurrency } from "@/lib/utils/format";
import type { Budget } from "@/types/finance";

export function BudgetsCard({ budgets }: { budgets: Budget[] }) {
  return (
    <Card aria-labelledby="budgets-heading" className="h-full">
      <CardHeader
        eyebrow="October"
        title={<span id="budgets-heading">Budgets</span>}
        action={
          <Link
            href="/budgets"
            className="inline-flex items-center gap-1 rounded-control text-[13px] font-medium text-accent hover:underline"
          >
            All budgets <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        }
      />
      <CardContent>
        <ul className="divide-y divide-line">
          {budgets.map((budget) => {
            const ratio = budget.spent / budget.limit;
            const over = ratio > 1;
            return (
              <li key={budget.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                <ProgressRing
                  value={ratio}
                  size={48}
                  strokeWidth={4}
                  label={`${budget.name} budget used`}
                >
                  <span className="tabular text-[11px] font-semibold">
                    {Math.round(ratio * 100)}%
                  </span>
                </ProgressRing>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-sm font-medium">
                    {budget.name}
                    {over ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-negative">
                        <TriangleAlert aria-hidden className="size-3.5" /> Over
                      </span>
                    ) : null}
                  </p>
                  <p className="tabular mt-0.5 text-xs text-muted">
                    {formatCurrency(budget.spent, { fractionDigits: 0 })} of{" "}
                    {formatCurrency(budget.limit, { fractionDigits: 0 })}
                  </p>
                </div>
                <p className="tabular text-right text-xs text-muted">
                  {over ? (
                    <>
                      <span className="font-medium text-negative">
                        {formatCurrency(budget.spent - budget.limit, { fractionDigits: 0 })}
                      </span>
                      <br />
                      over
                    </>
                  ) : (
                    <>
                      <span className="font-medium text-fg">
                        {formatCurrency(budget.limit - budget.spent, { fractionDigits: 0 })}
                      </span>
                      <br />
                      left
                    </>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
