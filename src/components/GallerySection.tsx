import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { Link } from "react-router-dom";
import {
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Clock,
  ArrowRight,
  Layers,
} from "lucide-react";
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  GalleryCategory,
  GalleryItem,
} from "@/data/galleryData";

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  768: 2,
  640: 2, // 2 columns on mobile as requested
};

export interface GallerySectionProps {
  isPreview?: boolean;
  limitPerCategory?: number;
  showViewAllButton?: boolean;
  showLoadMore?: boolean;
  initialBatchSize?: number;
}

export default function GallerySection({
  isPreview = false,
  limitPerCategory = 8,
  showViewAllButton = true,
  showLoadMore = false,
  initialBatchSize = 16,
}: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("our-classrooms");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string | number, boolean>>({});
  const [visibleLimit, setVisibleLimit] = useState<number>(initialBatchSize);

  // Filter items by active category
  const allCategoryItems = GALLERY_ITEMS.filter(
    (item) => item.category === activeCategory
  );

  // Apply preview limit or pagination limit
  const displayItems = isPreview
    ? allCategoryItems.slice(0, limitPerCategory)
    : allCategoryItems.slice(0, visibleLimit);

  const activeLightboxItem =
    lightboxIndex !== null ? displayItems[lightboxIndex] : null;

  const handleImageLoad = (id: string | number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const nextLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % displayItems.length;
    });
  }, [displayItems.length]);

  const prevLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + displayItems.length) % displayItems.length;
    });
  }, [displayItems.length]);

  // Keyboard navigation & lock scroll
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, nextLightbox, prevLightbox]);

  // Touch Swipe for Mobile Lightbox
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextLightbox();
    } else if (isRightSwipe) {
      prevLightbox();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleLoadMore = () => {
    setVisibleLimit((prev) => prev + initialBatchSize);
  };

  return (
    <section id="gallery" className="py-24 bg-[#f9fafb] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
            Moments at Shiksharthi
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-[#142850] mt-3">
            Campus Gallery
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto mt-4 text-base md:text-lg">
            A glimpse into our classrooms, celebrations, annual events and the vibrant student life at Shiksharthi.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#eab308]/40 bg-[#eab308]/10 text-[#142850] text-xs md:text-sm font-semibold">
            <Sparkles className="h-4 w-4 text-[#eab308]" />
            IMMERSIVE CAMPUS EXPERIENCE
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1.5 shadow-md border border-slate-200/80 flex flex-wrap gap-1 max-w-full">
            {GALLERY_CATEGORIES.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCategory(tab.id);
                    setLightboxIndex(null);
                    setVisibleLimit(initialBatchSize);
                  }}
                  className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-white" : "text-slate-600 hover:text-[#142850]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGalleryTab"
                      className="absolute inset-0 bg-[#142850] rounded-full shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex -ml-4 w-auto"
              columnClassName="pl-4 bg-clip-padding"
            >
              {displayItems.map((item, index) => {
                const isLoaded = loadedImages[item.id];
                const imageSrc = item.type === "video" ? (item.thumbnail || item.src) : item.src;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="mb-4"
                  >
                    <div
                      onClick={() => openLightbox(index)}
                      className="group relative rounded-2xl overflow-hidden bg-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform-gpu cursor-pointer"
                    >
                      {/* Skeleton loader overlay */}
                      {!isLoaded && (
                        <div className="absolute inset-0 bg-slate-200 animate-pulse min-h-[180px] z-10" />
                      )}

                      <img
                        src={imageSrc}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => handleImageLoad(item.id)}
                        className={`w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 transform-gpu ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                      />

                      {/* Video Overlay Indicator */}
                      {item.type === "video" && (
                        <>
                          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                            <div className="h-12 w-12 rounded-full bg-white/90 text-[#142850] flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                              <Play className="h-5 w-5 fill-[#142850] ml-0.5" />
                            </div>
                          </div>

                          {item.duration && (
                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 z-20">
                              <Clock className="h-3 w-3 text-[#eab308]" />
                              {item.duration}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </Masonry>
          </motion.div>
        </AnimatePresence>

        {/* Load More Button for Full Page Archive */}
        {!isPreview && showLoadMore && displayItems.length < allCategoryItems.length && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-xl border border-[#142850]/20 bg-white text-[#142850] font-semibold hover:bg-[#142850] hover:text-white transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md"
            >
              <Layers className="h-4 w-4 text-[#eab308]" />
              <span>Load More Media</span>
            </button>
          </div>
        )}

        {/* View Full Gallery CTA Button for Homepage Preview */}
        {isPreview && showViewAllButton && (
          <div className="text-center mt-16">
            <Link to="/gallery">
              <button className="px-8 py-3 rounded-xl border border-[#142850]/20 text-[#142850] font-semibold hover:bg-[#142850]/5 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md">
                <span>View Full Gallery</span>
                <ArrowRight className="h-4 w-4 text-[#eab308]" />
              </button>
            </Link>
          </div>
        )}

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {activeLightboxItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 select-none"
            >
              {/* Top Controls Bar */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-50">
                <div className="text-white/80 text-sm font-medium bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                  <span className="text-[#eab308] font-bold">
                    {(lightboxIndex ?? 0) + 1}
                  </span>{" "}
                  / {displayItems.length}
                </div>

                <button
                  onClick={closeLightbox}
                  aria-label="Close Lightbox"
                  className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200 border border-white/10 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Left Arrow */}
              <button
                onClick={prevLightbox}
                aria-label="Previous Media"
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-[#eab308] hover:text-black text-white flex items-center justify-center transition-all duration-200 border border-white/10 z-50 cursor-pointer"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Center Media Item */}
              <div className="max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center p-2 relative">
                {activeLightboxItem.type === "image" ? (
                  <motion.img
                    key={activeLightboxItem.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={activeLightboxItem.src}
                    alt={activeLightboxItem.title}
                    className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
                  />
                ) : (
                  <motion.div
                    key={activeLightboxItem.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl bg-black"
                  >
                    <video
                      controls
                      autoPlay
                      src={activeLightboxItem.src}
                      poster={activeLightboxItem.thumbnail}
                      className="w-full max-h-[80vh] object-contain"
                    />
                  </motion.div>
                )}
              </div>

              {/* Navigation Right Arrow */}
              <button
                onClick={nextLightbox}
                aria-label="Next Media"
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-[#eab308] hover:text-black text-white flex items-center justify-center transition-all duration-200 border border-white/10 z-50 cursor-pointer"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
