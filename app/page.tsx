import Link from "next/link";

import { GITHUB_URL, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

const LINKS = [
  { label: "Selected work", href: "/projects" },
  { label: "Notes", href: "/archive" },
];

export default function HomePage() {
  return (
    <main
      aria-label={SITE_TITLE}
      className="mx-auto flex min-h-dvh w-full max-w-(--gds-content-wide) flex-col justify-between gap-16 px-5 py-8 md:px-8 md:py-10"
    >
      <header className="text-sm text-muted-foreground">
        <Link aria-current="page" className="text-foreground" href="/">
          {SITE_TITLE}
        </Link>
      </header>

      <h1 className="max-w-(--gds-content-standard) text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-6xl">
        {SITE_DESCRIPTION}
      </h1>

      <footer className="text-sm text-muted-foreground">
        <nav aria-label="Links" className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              className="underline underline-offset-4 decoration-border hover:text-foreground hover:decoration-foreground"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          <a
            className="underline underline-offset-4 decoration-border hover:text-foreground hover:decoration-foreground"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            Contact
          </a>
        </nav>
      </footer>
    </main>
  );
}
