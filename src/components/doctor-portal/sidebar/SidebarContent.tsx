import React, { useState } from "react";
import { MainMenuSection } from "./MainMenuSection";
import { SidebarSection } from "./SidebarSection";
import { SmartFeaturesSection } from "./SmartFeaturesSection";
import { AIAutomationSection } from "./AIAutomationSection";
import { CollaborationSection } from "./CollaborationSection";
import { SecuritySection } from "./SecuritySection";
import { Search } from "lucide-react";
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
      
      <ScrollArea className="flex-1 p-3">
        <nav className="space-y-1">
          {isSectionVisible("main menu", <MainMenuSection closeMenu={closeMenu} />) && (
            <MainMenuSection closeMenu={closeMenu} searchQuery={searchQuery} />
          )}

          {isSectionVisible("smart features", <SmartFeaturesSection closeMenu={closeMenu} />) && (
            <SidebarSection title="Smart Features">
              <SmartFeaturesSection closeMenu={closeMenu} searchQuery={searchQuery} />
            </SidebarSection>
          )}

          {isSectionVisible("ai & automation", <AIAutomationSection closeMenu={closeMenu} />) && (
            <SidebarSection title="AI & Automation">
              <AIAutomationSection closeMenu={closeMenu} searchQuery={searchQuery} />
            </SidebarSection>
          )}

          {isSectionVisible("collaboration", <CollaborationSection closeMenu={closeMenu} />) && (
            <SidebarSection title="Collaboration">
              <CollaborationSection closeMenu={closeMenu} searchQuery={searchQuery} />
            </SidebarSection>
          )}

          {isSectionVisible("security", <SecuritySection closeMenu={closeMenu} />) && (
            <SidebarSection title="Security">
              <SecuritySection closeMenu={closeMenu} searchQuery={searchQuery} />
            </SidebarSection>
          )}
        </nav>
      </ScrollArea>
    </div>
  );
};
