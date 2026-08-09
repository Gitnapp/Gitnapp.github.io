import { Link } from "react-router-dom"

import { Separator } from "@/components/ui/separator"

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 max-w-6xl px-5 pb-10 sm:px-8">
      <Separator />
      <div className="flex flex-col gap-5 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-medium text-foreground">Eric Yu</p>
          <p className="mt-1">AI-agent tools, macOS utilities, and automation systems.</p>
        </div>
        <nav className="flex flex-wrap gap-5" aria-label="Footer navigation">
          <Link to="/projects" className="hover:text-foreground">Work</Link>
          <Link to="/archive" className="hover:text-foreground">Writing</Link>
          <a href="https://github.com/Gitnapp" target="_blank" rel="noreferrer" className="hover:text-foreground">GitHub</a>
          <span>© {new Date().getFullYear()}</span>
        </nav>
      </div>
    </footer>
  )
}
