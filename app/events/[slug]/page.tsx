import type { Metadata } from "next";
import { Suspense } from "react";
import { EventGate } from "@/components/event-gate";
import { events, getEvent } from "@/lib/events";

export async function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) {
    return { title: "Event | BuyersEdge" };
  }
  return {
    title: `${event.title} in ${event.city} | BuyersEdge`,
    description: event.description[0],
  };
}

export default function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<EventFallback />}>
      <EventContent params={params} />
    </Suspense>
  );
}

async function EventContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug) ?? null;
  return <EventGate slug={slug} catalog={event} />;
}

function EventFallback() {
  return (
    <div className="mx-auto w-full max-w-screen-xl animate-pulse px-5 py-8">
      <div className="h-4 w-64 rounded bg-zinc-200" />
      <div className="mt-6 aspect-[16/7] rounded-2xl bg-zinc-200" />
      <div className="mt-6 h-8 w-80 rounded bg-zinc-200" />
      <div className="mt-4 h-24 rounded bg-zinc-100" />
    </div>
  );
}
