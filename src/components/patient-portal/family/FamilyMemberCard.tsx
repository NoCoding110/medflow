
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface FamilyMemberCardProps {
  name: string;
  relationship: string;
  imageUrl?: string;
  age?: number;
  avatarColor?: string;
  textColor?: string;
  dob?: string;
  patientId?: string;
  buttonText?: string;
}

export const FamilyMemberCard = ({ 
  name, 
  relationship, 
  imageUrl, 
  age,
  avatarColor = "bg-blue-100",
  textColor = "text-blue-600",
  buttonText
}: FamilyMemberCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground">{relationship}</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center py-4">
        <div className="flex flex-col items-center gap-2">
          <div className={`h-16 w-16 sm:h-20 sm:w-20 rounded-full ${avatarColor} flex items-center justify-center`}>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <span className={`text-2xl font-semibold ${textColor}`}>
                {name.charAt(0)}
              </span>
            )}
          </div>
          {age && <p className="text-sm">{age} years old</p>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full" size="sm">{buttonText || "Manage Care"}</Button>
        <Button variant="outline" size="sm" className="w-full">View Records</Button>
      </CardFooter>
    </Card>
  );
};
