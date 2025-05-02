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

interface SubmenuItem {
  to: string;
  label: string;
  badge?: string;
  aiFeature?: string;
  notificationCount?: number;
  tooltip?: string;
  onClick?: () => void;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  to: string;
  badge?: string;
  aiFeature?: string;
  notificationCount?: number;
  tooltip?: string;
  submenu?: SubmenuItem[];
  onClick?: () => void;
}

interface AIAutomationSectionProps {
  closeMenu: () => void;
  searchQuery?: string;
}

export const AIAutomationSection = ({ closeMenu, searchQuery = "" }: AIAutomationSectionProps) => {
  const menuItems: MenuItem[] = [
    {
      icon: <Brain className="h-5 w-5" />,
      label: "Specialized Modules",
      to: "/doctor/specialized-modules",
      notificationCount: 1,
      aiFeature: "AI-powered specialty modules",
      tooltip: "Explore new AI-powered modules",
      onClick: closeMenu
    },
    {
      icon: <Microscope className="h-5 w-5" />,
      label: "AI Pathology Analysis",
      to: "/doctor/pathology-analysis",
      aiFeature: "AI-driven pathology insights",
      tooltip: "AI-driven pathology insights",
      onClick: closeMenu
    },
    {
      icon: <Activity className="h-5 w-5" />,
      label: "Care Pathway Monitor",
      to: "/doctor/care-pathway-monitor",
      aiFeature: "AI care pathway monitoring",
      tooltip: "Monitor patient care pathways with AI",
      onClick: closeMenu
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: "Smart Visit Prep",
      to: "/doctor/visit-prep",
      aiFeature: "AI-powered visit preparation",
      tooltip: "AI-powered visit preparation",
      onClick: closeMenu
    },
    {
      icon: <Activity className="h-5 w-5" />,
      label: "Differential Suggestions",
      to: "/doctor/differential",
      aiFeature: "AI-generated differential diagnoses",
      tooltip: "AI-generated differential diagnoses",
      onClick: closeMenu
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: "Lifestyle Assistant",
      to: "/doctor/lifestyle",
      aiFeature: "AI lifestyle recommendations",
      tooltip: "AI lifestyle recommendations",
      onClick: closeMenu
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "Wellness Alerts",
      to: "/doctor/wellness-alerts",
      notificationCount: 3,
      aiFeature: "AI-driven wellness alerts",
      tooltip: "AI-driven wellness alerts",
      onClick: closeMenu
    },
    {
      icon: <FileBarChart className="h-5 w-5" />,
      label: "Visit Comparisons",
      to: "/doctor/visit-compare",
      aiFeature: "AI visit comparison analytics",
      tooltip: "Compare visits with AI insights",
      onClick: closeMenu
    }
  ];

  const filteredItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.aiFeature && item.aiFeature.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.submenu && item.submenu.some(sub => sub.label.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="space-y-1">
      {filteredItems.map((item, index) => (
        <NavItem
          key={index}
          icon={item.icon}
          label={item.label}
          to={item.to}
          aiFeature={item.aiFeature}
          notificationCount={item.notificationCount}
          tooltip={item.tooltip}
          submenu={item.submenu}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};
