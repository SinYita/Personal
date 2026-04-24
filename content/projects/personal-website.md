---
id: personal-website
title: Personal Website
description: >-
  A personal website built with Next.js supporting Markdown, LaTeX math
  rendering, and charts. Integrates a blog, project showcase, and resume.
techStack:
  - Next.js
  - TypeScript
  - Tailwind CSS
  - KaTeX
  - Chart.js
tags:
  - Portfolio
  - Writing
  - App Router
github: 'https://github.com/SinYita/Personal'
demo: /
featured: true
date: 2024-01
---
## Overview

This project is my public engineering portfolio and long-form writing space. I rebuilt it around the App Router to keep pages statically generated while retaining a clean content workflow.

## What I Built

- Markdown-driven blog posts with frontmatter metadata.
- A project system with list and detail pages.
- Resume and profile content loaded from Markdown sources.
- Math rendering with KaTeX and syntax highlighting for technical writing.

## Engineering Notes

- Kept content in plain files to simplify maintenance and long-term portability.
- Used server-side file reads for content and passed typed props into client components.
- Designed routes to be static-export friendly for GitHub Pages deployment.

<!-- AUTO-GENERATED:README:START -->
## README (Synced)

Source: [SinYita/Personal](https://github.com/SinYita/Personal)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Sveltia CMS

This site now includes Sveltia CMS at `/admin`.

- Local dev URL: `http://localhost:3000/admin`
- Production URL: `https://sinyita.github.io/Personal/admin`

### Local editing

1. Start your Next.js app:

```bash
npm run dev
```

2. In another terminal, run the local backend:

```bash
npx decap-server
```

3. Open `/admin` and edit content collections:

- `posts` -> `content/posts/*.md`
- `projects` -> `content/projects/*.md`
- `resume` -> `content/resume.md`

### Notes for production auth (PKCE)

The CMS backend is configured for GitHub (`SinYita/Personal`) using PKCE auth.

To enable production login:

1. Create a GitHub OAuth App for this site.
2. Set the callback URL to `https://sinyita.github.io/Personal/admin/`.
3. Replace `REPLACE_WITH_YOUR_GITHUB_OAUTH_APP_ID` in `public/admin/config.yml` with your OAuth App Client ID.

The local editing flow still works with `npx decap-server`.
<!-- AUTO-GENERATED:README:END -->
