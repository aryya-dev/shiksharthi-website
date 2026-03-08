import { Users, Upload, FileText, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "@/components/DashboardCard";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Admin";

  return (
    <div className="space-y-10 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-navy">
          Welcome back, {name}
        </h1>

        <div className="w-16 h-1 bg-gold rounded-full mt-2" />

        <p className="text-sm text-slate-600 mt-3 font-medium">
          Manage institute operations and academic resources
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Students"
          value="128"
          subtitle="Active accounts"
          icon={Users}
          accent
        />

        <DashboardCard
  title="Papers Uploaded"
  value="54 Papers"
  subtitle="Mock & Periodic Tests"
  icon={FileText}
/>

        <DashboardCard
          title="Pending Uploads"
          value="3 Subjects"
          subtitle="Awaiting materials"
          icon={Upload}
        />

        <DashboardCard
          title="Engagement Rate"
          value="82%"
          subtitle="Weekly activity"
          icon={BarChart3}
          accent
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/portal/manage-students")}
          className="px-5 py-2.5 bg-gold text-navy rounded-lg font-semibold shadow-md hover:bg-gold/90 transition duration-200"
        >
          Manage Students
        </button>

        <button
          onClick={() => navigate("/portal/upload-papers")}
          className="px-5 py-2.5 border border-navy text-navy rounded-lg font-semibold hover:bg-navy hover:text-white transition duration-200"
        >
          Upload New Papers
        </button>
      </div>

    </div>
  );
}