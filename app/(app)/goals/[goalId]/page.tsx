import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PlannedPage } from "@/components/feedback/planned-page";

export const metadata: Metadata = { title: "Goal" };

export default async function Page({ params }: PageProps<"/goals/[goalId]">) {
  const { goalId } = await params;
  return (
    <>
      <Link
        href="/goals"
        className="mb-6 inline-flex items-center gap-1.5 rounded-control text-sm font-medium text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Goals
      </Link>
      <PlannedPage
        eyebrow={`Goals / ${goalId}`}
        title="Goal detail"
        description="Detail views will load the record by ID once Supabase is connected."
        planned={["Progress and projection", "Contribution log", "Edit target and date"]}
      />
    </>
  );
}
