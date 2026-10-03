import type { Metadata } from "next";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Security settings" };

export default function Page() {
  return (
    <PlannedPage
      eyebrow="Settings / Security"
      title="Security"
      description="Password, sessions and sign-in protection."
      planned={[
        "Change password",
        "Active sessions and sign-out everywhere",
        "Two-factor authentication",
      ]}
    />
  );
}
