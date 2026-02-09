import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import GoogleAnalytics from "./components/GoogleAnalytics";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ari Dwi Utomo | Full Stack & Mobile Developer",
  description:
    "Portfolio of Ari Dwi Utomo - Experienced Full Stack Developer specializing in ASP.NET, Golang, NextJS, Flutter, and modern web & mobile technologies.",
  keywords: [
    "Full Stack Developer",
    "Mobile Developer",
    "Flutter Developer",
    "ASP.NET",
    "Golang",
    "NextJS",
    "Flutter",
    "Dart",
    "Web Developer",
    "Indonesia",
  ],
  authors: [{ name: "Ari Dwi Utomo" }],
  alternates: {
    canonical: "https://aridutomo.anaki.id",
    types: {
      "application/rss+xml": "https://aridutomo.anaki.id/rss.xml",
    },
  },
  openGraph: {
    title: "Ari Dwi Utomo | Full Stack & Mobile Developer",
    description:
      "Experienced Full Stack Developer specializing in ASP.NET, Golang, NextJS, Flutter, and modern web & mobile technologies.",
    type: "website",
    url: "https://aridutomo.anaki.id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-white text-slate-800 overflow-x-hidden`}
      >
        {/* Background gradient orbs - light theme */}
        <div className="bg-gradient-orb w-[600px] h-[600px] -top-[200px] -left-[200px] bg-blue-400/30" />
        <div className="bg-gradient-orb w-[500px] h-[500px] top-[40%] -right-[150px] bg-yellow-300/30" />
        <div className="bg-gradient-orb w-[400px] h-[400px] bottom-[10%] left-[20%] bg-cyan-300/20" />

        {/* Grid pattern overlay */}
        <div className="fixed inset-0 grid-pattern pointer-events-none" />

        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

