import Link from "next/link";
import type { Metadata } from "next";

import { Badge } from "@gitnapp/ui/components/ui/badge";
import { Separator } from "@gitnapp/ui/components/ui/separator";

import { ProseBody } from "@/components/prose-body";
import { formatDateCN, getAllPosts, getPost } from "@/lib/posts";
import { tagHref } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { post } = await getPost((await params).slug);
  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.pubDate,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { post, html } = await getPost((await params).slug);
  const date = formatDateCN(post.pubDate);

  return (
    <article className="mx-auto w-full max-w-(--gds-content-narrow)">
      <header className="border-b pb-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-micro text-muted-foreground">
          <span className="uppercase">{post.tags[0]}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.pubDate} className="tabular-nums">
            {date}
          </time>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {post.title}
        </h1>
        {post.description ? (
          <p className="mt-4 text-base text-muted-foreground">{post.description}</p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge asChild key={tag} variant="secondary">
              <Link href={tagHref(tag)}>{tag}</Link>
            </Badge>
          ))}
        </div>
      </header>

      <ProseBody html={html} />

      <Separator className="mt-16" />
      <footer className="mt-6 space-y-1 text-micro text-muted-foreground">
        <a
          className="underline underline-offset-4 hover:text-foreground"
          href="https://creativecommons.org/licenses/by-nc-nd/3.0/deed.zh"
          target="_blank"
          rel="noreferrer"
        >
          版权声明：自由转载-非商用-非衍生-保持署名（创意共享3.0许可证）
        </a>
        <p>
          作者：{post.author} 发表日期：{date}
        </p>
      </footer>
    </article>
  );
}
