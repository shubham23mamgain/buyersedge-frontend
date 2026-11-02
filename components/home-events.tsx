"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import { EventCard } from "@/components/event-card";
import { useAuth } from "@/components/auth-provider";
import {
  CATEGORIES,
  CITIES,
  events,
  isSameDay,
  isThisWeekend,
  type EventItem,
} from "@/lib/events";

type DateFilter = "all" | "today" | "tomorrow" | "weekend" | "custom";
type SortKey = "recommended" | "soonest" | "price";

export function HomeEvents() {
  const { hostedEvents } = useAuth();
  const searchParams = useSearchParams();
  const cityFromUrl = searchParams.get("city");
  const [city, setCity] = useState(
    cityFromUrl && CITIES.includes(cityFromUrl as (typeof CITIES)[number])
      ? cityFromUrl
      : "Bengaluru",
  );
  const [cityOpen, setCityOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");
  const [customDate, setCustomDate] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    if (cityFromUrl && CITIES.includes(cityFromUrl as (typeof CITIES)[number])) {
      setCity(cityFromUrl);
    }
  }, [cityFromUrl]);

  const filtered = useMemo(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    let list: EventItem[] = [...hostedEvents, ...events].filter((event) => event.city === city);

    if (dateFilter === "today") list = list.filter((event) => isSameDay(event.start, today));
    if (dateFilter === "tomorrow") list = list.filter((event) => isSameDay(event.start, tomorrow));
    if (dateFilter === "weekend") list = list.filter((event) => isThisWeekend(event.start));
    if (dateFilter === "custom" && customDate) {
      const picked = new Date(customDate);
      list = list.filter((event) => isSameDay(event.start, picked));
    }
    if (category) list = list.filter((event) => event.category === category);

    if (sort === "soonest") {
      list = [...list].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
    }
    if (sort === "price") {
      list = [...list].sort((a, b) => a.price - b.price);
    }
    return list;
  }, [city, dateFilter, customDate, category, sort, hostedEvents]);

  const chips: { key: DateFilter; label: string }[] = [
    { key: "today", label: "Today" },
    { key: "tomorrow", label: "Tomorrow" },
    { key: "weekend", label: "This Weekend" },
    { key: "custom", label: "Custom" },
  ];

  return (
    <section id="events" className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-5 lg:max-w-[80rem]">
      <div className="flex items-end justify-between gap-4 pt-6 pb-1 sm:items-baseline">
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 block text-[11px] font-medium tracking-wide text-muted uppercase sm:hidden">
            Events in
          </p>
          <h1 className="heading-3 truncate tracking-tight">
            <button
              type="button"
              className="inline-flex items-center gap-1 sm:hidden"
              onClick={() => setCityOpen((open) => !open)}
            >
              {city}
              <ChevronDown className="h-5 w-5 text-muted" />
            </button>
            <span className="hidden sm:inline">Events in {city}</span>
            <span className="body-3 ml-2 align-middle font-normal tabular-nums text-muted">
              · {filtered.length}
            </span>
          </h1>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setSortOpen((open) => !open)}
            className="inline-flex h-9 items-center gap-1 rounded-md px-2.5 text-sm font-medium hover:bg-zinc-50"
          >
            {sort === "recommended" ? "Recommended" : sort === "soonest" ? "Soonest" : "Price"}
            <ChevronDown className="h-4 w-4 text-muted" />
          </button>
          {sortOpen ? (
            <div className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-xl border bg-white py-1 shadow-card">
              {(
                [
                  ["recommended", "Recommended"],
                  ["soonest", "Soonest"],
                  ["price", "Price"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSort(key);
                    setSortOpen(false);
                  }}
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-zinc-50"
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {cityOpen ? (
        <div className="mb-3 flex flex-wrap gap-2 sm:hidden">
          {CITIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setCity(item);
                setCityOpen(false);
              }}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                item === city ? "border-primary text-primary" : "border-border"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      <div className="flex h-11 items-center gap-3 md:h-10">
        <button
          type="button"
          onClick={() => {
            setDateFilter("all");
            setCategory(null);
          }}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium hover:bg-zinc-50 md:h-9"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span className="md:hidden">All</span>
          <span className="hidden md:inline">All filters</span>
        </button>
        <div className="relative flex min-w-0 flex-1 items-center gap-2 overflow-x-auto hide-scrollbar">
          {chips.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => setDateFilter(chip.key)}
              className={`inline-flex h-11 shrink-0 items-center gap-1.5 rounded-md border px-3 text-sm md:h-9 ${
                dateFilter === chip.key
                  ? "border-primary bg-primary/5 font-medium text-primary"
                  : "border-border font-normal hover:bg-zinc-50"
              }`}
            >
              {chip.key === "custom" ? <CalendarDays className="h-3.5 w-3.5" /> : null}
              {chip.label}
            </button>
          ))}
          <span className="mx-1 h-6 w-px shrink-0 bg-border" />
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory((current) => (current === item ? null : item))}
              className={`inline-flex h-11 shrink-0 items-center rounded-md border px-3 text-sm md:h-9 ${
                category === item
                  ? "border-primary bg-primary/5 font-medium text-primary"
                  : "border-border hover:bg-zinc-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {dateFilter === "custom" ? (
        <div className="mt-3">
          <input
            type="date"
            value={customDate}
            onChange={(event) => setCustomDate(event.target.value)}
            className="rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted">
          No real estate events match these filters. Try another city or date.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 justify-items-center gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 lg:justify-items-start lg:gap-x-5 xl:grid-cols-4">
          {filtered.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
