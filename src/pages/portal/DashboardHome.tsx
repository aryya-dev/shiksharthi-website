import { Calendar, BarChart3, FileText, ClipboardList } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";
import { useNavigate } from "react-router-dom";

const recentNotes = [
  { subject: "Physics", title: "Electromagnetism – Chapter 4 Notes", date: "Feb 22, 2026" },
  { subject: "Chemistry", title: "Organic Chemistry – Alcohols & Phenols", date: "Feb 20, 2026" },
  { subject: "Maths", title: "Differential Equations Practice Set", date: "Feb 18, 2026" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-10 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-navy">
          Dashboard
        </h1>

        <div className="w-16 h-1 bg-gold rounded-full mt-2" />

        <p className="text-sm text-slate-600 mt-3 font-medium">
          Your academic overview at a glance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Upcoming Test"
          value="Physics Unit 5"
          subtitle="March 1, 2026"
          icon={Calendar}
          accent
        />

        <DashboardCard
          title="Latest Score"
          value="87 / 100"
          subtitle="Chemistry – Organic"
          icon={BarChart3}
        />

        <DashboardCard
          title="NEW PAPERS"
value="3 Uploaded"
subtitle="Mock & Periodic"
          icon={FileText}
        />

        <DashboardCard
          title="Pending Assignments"
          value="2 Due"
          subtitle="Next 7 days"
          icon={ClipboardList}
          accent
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <button
  onClick={() => navigate("/portal/previous-papers")}
  className="px-6 py-2.5 bg-gold text-navy rounded-lg font-semibold shadow-md hover:scale-105 hover:bg-gold/90 transition-all duration-200"
>
  View All Papers
</button>

        <button className="px-5 py-2.5 border border-navy text-navy rounded-lg font-semibold hover:bg-navy hover:text-white transition duration-200">
          View Test Schedule
        </button>
      </div>

      {/* Recent Notes */}
      <div>
        <h2 className="font-display text-xl font-semibold text-navy mb-6">
          Recently Uploaded Papers
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recentNotes.map((note) => (
            <div
              key={note.title}
              className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-navy text-white">
                {note.subject}
              </span>

              <h3 className="mt-4 text-sm font-semibold text-slate-800 leading-snug">
                {note.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {note.date}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}