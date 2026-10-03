export type ThemePreference = "light" | "dark" | "system";
export type VisualStyle = "swiss" | "minimal" | "soft";
export type Density = "compact" | "comfortable" | "spacious";
export type RadiusScale = "none" | "small" | "medium" | "large";
export type AccentColor = "ultramarine" | "graphite" | "emerald" | "vermilion" | "violet";
export type MotionPreference = "system" | "reduce";

export interface Preferences {
  theme: ThemePreference;
  style: VisualStyle;
  density: Density;
  radius: RadiusScale;
  accent: AccentColor;
  motion: MotionPreference;
}
