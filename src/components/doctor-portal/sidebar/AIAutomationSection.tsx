import React from "react";
import { 
  Brain, 
  Microscope, 
  Activity, 
  BookOpen, 
  Heart, 
  Bell, 
  FileBarChart 
} from "lucide-react";
import { NavItem } from "./NavItem";

interface AIAutomationSectionProps {
  closeMenu: () => void;
  searchQuery?: string;
}

export const AIAutomationSection = ({ closeMenu, searchQuery = "" }: AIAutomationSectionProps) => {
  const menuItems = [
    {
      icon: <Brain className="h-5 w-5" />,
      label: "Specialized Modules",
      to: "/doctor/specialized-modules",
      badge: "NEW",
      onClick: closeMenu
    },
    {
      icon: <Microscope className="h-5 w-5" />,
      label: "AI Pathology Analysis",
      to: "/doctor/pathology-analysis",
      badge: "AI",
      onClick: closeMenu
    },
    {
      icon: <Activity className="h-5 w-5" />,
      label: "Care Pathway Monitor",
      to: "/doctor/care-pathway-monitor",
      badge: "NEW",
      onClick: closeMenu
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Smart Visit Prep",
      to: "/doctor/visit-prep",
      onClick: closeMenu
    },
    {
      icon: <Activity className="h-5 w-5" />,
      label: "Differential Suggestions",
      to: "/doctor/differential",
      onClick: closeMenu
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: "Lifestyle Assistant",
      to: "/doctor/lifestyle",
      onClick: closeMenu
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "Wellness Alerts",
      to: "/doctor/wellness-alerts",
      onClick: closeMenu
    },
    {
      icon: <FileBarChart className="h-5 w-5" />,
      label: "Visit Comparisons",
      to: "/doctor/visit-compare",
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
