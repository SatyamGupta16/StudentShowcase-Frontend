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
    default:
      "Prompt Computer Classes Student Project Showcase | Projects, Portfolios & Creations",
    template: "%s | Prompt Computer Classes Student Project Showcase",
  },

  verification: {
    google: "7JZcNrJBWCYRZOGL3T0Q4CNA_YBrTt7TjKB8yADw-9w",
  },

  description:
    "Prompt Computer Classes Student Project Showcase is a platform where students can display their projects, portfolios, skills, creative work, and achievements for parents, visitors, and admissions.",

  keywords: [
    "Prompt Computer Classes",
    "Prompt Computer Classes Student Project Showcase",
    "Prompt Computer Classes projects",
    "Prompt Computer Classes student projects",
    "Prompt Computer Classes Bareilly",
    "Prompt Computer Classes coding projects",
    "student project showcase",
    "student portfolio platform",
    "student projects",
    "computer classes projects",
    "coding classes projects",
    "student creations",
    "Next.js project",
    "MERN project",
    "Satyam Gupta",
  ],

  authors: [
    {
      name: "Satyam Gupta",
    },
  ],

  creator: "Satyam Gupta",
  publisher: "Prompt Computer Classes",
  applicationName: "Prompt Computer Classes Student Project Showcase",

  openGraph: {
    title:
      "Prompt Computer Classes Student Project Showcase | Projects & Portfolios",
    description:
      "Explore student projects, portfolios, skills, creations, and achievements from Prompt Computer Classes.",
    url: siteUrl,
    siteName: "Prompt Computer Classes Student Project Showcase",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary",
    title:
      "Prompt Computer Classes Student Project Showcase | Projects & Portfolios",
    description:
      "A platform where students of Prompt Computer Classes can showcase projects, portfolios, skills, and creative work.",
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

  category: "education",
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