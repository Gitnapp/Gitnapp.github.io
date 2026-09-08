import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";

import imageSizes from "../content/image-sizes.json";

import { codeThemeDark, codeThemeLight } from "./code-theme";

const sizeOf: Record<string, { width: number; height: number } | null> = imageSizes;

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type Post = {
  slug: string;
  title: string;
  description: string;
  author: string;
  /** ISO date (YYYY-MM-DD), normalised from frontmatter. */
  pubDate: string;
  tags: string[];
  featured: boolean;
};

/**
 * YAML gives us a Date for a well-formed unquoted `2035-06-01`, but a plain
 * string for anything it does not recognise as a date (`2035-8-01`), so pad the
 * parts rather than trusting the frontmatter to be zero-filled.
 */
function toISODate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const [year, month, day] = String(value ?? "").slice(0, 10).split("-");
  if (!year || !month || !day) return String(value ?? "");
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

/**
 * Formats off the ISO string rather than Date methods so the output does not
 * shift with the build machine's timezone (CI runs in UTC, laptop in +08).
 */
export function formatDateCN(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y} 年 ${m} 月 ${d} 日`;
}

export function formatDateISO(iso: string): string {
  return iso;
}

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data } = matter(raw);
  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title ?? "").trim(),
    description: String(data.description ?? "").trim(),
    author: String(data.author ?? "").trim(),
    pubDate: toISODate(data.pubDate),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    featured: Boolean(data.featured),
  };
}

/** Newest first — the order every listing on the site uses. */
export function getAllPosts(): Post[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate));
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  return [...new Set(getAllPosts().flatMap((post) => post.tags))];
}

/**
 * Post images are authored as `![caption|size](url)`; the size suffix drove the
 * old Apple-newsroom layout classes and must not leak into alt text.
 *
 * Every image also gets its intrinsic width/height from content/image-sizes.json
 * so the browser reserves the right box before the bytes arrive — without it the
 * image lands at full height and shoves the rest of the article down. Images the
 * probe could not reach fall back to a fixed ratio box in CSS.
 */
function rehypeFigures() {
  return (tree: Root) => {
    let isFirst = true;

    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "p") return;
      const kids = node.children.filter(
        (c) => !(c.type === "text" && c.value.trim() === ""),
      );
      const img = kids[0];
      if (kids.length !== 1 || img.type !== "element" || img.tagName !== "img") return;

      const [caption = "", size = "big"] = String(img.properties?.alt ?? "").split("|");
      const src = String(img.properties?.src ?? "");
      const measured = sizeOf[src];
      // 第一张图通常是文章头图，属于 LCP 元素，不该延迟加载。
      const eager = isFirst;
      isFirst = false;

      // 有一篇文章把图片地址当成了图说，那种情况按装饰图处理：
      // alt 留空好过让读屏软件念一串 URL。
      const text = caption.trim();
      const label = text === src ? "" : text;

      img.properties = {
        ...img.properties,
        alt: label,
        decoding: "async",
        loading: eager ? "eager" : "lazy",
        ...(eager ? { fetchpriority: "high" } : {}),
        ...(measured
          ? { width: measured.width, height: measured.height }
          : { "data-ratio": "unknown" }),
      };

      node.tagName = "figure";
      node.properties = { "data-size": size.trim() };
      node.children = [img];
      if (label) {
        node.children.push({
          type: "element",
          tagName: "figcaption",
          properties: {},
          children: [{ type: "text", value: label }],
        });
      }
    });
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeFigures)
  .use(rehypePrettyCode, {
    theme: { light: codeThemeLight, dark: codeThemeDark },
    keepBackground: false,
  })
  .use(rehypeStringify);

export async function getPost(slug: string): Promise<{ post: Post; html: string }> {
  const file = `${slug}.md`;
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { content } = matter(raw);
  const html = String(await processor.process(content));
  return { post: readPost(file), html };
}
