
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

export const AdminPortalSidebar = () => {
  const { logout } = useAuth();
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
    <div className="flex h-full w-full flex-col">
      <SidebarHeader 
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
        <div className="h-16 flex items-center justify-between px-4 border-b bg-navy-800 text-beige-300">
          <div className="flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-beige-300 hover:bg-navy-700 hover:text-orange-400">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 sm:w-80 border-r bg-navy-800 text-beige-300">
                {sidebarContent}
              </SheetContent>
            </Sheet>
            <div className="ml-3">
              <div className="font-medium text-orange-400">Admin Portal</div>
              <div className="text-xs text-lightblue-300">System Management</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex h-full w-full flex-col border-r bg-navy-800 text-beige-300">
      {sidebarContent}
    </div>
  );
};
