import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { PageShell } from "@/components/page-shell"
import { AboutPage } from "@/pages/about-page"
import { ArchivePage } from "@/pages/archive-page"
import { HomePage } from "@/pages/home"
import { NotFoundPage } from "@/pages/not-found-page"
import { PostPage } from "@/pages/post-page"
import { ProjectsPage } from "@/pages/projects-page"
import { TagPage } from "@/pages/tag-page"

const router = createBrowserRouter([
  {
    element: <PageShell />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/projects", element: <ProjectsPage /> },
      { path: "/archive", element: <ArchivePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/posts/:slug", element: <PostPage /> },
      { path: "/tags/:tag", element: <TagPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])

export function App() {
  return <RouterProvider router={router} />
}
