
import React from "react";
import { MainMenuSection } from "./MainMenuSection";
import { SidebarSection } from "./SidebarSection";
import { SmartFeaturesSection } from "./SmartFeaturesSection";
import { AIAutomationSection } from "./AIAutomationSection";
import { CollaborationSection } from "./CollaborationSection";
import { SecuritySection } from "./SecuritySection";

interface SidebarContentProps {
  closeMenu: () => void;
}

export const SidebarContent = ({ closeMenu }: SidebarContentProps) => {
  return (
    <div className="flex-1 overflow-auto p-3">
      <nav className="space-y-1">
        <MainMenuSection closeMenu={closeMenu} />
        
        <SidebarSection title="Smart Features">
          <SmartFeaturesSection closeMenu={closeMenu} />
        </SidebarSection>
        
        <SidebarSection title="AI & Automation">
          <AIAutomationSection closeMenu={closeMenu} />
        </SidebarSection>
        
        <SidebarSection title="Collaboration">
          <CollaborationSection closeMenu={closeMenu} />
        </SidebarSection>
        
        <SidebarSection title="Security">
          <SecuritySection closeMenu={closeMenu} />
        </SidebarSection>
      </nav>
    </div>
  );
};
