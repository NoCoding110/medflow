import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const DoctorRecords = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Patient Records</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              {/* Add your records content here */}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorRecords; 