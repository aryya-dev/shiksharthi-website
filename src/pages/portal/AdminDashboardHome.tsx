import { Users, Upload, FileText, BarChart3 } from "lucide-react";
import DashboardCard from "@/components/DashboardCard";

export default function AdminDashboardHome() {
  return (
    <div className="space-y-10 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-navy">
          Admin Dashboard
        </h1>

        <div className="w-16 h-1 bg-gold rounded-full mt-2" />

        <p className="text-sm text-slate-600 mt-3 font-medium">
          Manage institute operations and student data
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
          title="Notes Uploaded"
          value="54 Files"
          subtitle="Across all subjects"
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
        <button className="px-5 py-2.5 bg-gold text-navy rounded-lg font-semibold shadow-md hover:bg-gold/90 transition duration-200">
          Manage Students
        </button>

        <button className="px-5 py-2.5 border border-navy text-navy rounded-lg font-semibold hover:bg-navy hover:text-white transition duration-200">
          Upload New Notes
        </button>
      </div>

    </div>
  );
}