import type { Metadata } from "next";
import { PieChart } from "lucide-react";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Budgets" };

export default function Page() {
  return (
    <PlannedPage
      eyebrow="04 — Budgets"
      title="Budgets"
      description="Monthly limits by category, tracked against real spending."
      icon={<PieChart />}
      planned={[
        "Budget list with progress rings",
        "Category allocation",
        "Rollover and alert thresholds",
        "Month-over-month comparison",
      ]}
    />
  );
}
