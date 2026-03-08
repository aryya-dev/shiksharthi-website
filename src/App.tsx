import { Toaster } from "@/components/ui/sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "@/components/ScrollToTop";
import ScrollToTopButton from "@/components/ScrollToTopButton";

import MainLayout from "./layouts/MainLayout";
import PortalLayout from "./layouts/PortalLayout";

import Index from "./pages/Index";
import AchieversPage from "./pages/AchieversPage";
import NotFound from "./pages/NotFound";

// 🔐 Portal Core
import ProtectedRoute from "@/components/ProtectedRoute";
import PortalLogin from "./pages/portal/PortalLogin";

// 🎓 Student Pages
import DashboardHome from "./pages/portal/DashboardHome";
import PreviousPapersPage from "./pages/portal/PreviousPapersPage";
import TestSchedulePage from "./pages/portal/TestSchedulePage";
import ScoresPage from "./pages/portal/ScoresPage";

// 👨‍💼 Admin Pages
import AdminDashboard from "./pages/portal/AdminDashboard";
import ManageStudents from "./pages/portal/ManageStudents";
import UploadPapers from "./pages/portal/UploadPapers";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <ScrollToTop />
          <ScrollToTopButton />

          <Routes>

            {/* ================= PUBLIC WEBSITE ================= */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/achievers" element={<AchieversPage />} />
            </Route>

            {/* ================= LOGIN PAGE ================= */}
            <Route path="/portal" element={<PortalLogin />} />

            {/* ================= PROTECTED PORTAL ================= */}
            <Route
              path="/portal/*"
              element={
                <ProtectedRoute>
                  <PortalLayout />
                </ProtectedRoute>
              }
            >

              {/* -------- STUDENT ROUTES -------- */}

              <Route
                path="dashboard"
                element={
                  <ProtectedRoute allowedRole="student">
                    <DashboardHome />
                  </ProtectedRoute>
                }
              />

              <Route
                path="previous-papers"
                element={
                  <ProtectedRoute allowedRole="student">
                    <PreviousPapersPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="tests"
                element={
                  <ProtectedRoute allowedRole="student">
                    <TestSchedulePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="scores"
                element={
                  <ProtectedRoute allowedRole="student">
                    <ScoresPage />
                  </ProtectedRoute>
                }
              />

              {/* -------- ADMIN ROUTES -------- */}

              <Route
                path="admin-dashboard"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="manage-students"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <ManageStudents />
                  </ProtectedRoute>
                }
              />

              <Route
                path="upload-papers"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <UploadPapers />
                  </ProtectedRoute>
                }
              />

            </Route>

            {/* ================= 404 ================= */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

