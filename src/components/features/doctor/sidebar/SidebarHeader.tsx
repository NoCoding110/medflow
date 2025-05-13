
import React from "react";
import { User, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarHeaderProps {
  userName?: string;
  isMobile: boolean;
  onClose: () => void;
}

export const SidebarHeader = ({ userName, isMobile, onClose }: SidebarHeaderProps) => {
  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lightblue-100">
            <User className="h-5 w-5 text-lightblue-700" />
          </div>
          <div>
            <div className="font-medium text-navy-800">{userName || "Doctor"}</div>
            <div className="text-xs text-navy-500">Doctor Portal</div>
          </div>
        </div>
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-navy-600 hover:bg-lightblue-50 hover:text-lightblue-600"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
