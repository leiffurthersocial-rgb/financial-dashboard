"use client";

import { useEffect, useSyncExternalStore } from "react";
import { applyPreferences } from "@/lib/preferences/apply";
import {
  getPreferences,
  getServerPreferences,
  setPreferences,
  subscribePreferences,
} from "@/lib/preferences/store";

/** Keeps the resolved theme in sync with the OS while the "system" theme is selected. */
export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyPreferences(getPreferences());
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return children;
}

export function usePreferences() {
  const preferences = useSyncExternalStore(
    subscribePreferences,
    getPreferences,
    getServerPreferences,
  );
  return [preferences, setPreferences] as const;
}
