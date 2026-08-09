import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

import { buttonVariants } from "@/components/ui/button"
import { useDocumentTitle } from "@/lib/use-document-title"
import { cn } from "@/lib/utils"

export function NotFoundPage() {
  useDocumentTitle("Not found")
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-4xl flex-col items-start justify-center px-5 sm:px-8">
      <p className="text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em]">Nothing here.</h1>
      <p className="mt-4 text-lg text-muted-foreground">来到了一片荒原，这里什么都没有。</p>
      <Link to="/" className={cn(buttonVariants({ variant: "outline" }), "mt-8")}><ArrowLeft /> Back home</Link>
    </main>
  )
}
