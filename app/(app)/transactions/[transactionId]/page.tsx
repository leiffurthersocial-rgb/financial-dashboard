import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Transaction" };

export default async function Page({ params }: PageProps<"/transactions/[transactionId]">) {
  const { transactionId } = await params;
  return (
    <>
      <Link
        href="/transactions"
        className="mb-6 inline-flex items-center gap-1.5 rounded-control text-sm font-medium text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Transactions
      </Link>
      <PlannedPage
        eyebrow={`Transactions / ${transactionId}`}
        title="Transaction detail"
        description="Detail views will load the record by ID once Supabase is connected."
        planned={["Merchant and category details", "Notes and attachments", "Split transactions"]}
      />
    </>
  );
}
