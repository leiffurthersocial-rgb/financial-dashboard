import type { Preferences } from "@/types/preferences";
import { applyPreferences } from "./apply";
import { DEFAULT_PREFERENCES, PREFERENCES_STORAGE_KEY, sanitizePreferences } from "./options";

/**
 * Tiny external store for UI preferences, persisted to localStorage.
 * Read via `useSyncExternalStore` so server and first client render agree
 * (defaults), then the client snaps to the stored values.
 *
 * Later this will sync with the `user_preferences` table for signed-in users.
 */
type Listener = () => void;

const listeners = new Set<Listener>();
let current: Preferences | null = null;

function readStorage(): Preferences {
  try {
    const raw = window.localStorage.getItem(PREFERENCES_STORAGE_KEY);
    return sanitizePreferences(raw ? JSON.parse(raw) : null);
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function getPreferences(): Preferences {
  if (current === null) current = readStorage();
  return current;
}

export function getServerPreferences(): Preferences {
  return DEFAULT_PREFERENCES;
}

export function setPreferences(patch: Partial<Preferences>) {
  current = { ...getPreferences(), ...patch };
  try {
    window.localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(current));
  } catch {
    // Storage may be unavailable (private mode); preferences still apply for this session.
  }
  applyPreferences(current);
  listeners.forEach((listener) => listener());
}

export function subscribePreferences(listener: Listener) {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key !== PREFERENCES_STORAGE_KEY) return;
    current = readStorage();
    applyPreferences(current);
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}
