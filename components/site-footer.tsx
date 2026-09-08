import Link from "next/link";

import { GITHUB_URL, SITE_TITLE } from "@/lib/site";

const FOOTER_LINKS = [
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/archive" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto flex w-full max-w-(--gds-content-standard) flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="space-y-1">
          <div className="font-medium">{SITE_TITLE}</div>
          <p className="text-sm text-muted-foreground">
            AI-agent tools, macOS utilities, and automation systems.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:items-end">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} className="text-muted-foreground hover:text-foreground" href={link.href}>
                {link.label}
              </Link>
            ))}
            <a className="text-muted-foreground hover:text-foreground" href="/rss.xml">
              RSS
            </a>
            <a
              className="text-muted-foreground hover:text-foreground"
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </nav>
          <div className="text-micro text-muted-foreground tabular-nums">
            © {new Date().getFullYear()} {SITE_TITLE}
          </div>
        </div>
      </div>
    </footer>
  );
}
