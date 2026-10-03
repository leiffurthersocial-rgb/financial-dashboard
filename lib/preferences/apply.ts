import type { Preferences } from "@/types/preferences";

export function resolveTheme(theme: Preferences["theme"]): "light" | "dark" {
  if (theme !== "system") return theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Reflect preferences onto <html> as data attributes consumed by the design tokens. */
export function applyPreferences(prefs: Preferences) {
  const root = document.documentElement;
  const theme = resolveTheme(prefs.theme);
  root.dataset.theme = theme;
  root.dataset.style = prefs.style;
  root.dataset.density = prefs.density;
  root.dataset.radius = prefs.radius;
  root.dataset.accent = prefs.accent;
  root.dataset.motion = prefs.motion;
  root.style.colorScheme = theme;
}
