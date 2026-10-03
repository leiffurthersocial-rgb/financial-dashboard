import type { Metadata } from "next";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Notifications settings" };

export default function Page() {
  return (
    <PlannedPage
      eyebrow="Settings / Notifications"
      title="Notifications"
      description="Decide what you hear about, and how."
      planned={["Budget threshold alerts", "Goal milestones", "Weekly email digest"]}
    />
  );
}
