import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Users, Calendar, FileText, Flask } from "lucide-react";
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
      onClick: () => {
        navigate("/doctor");
        closeMenu();
      },
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Patients",
      onClick: () => {
        navigate("/doctor/patients");
        closeMenu();
      },
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Appointments",
      onClick: () => {
        navigate("/doctor/appointments");
        closeMenu();
      },
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Medical Records",
      onClick: () => {
        navigate("/doctor/records");
        closeMenu();
      },
    },
    {
      icon: <Flask className="h-5 w-5" />,
      label: "Laboratory",
      onClick: () => {
        navigate("/doctor/lab");
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
          onClick={item.onClick}
        >
          {item.label}
        </NavItem>
      ))}
    </div>
  );
};
