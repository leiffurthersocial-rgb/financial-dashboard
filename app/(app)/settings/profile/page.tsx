import type { Metadata } from "next";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Profile settings" };

export default function Page() {
  return (
    <PlannedPage
      eyebrow="Settings / Profile"
      title="Profile"
      description="Your name, email address and avatar."
      planned={[
        "Edit display name and avatar",
        "Change email address",
        "Currency and locale defaults",
      ]}
    />
  );
}
