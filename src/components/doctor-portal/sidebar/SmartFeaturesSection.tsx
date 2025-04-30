
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
}

export const SmartFeaturesSection = ({ closeMenu }: SmartFeaturesSectionProps) => {
  return (
    <>
      <NavItem
        to="/doctor/wellness-dashboard"
        icon={<Heart className="h-5 w-5" />}
        label="Wellness Dashboard"
        badge="AI"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/vitals"
        icon={<Activity className="h-5 w-5" />}
        label="Vital Signs Trends"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/fitness"
        icon={<Activity className="h-5 w-5" />}
        label="Fitness Tracking"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/nutrition"
        icon={<Pill className="h-5 w-5" />}
        label="Nutrition Insights"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/symptoms"
        icon={<Thermometer className="h-5 w-5" />}
        label="Symptom History"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/medication-adherence"
        icon={<CheckSquare className="h-5 w-5" />}
        label="Medication Adherence"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/mental-health"
        icon={<Heart className="h-5 w-5" />}
        label="Mental Health Tracker"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/preventive-care"
        icon={<Bell className="h-5 w-5" />}
        label="Preventive Care"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/goals"
        icon={<BarChartHorizontal className="h-5 w-5" />}
        label="Patient Goals"
        onClick={closeMenu}
      />
    </>
  );
};
