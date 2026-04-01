---
id: personal-website
title: Personal Website
description: A personal website built with Next.js supporting Markdown, LaTeX math rendering, and charts. Integrates a blog, project showcase, and resume.
techStack: [Next.js, TypeScript, Tailwind CSS, KaTeX, Chart.js]
github: https://github.com/SinYita/Personal
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
