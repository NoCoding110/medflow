import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  TestTube, 
  Receipt, 
  Pill, 
  Stethoscope,
  Brain,
  ClipboardList
} from "lucide-react";
import { NavItem } from "./NavItem";

interface MainMenuSectionProps {
  closeMenu: () => void;
  searchQuery?: string;
}

export const MainMenuSection = ({ closeMenu, searchQuery = "" }: MainMenuSectionProps) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Dashboard",
      to: "/doctor",
      onClick: () => {
        navigate("/doctor");
        closeMenu();
      },
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Patients",
      to: "/doctor/patients",
      onClick: () => {
        navigate("/doctor/patients");
        closeMenu();
      },
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Appointments",
      to: "/doctor/appointments",
      onClick: () => {
        navigate("/doctor/appointments");
        closeMenu();
      },
    },
    {
      icon: <ClipboardList className="h-5 w-5" />,
      label: "Clinical Notes",
      to: "/doctor/notes",
      onClick: () => {
        navigate("/doctor/notes");
        closeMenu();
      },
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Medical Records",
      to: "/doctor/records",
      onClick: () => {
        navigate("/doctor/records");
        closeMenu();
      },
    },
    {
      icon: <TestTube className="h-5 w-5" />,
      label: "Laboratory",
      to: "/doctor/lab",
      onClick: () => {
        navigate("/doctor/lab");
        closeMenu();
      },
    },
    {
      icon: <Receipt className="h-5 w-5" />,
      label: "Billing & Invoicing",
      to: "/doctor/billing",
      onClick: () => {
        navigate("/doctor/billing");
        closeMenu();
      },
    },
    {
      icon: <Pill className="h-5 w-5" />,
      label: "E-Prescriptions",
      to: "/doctor/prescriptions",
      onClick: () => {
        navigate("/doctor/prescriptions");
        closeMenu();
      },
    },
    {
      icon: <Brain className="h-5 w-5" />,
      label: "AI Assistant",
      to: "/doctor/ai-assistant",
      onClick: () => {
        navigate("/doctor/ai-assistant");
        closeMenu();
      },
    },
  ];

  const filteredItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-1">
      {filteredItems.map((item, index) => (
        <NavItem
          key={index}
          icon={item.icon}
          label={item.label}
          to={item.to}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};
