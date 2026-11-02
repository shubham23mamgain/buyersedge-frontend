"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  MapPin,
  Search,
  Sparkles,
  Ticket,
  X,
} from "lucide-react";
import { CITIES, events } from "@/lib/events";
import { useAuth } from "@/components/auth-provider";

export function Header() {
  const router = useRouter();
  const { ready, user, openLogin, logout, hostedEvents } = useAuth();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Bengaluru");
  const [cityOpen, setCityOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const catalog = useMemo(() => [...hostedEvents, ...events], [hostedEvents]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalog.slice(0, 5);
    return catalog
      .filter((event) =>
        `${event.title} ${event.city} ${event.venue} ${event.category}`
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 6);
  }, [query, catalog]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!searchRef.current?.contains(event.target as Node)) {
        setSearchOpen(false);
        setCityOpen(false);
      }
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function submitSearch(event?: React.FormEvent) {
    event?.preventDefault();
    const first = results[0];
    if (query && first) router.push(`/events/${first.slug}`);
    else router.push("/#events");
    setSearchOpen(false);
    setMobileSearch(false);
  }

  const initials = (user?.name || "BE")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white">
        <div className="relative z-50 flex flex-col gap-5 p-5 sm:items-center sm:px-10 sm:pb-4 sm:pt-5">
          <div className="group flex w-full items-center gap-5 self-stretch sm:gap-8">
            <div className="flex flex-1 items-center gap-8 xl:gap-12">
              <Link
                href="/"
                aria-label="BuyersEdge — home"
                className="relative shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Image
                  src="/logo.svg"
                  alt="BuyersEdge"
                  width={187}
                  height={59}
                  className="h-10 w-auto sm:h-11"
                  priority
                />
              </Link>

              <button
                type="button"
                aria-label="Open search"
                className="ml-auto block cursor-pointer text-foreground lg:hidden"
                onClick={() => setMobileSearch(true)}
              >
                <Search className="size-7" />
              </button>

              <div ref={searchRef} className="relative hidden w-full flex-1 lg:block lg:max-w-[360px] xl:max-w-[440px]">
                <form
                  onSubmit={submitSearch}
                  aria-label="Search events"
                  className="w-full"
                >
                  <div className="flex items-center gap-0 rounded-full border bg-white p-1 shadow-sm transition-colors duration-150 focus-within:ring-2 focus-within:ring-primary/40">
                    <div className="flex min-w-0 flex-[1.8] items-center rounded-full py-2 pl-3">
                      <Sparkles className="mr-2 h-4 w-4 shrink-0 text-muted" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setSearchOpen(true)}
                        placeholder="Search events near you"
                        aria-label="Search events near you"
                        className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
                      />
                    </div>
                    <button
                      type="submit"
                      aria-label="Search events"
                      className="ml-1 flex h-11 min-w-[7.5rem] items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary/90"
                    >
                      <Search className="size-4" />
                      Search
                    </button>
                  </div>
                </form>

                {searchOpen ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-border bg-white shadow-card">
                    <p className="px-4 pt-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                      {query ? "Matching events" : "Popular real estate events"}
                    </p>
                    <ul className="py-2">
                      {results.length === 0 ? (
                        <li className="px-4 py-3 text-sm text-muted">No events found</li>
                      ) : (
                        results.map((event) => (
                          <li key={event.slug}>
                            <Link
                              href={`/events/${event.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="flex items-start gap-3 px-4 py-2.5 hover:bg-zinc-50"
                            >
                              <span className="mt-0.5 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                                {event.category}
                              </span>
                              <span className="min-w-0">
                                <span className="block truncate text-sm font-semibold">
                                  {event.title}
                                </span>
                                <span className="block truncate text-xs text-muted">
                                  {event.city} · {event.venue}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-5">
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  aria-label={`Change city. Current: ${city}`}
                  onClick={() => setCityOpen((open) => !open)}
                  className="inline-flex max-w-[160px] items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium hover:text-primary"
                >
                  <span className="truncate">{city}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted" />
                </button>
                {cityOpen ? (
                  <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border bg-white py-1 shadow-card">
                    {CITIES.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => {
                          setCity(item);
                          setCityOpen(false);
                          router.push(`/?city=${encodeURIComponent(item)}#events`);
                        }}
                        className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-zinc-50 ${
                          item === city ? "font-semibold text-primary" : ""
                        }`}
                      >
                        <MapPin className="size-3.5 text-muted" />
                        {item}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              {user?.role === "organizer" ? (
                <Link
                  href="/dashboard"
                  className="hidden h-9 min-w-0 items-center rounded-md border border-border px-4 text-sm font-medium hover:bg-zinc-50 min-[495px]:flex"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/host"
                  className="hidden h-9 min-w-0 items-center rounded-md border border-border px-4 text-sm font-medium hover:bg-zinc-50 min-[495px]:flex"
                >
                  Host Event
                </Link>
              )}

              {!ready ? (
                <span className="inline-flex h-9 w-16 rounded-md bg-zinc-100" />
              ) : user ? (
                <div className="relative" ref={menuRef}>
                  <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    className="inline-flex h-9 items-center gap-2 rounded-md px-1.5 text-sm font-medium hover:bg-zinc-50"
                    aria-label="Account menu"
                  >
                    <span className="grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-white">
                      {initials}
                    </span>
                    <span className="hidden max-w-[8rem] truncate sm:inline">
                      {user.orgName || user.name}
                    </span>
                    <ChevronDown className="hidden size-4 text-muted sm:block" />
                  </button>
                  {menuOpen ? (
                    <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border bg-white py-1 shadow-card">
                      <p className="px-3 py-2 text-xs text-muted">
                        Signed in as {user.role === "organizer" ? "organizer" : "attendee"}
                      </p>
                      {user.role === "organizer" ? (
                        <Link
                          href="/dashboard"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-50"
                        >
                          <LayoutDashboard className="size-4 text-muted" />
                          Dashboard
                        </Link>
                      ) : (
                        <Link
                          href="/tickets"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-zinc-50"
                        >
                          <Ticket className="size-4 text-muted" />
                          My tickets
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          logout();
                          router.push("/");
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-zinc-50"
                      >
                        <LogOut className="size-4 text-muted" />
                        Logout
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={openLogin}
                  className="inline-flex h-9 items-center rounded-md bg-primary px-3 text-sm font-medium text-white hover:bg-primary/90"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {mobileSearch ? (
        <div className="fixed inset-0 z-[80] bg-white p-4 lg:hidden">
          <div className="mb-4 flex items-center gap-3">
            <button type="button" onClick={() => setMobileSearch(false)} aria-label="Close search">
              <X className="size-6" />
            </button>
            <form onSubmit={submitSearch} className="flex flex-1 items-center gap-2 rounded-full border px-3 py-2">
              <Sparkles className="size-4 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events near you"
                className="w-full text-sm outline-none"
              />
            </form>
          </div>
          <ul>
            {results.map((event) => (
              <li key={event.slug}>
                <Link
                  href={`/events/${event.slug}`}
                  onClick={() => setMobileSearch(false)}
                  className="block border-b border-border py-3"
                >
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-muted">{event.city}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
