
import React from "react";
import { 
  Home, 
  Users, 
  FileText, 
  Calendar, 
  Pill, 
  Database, 
  Video 
} from "lucide-react";
import { NavItem } from "./NavItem";

interface MainMenuSectionProps {
  closeMenu: () => void;
}

export const MainMenuSection = ({ closeMenu }: MainMenuSectionProps) => {
  return (
    <div className="space-y-1">
      <NavItem 
        to="/doctor" 
        icon={<Home className="h-5 w-5" />} 
        label="Dashboard" 
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/patients"
        icon={<Users className="h-5 w-5" />}
        label="Patient Management"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/notes"
        icon={<FileText className="h-5 w-5" />}
        label="Clinical Documentation"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/appointments"
        icon={<Calendar className="h-5 w-5" />}
        label="Appointments"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/prescriptions"
        icon={<Pill className="h-5 w-5" />}
        label="E-Prescriptions"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/billing"
        icon={<FileText className="h-5 w-5" />}
        label="Billing & Invoicing"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/lab"
        icon={<Database className="h-5 w-5" />}
        label="Lab Integration"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/telehealth"
        icon={<Video className="h-5 w-5" />}
        label="Telehealth"
        onClick={closeMenu}
      />
    </div>
  );
};
