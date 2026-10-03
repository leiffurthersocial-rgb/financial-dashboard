import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TransactionRow } from "@/components/finance/transaction-row";
import type { Account, Category, Transaction } from "@/types/finance";

export function RecentTransactionsCard({
  transactions,
  accounts,
  categories,
}: {
  transactions: Transaction[];
  accounts: Account[];
  categories: Category[];
}) {
  const accountName = new Map(accounts.map((a) => [a.id, a.name]));
  const categoryName = new Map(categories.map((c) => [c.id, c.name]));
  return (
    <Card aria-labelledby="transactions-heading" className="h-full">
      <CardHeader
        eyebrow="Latest activity"
        title={<span id="transactions-heading">Recent transactions</span>}
        action={
          <Link
            href="/transactions"
            className="inline-flex items-center gap-1 rounded-control text-[13px] font-medium text-accent hover:underline"
          >
            View all <ArrowRight aria-hidden className="size-3.5" />
          </Link>
        }
      />
      <CardContent className="pt-2">
        <ul className="divide-y divide-line">
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              accountName={accountName.get(transaction.accountId) ?? "Unknown account"}
              categoryName={categoryName.get(transaction.categoryId) ?? "Uncategorized"}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
