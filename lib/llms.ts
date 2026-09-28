import { getAllPosts, getPostMarkdown } from "./posts";
import { featuredProjects, focusAreas } from "./projects";
import { GITHUB_URL, SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./site";

const SITE_SUMMARY =
  `${SITE_DESCRIPTION} Personal website of ${SITE_AUTHOR} (Gitnapp), ` +
  "an AI engineer in Shenzhen, China, building AI-agent tools, macOS utilities, and automation systems.";

/**
 * 站点级 llms.txt（索引版）：按 llmstxt.org 规范组织——H1 站名、
 * blockquote 一句话摘要、H2 分组链接列表。路由 app/llms.txt/route.ts
 * 在构建时静态生成，内容随 content/ 自动更新。
 */
export function buildLlmsTxt(): string {
  const posts = getAllPosts();

  const lines: string[] = [
    `# ${SITE_TITLE}`,
    "",
    `> ${SITE_SUMMARY}`,
    "",
    "This site collects featured projects and writing on AI workflows, automation, and focused macOS utilities.",
    "",
    "## Site",
    "",
    `- [About](${SITE_URL}/about/): Focus areas — ${focusAreas.map((a) => a.title.toLowerCase()).join(", ")}.`,
    `- [Projects](${SITE_URL}/projects/): Featured projects with summaries and source links.`,
    `- [Writing](${SITE_URL}/archive/): All blog posts, grouped by topic.`,
    "",
    "## Projects",
    "",
    ...featuredProjects.map((p) => {
      const demo = p.demo ? ` Demo: ${p.demo}.` : "";
      return `- [${p.name}](${p.href}): ${p.summary}${demo}`;
    }),
    "",
    "## Writing",
    "",
    ...posts.map(
      (post) => `- [${post.title}](${SITE_URL}/posts/${post.slug}/): ${post.description}`,
    ),
    "",
    "## Optional",
    "",
    `- [RSS feed](${SITE_URL}/rss.xml): Every post in one feed.`,
    `- [Full content](${SITE_URL}/llms-full.txt): This entire site as a single markdown document.`,
    `- [GitHub](${GITHUB_URL}): Open-source projects and source code.`,
    `- [Sitemap](${SITE_URL}/sitemap.xml): Complete URL list.`,
    "",
  ];

  return lines.join("\n");
}

/**
 * llms-full.txt：整站内容打平成单个 markdown 文档，适合大上下文窗口
 * 的工具一次性 ingest。文章按站点内的时间倒序排列。
 */
export function buildLlmsFullTxt(): string {
  const posts = getAllPosts();

  const lines: string[] = [
    `# ${SITE_TITLE}`,
    "",
    `> ${SITE_SUMMARY}`,
    "",
    "## About",
    "",
    ...focusAreas.flatMap((area) => [`### ${area.title}`, "", area.body, ""]),
    "## Projects",
    "",
    ...featuredProjects.flatMap((p) => {
      const stack = p.stack.length > 0 ? ` Built with ${p.stack.join(", ")}.` : "";
      const demo = p.demo ? ` Demo: ${p.demo}.` : "";
      return [`### ${p.name}`, "", `${p.summary}${stack} Source: ${p.href}.${demo}`, ""];
    }),
    "## Writing",
    "",
  ];

  for (const post of posts) {
    lines.push(
      `### ${post.title}`,
      "",
      `Published ${post.pubDate}. Tags: ${post.tags.join(", ")}.`,
      `Canonical URL: ${SITE_URL}/posts/${post.slug}/`,
      "",
      getPostMarkdown(post.slug),
      "",
      "---",
      "",
    );
  }

  return lines.join("\n");
}
