import type { ThemeRegistrationRaw } from "shiki";

/**
 * design.md 铁律 1：除语义状态色外禁止彩色 accent。通用 shiki 主题（github-*、
 * vitesse-*）全是彩色的，会把代码块变成全站唯一的彩色区域，所以这里用灰阶自定义
 * 主题——层级靠明度和字重，不靠色相，与 monochrome token 一致。
 */
function grayscale(
  name: string,
  type: "light" | "dark",
  c: {
    fg: string;
    comment: string;
    keyword: string;
    string: string;
    muted: string;
    strong: string;
  },
): ThemeRegistrationRaw {
  return {
    name,
    type,
    colors: { "editor.foreground": c.fg, "editor.background": "#00000000" },
    settings: [
      { settings: { foreground: c.fg } },
      { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: c.comment, fontStyle: "italic" } },
      { scope: ["keyword", "storage", "storage.type", "keyword.control", "keyword.operator.new"], settings: { foreground: c.keyword, fontStyle: "bold" } },
      { scope: ["string", "string.quoted", "constant.character.escape"], settings: { foreground: c.string } },
      { scope: ["constant.numeric", "constant.language", "constant.other"], settings: { foreground: c.strong } },
      { scope: ["entity.name.function", "support.function", "meta.function-call"], settings: { foreground: c.strong, fontStyle: "bold" } },
      { scope: ["entity.name.type", "support.type", "support.class", "entity.name.class"], settings: { foreground: c.strong } },
      { scope: ["variable", "variable.other", "meta.definition.variable"], settings: { foreground: c.fg } },
      { scope: ["punctuation", "meta.brace", "keyword.operator"], settings: { foreground: c.muted } },
    ],
  };
}

export const codeThemeLight = grayscale("rational-light", "light", {
  fg: "#2b2b2b",
  comment: "#8e8e8e",
  keyword: "#0a0a0a",
  string: "#5c5c5c",
  muted: "#9a9a9a",
  strong: "#141414",
});

export const codeThemeDark = grayscale("rational-dark", "dark", {
  fg: "#d6d6d6",
  comment: "#7d7d7d",
  keyword: "#fafafa",
  string: "#a8a8a8",
  muted: "#787878",
  strong: "#ededed",
});
