import type { Metadata } from "next";
import { Anton, Oswald } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Wilken Eupalao — 3D Designer, ArchViz & Web Dev",
  description:
    "Portfolio of Wilken Eupalao — 3D Designer, Architectural Visualizer & Web Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${oswald.variable}`}>
      <body>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
