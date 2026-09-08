import type { StaticImageData } from "next/image";

import typen from "@/public/projects/typen.jpg";
import browserquickswitch from "@/public/projects/browserquickswitch.jpg";
import iconify from "@/public/projects/iconify.jpg";
import sushiroSkill from "@/public/projects/sushiro-skill.jpg";
import skills from "@/public/projects/skills.jpg";
import cargoLoadingCalc from "@/public/projects/cargo-loading-calc.jpg";

export type Project = {
  name: string;
  summary: string;
  kind: string;
  stack: string[];
  href: string;
  demo?: string;
  /** 静态导入：Next 构建时读出真实尺寸并生成模糊占位图，页面不会因为图片到达而跳动。 */
  cover: StaticImageData;
};

export const featuredProjects: Project[] = [
  {
    name: "Typen",
    summary: "A focused Markdown editor for macOS, built as an open-source Typora alternative.",
    kind: "macOS app",
    stack: ["Dart", "Flutter", "Markdown"],
    href: "https://github.com/Gitnapp/Typen",
    cover: typen,
  },
  {
    name: "BrowserQuickSwitch",
    summary:
      "A macOS menu bar utility for switching the default browser without digging through settings.",
    kind: "macOS utility",
    stack: ["Swift", "SwiftUI", "Menu Bar"],
    href: "https://github.com/Gitnapp/BrowserQuickSwitch",
    cover: browserquickswitch,
  },
  {
    name: "iconify",
    summary: "A tiny SwiftUI tool for swapping folder icons with a set of macOS-style skins.",
    kind: "macOS utility",
    stack: ["Swift", "SwiftUI", "NSWorkspace"],
    href: "https://github.com/Gitnapp/iconify",
    cover: iconify,
  },
  {
    name: "sushiro-skill",
    summary: "A command-line skill for checking real-time Sushiro queue data with curl and jq.",
    kind: "automation skill",
    stack: ["Shell", "curl", "jq"],
    href: "https://github.com/Gitnapp/sushiro-skill",
    cover: sushiroSkill,
  },
  {
    name: "Skills",
    summary:
      "A collection of reusable skills and workflows for AI assistants and local automation.",
    kind: "AI tooling",
    stack: ["Python", "Agents", "Automation"],
    href: "https://github.com/Gitnapp/Skills",
    cover: skills,
  },
  {
    name: "cargo-loading-calc",
    summary: "A web tool for planning box packing layouts and cargo-loading arrangements.",
    kind: "web app",
    stack: ["TypeScript", "Next.js", "Tailwind"],
    href: "https://github.com/Gitnapp/cargo-loading-calc",
    demo: "https://cargoloadingcalc.vercel.app",
    cover: cargoLoadingCalc,
  },
];

export const focusAreas = [
  {
    title: "Agent workflows",
    body: "Reusable skills, local automation, and small systems that make AI assistants more dependable.",
  },
  {
    title: "macOS utilities",
    body: "Focused native tools for everyday interface friction, built with the calmness of system software.",
  },
  {
    title: "Developer tools",
    body: "Compact web and command-line tools that turn repeated manual work into repeatable routines.",
  },
];
