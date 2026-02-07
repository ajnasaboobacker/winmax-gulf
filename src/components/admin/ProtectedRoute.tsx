import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "editor" | "author";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, userRole, isLoading, hasAnyBlogRole, hasRole } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Logged in but no blog role
  if (!hasAnyBlogRole()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md p-8">
          <h1 className="text-2xl font-bold text-destructive mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access the admin dashboard. 
            Please contact an administrator to request access.
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="text-primary hover:underline"
          >
            Return to homepage
          </button>
        </div>
      </div>
    );
  }

  // Check specific role requirement
  if (requiredRole && !hasRole(requiredRole) && userRole !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md p-8">
          <h1 className="text-2xl font-bold text-destructive mb-4">Insufficient Permissions</h1>
          <p className="text-muted-foreground mb-6">
            You need {requiredRole} permissions to access this page.
          </p>
          <button
            onClick={() => window.location.href = "/admin/blog"}
            className="text-primary hover:underline"
          >
            Return to dashboard
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
