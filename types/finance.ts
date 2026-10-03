/**
 * Domain types. Shapes mirror the planned Supabase tables (accounts,
 * transactions, categories, budgets, goals) in camelCase. Money is always
 * stored as integer minor units (cents) to avoid floating-point drift.
 */

export type AccountType = "checking" | "savings" | "credit" | "investment" | "loan";

export interface Account {
  id: string;
  name: string;
  institution: string;
  type: AccountType;
  /** Minor units. Liabilities are negative. */
  balance: number;
  currency: string;
  mask: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  categoryId: string;
  description: string;
  /** Minor units. Outflows negative, inflows positive. */
  amount: number;
  /** ISO 8601 date. */
  date: string;
  pending?: boolean;
}

export interface Budget {
  id: string;
  name: string;
  /** Minor units for the period. */
  limit: number;
  spent: number;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
  /** ISO 8601 date. */
  targetDate: string;
}

export interface CashFlowPeriod {
  /** ISO month, e.g. "2026-05". */
  month: string;
  income: number;
  expenses: number;
}
