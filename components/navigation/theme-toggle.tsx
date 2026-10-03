"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { usePreferences } from "@/components/providers/preferences-provider";
import { IconButton } from "@/components/ui/icon-button";
import type { ThemePreference } from "@/types/preferences";

const order: ThemePreference[] = ["light", "dark", "system"];
const icons = { light: Sun, dark: Moon, system: Monitor } as const;
const names = { light: "Light", dark: "Dark", system: "System" } as const;

export function ThemeToggle() {
  const [{ theme }, setPreferences] = usePreferences();
  const next = order[(order.indexOf(theme) + 1) % order.length];
  const Icon = icons[theme];
  return (
    <IconButton
      label={`Theme: ${names[theme]}. Switch to ${names[next]}`}
      onClick={() => setPreferences({ theme: next })}
    >
      <Icon aria-hidden strokeWidth={1.75} />
    </IconButton>
  );
}
