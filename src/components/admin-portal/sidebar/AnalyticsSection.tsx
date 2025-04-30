
import React from "react";
import { BarChart2 } from "lucide-react";
import { NavItem } from "./NavItem";

interface AnalyticsSectionProps {
  closeMenu: () => void;
}

export const AnalyticsSection = ({ closeMenu }: AnalyticsSectionProps) => {
  return (
    <NavItem
      href="/admin/analytics"
      icon={<BarChart2 className="h-4 w-4" />}
      label="Analytics Dashboard"
      onClick={closeMenu}
    />
  );
};
