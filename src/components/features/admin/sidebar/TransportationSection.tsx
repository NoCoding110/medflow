
import React from "react";
import { Car } from "lucide-react";
import { NavItem } from "./NavItem";

interface TransportationSectionProps {
  closeMenu: () => void;
}

export const TransportationSection = ({ closeMenu }: TransportationSectionProps) => {
  return (
    <NavItem
      href="/admin/uber"
      icon={<Car className="h-4 w-4" />}
      label="Uber Integration"
      onClick={closeMenu}
    />
  );
};
