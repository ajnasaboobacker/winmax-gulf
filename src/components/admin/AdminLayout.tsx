import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  FolderOpen, 
  Tags, 
  Users, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, userRole, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const navItems = [
    { 
      to: "/admin/blog", 
      icon: LayoutDashboard, 
      label: "Dashboard",
      end: true
    },
    { 
      to: "/admin/blog/posts", 
      icon: FileText, 
      label: "Posts" 
    },
    { 
      to: "/admin/blog/categories", 
      icon: FolderOpen, 
      label: "Categories" 
    },
    { 
      to: "/admin/blog/tags", 
      icon: Tags, 
      label: "Tags" 
    },
    { 
      to: "/admin/blog/profile", 
      icon: UserCircle, 
      label: "My Profile" 
    },
  ];

  // Only show user management to admins
  if (userRole === "admin") {
    navItems.push({ 
      to: "/admin/blog/users", 
      icon: Users, 
      label: "Users" 
    });
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700">
        <h1 className="text-lg font-semibold text-white">Blog Admin</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-slate-700">
              <h1 className="text-xl font-bold text-white">Blog Admin</h1>
              <p className="text-sm text-slate-400 mt-1 capitalize">{userRole} Dashboard</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                  <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
                </NavLink>
              ))}
            </nav>

            {/* User section */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex items-center gap-3 px-4 py-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.email}
                  </p>
                  <p className="text-xs text-slate-400 capitalize">{userRole}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-h-screen lg:min-h-[calc(100vh)]">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
