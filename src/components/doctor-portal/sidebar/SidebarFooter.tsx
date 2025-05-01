import React from "react";
import { Brain, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavItem } from "./NavItem";

interface SidebarFooterProps {
  onLogout: () => void;
  closeMenu: () => void;
}

export const SidebarFooter = ({ onLogout, closeMenu }: SidebarFooterProps) => {
  return (
    <div className="shrink-0 border-t bg-white">
      <div className="p-3">
        <NavItem
          to="/doctor/ai-assistant"
          icon={<Brain className="h-5 w-5" />}
          label="AI Assistant"
          badge="AI"
          onClick={closeMenu}
        />
        <Button
          variant="ghost"
          className="w-full justify-start text-navy-600 hover:bg-red-50 hover:text-red-700 mt-2"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
