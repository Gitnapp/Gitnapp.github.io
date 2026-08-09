export const site = {
  title: "Eric Yu",
  description: "I make tools that ask for less attention.",
  github: "https://github.com/Gitnapp",
}

export type Project = {
  name: string
  summary: string
  kind: string
  stack: string[]
  href: string
  demo?: string
  cover: string
}

export const projects: Project[] = [
  {
    name: "Typen",
    summary: "A focused Markdown editor for macOS, built as an open-source Typora alternative.",
    kind: "macOS app",
    stack: ["Dart", "Flutter", "Markdown"],
    href: "https://github.com/Gitnapp/Typen",
    cover: "/projects/typen.jpg",
  },
  {
    name: "BrowserQuickSwitch",
    summary: "A macOS menu bar utility for switching the default browser without digging through settings.",
    kind: "macOS utility",
    stack: ["Swift", "SwiftUI", "Menu Bar"],
    href: "https://github.com/Gitnapp/BrowserQuickSwitch",
    cover: "/projects/browserquickswitch.jpg",
  },
  {
    name: "iconify",
    summary: "A tiny SwiftUI tool for swapping folder icons with a set of macOS-style skins.",
    kind: "macOS utility",
    stack: ["Swift", "SwiftUI", "NSWorkspace"],
    href: "https://github.com/Gitnapp/iconify",
    cover: "/projects/iconify.jpg",
  },
  {
    name: "sushiro-skill",
    summary: "A command-line skill for checking real-time Sushiro queue data with curl and jq.",
    kind: "automation skill",
    stack: ["Shell", "curl", "jq"],
    href: "https://github.com/Gitnapp/sushiro-skill",
    cover: "/projects/sushiro-skill.jpg",
  },
  {
    name: "Skills",
    summary: "A collection of reusable skills and workflows for AI assistants and local automation.",
    kind: "AI tooling",
    stack: ["Python", "Agents", "Automation"],
    href: "https://github.com/Gitnapp/Skills",
    cover: "/projects/skills.jpg",
  },
  {
    name: "cargo-loading-calc",
    summary: "A web tool for planning box packing layouts and cargo-loading arrangements.",
    kind: "web app",
    stack: ["TypeScript", "Next.js", "Tailwind"],
    href: "https://github.com/Gitnapp/cargo-loading-calc",
    demo: "https://cargoloadingcalc.vercel.app",
    cover: "/projects/cargo-loading-calc.jpg",
  },
]

export const principles = [
  "Small tools should solve a real, repeatable workflow.",
  "AI systems are most useful when they become dependable local infrastructure.",
  "Good software reduces ceremony without hiding the important controls.",
]
