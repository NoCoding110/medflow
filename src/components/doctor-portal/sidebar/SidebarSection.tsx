
import React from "react";

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const SidebarSection = ({ title, children, className }: SidebarSectionProps) => {
  return (
    <div className={`my-4 border-t pt-4 ${className || ""}`}>
      <h3 className="mb-2 px-3 text-xs font-semibold uppercase text-navy-400">{title}</h3>
      {children}
    </div>
  );
};
