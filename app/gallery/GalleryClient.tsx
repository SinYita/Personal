"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};

const galleryItems: GalleryItem[] = [
  {
    src: "https://picsum.photos/seed/sinyita-gallery-1/1200/800",
    alt: "Landscape photograph with soft light",
    title: "Morning Light",
    caption: "Warm light and soft contrast.",
  },
  {
    src: "https://picsum.photos/seed/sinyita-gallery-2/800/1100",
    alt: "Vertical city photograph",
    title: "City Edge",
    caption: "Vertical frame with quiet movement.",
  },
  {
    src: "https://picsum.photos/seed/sinyita-gallery-3/1000/700",
    alt: "Minimal still life photograph",
    title: "Still Frame",
    caption: "Muted tones and simple composition.",
  },
  {
    src: "https://picsum.photos/seed/sinyita-gallery-4/900/900",
    alt: "Square portrait style photograph",
    title: "Portrait Study",
    caption: "Square crop for a tighter focus.",
  },
  {
    src: "https://picsum.photos/seed/sinyita-gallery-5/1100/750",
    alt: "Warm indoor photograph",
    title: "Room Tone",
    caption: "A calmer frame with indoor texture.",
  },
  {
    src: "https://picsum.photos/seed/sinyita-gallery-6/1000/650",
    alt: "Nature and shadow photograph",
    title: "Shadow Walk",
    caption: "Light and shadow moving across the frame.",
  },
];

export default function GalleryClient() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const viewerRef = useRef<HTMLElement | null>(null);
  const activeItem = activeIndex === null ? null : galleryItems[activeIndex];

  const close = () => setActiveIndex(null);
  const open = (index: number) => setActiveIndex(index);
  const goTo = (nextIndex: number) => {
    const normalized = (nextIndex + galleryItems.length) % galleryItems.length;
    setActiveIndex(normalized);
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") goTo(activeIndex - 1);
      if (event.key === "ArrowRight") goTo(activeIndex + 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    viewerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeIndex]);

  return (
    <div className="space-y-8 pb-20">
      {activeItem === null ? (
        <section className="space-y-4 max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight uppercase text-center">Gallery</h1>
          <p className="text-base text-[var(--muted)] leading-relaxed text-center max-w-2xl mx-auto">
            A small collection of photographs. Click any image to open a preview, then use the arrow controls
            or keyboard keys to move through the set.
          </p>
        </section>
      ) : null}

      <AnimatePresence mode="wait" initial={false}>
        {activeItem && activeIndex !== null ? (
          <motion.section
            key="viewer"
            ref={viewerRef}
            className="mx-auto flex min-h-[calc(100vh-13rem)] w-full max-w-5xl flex-col justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                onClick={close}
                className="text-xs font-medium tracking-wider uppercase text-[var(--foreground)] transition-colors hover:text-[var(--muted)]"
                aria-label="Back to gallery grid"
              >
                Back
              </button>
            </div>

            <div className="flex min-h-[65vh] items-center justify-center">
              <motion.img
                key={activeItem.src}
                src={activeItem.src}
                alt={activeItem.alt}
                className="mx-auto h-[min(70vh,720px)] w-full object-contain"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
              />
            </div>

            <div className="mt-5 flex items-end justify-between gap-6">
              <div className="max-w-[70%] text-[var(--foreground)]">
                <p className="text-xs font-semibold tracking-[0.24em] uppercase">{activeItem.title}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{activeItem.caption}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{activeIndex + 1} / {galleryItems.length}</p>
              </div>

              <div className="flex items-center gap-4 text-[var(--foreground)] shrink-0">
                <button
                  type="button"
                  onClick={() => goTo(activeIndex - 1)}
                  className="text-xs font-medium tracking-wider uppercase transition-colors hover:text-[var(--muted)]"
                  aria-label="Previous image"
                >
                  Prev
                </button>
                <span className="text-[var(--muted)]">/</span>
                <button
                  type="button"
                  onClick={() => goTo(activeIndex + 1)}
                  className="text-xs font-medium tracking-wider uppercase transition-colors hover:text-[var(--muted)]"
                  aria-label="Next image"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5 items-start">
              {galleryItems.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => open(index)}
                  className="group relative w-full overflow-hidden rounded-2xl bg-[var(--code-bg)] border border-[var(--border)]"
                  aria-label={`Open ${item.title}`}
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-left text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs text-white/80 mt-1">{item.caption}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
