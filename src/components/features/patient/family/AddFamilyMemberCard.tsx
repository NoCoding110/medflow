import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/core/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/core/card";

export const AddFamilyMemberCard = () => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Add Family Member</CardTitle>
        <CardDescription>Connect another account</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center py-4 sm:py-8">
        <button className="flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-blue-50">
            <Plus className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
          <p className="text-sm font-medium mt-2">Add New Family Member</p>
        </button>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Register Family Member</Button>
      </CardFooter>
    </Card>
  );
};
