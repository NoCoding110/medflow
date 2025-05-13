
import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarHeaderProps {
  isMobile: boolean;
  onClose: () => void;
}

export const SidebarHeader = ({ isMobile, onClose }: SidebarHeaderProps) => {
  return (
    <div className="p-4 border-b border-navy-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-display font-semibold tracking-tight text-orange-400">Admin Portal</h2>
          <p className="text-xs text-lightblue-300">System Management</p>
        </div>
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-white hover:bg-navy-700 hover:text-orange-400"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
