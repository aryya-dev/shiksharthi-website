import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Trophy,
  ClipboardList,
  Users,
  Upload,
} from "lucide-react";

interface PortalSidebarProps {
  role: "admin" | "student";
}

const linkBase =
  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200";

export default function PortalSidebar({ role }: PortalSidebarProps) {
  return (
    <div className="space-y-2">

      {/* Common Dashboard */}
      <NavLink
        to="/portal/dashboard"
        className={({ isActive }) =>
          `${linkBase} ${
            isActive
              ? "bg-gold-400 text-navy-900 font-semibold"
              : "text-white hover:bg-white/10"
          }`
        }
      >
        <LayoutDashboard size={18} />
        Dashboard
      </NavLink>

      {/* STUDENT LINKS */}
      {role === "student" && (
        <>
          <NavLink
            to="/portal/previous-papers"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-gold-400 text-navy-900 font-semibold"
                  : "text-white hover:bg-white/10"
              }`
            }
          >
            <FileText size={18} />
            Question Papers
          </NavLink>

          <NavLink
            to="/portal/tests"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-gold-400 text-navy-900 font-semibold"
                  : "text-white hover:bg-white/10"
              }`
            }
          >
            <Calendar size={18} />
            Test Schedule
          </NavLink>

          <NavLink
            to="/portal/scores"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-gold-400 text-navy-900 font-semibold"
                  : "text-white hover:bg-white/10"
              }`
            }
          >
            <Trophy size={18} />
            Scores
          </NavLink>
        </>
      )}

      {/* ADMIN LINKS */}
      {role === "admin" && (
        <>
          <NavLink
            to="/portal/manage-students"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-gold-400 text-navy-900 font-semibold"
                  : "text-white hover:bg-white/10"
              }`
            }
          >
            <Users size={18} />
            Manage Students
          </NavLink>

          <NavLink
            to="/portal/upload-notes"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-gold-400 text-navy-900 font-semibold"
                  : "text-white hover:bg-white/10"
              }`
            }
          >
            <Upload size={18} />
            Upload Notes
          </NavLink>
        </>
      )}
    </div>
  );
}