import { ArrowUpRight, Code2 } from "lucide-react"

import { PageHeading } from "@/components/page-heading"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { principles } from "@/lib/site"
import { useDocumentTitle } from "@/lib/use-document-title"

const focus = [
  ["Agent workflows", "Reusable skills, local automation, and small systems that make AI assistants more dependable."],
  ["macOS utilities", "Focused native tools for everyday interface friction, built with the calmness of system software."],
  ["Developer tools", "Compact web and command-line tools that turn repeated manual work into repeatable routines."],
] as const

export function AboutPage() {
  useDocumentTitle("About")

  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-8">
      <PageHeading
        eyebrow="About"
        title="Less ceremony. More useful work."
        description="I’m Eric Yu, a builder focused on practical tools around AI workflows, automation, and native macOS utilities."
        actions={
          <a href="https://github.com/Gitnapp" target="_blank" rel="noreferrer" className={buttonVariants({ size: "lg" })}>
            <Code2 data-icon="inline-start" /> GitHub <ArrowUpRight data-icon="inline-end" />
          </a>
        }
      />
      <section className="py-12 lg:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {focus.map(([title, description], index) => (
            <Card key={title}>
              <CardHeader>
                <span className="mb-5 text-sm text-muted-foreground">0{index + 1}</span>
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription className="text-base leading-7">{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="mt-16 grid gap-8 border-t pt-10 lg:grid-cols-[1fr_2fr]">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">Principles</h2>
          <ol className="space-y-8">
            {principles.map((principle, index) => (
              <li key={principle} className="grid grid-cols-[2rem_1fr] gap-4 text-xl leading-8">
                <span className="text-sm text-muted-foreground">{index + 1}</span>{principle}
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  )
}
