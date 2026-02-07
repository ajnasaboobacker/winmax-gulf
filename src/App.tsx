import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import AdminLayout from "@/components/admin/AdminLayout";
import Index from "./pages/Index";
import PDLC from "./pages/PDLC";
import LEDDisplay from "./pages/LEDDisplay";
import DJClubSolutions from "./pages/DJClubSolutions";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import BlogDashboard from "./pages/admin/BlogDashboard";
import BlogPosts from "./pages/admin/BlogPosts";
import BlogCategories from "./pages/admin/BlogCategories";
import BlogTags from "./pages/admin/BlogTags";
import BlogUsers from "./pages/admin/BlogUsers";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <GoogleAnalytics />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/pdlc" element={<PDLC />} />
              <Route path="/led-display" element={<LEDDisplay />} />
              <Route path="/dj-club-solutions" element={<DJClubSolutions />} />
              <Route path="/lp" element={<LandingPage />} />
              
              {/* Admin login (public) */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Protected admin routes */}
              <Route
                path="/admin/blog"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<BlogDashboard />} />
                <Route path="posts" element={<BlogPosts />} />
                <Route path="categories" element={<BlogCategories />} />
                <Route path="tags" element={<BlogTags />} />
                <Route path="users" element={<ProtectedRoute requiredRole="admin"><BlogUsers /></ProtectedRoute>} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
