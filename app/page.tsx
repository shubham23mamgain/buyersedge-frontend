import { Suspense } from "react";
import { HeroCarousel } from "@/components/hero-carousel";
import { HomeEvents } from "@/components/home-events";
import { events } from "@/lib/events";

export default function Home() {
  const banners = events.filter((event) => event.featured);

  return (
    <main className="flex w-full flex-1 flex-col items-center gap-2 md:gap-3 lg:gap-4">
      <div className="mt-4 flex w-full flex-col items-center md:mt-5">
        <HeroCarousel banners={banners} />
        <Suspense fallback={<div className="h-96 w-full" />}>
          <HomeEvents />
        </Suspense>
      </div>
    </main>
  );
}
