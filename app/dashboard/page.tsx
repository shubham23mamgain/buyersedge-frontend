"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { CalendarDays, MapPin, Plus, Ticket } from "lucide-react";
import { CATEGORIES, CITIES, formatCardDate, formatPrice } from "@/lib/events";
import { useAuth } from "@/components/auth-provider";
import { AuthField, authInputClass, authPrimaryBtn } from "@/components/auth-shell";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex flex-1 items-center justify-center py-24 text-sm text-muted">Loading dashboard…</div>}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ready, user, hostedEvents, publishEvent } = useAuth();
  const [creating, setCreating] = useState(searchParams.get("create") === "1");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Expo");
  const [city, setCity] = useState<(typeof CITIES)[number]>("Bengaluru");
  const [venue, setVenue] = useState("");
  const [address, setAddress] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [price, setPrice] = useState("0");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (ready && user?.role !== "organizer") router.replace("/login");
  }, [ready, user, router]);

  const mine = useMemo(
    () =>
      hostedEvents.filter(
        (event) =>
          event.host.name === user?.orgName || event.host.name === user?.name,
      ),
    [hostedEvents, user],
  );

  if (!ready || user?.role !== "organizer") {
    return <div className="flex flex-1 items-center justify-center py-24 text-sm text-muted">Loading dashboard…</div>;
  }

  function onPublish(event: React.FormEvent) {
    event.preventDefault();
    const created = publishEvent({
      title: title.trim(),
      category,
      city,
      venue: venue.trim(),
      address: address.trim() || `${venue.trim()}, ${city}`,
      start: new Date(start).toISOString(),
      end: new Date(end || start).toISOString(),
      price: Number(price) || 0,
      description: description.trim(),
    });
    setCreating(false);
    setTitle("");
    setVenue("");
    setAddress("");
    setStart("");
    setEnd("");
    setPrice("0");
    setDescription("");
    router.push(`/events/${created.slug}`);
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-primary">Organizer dashboard</p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">
            Welcome back, {user.orgName || user.name}
          </h1>
          <p className="mt-2 text-sm text-muted">
            Create a listing, publish tickets and watch it appear on the BuyersEdge homepage.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCreating(true)}
          className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-white hover:bg-primary/90"
        >
          <Plus className="size-4" />
          Create event
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Events hosted" value={String(mine.length)} icon={CalendarDays} />
        <Stat label="Cities live" value={String(new Set(mine.map((item) => item.city)).size)} icon={MapPin} />
        <Stat
          label="Starting from"
          value={mine.length ? formatPrice(mine[0]) : "—"}
          icon={Ticket}
        />
      </div>

      {creating ? (
        <form
          onSubmit={onPublish}
          className="mt-8 rounded-2xl border border-border bg-white p-5 shadow-card sm:p-8"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">New real estate event</h2>
              <p className="mt-1 text-sm text-muted">These details show up on the public listing.</p>
            </div>
            <button type="button" className="text-sm text-muted" onClick={() => setCreating(false)}>
              Cancel
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <AuthField label="Event name">
              <input
                required
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Pune Housing Expo 2027"
                className={authInputClass}
              />
            </AuthField>
            <AuthField label="Category">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as (typeof CATEGORIES)[number])}
                className={authInputClass}
              >
                {CATEGORIES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </AuthField>
            <AuthField label="City">
              <select
                value={city}
                onChange={(event) => setCity(event.target.value as (typeof CITIES)[number])}
                className={authInputClass}
              >
                {CITIES.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </AuthField>
            <AuthField label="Venue">
              <input
                required
                value={venue}
                onChange={(event) => setVenue(event.target.value)}
                placeholder="JW Marriott"
                className={authInputClass}
              />
            </AuthField>
            <AuthField label="Address">
              <input
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Optional street address"
                className={authInputClass}
              />
            </AuthField>
            <AuthField label="Ticket price (₹)">
              <input
                type="number"
                min={0}
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className={authInputClass}
              />
            </AuthField>
            <AuthField label="Starts">
              <input
                required
                type="datetime-local"
                value={start}
                onChange={(event) => setStart(event.target.value)}
                className={authInputClass}
              />
            </AuthField>
            <AuthField label="Ends">
              <input
                type="datetime-local"
                value={end}
                onChange={(event) => setEnd(event.target.value)}
                className={authInputClass}
              />
            </AuthField>
            <div className="sm:col-span-2">
              <AuthField label="About the event">
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  placeholder="What should buyers, brokers and developers expect?"
                  className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                />
              </AuthField>
            </div>
          </div>
          <button type="submit" className={`mt-6 sm:w-auto sm:px-8 ${authPrimaryBtn}`}>
            Publish event
          </button>
        </form>
      ) : null}

      <section className="mt-10">
        <h2 className="text-lg font-bold">Your events</h2>
        {mine.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-border px-5 py-10 text-center text-sm text-muted">
            You haven&apos;t published an event yet. Create one to list it on the homepage.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-border rounded-2xl border border-border">
            {mine.map((event) => (
              <li key={event.slug} className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-muted">
                    {event.city} · {formatCardDate(event.start)}
                  </p>
                </div>
                <Link
                  href={`/events/${event.slug}`}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  View listing
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: typeof CalendarDays;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{label}</p>
        <Icon className="size-4 text-primary" />
      </div>
      <p className="mt-2 text-2xl font-extrabold">{value}</p>
    </div>
  );
}
