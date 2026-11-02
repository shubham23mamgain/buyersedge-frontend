"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  MapPin,
  Share2,
  ThumbsUp,
  X,
} from "lucide-react";
import {
  formatLongDate,
  formatPrice,
  formatSidebarWhen,
  formatTimeRange,
  type EventItem,
} from "@/lib/events";

export function EventDetail({ event }: { event: EventItem }) {
  const { user, openLogin, addTicket } = useAuth();
  const [interested, setInterested] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [ticket, setTicket] = useState(event.tickets[0]?.name ?? "");
  const [qty, setQty] = useState(1);
  const [booked, setBooked] = useState(false);
  const [copied, setCopied] = useState(false);

  const selected = event.tickets.find((item) => item.name === ticket) ?? event.tickets[0];
  const total = (selected?.price ?? 0) * qty;
  const shareUrl = typeof window === "undefined" ? "" : window.location.href;

  const mapSrc = useMemo(
    () =>
      `https://www.openstreetmap.org/export/embed.html?bbox=${event.lng - 0.02}%2C${event.lat - 0.012}%2C${event.lng + 0.02}%2C${event.lat + 0.012}&layer=mapnik&marker=${event.lat}%2C${event.lng}`,
    [event.lat, event.lng],
  );

  function copyLink() {
    void navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <main className="min-h-screen w-full">
      <div className="px-5 pt-3 lg:pb-13">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-2 pb-28 lg:gap-3 lg:pb-15">
          <div className="hidden items-center justify-between gap-4 py-0.5 sm:flex">
            <nav aria-label="breadcrumb" className="min-w-0 flex-1">
              <ol className="flex items-center gap-1.5 text-sm text-muted sm:gap-2.5">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    Home
                  </Link>
                </li>
                <ChevronRight className="size-3.5" />
                <li>
                  <Link href="/#events" className="hover:text-foreground">
                    {event.category}
                  </Link>
                </li>
                <ChevronRight className="size-3.5" />
                <li className="max-w-[220px] truncate text-foreground">{event.title}</li>
              </ol>
            </nav>
            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden items-center gap-3 md:flex">
                <div className="flex items-center gap-2 text-sm">
                  <ThumbsUp className={`h-4 w-4 ${interested ? "text-primary" : "text-muted"}`} />
                  <span className="font-medium">
                    {interested ? "You're interested" : "Be the first to show interest"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setInterested((value) => !value)}
                  className="inline-flex h-8 items-center rounded-md border border-black px-3 text-sm font-medium hover:bg-zinc-100"
                >
                  {interested ? "Interested" : "I'm Interested"}
                </button>
              </div>
              <ShareMenu
                open={shareOpen}
                onToggle={() => setShareOpen((value) => !value)}
                url={shareUrl}
                title={event.title}
                copied={copied}
                onCopy={copyLink}
              />
            </div>
          </div>

          <h1 className="sr-only">{event.title}</h1>

          <div className="flex w-full flex-col gap-8 lg:flex-row lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="relative mb-6 aspect-[16/7] overflow-hidden rounded-2xl bg-zinc-100 shadow-md">
                <Image
                  src={event.banner}
                  alt={event.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute right-4 bottom-4 left-4 text-white md:right-8 md:bottom-8 md:left-8">
                  <p className="text-xs font-semibold tracking-[0.22em] uppercase opacity-80">
                    {event.subtitle ?? "Real Estate Event"}
                  </p>
                  <p className="mt-1 text-2xl font-extrabold md:text-4xl">{event.title}</p>
                </div>
              </div>

              <div className="mb-4 flex flex-col gap-2 px-1 lg:hidden">
                <p className="text-xl font-bold">{event.title}</p>
                <p className="text-sm text-muted">
                  {formatSidebarWhen(event.start, event.end)}
                </p>
                <p className="text-sm text-muted">{event.venue}</p>
              </div>

              <section className="flex flex-col gap-4">
                <h2 className="heading-5">
                  <span className="relative inline-block">
                    About the Event
                    <span className="mt-1 block h-[3px] w-full rounded-[2px] bg-gradient-to-r from-[#6C47FF] to-transparent" />
                  </span>
                </h2>
                <div className={aboutOpen ? "" : "line-clamp-4"}>
                  {event.description.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mb-4 text-[15px] leading-7 text-[#333]"
                      style={{ fontFamily: "Georgia, Palatino, serif" }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setAboutOpen((value) => !value)}
                  className="self-start text-sm font-semibold text-primary"
                >
                  {aboutOpen ? "Read less" : "Read more"}
                </button>
              </section>

              {event.speakers.length > 0 ? (
                <section className="mt-10 overflow-hidden rounded-2xl bg-[#0b1b4a] text-white">
                  <div className="px-6 py-8 md:px-10">
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70">
                      {event.title.toUpperCase()}
                    </p>
                    <h2 className="mt-2 text-3xl font-extrabold">Meet Our 2026 Speakers</h2>
                    <p className="mt-2 max-w-2xl text-sm text-white/75">
                      Thought-provoking presentations on housing, investment and the next decade of Indian real estate.
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                      {[
                        ["DATE", formatLongDate(event.start)],
                        ["TIME", formatTimeRange(event.start, event.end)],
                        ["VENUE", event.city],
                        ["SPEAKERS", `${event.speakers.length}+`],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-xl bg-white/10 p-3">
                          <p className="text-[11px] tracking-wider text-white/60">{label}</p>
                          <p className="mt-1 text-sm font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                    {event.theme ? (
                      <p className="mt-4 text-sm font-medium text-amber-200">Theme: {event.theme}</p>
                    ) : null}
                    <h3 className="mt-8 text-lg font-bold">Featured Speakers</h3>
                    <p className="mt-1 text-xs text-white/60">{event.speakers.length} Confirmed</p>
                    <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
                      {event.speakers.map((speaker) => (
                        <article key={speaker.name} className="text-center">
                          <div className="relative mx-auto size-24 overflow-hidden rounded-full border-2 border-white/20 md:size-28">
                            <Image
                              src={speaker.image}
                              alt={speaker.name}
                              fill
                              className="object-cover"
                              sizes="112px"
                            />
                          </div>
                          <p className="mt-3 text-sm font-semibold">{speaker.name}</p>
                          <p className="text-xs text-white/70">{speaker.title}</p>
                          <p className="text-xs text-white/50">{speaker.org}</p>
                        </article>
                      ))}
                    </div>
                    <p className="mt-8 text-center text-xs text-white/50">
                      © 2026 {event.title} · Organised by {event.host.name} · {event.venue} ·{" "}
                      {formatLongDate(event.start)}
                    </p>
                  </div>
                </section>
              ) : null}

              <section className="mt-10 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MapPin className="size-3.5" />
                    </span>
                    <p className="text-xs font-semibold tracking-wider text-primary uppercase">
                      Venue & Location
                    </p>
                  </div>
                  <h2 className="heading-5 mt-2 text-balance">{event.venue}</h2>
                  <p className="mt-1.5 text-sm text-muted">
                    Find us easily. Here&apos;s everything you need to know about the venue, directions and facilities.
                  </p>
                </div>
                <div className="relative min-h-[26rem] overflow-hidden rounded-2xl border bg-zinc-100 p-2 shadow-sm">
                  <iframe
                    title={`${event.venue} map`}
                    src={mapSrc}
                    className="h-[24rem] w-full rounded-xl border-0"
                  />
                </div>
                <p className="text-sm text-muted">{event.address}</p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary"
                >
                  Get Directions
                  <ArrowUpRight className="size-4" />
                </a>
              </section>

              <section className="mt-10 flex flex-col">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="heading-5">
                    <span className="relative inline-block">
                      Host Details
                      <span className="mt-1 block h-[3px] w-full rounded-[2px] bg-gradient-to-r from-[#6C47FF] to-transparent" />
                    </span>
                  </h2>
                  <span className="text-sm font-medium">Event ID: {event.eventId}</span>
                </div>
                <div className="space-y-3 rounded-2xl border border-border bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div className="relative size-12 overflow-hidden rounded-xl border bg-zinc-100">
                        <Image
                          src={event.host.logo}
                          alt={event.host.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <p className="truncate text-[15px] font-semibold">{event.host.name}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFollowed((value) => !value)}
                      className={`h-8 rounded-md border px-3 text-sm font-medium ${
                        followed
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:bg-zinc-50"
                      }`}
                    >
                      {followed ? "Following" : "Follow"}
                    </button>
                  </div>
                  <p className="text-sm text-muted">
                    {event.host.events} Events · {event.host.followers + (followed ? 1 : 0)} Followers
                  </p>
                </div>
              </section>
            </div>

            <aside className="hidden w-full max-w-sm shrink-0 lg:block">
              <div className="sticky top-28 flex flex-col overflow-hidden rounded-2xl border border-border bg-white md:px-4">
                <div className="flex w-full items-center gap-2.5 border-b border-border py-3">
                  <span className="text-sm">{formatSidebarWhen(event.start, event.end)}</span>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-start gap-2.5 border-b border-border py-3 hover:bg-zinc-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-1 text-sm font-medium">{event.venue}</p>
                    <p className="line-clamp-2 text-sm text-muted">{event.address}</p>
                  </div>
                  <ChevronRight className="size-5 shrink-0 text-muted" />
                </a>
                <div className="flex items-end justify-between gap-3 py-4">
                  <div>
                    <p className="text-2xl font-extrabold">{formatPrice(event)}</p>
                    {event.gst ? <p className="text-xs text-muted">+ GST</p> : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => (user ? setBookingOpen(true) : openLogin())}
                    className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-white shadow-sm hover:bg-primary/90"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white px-4 py-3 lg:hidden">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold">{formatPrice(event)}</p>
            {event.gst ? <p className="text-xs text-muted">+ GST</p> : null}
          </div>
          <button
            type="button"
            onClick={() => (user ? setBookingOpen(true) : openLogin())}
            className="h-10 rounded-md bg-primary px-5 text-sm font-semibold text-white"
          >
            Book Now
          </button>
        </div>
      </div>

      {bookingOpen ? (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4">
          <div className="w-full max-w-md rounded-t-2xl bg-white p-6 sm:rounded-2xl">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">Choose tickets</h2>
                <p className="text-sm text-muted">{event.title}</p>
              </div>
              <button type="button" onClick={() => setBookingOpen(false)} aria-label="Close booking">
                <X className="size-5" />
              </button>
            </div>

            {booked ? (
              <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">
                <p className="flex items-center gap-2 font-semibold">
                  <Check className="size-4" /> Booking confirmed on this demo
                </p>
                <p className="mt-1">
                  {qty} × {selected?.name} · ₹{total.toLocaleString("en-IN")}
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {event.tickets.map((item) => (
                    <label
                      key={item.name}
                      className={`flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-3 ${
                        ticket === item.name ? "border-primary bg-primary/5" : "border-border"
                      }`}
                    >
                      <span>
                        <input
                          type="radio"
                          name="ticket"
                          className="mr-2 accent-[#7f22fe]"
                          checked={ticket === item.name}
                          onChange={() => setTicket(item.name)}
                        />
                        <span className="font-semibold">{item.name}</span>
                        {item.note ? (
                          <span className="mt-0.5 block pl-6 text-xs text-muted">{item.note}</span>
                        ) : null}
                      </span>
                      <span className="font-bold">
                        {item.price === 0 ? "Free" : `₹${item.price.toLocaleString("en-IN")}`}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-medium">Quantity</p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setQty((value) => Math.max(1, value - 1))}
                      className="size-8 rounded-md border"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-semibold">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty((value) => value + 1)}
                      className="size-8 rounded-md border"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    addTicket({
                      eventSlug: event.slug,
                      eventTitle: event.title,
                      ticketName: selected?.name ?? "General Pass",
                      qty,
                      total,
                    });
                    setBooked(true);
                  }}
                  className="mt-5 h-11 w-full rounded-lg bg-primary text-sm font-semibold text-white"
                >
                  Pay ₹{total.toLocaleString("en-IN")}
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}

function ShareMenu({
  open,
  onToggle,
  url,
  title,
  copied,
  onCopy,
}: {
  open: boolean;
  onToggle: () => void;
  url: string;
  title: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-label={`Share ${title}`}
        onClick={onToggle}
        className="inline-flex size-8 items-center justify-center rounded-md border border-border hover:bg-zinc-50"
      >
        <Share2 className="size-4" />
      </button>
      {open ? (
        <div className="absolute right-0 z-30 mt-2 w-52 overflow-hidden rounded-xl border bg-white py-1 shadow-card">
          <button type="button" onClick={onCopy} className="block w-full px-3 py-2 text-left text-sm hover:bg-zinc-50">
            {copied ? "Link copied" : "Copy link"}
          </button>
          <a
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-50"
            href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-50"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-50"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      ) : null}
    </div>
  );
}
