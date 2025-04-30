
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  onClick?: () => void;
}

export const NavItem = ({ to, icon, label, badge, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-navy-600 transition-all hover:bg-lightblue-50 hover:text-lightblue-600",
        isActive && "bg-lightblue-100 text-lightblue-700 font-medium"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {badge && (
        <Badge variant="outline" className={cn(
          "ml-auto text-xs font-normal",
          badge === "NEW" ? "border-orange-300 bg-orange-50 text-orange-700" : 
          badge === "AI" ? "border-lightblue-300 bg-lightblue-50 text-lightblue-700" : 
          "border-navy-200 bg-navy-50 text-navy-700"
        )}>
          {badge}
        </Badge>
      )}
    </Link>
  );
};
