import type { Preferences } from "@/types/preferences";

/**
 * Allowed values for every preference. Shared by the runtime store, the
 * pre-paint script and the settings UI so they can never drift apart.
 */
export const PREFERENCE_OPTIONS = {
  theme: ["light", "dark", "system"],
  style: ["swiss", "minimal", "soft"],
  density: ["compact", "comfortable", "spacious"],
  radius: ["none", "small", "medium", "large"],
  accent: ["ultramarine", "graphite", "emerald", "vermilion", "violet"],
  motion: ["system", "reduce"],
} as const satisfies { [K in keyof Preferences]: readonly Preferences[K][] };

export const DEFAULT_PREFERENCES: Preferences = {
  theme: "system",
  style: "swiss",
  density: "comfortable",
  radius: "small",
  accent: "ultramarine",
  motion: "system",
};

export const PREFERENCES_STORAGE_KEY = "fd:preferences";

/** Merge untrusted stored data with defaults, dropping unknown values. */
export function sanitizePreferences(input: unknown): Preferences {
  const result: Preferences = { ...DEFAULT_PREFERENCES };
  if (!input || typeof input !== "object") return result;
  const record = input as Record<string, unknown>;
  for (const key of Object.keys(PREFERENCE_OPTIONS) as (keyof Preferences)[]) {
    const value = record[key];
    if ((PREFERENCE_OPTIONS[key] as readonly unknown[]).includes(value)) {
      (result as unknown as Record<string, unknown>)[key] = value;
    }
  }
  return result;
}
