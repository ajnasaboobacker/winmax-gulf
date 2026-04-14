import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
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
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPost";
import SmartAutomation from "./pages/SmartAutomation";
import CollaborationAV from "./pages/CollaborationAV";
import SolarSolutions from "./pages/SolarSolutions";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import BlogDashboard from "./pages/admin/BlogDashboard";
import BlogPosts from "./pages/admin/BlogPosts";
import PostEditor from "./pages/admin/PostEditor";
import BlogCategories from "./pages/admin/BlogCategories";
import BlogTags from "./pages/admin/BlogTags";
import BlogUsers from "./pages/admin/BlogUsers";
import AuthorProfile from "./pages/admin/AuthorProfile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

import StructuredSchema from "./components/StructuredSchema";
import ScrollToHash from "./components/ScrollToHash";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToHash />
      <StructuredSchema />
      <GoogleAnalytics />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <Routes location={location} key={location.pathname}>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/pdlc" element={<PDLC />} />
            <Route path="/led-display" element={<LEDDisplay />} />
            <Route path="/dj-club-solutions" element={<DJClubSolutions />} />
            <Route path="/smart-automation" element={<SmartAutomation />} />
            <Route path="/collaboration-av" element={<CollaborationAV />} />
            <Route path="/solar-solutions" element={<SolarSolutions />} />
            <Route path="/lp" element={<LandingPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Blog routes */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            
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
              <Route path="posts/new" element={<PostEditor />} />
              <Route path="posts/:id" element={<PostEditor />} />
              <Route path="categories" element={<BlogCategories />} />
              <Route path="tags" element={<BlogTags />} />
              <Route path="profile" element={<AuthorProfile />} />
              <Route path="users" element={<ProtectedRoute requiredRole="admin"><BlogUsers /></ProtectedRoute>} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
