import type { Metadata } from "next";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Dashboard settings" };

export default function Page() {
  return (
    <PlannedPage
      eyebrow="Settings / Dashboard"
      title="Dashboard"
      description="Choose which widgets appear and in what order."
      planned={["Show, hide and reorder widgets", "Per-device layouts", "Reset to default layout"]}
    />
  );
}
