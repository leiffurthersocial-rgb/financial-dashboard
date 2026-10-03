import type { Transaction } from "@/types/finance";
import { Amount } from "./amount";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils/format";

export function TransactionRow({
  transaction,
  categoryName,
  accountName,
}: {
  transaction: Transaction;
  categoryName: string;
  accountName: string;
}) {
  return (
    <li className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 py-3.5">
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-control bg-surface-2 font-mono text-[11px] font-medium text-muted shadow-inset"
      >
        {categoryName.slice(0, 2).toUpperCase()}
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 truncate text-sm font-medium">
          <span className="truncate">{transaction.description}</span>
          {transaction.pending ? <Badge>Pending</Badge> : null}
        </p>
        <p className="mt-0.5 truncate text-xs text-muted">
          {categoryName}
          <span aria-hidden> · </span>
          <span className="sr-only">, </span>
          {accountName}
        </p>
      </div>
      <div className="text-right">
        <Amount value={transaction.amount} className="text-sm font-medium" />
        <p className="mt-0.5 text-xs text-muted">
          <time dateTime={transaction.date}>{formatDate(transaction.date)}</time>
        </p>
      </div>
    </li>
  );
}
