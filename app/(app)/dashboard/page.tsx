import type { Metadata } from "next";
import { SpotlightGrid } from "@/components/effects/spotlight-grid";
import { BudgetsCard } from "@/components/dashboard/budgets-card";
import { CashFlowCard } from "@/components/dashboard/cash-flow-card";
import { GoalsCard } from "@/components/dashboard/goals-card";
import { NetWorthCard } from "@/components/dashboard/net-worth-card";
import { RecentTransactionsCard } from "@/components/dashboard/recent-transactions-card";
import { Delta } from "@/components/finance/delta";
import { MetricTile } from "@/components/finance/metric-tile";
import { PageHeader } from "@/components/navigation/page-header";
import { ButtonLink } from "@/components/ui/button";
import {
  demoAccounts,
  demoBudgets,
  demoCashFlow,
  demoCategories,
  demoGoals,
  demoNetWorthHistory,
  demoTransactions,
} from "@/lib/demo/data";
import { relativeChange, summarizeAccounts } from "@/lib/finance/calculations";
import { formatCurrency } from "@/lib/utils/format";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const summary = summarizeAccounts(demoAccounts);
  const previousNetWorth = demoNetWorthHistory[demoNetWorthHistory.length - 2];
  const [, , , , lastCompleteMonth, currentMonth] = demoCashFlow;

  return (
    <>
      <PageHeader
        eyebrow="01 — Overview · October 2026"
        title="Dashboard"
        description="Everything at a glance. Figures shown are fictional demo data."
        actions={
          <ButtonLink href="/settings/dashboard" variant="secondary" size="sm">
            Customize
          </ButtonLink>
        }
      />

      <SpotlightGrid className="grid gap-gutter md:grid-cols-2 xl:grid-cols-12">
        <div className="md:col-span-2 xl:col-span-7">
          <NetWorthCard
            netWorth={summary.netWorth}
            change={relativeChange(summary.netWorth, previousNetWorth)}
            assets={summary.assets}
            liabilities={summary.liabilities}
            history={demoNetWorthHistory}
          />
        </div>

        <div className="grid grid-cols-2 gap-gutter md:col-span-2 xl:col-span-5">
          <MetricTile
            label="Cash"
            value={formatCurrency(summary.cash, { fractionDigits: 0 })}
            meta={<p className="text-xs text-muted">2 accounts</p>}
          />
          <MetricTile
            label="Investments"
            value={formatCurrency(summary.investments, { fractionDigits: 0 })}
            meta={<Delta value={0.021} suffix="30d" />}
          />
          <MetricTile
            label="Spent · Sep"
            value={formatCurrency(lastCompleteMonth.expenses, { fractionDigits: 0 })}
            meta={
              <Delta
                value={relativeChange(lastCompleteMonth.expenses, demoCashFlow[3].expenses)}
                upIsGood={false}
                suffix="vs Aug"
              />
            }
          />
          <MetricTile
            label="Spent · Oct"
            value={formatCurrency(currentMonth.expenses, { fractionDigits: 0 })}
            meta={<p className="text-xs text-muted">Month to date</p>}
          />
        </div>

        <div className="md:col-span-2 xl:col-span-8">
          <CashFlowCard data={demoCashFlow} />
        </div>
        <div className="md:col-span-1 xl:col-span-4">
          <BudgetsCard budgets={demoBudgets} />
        </div>

        <div className="md:col-span-1 xl:order-last xl:col-span-4">
          <GoalsCard goals={demoGoals} />
        </div>
        <div className="md:col-span-2 xl:col-span-8">
          <RecentTransactionsCard
            transactions={demoTransactions}
            accounts={demoAccounts}
            categories={demoCategories}
          />
        </div>
      </SpotlightGrid>
    </>
  );
}
