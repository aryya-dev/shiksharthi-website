import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  BarChart3,
  ClipboardList,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Users,
  Upload,
} from "lucide-react";

export default function PortalLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const name = localStorage.getItem("name") || "User";
  const role = localStorage.getItem("role");
  const roll = localStorage.getItem("roll_number") || "";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/portal");
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // ================= STUDENT NAV =================
  const studentNav = [
    { title: "Dashboard", path: "/portal/dashboard", icon: LayoutDashboard },
    { title: "Previous Papers", path: "/portal/previous-papers", icon: FileText },
    { title: "Test Schedule", path: "/portal/tests", icon: Calendar },
    { title: "Scores", path: "/portal/scores", icon: BarChart3 },
  ];

  // ================= ADMIN NAV =================
  const adminNav = [
    { title: "Dashboard", path: "/portal/admin-dashboard", icon: LayoutDashboard },
    { title: "Manage Students", path: "/portal/manage-students", icon: Users },
    { title: "Upload Papers", path: "/portal/upload-papers", icon: Upload },
  ];

  const navItems = role === "admin" ? adminNav : studentNav;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0b1b35] transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <GraduationCap className="h-7 w-7 text-gold" />
          <div>
            <h1 className="text-lg font-bold text-white leading-tight">
              Shiksharthi
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-white/50">
              Academic Institute
            </p>
          </div>
          <button
            className="ml-auto lg:hidden text-white/70"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Section Title */}
        <div className="px-5 pt-6 pb-2 text-[11px] font-semibold uppercase tracking-widest text-gold/70">
          {role === "admin" ? "Administration" : "Student Panel"}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gold text-navy font-semibold shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`
              }
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <button
            className="lg:hidden text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <h2 className="hidden lg:block text-sm font-medium text-gray-500">
            {role === "admin" ? "Admin Portal" : "Welcome back"}
          </h2>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-800">
                {name}
              </p>
              {role !== "admin" && roll && (
                <p className="text-xs text-gray-500">
                  Roll: {roll}
                </p>
              )}
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-bold text-white">
              {initials}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}