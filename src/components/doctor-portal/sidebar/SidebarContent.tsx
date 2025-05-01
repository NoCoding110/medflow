import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Home,
  Users,
  Calendar,
  FileText,
  TestTube,
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Brain,
  Activity,
  HeartPulse,
  Stethoscope,
  ClipboardList,
  Pill,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface NavItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  path: string;
  category: string;
  badge?: string;
  subItems?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    path: "/doctor",
    category: "Main",
  },
  {
    id: "patients",
    title: "Patients",
    icon: <Users className="h-5 w-5" />,
    path: "/doctor/patients",
    category: "Patient Care",
    subItems: [
      {
        id: "active-patients",
        title: "Active Patients",
        icon: <Activity className="h-4 w-4" />,
        path: "/doctor/patients/active",
        category: "Patient Care",
        badge: "12",
      },
      {
        id: "appointments",
        title: "Appointments",
        icon: <Calendar className="h-4 w-4" />,
        path: "/doctor/appointments",
        category: "Patient Care",
      },
      {
        id: "medical-records",
        title: "Medical Records",
        icon: <FileText className="h-4 w-4" />,
        path: "/doctor/records",
        category: "Patient Care",
      },
    ],
  },
  {
    id: "lab",
    title: "Laboratory",
    icon: <TestTube className="h-5 w-5" />,
    path: "/doctor/lab",
    category: "Clinical",
    subItems: [
      {
        id: "test-results",
        title: "Test Results",
        icon: <ClipboardList className="h-4 w-4" />,
        path: "/doctor/lab/results",
        category: "Clinical",
        badge: "5",
      },
      {
        id: "lab-orders",
        title: "Lab Orders",
        icon: <FileText className="h-4 w-4" />,
        path: "/doctor/lab/orders",
        category: "Clinical",
      },
    ],
  },
  {
    id: "prescriptions",
    title: "Prescriptions",
    icon: <Pill className="h-5 w-5" />,
    path: "/doctor/prescriptions",
    category: "Clinical",
    subItems: [
      {
        id: "active-prescriptions",
        title: "Active Prescriptions",
        icon: <HeartPulse className="h-4 w-4" />,
        path: "/doctor/prescriptions/active",
        category: "Clinical",
      },
      {
        id: "prescription-history",
        title: "History",
        icon: <FileText className="h-4 w-4" />,
        path: "/doctor/prescriptions/history",
        category: "Clinical",
      },
    ],
  },
  {
    id: "ai-assist",
    title: "AI Assistant",
    icon: <Brain className="h-5 w-5" />,
    path: "/doctor/ai",
    category: "Tools",
    badge: "New",
  },
  {
    id: "messages",
    title: "Messages",
    icon: <MessageSquare className="h-5 w-5" />,
    path: "/doctor/messages",
    category: "Communication",
    badge: "3",
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: <Bell className="h-5 w-5" />,
    path: "/doctor/notifications",
    category: "Communication",
    badge: "5",
  },
  {
    id: "settings",
    title: "Settings",
    icon: <Settings className="h-5 w-5" />,
    path: "/doctor/settings",
    category: "System",
  },
];

export const SidebarContent = ({ closeMenu }: { closeMenu: () => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...new Set(navigationItems.map(item => item.category))];

  const toggleExpand = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredItems = navigationItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMenu();
  };

  const renderNavItem = (item: NavItem, isSubItem = false) => {
    const isActive = location.pathname === item.path;
    const isExpanded = expandedItems.includes(item.id);
    const hasSubItems = item.subItems && item.subItems.length > 0;

    return (
      <div key={item.id}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2",
            isActive && "bg-accent",
            isSubItem && "pl-8 text-sm",
          )}
          onClick={() => {
            if (hasSubItems) {
              toggleExpand(item.id);
            } else {
              handleNavigation(item.path);
            }
          }}
        >
          {item.icon}
          <span className="flex-1 text-left">{item.title}</span>
          {item.badge && (
            <Badge variant={item.badge === "New" ? "default" : "secondary"}>
              {item.badge}
            </Badge>
          )}
          {hasSubItems && (
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-90"
              )}
            />
          )}
        </Button>
        {hasSubItems && isExpanded && (
          <div className="ml-4 border-l">
            {item.subItems?.map(subItem => renderNavItem(subItem, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-hidden">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search menu..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      <ScrollArea className="flex-1 px-2 py-2">
        <div className="space-y-1">
          {filteredItems.map(item => renderNavItem(item))}
        </div>
      </ScrollArea>
    </div>
  );
};
