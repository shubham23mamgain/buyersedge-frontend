"use client";

import Link from "next/link";
import { EventDetail } from "@/components/event-detail";
import { useAuth } from "@/components/auth-provider";
import type { EventItem } from "@/lib/events";

export function EventGate({
  slug,
  catalog,
}: {
  slug: string;
  catalog: EventItem | null;
}) {
  const { hostedEvents, ready } = useAuth();
  const event = catalog ?? hostedEvents.find((item) => item.slug === slug) ?? null;

  if (!event) {
    if (!ready && !catalog) {
      return (
        <div className="mx-auto w-full max-w-screen-xl animate-pulse px-5 py-8">
          <div className="h-4 w-64 rounded bg-zinc-200" />
          <div className="mt-6 aspect-[16/7] rounded-2xl bg-zinc-200" />
        </div>
      );
    }
    return (
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-2 text-2xl font-bold">This event could not be found</h1>
        <p className="mt-2 max-w-md text-sm text-muted">
          The listing may have ended, or the link is incorrect.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-white"
        >
          Back to events
        </Link>
      </main>
    );
  }

  return <EventDetail event={event} />;
}
