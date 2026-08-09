import { ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Link, useParams } from "react-router-dom"
import remarkGfm from "remark-gfm"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatDate, posts } from "@/lib/posts"
import { useDocumentTitle } from "@/lib/use-document-title"
import { cn } from "@/lib/utils"

export function PostPage() {
  const { slug } = useParams()
  const post = posts.find((item) => item.slug === slug)
  useDocumentTitle(post?.title ?? "Not found")

  if (!post) return <ArticleNotFound />

  return (
    <main>
      <article>
        <header className={cn("border-b", post.theme === "dark" && "bg-neutral-950 text-white")}>
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 sm:py-24">
            <Link
              to="/archive"
              className={cn(buttonVariants({ variant: post.theme === "dark" ? "secondary" : "ghost", size: "sm" }), "mb-10")}
            >
              <ArrowLeft data-icon="inline-start" /> Writing
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-sm opacity-70">
              <span>{post.tags[0]}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.pubDate}>{formatDate(post.pubDate, true)}</time>
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">{post.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 opacity-70 sm:text-xl">{post.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} to={`/tags/${encodeURIComponent(tag)}`}>
                  <Badge variant={post.theme === "dark" ? "secondary" : "outline"}>{tag}</Badge>
                </Link>
              ))}
            </div>
          </div>
        </header>

        <div className="prose-blog mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children, ...props }) => (
                <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noreferrer" : undefined} {...props}>{children}</a>
              ),
              img: ({ alt = "", ...props }) => {
                const [label, size = "big"] = alt.split("|")
                return <img alt={label.trim()} data-size={size.trim()} loading="lazy" {...props} />
              },
            }}
          >
            {post.body}
          </ReactMarkdown>
          <Separator className="mt-16" />
          <div className="mt-8 text-sm leading-6 text-muted-foreground">
            <p>作者：{post.author} · 发表日期：{formatDate(post.pubDate, true)}</p>
            <a href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh" target="_blank" rel="noreferrer" className="mt-2 inline-block underline underline-offset-4">
              自由转载—非商用—非衍生—保持署名（创意共享 3.0）
            </a>
          </div>
        </div>
      </article>
    </main>
  )
}

function ArticleNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-5 sm:px-8">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Article not found.</h1>
      <Link to="/archive" className={cn(buttonVariants({ variant: "outline" }), "mt-8")}><ArrowLeft /> Back to writing</Link>
    </main>
  )
}
