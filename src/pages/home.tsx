import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

import { buttonVariants } from "@/components/ui/button"
import { posts } from "@/lib/posts"
import { projects } from "@/lib/site"
import { useDocumentTitle } from "@/lib/use-document-title"
import { cn } from "@/lib/utils"

export function HomePage() {
  useDocumentTitle()
  const latest = posts.slice(0, 3)

  return (
    <main>
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-between px-5 py-12 sm:px-8 sm:py-16">
        <div className="py-20 sm:py-28">
          <h1 className="max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.055em] sm:text-7xl lg:text-[6.5rem]">
            I make tools that ask for less attention.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Small, dependable software for focused work—built around local AI workflows, native macOS utilities, and useful automation.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/projects" className={buttonVariants({ size: "lg" })}>
              Selected work <ArrowUpRight data-icon="inline-end" />
            </Link>
            <Link to="/archive" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Read the notes
            </Link>
          </div>
        </div>

        <div className="grid gap-8 border-t pt-8 md:grid-cols-[1fr_2fr]">
          <p className="text-sm font-medium">A few things I’ve made</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <a key={project.name} href={project.href} target="_blank" rel="noreferrer" className="group">
                <p className="font-medium group-hover:underline">{project.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{project.kind}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="mb-8 flex items-end justify-between border-b pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Writing</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Latest notes</h2>
          </div>
          <Link to="/archive" className={cn(buttonVariants({ variant: "ghost" }), "hidden sm:inline-flex")}>All writing</Link>
        </div>
        <div className="divide-y">
          {latest.map((post) => (
            <Link key={post.slug} to={`/posts/${post.slug}`} className="group grid gap-3 py-6 sm:grid-cols-[8rem_1fr_auto] sm:items-center">
              <span className="text-sm text-muted-foreground">{new Date(post.pubDate).getFullYear()}</span>
              <span className="text-lg font-medium group-hover:underline">{post.title}</span>
              <ArrowUpRight className="hidden size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
