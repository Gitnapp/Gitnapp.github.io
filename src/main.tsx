import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { App } from "@/App"
import "@/index.css"

const redirectedPath = new URLSearchParams(window.location.search).get("redirect")
if (redirectedPath) window.history.replaceState(null, "", redirectedPath)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
