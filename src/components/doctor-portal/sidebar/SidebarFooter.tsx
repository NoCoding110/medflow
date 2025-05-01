import React from "react";
import { Brain, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavItem } from "./NavItem";
import { Separator } from "@/components/ui/separator";

interface SidebarFooterProps {
  onLogout: () => void;
  closeMenu: () => void;
}

export const SidebarFooter = ({ onLogout, closeMenu }: SidebarFooterProps) => {
  return (
    <div className="shrink-0 border-t bg-white sticky bottom-0 w-full">
      <div className="p-3 space-y-1">
        <NavItem
          to="/doctor/ai-assistant"
          icon={<Brain className="h-5 w-5" />}
          label="AI Assistant"
          badge="AI"
          onClick={closeMenu}
        />
        <NavItem
          to="/doctor/settings"
          icon={<Settings className="h-5 w-5" />}
          label="Settings"
          onClick={closeMenu}
        />
        <Separator className="my-2" />
        <Button
          variant="ghost"
          className="w-full justify-start text-navy-600 hover:bg-red-50 hover:text-red-700"
          onClick={onLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};
