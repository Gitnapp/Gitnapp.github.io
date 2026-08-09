import { Outlet, ScrollRestoration } from "react-router-dom"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export function PageShell() {
  return (
    <>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
      <ScrollRestoration />
    </>
  )
}
