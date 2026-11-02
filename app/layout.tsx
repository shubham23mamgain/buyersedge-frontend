import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BuyersEdge | Find Real Estate Events & Book Tickets Instantly",
  description:
    "Discover property expos, realty summits, site visits and housing awards. Book tickets for real estate events near you.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white font-sans text-foreground">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
