import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Award,
  Calendar,
  FileText,
  Home,
  LogOut,
  MessageSquare,
  Pill,
  Settings,
  User,
  Wallet,
  Heart,
  Video,
  Users,
  Headphones,
  BarChartHorizontal,
  Thermometer,
  Activity,
  Watch,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, badge, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-700",
        isActive && "bg-blue-100 text-blue-700 font-medium"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {badge && (
        <Badge variant="outline" className="ml-auto text-xs font-normal">
          {badge}
        </Badge>
      )}
    </Link>
  );
};

export const PatientPortalSidebar = () => {
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
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <User className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <div className="font-medium">{user?.name}</div>
              <div className="text-xs text-gray-500">Patient Portal</div>
            </div>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3">
        <nav className="space-y-1">
          <NavItem 
            to="/patient" 
            icon={<Home className="h-5 w-5" />} 
            label="Dashboard" 
            onClick={closeMenu}
          />
          <NavItem
            to="/patient/health-assistant"
            icon={<MessageSquare className="h-5 w-5 text-blue-600" />}
            label="AI Health Assistant"
            badge="NEW"
            onClick={closeMenu}
          />
          <NavItem
            to="/patient/appointments"
            icon={<Calendar className="h-5 w-5" />}
            label="Appointments"
            onClick={closeMenu}
          />
          <NavItem
            to="/patient/records"
            icon={<FileText className="h-5 w-5" />}
            label="Medical Records"
            onClick={closeMenu}
          />
          <NavItem
            to="/patient/prescriptions"
            icon={<Pill className="h-5 w-5" />}
            label="Prescriptions"
            onClick={closeMenu}
          />
          <NavItem
            to="/patient/messages"
            icon={<MessageSquare className="h-5 w-5" />}
            label="Messages"
            badge="3"
            onClick={closeMenu}
          />
          <NavItem
            to="/patient/billing"
            icon={<Wallet className="h-5 w-5" />}
            label="Billing"
            onClick={closeMenu}
          />

          <div className="my-4 border-t pt-4">
            <h3 className="mb-1 px-3 text-xs font-semibold uppercase text-gray-500">Wellness</h3>
            <NavItem
              to="/patient/wellness"
              icon={<Heart className="h-5 w-5" />}
              label="Wellness Hub"
              badge="New"
              onClick={closeMenu}
            />
            <NavItem
              to="/patient/exercise"
              icon={<Activity className="h-5 w-5" />}
              label="Exercise Plans"
              onClick={closeMenu}
            />
            <NavItem
              to="/patient/nutrition"
              icon={<Pill className="h-5 w-5" />}
              label="Nutrition"
              onClick={closeMenu}
            />
            <NavItem
              to="/patient/health-tips"
              icon={<Thermometer className="h-5 w-5" />}
              label="Health Tips"
              onClick={closeMenu}
            />
            <NavItem
              to="/patient/vitals"
              icon={<Watch className="h-5 w-5" />}
              label="Vitals Tracker"
              badge="New"
              onClick={closeMenu}
            />
          </div>

          <div className="my-4 border-t pt-4">
            <h3 className="mb-1 px-3 text-xs font-semibold uppercase text-gray-500">Programs</h3>
            <NavItem
              to="/patient/challenges"
              icon={<Award className="h-5 w-5" />}
              label="Health Challenges"
              onClick={closeMenu}
            />
            <NavItem
              to="/patient/mental-health"
              icon={<Heart className="h-5 w-5" />}
              label="Mental Health"
              onClick={closeMenu}
            />
            <NavItem
              to="/patient/telehealth"
              icon={<Video className="h-5 w-5" />}
              label="Telehealth"
              onClick={closeMenu}
            />
            <NavItem
              to="/patient/risk-scores"
              icon={<Thermometer className="h-5 w-5" />}
              label="Health Risks"
              onClick={closeMenu}
            />
            <NavItem
              to="/patient/leaderboard"
              icon={<BarChartHorizontal className="h-5 w-5" />}
              label="Leaderboard"
              onClick={closeMenu}
            />
          </div>

          <div className="mb-4 border-t pt-4">
            <h3 className="mb-1 px-3 text-xs font-semibold uppercase text-gray-500">Account</h3>
            <NavItem
              to="/patient/family"
              icon={<Users className="h-5 w-5" />}
              label="Family Accounts"
              onClick={closeMenu}
            />
            <NavItem
              to="/patient/voice"
              icon={<Headphones className="h-5 w-5" />}
              label="Voice Commands"
              onClick={closeMenu}
            />
            <NavItem
              to="/patient/settings"
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              onClick={closeMenu}
            />
          </div>
        </nav>
      </div>

      <div className="border-t p-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="h-16 flex items-center justify-between px-4 border-b bg-white">
          <div className="flex items-center">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 sm:w-80">
                {sidebarContent}
              </SheetContent>
            </Sheet>
            <div className="ml-3">
              <div className="font-medium">Patient Portal</div>
              <div className="text-xs text-gray-500">{user?.name}</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="hidden md:block w-64 border-r bg-white">
      {sidebarContent}
    </div>
  );
};
