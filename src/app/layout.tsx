import type { Metadata } from "next";
import "./css/portfolio.css";
import { ThemeProvider } from "./components/ThemeToggle";

export const metadata: Metadata = {
  title: "William Michaud | Computer Science Student & Competitive Programmer",
  description: "Portfolio of William Michaud - INSA Lyon Computer Science student, 4-time Prologin finalist, and winner of the 2020 Match'Up Coding Battle. Specializing in algorithms, competitive programming, and full-stack development.",
  keywords: ["William Michaud", "Computer Science", "Competitive Programming", "Prologin", "INSA Lyon", "Algorithms", "Python", "C++", "Web Development"],
  authors: [{ name: "William Michaud" }],
  openGraph: {
    title: "William Michaud | Computer Science Student & Competitive Programmer",
    description: "Portfolio showcasing competitive programming achievements, academic projects, and technical skills",
    type: "website",
    url: "https://tetrazero.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.webp" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
