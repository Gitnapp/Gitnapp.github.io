import Link from "next/link";

import { Button } from "@gitnapp/ui/components/ui/button";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-(--gds-content-standard) grow flex-col justify-center px-5 py-24 md:px-8">
        <p className="text-micro text-muted-foreground uppercase">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Not Found</h1>
        <p className="mt-4 text-base text-muted-foreground">来到了一片荒原，这里什么都没有。</p>
        <div className="mt-8">
          <Button asChild variant="outline" size="sm">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
