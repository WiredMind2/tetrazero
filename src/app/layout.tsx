import type { Metadata } from "next";
import "./css/globals.css";
import "./css/tweaks.css";
import "./css/fonts.css";

export const metadata: Metadata = {
  title: "Tetrazero",
  description: "A personal blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
