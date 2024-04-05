import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "观澜",
    enableSPA: true,
    enablePopovers: true,
    analytics: { provider: 'google', tagId: 'G-YD9QB88Q1F' },
    locale: "en-US",
    baseUrl: "12701.top",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",    // created, modified, or published
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        // header: "Schibsted Grotesk",
        // body: "Source Sans Pro",
        // code: "IBM Plex Mono",
        //To configure heading font, go `theme.ts` Line 53.
        header: "STSong",
        body: "STSong",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          // light: "#faf8f8",
          light: "#fdf6e3",
          // lightgray: "#e5e5e5",
          lightgray: "#eee8d9",
          // gray: "#b8b8b8",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          // dark: "#2b2b2b",
          dark: "#232a2e",
          // secondary: "#284b63",
          secondary: "#37352e",
          // tertiary: "#84a59d",
          tertiary: "#a69e8a",
          // highlight: "rgba(143, 159, 169, 0.15)",
          highlight: "rgba(0, 0, 0, 0.05)",
        },
        darkMode: {
          // light: "#161618",
          light: "#111622",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#d4d4d4",
          dark: "#ebebec",
          secondary: "#7b97aa",
          tertiary: "#84a59d",
          highlight: "rgba(143, 159, 169, 0.15)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "relative" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
