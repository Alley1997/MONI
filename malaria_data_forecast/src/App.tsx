import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import ClimateData from "./pages/ClimateData";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* REMOVE BrowserRouter here */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/climate-data" element={<ClimateData />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
