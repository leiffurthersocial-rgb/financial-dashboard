import type { Metadata } from "next";
import { Goal } from "lucide-react";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Goals" };

export default function Page() {
  return (
    <PlannedPage
      eyebrow="05 — Goals"
      title="Goals"
      description="Savings targets with timelines and contributions."
      icon={<Goal />}
      planned={[
        "Goal cards with projected completion",
        "Contribution history",
        "Target date planning",
        "Milestone notifications",
      ]}
    />
  );
}
