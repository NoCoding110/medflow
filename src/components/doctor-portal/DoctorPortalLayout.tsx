import { Outlet } from "react-router-dom";
import { SidebarContent } from "../features/doctor/sidebar/SidebarContent";

export function DoctorPortalLayout() {
  // Provide a no-op closeMenu for SidebarContent
  const closeMenu = () => {};
  return (
    <div className="flex h-screen">
      <aside className="w-72 h-full border-r bg-white">
        <SidebarContent closeMenu={closeMenu} />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 