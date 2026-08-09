import type { ReactNode } from "react"

export function PageHeading({ eyebrow, title, description, actions }: {
  eyebrow?: string
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <header className="border-b pb-12 pt-16 sm:pb-16 sm:pt-24">
      {eyebrow && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>}
      <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
    </header>
  )
}
