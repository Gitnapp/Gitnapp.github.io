import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ModelContextTools } from "@/components/model-context-tools";
import { getAllPosts } from "@/lib/posts";
import { featuredProjects } from "@/lib/projects";
import { SITE_DESCRIPTION, SITE_LANG, SITE_TITLE, SITE_URL } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s  -  ${SITE_TITLE}` },
  description: SITE_DESCRIPTION,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/preview.png"],
  },
  alternates: {
    types: { "application/rss+xml": `${SITE_URL}/rss.xml` },
  },
};

export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  // WebMCP 工具是客户端组件，只需要瘦身过的纯数据——完整的 Post/Project 类型
  // 带着 markdown 管线和封面图导入，没必要一起进客户端 bundle。
  const posts = getAllPosts().map(({ slug, title, description, pubDate, tags }) => ({
    slug,
    title,
    description,
    pubDate,
    tags,
  }));
  const projects = featuredProjects.map(({ name, summary, kind, stack, href, demo }) => ({
    name,
    summary,
    kind,
    stack,
    href,
    demo,
  }));

  return (
    <html lang={SITE_LANG} dir="ltr">
      <body className={`${geistSans.variable} ${geistMono.variable} text-foreground antialiased`}>
        {children}
        <ModelContextTools posts={posts} projects={projects} />
      </body>
    </html>
  );
}
