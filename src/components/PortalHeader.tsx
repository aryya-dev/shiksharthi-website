import { NavLink, useNavigate } from "react-router-dom";

export default function PortalHeader() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name") || "User";
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/portal");
  };

  return (
    <div className="bg-slate-100 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4">

        {/* Top Section */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-[#142850]">
            {role === "admin" ? "Admin Portal" : "Student Portal"}
          </h1>

          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-700 font-medium">
              Welcome, <span className="text-[#142850]">{name}</span>
            </div>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-6 text-sm font-medium">

          {role !== "admin" && (
            <>
              <NavLink
                to="/portal/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#eab308]"
                    : "text-slate-600 hover:text-[#142850]"
                }
              >
                Dashboard
              </NavLink>

              <NavLink
  to="/portal/previous-papers"
  className={({ isActive }) =>
    isActive
      ? "text-[#eab308]"
      : "text-slate-600 hover:text-[#142850]"
  }
>
  Previous Papers
</NavLink>

              <NavLink
                to="/portal/tests"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#eab308]"
                    : "text-slate-600 hover:text-[#142850]"
                }
              >
                Test Schedule
              </NavLink>

              <NavLink
                to="/portal/scores"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#eab308]"
                    : "text-slate-600 hover:text-[#142850]"
                }
              >
                Scores
              </NavLink>

              <NavLink
                to="/portal/assignments"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#eab308]"
                    : "text-slate-600 hover:text-[#142850]"
                }
              >
                Assignments
              </NavLink>
            </>
          )}

          {role === "admin" && (
            <NavLink
              to="/portal/admin-dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-[#eab308]"
                  : "text-slate-600 hover:text-[#142850]"
              }
            >
              Admin Dashboard
            </NavLink>
          )}

        </div>
      </div>
    </div>
  );
}