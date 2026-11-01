import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const POPUP_DELAY_MS = 3500; // 3.5 seconds after page load

const SSATPopupModal = () => {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Don't set a new timer if user already dismissed
    if (closed) return;

    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, POPUP_DELAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [closed]);

  const closePopup = useCallback(() => {
    setVisible(false);
    setClosed(true);
  }, []);

  // Escape key to close
  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, closePopup]);

  const handleRegisterClick = () => {
    closePopup();
    if (location.pathname === "/ssat") {
      document.getElementById("ssat-register")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/ssat");
    }
  };

  const handleLearnMore = () => {
    closePopup();
    if (location.pathname === "/ssat") {
      document.getElementById("ssat-about")?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/ssat");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#07111e]/65 backdrop-blur-sm"
            onClick={closePopup}
          />

          {/* Popup Card — Optimal comfortable mobile/desktop size */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.32 }}
            className="relative bg-white rounded-3xl shadow-2xl w-[94%] sm:w-full max-w-[480px] overflow-hidden border border-slate-100 z-10"
          >
            {/* Top accent banner */}
            <div className="relative bg-[#142850] px-6 sm:px-7 pt-6 pb-5 overflow-hidden">
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage: `linear-gradient(#eab308 1px, transparent 1px), linear-gradient(90deg, #eab308 1px, transparent 1px)`,
                  backgroundSize: "36px 36px",
                }}
              />
              {/* Gold Ambient Glow */}
              <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#eab308]/20 blur-2xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 z-20 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Top Row: Circular Students Image Frame + Title & Badge */}
              <div className="relative flex items-center gap-4">
                {/* Students Circular Frame */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full p-[2.5px] bg-gradient-to-tr from-[#eab308] via-amber-300 to-[#142850] shadow-xl">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
                      <img
                        src="/ssat-students.jpg"
                        alt="JEE & NEET Aspirants"
                        className="w-full h-full object-cover object-top scale-110"
                      />
                    </div>
                  </div>
                  {/* Floating Mini Stream Pill */}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#0a1628] border border-[#eab308]/50 text-[10px] font-black text-[#eab308] whitespace-nowrap shadow-lg tracking-wider">
                    JEE • NEET
                  </span>
                </div>

                {/* Title & Badge */}
                <div className="flex-1 min-w-0 pr-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#eab308]/20 text-[#eab308] border border-[#eab308]/35 mb-1.5 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#eab308] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#eab308]" />
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#eab308]" />
                    <span>Registrations Open</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight">
                    SSAT <span className="text-[#eab308]">2026</span>
                  </h3>
                </div>
              </div>

              {/* Full-width Subtitle Bar: Large, Clear Single Line with Highlighted Capitalized Initials */}
              <div className="relative mt-3.5 pt-3 border-t border-white/10">
                <p className="whitespace-nowrap text-center text-[13px] sm:text-[15px] font-semibold text-white/95 tracking-normal">
                  <span className="text-[#eab308] font-black text-[15px] sm:text-[17px]">S</span>hiksharthi{' '}
                  <span className="text-[#eab308] font-black text-[15px] sm:text-[17px]">S</span>cholarship{' '}
                  <span className="text-[#eab308] font-black text-[15px] sm:text-[17px]">A</span>dmission{' '}
                  <span className="text-[#eab308] font-black text-[15px] sm:text-[17px]">T</span>est
                </p>
              </div>
            </div>

            {/* Card body with Watermark SSAT Logo in Background */}
            <div className="relative px-6 sm:px-7 py-5 sm:py-6 bg-white overflow-hidden">
              {/* Perfectly Placed SSAT Logo Watermark Background (low opacity) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
                <img
                  src="/ssat-logo.jpg"
                  alt="SSAT Logo Background"
                  className="w-72 sm:w-84 object-contain opacity-[0.07] mix-blend-multiply scale-110 translate-y-2"
                />
              </div>

              {/* Foreground Content */}
              <div className="relative z-10">
                <p className="text-slate-700 text-sm sm:text-base font-semibold mb-4 leading-snug">
                  Exclusively for <span className="text-[#142850] font-black underline decoration-[#eab308] decoration-2 underline-offset-2">Class 10 Science</span> students aiming for JEE &amp; NEET excellence.
                </p>

                {/* Highlight cards - Clear & concise formal cards */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3.5 bg-slate-50/95 backdrop-blur-[2px] border border-slate-200/90 rounded-2xl p-3.5 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eab308]/20 text-[#ca8a04]">
                      <Trophy className="h-6 w-6 text-[#ca8a04]" />
                    </div>
                    <div>
                      <div className="text-base font-extrabold text-[#142850] leading-snug">
                        Top 100 Scholarships
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                        Top 10 rankers win <span className="font-extrabold text-slate-900">₹1,00,000</span> rewards
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 bg-slate-50/95 backdrop-blur-[2px] border border-slate-200/90 rounded-2xl p-3.5 shadow-sm">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-base font-extrabold text-[#142850] leading-snug">
                        Examination Dates
                      </div>
                      <div className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                        <span className="font-extrabold text-slate-900">15 &amp; 22 November 2026</span> • Offline
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA buttons */}
                <button
                  onClick={handleRegisterClick}
                  className="w-full bg-[#eab308] hover:bg-[#d4a307] text-slate-950 font-black py-3.5 px-5 rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer text-base sm:text-lg tracking-wide"
                >
                  <span>Register for SSAT</span>
                  <ArrowRight className="h-5 w-5" />
                </button>

                <button
                  onClick={handleLearnMore}
                  className="w-full mt-2.5 border-2 border-slate-200 hover:border-[#142850] text-[#142850] hover:bg-slate-50 font-bold py-2.5 sm:py-3 rounded-2xl transition-all cursor-pointer text-sm sm:text-base"
                >
                  Learn More
                </button>

                {/* Dismiss text */}
                <div className="mt-3 text-center">
                  <button
                    type="button"
                    onClick={closePopup}
                    className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors underline cursor-pointer"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SSATPopupModal;
