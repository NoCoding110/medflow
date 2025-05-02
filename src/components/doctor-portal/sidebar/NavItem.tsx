import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SubmenuItem {
  to: string;
  label: string;
  badge?: string;
  aiFeature?: string;
  notificationCount?: number;
  tooltip?: string;
  onClick?: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
  aiFeature?: string;
  notificationCount?: number;
  tooltip?: string;
  submenu?: SubmenuItem[];
  onClick?: () => void;
}

export const NavItem = ({ to, icon, label, badge, aiFeature, notificationCount, tooltip, submenu, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const [open, setOpen] = useState(false);

  const content = (
    <>
      {icon}
      <span>{label}</span>
      {badge && (
        <Badge variant="outline" className={cn(
          "ml-1 text-xs font-normal",
          badge === "NEW" ? "border-orange-300 bg-orange-50 text-orange-700" : 
          badge === "AI" ? "border-lightblue-300 bg-lightblue-50 text-lightblue-700" : 
          "border-navy-200 bg-navy-50 text-navy-700"
        )}>
          {badge}
        </Badge>
      )}
      {notificationCount && notificationCount > 0 && (
        <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-5 h-5">{notificationCount}</span>
      )}
      {submenu && (
        <span className="ml-auto">
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
      )}
    </>
  );

  const link = (
    <div>
      <Link
        to={to}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-navy-600 transition-all hover:bg-lightblue-50 hover:text-lightblue-600",
          isActive && "bg-lightblue-100 text-lightblue-700 font-medium"
        )}
        onClick={onClick}
        onMouseDown={e => submenu && e.preventDefault()}
        onClickCapture={e => {
          if (submenu) {
            setOpen(!open);
            e.preventDefault();
          }
        }}
      >
        {content}
      </Link>
      {submenu && open && (
        <div className="ml-6 mt-1 space-y-1">
          {submenu.map((item, idx) => (
            <Tooltip key={item.to}>
              <TooltipTrigger asChild>
                <Link
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1 text-navy-600 transition-all hover:bg-lightblue-50 hover:text-lightblue-600",
                    location.pathname === item.to && "bg-lightblue-100 text-lightblue-700 font-medium"
                  )}
                  onClick={item.onClick}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="outline" className={cn(
                      "ml-1 text-xs font-normal",
                      item.badge === "NEW" ? "border-orange-300 bg-orange-50 text-orange-700" : 
                      item.badge === "AI" ? "border-lightblue-300 bg-lightblue-50 text-lightblue-700" : 
                      "border-navy-200 bg-navy-50 text-navy-700"
                    )}>{item.badge}</Badge>
                  )}
                  {item.notificationCount && item.notificationCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs w-5 h-5">{item.notificationCount}</span>
                  )}
                </Link>
              </TooltipTrigger>
              {item.tooltip && <TooltipContent side="right">{item.tooltip}</TooltipContent>}
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );

  if (tooltip || aiFeature) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right">{tooltip || aiFeature}</TooltipContent>
      </Tooltip>
    );
  }
  return link;
};
