import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Code2, Briefcase, Settings, LogOut } from "lucide-react";
import { useAdminAuth } from "@/contexts/admin-auth-context";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/admin/management", icon: LayoutDashboard, end: true },
  { label: "Skills", to: "/admin/management/skills", icon: Code2, end: false },
  { label: "Work", to: "/admin/management/work", icon: Briefcase, end: false },
  { label: "Settings", to: "/admin/management/settings", icon: Settings, end: false },
];

export function AdminSidebar() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/admin/login", { replace: true });
  }

  return (
    <aside className="flex flex-col h-full bg-card border-r">
      <div className="p-6">
        <h1 className="text-lg font-semibold tracking-tight">Admin Management</h1>
      </div>
      <Separator />
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              )
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
      <Separator />
      <div className="p-3">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
