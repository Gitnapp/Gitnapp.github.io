export const SITE_TITLE = "Eric Yu";
export const SITE_DESCRIPTION = "I make tools that ask for less attention.";
export const SITE_URL = "https://gitnapp.github.io";
export const SITE_LANG = "en";
export const SITE_AUTHOR = "Eric Yu";
export const GITHUB_URL = "https://github.com/Gitnapp";

export type NavLink = { label: string; href: string; external?: boolean };

export const NAV_LINKS: NavLink[] = [
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/archive" },
  { label: "About", href: "/about" },
  { label: "GitHub", href: GITHUB_URL, external: true },
];

/** 归档页按这几个主题分组，顺序即展示顺序。 */
export const ARCHIVE_TAGS = ["新闻稿", "虚幻引擎", "源码研究"] as const;

export function tagHref(tag: string) {
  return `/tags/${encodeURIComponent(tag)}`;
}
