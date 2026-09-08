"use client";

import { useEffect, useRef } from "react";

/**
 * 进入视口后揭示元素，只触发一次。
 *
 * 只处理首屏之外的元素：已经在视口里的内容服务端就渲染好了，再去藏一下再放出来
 * 会闪。JS 没跑起来时元素保持可见，动效是增强，不是显示的前提。
 */
export function revealOnScroll(elements: Iterable<Element>): () => void {
  if (typeof IntersectionObserver === "undefined") return () => {};

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-reveal", "in");
        observer.unobserve(entry.target);
      }
    },
    // 顶部留出一个足够大的余量，让"已经滚过去"的元素也算相交，否则快速滚动
    // 跳过的元素永远不会收到回调（IntersectionObserver 只在相交状态变化时
    // 触发），会停在隐藏态。余量要盖过最长文章的总高度——图多的文章光图片
    // 就能撑到一万多像素，9999px 不够，这里留 100000px。底部保持 -8%，
    // 元素从下方进入时仍等待相同的距离。
    { rootMargin: "100000px 0px -8% 0px" },
  );

  for (const element of elements) {
    if (element.getBoundingClientRect().top < window.innerHeight) continue;
    element.setAttribute("data-reveal", "out");
    observer.observe(element);
  }

  return () => observer.disconnect();
}

/** 容器的直接子元素逐个进场；子元素仍由服务端渲染。 */
export function RevealList({
  className,
  children,
}: {
  readonly className?: string;
  readonly children: React.ReactNode;
}) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return revealOnScroll(ref.current.children);
  }, []);

  return (
    <ul className={className} ref={ref}>
      {children}
    </ul>
  );
}
