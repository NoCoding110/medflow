
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockPatients, createAppointment, formatPatientName } from "@/lib/data";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, AlertCircle } from "lucide-react";

interface AppointmentFormProps {
  onSubmit: (appointment: any) => void;
  onCancel: () => void;
  initialData?: any;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSubmit,
  onCancel,
  initialData = {},
}) => {
  const [searchParams] = useSearchParams();
  const preselectedPatientId = searchParams.get("patientId");
  
  const [formData, setFormData] = useState({
    patientId: initialData.patientId || preselectedPatientId || "",
    reason: initialData.reason || "",
    date: initialData.date ? new Date(initialData.date) : new Date(),
    startTime: initialData.startTime || "09:00",
    endTime: initialData.endTime || "09:30",
    notes: initialData.notes || "",
    status: initialData.status || "Scheduled",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear error when field is changed
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };
  
  // Auto-calculate end time (30 min after start time)
  useEffect(() => {
    const startParts = formData.startTime.split(':');
    if (startParts.length === 2) {
      const startHour = parseInt(startParts[0], 10);
      const startMinute = parseInt(startParts[1], 10);
      
      let endHour = startHour;
      let endMinute = startMinute + 30;
      
      if (endMinute >= 60) {
        endHour += 1;
        endMinute -= 60;
      }
      
      if (endHour >= 24) {
        endHour -= 24;
      }
      
      const endTime = `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
      
      setFormData(prev => ({
        ...prev,
        endTime
      }));
    }
  }, [formData.startTime]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.patientId) {
      newErrors.patientId = "Patient is required";
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = "Reason is required";
    }
    
    if (!formData.date) {
      newErrors.date = "Date is required";
    }
    
    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }
    
    if (!formData.endTime) {
      newErrors.endTime = "End time is required";
    }
    
    // Check if end time is after start time
    if (formData.startTime && formData.endTime) {
      const [startHour, startMinute] = formData.startTime.split(':').map(Number);
      const [endHour, endMinute] = formData.endTime.split(':').map(Number);
      
      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;
      
      if (endTotalMinutes <= startTotalMinutes) {
        newErrors.endTime = "End time must be after start time";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !user) return;
    
    try {
      // Get patient name
      const patient = mockPatients.find(p => p.id === formData.patientId);
      if (!patient) {
        toast({
          title: "Error",
          description: "Selected patient not found",
          variant: "destructive",
        });
        return;
      }
      
      const appointmentData = {
        ...formData,
        date: format(formData.date, 'yyyy-MM-dd'),
        doctorId: user.id,
        doctorName: user.name,
        patientName: formatPatientName(patient),
      };
      
      // In a real app, this would make an API call
      const newAppointment = createAppointment(appointmentData);
      
      toast({
        title: "Success",
        description: "Appointment scheduled successfully",
        variant: "default",
      });
      
      onSubmit(newAppointment);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule appointment",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="patientId">Patient *</Label>
        <Select
          value={formData.patientId}
          onValueChange={(value) => handleSelectChange("patientId", value)}
        >
          <SelectTrigger id="patientId" className={errors.patientId ? "border-red-500" : ""}>
            <SelectValue placeholder="Select a patient" />
          </SelectTrigger>
          <SelectContent>
            {mockPatients.map((patient) => (
              <SelectItem key={patient.id} value={patient.id}>
                {formatPatientName(patient)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.patientId && (
          <div className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{errors.patientId}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="reason">Reason for Visit *</Label>
        <Input
          id="reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          className={errors.reason ? "border-red-500" : ""}
        />
        {errors.reason && (
          <div className="flex items-center gap-1 text-sm text-red-500">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{errors.reason}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  errors.date ? "border-red-500" : "",
                  !formData.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date ? format(formData.date, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => 
                  setFormData({ ...formData, date: date || new Date() })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <div className="flex items-center gap-1 text-sm text-red-500">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>{errors.date}</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time *</Label>
            <Input
              id="startTime"
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleChange}
              className={errors.startTime ? "border-red-500" : ""}
            />
            {errors.startTime && (
              <div className="flex items-center gap-1 text-sm text-red-500">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errors.startTime}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time *</Label>
            <Input
              id="endTime"
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={handleChange}
              className={errors.endTime ? "border-red-500" : ""}
            />
            {errors.endTime && (
              <div className="flex items-center gap-1 text-sm text-red-500">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errors.endTime}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional appointment details..."
          rows={3}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Schedule Appointment</Button>
      </div>
    </form>
  );
};

export default AppointmentForm;
