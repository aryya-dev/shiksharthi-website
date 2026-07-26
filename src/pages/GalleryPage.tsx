import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import GallerySection from "@/components/GallerySection";

export default function GalleryPage() {
  const navigate = useNavigate();

  // Escape key to navigate back to Home when no modal is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !window.history.state?.lightboxOpen) {
        navigate("/");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-slate-50/60 min-h-screen text-slate-800 relative overflow-hidden"
    >
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#142850]/5 via-[#eab308]/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-40 -left-20 w-80 h-80 bg-[#142850]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-60 -right-20 w-80 h-80 bg-[#eab308]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Navigation Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-2 relative z-10">
        {/* Back to Home Button */}
        <div>
          <Link to="/">
            <button className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#142850] shadow-sm hover:shadow-md transition-all duration-300 hover:bg-[#142850] hover:text-white cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#142850]">
              <ArrowLeftCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#eab308] group-hover:text-white transition-colors" />
              <span>Back to Home</span>
            </button>
          </Link>
        </div>
      </div>

      {/* Main Infinite Scroll Gallery Section */}
      <GallerySection isPreview={false} showViewAllButton={false} />
    </motion.main>
  );
}
