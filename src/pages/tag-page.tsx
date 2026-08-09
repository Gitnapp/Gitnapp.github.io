import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { formatDate, posts } from "@/lib/posts"
import { useDocumentTitle } from "@/lib/use-document-title"
import { cn } from "@/lib/utils"

export function TagPage() {
  const { tag = "" } = useParams()
  const decodedTag = decodeURIComponent(tag)
  const matches = posts.filter((post) => post.tags.includes(decodedTag))
  useDocumentTitle(decodedTag)

  return (
    <main className="mx-auto min-h-[70vh] max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
      <Link to="/archive" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "mb-10")}>
        <ArrowLeft /> All writing
      </Link>
      <Badge variant="outline">Topic</Badge>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">{decodedTag}</h1>
      <p className="mt-4 text-muted-foreground">{matches.length} articles</p>
      <div className="mt-12 divide-y border-t">
        {matches.map((post) => (
          <Link key={post.slug} to={`/posts/${post.slug}`} className="grid gap-3 py-6 sm:grid-cols-[8rem_1fr]">
            <time className="text-sm text-muted-foreground">{formatDate(post.pubDate)}</time>
            <div>
              <h2 className="text-xl font-medium hover:underline">{post.title}</h2>
              <p className="mt-2 line-clamp-2 leading-7 text-muted-foreground">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
