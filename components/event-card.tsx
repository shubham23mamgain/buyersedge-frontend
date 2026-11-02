import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatCardDate, formatPrice, type EventItem } from "@/lib/events";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="item-cards group h-full w-full rounded-[20px] transition-[transform] duration-100 ease-out active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="mx-auto flex h-full w-full max-w-[340px] flex-col overflow-hidden rounded-[20px] border border-border bg-white shadow-card transition-[box-shadow] duration-200 group-hover:shadow-card-hover lg:mx-0 lg:max-w-[302px] xl:max-w-[340px] 2xl:max-w-none">
        <div className="relative aspect-[3/4] w-full bg-zinc-100">
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            sizes="(max-width: 371px) calc(100vw - 32px), (max-width: 1024px) 340px, 302px"
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-1 p-3">
          <h3
            title={event.title}
            className="subheading-2 my-0 min-h-[2lh] flex-1 line-clamp-2 text-foreground transition-colors group-hover:text-primary"
          >
            {event.title}
          </h3>
          <span className="w-full whitespace-nowrap text-sm font-semibold leading-normal text-foreground/80 tabular-nums">
            {formatCardDate(event.start)}
          </span>
          <span title={event.venue} className="body-3 w-full truncate text-muted">
            {event.venue}
          </span>
        </div>
        <div className="mt-auto grid min-w-0 grid-cols-[1fr_auto] items-baseline gap-2 border-t px-3 py-2.5">
          <span className="subheading-3 min-w-0 truncate font-bold tabular-nums">
            {formatPrice(event)}
          </span>
          <span className="body-3 inline-flex items-center gap-1 whitespace-nowrap font-semibold text-primary transition-[gap] duration-150 group-hover:gap-1.5">
            Get tickets
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
