/**
 * 把文章里远程图片的真实宽高探测出来，写进 content/image-sizes.json。
 *
 * Markdown 不带尺寸信息，浏览器在图片到达前无法为它留位，于是图片一到就把
 * 正文顶开。构建时把宽高写进 <img>，浏览器就能先按比例占位，加载完成不再跳动。
 *
 * 探测结果入库提交，构建本身不联网——CI 不受图床可用性影响。
 *
 *   pnpm images:probe            只补新增图片
 *   pnpm images:probe --force    重新探测全部
 */
import fs from "node:fs/promises";
import path from "node:path";

import probe from "probe-image-size";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const CACHE_FILE = path.join(process.cwd(), "content", "image-sizes.json");
const TIMEOUT_MS = 5000;
const CONCURRENCY = 6;

const force = process.argv.includes("--force");

/** Markdown 图片语法里的 URL，`![说明|size](url)` 的 url 部分。 */
function collectUrls(markdown) {
  return [...markdown.matchAll(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/g)].map((m) => m[1]);
}

async function probeOne(url) {
  try {
    const { width, height } = await probe(url, {
      open_timeout: TIMEOUT_MS,
      response_timeout: TIMEOUT_MS,
    });
    return width > 0 && height > 0 ? { width, height } : null;
  } catch {
    return null;
  }
}

async function main() {
  const files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith(".md"));
  const urls = new Set();
  for (const file of files) {
    const md = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
    for (const url of collectUrls(md)) urls.add(url);
  }

  /** @type {Record<string, {width:number,height:number}|null>} */
  let cache = {};
  try {
    cache = JSON.parse(await fs.readFile(CACHE_FILE, "utf8"));
  } catch {
    // 首次运行，没有缓存。
  }

  const pending = [...urls].filter((url) => force || !(url in cache));
  console.log(`${urls.size} images referenced, ${pending.length} to probe`);

  let done = 0;
  const queue = [...pending];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length > 0) {
        const url = queue.shift();
        cache[url] = await probeOne(url);
        done += 1;
        if (done % 10 === 0 || done === pending.length) {
          console.log(`  probed ${done}/${pending.length}`);
        }
      }
    }),
  );

  // 删掉文章里已经不再引用的条目，并按 URL 排序，让 diff 稳定。
  const sorted = Object.fromEntries(
    [...urls].sort().map((url) => [url, cache[url] ?? null]),
  );
  await fs.writeFile(CACHE_FILE, `${JSON.stringify(sorted, null, 2)}\n`);

  const failed = Object.entries(sorted).filter(([, v]) => v === null);
  console.log(`wrote ${CACHE_FILE} (${urls.size - failed.length} sized, ${failed.length} unreachable)`);
  for (const [url] of failed) console.log(`  unreachable: ${url}`);
}

await main();
