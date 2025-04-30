
import React from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface FamilyMember {
  name: string;
  avatarColor: string;
  textColor: string;
  records: string[];
}

export const FamilyMedicalRecords = () => {
  const familyMembers: FamilyMember[] = [
    {
      name: "Alex Thompson",
      avatarColor: "bg-blue-100",
      textColor: "text-blue-700",
      records: ["Lab Results", "Immunizations", "Medications"],
    },
    {
      name: "Emma Thompson",
      avatarColor: "bg-pink-100",
      textColor: "text-pink-700",
      records: ["Growth Charts", "Immunizations", "Visit Notes"],
    },
  ];

  return (
    <div className="space-y-4">
      {familyMembers.map((member, index) => (
        <div key={index} className="border rounded-md p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback className={`${member.avatarColor} ${member.textColor}`}>
                {member.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{member.name}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {member.records.map((record, recordIndex) => (
                  <Button
                    key={recordIndex}
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs flex items-center gap-1"
                  >
                    <FileText className="h-3 w-3" />
                    <span>{record}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
