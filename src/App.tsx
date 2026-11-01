import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollManager from "@/components/ScrollManager";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SSATPopupModal from "@/components/SSATPopupModal";

import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";

const AchieversPage = lazy(() => import("./pages/AchieversPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const SSATPage = lazy(() => import("./pages/SSATPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />

        <BrowserRouter>
          <ScrollManager />
          <ScrollToTopButton />
          <SSATPopupModal />

          <Suspense fallback={<PageLoader />}>
            <Routes>

              {/* ================= PUBLIC WEBSITE ================= */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/achievers" element={<AchieversPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/ssat" element={<SSATPage />} />
              </Route>

              {/* ================= ADMIN DASHBOARD ================= */}
              <Route path="/admin" element={<AdminPage />} />

              {/* ================= 404 ================= */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </Suspense>
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
