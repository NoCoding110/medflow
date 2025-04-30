
import React from "react";
import { MessageSquare, CheckSquare } from "lucide-react";
import { NavItem } from "./NavItem";

interface CollaborationSectionProps {
  closeMenu: () => void;
}

export const CollaborationSection = ({ closeMenu }: CollaborationSectionProps) => {
  return (
    <>
      <NavItem
        to="/doctor/messages"
        icon={<MessageSquare className="h-5 w-5" />}
        label="Secure Messaging"
        badge="3"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/patient-messages"
        icon={<MessageSquare className="h-5 w-5" />}
        label="Patient Messaging"
        badge="5"
        onClick={closeMenu}
      />
      <NavItem
        to="/doctor/tasks"
        icon={<CheckSquare className="h-5 w-5" />}
        label="Tasks & Follow-ups"
        onClick={closeMenu}
      />
    </>
  );
};
