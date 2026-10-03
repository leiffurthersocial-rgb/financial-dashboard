import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Account" };

export default async function Page({ params }: PageProps<"/accounts/[accountId]">) {
  const { accountId } = await params;
  return (
    <>
      <Link
        href="/accounts"
        className="mb-6 inline-flex items-center gap-1.5 rounded-control text-sm font-medium text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Accounts
      </Link>
      <PlannedPage
        eyebrow={`Accounts / ${accountId}`}
        title="Account detail"
        description="Detail views will load the record by ID once Supabase is connected."
        planned={["Balance history chart", "Account transactions", "Account details and settings"]}
      />
    </>
  );
}
