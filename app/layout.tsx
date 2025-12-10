import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hytale Hosting - Premium Hytale Server Hosting",
  description: "The most optimal choice for Hytale server owners. Instant setup, one-click mods, 24/7 support, DDoS protection, and worldwide locations.",
  keywords: ["Hytale", "server hosting", "game server", "Hytale hosting", "gaming"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

