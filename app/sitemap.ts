import type { MetadataRoute } from "next";

import { getAllPosts, getAllTags } from "@/lib/posts";
import { SITE_URL, tagHref } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about/", "/archive/", "/projects/"];

  return [
    ...staticRoutes.map((route) => ({ url: `${SITE_URL}${route}` })),
    ...getAllPosts().map((post) => ({
      url: `${SITE_URL}/posts/${post.slug}/`,
      lastModified: post.pubDate,
    })),
    ...getAllTags().map((tag) => ({ url: `${SITE_URL}${tagHref(tag)}/` })),
  ];
}
