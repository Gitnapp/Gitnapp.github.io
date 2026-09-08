import Link from "next/link";

import { Button } from "@gitnapp/ui/components/ui/button";

import { NAV_LINKS, SITE_TITLE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-(--gds-header-height) w-full max-w-(--gds-content-standard) items-center justify-between gap-4 px-5 md:px-8"
      >
        <Button asChild variant="ghost" size="sm" className="-ml-2 px-2 font-medium md:-ml-3 md:px-3">
          <Link href="/">{SITE_TITLE}</Link>
        </Button>
        <div className="flex items-center gap-0.5 md:gap-1">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <Button asChild key={link.href} variant="ghost" size="sm" className="px-2 text-muted-foreground md:px-3">
                <a href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              </Button>
            ) : (
              <Button asChild key={link.href} variant="ghost" size="sm" className="px-2 text-muted-foreground md:px-3">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ),
          )}
        </div>
      </nav>
    </header>
  );
}
