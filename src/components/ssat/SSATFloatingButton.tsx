
import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function SSATFloatingButton() {
    return (
        <>
            <style>{`
        @keyframes ssatJump {
          0%, 85%, 100% {
            transform: translateY(0);
          }
          89% {
            transform: translateY(-12px);
          }
          93% {
            transform: translateY(0);
          }
          97% {
            transform: translateY(-5px);
          }
        }

        .ssat-floating-animation {
          animation: ssatJump 6s ease-in-out infinite;
        }

        .ssat-floating-animation:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .ssat-floating-animation {
            animation: none;
          }
        }
      `}</style>

            <Link
                to="/ssat"
                aria-label="Explore SSAT 2026 Scholarship Admission Test"
                title="Explore SSAT 2026"
                className="
          ssat-floating-animation
          fixed bottom-24 right-6 z-[100]
          h-[72px] w-[72px]
          rounded-full
          flex flex-col items-center justify-center
          border-[3px] border-white
          bg-gradient-to-br from-yellow-300 to-amber-500
          text-amber-950
          shadow-xl
          transition-transform duration-300
          hover:scale-110 hover:shadow-2xl
          cursor-pointer
        "
            >
                <GraduationCap className="h-6 w-6" />

                <span className="text-[15px] font-black leading-tight tracking-wide">
                    SSAT
                </span>

                <span className="text-[9px] font-bold tracking-widest">
                    2026
                </span>
            </Link>
        </>
    );
}
