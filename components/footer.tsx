import Image from "next/image";
import Link from "next/link";
import { CITIES } from "@/lib/events";

const columns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Products",
    links: [
      "Ticketing",
      "Check-in",
      "Exhibitor",
      "Networking",
      "Communities",
      "Associations",
      "Certificates",
      "Landing pages",
    ].map((label) => ({ label, href: "/" })),
  },
  {
    title: "Get started",
    links: [
      { label: "Browse events", href: "/#events" },
      { label: "Request a demo", href: "/host" },
      { label: "API docs", href: "/" },
      { label: "Communities", href: "/" },
      { label: "Associations", href: "/" },
      { label: "WhatsApp Communities", href: "/" },
    ],
  },
  {
    title: "For organizers",
    links: [
      { label: "Organizer login", href: "/login" },
      { label: "Create an organizer account", href: "/host" },
    ],
  },
  {
    title: "Company",
    links: [
      "Careers",
      "Contact support",
      "Media kit",
      "Privacy policy",
      "Security",
      "Terms of use",
    ].map((label) => ({ label, href: "/" })),
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-10">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Image src="/logo.svg" alt="BuyersEdge" width={160} height={50} className="h-11 w-auto" />
          <Link
            href="/host"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Host an Event
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-3 text-sm font-bold">{column.title}</h2>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <section aria-label="Follow us">
            <h2 className="mb-3 text-sm font-bold">Follow us</h2>
            <div className="flex gap-3 text-muted">
              <Link href="/" aria-label="BuyersEdge on Facebook" className="hover:text-foreground">
                <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
                  <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z" />
                </svg>
              </Link>
              <Link href="/" aria-label="BuyersEdge on Instagram" className="hover:text-foreground">
                <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
                  <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-5 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.8A2 2 0 1 0 14 12a2 2 0 0 0-2-2Zm4.6-2.9a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z" />
                </svg>
              </Link>
              <Link href="/" aria-label="BuyersEdge on X (Twitter)" className="hover:text-foreground">
                <span className="block text-lg leading-5 font-bold">𝕏</span>
              </Link>
              <Link href="/" aria-label="BuyersEdge on LinkedIn" className="hover:text-foreground">
                <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
                  <path d="M6.5 9.5H4V20h2.5V9.5ZM5.2 4A1.6 1.6 0 1 0 5.2 7.2 1.6 1.6 0 0 0 5.2 4ZM20 20h-2.5v-5.6c0-1.8-.6-3-2.2-3s-2.2 1.3-2.2 3V20H10.6V9.5h2.4v1.4a3.4 3.4 0 0 1 3-1.6c2.3 0 4 1.5 4 4.7V20Z" />
                </svg>
              </Link>
            </div>
          </section>

          <section aria-label="Contact">
            <h2 className="mb-3 text-sm font-bold">Contact</h2>
            <p className="text-sm leading-6 text-muted">Patel Nagar, Dehradun, India</p>
            <a
              href="tel:+919027288483"
              className="mt-2 block text-sm text-primary hover:underline"
            >
              +919027288483
            </a>
            <a
              href="mailto:support@buyersedge.com"
              className="mt-1 inline-block text-sm text-primary hover:underline"
            >
              support@buyersedge.com
            </a>
          </section>
        </div>

        <nav aria-label="Browse by city" className="mt-12">
          <h2 className="mb-3 text-sm font-bold">Browse by city</h2>
          <ul className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm text-muted">
            {CITIES.map((city, index) => (
              <li key={city} className="inline-flex items-center">
                <Link
                  href={`/?city=${encodeURIComponent(city)}#events`}
                  className="hover:text-foreground"
                >
                  {city}
                </Link>
                {index < CITIES.length - 1 ? <span className="mx-2">·</span> : null}
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-10 text-xs text-muted">
          © 2026 BuyersEdge. All rights reserved. Build by{" "}
          <a
            href="https://shubhkarmatech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline"
          >
            Shubhkarma Tech
          </a>
        </p>
      </div>
    </footer>
  );
}
