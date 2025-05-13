
import React from "react";
import { Home, Users, Settings, CreditCard, UserPlus, Bell } from "lucide-react";
import { NavItem } from "./NavItem";

interface CoreAdminSectionProps {
  closeMenu: () => void;
}

export const CoreAdminSection = ({ closeMenu }: CoreAdminSectionProps) => {
  return (
    <>
      <NavItem 
        href="/admin" 
        icon={<Home className="h-4 w-4" />} 
        label="Dashboard" 
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/users"
        icon={<Users className="h-4 w-4" />}
        label="User Management"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/clinic-settings"
        icon={<Settings className="h-4 w-4" />}
        label="Clinic Settings"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/billing"
        icon={<CreditCard className="h-4 w-4" />}
        label="Billing Management"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/patient-onboarding"
        icon={<UserPlus className="h-4 w-4" />}
        label="Patient Onboarding"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/notifications"
        icon={<Bell className="h-4 w-4" />}
        label="Notification Settings"
        onClick={closeMenu}
      />
    </>
  );
};
