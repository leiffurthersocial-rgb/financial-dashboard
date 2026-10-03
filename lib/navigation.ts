import {
  ArrowLeftRight,
  ChartNoAxesColumn,
  Goal,
  LayoutGrid,
  PieChart,
  Settings,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Shown in the mobile tab bar (max four; the rest live under "More"). */
  mobile?: boolean;
}

export const primaryNav: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid, mobile: true },
  { href: "/accounts", label: "Accounts", icon: Wallet, mobile: true },
  { href: "/transactions", label: "Transactions", icon: ArrowLeftRight, mobile: true },
  { href: "/budgets", label: "Budgets", icon: PieChart, mobile: true },
  { href: "/goals", label: "Goals", icon: Goal },
  { href: "/analytics", label: "Analytics", icon: ChartNoAxesColumn },
];

export const secondaryNav: NavItem[] = [{ href: "/settings", label: "Settings", icon: Settings }];

export const settingsNav = [
  { href: "/settings/profile", label: "Profile", description: "Name, email and avatar" },
  {
    href: "/settings/appearance",
    label: "Appearance",
    description: "Theme, style, density and motion",
  },
  { href: "/settings/dashboard", label: "Dashboard", description: "Widgets and layout" },
  { href: "/settings/notifications", label: "Notifications", description: "Alerts and digests" },
  { href: "/settings/security", label: "Security", description: "Password and sessions" },
  { href: "/settings/data", label: "Data", description: "Export and deletion" },
] as const;

export function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Every route in the app, grouped for the /sitemap page. */
export const siteMap: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "General",
    links: [
      { href: "/", label: "Home" },
      { href: "/sitemap", label: "Sitemap" },
    ],
  },
  {
    heading: "Account access",
    links: [
      { href: "/login", label: "Log in" },
      { href: "/signup", label: "Sign up" },
      { href: "/forgot-password", label: "Reset password" },
    ],
  },
  {
    heading: "Finance",
    links: primaryNav.map(({ href, label }) => ({ href, label })),
  },
  {
    heading: "Settings",
    links: [
      { href: "/settings", label: "Overview" },
      ...settingsNav.map(({ href, label }) => ({ href, label })),
    ],
  },
];
