import { Code2, Menu } from "lucide-react"
import { Link, NavLink } from "react-router-dom"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navigation = [
  ["Work", "/projects"],
  ["Writing", "/archive"],
  ["About", "/about"],
] as const

function NavItems({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      {navigation.map(([label, href]) => (
        <NavLink
          key={href}
          to={href}
          className={({ isActive }) =>
            cn(
              mobile
                ? "rounded-xl px-4 py-3 text-lg font-medium transition-colors hover:bg-muted"
                : "text-sm text-muted-foreground transition-colors hover:text-foreground",
              isActive && "text-foreground",
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </>
  )
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          Eric Yu
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          <NavItems />
          <a
            href="https://github.com/Gitnapp"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <Code2 data-icon="inline-start" /> GitHub
          </a>
        </nav>
        <Sheet>
          <SheetTrigger
            className="md:hidden"
            render={<Button variant="ghost" size="icon" aria-label="Open navigation" />}
          >
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Eric Yu</SheetTitle>
              <SheetDescription>Tools that ask for less attention.</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-2" aria-label="Mobile navigation">
              {navigation.map(([label, href]) => (
                <SheetClose
                  key={href}
                  render={<Link to={href} className="rounded-xl px-4 py-3 text-lg font-medium hover:bg-muted" />}
                >
                  {label}
                </SheetClose>
              ))}
              <a
                href="https://github.com/Gitnapp"
                target="_blank"
                rel="noreferrer"
                className="mt-3 flex items-center gap-2 rounded-xl px-4 py-3 text-lg font-medium hover:bg-muted"
              >
                <Code2 className="size-5" /> GitHub
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
