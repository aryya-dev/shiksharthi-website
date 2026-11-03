import { Button } from "@/components/ui/button";
import {
  Calendar,
  Trophy,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const SSATHero = () => {
  const scrollToRegister = () => {
    document.getElementById("ssat-register")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToDetails = () => {
    document.getElementById("ssat-about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#060e1a] via-[#0a1628] to-[#0c1a30] pt-20 pb-12 sm:pt-24 sm:pb-16 lg:py-28">
      {/* Background ambient lighting and subtle grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#eab308]/40 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#eab308 1px, transparent 1px), linear-gradient(90deg, #eab308 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#eab308]/10 blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Announcement Banner - EMPHASIZE 1 LAKH FOR TOP 10 */}
        <div className="flex justify-center mb-5 sm:mb-7">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#eab308]/15 border border-[#eab308]/40 shadow-md backdrop-blur-md text-xs sm:text-sm font-bold text-white text-center">
            <span className="flex items-center gap-1 text-[#eab308]">
              <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#eab308] shrink-0" />
              <span className="uppercase tracking-wider">Top 10 Rankers:</span>
            </span>
            <span className="bg-[#eab308] text-slate-950 px-2 py-0.5 rounded-full font-black text-xs sm:text-sm">
              ₹1,00,000 Cash Reward
            </span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline text-white/80 font-medium">Top 100 Scholarships</span>
          </div>
        </div>

        {/* Content Grid: 1 Column on Mobile, 2 Columns on Desktop */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Content Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px] sm:text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#eab308] animate-ping shrink-0" />
              <span>Exclusively for Class 10 Science Students</span>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
                SSAT <span className="text-[#eab308]">2026</span>
              </h1>
              <h2 className="text-sm sm:text-base md:text-xl font-bold text-white/85">
                <span className="text-[#eab308]">S</span>hiksharthi{" "}
                <span className="text-[#eab308]">S</span>cholarship{" "}
                <span className="text-[#eab308]">A</span>dmission{" "}
                <span className="text-[#eab308]">T</span>est
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Step into Class 11 with confidence. Compete for{" "}
              <strong className="text-[#eab308] font-bold whitespace-nowrap">₹1 Lakh cash rewards</strong>{" "}
              and merit scholarships in exclusive{" "}
              <strong className="text-[#eab308] font-bold whitespace-nowrap">25-student batches</strong>{" "}
              for JEE &amp; NEET.
            </p>


            {/* Quick Highlights */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2">
              <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                <div className="text-[10px] sm:text-xs text-white/60">Top 10 Award</div>
                <div className="text-sm sm:text-base font-black text-[#eab308] mt-1">
                  ₹1 Lakh Cash
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center">
                <div className="text-[10px] sm:text-xs text-white/60">Exclusive Cohort</div>
                <div className="text-sm sm:text-base font-black text-sky-400 mt-1">
                  25 Students
                </div>
              </div>
            </div>

            {/* Prominent Exam Dates */}

            {/* Compact Exam Date Highlight */}
            <div className="mt-3 sm:mt-4 rounded-xl border border-[#eab308]/40 bg-[#eab308]/10 px-3 py-3 sm:px-4 sm:py-3.5">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[#eab308]" />
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#eab308]">
                  Examination Dates · November 2026
                </span>
              </div>

              <div className="flex items-center justify-center gap-3 sm:gap-6">
                <div className="text-center">
                  <span className="text-2xl sm:text-3xl font-black text-white">15</span>
                  <span className="text-xs sm:text-sm font-bold text-white/75 ml-1">November</span>
                </div>

                <div className="h-8 w-px bg-white/20" />

                <div className="text-center">
                  <span className="text-2xl sm:text-3xl font-black text-white">22</span>
                  <span className="text-xs sm:text-sm font-bold text-white/75 ml-1">November</span>
                </div>
              </div>

              <p className="text-center text-[10px] text-white/55 mt-1.5">
                Offline Examination
              </p>
            </div>



            {/* Actions - Big & Touch-friendly */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-3">
              <Button
                id="ssat-hero-register-btn"
                onClick={scrollToRegister}
                size="lg"
                className="w-full sm:w-auto bg-[#eab308] hover:bg-[#d4a307] text-slate-950 font-black text-sm sm:text-base px-7 py-5 sm:py-6 rounded-xl sm:rounded-2xl shadow-lg shadow-[#eab308]/20 transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Register for SSAT 2026</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button
                id="ssat-hero-explore-btn"
                variant="outline"
                size="lg"
                onClick={scrollToDetails}
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:border-white/40 font-bold text-sm sm:text-base px-6 py-5 sm:py-6 rounded-xl sm:rounded-2xl transition-all cursor-pointer bg-transparent"
              >
                Explore Batches &amp; Syllabus
              </Button>
            </div>
          </div>

          {/* Desktop-Only SSAT Logo Card (Hidden on Mobile) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center">
            <div className="relative w-full max-w-sm">
              {/* Subtle ambient aura */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#eab308]/25 via-blue-500/15 to-purple-500/15 rounded-3xl blur-xl opacity-70" />

              <div className="relative bg-[#0d1c33]/90 border border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center">
                <div className="w-full bg-white rounded-2xl p-6 shadow-inner flex items-center justify-center">
                  <img
                    src="/ssat-logo.jpg"
                    alt="SSAT Official Logo"
                    className="w-full max-w-[230px] h-auto object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="mt-5 w-full space-y-2 text-left">
                  <div className="flex items-center justify-between text-xs font-bold text-white/85 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[#eab308]">🏆 Top 10 Rankers</span>
                    <span className="text-white font-black">₹1,00,000 Cash</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-white/85 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-sky-400">👥 Micro-Batch Cap</span>
                    <span className="text-white font-black">25 Students Only</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-white/85 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-emerald-400">📅 Exam Dates</span>
                    <span className="text-white font-black">15 & 22 November 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: 4 Trust Metrics (Compact & Clean on Mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-8 sm:mt-10 lg:mt-14 pt-6 border-t border-white/10">
          <div className="text-center p-2 sm:p-3 bg-white/[0.02] sm:bg-transparent rounded-xl">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#eab308]">₹1,00,000</div>
            <div className="text-[11px] sm:text-xs text-white/70 font-medium mt-0.5">Top 10 Cash Award</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white/[0.02] sm:bg-transparent rounded-xl">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-white">Top 100</div>
            <div className="text-[11px] sm:text-xs text-white/70 font-medium mt-0.5">Scholarship Seats</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white/[0.02] sm:bg-transparent rounded-xl">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-sky-400">25 Limit</div>
            <div className="text-[11px] sm:text-xs text-white/70 font-medium mt-0.5">Students Per Batch</div>
          </div>
          <div className="text-center p-2 sm:p-3 bg-white/[0.02] sm:bg-transparent rounded-xl">
            <div className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-400">100%</div>
            <div className="text-[11px] sm:text-xs text-white/70 font-medium mt-0.5">Exam + Boards + Practical</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SSATHero;
