---
title: "Next.js Full-Stack Development Best Practices"
date: "2024-02-20"
tags: ["Frontend", "Next.js", "TypeScript"]
excerpt: "Sharing experiences in full-stack development using Next.js in real projects, covering routing, data fetching, and performance optimization."
---

# Next.js Full-Stack Development Best Practices

Next.js is currently one of the most popular React frameworks, offering features like Server-Side Rendering (SSR), Static Site Generation (SSG), and API routes.

## Recommended Project Structure

```
my-app/
├── app/                  # App Router (Next.js 13+)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── (auth)/           # Route groups
│   └── api/              # API routes
├── components/           # Reusable components
├── lib/                  # Utility functions
├── content/              # Markdown contents
└── public/               # Static assets
```

## Data Fetching Strategies

### Server Components (Recommended)

```typescript
// app/posts/page.tsx
async function PostsPage() {
  // Fetch data directly on the server, no useEffect needed
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // ISR: Revalidate every hour
  }).then(r => r.json());

  return <PostList posts={posts} />;
}
```

### Client Components

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

## Performance Optimization Tips

### Image Optimization

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={630}
  priority  // Use priority for LCP images
  className="rounded-lg"
/>
```

### Dynamic Imports

```tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false, // Pure client component
});
```

## Metadata Management

Next.js 13+ provides a type-safe Metadata API:

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

## Summary

| Feature | Pages Router | App Router |
|---------|--------------|------------|
| Data Fetching | `getStaticProps` | Direct async/await |
| Layout | `_app.tsx` | `layout.tsx` |
| Streaming | Not Supported | Supported via Suspense |
| Server Components | Not Supported | Enabled by default |

It is highly recommended to fully adopt the **App Router** for new projects to enjoy a much cleaner development experience.
