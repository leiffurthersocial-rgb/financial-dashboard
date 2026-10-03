"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { usePreferences } from "@/components/providers/preferences-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { DEFAULT_PREFERENCES, PREFERENCE_OPTIONS } from "@/lib/preferences/options";
import { cn } from "@/lib/utils/cn";
import type { AccentColor } from "@/types/preferences";

const accentNames: Record<AccentColor, string> = {
  ultramarine: "Ultramarine",
  graphite: "Graphite",
  emerald: "Emerald",
  vermilion: "Vermilion",
  violet: "Violet",
};

const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
const optionsFor = <T extends string>(values: readonly T[], label: (v: T) => string = capitalize) =>
  values.map((value) => ({ value, label: label(value) }));

export function AppearanceSettings() {
  const [prefs, setPrefs] = usePreferences();

  return (
    <Card aria-labelledby="appearance-heading">
      <h2 id="appearance-heading" className="sr-only">
        Interface preferences
      </h2>
      <div className="divide-y divide-line">
        <Row title="Theme" description="Follow your system, or choose a fixed theme.">
          <SegmentedControl
            label="Theme"
            value={prefs.theme}
            onChange={(theme) => setPrefs({ theme })}
            options={[
              { value: "light", label: "Light", icon: <Sun aria-hidden /> },
              { value: "dark", label: "Dark", icon: <Moon aria-hidden /> },
              { value: "system", label: "System", icon: <Monitor aria-hidden /> },
            ]}
          />
        </Row>
        <Row
          title="Visual style"
          description="Swiss uses hairline rules; Minimal relies on tone; Soft adds gentle depth."
        >
          <SegmentedControl
            label="Visual style"
            value={prefs.style}
            onChange={(style) => setPrefs({ style })}
            options={optionsFor(PREFERENCE_OPTIONS.style)}
          />
        </Row>
        <Row title="Accent color" description="Used for highlights, focus and primary actions.">
          <div role="radiogroup" aria-label="Accent color" className="flex flex-wrap gap-2">
            {PREFERENCE_OPTIONS.accent.map((accent) => {
              const selected = prefs.accent === accent;
              return (
                <label
                  key={accent}
                  data-accent={accent}
                  title={accentNames[accent]}
                  className={cn(
                    "relative grid size-9 cursor-pointer place-items-center rounded-full transition-transform duration-200 hover:scale-105",
                    "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-fg",
                    selected && "ring-2 ring-fg ring-offset-2 ring-offset-card",
                  )}
                  style={{ background: "oklch(var(--accent-l) var(--accent-c) var(--accent-h))" }}
                >
                  <input
                    type="radio"
                    name="accent"
                    value={accent}
                    checked={selected}
                    onChange={() => setPrefs({ accent })}
                    className="sr-only"
                  />
                  <span className="sr-only">{accentNames[accent]}</span>
                  {selected ? (
                    <Check aria-hidden className="size-4 text-accent-fg" strokeWidth={2.5} />
                  ) : null}
                </label>
              );
            })}
          </div>
        </Row>
        <Row title="Corner radius" description="From sharp, poster-like edges to softly rounded.">
          <SegmentedControl
            label="Corner radius"
            value={prefs.radius}
            onChange={(radius) => setPrefs({ radius })}
            options={optionsFor(PREFERENCE_OPTIONS.radius)}
          />
        </Row>
        <Row title="Density" description="How much information fits on screen.">
          <SegmentedControl
            label="Density"
            value={prefs.density}
            onChange={(density) => setPrefs({ density })}
            options={optionsFor(PREFERENCE_OPTIONS.density)}
          />
        </Row>
        <Row
          title="Motion"
          description="Reduced turns off animations. System follows your OS accessibility setting."
        >
          <SegmentedControl
            label="Motion"
            value={prefs.motion}
            onChange={(motion) => setPrefs({ motion })}
            options={[
              { value: "system", label: "System" },
              { value: "reduce", label: "Reduced" },
            ]}
          />
        </Row>
      </div>
      <div className="flex justify-end border-t border-line p-card">
        <Button variant="ghost" size="sm" onClick={() => setPrefs(DEFAULT_PREFERENCES)}>
          Reset to defaults
        </Button>
      </div>
    </Card>
  );
}

function Row({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 p-card md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8">
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 max-w-sm text-sm text-muted">{description}</p>
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
