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
  ClipboardList
} from "lucide-react";
import { NavItem } from "./NavItem";

interface SubmenuItem {
  to: string;
  label: string;
  badge?: string;
  aiFeature?: string;
  notificationCount?: number;
  tooltip?: string;
  onClick?: () => void;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  to: string;
  badge?: string;
  aiFeature?: string;
  notificationCount?: number;
  tooltip?: string;
  submenu?: SubmenuItem[];
  onClick?: () => void;
}

interface MainMenuSectionProps {
  closeMenu: () => void;
  searchQuery?: string;
  notifications: { [key: string]: number };
}

export const MainMenuSection = ({ closeMenu, searchQuery = "", notifications = {} }: MainMenuSectionProps) => {
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    {
      icon: <Home className="h-5 w-5" />, label: "Dashboard", to: "/doctor", notificationCount: notifications.dashboard, aiFeature: "AI dashboard insights", tooltip: "AI-powered dashboard analytics", onClick: () => { navigate("/doctor"); closeMenu(); }
    },
    {
      icon: <Users className="h-5 w-5" />, label: "Patients", to: "/doctor/patients", notificationCount: notifications.patients, aiFeature: "AI patient risk stratification", tooltip: "AI-powered patient management", onClick: () => { navigate("/doctor/patients"); closeMenu(); }
    },
    {
      icon: <Calendar className="h-5 w-5" />, label: "Appointments", to: "/doctor/appointments", notificationCount: notifications.appointments, aiFeature: "AI appointment optimization", tooltip: "AI-powered appointment scheduling", onClick: () => { navigate("/doctor/appointments"); closeMenu(); }
    },
    {
      icon: <ClipboardList className="h-5 w-5" />, label: "Clinical Notes", to: "/doctor/notes", notificationCount: notifications.notes, aiFeature: "AI note summarization", tooltip: "AI-powered clinical note summaries", onClick: () => { navigate("/doctor/notes"); closeMenu(); }
    },
    {
      icon: <FileText className="h-5 w-5" />, label: "Medical Records", to: "/doctor/records", notificationCount: notifications.records, aiFeature: "AI record search", tooltip: "AI-powered medical record search", onClick: () => { navigate("/doctor/records"); closeMenu(); }
    },
    {
      icon: <TestTube className="h-5 w-5" />, label: "Laboratory", to: "/doctor/lab", notificationCount: notifications.lab, aiFeature: "AI lab result analysis", tooltip: "AI-powered lab result analysis", onClick: () => { navigate("/doctor/lab"); closeMenu(); }
    },
    {
      icon: <Receipt className="h-5 w-5" />, label: "Billing & Invoicing", to: "/doctor/billing", notificationCount: notifications.billing, aiFeature: "AI billing insights", tooltip: "AI-powered billing analytics", onClick: () => { navigate("/doctor/billing"); closeMenu(); }
    },
    {
      icon: <Pill className="h-5 w-5" />, label: "E-Prescriptions", to: "/doctor/prescriptions", notificationCount: notifications.prescriptions, aiFeature: "AI prescription safety", tooltip: "AI-powered prescription safety checks", onClick: () => { navigate("/doctor/prescriptions"); closeMenu(); }
    }
  ];

  const filteredItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.aiFeature && item.aiFeature.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.submenu && item.submenu.some(sub => sub.label.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="space-y-1">
      {filteredItems.map((item, index) => (
        <NavItem
          key={index}
          icon={item.icon}
          label={item.label}
          to={item.to}
          aiFeature={item.aiFeature}
          notificationCount={item.notificationCount}
          tooltip={item.tooltip}
          submenu={item.submenu}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
};
