"use client";

import { usePathname } from "next/navigation";
import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LoginDrawer } from "@/components/login-drawer";

const AUTH_PATHS = new Set(["/login", "/host", "/forgot-password"]);

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = AUTH_PATHS.has(pathname);

  return (
    <AuthProvider>
      {hideChrome ? null : <Header />}
      <div className="flex flex-1 flex-col">{children}</div>
      {hideChrome ? null : <Footer />}
      <LoginDrawer />
    </AuthProvider>
  );
}
