import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@gitnapp/ui/components/ui/button";

import { PageHero } from "@/components/page-hero";
import { focusAreas } from "@/lib/projects";
import { GITHUB_URL } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About"
        subtitle="Practical tools around AI workflows, automation, and focused macOS utilities."
      >
        <Button asChild variant="outline" size="sm">
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </Button>
      </PageHero>

      <section className="mt-12">
        <h2 className="text-micro text-muted-foreground uppercase">Focus</h2>
        <div className="mt-6 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area) => (
            <article key={area.title}>
              <h3 className="font-medium">{area.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{area.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
