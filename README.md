# Finance Dashboard

A calm, precise personal-finance dashboard. Swiss-inspired typography and grid, restrained depth, and a configurable design system.

> Current phase: **foundation**. All financial figures are fictional demo data (`lib/demo/data.ts`). Supabase is installed but not yet connected.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Supabase (`@supabase/ssr`) · ESLint · Prettier · Vercel

## Getting started

```bash
npm install
cp .env.example .env.local   # optional for now — Supabase isn't wired up yet
npm run dev
```

## Scripts

| Script              | Purpose                                   |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Development server                        |
| `npm run build`     | Production build                          |
| `npm run lint`      | ESLint                                    |
| `npm run typecheck` | Generate route types, then `tsc --noEmit` |
| `npm run format`    | Prettier (with Tailwind class sorting)    |
| `npm run check`     | Lint + typecheck + format check           |

## Structure

```
app/
  (marketing)/   /, /sitemap               public pages
  (auth)/        /login, /signup, /forgot-password
  (app)/         app shell + dashboard, accounts, transactions, budgets, goals, analytics, settings
  not-found.tsx  custom 404
  globals.css    design tokens
components/
  ui/            Button, IconButton, Card, Badge, Field, SegmentedControl, Sheet
  effects/       ripple, spotlight grid
  feedback/      toasts, loaders, progress ring/bar, rolling number, skeletons, empty states
  finance/       Amount, Delta, Sparkline, CashFlowChart, TransactionRow, MetricTile
  navigation/    AppShell, Sidebar, TopBar, MobileTabBar, PageHeader
  dashboard/     dashboard widgets
lib/
  preferences/   appearance preferences store + pre-paint script
  finance/       pure calculations (minor units)
  demo/          fictional data
  supabase/      browser/server client factories (unused yet)
  utils/         cn, formatting
types/
```

## Design system

Tokens are CSS variables driven by data attributes on `<html>`: `data-theme`, `data-style` (swiss/minimal/soft), `data-density`, `data-radius`, `data-accent`, `data-motion`. Components use semantic Tailwind utilities only (`bg-card`, `text-muted`, `shadow-card`, `h-control`, `p-card`…). Preferences are edited at `/settings/appearance` and persisted to localStorage for now.
