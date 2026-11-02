"use client";

import Image from "next/image";
import Link from "next/link";

const features = [
  {
    n: "01",
    title: "Ticketing & payments",
    body: "Multi-tier tickets, discount codes, add-ons. UPI, cards and wallets — all built in.",
  },
  {
    n: "02",
    title: "Check-in & networking",
    body: "QR scan check-in, session tracking, badge printing, and attendee networking in one app.",
  },
  {
    n: "03",
    title: "Sponsors & exhibitors",
    body: "Exhibitor stalls, sponsor tiers, lead capture, and brochure management — run housing expos end-to-end.",
  },
];

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-dvh bg-white lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-[#5b21b6] px-12 py-10 text-white lg:flex lg:flex-col">
        <div className="pointer-events-none absolute -left-24 top-24 size-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 size-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <Link href="/" className="relative inline-flex w-fit items-center">
          <span className="rounded-md bg-white px-2 py-1">
            <Image src="/logo.svg" alt="BuyersEdge" width={160} height={50} className="h-8 w-auto" />
          </span>
        </Link>
        <div className="relative mt-16 max-w-lg">
          <h1 className="text-[2.6rem] font-extrabold leading-[1.15] tracking-tight">
            One platform. Every event.
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-white/80">
            The tools you need to plan, sell, run, and grow — without stitching five SaaS tools
            together.
          </p>
        </div>
        <ul className="relative mt-10 grid max-w-lg gap-3">
          {features.map((feature) => (
            <li key={feature.n} className="flex gap-4 rounded-2xl bg-white/10 px-4 py-4 ring-1 ring-white/10">
              <span className="text-sm font-bold text-white/55">{feature.n}</span>
              <div>
                <p className="font-semibold">{feature.title}</p>
                <p className="mt-1 text-sm leading-6 text-white/75">{feature.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <blockquote className="relative mt-auto flex max-w-lg items-start gap-3 pt-12">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/20 text-sm font-bold">
            PR
          </span>
          <div className="text-sm leading-6 text-white/85">
            “We sold out our housing expo in 48 hours. Ticketing, check-in and exhibitor leads
            finally live in one place.”
            <footer className="mt-1 font-semibold text-white">Prestige Realty, Bengaluru</footer>
          </div>
        </blockquote>
      </aside>
      <div className="flex min-h-dvh flex-col px-5 py-8 sm:px-10">
        <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center">
          <Link href="/" className="mb-8 inline-flex lg:mb-10">
            <Image src="/logo.svg" alt="BuyersEdge" width={180} height={56} className="h-11 w-auto" />
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}

export function AuthField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-semibold text-foreground">
      {label}
      <div className="mt-1.5 font-normal">{children}</div>
    </label>
  );
}

export const authInputClass =
  "h-12 w-full rounded-xl border border-zinc-200 bg-white px-3.5 text-sm outline-none transition-shadow placeholder:text-zinc-400 focus:border-primary focus:ring-2 focus:ring-primary/20";

export const authPrimaryBtn =
  "inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary/90 disabled:bg-zinc-200 disabled:text-zinc-400";

export const authGhostBtn =
  "inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-zinc-200 bg-white text-sm font-semibold hover:bg-zinc-50";
