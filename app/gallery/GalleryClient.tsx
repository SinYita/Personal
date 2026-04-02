"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  className: string;
};

const galleryItems: GalleryItem[] = [
  {
    src: "https://picsum.photos/seed/sinyita-gallery-1/1200/800",
    alt: "Landscape photograph with soft light",
    title: "Morning Light",
    caption: "Warm light and soft contrast.",
    className: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    src: "https://picsum.photos/seed/sinyita-gallery-2/800/1100",
    alt: "Vertical city photograph",
    title: "City Edge",
    caption: "Vertical frame with quiet movement.",
    className: "row-span-2 md:row-span-2",
  },
  {
    src: "https://picsum.photos/seed/sinyita-gallery-3/1000/700",
    alt: "Minimal still life photograph",
    title: "Still Frame",
    caption: "Muted tones and simple composition.",
    className: "col-span-2 md:col-span-2",
  },
  {
    src: "https://picsum.photos/seed/sinyita-gallery-4/900/900",
    alt: "Square portrait style photograph",
    title: "Portrait Study",
    caption: "Square crop for a tighter focus.",
    className: "row-span-2 md:row-span-2",
  },
  {
    src: "https://picsum.photos/seed/sinyita-gallery-5/1100/750",
    alt: "Warm indoor photograph",
    title: "Room Tone",
    caption: "A calmer frame with indoor texture.",
    className: "col-span-2 md:col-span-2",
  },
  {
    src: "https://picsum.photos/seed/sinyita-gallery-6/1000/650",
    alt: "Nature and shadow photograph",
    title: "Shadow Walk",
    caption: "Light and shadow moving across the frame.",
    className: "col-span-2 md:col-span-2",
  },
];

export default function GalleryClient() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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

  return (
    <div className="space-y-8 pb-20">
      <section className="space-y-4 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight uppercase text-center">Gallery</h1>
        <p className="text-base text-[var(--muted)] leading-relaxed text-center max-w-2xl mx-auto">
          A small collection of photographs. Click any image to open a preview, then use the arrow controls
          or keyboard keys to move through the set.
        </p>
      </section>

      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[140px] md:auto-rows-[170px] gap-4 md:gap-5 items-start">
          {galleryItems.map((item, index) => (
            <button
              key={item.src}
              type="button"
              onClick={() => open(index)}
              className={`group relative overflow-hidden rounded-2xl bg-[var(--code-bg)] border border-[var(--border)] ${item.className}`}
              aria-label={`Open ${item.title}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-left text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-xs text-white/80 mt-1">{item.caption}</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {activeItem && activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
              <motion.div
                className="relative w-full max-w-6xl overflow-hidden rounded-3xl bg-[var(--background)] border border-[var(--border)] shadow-2xl"
                initial={{ scale: 0.96, y: 18, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.96, y: 18, opacity: 0 }}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="grid lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.8fr)]">
                  <div className="relative bg-black flex items-center justify-center min-h-[55vh] lg:min-h-[78vh]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.img
                        key={activeItem.src}
                        src={activeItem.src}
                        alt={activeItem.alt}
                        className="max-h-[78vh] w-full object-contain"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                      />
                    </AnimatePresence>

                    <button
                      type="button"
                      onClick={() => goTo(activeIndex - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-4 py-3 text-white transition-colors hover:bg-black/60"
                      aria-label="Previous image"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo(activeIndex + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/40 px-4 py-3 text-white transition-colors hover:bg-black/60"
                      aria-label="Next image"
                    >
                      →
                    </button>
                  </div>

                  <div className="flex flex-col gap-6 p-6 md:p-8">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--muted)]">Preview</p>
                      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--foreground)]">{activeItem.title}</h2>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{activeItem.caption}</p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs font-semibold tracking-[0.28em] uppercase text-[var(--muted)]">Album</p>
                      <div className="grid grid-cols-4 gap-2">
                        {galleryItems.map((item, index) => (
                          <button
                            key={item.src}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={`overflow-hidden rounded-xl border transition-all ${
                              index === activeIndex
                                ? "border-[var(--accent)] ring-2 ring-[var(--accent)]/30"
                                : "border-[var(--border)] opacity-70 hover:opacity-100"
                            }`}
                            aria-label={`Switch to ${item.title}`}
                          >
                            <img src={item.src} alt={item.alt} className="h-16 w-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3">
                      <div className="text-sm text-[var(--muted)]">
                        {activeIndex + 1} / {galleryItems.length}
                      </div>
                      <button
                        type="button"
                        onClick={close}
                        className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
