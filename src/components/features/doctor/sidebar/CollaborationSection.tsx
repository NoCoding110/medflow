import React from "react";
import { MessageSquare, CheckSquare } from "lucide-react";
import { NavItem } from "./NavItem";

interface CollaborationSectionProps {
  closeMenu: () => void;
  searchQuery?: string;
}

export const CollaborationSection = ({ closeMenu, searchQuery = "" }: CollaborationSectionProps) => {
  const menuItems = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Secure Messaging",
      to: "/doctor/messages",
      badge: "3",
      onClick: closeMenu
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Patient Messaging",
      to: "/doctor/patient-messages",
      badge: "5",
      onClick: closeMenu
    },
    {
      icon: <CheckSquare className="h-5 w-5" />,
      label: "Tasks & Follow-ups",
      to: "/doctor/tasks",
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
          badge={item.badge}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};
