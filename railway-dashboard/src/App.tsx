
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Stations from "./pages/Stations";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockAlerts } from "./utils/mockData";

const queryClient = new QueryClient();

const App = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Count unread alerts
  const unreadAlerts = mockAlerts.filter(alert => !alert.acknowledged).length;
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Close sidebar
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="h-screen flex flex-col">
            <Navbar toggleSidebar={toggleSidebar} unreadAlerts={unreadAlerts} />
            
            <div className="flex flex-1 pt-16 overflow-hidden">
              {/* Sidebar for desktop */}
              {!isMobile && (
                <Sidebar isOpen={true} onClose={closeSidebar} />
              )}
              
              {/* Mobile sidebar */}
              {isMobile && (
                <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
              )}
              
              {/* Main content */}
              <main className="flex-1 overflow-hidden">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/home" element={<Index />} />
                  <Route path="/stations" element={<Stations />} />
                  <Route path="/analytics" element={<Analytics />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
