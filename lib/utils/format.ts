/**
 * Formatting helpers. Locale and time zone are pinned so server and client
 * output match during hydration; make these user-configurable later via
 * `user_preferences`.
 */
const LOCALE = "en-US";
const TIME_ZONE = "UTC";

const currencyFormatters = new Map<string, Intl.NumberFormat>();

/** Format an amount stored in minor units (cents). */
export function formatCurrency(
  amountMinor: number,
  {
    currency = "USD",
    signDisplay = "auto",
    compact = false,
    fractionDigits,
  }: {
    currency?: string;
    signDisplay?: Intl.NumberFormatOptions["signDisplay"];
    compact?: boolean;
    fractionDigits?: number;
  } = {},
) {
  const key = `${currency}|${signDisplay}|${compact}|${fractionDigits}`;
  let formatter = currencyFormatters.get(key);
  if (!formatter) {
    formatter = new Intl.NumberFormat(LOCALE, {
      style: "currency",
      currency,
      signDisplay,
      notation: compact ? "compact" : "standard",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits ?? (compact ? 1 : 2),
    });
    currencyFormatters.set(key, formatter);
  }
  return formatter.format(amountMinor / 100);
}

export function formatPercent(
  ratio: number,
  { signDisplay = "auto" as Intl.NumberFormatOptions["signDisplay"], fractionDigits = 1 } = {},
) {
  return new Intl.NumberFormat(LOCALE, {
    style: "percent",
    signDisplay,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(ratio);
}

export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" },
) {
  return new Intl.DateTimeFormat(LOCALE, { timeZone: TIME_ZONE, ...options }).format(new Date(iso));
}
