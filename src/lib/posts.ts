import { parse } from "yaml"

export type Post = {
  slug: string
  title: string
  description: string
  pubDate: string
  author: string
  tags: string[]
  theme?: "light" | "dark"
  featured?: boolean
  cover?: { url?: string; square?: string; alt?: string }
  body: string
}

type Frontmatter = Omit<Post, "slug" | "body">

const files = import.meta.glob<string>("../pages/posts/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
})

function readPost(path: string, raw: string): Post {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/)
  if (!match) throw new Error(`Invalid frontmatter in ${path}`)

  const data = parse(match[1]) as Frontmatter
  const slug = path.split("/").pop()!.replace(/\.md$/, "")

  return {
    ...data,
    slug,
    pubDate: String(data.pubDate),
    tags: data.tags ?? [],
    body: match[2].trim(),
  }
}

export const posts = Object.entries(files)
  .map(([path, raw]) => readPost(path, raw))
  .sort((a, b) => Date.parse(b.pubDate) - Date.parse(a.pubDate))

export const tags = [...new Set(posts.flatMap((post) => post.tags))].sort((a, b) =>
  a.localeCompare(b, "zh-CN"),
)

export function formatDate(value: string, long = false) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: long ? "long" : "2-digit",
    day: "2-digit",
  }).format(new Date(value))
}
