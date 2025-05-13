import { Outlet } from "react-router-dom";
import { DoctorPortalSidebar } from "./DoctorPortalSidebar";

export function DoctorPortalLayout() {
  return (
    <div className="flex h-screen">
      <DoctorPortalSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 