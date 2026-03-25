---
title: "Next.js 全栈开发最佳实践"
date: "2024-02-20"
tags: ["前端", "Next.js", "TypeScript"]
excerpt: "分享在实际项目中使用 Next.js 进行全栈开发的经验，涵盖路由、数据获取、性能优化等方面。"
---

# Next.js 全栈开发最佳实践

Next.js 是目前最流行的 React 框架之一，提供了服务端渲染（SSR）、静态生成（SSG）和 API 路由等功能。

## 项目结构推荐

```
my-app/
├── app/                  # App Router (Next.js 13+)
│   ├── layout.tsx        # 根布局
│   ├── page.tsx          # 首页
│   ├── (auth)/           # 路由组
│   └── api/              # API 路由
├── components/           # 可复用组件
├── lib/                  # 工具函数
├── content/              # Markdown 内容
└── public/               # 静态资源
```

## 数据获取策略

### 服务端组件（推荐）

```typescript
// app/posts/page.tsx
async function PostsPage() {
  // 直接在服务端获取数据，无需 useEffect
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // ISR: 每小时重新验证
  }).then(r => r.json());

  return <PostList posts={posts} />;
}
```

### 客户端组件

```typescript
'use client';
import useSWR from 'swr';

function UserProfile({ id }: { id: string }) {
  const { data, error } = useSWR(`/api/users/${id}`, fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
  return <div>{data.name}</div>;
}
```

## 性能优化技巧

### 图片优化

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={630}
  priority  // LCP 图片使用 priority
  className="rounded-lg"
/>
```

### 动态导入

```tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // 纯客户端组件
});
```

## 元数据管理

Next.js 13+ 提供了类型安全的元数据 API：

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'My App',
  },
  description: 'A great application',
  openGraph: {
    images: [{ url: '/og-image.png' }],
  },
};
```

## 总结

| 特性 | Pages Router | App Router |
|------|-------------|------------|
| 数据获取 | `getStaticProps` | 直接 async/await |
| 布局 | `_app.tsx` | `layout.tsx` |
| 流式渲染 | 不支持 | 支持 Suspense |
| 服务端组件 | 不支持 | 默认开启 |

推荐新项目全面采用 **App Router**，享受更简洁的开发体验。
