
import React from "react";
import { Outlet } from "react-router-dom";
import { AdminPortalSidebar } from "@/components/admin-portal/AdminPortalSidebar";

const AdminPortal = () => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 md:block">
        <AdminPortalSidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPortal;
