
import React from "react";

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const SidebarSection = ({ title, children, className }: SidebarSectionProps) => {
  return (
    <div className={`grid gap-2 px-2 ${className || ""}`}>
      <h3 className="mb-1 text-xs font-medium text-lightblue-300">
        {title}
      </h3>
      {children}
    </div>
  );
};
