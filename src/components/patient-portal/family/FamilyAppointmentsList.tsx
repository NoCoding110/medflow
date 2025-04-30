
import React from "react";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface FamilyAppointment {
  name: string;
  avatarColor: string;
  textColor: string;
  appointmentType: string;
  date: string;
  time: string;
  status: string;
  statusColor: string;
}

export const FamilyAppointmentsList = () => {
  const appointments: FamilyAppointment[] = [
    {
      name: "Alex Thompson",
      avatarColor: "bg-blue-100",
      textColor: "text-blue-700",
      appointmentType: "Annual Check-up",
      date: "May 5, 2025",
      time: "10:00 AM",
      status: "Upcoming",
      statusColor: "bg-blue-100 text-blue-700",
    },
    {
      name: "Emma Thompson",
      avatarColor: "bg-pink-100",
      textColor: "text-pink-700",
      appointmentType: "Pediatric Visit",
      date: "May 12, 2025",
      time: "2:30 PM",
      status: "Upcoming",
      statusColor: "bg-amber-100 text-amber-700",
    },
  ];

  return (
    <div className="space-y-4">
      {appointments.map((appointment, index) => (
        <div key={index} className="border rounded-md p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback className={`${appointment.avatarColor} ${appointment.textColor}`}>
                {appointment.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">{appointment.name}</p>
                <Badge className={`font-normal ${appointment.statusColor}`}>
                  {appointment.status}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <p className="text-sm text-muted-foreground">
                  {appointment.appointmentType} • {appointment.date} • {appointment.time}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
