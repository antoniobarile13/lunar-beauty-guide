import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Today from "./pages/Today";
import Calendar from "./pages/Calendar";
import DayDetail from "./pages/DayDetail";
import CategoryOrder from "./pages/CategoryOrder";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import "@/lib/i18n";
import { useEffect } from "react";
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: 'default' });
      if (Capacitor.getPlatform() === 'android') {
        StatusBar.setBackgroundColor({ color: '#00000000' });
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Today />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/day/:date" element={<DayDetail />} />
              <Route path="/category-order" element={<CategoryOrder />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;