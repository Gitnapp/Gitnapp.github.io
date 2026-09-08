import Link from "next/link";

import { formatDateISO, type Post } from "@/lib/posts";

export function PostList({ posts }: { readonly posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="text-sm text-muted-foreground">暂无文章</p>;
  }

  return (
    <ul className="-mx-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            className="group flex flex-col gap-x-4 gap-y-1 rounded-md px-3 py-2.5 transition-colors hover:bg-accent sm:flex-row sm:items-baseline"
            href={`/posts/${post.slug}`}
          >
            <span className="text-micro text-muted-foreground tabular-nums sm:w-24 sm:shrink-0">
              {formatDateISO(post.pubDate)}
            </span>
            <span className="text-sm group-hover:underline">{post.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
