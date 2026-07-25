import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Clifton AI Power Land — 74 MW Data Center Site | CLF VOLTCORE LLC",
  description:
    "Shovel-ready 74 MW AI data center land near Clifton, TX. 138 kV transmission, up to 800 Gbps dual-carrier fiber (FiberLight & AT&T), ±14 acres flat & cleared. ERCOT North, ~90 min from Dallas.",
  keywords: [
    "AI data center land",
    "data center site Texas",
    "74 MW power",
    "ERCOT North",
    "Clifton TX",
    "CLF VOLTCORE",
    "hyperscaler land",
    "data center power land",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-surface text-ink`}
      >
        {children}
      </body>
    </html>
  );
}
