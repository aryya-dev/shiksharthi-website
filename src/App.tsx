import { Toaster } from "@/components/ui/sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollManager from "@/components/ScrollManager";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import SSATPopupModal from "@/components/SSATPopupModal";

import MainLayout from "./layouts/MainLayout";

import Index from "./pages/Index";
import AchieversPage from "./pages/AchieversPage";
import GalleryPage from "./pages/GalleryPage";
import SSATPage from "./pages/SSATPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <ScrollManager />
          <ScrollToTopButton />
          <SSATPopupModal />

          <Routes>

            {/* ================= PUBLIC WEBSITE ================= */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/achievers" element={<AchieversPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/ssat" element={<SSATPage />} />
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
