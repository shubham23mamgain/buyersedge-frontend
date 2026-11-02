"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Ticket } from "lucide-react";
import { useAuth } from "@/components/auth-provider";

export default function TicketsPage() {
  const router = useRouter();
  const { ready, user, tickets, openLogin } = useAuth();

  useEffect(() => {
    if (ready && !user) {
      openLogin();
      router.replace("/");
    }
  }, [ready, user, openLogin, router]);

  if (!ready || !user) {
    return <div className="flex flex-1 items-center justify-center py-24 text-sm text-muted">Loading tickets…</div>;
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">My tickets</h1>
      <p className="mt-2 text-sm text-muted">Passes you booked on this browser for {user.name}.</p>

      {tickets.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border px-6 py-14 text-center">
          <Ticket className="mx-auto size-8 text-primary" />
          <p className="mt-3 font-semibold">No tickets yet</p>
          <p className="mt-1 text-sm text-muted">Browse real estate events and book a pass.</p>
          <Link
            href="/#events"
            className="mt-5 inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-white"
          >
            Browse events
          </Link>
        </div>
      ) : (
        <ul className="mt-8 space-y-3">
          {tickets.map((ticket) => (
            <li key={ticket.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
              <p className="font-semibold">{ticket.eventTitle}</p>
              <p className="mt-1 text-sm text-muted">
                {ticket.qty} × {ticket.ticketName} · ₹{ticket.total.toLocaleString("en-IN")}
              </p>
              <Link
                href={`/events/${ticket.eventSlug}`}
                className="mt-2 inline-block text-sm font-semibold text-primary"
              >
                View event
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
