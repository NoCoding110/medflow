import React, { useState } from "react";
import { MainMenuSection } from "./MainMenuSection";
import { SidebarSection } from "./SidebarSection";
import { SmartFeaturesSection } from "./SmartFeaturesSection";
import { AIAutomationSection } from "./AIAutomationSection";
import { CollaborationSection } from "./CollaborationSection";
import { SecuritySection } from "./SecuritySection";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarContentProps {
  closeMenu: () => void;
}

const categories = [
  "all",
  "main menu",
  "smart features",
  "ai & automation",
  "collaboration",
  "security"
];

export const SidebarContent = ({ closeMenu }: SidebarContentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    "main menu": true,
    "smart features": true,
    "ai & automation": true,
    "collaboration": true,
    "security": true
  });

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

  return (
    <div className="flex flex-col h-full">
      {/* Search and Categories */}
      <div className="shrink-0 p-4 border-b">
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
      
      {/* Main Content - Scrollable */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <nav className="space-y-1 p-3">
            {isSectionVisible("main menu", <MainMenuSection closeMenu={closeMenu} />) && (
              <div>
                <div 
                  className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-lightblue-50 rounded-md"
                  onClick={() => toggleSection("main menu")}
                >
                  <h3 className="text-xs font-semibold uppercase text-navy-400">Main Menu</h3>
                  {expandedSections["main menu"] ? 
                    <ChevronDown className="h-4 w-4 text-navy-400" /> : 
                    <ChevronRight className="h-4 w-4 text-navy-400" />
                  }
                </div>
                {expandedSections["main menu"] && (
                  <MainMenuSection closeMenu={closeMenu} searchQuery={searchQuery} />
                )}
              </div>
            )}

            {isSectionVisible("smart features", <SmartFeaturesSection closeMenu={closeMenu} />) && (
              <div>
                <div 
                  className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-lightblue-50 rounded-md"
                  onClick={() => toggleSection("smart features")}
                >
                  <h3 className="text-xs font-semibold uppercase text-navy-400">Smart Features</h3>
                  {expandedSections["smart features"] ? 
                    <ChevronDown className="h-4 w-4 text-navy-400" /> : 
                    <ChevronRight className="h-4 w-4 text-navy-400" />
                  }
                </div>
                {expandedSections["smart features"] && (
                  <SmartFeaturesSection closeMenu={closeMenu} searchQuery={searchQuery} />
                )}
              </div>
            )}

            {isSectionVisible("ai & automation", <AIAutomationSection closeMenu={closeMenu} />) && (
              <div>
                <div 
                  className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-lightblue-50 rounded-md"
                  onClick={() => toggleSection("ai & automation")}
                >
                  <h3 className="text-xs font-semibold uppercase text-navy-400">AI & Automation</h3>
                  {expandedSections["ai & automation"] ? 
                    <ChevronDown className="h-4 w-4 text-navy-400" /> : 
                    <ChevronRight className="h-4 w-4 text-navy-400" />
                  }
                </div>
                {expandedSections["ai & automation"] && (
                  <AIAutomationSection closeMenu={closeMenu} searchQuery={searchQuery} />
                )}
              </div>
            )}

            {isSectionVisible("collaboration", <CollaborationSection closeMenu={closeMenu} />) && (
              <div>
                <div 
                  className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-lightblue-50 rounded-md"
                  onClick={() => toggleSection("collaboration")}
                >
                  <h3 className="text-xs font-semibold uppercase text-navy-400">Collaboration</h3>
                  {expandedSections["collaboration"] ? 
                    <ChevronDown className="h-4 w-4 text-navy-400" /> : 
                    <ChevronRight className="h-4 w-4 text-navy-400" />
                  }
                </div>
                {expandedSections["collaboration"] && (
                  <CollaborationSection closeMenu={closeMenu} searchQuery={searchQuery} />
                )}
              </div>
            )}

            {isSectionVisible("security", <SecuritySection closeMenu={closeMenu} />) && (
              <div>
                <div 
                  className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-lightblue-50 rounded-md"
                  onClick={() => toggleSection("security")}
                >
                  <h3 className="text-xs font-semibold uppercase text-navy-400">Security</h3>
                  {expandedSections["security"] ? 
                    <ChevronDown className="h-4 w-4 text-navy-400" /> : 
                    <ChevronRight className="h-4 w-4 text-navy-400" />
                  }
                </div>
                {expandedSections["security"] && (
                  <SecuritySection closeMenu={closeMenu} searchQuery={searchQuery} />
                )}
              </div>
            )}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
};
