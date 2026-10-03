"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, BellOff, Info } from "lucide-react";
import { Brand } from "./brand";
import { ThemeToggle } from "./theme-toggle";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/icon-button";
import { Sheet } from "@/components/ui/sheet";

export function TopBar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/70">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 md:px-8 xl:px-12">
        <Brand href="/dashboard" className="md:hidden" />
        <Badge tone="neutral" className="hidden md:inline-flex">
          <Info aria-hidden />
          Demo data
        </Badge>

        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <IconButton label="Notifications" onClick={() => setNotificationsOpen(true)}>
            <Bell aria-hidden strokeWidth={1.75} />
          </IconButton>
          <Link
            href="/settings/profile"
            aria-label="Profile settings"
            className="ml-1 grid size-8 place-items-center rounded-full bg-fg text-[11px] font-semibold tracking-wide text-canvas transition-transform hover:scale-105"
          >
            <span aria-hidden>DU</span>
          </Link>
        </div>
      </div>

      <Sheet
        open={notificationsOpen}
        onOpenChange={setNotificationsOpen}
        title="Notifications"
        description="Budget alerts, goal milestones and account activity."
        variant="side"
      >
        <div className="grid place-items-center gap-3 rounded-card border border-dashed border-line px-6 py-12 text-center">
          <BellOff aria-hidden className="size-5 text-muted" strokeWidth={1.75} />
          <p className="text-sm font-medium">You&rsquo;re all caught up</p>
          <p className="max-w-60 text-sm text-muted">
            Notifications will appear here once accounts are connected.
          </p>
        </div>
      </Sheet>
    </header>
  );
}
