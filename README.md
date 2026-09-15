# Houkaijian Blog

一个用 Astro 和 Markdown 构建的静态个人博客，预期发布到 `blog.houkaijian.xyz`。

## 写文章

在 `src/content/posts/` 新建一个 `.md` 文件：

```md
---
title: 文章标题
description: 不超过 180 字的摘要。
pubDate: 2026-09-02
tags: [技术, 随笔]
draft: false
---

从这里开始写正文。
```

`draft: true` 的文章不会出现在生产站点中。

## 本地预览与发布

```bash
npm install
npm run dev
npm run build
```

将更改推送至已连接 Cloudflare Workers Builds 的 GitHub 仓库后，Cloudflare 会自动构建和发布。

## Cloudflare Workers Static Assets

本项目使用 Workers Static Assets 托管 Astro 生成的 `dist/` 文件；`wrangler.jsonc` 已声明资产目录，因此无需安装 `@astrojs/cloudflare` 或启用 SSR。

在 Cloudflare Workers Builds 中连接本仓库后使用：

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Version command: `npx wrangler versions upload`
- Root directory: `/`
- Build variable: `NODE_VERSION=24.13.0`

部署成功后，在 Worker 的 **Settings > Domains & Routes** 中添加 `blog.houkaijian.xyz`。不要修改现有主页的域名路由。

## Giscus 评论

1. 将博客仓库设为公开，并在 GitHub 仓库设置中启用 **Discussions**。
2. 安装 [giscus GitHub App](https://github.com/apps/giscus)。
3. 打开 [giscus.app](https://giscus.app/)，选择仓库与 Discussion 分类，复制页面提供的 `repo`、`repo-id`、`category`、`category-id`。
4. 复制 `.env.example` 为 `.env`，填入这四项；不要提交 `.env`。
5. 在 Cloudflare Worker 的 **Settings > Variables and Secrets** 中添加同名变量，然后重新部署。

未配置变量时，评论区域不会渲染，其他页面不受影响。
