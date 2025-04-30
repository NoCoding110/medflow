
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
}

export const AIAutomationSection = ({ closeMenu }: AIAutomationSectionProps) => {
  return (
    <>
      <NavItem
        to="/doctor/specialized-modules"
        icon={<Brain className="h-5 w-5" />}
        label="Specialized Modules"
        badge="NEW"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/pathology-analysis"
        icon={<Microscope className="h-5 w-5" />}
        label="AI Pathology Analysis"
        badge="AI"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/care-pathway-monitor"
        icon={<Activity className="h-5 w-5" />}
        label="Care Pathway Monitor"
        badge="NEW"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/visit-prep"
        icon={<BookOpen className="h-5 w-5" />}
        label="Smart Visit Prep"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/differential"
        icon={<Activity className="h-5 w-5" />}
        label="Differential Suggestions"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/lifestyle"
        icon={<Heart className="h-5 w-5" />}
        label="Lifestyle Assistant"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/wellness-alerts"
        icon={<Bell className="h-5 w-5" />}
        label="Wellness Alerts"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/visit-compare"
        icon={<FileBarChart className="h-5 w-5" />}
        label="Visit Comparisons"
        onClick={closeMenu}
      />
    </>
  );
};
