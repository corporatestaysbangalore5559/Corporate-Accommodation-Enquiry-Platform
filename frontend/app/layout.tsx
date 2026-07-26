import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Corporate Stays Bangalore — Accommodation Enquiry",
  description:
    "Tell us your team's corporate accommodation needs in Bangalore and we'll get back to you within 24 hours.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
