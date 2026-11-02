"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { EventItem } from "@/lib/events";
import {
  loadAccounts,
  loadHosted,
  loadSession,
  loadTickets,
  saveAccounts,
  saveHosted,
  saveSession,
  saveTickets,
  slugify,
  toEventItem,
  type AuthRole,
  type AuthUser,
  type HostedDraft,
  type TicketRecord,
} from "@/lib/auth";

type AuthContextValue = {
  ready: boolean;
  user: AuthUser | null;
  loginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  logout: () => void;
  loginAttendee: (input: { name?: string; email?: string; phone?: string }) => void;
  loginOrganizer: (
    email: string,
    password: string,
  ) => { ok: true } | { ok: false; error: string };
  loginOrganizerByEmail: (
    email: string,
  ) => { ok: true } | { ok: false; error: string };
  signupOrganizer: (input: {
    orgName: string;
    email: string;
    password: string;
  }) => { ok: true } | { ok: false; error: string };
  googleLogin: (role: AuthRole) => void;
  hostedEvents: EventItem[];
  publishEvent: (
    draft: Omit<HostedDraft, "slug" | "organizerEmail" | "organizerName">,
  ) => EventItem;
  tickets: TicketRecord[];
  addTicket: (ticket: Omit<TicketRecord, "id" | "when">) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [hosted, setHosted] = useState<HostedDraft[]>([]);
  const [tickets, setTickets] = useState<TicketRecord[]>([]);

  useEffect(() => {
    setUser(loadSession());
    setHosted(loadHosted());
    setTickets(loadTickets());
    setReady(true);
  }, []);

  const persistUser = useCallback((next: AuthUser | null) => {
    setUser(next);
    saveSession(next);
  }, []);

  const loginAttendee = useCallback(
    (input: { name?: string; email?: string; phone?: string }) => {
      persistUser({
        role: "attendee",
        name: input.name?.trim() || (input.email ? input.email.split("@")[0] : "Guest"),
        email: input.email,
        phone: input.phone,
      });
      setLoginOpen(false);
    },
    [persistUser],
  );

  const loginOrganizer = useCallback(
    (email: string, password: string) => {
      const accounts = loadAccounts();
      const match = accounts.find(
        (account) =>
          account.email.toLowerCase() === email.trim().toLowerCase() &&
          account.password === password &&
          account.role === "organizer",
      );
      if (!match) {
        return {
          ok: false as const,
          error: "Incorrect email or password. Create a host account if you are new.",
        };
      }
      persistUser({
        role: "organizer",
        name: match.name,
        email: match.email,
        orgName: match.orgName,
      });
      return { ok: true as const };
    },
    [persistUser],
  );

  const loginOrganizerByEmail = useCallback(
    (email: string) => {
      const accounts = loadAccounts();
      const match = accounts.find(
        (account) =>
          account.email.toLowerCase() === email.trim().toLowerCase() &&
          account.role === "organizer",
      );
      if (!match) {
        return {
          ok: false as const,
          error: "No organizer account found for this email. Create one first.",
        };
      }
      persistUser({
        role: "organizer",
        name: match.name,
        email: match.email,
        orgName: match.orgName,
      });
      return { ok: true as const };
    },
    [persistUser],
  );

  const signupOrganizer = useCallback(
    (input: { orgName: string; email: string; password: string }) => {
      const email = input.email.trim().toLowerCase();
      const accounts = loadAccounts();
      if (accounts.some((account) => account.email.toLowerCase() === email)) {
        return { ok: false as const, error: "An organizer already exists with this email." };
      }
      const account = {
        email,
        password: input.password,
        orgName: input.orgName.trim(),
        name: input.orgName.trim(),
        role: "organizer" as const,
      };
      saveAccounts([...accounts, account]);
      persistUser({
        role: "organizer",
        name: account.name,
        email: account.email,
        orgName: account.orgName,
      });
      return { ok: true as const };
    },
    [persistUser],
  );

  const googleLogin = useCallback(
    (role: AuthRole) => {
      if (role === "organizer") {
        const accounts = loadAccounts();
        if (!accounts.some((account) => account.email === "host@buyersedge.com")) {
          saveAccounts([
            ...accounts,
            {
              email: "host@buyersedge.com",
              password: "google",
              orgName: "BuyersEdge Host",
              name: "BuyersEdge Host",
              role: "organizer",
            },
          ]);
        }
        persistUser({
          role: "organizer",
          name: "BuyersEdge Host",
          email: "host@buyersedge.com",
          orgName: "BuyersEdge Host",
        });
      } else {
        persistUser({
          role: "attendee",
          name: "Google Guest",
          email: "guest@buyersedge.com",
        });
        setLoginOpen(false);
      }
    },
    [persistUser],
  );

  const logout = useCallback(() => {
    persistUser(null);
  }, [persistUser]);

  const publishEvent = useCallback(
    (draft: Omit<HostedDraft, "slug" | "organizerEmail" | "organizerName">) => {
      const nextDraft: HostedDraft = {
        ...draft,
        slug: slugify(draft.title),
        organizerEmail: user?.email ?? "host@buyersedge.com",
        organizerName: user?.orgName || user?.name || "BuyersEdge Host",
      };
      const next = [nextDraft, ...loadHosted()];
      saveHosted(next);
      setHosted(next);
      return toEventItem(nextDraft);
    },
    [user],
  );

  const addTicket = useCallback((ticket: Omit<TicketRecord, "id" | "when">) => {
    const record: TicketRecord = {
      ...ticket,
      id: `${Date.now()}`,
      when: new Date().toISOString(),
    };
    const next = [record, ...loadTickets()];
    saveTickets(next);
    setTickets(next);
  }, []);

  const hostedEvents = useMemo(() => hosted.map(toEventItem), [hosted]);

  const value = useMemo(
    () => ({
      ready,
      user,
      loginOpen,
      openLogin: () => setLoginOpen(true),
      closeLogin: () => setLoginOpen(false),
      logout,
      loginAttendee,
      loginOrganizer,
      loginOrganizerByEmail,
      signupOrganizer,
      googleLogin,
      hostedEvents,
      publishEvent,
      tickets,
      addTicket,
    }),
    [
      ready,
      user,
      loginOpen,
      logout,
      loginAttendee,
      loginOrganizer,
      loginOrganizerByEmail,
      signupOrganizer,
      googleLogin,
      hostedEvents,
      publishEvent,
      tickets,
      addTicket,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
