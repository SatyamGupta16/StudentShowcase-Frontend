import type { MetadataRoute } from "next";

const siteUrl = "https://student-showcase-frontend.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "/about",
        "/showcase/projects",
        "/showcase/students",
        "/showcase/products",
      ],
      disallow: [
        "/dashboard",
        "/students",
        "/projects",
        "/products",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}