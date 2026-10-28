import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** Every page is public, so crawlers may read all of it. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
