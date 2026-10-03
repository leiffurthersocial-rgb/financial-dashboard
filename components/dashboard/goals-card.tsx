import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ProgressBar } from "@/components/feedback/progress-bar";
import { formatCurrency, formatDate, formatPercent } from "@/lib/utils/format";
import type { Goal } from "@/types/finance";

export function GoalsCard({ goals }: { goals: Goal[] }) {
  return (
    <Card aria-labelledby="goals-heading" className="h-full">
      <CardHeader eyebrow="Savings" title={<span id="goals-heading">Goals</span>} />
      <CardContent>
        <ul className="space-y-6">
          {goals.map((goal) => {
            const ratio = goal.saved / goal.target;
            return (
              <li key={goal.id}>
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <p className="text-sm font-medium">{goal.name}</p>
                  <p className="tabular text-xs text-muted">
                    {formatPercent(ratio, { fractionDigits: 0 })}
                  </p>
                </div>
                <ProgressBar value={ratio} label={`${goal.name} progress`} />
                <p className="tabular mt-2 flex justify-between text-xs text-muted">
                  <span>
                    {formatCurrency(goal.saved, { fractionDigits: 0 })} /{" "}
                    {formatCurrency(goal.target, { fractionDigits: 0 })}
                  </span>
                  <span>
                    by{" "}
                    <time dateTime={goal.targetDate}>
                      {formatDate(goal.targetDate, { month: "short", year: "numeric" })}
                    </time>
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
