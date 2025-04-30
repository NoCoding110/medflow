
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  onClick?: () => void;
}

export const NavItem = ({ href, icon, label, badge, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
        isActive
          ? "bg-navy-100 text-navy-800 font-medium"
          : "text-white hover:bg-navy-700 hover:text-orange-400"
      )}
      onClick={onClick}
    >
      {icon}
      <span className="text-sm">{label}</span>
      {badge && (
        <Badge variant="outline" className="bg-orange-400/20 text-orange-400 border-orange-300 hover:bg-orange-400/30 ml-auto">
          {badge}
        </Badge>
      )}
    </Link>
  );
};
