import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { PostList } from "@/components/post-list";
import { getPostsByTag } from "@/lib/posts";
import { ARCHIVE_TAGS } from "@/lib/site";

export const metadata: Metadata = { title: "归档" };

export default function ArchivePage() {
  return (
    <>
      <PageHero title="归档" />

      <div className="mt-12 space-y-12">
        {ARCHIVE_TAGS.map((tag) => (
          <section key={tag}>
            <h2 className="text-micro text-muted-foreground uppercase">{tag}</h2>
            <div className="mt-4">
              <PostList posts={getPostsByTag(tag)} />
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
