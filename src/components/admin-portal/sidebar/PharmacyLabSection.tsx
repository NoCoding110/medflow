
import React from "react";
import { Thermometer, Truck, TestTube, AlertCircle } from "lucide-react";
import { NavItem } from "./NavItem";

interface PharmacyLabSectionProps {
  closeMenu: () => void;
}

export const PharmacyLabSection = ({ closeMenu }: PharmacyLabSectionProps) => {
  return (
    <>
      <NavItem
        href="/admin/pharmacy-monitoring"
        icon={<Thermometer className="h-4 w-4" />}
        label="Pharmacy Monitoring"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/lab-routing"
        icon={<Truck className="h-4 w-4" />}
        label="Smart Lab Routing"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/lab-error-detection"
        icon={<TestTube className="h-4 w-4" />}
        label="Lab Error Detection"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/home-collection"
        icon={<AlertCircle className="h-4 w-4" />}
        label="Home Sample Collection"
        onClick={closeMenu}
      />
    </>
  );
};
