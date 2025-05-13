
import React from "react";
import { SidebarSection } from "./SidebarSection";
import { CoreAdminSection } from "./CoreAdminSection";
import { AIFeaturesSection } from "./AIFeaturesSection";
import { AnalyticsSection } from "./AnalyticsSection";
import { CoolFeaturesSection } from "./CoolFeaturesSection";
import { PharmacyLabSection } from "./PharmacyLabSection";
import { TransportationSection } from "./TransportationSection";

interface SidebarContentProps {
  closeMenu: () => void;
}

export const SidebarContent = ({ closeMenu }: SidebarContentProps) => {
  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid gap-4 px-2">
        <SidebarSection title="Core Administration">
          <CoreAdminSection closeMenu={closeMenu} />
        </SidebarSection>
        
        <SidebarSection title="AI Features">
          <AIFeaturesSection closeMenu={closeMenu} />
        </SidebarSection>
        
        <SidebarSection title="Analytics">
          <AnalyticsSection closeMenu={closeMenu} />
        </SidebarSection>
        
        <SidebarSection title="Cool Features">
          <CoolFeaturesSection closeMenu={closeMenu} />
        </SidebarSection>
        
        <SidebarSection title="Pharmacy & Lab">
          <PharmacyLabSection closeMenu={closeMenu} />
        </SidebarSection>
        
        <SidebarSection title="Transportation">
          <TransportationSection closeMenu={closeMenu} />
        </SidebarSection>
      </nav>
    </div>
  );
};
