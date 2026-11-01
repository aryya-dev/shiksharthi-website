import { Trophy, Star, Users, Medal, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SSATScholarship = () => {
  const scrollToRegister = () => {
    document.getElementById("ssat-register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="ssat-scholarship" className="py-24 bg-[#0a1628] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#eab308 1px, transparent 1px), linear-gradient(90deg, #eab308 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#eab308]/5 blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#eab308] bg-[#eab308]/10 px-3.5 py-1.5 rounded-full border border-[#eab308]/30">
            Scholarship Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-4 tracking-tight">
            Recognizing Excellence. Rewarding Talent.
          </h2>
          <p className="text-white/60 mt-3 text-base sm:text-lg leading-relaxed">
            SSAT ensures that financial constraints never hinder brilliant students from accessing
            India&apos;s finest mentorship.
          </p>
        </div>

        {/* 2 Primary Scholarship Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-14">
          {/* Top 10 Hero Gold Card */}
          <div className="relative bg-gradient-to-br from-[#eab308] via-amber-500 to-[#ca8a04] rounded-3xl p-8 sm:p-10 shadow-2xl shadow-[#eab308]/25 overflow-hidden flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute top-4 right-4 opacity-15 pointer-events-none">
              <Trophy size={140} className="text-black" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/15 text-black text-xs font-black uppercase tracking-wider mb-6">
                <Star size={14} fill="currentColor" />
                <span>Premier Laureates</span>
              </div>

              <div className="mb-6">
                <p className="text-black/70 text-xs font-bold uppercase tracking-wider">
                  Top 10 Performers
                </p>
                <div className="text-5xl sm:text-6xl font-black text-black tracking-tight mt-1">
                  ₹1,00,000
                </div>
                <p className="text-black/80 font-bold text-sm mt-1">
                  Direct Cash Scholarship Reward
                </p>
              </div>

              <div className="space-y-3 border-t border-black/15 pt-5">
                {[
                  "₹1,00,000 Direct Cash Scholarship",
                  "100% Tuition Fee Waiver for 2 Years",
                  "Guaranteed seat in 25-Student Super Batch",
                  "JEE/NEET + Boards + Practical Complete Combo",
                  "Direct 1-on-1 Senior Faculty Mentorship",
                ].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-black font-semibold text-sm">
                    <CheckCircle2 size={16} className="text-black shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-4 border-t border-black/15 text-xs text-black/70 font-bold">
              Purely performance-based merit selection
            </div>
          </div>

          {/* Top 100 Platinum Card */}
          <div className="relative bg-white/5 border border-white/15 rounded-3xl p-8 sm:p-10 backdrop-blur-md overflow-hidden flex flex-col justify-between group hover:bg-white/10 hover:border-white/25 transition-all duration-300">
            <div className="absolute top-4 right-4 opacity-5 pointer-events-none">
              <Users size={140} className="text-white" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#eab308] text-xs font-black uppercase tracking-wider mb-6 border border-white/10">
                <Medal size={14} />
                <span>Merit Scholars</span>
              </div>

              <div className="mb-6">
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider">
                  Top 100 Performers
                </p>
                <div className="text-5xl sm:text-6xl font-black text-white tracking-tight mt-1">
                  Top 100
                </div>
                <p className="text-[#eab308] font-bold text-sm mt-1">
                  Substantial Tuition Fee Waivers
                </p>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-5">
                {[
                  "Tiered Tuition Waivers based on SSAT Rank",
                  "Priority enrollment in 25-Student Micro Batches",
                  "Full JEE/NEET + Board + Practical Combo",
                  "Complete study modules & test series included",
                  "Personalized academic SWOT diagnostic report",
                ].map((pt, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-white/80 font-medium text-sm">
                    <Star size={16} className="text-[#eab308] shrink-0" fill="currentColor" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-8 pt-4 border-t border-white/10 text-xs text-white/50">
              Transparent evaluation across accredited exam centers
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-3xl p-6 sm:p-8 border border-white/15 text-center flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-extrabold text-white">
              Ready to Claim Your Scholarship &amp; 25-Student Batch Seat?
            </h4>
            <p className="text-white/60 text-sm mt-1">
              Offline examination on 15 &amp; 22 November 2026. Limited test seats.
            </p>
          </div>
          <Button
            onClick={scrollToRegister}
            size="lg"
            className="bg-[#eab308] hover:bg-[#d4a307] text-slate-950 font-black px-7 py-6 rounded-2xl shadow-lg shadow-[#eab308]/20 transition-all hover:scale-105 shrink-0 cursor-pointer"
          >
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SSATScholarship;
