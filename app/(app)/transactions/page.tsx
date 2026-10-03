import type { Metadata } from "next";
import { ArrowLeftRight } from "lucide-react";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Transactions" };

export default function Page() {
  return (
    <PlannedPage
      eyebrow="03 — Transactions"
      title="Transactions"
      description="Search, filter and categorise every movement of money."
      icon={<ArrowLeftRight />}
      planned={[
        "Virtualised, searchable transaction table",
        "Filters by account, category, date and amount",
        "Bulk re-categorisation",
        "Responsive card layout on phones",
      ]}
    />
  );
}
