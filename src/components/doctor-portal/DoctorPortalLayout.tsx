import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarContent } from "../features/doctor/sidebar/SidebarContent";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DoctorPortalLayout() {
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Provide a closeMenu function for mobile view
  const closeMenu = () => {
    if (window.innerWidth < 1024) {
      setIsExpanded(false);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar backdrop for mobile - only shows when sidebar is expanded on mobile */}
      {isExpanded && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-72 h-full transition-all duration-300 ease-in-out",
          "border-r bg-sidebar-background text-sidebar-foreground",
          "overflow-hidden shadow-lg lg:shadow-none",
          isExpanded ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-[72px]"
        )}
      >
        {/* Toggle button for desktop view - inside sidebar */}
        <Button
          variant="ghost"
          className="absolute top-4 right-4 z-50 lg:block hidden text-sidebar-foreground hover:bg-sidebar-primary/20 w-8 h-8 p-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <SidebarContent closeMenu={closeMenu} isCollapsed={!isExpanded} />
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
        "lg:ml-0",
        isExpanded ? "lg:ml-0" : "lg:ml-0"
      )}>
        {/* Hamburger button for mobile view - outside sidebar */}
        <div className="sticky top-0 z-30 flex items-center h-16 px-4 border-b bg-background">
          <Button
            variant="ghost"
            className="lg:hidden mr-4 w-8 h-8 p-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">MedFlow EHR</h1>
        </div>

        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 