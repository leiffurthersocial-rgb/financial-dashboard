import type { CashFlowPeriod } from "@/types/finance";
import { formatCurrency, formatDate } from "@/lib/utils/format";

const monthLabel = (month: string) => formatDate(`${month}-01`, { month: "short" });

/**
 * Paired income/expense bars. Series are distinguished by fill *and* pattern
 * (solid vs hatched) plus a legend; a visually hidden table carries the data.
 */
export function CashFlowChart({ data, caption }: { data: CashFlowPeriod[]; caption: string }) {
  const max = Math.max(...data.flatMap((d) => [d.income, d.expenses]));

  return (
    <figure>
      <div
        className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted"
        aria-hidden
      >
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-[2px] bg-accent" /> Income
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-[2px] border border-fg/50 bg-[repeating-linear-gradient(135deg,var(--muted)_0_1.5px,transparent_1.5px_4px)]" />
          Expenses
        </span>
      </div>

      <div
        aria-hidden
        className="relative grid h-48 grid-cols-6 items-end gap-3 border-b border-line md:gap-5"
      >
        {[0.25, 0.5, 0.75, 1].map((line) => (
          <span
            key={line}
            className="absolute inset-x-0 border-t border-dashed border-line"
            style={{ bottom: `${line * 100}%` }}
          />
        ))}
        {data.map((period, i) => (
          <div key={period.month} className="relative flex h-full items-end justify-center gap-1">
            <Bar ratio={period.income / max} delay={i * 50} className="bg-accent" />
            <Bar
              ratio={period.expenses / max}
              delay={i * 50 + 25}
              className="border border-fg/40 bg-[repeating-linear-gradient(135deg,var(--muted)_0_1.5px,transparent_1.5px_5px)]"
            />
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="mt-2 grid grid-cols-6 gap-3 text-center font-mono text-[11px] tracking-wide text-muted uppercase md:gap-5"
      >
        {data.map((period) => (
          <span key={period.month}>{monthLabel(period.month)}</span>
        ))}
      </div>

      <table className="sr-only">
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Income</th>
            <th scope="col">Expenses</th>
          </tr>
        </thead>
        <tbody>
          {data.map((period) => (
            <tr key={period.month}>
              <th scope="row">
                {formatDate(`${period.month}-01`, { month: "long", year: "numeric" })}
              </th>
              <td>{formatCurrency(period.income)}</td>
              <td>{formatCurrency(period.expenses)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

function Bar({ ratio, delay, className }: { ratio: number; delay: number; className: string }) {
  return (
    <span
      className={`block w-full max-w-5 origin-bottom rounded-t-[min(var(--r-control),3px)] transition-transform duration-700 ease-out starting:scale-y-0 ${className}`}
      style={{ height: `${Math.max(ratio * 100, 2)}%`, transitionDelay: `${delay}ms` }}
    />
  );
}
