
import React from "react";
import { Calendar, TrendingUp, FileSearch, FlaskConical, AlertTriangle, MessageSquare, Activity, Database } from "lucide-react";
import { NavItem } from "./NavItem";

interface AIFeaturesSectionProps {
  closeMenu: () => void;
}

export const AIFeaturesSection = ({ closeMenu }: AIFeaturesSectionProps) => {
  return (
    <>
      <NavItem
        href="/admin/smart-scheduling"
        icon={<Calendar className="h-4 w-4" />}
        label="Smart Scheduling"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/capacity-forecasting"
        icon={<TrendingUp className="h-4 w-4" />}
        label="Capacity Forecasting"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/billing-scrubber"
        icon={<FileSearch className="h-4 w-4" />}
        label="Billing Scrubber"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/lab-pharmacy"
        icon={<FlaskConical className="h-4 w-4" />}
        label="Lab & Pharmacy Integration"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/no-show-prediction"
        icon={<AlertTriangle className="h-4 w-4" />}
        label="No-Show Prediction"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/sentiment-analysis"
        icon={<MessageSquare className="h-4 w-4" />}
        label="Sentiment Analysis"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/patient-flow"
        icon={<Activity className="h-4 w-4" />}
        label="Patient Flow"
        onClick={closeMenu}
      />
      <NavItem
        href="/admin/real-world-data"
        icon={<Database className="h-4 w-4" />}
        label="Real-World Data Platform"
        badge="NEW"
        onClick={closeMenu}
      />
    </>
  );
};
