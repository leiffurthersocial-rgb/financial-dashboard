import { MobileTabBar } from "./mobile-tab-bar";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

/**
 * Responsive application frame.
 *  - Phone  (<768):   top bar + bottom tab bar
 *  - Tablet (768+):   icon rail + top bar
 *  - Desktop (1280+): full sidebar + top bar
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh md:grid md:grid-cols-[72px_minmax(0,1fr)] xl:grid-cols-[248px_minmax(0,1fr)]">
      <Sidebar className="sticky top-0 hidden h-dvh md:flex" />
      <div className="flex min-w-0 flex-col">
        <TopBar />
        <main
          id="main"
          tabIndex={-1}
          className="flex-1 px-4 pt-8 pb-[calc(var(--tabbar-h)+env(safe-area-inset-bottom)+3rem)] outline-none md:px-8 md:pt-10 md:pb-16 xl:px-12"
        >
          <div className="mx-auto max-w-[1440px]">{children}</div>
        </main>
      </div>
      <MobileTabBar className="md:hidden" />
    </div>
  );
}
