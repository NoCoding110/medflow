
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FamilyMemberCard } from "@/components/patient-portal/family/FamilyMemberCard";
import { AddFamilyMemberCard } from "@/components/patient-portal/family/AddFamilyMemberCard";
import { FamilyAppointmentsList } from "@/components/patient-portal/family/FamilyAppointmentsList";
import { FamilyMedicalRecords } from "@/components/patient-portal/family/FamilyMedicalRecords";

const PatientFamily = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Family Accounts</h1>
      <p className="text-muted-foreground mb-6">
        Manage health information for your family members
      </p>
      
      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Family Members</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Records</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members">
          <div className="grid gap-6 md:grid-cols-3">
            <FamilyMemberCard
              name="Alex Thompson"
              relationship="Primary Account Holder"
              dob="05/12/1985"
              patientId="12345678"
              avatarColor="bg-blue-100"
              textColor="text-blue-700"
              buttonText="View Your Profile"
            />
            
            <FamilyMemberCard
              name="Emma Thompson"
              relationship="Child • 10 years old"
              dob="03/22/2015"
              patientId="23456789"
              avatarColor="bg-pink-100"
              textColor="text-pink-700"
            />
            
            <AddFamilyMemberCard />
          </div>
        </TabsContent>
        
        <TabsContent value="appointments">
          <Card>
            <CardHeader>
              <CardTitle>Family Appointments</CardTitle>
              <CardDescription>
                View and manage appointments for all family members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FamilyAppointmentsList />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Schedule New Appointment</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="records">
          <Card>
            <CardHeader>
              <CardTitle>Family Medical Records</CardTitle>
              <CardDescription>
                Access and manage medical records for all family members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FamilyMedicalRecords />
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Upload Medical Records</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientFamily;
