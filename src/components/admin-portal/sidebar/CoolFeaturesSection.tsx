
import React from "react";
import { Award, Bot, LineChart, Map } from "lucide-react";
import { NavItem } from "./NavItem";

interface CoolFeaturesSectionProps {
  closeMenu: () => void;
}

export const CoolFeaturesSection = ({ closeMenu }: CoolFeaturesSectionProps) => {
  return (
    <>
      <NavItem
        href="/admin/staff-leaderboards"
        icon={<Award className="h-4 w-4" />}
        label="Staff Leaderboards"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/admin-assistant"
        icon={<Bot className="h-4 w-4" />}
        label="AI Assistant"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/clinic-mood"
        icon={<LineChart className="h-4 w-4" />}
        label="Clinic Mood Board"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/clinic-load-map"
        icon={<Map className="h-4 w-4" />}
        label="Clinic Load Map"
        onClick={closeMenu}
      />
    </>
  );
};
