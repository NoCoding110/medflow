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
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { format, addDays, startOfDay, endOfDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getAvailableTimeSlots } from '@/lib/services/appointment-service';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const appointmentSchema = z.object({
  date: z.date({
    required_error: 'Please select a date',
  }),
  time: z.string({
    required_error: 'Please select a time',
  }),
  type: z.enum(['checkup', 'follow-up', 'consultation', 'emergency'], {
    required_error: 'Please select an appointment type',
  }),
  notes: z.string().optional(),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
  onSubmit: (appointment: any) => void;
  onCancel: () => void;
  initialData?: any;
  doctorId: string;
  onSuccess?: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onSubmit,
  onCancel,
  initialData = {},
  doctorId,
  onSuccess,
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
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      notes: '',
    },
  });

  const selectedDate = form.watch('date');

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

  useEffect(() => {
    if (selectedDate) {
      const fetchTimeSlots = async () => {
        try {
          const slots = await getAvailableTimeSlots(doctorId, selectedDate);
          setAvailableSlots(slots);
        } catch (error) {
          console.error('Error fetching time slots:', error);
          toast({
            title: 'Error',
            description: 'Failed to fetch available time slots',
            variant: 'destructive',
          });
        }
      };

      fetchTimeSlots();
    }
  }, [selectedDate, doctorId, toast]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !user) return;
    
    try {
      setLoading(true);
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
      const newAppointment = await createAppointment({
        patientId: user.id,
        doctorId,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        notes: formData.notes,
      });
      
      toast({
        title: "Success",
        description: "Appointment scheduled successfully",
        variant: "default",
      });
      
      form.reset();
      onSuccess?.();
      
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast({
        title: "Error",
        description: "Failed to schedule appointment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => {
                  const today = startOfDay(new Date());
                  const maxDate = endOfDay(addDays(today, 30));
                  return date < today || date > maxDate;
                }}
                className="rounded-md border"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!selectedDate || availableSlots.length === 0}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {format(new Date(`2000-01-01T${slot}`), 'h:mm a')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Appointment Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="checkup">Checkup</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes or concerns"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Scheduling...' : 'Schedule Appointment'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AppointmentForm;
