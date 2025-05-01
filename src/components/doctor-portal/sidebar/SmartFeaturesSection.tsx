import React from "react";
import { 
  Heart, 
  Activity, 
  Pill, 
  Thermometer, 
  CheckSquare, 
  Bell, 
  BarChartHorizontal 
} from "lucide-react";
import { NavItem } from "./NavItem";

interface SmartFeaturesSectionProps {
  closeMenu: () => void;
  searchQuery?: string;
}

export const SmartFeaturesSection = ({ closeMenu, searchQuery = "" }: SmartFeaturesSectionProps) => {
  const menuItems = [
    {
      icon: <Heart className="h-5 w-5" />,
      label: "Wellness Dashboard",
      to: "/doctor/wellness-dashboard",
      badge: "AI",
      onClick: closeMenu
    },
    {
      icon: <Activity className="h-5 w-5" />,
      label: "Vital Signs Trends",
      to: "/doctor/vitals",
      onClick: closeMenu
    },
    {
      icon: <Activity className="h-5 w-5" />,
      label: "Fitness Tracking",
      to: "/doctor/fitness",
      onClick: closeMenu
    },
    {
      icon: <Pill className="h-5 w-5" />,
      label: "Nutrition Insights",
      to: "/doctor/nutrition",
      onClick: closeMenu
    },
    {
      icon: <Thermometer className="h-5 w-5" />,
      label: "Symptom History",
      to: "/doctor/symptoms",
      onClick: closeMenu
    },
    {
      icon: <CheckSquare className="h-5 w-5" />,
      label: "Medication Adherence",
      to: "/doctor/medication-adherence",
      onClick: closeMenu
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: "Mental Health Tracker",
      to: "/doctor/mental-health",
      onClick: closeMenu
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "Preventive Care",
      to: "/doctor/preventive-care",
      onClick: closeMenu
    },
    {
      icon: <BarChartHorizontal className="h-5 w-5" />,
      label: "Patient Goals",
      to: "/doctor/goals",
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
