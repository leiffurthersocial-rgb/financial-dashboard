"use client";

import { useState } from "react";
import { Download, Plus } from "lucide-react";
import { BouncingDots, EqualizerLoader, RingLoader } from "@/components/feedback/loaders";
import { ProgressRing } from "@/components/feedback/progress-ring";
import { RollingNumber } from "@/components/feedback/rolling-number";
import { Skeleton, SkeletonText } from "@/components/feedback/skeleton";
import { useToast } from "@/components/feedback/toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Sheet } from "@/components/ui/sheet";
import { formatCurrency } from "@/lib/utils/format";

/**
 * Live preview of the design system under the current preferences.
 * Interactions here are local demonstrations — nothing is saved or sent.
 */
export function ComponentPreview() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [value, setValue] = useState(1_639_680_300);
  const [ring, setRing] = useState(0.68);
  const [sheet, setSheet] = useState<"dialog" | "side" | null>(null);

  function simulateSave() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Preview saved",
        description: "Demonstration only — nothing was stored.",
        tone: "success",
      });
    }, 1400);
  }

  function simulateExport() {
    let current = 0;
    setProgress(0);
    const timer = setInterval(() => {
      current = Math.min(current + 0.12 + Math.random() * 0.1, 1);
      setProgress(current);
      if (current >= 1) {
        clearInterval(timer);
        setTimeout(() => setProgress(undefined), 300);
      }
    }, 220);
  }

  return (
    <section aria-labelledby="preview-heading" className="space-y-gutter">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="preview-heading" className="text-lg font-semibold tracking-[-0.015em]">
          Component preview
        </h2>
        <Badge tone="accent">Demo</Badge>
      </div>

      <div className="grid gap-gutter lg:grid-cols-2">
        <Card>
          <CardHeader titleAs="h3" eyebrow="Actions" title="Buttons" />
          <CardContent className="flex flex-wrap gap-2">
            <Button onClick={() => toast({ title: "Primary action" })}>
              <Plus aria-hidden className="size-4" /> Primary
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Delete</Button>
            <Button
              variant="secondary"
              loading={loading}
              loadingLabel="Saving"
              onClick={simulateSave}
            >
              Save with loader
            </Button>
            <Button variant="secondary" progress={progress} onClick={simulateExport}>
              <Download aria-hidden className="size-4" />
              {progress === undefined ? "Export" : `Exporting ${Math.round(progress * 100)}%`}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader titleAs="h3" eyebrow="Feedback" title="Toasts & sheets" />
          <CardContent className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={() =>
                toast({
                  title: "Budget updated",
                  description: "Groceries limit set to $600.",
                  tone: "success",
                })
              }
            >
              Success toast
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast({
                  title: "Sync failed",
                  description: "Couldn't reach the server.",
                  tone: "error",
                })
              }
            >
              Error toast
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast({ title: "Heads up", description: "Statements are generated monthly." })
              }
            >
              Neutral toast
            </Button>
            <Button variant="ghost" onClick={() => setSheet("dialog")}>
              Open dialog
            </Button>
            <Button variant="ghost" onClick={() => setSheet("side")}>
              Open side sheet
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader titleAs="h3" eyebrow="Status" title="Loaders & progress" />
          <CardContent className="flex flex-wrap items-center gap-8 text-accent">
            <BouncingDots />
            <RingLoader />
            <EqualizerLoader />
            <ProgressRing value={ring} label="Example progress">
              <span className="tabular text-xs font-semibold text-fg">
                {Math.round(ring * 100)}%
              </span>
            </ProgressRing>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRing(Math.round(Math.random() * 115) / 100)}
            >
              Randomize
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader titleAs="h3" eyebrow="Numbers" title="Rolling counter" />
          <CardContent className="flex flex-wrap items-end justify-between gap-4">
            <RollingNumber
              value={formatCurrency(value)}
              className="text-4xl font-semibold tracking-[-0.04em]"
            />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setValue((v) => v + Math.round((Math.random() - 0.4) * 5_000_000))}
            >
              Change value
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader titleAs="h3" eyebrow="Placeholders" title="Skeletons & shimmer" />
          <CardContent className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] md:items-center">
            <Skeleton className="size-12 rounded-full" />
            <SkeletonText lines={3} />
            <div className="space-y-2" aria-hidden>
              <Skeleton className="h-8 w-40" />
              <Skeleton className="h-3 w-24" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Sheet
        open={sheet !== null}
        onOpenChange={(open) => !open && setSheet(null)}
        variant={sheet ?? "dialog"}
        title={sheet === "side" ? "Side sheet" : "Dialog"}
        description="On phones this becomes a bottom sheet."
        footer={
          <>
            <Button variant="ghost" onClick={() => setSheet(null)}>
              Cancel
            </Button>
            <Button onClick={() => setSheet(null)}>Done</Button>
          </>
        }
      >
        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          <Field label="Budget name" placeholder="e.g. Groceries" />
          <Field
            label="Monthly limit"
            inputMode="decimal"
            placeholder="$0.00"
            hint="You can change this at any time."
          />
        </form>
      </Sheet>
    </section>
  );
}
