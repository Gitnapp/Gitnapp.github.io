import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

import { PageHeading } from "@/components/page-heading"
import { Badge } from "@/components/ui/badge"
import { formatDate, posts, tags } from "@/lib/posts"
import { useDocumentTitle } from "@/lib/use-document-title"

export function ArchivePage() {
  useDocumentTitle("Writing")

  return (
    <main className="mx-auto max-w-6xl px-5 sm:px-8">
      <PageHeading
        eyebrow="Archive"
        title="Notes on building and learning."
        description={`${posts.length} articles across software, source-code study, Apple, and real-time 3D.`}
      />
      <section className="py-12 lg:grid lg:grid-cols-[14rem_1fr] lg:gap-16 lg:py-16">
        <aside className="mb-10 lg:mb-0">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Topics</p>
          <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
            {tags.map((tag) => (
              <Link key={tag} to={`/tags/${encodeURIComponent(tag)}`}><Badge variant="outline">{tag}</Badge></Link>
            ))}
          </div>
        </aside>
        <div className="divide-y border-t">
          {posts.map((post) => (
            <article key={post.slug} className="group py-7">
              <Link to={`/posts/${post.slug}`} className="grid gap-3 sm:grid-cols-[8rem_1fr_auto] sm:items-start">
                <time className="pt-1 text-sm text-muted-foreground" dateTime={post.pubDate}>{formatDate(post.pubDate)}</time>
                <div>
                  <h2 className="text-xl font-medium tracking-tight group-hover:underline">{post.title}</h2>
                  <p className="mt-2 line-clamp-2 leading-7 text-muted-foreground">{post.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                </div>
                <ArrowUpRight className="mt-1 hidden size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
