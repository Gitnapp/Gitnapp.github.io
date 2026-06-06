export const featuredProjects = [
  {
    name: "Typen",
    summary: "A focused Markdown editor for macOS, built as an open-source Typora alternative.",
    kind: "macOS app",
    stack: ["Dart", "Flutter", "Markdown"],
    href: "https://github.com/Gitnapp/Typen",
    accent: "TP",
  },
  {
    name: "BrowserQuickSwitch",
    summary: "A macOS menu bar utility for switching the default browser without digging through settings.",
    kind: "macOS utility",
    stack: ["Swift", "SwiftUI", "Menu Bar"],
    href: "https://github.com/Gitnapp/BrowserQuickSwitch",
    accent: "BQ",
  },
  {
    name: "iconify",
    summary: "A tiny SwiftUI tool for swapping folder icons with a set of macOS-style skins.",
    kind: "macOS utility",
    stack: ["Swift", "SwiftUI", "NSWorkspace"],
    href: "https://github.com/Gitnapp/iconify",
    accent: "IC",
  },
  {
    name: "sushiro-skill",
    summary: "A command-line skill for checking real-time Sushiro queue data with curl and jq.",
    kind: "automation skill",
    stack: ["Shell", "curl", "jq"],
    href: "https://github.com/Gitnapp/sushiro-skill",
    accent: "SQ",
  },
  {
    name: "Skills",
    summary: "A collection of reusable skills and workflows for AI assistants and local automation.",
    kind: "AI tooling",
    stack: ["Python", "Agents", "Automation"],
    href: "https://github.com/Gitnapp/Skills",
    accent: "SK",
  },
  {
    name: "cargo-loading-calc",
    summary: "A web tool for planning box packing layouts and cargo-loading arrangements.",
    kind: "web app",
    stack: ["TypeScript", "Next.js", "Tailwind"],
    href: "https://github.com/Gitnapp/cargo-loading-calc",
    demo: "https://cargoloadingcalc.vercel.app",
    accent: "CL",
  },
];

export const principles = [
  "Small tools should solve a real, repeatable workflow.",
  "AI systems are most useful when they become dependable local infrastructure.",
  "Good software reduces ceremony without hiding the important controls.",
];
