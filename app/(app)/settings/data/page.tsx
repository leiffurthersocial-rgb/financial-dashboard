import type { Metadata } from "next";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Data settings" };

export default function Page() {
  return (
    <PlannedPage
      eyebrow="Settings / Data"
      title="Data"
      description="Export or delete your financial data."
      planned={["Export to CSV", "Delete demo data", "Delete account"]}
    />
  );
}
