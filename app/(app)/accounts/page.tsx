import type { Metadata } from "next";
import { Wallet } from "lucide-react";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Accounts" };

export default function Page() {
  return (
    <PlannedPage
      eyebrow="02 — Accounts"
      title="Accounts"
      description="Every account in one place: balances, institutions and trends."
      icon={<Wallet />}
      planned={[
        "Grouped list of checking, savings, credit and investment accounts",
        "Balance history per account",
        "Assets vs. liabilities breakdown",
        "Manual account creation",
      ]}
    />
  );
}
