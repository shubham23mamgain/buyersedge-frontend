import { type EventItem } from "@/lib/events";

export type AuthRole = "attendee" | "organizer";

export type AuthUser = {
  role: AuthRole;
  name: string;
  email?: string;
  phone?: string;
  orgName?: string;
};

export type StoredAccount = {
  email: string;
  password: string;
  orgName: string;
  name: string;
  role: AuthRole;
};

export type HostedDraft = {
  slug: string;
  title: string;
  category: string;
  city: string;
  venue: string;
  address: string;
  start: string;
  end: string;
  price: number;
  description: string;
  organizerEmail: string;
  organizerName: string;
};

export type TicketRecord = {
  id: string;
  eventSlug: string;
  eventTitle: string;
  ticketName: string;
  qty: number;
  total: number;
  when: string;
};

const SESSION_KEY = "buyersedge-session";
const ACCOUNTS_KEY = "buyersedge-accounts";
const HOSTED_KEY = "buyersedge-hosted-events";
const TICKETS_KEY = "buyersedge-tickets";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80";

const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Bengaluru: { lat: 12.9716, lng: 77.5946 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Hyderabad: { lat: 17.385, lng: 78.4867 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Delhi: { lat: 28.6139, lng: 77.209 },
  Pune: { lat: 18.5204, lng: 73.8567 },
  Ahmedabad: { lat: 23.0225, lng: 72.5714 },
  Goa: { lat: 15.4909, lng: 73.8278 },
  Kochi: { lat: 9.9312, lng: 76.2673 },
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Gurgaon: { lat: 28.4595, lng: 77.0266 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadSession(): AuthUser | null {
  return read<AuthUser | null>(SESSION_KEY, null);
}

export function saveSession(user: AuthUser | null) {
  if (!user) {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }
  write(SESSION_KEY, user);
}

export function loadAccounts(): StoredAccount[] {
  return read<StoredAccount[]>(ACCOUNTS_KEY, []);
}

export function saveAccounts(accounts: StoredAccount[]) {
  write(ACCOUNTS_KEY, accounts);
}

export function loadHosted(): HostedDraft[] {
  return read<HostedDraft[]>(HOSTED_KEY, []);
}

export function saveHosted(events: HostedDraft[]) {
  write(HOSTED_KEY, events);
}

export function loadTickets(): TicketRecord[] {
  return read<TicketRecord[]>(TICKETS_KEY, []);
}

export function saveTickets(tickets: TicketRecord[]) {
  write(TICKETS_KEY, tickets);
}

export function slugify(title: string) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${base || "event"}-${Date.now().toString(36)}`;
}

export function toEventItem(draft: HostedDraft): EventItem {
  const coords = CITY_COORDS[draft.city] ?? CITY_COORDS.Bengaluru;
  return {
    slug: draft.slug,
    title: draft.title,
    category: draft.category,
    city: draft.city,
    venue: draft.venue,
    address: draft.address,
    start: draft.start,
    end: draft.end,
    price: draft.price,
    gst: draft.price > 0,
    thumbnail: DEFAULT_IMAGE,
    banner: DEFAULT_IMAGE,
    description: [
      draft.description ||
        `${draft.title} is a real estate event hosted on BuyersEdge in ${draft.city}.`,
    ],
    speakers: [],
    host: {
      name: draft.organizerName,
      logo: "/logo.svg",
      events: 1,
      followers: 0,
    },
    eventId: Math.abs(
      draft.slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0),
    ),
    lat: coords.lat,
    lng: coords.lng,
    tickets: [
      {
        name: "General Pass",
        price: draft.price,
        note: draft.price === 0 ? "Free entry" : "Includes GST",
      },
    ],
  };
}

export const DEMO_OTP = "123456";
