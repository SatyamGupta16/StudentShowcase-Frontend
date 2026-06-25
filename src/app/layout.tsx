import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/layout/Footer";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://student-showcase-frontend.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Student Project Showcase | Projects, Portfolios & Creations",
    template: "%s | Student Project Showcase",
  },

  verification: {
    google: "7JZcNrJBWCYRZOGL3T0Q4CNA_YBrTt7TjKB8yADw-9w",
  },

  description:
    "A full-stack student project showcase platform where students can display their projects, portfolios, skills, creative work, and achievements in one place.",

  keywords: [
    "Student Project Showcase",
    "student portfolio",
    "student projects",
    "college projects",
    "developer portfolio",
    "Next.js project",
    "MERN project",
    "student creations",
    "full stack project",
    "Satyam Gupta",
  ],

  authors: [
    {
      name: "Satyam Gupta",
    },
  ],

  creator: "Satyam Gupta",

  publisher: "Student Project Showcase",

  applicationName: "Student Project Showcase",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    title: "Student Project Showcase | Projects, Portfolios & Creations",
    description:
      "Explore student projects, portfolios, skills, creations, and achievements on a full-stack student showcase platform.",
    url: siteUrl,
    siteName: "Student Project Showcase",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title: "Student Project Showcase | Projects, Portfolios & Creations",
    description:
      "A platform where students can showcase projects, portfolios, skills, and creative work.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">{children}</div>

            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}