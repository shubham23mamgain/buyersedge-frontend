"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatLongDate, type EventItem } from "@/lib/events";

export function HeroCarousel({ banners }: { banners: EventItem[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % banners.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [banners.length, index]);

  const previous = () =>
    setIndex((current) => (current - 1 + banners.length) % banners.length);
  const next = () => setIndex((current) => (current + 1) % banners.length);

  return (
    <section
      aria-label="Featured events"
      className="mx-auto flex w-full max-w-7xl flex-col px-4 md:px-5 lg:max-w-[80rem]"
    >
      <div className="relative w-full">
        <div className="overflow-hidden">
          <div
            className="flex aspect-video -ml-3 transition-transform duration-500 ease-out md:-ml-6 md:aspect-[3/1]"
            style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
          >
            {banners.map((event, slide) => (
              <div
                key={event.slug}
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${slide + 1} of ${banners.length}`}
                className="flex min-w-0 shrink-0 grow-0 basis-full items-center justify-center pl-3 md:pl-6"
              >
                <button
                  type="button"
                  aria-label={`Open ${event.title}`}
                  onClick={() => router.push(`/events/${event.slug}`)}
                  className="relative h-full w-full cursor-pointer overflow-hidden rounded-2xl shadow-md"
                >
                  <Image
                    src={event.banner}
                    alt={event.title}
                    fill
                    priority={slide === 0}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 70vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 text-left text-white md:justify-center md:p-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                      {event.category} · {event.city}
                    </p>
                    <h2 className="mt-1 max-w-2xl text-2xl font-extrabold leading-tight md:text-4xl">
                      {event.title}
                    </h2>
                    {event.subtitle ? (
                      <p className="mt-1 text-sm font-medium text-white/85 md:text-base">
                        {event.subtitle}
                      </p>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold md:text-sm">
                      <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">
                        {formatLongDate(event.start)}
                      </span>
                      <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">
                        {event.venue}
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {banners.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={previous}
              className="absolute top-1/2 left-2 z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white md:flex md:left-3"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={next}
              className="absolute top-1/2 right-2 z-20 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white md:flex md:right-3"
            >
              <ChevronRight className="size-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {banners.map((event, slide) => (
                <button
                  key={event.slug}
                  type="button"
                  aria-label={`Go to slide ${slide + 1}`}
                  onClick={() => setIndex(slide)}
                  className="h-1.5 w-8 overflow-hidden rounded-full bg-white/40"
                >
                  {slide === index ? (
                    <span className="block h-full w-full origin-left animate-banner-progress rounded-full bg-white" />
                  ) : null}
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
