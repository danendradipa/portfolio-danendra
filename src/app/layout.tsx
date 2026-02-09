import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://danendradipa.vercel.app'), 

  title: {
    default: "Danendra Dipa | Frontend & ML Enthusiast",
    template: "%s | Danendra Dipa"
  },
  description: "Portfolio of Danendra Dipa, a Data & Machine Learning Enthusiast and Web Developer building digital products with precision.",
  
  keywords: ["Danendra Dipa", "Portfolio", "Web Developer", "Machine Learning", "Next.js"],
  
  openGraph: {
    title: "Danendra Dipa | Frontend & ML Enthusiast",
    description: "Building digital products with precision and purpose.",
    url: "https://danendradipa.vercel.app",
    siteName: "Danendra Dipa Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/dane-hero.jpg", 
        width: 1200,
        height: 630,
        alt: "Danendra Dipa Portfolio"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Danendra Dipa Portfolio",
    description: "Frontend Developer and Machine Learning enthusiast",
    images: ["/dane-hero.jpg"]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-50`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}