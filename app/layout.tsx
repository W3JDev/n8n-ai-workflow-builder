import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "N8N AI Workflow Builder",
  description: "Create N8N workflows using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
