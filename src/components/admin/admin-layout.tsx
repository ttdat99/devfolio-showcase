import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./admin-sidebar";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-[280px] lg:flex-col lg:fixed lg:inset-y-0">
        <AdminSidebar />
      </div>
      <main className="flex-1 lg:pl-[280px] overflow-y-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
