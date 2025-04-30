
import React from "react";
import { Shield, FileText, Settings } from "lucide-react";
import { NavItem } from "./NavItem";

interface SecuritySectionProps {
  closeMenu: () => void;
}

export const SecuritySection = ({ closeMenu }: SecuritySectionProps) => {
  return (
    <>
      <NavItem
        to="/doctor/access-control"
        icon={<Shield className="h-5 w-5" />}
        label="Access Control"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/audit"
        icon={<FileText className="h-5 w-5" />}
        label="Audit Logs"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/security"
        icon={<Shield className="h-5 w-5" />}
        label="Security Settings"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/settings"
        icon={<Settings className="h-5 w-5" />}
        label="Settings"
        onClick={closeMenu}
      />
    </>
  );
};
