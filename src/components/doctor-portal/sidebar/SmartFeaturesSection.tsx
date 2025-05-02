import React from "react";
import { 
  Heart, 
  Activity, 
  Pill, 
  Thermometer, 
  CheckSquare, 
  Bell, 
  BarChartHorizontal, 
  Brain 
} from "lucide-react";
import { NavItem } from "./NavItem";

interface SmartFeaturesSectionProps {
  closeMenu: () => void;
  searchQuery?: string;
}

export const SmartFeaturesSection = ({ closeMenu, searchQuery = "" }: SmartFeaturesSectionProps) => {
  const menuItems = [
    {
      icon: <Heart className="h-5 w-5" />, label: "Wellness Dashboard", to: "/doctor/wellness-dashboard", badge: "AI", aiFeature: "Predictive wellness analytics", notificationCount: 2, tooltip: "AI-powered wellness analytics and predictions", onClick: closeMenu
    },
    {
      icon: <Activity className="h-5 w-5" />, label: "Vital Signs Trends", to: "/doctor/vitals", badge: "AI", aiFeature: "AI trend detection & anomaly alerts", notificationCount: 1, tooltip: "AI analysis of vital signs trends", onClick: closeMenu,
      submenu: [
        { label: "Trends", to: "/doctor/vitals/trends", badge: "AI", aiFeature: "Predictive trend analysis", onClick: closeMenu },
        { label: "Alerts", to: "/doctor/vitals/alerts", badge: "AI", aiFeature: "AI-generated alerts", notificationCount: 1, onClick: closeMenu }
      ]
    },
    {
      icon: <Activity className="h-5 w-5" />, label: "Fitness Tracking", to: "/doctor/fitness", badge: "AI", aiFeature: "AI fitness recommendations", tooltip: "Monitor patient fitness activity with AI", onClick: closeMenu
    },
    {
      icon: <Pill className="h-5 w-5" />, label: "Nutrition Insights", to: "/doctor/nutrition", badge: "AI", aiFeature: "AI nutrition analysis", tooltip: "Analyze patient nutrition data with AI", onClick: closeMenu
    },
    {
      icon: <Thermometer className="h-5 w-5" />, label: "Symptom History", to: "/doctor/symptoms", badge: "AI", aiFeature: "AI symptom pattern recognition", tooltip: "Review patient symptom history with AI", onClick: closeMenu
    },
    {
      icon: <CheckSquare className="h-5 w-5" />, label: "Medication Adherence", to: "/doctor/medication-adherence", badge: "AI", aiFeature: "Predictive adherence analysis", tooltip: "Track medication compliance with AI", onClick: closeMenu
    },
    {
      icon: <Brain className="h-5 w-5" />, label: "Mental Health Tracker", to: "/doctor/mental-health", badge: "AI", aiFeature: "AI mood and risk analysis", tooltip: "Monitor mental health metrics with AI", onClick: closeMenu
    },
    {
      icon: <Bell className="h-5 w-5" />, label: "Preventive Care", to: "/doctor/preventive-care", badge: "AI", aiFeature: "AI preventive care reminders", tooltip: "Manage preventive care tasks with AI", onClick: closeMenu
    },
    {
      icon: <BarChartHorizontal className="h-5 w-5" />, label: "Patient Goals", to: "/doctor/goals", badge: "AI", aiFeature: "AI goal progress prediction", tooltip: "Track and manage patient goals with AI", onClick: closeMenu
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
          badge={item.badge}
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
