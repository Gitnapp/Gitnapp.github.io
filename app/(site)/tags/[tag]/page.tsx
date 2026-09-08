import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { PostList } from "@/components/post-list";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type Params = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag } = await params;
  return { title: decodeURIComponent(tag) };
}

export default async function TagPage({ params }: Params) {
  const tag = decodeURIComponent((await params).tag);
  return (
    <>
      <PageHero title={tag} />
      <div className="mt-10">
        <PostList posts={getPostsByTag(tag)} />
      </div>
    </>
  );
}
