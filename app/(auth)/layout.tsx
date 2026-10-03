import { Brand } from "@/components/navigation/brand";
import { ThemeToggle } from "@/components/navigation/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-col px-4 md:px-8 xl:px-12">
        <header className="flex h-16 items-center justify-between md:h-20">
          <Brand />
          <ThemeToggle />
        </header>
        <main
          id="main"
          tabIndex={-1}
          className="flex flex-1 items-center justify-center py-10 outline-none"
        >
          <div className="w-full max-w-sm">{children}</div>
        </main>
      </div>

      <aside
        aria-hidden
        className="relative hidden overflow-hidden border-l border-line bg-surface-2 lg:block"
      >
        <div className="grid-lines absolute inset-0 opacity-70" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <p className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase">
            Finance Dashboard
          </p>
          <div>
            <p className="text-[clamp(4rem,8vw,8rem)] leading-[0.85] font-semibold tracking-[-0.06em]">
              <span className="block">+12.4</span>
              <span className="block text-muted">%</span>
            </p>
            <p className="mt-6 max-w-xs text-sm text-muted">
              Illustrative figure. Track the numbers that matter, set precisely on the grid.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
