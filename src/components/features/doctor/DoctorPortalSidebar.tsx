
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarContent } from "./sidebar/SidebarContent";
import { SidebarFooter } from "./sidebar/SidebarFooter";

export const DoctorPortalSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMenu = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <SidebarHeader 
        userName={user?.name} 
        isMobile={isMobile} 
        onClose={() => setOpen(false)} 
      />
      <SidebarContent closeMenu={closeMenu} />
      <SidebarFooter onLogout={handleLogout} closeMenu={closeMenu} />
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="h-16 flex items-center justify-between px-4 border-b bg-white">
          <div className="flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-navy-600 hover:bg-lightblue-50 hover:text-lightblue-600">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 sm:w-80 border-r border-navy-100">
                {sidebarContent}
              </SheetContent>
            </Sheet>
            <div className="ml-3">
              <div className="font-medium text-navy-800">Doctor Portal</div>
              <div className="text-xs text-navy-500">{user?.name}</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="hidden md:block w-64 border-r border-navy-100 bg-white">
      {sidebarContent}
    </div>
  );
};
