import React, { useState } from "react";
import { MainMenuSection } from "./MainMenuSection";
import { SidebarSection } from "./SidebarSection";
import { SmartFeaturesSection } from "./SmartFeaturesSection";
import { AIAutomationSection } from "./AIAutomationSection";
import { CollaborationSection } from "./CollaborationSection";
import { SecuritySection } from "./SecuritySection";
import { Search, ChevronDown, ChevronRight, Home, Calendar, Users, Activity, Brain, Bot, MessageSquare, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarContentProps {
  closeMenu: () => void;
  isCollapsed?: boolean;
}

const categories = [
  "all",
  "main menu",
  "smart features",
  "ai & automation",
  "collaboration",
  "security"
];

const sectionIcons = {
  "main menu": <Home className="h-5 w-5" />,
  "smart features": <Activity className="h-5 w-5" />,
  "ai & automation": <Brain className="h-5 w-5" />,
  "collaboration": <MessageSquare className="h-5 w-5" />,
  "security": <Shield className="h-5 w-5" />
};

export const SidebarContent = ({ closeMenu, isCollapsed = false }: SidebarContentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "main menu": true,
    "smart features": true,
    "ai & automation": true,
    "collaboration": true,
    "security": true
  });

  // Mock notifications data
  const mockNotifications = {
    dashboard: 5,
    patients: 2,
    appointments: 1,
    notes: 3,
    records: 0,
    lab: 4,
    billing: 0,
    prescriptions: 0
  };

  // Function to check if a section should be visible based on search and category
  const isSectionVisible = (sectionName: string, content: React.ReactNode) => {
    const matchesCategory = 
      selectedCategory === "all" || 
      sectionName.toLowerCase() === selectedCategory.toLowerCase();

    if (!matchesCategory) return false;

    if (!searchQuery) return true;

    // Convert the content to string to make it searchable
    const contentString = content?.toString().toLowerCase() || "";
    return contentString.includes(searchQuery.toLowerCase());
  };

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
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
                    onClick={() => {
                      // You might want to handle section selection here
                      // or keep it as is, just showing the tooltip
                    }}
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
          {isSectionVisible("main menu", <MainMenuSection closeMenu={closeMenu} notifications={mockNotifications} />) && (
            <div className="mb-4">
              <div 
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-sidebar-primary/10 rounded-md"
                onClick={() => toggleSection("main menu")}
              >
                <div className="flex items-center">
                  {sectionIcons["main menu"]}
                  <h3 className="text-xs font-semibold uppercase ml-2">Main Menu</h3>
                </div>
                {expandedSections["main menu"] ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
              {expandedSections["main menu"] && (
                <MainMenuSection closeMenu={closeMenu} searchQuery={searchQuery} notifications={mockNotifications} />
              )}
            </div>
          )}

          {isSectionVisible("smart features", <SmartFeaturesSection closeMenu={closeMenu} />) && (
            <div className="mb-4">
              <div 
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-sidebar-primary/10 rounded-md"
                onClick={() => toggleSection("smart features")}
              >
                <div className="flex items-center">
                  {sectionIcons["smart features"]}
                  <h3 className="text-xs font-semibold uppercase ml-2">Smart Features</h3>
                </div>
                {expandedSections["smart features"] ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
              {expandedSections["smart features"] && (
                <SmartFeaturesSection closeMenu={closeMenu} searchQuery={searchQuery} />
              )}
            </div>
          )}

          {isSectionVisible("ai & automation", <AIAutomationSection closeMenu={closeMenu} />) && (
            <div className="mb-4">
              <div 
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-sidebar-primary/10 rounded-md"
                onClick={() => toggleSection("ai & automation")}
              >
                <div className="flex items-center">
                  {sectionIcons["ai & automation"]}
                  <h3 className="text-xs font-semibold uppercase ml-2">AI & Automation</h3>
                </div>
                {expandedSections["ai & automation"] ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
              {expandedSections["ai & automation"] && (
                <AIAutomationSection closeMenu={closeMenu} searchQuery={searchQuery} />
              )}
            </div>
          )}

          {isSectionVisible("collaboration", <CollaborationSection closeMenu={closeMenu} />) && (
            <div className="mb-4">
              <div 
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-sidebar-primary/10 rounded-md"
                onClick={() => toggleSection("collaboration")}
              >
                <div className="flex items-center">
                  {sectionIcons["collaboration"]}
                  <h3 className="text-xs font-semibold uppercase ml-2">Collaboration</h3>
                </div>
                {expandedSections["collaboration"] ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
              {expandedSections["collaboration"] && (
                <CollaborationSection closeMenu={closeMenu} searchQuery={searchQuery} />
              )}
            </div>
          )}

          {isSectionVisible("security", <SecuritySection closeMenu={closeMenu} />) && (
            <div className="mb-4">
              <div 
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-sidebar-primary/10 rounded-md"
                onClick={() => toggleSection("security")}
              >
                <div className="flex items-center">
                  {sectionIcons["security"]}
                  <h3 className="text-xs font-semibold uppercase ml-2">Security</h3>
                </div>
                {expandedSections["security"] ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </div>
              {expandedSections["security"] && (
                <SecuritySection closeMenu={closeMenu} searchQuery={searchQuery} />
              )}
            </div>
          )}
          
          {/* Add padding at the bottom to ensure content is not hidden behind footer */}
          <div className="h-32" />
        </div>
      </ScrollArea>
    </div>
  );
};
