import { ArrowUpRight, ExternalLink } from "lucide-react"

import { PageHeading } from "@/components/page-heading"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { projects } from "@/lib/site"
import { useDocumentTitle } from "@/lib/use-document-title"

export function ProjectsPage() {
  useDocumentTitle("Projects")

  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-8">
      <PageHeading
        eyebrow="Selected work"
        title="Useful software, kept deliberately small."
        description="AI-agent tooling, macOS utilities, automation skills, and focused web tools built to remove repeated friction."
      />
      <section className="grid gap-6 py-12 sm:grid-cols-2 lg:py-16">
        {projects.map((project) => (
          <Card key={project.name} className="group py-0 transition-transform duration-300 hover:-translate-y-1">
            <a href={project.href} target="_blank" rel="noreferrer" className="block overflow-hidden">
              <img src={project.cover} alt="" className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            </a>
            <CardHeader className="pt-5">
              <div className="flex items-center justify-between gap-3">
                <Badge variant="secondary">{project.kind}</Badge>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </div>
              <CardTitle className="mt-3 text-2xl">{project.name}</CardTitle>
              <CardDescription className="text-base leading-7">{project.summary}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {project.stack.map((item) => <Badge key={item} variant="outline">{item}</Badge>)}
            </CardContent>
            <CardFooter className="mt-auto gap-3 border-0 bg-transparent pb-5">
              <a href={project.href} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
                Source <ExternalLink data-icon="inline-end" />
              </a>
              {project.demo && (
                <Button render={<a href={project.demo} target="_blank" rel="noreferrer" />} size="sm">
                  Live demo <ArrowUpRight data-icon="inline-end" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  )
}
