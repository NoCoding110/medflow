
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  onLogout: () => void;
  closeMenu: () => void;
}

export const SidebarFooter = ({ onLogout, closeMenu }: SidebarFooterProps) => {
  const location = useLocation();

  return (
    <div className="mt-auto p-4 border-t border-navy-700">
      <Link
        to="/admin/settings"
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all mb-2",
          location.pathname === "/admin/settings"
            ? "bg-navy-100 text-navy-800"
            : "text-white hover:bg-navy-700 hover:text-orange-400"
        )}
        onClick={closeMenu}
      >
        <Settings className="h-4 w-4" />
        <span className="text-sm">Settings</span>
      </Link>
      <Button
        variant="ghost"
        className="w-full justify-start text-beige-300 hover:bg-red-900/20 hover:text-red-300"
        onClick={onLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span className="text-sm">Sign Out</span>
      </Button>
    </div>
  );
};
