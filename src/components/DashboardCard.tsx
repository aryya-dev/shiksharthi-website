import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  accent?: boolean;
}

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent,
}: DashboardCardProps) {
  const navigate = useNavigate();

  // Navigation mapping
  const handleClick = () => {
    switch (title) {
      case "Upcoming Test":
        navigate("/portal/tests");
        break;
      case "Latest Score":
        navigate("/portal/scores");
        break;
      case "New Notes":
        navigate("/portal/notes");
        break;
      case "Pending Assignments":
        navigate("/portal/assignments");
        break;
      default:
        break;
    }
  };

  // Only Pending Assignments should highlight value
  const isWarning = title === "Pending Assignments";

  return (
    <div
      onClick={handleClick}
      className={`
        relative bg-white p-6 rounded-2xl border border-slate-200
        transition-all duration-200 hover:shadow-xl hover:-translate-y-1
        cursor-pointer
        ${accent ? "border-l-4 border-gold shadow-[0_8px_24px_rgba(212,175,55,0.15)]" : ""}
      `}
    >
      <div className="flex items-start justify-between">
        
        {/* Text Section */}
        <div className="flex-1">
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            {title}
          </p>

          <p
            className={`mt-2 text-2xl font-bold ${
              isWarning ? "text-gold" : "text-navy"
            }`}
          >
            {value}
          </p>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-600 font-medium">
              {subtitle}
            </p>
          )}

          {/* Score Progress Bar (only for Latest Score) */}
          {title === "Latest Score" && (
            <div className="mt-4">
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-500"
                  style={{ width: "87%" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Icon Section */}
        <div
          className={`
            flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
            transition-all duration-200
            ${
              accent
                ? "bg-gold/10 text-gold"
                : "bg-slate-100 text-navy"
            }
          `}
        >
          <Icon className="h-5 w-5" />
        </div>

      </div>
    </div>
  );
}