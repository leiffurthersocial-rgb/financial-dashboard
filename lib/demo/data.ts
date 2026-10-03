import type { Account, Budget, CashFlowPeriod, Category, Goal, Transaction } from "@/types/finance";

/**
 * Fictional demo data for the initial UI. Nothing here is real or persisted.
 * Will be replaced by Supabase queries scoped to the signed-in user.
 */

export const demoAccounts: Account[] = [
  {
    id: "acc_everyday",
    name: "Everyday",
    institution: "Northwind Bank",
    type: "checking",
    balance: 1_248_215,
    currency: "USD",
    mask: "4821",
  },
  {
    id: "acc_reserve",
    name: "Reserve",
    institution: "Northwind Bank",
    type: "savings",
    balance: 3_860_000,
    currency: "USD",
    mask: "1190",
  },
  {
    id: "acc_index",
    name: "Index portfolio",
    institution: "Meridian Invest",
    type: "investment",
    balance: 11_472_930,
    currency: "USD",
    mask: "7702",
  },
  {
    id: "acc_card",
    name: "Travel card",
    institution: "Atlas Card",
    type: "credit",
    balance: -184_342,
    currency: "USD",
    mask: "0034",
  },
];

export const demoCategories: Category[] = [
  { id: "cat_income", name: "Income" },
  { id: "cat_groceries", name: "Groceries" },
  { id: "cat_dining", name: "Dining" },
  { id: "cat_transport", name: "Transport" },
  { id: "cat_home", name: "Home" },
  { id: "cat_subscriptions", name: "Subscriptions" },
  { id: "cat_travel", name: "Travel" },
];

export const demoTransactions: Transaction[] = [
  {
    id: "txn_01",
    accountId: "acc_everyday",
    categoryId: "cat_groceries",
    description: "Market Hall",
    amount: -8_642,
    date: "2026-10-02",
    pending: true,
  },
  {
    id: "txn_02",
    accountId: "acc_everyday",
    categoryId: "cat_income",
    description: "Salary — Studio Kern",
    amount: 684_000,
    date: "2026-10-01",
  },
  {
    id: "txn_03",
    accountId: "acc_card",
    categoryId: "cat_dining",
    description: "Café Linea",
    amount: -1_850,
    date: "2026-09-30",
  },
  {
    id: "txn_04",
    accountId: "acc_everyday",
    categoryId: "cat_home",
    description: "Rent — October",
    amount: -245_000,
    date: "2026-09-30",
  },
  {
    id: "txn_05",
    accountId: "acc_card",
    categoryId: "cat_transport",
    description: "City Transit",
    amount: -4_200,
    date: "2026-09-29",
  },
  {
    id: "txn_06",
    accountId: "acc_card",
    categoryId: "cat_subscriptions",
    description: "Typeface Library",
    amount: -1_200,
    date: "2026-09-28",
  },
];

export const demoBudgets: Budget[] = [
  { id: "bud_groceries", name: "Groceries", limit: 60_000, spent: 41_380 },
  { id: "bud_dining", name: "Dining", limit: 30_000, spent: 32_450 },
  { id: "bud_transport", name: "Transport", limit: 15_000, spent: 8_400 },
];

export const demoGoals: Goal[] = [
  {
    id: "goal_emergency",
    name: "Emergency fund",
    target: 4_500_000,
    saved: 3_860_000,
    targetDate: "2027-03-01",
  },
  {
    id: "goal_studio",
    name: "Studio equipment",
    target: 850_000,
    saved: 312_000,
    targetDate: "2027-06-01",
  },
];

export const demoCashFlow: CashFlowPeriod[] = [
  { month: "2026-05", income: 684_000, expenses: 512_300 },
  { month: "2026-06", income: 684_000, expenses: 548_900 },
  { month: "2026-07", income: 731_500, expenses: 603_200 },
  { month: "2026-08", income: 684_000, expenses: 497_800 },
  { month: "2026-09", income: 702_000, expenses: 521_600 },
  { month: "2026-10", income: 684_000, expenses: 260_892 },
];

/** Net worth at month end, for the trend line. */
export const demoNetWorthHistory: number[] = [
  15_102_000, 15_288_400, 15_196_300, 15_604_800, 15_921_700, 16_169_000, 16_396_803,
];
