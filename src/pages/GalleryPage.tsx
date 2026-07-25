import { ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import GallerySection from "@/components/GallerySection";

export default function GalleryPage() {
  const navigate = useNavigate();

  return (
    <section className="bg-gray-50 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Back to Home Button */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-full border border-[#142850]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#142850] shadow-sm transition hover:bg-[#142850] hover:text-white cursor-pointer"
          >
            <ArrowLeftCircle className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Complete Masonry Gallery Archive */}
        <GallerySection
          isPreview={false}
          showViewAllButton={false}
          showLoadMore={true}
          initialBatchSize={16}
        />

      </div>
    </section>
  );
}
