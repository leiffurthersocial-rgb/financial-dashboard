import type { Metadata } from "next";
import { PageHeader } from "@/components/navigation/page-header";
import { AppearanceSettings } from "@/components/settings/appearance-settings";
import { ComponentPreview } from "@/components/settings/component-preview";

export const metadata: Metadata = { title: "Appearance settings" };

export default function AppearancePage() {
  return (
    <>
      <PageHeader
        eyebrow="Settings / Appearance"
        title="Appearance"
        description="Tune the interface to your taste. Preferences are saved on this device for now."
      />
      <div className="space-y-section">
        <AppearanceSettings />
        <ComponentPreview />
      </div>
    </>
  );
}
