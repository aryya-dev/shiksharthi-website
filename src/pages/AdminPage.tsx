import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  getAllRegistrations,
  deleteRegistration,
  clearAllRegistrations,
  downloadRegistrationsCSV,
  seedSampleRegistrations,
  SSATRegistrationRecord,
} from "@/lib/ssatDatabase";
import { printAdmitCardDocument } from "@/lib/admitCardPrint";
import {
  getFirebaseConfig,
  saveFirebaseConfig,
  clearFirebaseConfig,
  subscribeToRegistrationsFirebase,
  FirebaseConfig,
} from "@/lib/firebase";
import { toast } from "sonner";
import {
  Users,
  Search,
  Download,
  Trash2,
  RefreshCw,
  ExternalLink,
  Calendar,
  Building,
  GraduationCap,
  Phone,
  Mail,
  Copy,
  Check,
  Eye,
  X,
  FileSpreadsheet,
  AlertTriangle,
  ArrowLeft,
  Sparkles,
  Printer,
  ShieldCheck,
  Flame,
  Settings,
  Database,
} from "lucide-react";

const AdminPage = () => {
  const [registrations, setRegistrations] = useState<SSATRegistrationRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [boardFilter, setBoardFilter] = useState<string>("ALL");
  const [dateFilter, setDateFilter] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<"NEWEST" | "OLDEST" | "NAME">("NEWEST");
  const [selectedRecord, setSelectedRecord] = useState<SSATRegistrationRecord | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Firebase Cloud State
  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseConfig | null>(getFirebaseConfig());
  const [showFirebaseModal, setShowFirebaseModal] = useState(false);
  const [rawConfigInput, setRawConfigInput] = useState("");

  // Load registrations from local cache
  const loadData = () => {
    const data = getAllRegistrations();
    setRegistrations(data);
  };

  useEffect(() => {
    document.title = "Admin Dashboard | SSAT Registrations — Shiksharthi";
    loadData();

    // Set up real-time Firebase subscription if configured
    const config = getFirebaseConfig();
    if (config) {
      setFirebaseConfig(config);
      const unsub = subscribeToRegistrationsFirebase(
        (cloudRecords) => {
          if (cloudRecords && cloudRecords.length > 0) {
            setRegistrations(cloudRecords);
            localStorage.setItem("ssat_registrations", JSON.stringify(cloudRecords));
          }
        },
        (err) => {
          console.warn("Firebase real-time listener error:", err);
        }
      );

      return () => {
        if (unsub) unsub();
      };
    }
  }, []);

  // Filter and sort registrations
  const filteredRegistrations = useMemo(() => {
    return registrations
      .filter((record) => {
        // Search filter
        const query = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !query ||
          record.studentName.toLowerCase().includes(query) ||
          record.schoolName.toLowerCase().includes(query) ||
          record.regId.toLowerCase().includes(query) ||
          record.studentMobile.includes(query) ||
          record.parentMobile.includes(query) ||
          record.email.toLowerCase().includes(query);

        // Board filter
        const matchesBoard =
          boardFilter === "ALL" || record.board.toUpperCase() === boardFilter.toUpperCase();

        // Exam Date filter
        const matchesDate =
          dateFilter === "ALL" || record.examDate.includes(dateFilter);

        return matchesQuery && matchesBoard && matchesDate;
      })
      .sort((a, b) => {
        if (sortBy === "NEWEST") {
          return new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime();
        }
        if (sortBy === "OLDEST") {
          return new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime();
        }
        if (sortBy === "NAME") {
          return a.studentName.localeCompare(b.studentName);
        }
        return 0;
      });
  }, [registrations, searchQuery, boardFilter, dateFilter, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = registrations.length;
    const now = new Date();
    const todayCount = registrations.filter((r) => {
      const regDate = new Date(r.registeredAt);
      return (
        regDate.getDate() === now.getDate() &&
        regDate.getMonth() === now.getMonth() &&
        regDate.getFullYear() === now.getFullYear()
      );
    }).length;

    const cbseCount = registrations.filter((r) => r.board.toLowerCase().includes("cbse")).length;
    const icseCount = registrations.filter((r) => r.board.toLowerCase().includes("icse")).length;
    const wbCount = registrations.filter((r) => r.board.toLowerCase().includes("wb")).length;
    const date15Count = registrations.filter((r) => r.examDate.includes("15")).length;
    const date22Count = registrations.filter((r) => r.examDate.includes("22")).length;

    return { total, todayCount, cbseCount, icseCount, wbCount, date15Count, date22Count };
  }, [registrations]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success(`Copied: ${text}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (regId: string, studentName: string) => {
    if (window.confirm(`Delete registration for "${studentName}" (${regId})?`)) {
      deleteRegistration(regId);
      loadData();
      toast.info(`Deleted registration ${regId}`);
      if (selectedRecord?.regId === regId) {
        setSelectedRecord(null);
      }
    }
  };

  const handleClearAll = () => {
    clearAllRegistrations();
    loadData();
    setShowClearConfirm(false);
    setSelectedRecord(null);
    toast.success("All registrations have been cleared");
  };

  const handleSeedSamples = () => {
    seedSampleRegistrations();
    loadData();
    toast.success("Added 5 sample registrations for preview!");
  };

  const handleExportCSV = () => {
    if (registrations.length === 0) {
      toast.error("No registrations to export!");
      return;
    }
    downloadRegistrationsCSV();
    toast.success("CSV file downloaded successfully!");
  };

  const getBoardBadgeClass = (board: string) => {
    const b = board.toUpperCase();
    if (b.includes("CBSE")) return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800";
    if (b.includes("ICSE")) return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800";
    if (b.includes("WB")) return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800";
    return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800";
  };

  const parseFirebaseInput = (input: string): FirebaseConfig | null => {
    try {
      const parsed = JSON.parse(input);
      if (parsed.apiKey && parsed.projectId) return parsed;
    } catch {}

    const extract = (key: string) => {
      const match = input.match(new RegExp(`${key}\\s*:\\s*["']([^"']+)["']`));
      return match ? match[1] : "";
    };

    const apiKey = extract("apiKey");
    const projectId = extract("projectId");
    const authDomain = extract("authDomain") || (projectId ? `${projectId}.firebaseapp.com` : "");
    const storageBucket = extract("storageBucket") || (projectId ? `${projectId}.appspot.com` : "");
    const messagingSenderId = extract("messagingSenderId");
    const appId = extract("appId");

    if (apiKey && projectId) {
      return { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId };
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              title="Back to Shiksharthi Homepage"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Main Site
            </Link>
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-emerald-500 text-white flex items-center justify-center font-bold text-base shadow-sm">
                S
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                    Shiksharthi Admin
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live DB
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                  SSAT 2026 Registration Management
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Firebase Status & Connect Button */}
            {firebaseConfig ? (
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="hidden sm:inline">Firebase Live</span>
                </span>
                <button
                  onClick={() => setShowFirebaseModal(true)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                  title="Firebase Project Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowFirebaseModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 rounded-lg transition-colors animate-pulse"
                title="Connect Firebase Firestore for cloud persistence"
              >
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="hidden sm:inline">Connect Firebase</span>
              </button>
            )}

            <button
              onClick={loadData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title="Refresh Records"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              disabled={registrations.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-xs transition-colors"
              title="Export all rows to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <Link
              to="/ssat#ssat-register"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors border border-primary/30"
              title="Open public registration form"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open Form</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Firebase Cloud Notice Banner */}
        {!firebaseConfig && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 text-amber-600 fill-amber-500" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-950 dark:text-amber-200">
                  Firebase Cloud Database Not Connected Yet
                </h4>
                <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">
                  Currently running in offline cache mode. Connect your Firebase project so every student registration is permanently stored in Firestore across all devices in real time.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowFirebaseModal(true)}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shrink-0 transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 fill-white" />
              Connect Firebase
            </button>
          </div>
        )}

        {/* Top KPI Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
          {/* Card 1: Total */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Total Registered
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {stats.total}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">students</span>
            </div>
            <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              <span>+{stats.todayCount} registered today</span>
            </div>
          </div>

          {/* Card 2: Boards */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Board Split
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1 text-center">
              <div className="bg-slate-50 dark:bg-slate-800/60 py-1 rounded">
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400">{stats.cbseCount}</div>
                <div className="text-[10px] text-slate-500">CBSE</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 py-1 rounded">
                <div className="text-xs font-bold text-purple-600 dark:text-purple-400">{stats.icseCount}</div>
                <div className="text-[10px] text-slate-500">ICSE</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 py-1 rounded">
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{stats.wbCount}</div>
                <div className="text-[10px] text-slate-500">WB</div>
              </div>
            </div>
          </div>

          {/* Card 3: Exam Dates */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Exam Slot Preference
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1.5 text-center">
              <div className="bg-slate-50 dark:bg-slate-800/60 py-1 rounded">
                <div className="text-xs font-bold text-slate-900 dark:text-white">{stats.date15Count}</div>
                <div className="text-[10px] text-slate-500">15 Nov (Slot 1)</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 py-1 rounded">
                <div className="text-xs font-bold text-slate-900 dark:text-white">{stats.date22Count}</div>
                <div className="text-[10px] text-slate-500">22 Nov (Slot 2)</div>
              </div>
            </div>
          </div>

          {/* Card 4: Quick Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Database Tools
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={handleSeedSamples}
                className="flex-1 inline-flex items-center justify-center gap-1 text-[11px] font-semibold py-1.5 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md transition-colors"
                title="Add 5 demo students for testing"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                Add Demo Data
              </button>
              {registrations.length > 0 && (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="text-[11px] font-semibold py-1.5 px-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors border border-red-200 dark:border-red-900/50"
                  title="Clear all stored records"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Search & Filters Card */}
        <section className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by student name, school, Reg ID, phone..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary/40 focus:border-primary text-slate-900 dark:text-white placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Board filter */}
              <select
                value={boardFilter}
                onChange={(e) => setBoardFilter(e.target.value)}
                className="px-2.5 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/40"
              >
                <option value="ALL">All Boards</option>
                <option value="CBSE">CBSE</option>
                <option value="ICSE">ICSE</option>
                <option value="WB">WB Board</option>
                <option value="OTHER">Other Boards</option>
              </select>

              {/* Date filter */}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-2.5 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/40"
              >
                <option value="ALL">All Exam Dates</option>
                <option value="15">15 Nov 2026</option>
                <option value="22">22 Nov 2026</option>
              </select>

              {/* Sort by */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-primary/40"
              >
                <option value="NEWEST">Newest First</option>
                <option value="OLDEST">Oldest First</option>
                <option value="NAME">Student Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Results count & active query pill */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            <span>
              Showing <strong className="text-slate-900 dark:text-white">{filteredRegistrations.length}</strong> of{" "}
              {registrations.length} total registrations
            </span>
            {(searchQuery || boardFilter !== "ALL" || dateFilter !== "ALL") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setBoardFilter("ALL");
                  setDateFilter("ALL");
                }}
                className="text-primary hover:underline text-xs font-medium"
              >
                Reset filters
              </button>
            )}
          </div>
        </section>

        {/* Registrations Table */}
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          {filteredRegistrations.length === 0 ? (
            /* Empty State */
            <div className="p-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                <FileSpreadsheet className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                  {registrations.length === 0 ? "No SSAT Registrations Yet" : "No Matching Registrations Found"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                  {registrations.length === 0
                    ? "When students submit the registration form on the website, their full application will automatically appear here."
                    : "Try adjusting your search keywords or filter dropdowns to see results."}
                </p>
              </div>
              {registrations.length === 0 && (
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleSeedSamples}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Load Sample Registrations
                  </button>
                  <Link
                    to="/ssat#ssat-register"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open Live Form
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <th className="py-3 px-4"># / Reg ID</th>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Student & School</th>
                    <th className="py-3 px-4">Board</th>
                    <th className="py-3 px-4">Contact Numbers</th>
                    <th className="py-3 px-4">Exam Date</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {filteredRegistrations.map((record, index) => {
                    const regDate = new Date(record.registeredAt);
                    const formattedDate = isNaN(regDate.getTime())
                      ? "Recently"
                      : regDate.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        });
                    const formattedTime = isNaN(regDate.getTime())
                      ? ""
                      : regDate.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        });

                    return (
                      <tr
                        key={record.regId}
                        className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group"
                      >
                        {/* Reg ID */}
                        <td className="py-3 px-4 font-mono">
                          <button
                            onClick={() => handleCopy(record.regId, record.regId)}
                            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md font-semibold text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-primary/10 hover:text-primary transition-colors border border-slate-200 dark:border-slate-700"
                            title="Click to copy Reg ID"
                          >
                            <span>{record.regId}</span>
                            {copiedId === record.regId ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                            )}
                          </button>
                        </td>

                        {/* Date & Time */}
                        <td className="py-3 px-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
                          <div className="font-medium text-slate-700 dark:text-slate-300">{formattedDate}</div>
                          <div className="text-[10px] text-slate-400">{formattedTime}</div>
                        </td>

                        {/* Student Name & School */}
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>{record.studentName}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3 shrink-0 opacity-60" />
                            <span className="truncate max-w-[200px]" title={record.schoolName}>
                              {record.schoolName}
                            </span>
                          </div>
                        </td>

                        {/* Board */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-block px-2 py-0.5 text-[11px] font-semibold rounded-md border ${getBoardBadgeClass(
                              record.board
                            )}`}
                          >
                            {record.board}
                          </span>
                        </td>

                        {/* Contact Numbers */}
                        <td className="py-3 px-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                              <Phone className="w-3 h-3 text-primary shrink-0" />
                              <a
                                href={`tel:${record.studentMobile}`}
                                className="font-mono hover:text-primary hover:underline"
                                title="Call student"
                              >
                                {record.studentMobile}
                              </a>
                              <span className="text-[9px] uppercase px-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                Student
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                              <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                              <a
                                href={`tel:${record.parentMobile}`}
                                className="font-mono hover:text-emerald-600 hover:underline"
                                title="Call parent"
                              >
                                {record.parentMobile}
                              </a>
                              <span className="text-[9px] uppercase px-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                Parent
                              </span>
                            </div>
                            {record.email && (
                              <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                                <Mail className="w-3 h-3 shrink-0 opacity-60" />
                                <a
                                  href={`mailto:${record.email}`}
                                  className="truncate max-w-[170px] hover:text-primary hover:underline"
                                  title={record.email}
                                >
                                  {record.email}
                                </a>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Exam Date */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/60">
                            <Calendar className="w-3 h-3 text-amber-600" />
                            {record.examDate}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => printAdmitCardDocument(record)}
                              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                              title="Print 1-Page Official Admit Card (PDF)"
                            >
                              <Printer className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setSelectedRecord(record)}
                              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                              title="View full application dossier"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(record.regId, record.studentName)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Student Details Dossier Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    SSAT 2026 Student Dossier
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${getBoardBadgeClass(
                      selectedRecord.board
                    )}`}
                  >
                    {selectedRecord.board}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {selectedRecord.studentName}
                </h2>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dossier Fields */}
            <div className="space-y-3.5 text-xs">
              {/* Reg ID Box */}
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Registration ID</span>
                  <div className="font-mono text-base font-bold text-primary tracking-wide">
                    {selectedRecord.regId}
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(selectedRecord.regId, "modal-id")}
                  className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600 hover:bg-slate-50 flex items-center gap-1"
                >
                  {copiedId === "modal-id" ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  Copy
                </button>
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">School Name</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                    {selectedRecord.schoolName}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Selected Exam Date</span>
                  <p className="font-semibold text-amber-700 dark:text-amber-400 mt-0.5">
                    {selectedRecord.examDate}
                  </p>
                </div>
              </div>

              {/* Contacts */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Student Mobile</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    <a
                      href={`tel:${selectedRecord.studentMobile}`}
                      className="font-mono font-semibold text-slate-900 dark:text-white hover:text-primary"
                    >
                      {selectedRecord.studentMobile}
                    </a>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Parent Mobile</span>
                  <div className="mt-1 flex items-center gap-1.5">
                    <a
                      href={`tel:${selectedRecord.parentMobile}`}
                      className="font-mono font-semibold text-slate-900 dark:text-white hover:text-emerald-600"
                    >
                      {selectedRecord.parentMobile}
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Email Address</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {selectedRecord.email || "Not provided"}
                </p>
              </div>

              {/* Registration Timestamp */}
              <div className="p-3 rounded-lg bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Registration Timestamp</span>
                  <p className="font-medium text-slate-700 dark:text-slate-300 mt-0.5">
                    {new Date(selectedRecord.registeredAt).toLocaleString("en-IN", {
                      dateStyle: "full",
                      timeStyle: "medium",
                    })}
                  </p>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold rounded">
                  Consent Verified
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 no-print">
              <button
                onClick={() => {
                  printAdmitCardDocument(selectedRecord);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#142850] hover:bg-[#0f1f3d] rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Admit Card (1 Page PDF)
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelete(selectedRecord.regId, selectedRecord.studentName)}
                  className="px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 rounded-lg transition-opacity"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-red-200 dark:border-red-900/50 space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Clear All Registrations?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                This will delete all {registrations.length} registrations from localStorage. This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="flex-1 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Firebase Configuration Modal */}
      {showFirebaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                    Firebase Cloud Database (Firestore)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Real-time cloud database across all devices
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFirebaseModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {firebaseConfig ? (
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Connected to Firebase Project:
                  </div>
                  <div className="font-mono text-xs font-bold text-emerald-900 dark:text-emerald-200 pl-4">
                    {firebaseConfig.projectId}
                  </div>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 pl-4">
                    All registrations are syncing to Firestore in real-time. Any changes submitted by students will appear live.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to disconnect Firebase?")) {
                        clearFirebaseConfig();
                        setFirebaseConfig(null);
                        setShowFirebaseModal(false);
                        toast.info("Firebase disconnected.");
                      }
                    }}
                    className="text-xs font-medium text-red-600 hover:underline"
                  >
                    Disconnect Project
                  </button>
                  <button
                    onClick={() => setShowFirebaseModal(false)}
                    className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    Paste Firebase Configuration snippet or JSON:
                  </label>
                  <textarea
                    rows={6}
                    value={rawConfigInput}
                    onChange={(e) => setRawConfigInput(e.target.value)}
                    placeholder={`const firebaseConfig = {\n  apiKey: "AIzaSy...",\n  authDomain: "...",\n  projectId: "shiksharthi-ssat",\n  storageBucket: "...",\n  messagingSenderId: "...",\n  appId: "..."\n};`}
                    className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">How to get your Firebase config:</span>
                  <ol className="list-decimal list-inside space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                    <li>Go to <strong>console.firebase.google.com</strong> & open your project.</li>
                    <li>Create a <strong>Cloud Firestore</strong> database (in test mode).</li>
                    <li>Go to <strong>Project Settings → General → Your apps</strong> (Web).</li>
                    <li>Copy the <code>firebaseConfig</code> code snippet and paste it above!</li>
                  </ol>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setShowFirebaseModal(false)}
                    className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!rawConfigInput.trim()) {
                        toast.error("Please paste your Firebase config snippet or JSON");
                        return;
                      }
                      const parsed = parseFirebaseInput(rawConfigInput);
                      if (!parsed || !parsed.apiKey || !parsed.projectId) {
                        toast.error("Could not parse apiKey or projectId from the input. Please check the snippet.");
                        return;
                      }
                      saveFirebaseConfig(parsed);
                      toast.success(`Connected to Firebase Project "${parsed.projectId}"!`);
                      setShowFirebaseModal(false);
                    }}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm flex items-center gap-1.5"
                  >
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    Connect & Start Sync
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
