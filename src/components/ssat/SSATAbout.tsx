import { useState } from "react";
import {
  Users,
  Award,
  Sparkles,
  Laptop,
  Stethoscope,
  CheckCircle2,
  GraduationCap,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";

const SSATAbout = () => {
  const [activeTrack, setActiveTrack] = useState<"jee" | "neet">("jee");

  return (
    <section id="ssat-about" className="py-12 sm:py-16 lg:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#eab308]/15 text-[#ca8a04] border border-[#eab308]/30 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ca8a04]" />
            Comprehensive Academic Model
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#142850] tracking-tight">
            One Admission. Complete Preparation.
          </h2>
          <p className="text-slate-600 text-xs sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
            Eliminate fragmented tuitions. Every student receives synchronized competitive coaching,
            full board syllabus, and laboratory practicals in one place.
          </p>
        </div>

        {/* High-Importance Feature Banner: 25 STUDENTS PER BATCH (Compact for Mobile) */}
        <div className="relative bg-gradient-to-r from-[#0a1628] via-[#10223d] to-[#142850] rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 text-white shadow-xl mb-8 sm:mb-12 border border-white/10 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(#eab308 1px, transparent 1px), linear-gradient(90deg, #eab308 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 sm:space-y-1.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eab308]/20 text-[#eab308] text-[10px] sm:text-xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" />
                <span>Strict Batch Ceiling</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                Small Batches of <span className="text-[#eab308]">25 Students</span> for JEE &amp; NEET
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-normal">
                No 100+ crowd factories. Strict cap of 25 students guarantees direct faculty access,
                active doubt-solving in class, and individual performance tracking.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl px-4 py-2 sm:p-4 border border-white/15 text-center shrink-0 min-w-[120px] sm:min-w-[140px]">
              <div className="text-2xl sm:text-4xl font-black text-[#eab308]">25</div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-300 font-bold">
                Max Capacity
              </div>
            </div>
          </div>
        </div>

        {/* Stream Combos Section */}
        <div className="mb-10 sm:mb-14">
          <div className="text-center mb-5 sm:mb-8">
            <h3 className="text-xl sm:text-3xl font-black text-[#142850]">
              Integrated 3-in-1 Curriculum Combos
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Zero conflict between School Boards and Competitive rank-building.
            </p>
          </div>

          {/* Mobile Interactive Tab Switcher (Fits in One Screen on Mobile) */}
          <div className="flex md:hidden justify-center mb-4">
            <div className="inline-flex p-1 bg-slate-200/90 rounded-xl border border-slate-300/80 w-full max-w-xs shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTrack("jee")}
                className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTrack === "jee"
                    ? "bg-[#142850] text-[#eab308] shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>JEE Combo</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTrack("neet")}
                className={`flex-1 py-2 px-3 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTrack === "neet"
                    ? "bg-[#142850] text-sky-400 shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5" />
                <span>NEET Combo</span>
              </button>
            </div>
          </div>

          {/* Cards Grid: Toggled on Mobile, Side-by-Side on Desktop */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* JEE Track Combo Card */}
            <div
              className={`relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-slate-200/90 hover:border-[#eab308] shadow-sm hover:shadow-lg transition-all flex flex-col justify-between ${
                activeTrack === "jee" ? "block" : "hidden md:flex"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center font-bold">
                      <Laptop className="w-5 h-5 text-[#ca8a04]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        Engineering Track
                      </span>
                      <h4 className="text-lg sm:text-2xl font-black text-[#142850]">JEE Integrated Combo</h4>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black bg-amber-100 text-amber-800">
                    3-in-1
                  </span>
                </div>

                <div className="space-y-2.5 mb-5">
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#142850]">
                        1. JEE (Main + Advanced) Syllabus
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-500">
                        In-depth conceptual problem solving, shortcuts &amp; simulated test series.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#142850]">
                        2. Complete Boards Syllabus
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-500">
                        Full CBSE &amp; ISC Board theory, numericals &amp; subjective answer writing.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#142850]">
                        3. Practical Lab Sessions
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-500">
                        Hands-on laboratory experiments, project files, and school viva prep.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1 text-[#142850]">
                  <Users className="w-3.5 h-3.5 text-[#eab308]" />
                  Max 25 Students / Batch
                </span>
                <span className="text-emerald-700 font-extrabold">Complete Package</span>
              </div>
            </div>

            {/* NEET Track Combo Card */}
            <div
              className={`relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-slate-200/90 hover:border-sky-500 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between ${
                activeTrack === "neet" ? "block" : "hidden md:flex"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-700 flex items-center justify-center font-bold">
                      <Stethoscope className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                        Medical Track
                      </span>
                      <h4 className="text-lg sm:text-2xl font-black text-[#142850]">NEET Integrated Combo</h4>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-black bg-sky-100 text-sky-800">
                    3-in-1
                  </span>
                </div>

                <div className="space-y-2.5 mb-5">
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#142850]">
                        1. NEET-UG Comprehensive Syllabus
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-500">
                        Line-by-line NCERT mastery, speed drills, and full-length exam simulations.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#142850]">
                        2. Complete Boards Syllabus
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-500">
                        Full CBSE &amp; ISC Board theory to secure 95%+ in Class 12 exams.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#142850]">
                        3. Practical Lab Sessions
                      </div>
                      <div className="text-[11px] sm:text-xs text-slate-500">
                        Biology, physics &amp; chemistry lab experiments with teacher demonstrations.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1 text-[#142850]">
                  <Users className="w-3.5 h-3.5 text-sky-600" />
                  Max 25 Students / Batch
                </span>
                <span className="text-emerald-700 font-extrabold">Complete Package</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Quick SSAT Benefits (Compact Cards) */}
        <div className="grid sm:grid-cols-3 gap-3.5 sm:gap-5">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-[#eab308]/15 text-amber-700 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#ca8a04]" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#142850]">₹1,00,000 for Top 10</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Direct ₹1 Lakh cash scholarship reward plus tuition fee waivers.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#142850]">Top 100 Scholarships</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Substantial merit-based fee waivers for top 100 qualifiers.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-sm flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <FlaskConical className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-[#142850]">Diagnostic Roadmap</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                Personalized concept analytics &amp; 1-on-1 faculty counseling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SSATAbout;
