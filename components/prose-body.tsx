"use client";

import { useEffect, useRef } from "react";

import { revealOnScroll } from "./reveal";

/**
 * 文章正文。HTML 在构建时由 markdown 渲染好，这里只挂两件运行时的事：
 * 标记加载失败的图片（好让 CSS 把它渲染成安静的空框），以及插图进入视口时进场。
 */
export function ProseBody({ html }: { readonly html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const detach: Array<() => void> = [];

    for (const img of root.querySelectorAll("img")) {
      // 已经在缓存里的图片直接就位；只在它其实是坏图时才需要打标记。
      if (img.complete) {
        if (img.naturalWidth === 0) img.dataset.state = "failed";
        continue;
      }

      const failed = () => {
        img.dataset.state = "failed";
      };
      img.addEventListener("error", failed, { once: true });
      detach.push(() => {
        img.removeEventListener("error", failed);
      });
    }

    detach.push(revealOnScroll(root.querySelectorAll("figure[data-size]")));

    return () => {
      for (const off of detach) off();
    };
  }, []);

  return (
    /* Markdown 是仓库里自己写的，构建时渲染，没有用户输入。 */
    // biome-ignore lint/security/noDangerouslySetInnerHtml: build-time rendered markdown
    <div className="prose mt-10" dangerouslySetInnerHTML={{ __html: html }} ref={ref} />
  );
}
