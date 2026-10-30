import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Calendar, Sparkles, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const POPUP_DELAY_MS = 4500; // 4.5 seconds after page load

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
    if (location.pathname !== "/ssat") {
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
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closePopup}
          />

          {/* Popup Card — white card style matching AdmissionPopup */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="relative bg-white rounded-3xl shadow-2xl w-[90%] max-w-md overflow-hidden"
          >
            {/* Top accent banner */}
            <div className="relative bg-[#142850] px-8 pt-7 pb-5 overflow-hidden">
              {/* Subtle grid pattern */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: `linear-gradient(#eab308 1px, transparent 1px), linear-gradient(90deg, #eab308 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#eab308]/15 blur-3xl pointer-events-none" />

              {/* Close button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              {/* Badge */}
              <div className="relative flex items-center gap-1.5 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#eab308]/20 text-[#eab308] border border-[#eab308]/30">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#eab308] opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#eab308]" />
                  </span>
                  <Sparkles className="w-3 h-3" />
                  Registrations Open
                </span>
              </div>

              {/* Title */}
              <h3 className="relative text-2xl font-bold text-white leading-tight">
                SSAT <span className="text-[#eab308]">2026</span>
              </h3>
              <p className="relative text-white/60 text-sm mt-1">
                Shiksharthi Scholarship Admission Test
              </p>
            </div>

            {/* Card body */}
            <div className="px-8 py-6">
              <p className="text-slate-600 text-sm mb-5">
                Exclusively for Class 10 Science students aiming for JEE &amp; NEET excellence.
              </p>

              {/* Highlight cards */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eab308]/15 text-[#eab308]">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#142850]">Top 100 Scholarships</div>
                    <div className="text-xs text-slate-500">Top 10 win ₹1,00,000 rewards</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#142850]">Exam Dates</div>
                    <div className="text-xs text-slate-500">15 &amp; 22 November 2026 · Offline</div>
                  </div>
                </div>
              </div>

              {/* CTA buttons */}
              <button
                onClick={handleRegisterClick}
                className="w-full bg-[#eab308] hover:bg-[#d4a307] text-black font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                Register for SSAT
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={handleLearnMore}
                className="w-full mt-2.5 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-[#142850] font-medium py-3 rounded-xl transition-colors cursor-pointer"
              >
                Learn More
              </button>

              {/* Dismiss text */}
              <div className="mt-3 text-center">
                <button
                  type="button"
                  onClick={closePopup}
                  className="text-xs text-slate-400 hover:text-slate-600 transition-colors underline cursor-pointer"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SSATPopupModal;
