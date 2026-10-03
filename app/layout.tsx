import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { SkipLink } from "@/components/navigation/skip-link";
import { PreferencesProvider } from "@/components/providers/preferences-provider";
import { ToastProvider } from "@/components/feedback/toast";
import { DEFAULT_PREFERENCES } from "@/lib/preferences/options";
import { preferencesScript } from "@/lib/preferences/script";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Finance Dashboard", template: "%s · Finance Dashboard" },
  description: "A calm, precise view of your accounts, budgets and goals.",
};

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#121214" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const defaults = DEFAULT_PREFERENCES;
  return (
    <html
      lang="en"
      // Defaults for the server render; the inline script swaps in stored preferences before paint.
      data-theme="light"
      data-style={defaults.style}
      data-density={defaults.density}
      data-radius={defaults.radius}
      data-accent={defaults.accent}
      data-motion={defaults.motion}
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferencesScript }} />
      </head>
      <body className="min-h-dvh">
        <SkipLink />
        <PreferencesProvider>
          <ToastProvider>{children}</ToastProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}
