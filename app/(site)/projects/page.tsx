import Link from "next/link";
import type { Metadata } from "next";

import { Button } from "@gitnapp/ui/components/ui/button";

import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { RevealList } from "@/components/reveal";
import { featuredProjects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        title="Projects"
        subtitle="AI-agent tooling, macOS utilities, automation skills, and small web tools."
      >
        <Button asChild variant="outline" size="sm">
          <Link href="/">Back home</Link>
        </Button>
      </PageHero>

      <section className="mt-12">
        <h2 className="text-micro text-muted-foreground uppercase">Selected work</h2>
        <RevealList className="mt-6 grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <li key={project.name}>
              <ProjectCard project={project} />
            </li>
          ))}
        </RevealList>
      </section>
    </>
  );
}
