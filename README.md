# gitnapp.github.io

Eric Yu 的个人站点，部署在 GitHub Pages：<https://gitnapp.github.io>

## 技术栈

- **Next.js 16**（App Router，`output: "export"` 静态导出）+ React 19
- **[rational-ui](https://github.com/Gitnapp/rational-ui)** —— 自有设计系统，通过 GitHub Packages 引入
  `@gitnapp/design-tokens`（Tailwind v4 token）与 `@gitnapp/ui`（shadcn 组件）
- 文章用 Markdown 写在 `content/posts/`，构建时经 remark/rehype 渲染；
  代码高亮用 shiki，主题是灰阶自定义主题（design.md 禁止彩色 accent）

## 目录

| 路径 | 内容 |
|---|---|
| `app/` | 路由。`app/page.tsx` 是无导航的首页；`app/(site)/` 下的页面共用页头页脚 |
| `components/` | 站点自有组件（页头、页脚、文章列表、项目卡片） |
| `content/posts/` | 文章 Markdown，frontmatter 含 `title` `pubDate` `description` `author` `tags` |
| `lib/` | 站点常量、文章读取与 Markdown 管线、项目数据 |

## 本地开发

需要 Node 24 与 pnpm。`@gitnapp/*` 托管在 GitHub Packages，它的 npm endpoint
即使对公共包也要求认证，所以安装时要带一个有 `read:packages` 权限的 token：

```bash
export GITHUB_TOKEN=$(gh auth token)
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # 静态产物输出到 out/
```

## 给 AI 代理用的工具（WebMCP）

站点通过 [WebMCP](https://github.com/webmachinelearning/webmcp) 向浏览器里的 AI 代理
暴露三个工具，代理可以直接调用而不用截图解析页面：

| 工具 | 作用 |
|---|---|
| `search_posts` | 按关键词搜文章（匹配标题、摘要、标签），不传关键词则返回全部 |
| `list_projects` | 列出精选项目 |
| `open_post` | 把当前页面跳转到某篇文章，slug 会先校验 |

WebMCP 是 W3C 社区组草案，目前只有 Chrome 146+ 作为实验特性提供。不支持的浏览器里
`document.modelContext` 不存在，组件直接静默退出，页面行为完全不受影响。

实现在 `components/model-context-tools.tsx`，类型声明在 `types/webmcp.d.ts`（对照
规范仓库的 IDL 手写，不依赖第三方包）。注意这个 API 半年内改过一次
（`navigator.modelContext` → `document.modelContext`），代码只实现当前版本。

## 部署

推送到 `v4` 分支由 `.github/workflows/deploy.yml` 自动构建并发布到 GitHub Pages。

## 写一篇新文章

在 `content/posts/` 新建 `<slug>.md`：

```markdown
---
title: '标题'
pubDate: 2026-01-01
description: '摘要'
author: 'Eric Yu'
tags: ["源码研究", "golang"]
featured: false
---
```

正文插图写成 `![图说|inline](图片地址)`，`|` 后面的 `inline` / `big` / `wide`
决定图片跨栏宽度，图说会渲染成 figcaption。

**加完图记得跑一次 `pnpm images:probe`。** Markdown 不带图片尺寸，浏览器在图片
到达前不知道该留多大位置，图片一到就会把正文顶下去。这个命令会把每张图的真实
宽高探测出来存进 `content/image-sizes.json`（需要提交），构建时写进 `<img>` 的
width/height，浏览器就能先占好位。

命令只补新增的图；`--force` 重新探测全部。没入库的图片会退化成一个 16:10 的
静默占位框——不会跳版，但比例可能不准。

`app/(site)/archive/page.tsx` 的归档页按 `lib/site.ts` 里的 `ARCHIVE_TAGS` 分组，
新增分组主题时改那个数组。
