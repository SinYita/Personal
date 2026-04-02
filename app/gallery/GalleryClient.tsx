"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

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
  const [mounted, setMounted] = useState(false);
  const activeItem = activeIndex === null ? null : galleryItems[activeIndex];

  const close = () => setActiveIndex(null);
  const open = (index: number) => setActiveIndex(index);
  const goTo = (nextIndex: number) => {
    const normalized = (nextIndex + galleryItems.length) % galleryItems.length;
    setActiveIndex(normalized);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (!mounted) return;
    const previousOverflow = document.body.style.overflow;

    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeIndex, mounted]);

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

      {mounted
        ? createPortal(
            <AnimatePresence>
              {activeItem && activeIndex !== null && (
                <motion.div
                  className="fixed inset-0 z-[9999] bg-black/92"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={close}
                >
                  <div className="absolute inset-0" onClick={(event) => event.stopPropagation()}>
                    <div className="relative h-full w-full">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.img
                          key={activeItem.src}
                          src={activeItem.src}
                          alt={activeItem.alt}
                          className="h-full w-full object-contain"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.24, ease: "easeOut" }}
                        />
                      </AnimatePresence>

                      <button
                        type="button"
                        onClick={close}
                        className="absolute right-5 top-5 rounded-full border border-white/30 bg-black/40 px-3 py-1.5 text-xs font-medium tracking-wider text-white transition-colors hover:bg-black/60"
                        aria-label="Close preview"
                      >
                        CLOSE
                      </button>

                      <div className="absolute bottom-5 right-5 flex items-center gap-4 text-white/90">
                        <button
                          type="button"
                          onClick={() => goTo(activeIndex - 1)}
                          className="text-xs font-medium tracking-wider uppercase transition-colors hover:text-white"
                          aria-label="Previous image"
                        >
                          Prev
                        </button>
                        <span className="text-white/50">/</span>
                        <button
                          type="button"
                          onClick={() => goTo(activeIndex + 1)}
                          className="text-xs font-medium tracking-wider uppercase transition-colors hover:text-white"
                          aria-label="Next image"
                        >
                          Next
                        </button>
                      </div>

                      <div className="absolute bottom-5 left-5 max-w-[70vw] text-white/80">
                        <p className="text-xs font-semibold tracking-[0.24em] uppercase">{activeItem.title}</p>
                        <p className="mt-1 text-xs text-white/65">{activeIndex + 1} / {galleryItems.length}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )
        : null}
    </div>
  );
}
