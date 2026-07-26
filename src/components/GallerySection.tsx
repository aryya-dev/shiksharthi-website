import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
  1280: 3,
  768: 2,
  640: 2,
  480: 1,
};

export interface GallerySectionProps {
  isPreview?: boolean;
  limitPerCategory?: number;
  showViewAllButton?: boolean;
}

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  isLoaded: boolean;
  onImageLoad: (id: string | number) => void;
  onOpenLightbox: (index: number) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 22,
    },
  },
};

const GalleryCard = React.memo(function GalleryCard({
  item,
  index,
  isLoaded,
  onImageLoad,
  onOpenLightbox,
}: GalleryCardProps) {
  const imageSrc = item.type === "video" ? item.thumbnail || item.src : item.src;

  return (
    <motion.div variants={cardVariants} className="mb-4">
      <div
        onClick={() => onOpenLightbox(index)}
        tabIndex={0}
        role="button"
        aria-label={`Open media: ${item.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpenLightbox(index);
          }
        }}
        className="group relative rounded-2xl overflow-hidden bg-slate-200/80 shadow-sm hover:shadow-2xl hover:shadow-slate-400/20 hover:-translate-y-1.5 transition-all duration-300 transform-gpu cursor-zoom-in border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-[#142850] focus:ring-offset-2"
      >
        {/* Skeleton Shimmer Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-200 animate-pulse min-h-[220px] z-10 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full border-2 border-slate-300 border-t-[#142850] animate-spin opacity-40" />
          </div>
        )}

        <img
          src={imageSrc}
          alt={item.title}
          loading="lazy"
          decoding="async"
          onLoad={() => onImageLoad(item.id)}
          className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 transform-gpu ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#142850]/85 via-[#142850]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-[11px] font-semibold tracking-wider text-[#eab308] uppercase mb-1 block">
              {item.type === "video" ? "Video" : "Photo"}
            </span>
            <h3 className="text-white text-sm sm:text-base font-bold line-clamp-1">
              {item.title}
            </h3>
          </div>
          <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
            <Maximize2 className="h-4 w-4" />
          </div>
        </div>

        {/* Video Play Badge */}
        {item.type === "video" && (
          <>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 flex items-center justify-center z-10 pointer-events-none">
              <div className="h-12 w-12 rounded-full bg-white/90 text-[#142850] flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                <Play className="h-5 w-5 fill-[#142850] ml-0.5" />
              </div>
            </div>

            {item.duration && (
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 z-20">
                <Clock className="h-3 w-3 text-[#eab308]" />
                {item.duration}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
});

export default function GallerySection({
  isPreview = false,
  limitPerCategory = 8,
  showViewAllButton = true,
}: GallerySectionProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("our-classrooms");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Record<string | number, boolean>>({});
  const [visibleCount, setVisibleCount] = useState<number>(20);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Filter items by active category
  const allCategoryItems = useMemo(
    () => GALLERY_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  // Determine items to show
  const displayItems = useMemo(
    () => (isPreview ? allCategoryItems.slice(0, limitPerCategory) : allCategoryItems.slice(0, visibleCount)),
    [isPreview, allCategoryItems, limitPerCategory, visibleCount]
  );

  const hasMore = useMemo(
    () => !isPreview && visibleCount < allCategoryItems.length,
    [isPreview, visibleCount, allCategoryItems.length]
  );

  const activeLightboxItem =
    lightboxIndex !== null ? displayItems[lightboxIndex] ?? null : null;

  const handleImageLoad = useCallback((id: string | number) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  }, []);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    window.history.pushState({ lightboxOpen: true }, "");
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    if (window.history.state?.lightboxOpen) {
      window.history.back();
    }
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

  const handleCategoryChange = useCallback((category: GalleryCategory) => {
    setActiveCategory(category);
    setLightboxIndex(null);
    setVisibleCount(20);
  }, []);

  // Pinterest style infinite scroll via IntersectionObserver
  useEffect(() => {
    if (isPreview || !hasMore) return;

    const currentSentinel = sentinelRef.current;
    if (!currentSentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry && firstEntry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 20, allCategoryItems.length));
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0.1,
      }
    );

    observer.observe(currentSentinel);

    return () => {
      observer.disconnect();
    };
  }, [isPreview, hasMore, allCategoryItems.length]);

  // Handle phone physical/gesture back button (popstate event)
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handlePopState = () => {
      setLightboxIndex(null);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [lightboxIndex]);

  // Keyboard Navigation & Scroll Lock for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextLightbox();
      if (e.key === "ArrowLeft") prevLightbox();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, nextLightbox, prevLightbox]);

  // Touch Swipe for Mobile Lightbox
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartXRef.current === null) return;
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchStartXRef.current - touchEndX;

      if (diffX > 50) {
        nextLightbox();
      } else if (diffX < -50) {
        prevLightbox();
      }

      touchStartXRef.current = null;
    },
    [nextLightbox, prevLightbox]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
    exit: {
      opacity: 0,
      y: -12,
      transition: { duration: 0.25 },
    },
  };

  return (
    <motion.section
      id="gallery"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#eab308]/40 bg-[#eab308]/10 text-[#142850] text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="h-4 w-4 text-[#eab308]" />
            <span>Campus Visuals</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#142850] tracking-tight">
            Moments at Shiksharthi
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto mt-4 text-sm sm:text-base md:text-lg leading-relaxed">
            A glimpse into our state-of-the-art classrooms, interactive learning, annual functions, and energetic student activities.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div className="bg-slate-100/90 p-1.5 rounded-full border border-slate-200/70 shadow-inner flex flex-wrap justify-center gap-1 max-w-full">
            {GALLERY_CATEGORIES.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategoryChange(tab.id)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#142850]/20 ${
                    isActive ? "text-white" : "text-slate-600 hover:text-[#142850]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGalleryTab"
                      className="absolute inset-0 bg-[#142850] rounded-full shadow-md shadow-[#142850]/20"
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
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex -ml-4 w-auto"
              columnClassName="pl-4 bg-clip-padding"
            >
              {displayItems.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={index}
                  isLoaded={!!loadedImages[item.id]}
                  onImageLoad={handleImageLoad}
                  onOpenLightbox={openLightbox}
                />
              ))}
            </Masonry>
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {allCategoryItems.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300 my-8">
            <Layers className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No Media Available</h3>
            <p className="text-slate-500 text-sm mt-1">
              Photos for this category will be uploaded soon.
            </p>
          </div>
        )}

        {/* Pinterest Infinite Scroll Sentinel (Only for Full Gallery mode) */}
        {!isPreview && hasMore && (
          <div ref={sentinelRef} className="h-16 w-full flex items-center justify-center my-8">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-[#142850] animate-spin" />
              <span>Loading more moments...</span>
            </div>
          </div>
        )}

        {/* View Full Gallery CTA Button for Homepage Preview */}
        {isPreview && showViewAllButton && (
          <div className="text-center mt-16">
            <Link to="/gallery">
              <button className="px-8 py-3 rounded-xl border border-[#142850]/20 text-[#142850] font-semibold hover:bg-[#142850]/5 transition-all duration-300 cursor-pointer">
                View Full Gallery
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
              onTouchEnd={handleTouchEnd}
              role="dialog"
              aria-label="Media Lightbox"
              className="fixed inset-0 z-[100] bg-[#0f172a]/98 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 select-none"
            >
              {/* Top Counter Bar */}
              <div className="w-full max-w-7xl flex items-center justify-start z-[110] pt-2">
                <div className="text-white/90 text-xs sm:text-sm font-medium bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15">
                  <span className="text-[#eab308] font-bold">
                    {(lightboxIndex ?? 0) + 1}
                  </span>{" "}
                  <span className="text-white/60">/ {displayItems.length}</span>
                </div>
              </div>

              {/* Main Media Display */}
              <div className="relative w-full max-w-6xl flex-1 flex items-center justify-center my-4 overflow-hidden">
                {/* Navigation Left Arrow */}
                <button
                  onClick={prevLightbox}
                  aria-label="Previous Media"
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-[#eab308] hover:text-[#142850] active:scale-95 text-white flex items-center justify-center transition-all duration-200 border border-white/15 z-50 cursor-pointer shadow-lg"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                {/* Media Container with Cross (Close) Button on top-right of image */}
                <div className="relative max-w-full max-h-[75vh] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {activeLightboxItem.type === "image" ? (
                      <motion.img
                        key={activeLightboxItem.id}
                        initial={{ opacity: 0, scale: 0.92, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        src={activeLightboxItem.src}
                        alt={activeLightboxItem.title}
                        className="max-w-full max-h-[72vh] sm:max-h-[76vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                      />
                    ) : (
                      <motion.div
                        key={activeLightboxItem.id}
                        initial={{ opacity: 0, scale: 0.92, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10"
                      >
                        <video
                          controls
                          autoPlay
                          src={activeLightboxItem.src}
                          poster={activeLightboxItem.thumbnail}
                          className="w-full max-h-[75vh] object-contain"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Prominent Cross (Close) Button inside Top-Right Corner of Image */}
                  <button
                    onClick={closeLightbox}
                    aria-label="Close Lightbox"
                    className="absolute top-3 right-3 h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-black/60 backdrop-blur-md hover:bg-[#eab308] hover:text-[#142850] active:scale-90 text-white flex items-center justify-center transition-all duration-200 border border-white/20 shadow-2xl z-[80] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#eab308]"
                  >
                    <X className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>

                {/* Navigation Right Arrow */}
                <button
                  onClick={nextLightbox}
                  aria-label="Next Media"
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-[#eab308] hover:text-[#142850] active:scale-95 text-white flex items-center justify-center transition-all duration-200 border border-white/15 z-50 cursor-pointer shadow-lg"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>

              {/* Bottom Info Bar */}
              <div className="w-full max-w-2xl text-center px-4 py-2 z-50">
                <h3 className="text-white text-base sm:text-lg font-bold">
                  {activeLightboxItem.title}
                </h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.section>
  );
}
