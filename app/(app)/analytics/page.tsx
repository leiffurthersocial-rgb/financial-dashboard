import type { Metadata } from "next";
import { ChartNoAxesColumn } from "lucide-react";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Analytics" };

export default function Page() {
  return (
    <PlannedPage
      eyebrow="06 — Analytics"
      title="Analytics"
      description="Spending patterns, cash flow and net worth over time."
      icon={<ChartNoAxesColumn />}
      planned={[
        "Spending by category and merchant",
        "Cash flow over custom ranges",
        "Net worth timeline",
        "Exportable reports",
      ]}
    />
  );
}
