import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Budget" };

export default async function Page({ params }: PageProps<"/budgets/[budgetId]">) {
  const { budgetId } = await params;
  return (
    <>
      <Link
        href="/budgets"
        className="mb-6 inline-flex items-center gap-1.5 rounded-control text-sm font-medium text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Budgets
      </Link>
      <PlannedPage
        eyebrow={`Budgets / ${budgetId}`}
        title="Budget detail"
        description="Detail views will load the record by ID once Supabase is connected."
        planned={[
          "Spending against limit over the month",
          "Contributing transactions",
          "Edit limits and categories",
        ]}
      />
    </>
  );
}
