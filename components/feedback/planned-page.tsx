import { Check } from "lucide-react";
import { EmptyState } from "./empty-state";
import { PageHeader } from "@/components/navigation/page-header";

interface PlannedPageProps {
  eyebrow: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  planned: string[];
  children?: React.ReactNode;
}

/** Honest placeholder for routes whose functionality hasn't been built yet. */
export function PlannedPage({
  eyebrow,
  title,
  description,
  icon,
  planned,
  children,
}: PlannedPageProps) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      {children}
      <EmptyState
        icon={icon}
        title="Coming in a later phase"
        description="This screen is part of the route map but isn't built yet. It will include:"
      >
        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          {planned.map((item) => (
            <li key={item} className="flex items-start gap-2 text-muted">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>
      </EmptyState>
    </>
  );
}
