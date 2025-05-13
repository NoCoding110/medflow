import React from "react";
import { Shield, FileText, Settings } from "lucide-react";
import { NavItem } from "./NavItem";

interface SecuritySectionProps {
  closeMenu: () => void;
  searchQuery?: string;
}

export const SecuritySection = ({ closeMenu, searchQuery = "" }: SecuritySectionProps) => {
  const menuItems = [
    {
      icon: <Shield className="h-5 w-5" />,
      label: "Access Control",
      to: "/doctor/access-control",
      onClick: closeMenu
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Audit Logs",
      to: "/doctor/audit",
      onClick: closeMenu
    },
    {
      icon: <Shield className="h-5 w-5" />,
      label: "Security Settings",
      to: "/doctor/security",
      onClick: closeMenu
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      to: "/doctor/settings",
      onClick: closeMenu
    }
  ];

  const filteredItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-1">
      {filteredItems.map((item, index) => (
        <NavItem
          key={index}
          icon={item.icon}
          label={item.label}
          to={item.to}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};
