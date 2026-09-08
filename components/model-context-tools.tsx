"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { SITE_URL } from "@/lib/site";

/**
 * layout.tsx 是 server component，不能直接引入 lib/projects.ts——那个模块静态
 * import 了封面 JPEG，会把图片一起拖进客户端 bundle。这里只接收裁剪过的纯数据。
 */
export type ToolPost = {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  tags: string[];
};

export type ToolProject = {
  name: string;
  summary: string;
  kind: string;
  stack: string[];
  href: string;
  demo?: string;
};

/**
 * 向 WebMCP（document.modelContext）注册三个工具，让支持的浏览器里的 AI Agent
 * 直接调用而不是硬解析 DOM。目前只有 Chrome 146+ 的实验特性支持这个 API，
 * 稳定版浏览器都没有——特性检测失败就静默退出，不抛错、不打日志。
 *
 * 渲染 null：这个组件不产出任何 DOM，只是把工具挂到 document 上。
 */
export function ModelContextTools({
  posts,
  projects,
}: {
  readonly posts: ToolPost[];
  readonly projects: ToolProject[];
}) {
  const router = useRouter();

  useEffect(() => {
    const modelContext = document.modelContext;
    if (!modelContext) return;

    // AbortController 建在 effect 内部而不是模块作用域：Fast Refresh 会重跑这个
    // effect，如果复用同一个 controller，cleanup abort 一次后新一轮注册就会失效。
    const controller = new AbortController();
    const { signal } = controller;

    const register = (tool: ModelContextTool) =>
      modelContext.registerTool(tool, { signal }).catch(() => {
        // 浏览器支持但注册被拒绝（重名、被策略拦掉等）时不影响页面本身运行。
      });

    register({
      name: "search_posts",
      description:
        "Search this blog's posts by keyword, matching title, description, and tags. Omitting the query returns every post.",
      inputSchema: {
        type: "object",
        properties: {
          query: { type: "string", description: "Case-insensitive search keyword" },
        },
      },
      annotations: { readOnlyHint: true },
      execute: async (input) => {
        const raw = (input as { query?: unknown }).query;
        const query = typeof raw === "string" ? raw.trim() : "";

        const matched = query
          ? posts.filter((post) => {
              const needle = query.toLowerCase();
              return (
                post.title.toLowerCase().includes(needle) ||
                post.description.toLowerCase().includes(needle) ||
                post.tags.some((tag) => tag.toLowerCase().includes(needle))
              );
            })
          : posts;

        if (matched.length === 0) {
          const tags = [...new Set(posts.flatMap((post) => post.tags))];
          return {
            content: [
              {
                type: "text",
                text: `No posts matched "${query}". Available tags: ${tags.join(", ")}`,
              },
            ],
          };
        }

        const header = query
          ? `${matched.length} posts matching "${query}":`
          : `${matched.length} posts:`;
        const lines = matched.map(
          (post) =>
            `${post.title} · ${post.pubDate} · ${post.tags.join(", ")} · ${SITE_URL}/posts/${post.slug}/`,
        );

        return { content: [{ type: "text", text: [header, ...lines].join("\n") }] };
      },
    });

    register({
      name: "list_projects",
      description: "List the site owner's featured projects.",
      inputSchema: { type: "object", properties: {} },
      annotations: { readOnlyHint: true },
      execute: async () => {
        const header = `${projects.length} projects:`;
        const lines = projects.map((project) => {
          const demo = project.demo ? ` · demo: ${project.demo}` : "";
          return `${project.name} — ${project.kind} · ${project.stack.join(", ")} · ${project.href}${demo}`;
        });

        return { content: [{ type: "text", text: [header, ...lines].join("\n") }] };
      },
    });

    register({
      name: "open_post",
      description:
        "Navigate the current page to one of this blog's posts. The slug should come from search_posts output.",
      inputSchema: {
        type: "object",
        properties: {
          slug: { type: "string", description: "Post slug, taken from search_posts output" },
        },
        required: ["slug"],
      },
      annotations: { readOnlyHint: false, consequentialHint: false },
      execute: async (input) => {
        const slug = String((input as { slug?: unknown }).slug ?? "");
        const post = posts.find((p) => p.slug === slug);

        if (!post) {
          const closest = posts
            .map((p) => p.slug)
            .filter((s) => s.includes(slug) || slug.includes(s))
            .slice(0, 5);
          const suggestion =
            closest.length > 0
              ? `Closest slugs: ${closest.join(", ")}`
              : `Available slugs: ${posts.map((p) => p.slug).join(", ")}`;
          return {
            content: [{ type: "text", text: `No post has the slug "${slug}". ${suggestion}` }],
          };
        }

        router.push(`/posts/${post.slug}/`);
        return { content: [{ type: "text", text: `Opened "${post.title}".` }] };
      },
    });

    return () => controller.abort();
  }, [posts, projects, router]);

  return null;
}
