import type { Account, CashFlowPeriod } from "@/types/finance";

/** Pure financial calculations — no formatting, no I/O. All values in minor units. */

const LIABILITY_TYPES = new Set<Account["type"]>(["credit", "loan"]);

export function summarizeAccounts(accounts: Account[]) {
  let assets = 0;
  let liabilities = 0;
  let cash = 0;
  let investments = 0;
  for (const account of accounts) {
    if (LIABILITY_TYPES.has(account.type) || account.balance < 0) {
      liabilities += Math.abs(account.balance);
    } else {
      assets += account.balance;
    }
    if (account.type === "checking" || account.type === "savings") cash += account.balance;
    if (account.type === "investment") investments += account.balance;
  }
  return { assets, liabilities, cash, investments, netWorth: assets - liabilities };
}

/** Relative change between two values; 0 when there is no baseline. */
export function relativeChange(current: number, previous: number) {
  if (previous === 0) return 0;
  return (current - previous) / Math.abs(previous);
}

export function netCashFlow(period: CashFlowPeriod) {
  return period.income - period.expenses;
}

export function savingsRate(period: CashFlowPeriod) {
  return period.income === 0 ? 0 : netCashFlow(period) / period.income;
}
