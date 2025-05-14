import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, ChevronDown, ChevronRight, Home, Calendar as CalendarIcon, Video, FileText, Pill, CreditCard, MessageSquare, Users, Award, Flag, Settings, Heart, FolderOpen, BellRing, Stethoscope, Activity, Coffee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface SidebarContentProps {
  closeMenu: () => void;
  isCollapsed?: boolean;
}

const categories = [
  "all",
  "overview",
  "appointments",
  "health records",
  "wellness",
  "communication"
];

const sectionIcons = {
  "overview": <Home className="h-5 w-5" />,
  "appointments": <CalendarIcon className="h-5 w-5" />,
  "health records": <FileText className="h-5 w-5" />,
  "wellness": <Activity className="h-5 w-5" />,
  "communication": <MessageSquare className="h-5 w-5" />
};

export default function PatientPortalSidebar({ closeMenu, isCollapsed = false }: SidebarContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "overview": true,
    "appointments": true,
    "health records": true,
    "wellness": true,
    "communication": true
  });

  // Mock notifications data
  const mockNotifications = {
    dashboard: 2,
    appointments: 1,
    messages: 3,
    prescriptions: 1,
    lab: 2,
    billing: 0
  };

  // Navigation items by category
  const navigationItems = {
    "overview": [
      { name: "Dashboard", icon: <Home className="h-5 w-5" />, path: "/patient", notifications: mockNotifications.dashboard },
      { name: "Settings", icon: <Settings className="h-5 w-5" />, path: "/patient/settings", notifications: 0 }
    ],
    "appointments": [
      { name: "My Appointments", icon: <CalendarIcon className="h-5 w-5" />, path: "/patient/appointments", notifications: mockNotifications.appointments },
      { name: "Telehealth", icon: <Video className="h-5 w-5" />, path: "/patient/telehealth", notifications: 0 }
    ],
    "health records": [
      { name: "Medical Records", icon: <FolderOpen className="h-5 w-5" />, path: "/patient/records", notifications: 0 },
      { name: "Prescriptions", icon: <Pill className="h-5 w-5" />, path: "/patient/prescriptions", notifications: mockNotifications.prescriptions },
      { name: "Lab Results", icon: <Stethoscope className="h-5 w-5" />, path: "/patient/lab", notifications: mockNotifications.lab }
    ],
    "wellness": [
      { name: "Health Tracking", icon: <Activity className="h-5 w-5" />, path: "/patient/vitals", notifications: 0 },
      { name: "Nutrition", icon: <Coffee className="h-5 w-5" />, path: "/patient/nutrition", notifications: 0 },
      { name: "Challenges", icon: <Flag className="h-5 w-5" />, path: "/patient/challenges", notifications: 0 },
      { name: "Leaderboard", icon: <Award className="h-5 w-5" />, path: "/patient/leaderboard", notifications: 0 }
    ],
    "communication": [
      { name: "Messages", icon: <MessageSquare className="h-5 w-5" />, path: "/patient/messages", notifications: mockNotifications.messages },
      { name: "Billing", icon: <CreditCard className="h-5 w-5" />, path: "/patient/billing", notifications: mockNotifications.billing },
      { name: "Family Access", icon: <Users className="h-5 w-5" />, path: "/patient/family", notifications: 0 }
    ]
  };

  // Function to check if a section should be visible based on search and category
  const isSectionVisible = (sectionName: string) => {
    const matchesCategory = 
      selectedCategory === "all" || 
      sectionName.toLowerCase() === selectedCategory.toLowerCase();

    if (!matchesCategory) return false;

    if (!searchQuery) return true;

    // Check if any navigation items in this section match the search query
    return navigationItems[sectionName as keyof typeof navigationItems].some(
      item => item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMenu();
  };

  // If sidebar is collapsed, render a simplified version with icons only
  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center pt-14 h-full">
        <TooltipProvider delayDuration={0}>
          <div className="space-y-6 py-6">
            {Object.entries(sectionIcons).map(([name, icon]) => (
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  <button
                    className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-sidebar-primary/20 text-sidebar-foreground hover:text-sidebar-primary transition-colors"
                  >
                    {icon}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search and Categories - Fixed */}
      <div className="shrink-0 border-b bg-sidebar-background">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search menu..."
              className="pl-8 bg-sidebar-background border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
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
                className="whitespace-nowrap text-xs"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="p-3">
          {/* Overview Section */}
          {isSectionVisible("overview") && (
            <div className="mb-4">
              <div 
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-sidebar-primary/10 rounded-md"
                onClick={() => toggleSection("overview")}
              >
                <div className="flex items-center">
                  {sectionIcons["overview"]}
                  <h3 className="text-xs font-semibold uppercase ml-2">Overview</h3>
                </div>
                {expandedSections["overview"] ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
              {expandedSections["overview"] && (
                <div className="mt-1 space-y-1 px-2">
                  {navigationItems["overview"].map((item) => (
                    <Button
                      key={item.path}
                      variant="ghost"
                      className={`w-full justify-start nav-item-sidebar ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                      {item.notifications > 0 && (
                        <Badge variant="secondary" className="ml-auto">{item.notifications}</Badge>
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Appointments Section */}
          {isSectionVisible("appointments") && (
            <div className="mb-4">
              <div 
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-sidebar-primary/10 rounded-md"
                onClick={() => toggleSection("appointments")}
              >
                <div className="flex items-center">
                  {sectionIcons["appointments"]}
                  <h3 className="text-xs font-semibold uppercase ml-2">Appointments</h3>
                </div>
                {expandedSections["appointments"] ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
              {expandedSections["appointments"] && (
                <div className="mt-1 space-y-1 px-2">
                  {navigationItems["appointments"].map((item) => (
                    <Button
                      key={item.path}
                      variant="ghost"
                      className={`w-full justify-start nav-item-sidebar ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                      {item.notifications > 0 && (
                        <Badge variant="secondary" className="ml-auto">{item.notifications}</Badge>
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Health Records Section */}
          {isSectionVisible("health records") && (
            <div className="mb-4">
              <div 
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-sidebar-primary/10 rounded-md"
                onClick={() => toggleSection("health records")}
              >
                <div className="flex items-center">
                  {sectionIcons["health records"]}
                  <h3 className="text-xs font-semibold uppercase ml-2">Health Records</h3>
                </div>
                {expandedSections["health records"] ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
              {expandedSections["health records"] && (
                <div className="mt-1 space-y-1 px-2">
                  {navigationItems["health records"].map((item) => (
                    <Button
                      key={item.path}
                      variant="ghost"
                      className={`w-full justify-start nav-item-sidebar ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                      {item.notifications > 0 && (
                        <Badge variant="secondary" className="ml-auto">{item.notifications}</Badge>
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wellness Section */}
          {isSectionVisible("wellness") && (
            <div className="mb-4">
              <div 
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-sidebar-primary/10 rounded-md"
                onClick={() => toggleSection("wellness")}
              >
                <div className="flex items-center">
                  {sectionIcons["wellness"]}
                  <h3 className="text-xs font-semibold uppercase ml-2">Wellness</h3>
                </div>
                {expandedSections["wellness"] ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
              {expandedSections["wellness"] && (
                <div className="mt-1 space-y-1 px-2">
                  {navigationItems["wellness"].map((item) => (
                    <Button
                      key={item.path}
                      variant="ghost"
                      className={`w-full justify-start nav-item-sidebar ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                      {item.notifications > 0 && (
                        <Badge variant="secondary" className="ml-auto">{item.notifications}</Badge>
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Communication Section */}
          {isSectionVisible("communication") && (
            <div className="mb-4">
              <div 
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-sidebar-primary/10 rounded-md"
                onClick={() => toggleSection("communication")}
              >
                <div className="flex items-center">
                  {sectionIcons["communication"]}
                  <h3 className="text-xs font-semibold uppercase ml-2">Communication</h3>
                </div>
                {expandedSections["communication"] ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
              {expandedSections["communication"] && (
                <div className="mt-1 space-y-1 px-2">
                  {navigationItems["communication"].map((item) => (
                    <Button
                      key={item.path}
                      variant="ghost"
                      className={`w-full justify-start nav-item-sidebar ${location.pathname === item.path ? 'active' : ''}`}
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                      {item.notifications > 0 && (
                        <Badge variant="secondary" className="ml-auto">{item.notifications}</Badge>
                      )}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Add padding at the bottom to ensure content is not hidden behind footer */}
          <div className="h-32" />
        </div>
      </ScrollArea>
    </div>
  );
} 