
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ href, icon, label, active, onClick }: SidebarItemProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:bg-lightblue-100 hover:text-lightblue-700",
        active && "bg-lightblue-100 text-lightblue-700 font-medium"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMenu = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  const navItems = [
    { href: "/dashboard", icon: <Home className="h-5 w-5" />, label: "Dashboard" },
    { href: "/patients", icon: <Users className="h-5 w-5" />, label: "Patients" },
    { href: "/appointments", icon: <Calendar className="h-5 w-5" />, label: "Appointments" },
    { href: "/documents", icon: <FileText className="h-5 w-5" />, label: "Documents" },
    { href: "/settings", icon: <Settings className="h-5 w-5" />, label: "Settings" },
  ];

  const sidebarContent = (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-navy-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-navy-600 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill="none"
            className="h-7 w-7"
          >
            <circle cx="50" cy="50" r="45" fill="#001f2d" />
            <path d="M50 20C40.5 20 33 25 25 35C33 45 40.5 50 50 50C59.5 50 67 45 75 35C67 25 59.5 20 50 20Z" stroke="#9bd1f2" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M25 65C33 75 40.5 80 50 80C59.5 80 67 75 75 65L65 50L75 35" stroke="#9bd1f2" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="50" cy="50" r="10" stroke="#ffb56b" strokeWidth="5" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold font-display text-navy-800">MedFlow</span>
          <span className="text-xs text-navy-500">Connect EHR</span>
        </div>
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setOpen(false)}
            className="ml-auto text-navy-600 hover:bg-navy-50"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      <div className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.href}
              onClick={closeMenu}
            />
          ))}
        </nav>
      </div>
      <div className="border-t border-navy-100 p-4">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-2 text-navy-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:block h-full bg-white w-64 border-r border-navy-100">
        {sidebarContent}
      </div>
      
      {/* Mobile sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="flex h-16 items-center border-b bg-white px-4 md:hidden">
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-navy-600 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                fill="none"
                className="h-6 w-6"
              >
                <circle cx="50" cy="50" r="45" fill="#001f2d" />
                <path d="M50 20C40.5 20 33 25 25 35C33 45 40.5 50 50 50C59.5 50 67 45 75 35C67 25 59.5 20 50 20Z" stroke="#9bd1f2" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M25 65C33 75 40.5 80 50 80C59.5 80 67 75 75 65L65 50L75 35" stroke="#9bd1f2" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="50" cy="50" r="10" stroke="#ffb56b" strokeWidth="5" />
              </svg>
            </div>
            <span className="font-semibold font-display text-navy-800">MedFlow Connect</span>
          </div>
        </div>
        <SheetContent side="left" className="w-64 p-0 bg-white">
          {sidebarContent}
        </SheetContent>
      </Sheet>
      
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
