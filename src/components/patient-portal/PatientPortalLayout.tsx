import { Outlet } from "react-router-dom";
import { PatientPortalSidebar } from "./PatientPortalSidebar";

export function PatientPortalLayout() {
  return (
    <div className="flex h-screen">
      <PatientPortalSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 