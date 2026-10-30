import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";

const SSATHero = () => {
  const scrollToRegister = () => {
    document.getElementById("ssat-register")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToDetails = () => {
    document.getElementById("ssat-about")?.scrollIntoView({ behavior: "smooth" });
  };

  const badges = [
    { icon: Users, label: "For Class 10 Science Students" },
    { icon: Calendar, label: "15 Nov & 22 Nov 2026" },
    { icon: MapPin, label: "Offline Examination" },
    { icon: Trophy, label: "Scholarships for Top 100" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a1628]">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#eab308]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#eab308]/20 to-transparent" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#eab308 1px, transparent 1px), linear-gradient(90deg, #eab308 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#eab308]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-32 text-center">

        {/* Main heading */}
        <div className="space-y-2 mb-6">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white opacity-0 animate-fade-up leading-none"
            style={{ animationDelay: "0.15s" }}
          >
            SSAT
          </h1>
          <p
            className="text-[#eab308] text-base sm:text-lg md:text-xl font-semibold tracking-widest uppercase opacity-0 animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            2026
          </p>
        </div>

        {/* Full name */}
        <h2
          className="text-lg sm:text-xl md:text-2xl font-medium text-white/70 max-w-xl mx-auto mb-3 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          Shiksharthi Scholarship Admission Test
        </h2>

        {/* Tagline */}
        <p
          className="text-white/50 text-sm sm:text-base max-w-lg mx-auto mb-10 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          An opportunity to earn your place among the top 100 scholars.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          <Button
            id="ssat-hero-register-btn"
            onClick={scrollToRegister}
            size="lg"
            className="bg-[#eab308] hover:bg-[#d4a307] text-black font-bold text-base px-10 rounded-xl shadow-lg shadow-[#eab308]/20 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Register for SSAT
          </Button>
          <Button
            id="ssat-hero-explore-btn"
            variant="outline"
            size="lg"
            onClick={scrollToDetails}
            className="border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/40 font-semibold text-base px-10 rounded-xl transition-all duration-300 cursor-pointer bg-transparent"
          >
            Explore Examination Details
          </Button>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-10 bg-gradient-to-b from-white/0 to-white/60 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default SSATHero;
