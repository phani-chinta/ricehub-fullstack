import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RiceHub | Good rice, close to home",
  description: "Shop carefully selected rice varieties for delivery or pickup.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
