import { Trophy, Star, Users, Medal } from "lucide-react";

const SSATScholarship = () => (
  <section id="ssat-scholarship" className="py-24 bg-[#0a1628] relative overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#eab308 1px, transparent 1px), linear-gradient(90deg, #eab308 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#eab308]/5 blur-3xl pointer-events-none" />
    </div>

    <div className="relative z-10 max-w-6xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold tracking-widest uppercase text-[#eab308]">
          Scholarship Structure
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
          Your Potential Deserves Recognition
        </h2>
        <p className="text-white/50 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
          SSAT rewards academic excellence. The top performers will receive scholarship
          opportunities to support their journey ahead.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

        {/* Top 10 - Primary/Hero card */}
        <div className="relative bg-gradient-to-br from-[#eab308] to-[#b8860b] rounded-3xl p-8 md:p-10 shadow-2xl shadow-[#eab308]/20 overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
          <div className="absolute top-4 right-4 opacity-10">
            <Trophy size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-black/20 rounded-xl flex items-center justify-center">
                <Trophy size={24} className="text-black" />
              </div>
              <div>
                <p className="text-black/60 text-xs font-semibold tracking-wider uppercase">Top 10 Students</p>
                <p className="text-black font-bold text-lg leading-tight">Special Recognition</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-black/60 text-sm mb-1">Scholarship Amount</p>
              <p className="text-5xl font-extrabold text-black tracking-tight">₹1,00,000</p>
            </div>

            <div className="space-y-2">
              {["Performance-based scholarship", "Top 10 rank holders only", "Merit-driven selection"].map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-black/80 text-sm">
                  <Star size={12} className="text-black/60 shrink-0" fill="currentColor" />
                  {pt}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top 100 card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:bg-white/8 hover:border-white/20 transition-all duration-300">
          <div className="absolute top-4 right-4 opacity-5">
            <Users size={120} className="text-white" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-[#eab308]/10 border border-[#eab308]/20 rounded-xl flex items-center justify-center">
                <Medal size={24} className="text-[#eab308]" />
              </div>
              <div>
                <p className="text-white/50 text-xs font-semibold tracking-wider uppercase">Top 100 Students</p>
                <p className="text-white font-bold text-lg leading-tight">Scholarship Opportunities</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-white/50 text-sm mb-1">Who qualifies</p>
              <p className="text-5xl font-extrabold text-white tracking-tight">Top 100</p>
            </div>

            <div className="space-y-2">
              {["Scholarship for top 100 performers", "Based on examination performance", "Details communicated by Shiksharthi"].map((pt, i) => (
                <div key={i} className="flex items-center gap-2 text-white/60 text-sm">
                  <Star size={12} className="text-[#eab308] shrink-0" fill="currentColor" />
                  {pt}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Note */}
      <p className="text-center text-white/30 text-xs mt-10 max-w-md mx-auto">
        Scholarship allocation and distribution criteria will be communicated by Shiksharthi Educational Institute.
        Selection is purely merit-based through the SSAT examination.
      </p>
    </div>
  </section>
);

export default SSATScholarship;
