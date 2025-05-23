import { Outlet } from "react-router-dom";
import { AdminPortalSidebar } from "./AdminPortalSidebar";

export function AdminPortalLayout() {
  return (
    <div className="flex h-screen">
      <AdminPortalSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 