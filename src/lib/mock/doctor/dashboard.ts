import { UUID, Doctor, Patient } from '../shared/types';
import { doctors, patients } from '../shared/users';
import { getTodayAppointments, getUpcomingAppointmentsByDoctorId } from '../shared/appointments';
import { format, subDays } from 'date-fns';

// Helper function for date formatting
const formatDate = (date: Date): string => format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
const pastDate = (days: number) => formatDate(subDays(new Date(), days));

// Clinical metrics for analytics section
export interface DoctorMetrics {
  doctorId: UUID;
  patientCount: number;
  appointmentsLastMonth: number;
  noShowRate: number;
  averageVisitDuration: number;
  patientSatisfactionScore: number;
  prescriptionsWritten: number;
  referralsMade: number;
  earningsLastMonth: number; // In USD
  pendingTasks: number;
  teleHealthSessionsLastMonth: number;
  unreadMessages: number;
}

// Activity feed item
export interface ActivityItem {
  id: UUID;
  doctorId: UUID;
  timestamp: string;
  type: 'appointment' | 'note' | 'message' | 'prescription' | 'lab_result' | 'task' | 'system';
  title: string;
  description: string;
  status?: 'pending' | 'completed' | 'urgent';
  relatedPatientId?: UUID;
  relatedPatientName?: string;
  actionRequired?: boolean;
  link?: string;
  read: boolean;
}

// Task for doctor to complete
export interface DoctorTask {
  id: UUID;
  doctorId: UUID;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'not_started' | 'in_progress' | 'completed' | 'overdue';
  category: 'administrative' | 'clinical' | 'educational' | 'research';
  relatedPatientId?: UUID;
  relatedPatientName?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Generate doctor metrics
export const getDoctorMetrics = (doctorId: UUID): DoctorMetrics => {
  // Randomized but somewhat realistic metrics
  return {
    doctorId,
    patientCount: Math.floor(Math.random() * 200) + 100, // 100-300 patients
    appointmentsLastMonth: Math.floor(Math.random() * 80) + 40, // 40-120 appointments
    noShowRate: Math.random() * 0.1, // 0-10% no-show rate
    averageVisitDuration: Math.floor(Math.random() * 10) + 15, // 15-25 minutes
    patientSatisfactionScore: 4 + Math.random(), // 4.0-5.0 rating
    prescriptionsWritten: Math.floor(Math.random() * 50) + 20, // 20-70 prescriptions
    referralsMade: Math.floor(Math.random() * 15) + 5, // 5-20 referrals
    earningsLastMonth: (Math.floor(Math.random() * 10000) + 15000), // $15,000 - $25,000
    pendingTasks: Math.floor(Math.random() * 10) + 2, // 2-12 pending tasks
    teleHealthSessionsLastMonth: Math.floor(Math.random() * 20) + 5, // 5-25 telehealth sessions
    unreadMessages: Math.floor(Math.random() * 8) + 1 // 1-9 unread messages
  };
};

// Get recent activity for a doctor
export const getDoctorActivity = (doctorId: UUID, limit: number = 10): ActivityItem[] => {
  // Sample activities
  const activities: ActivityItem[] = [
    {
      id: 'activity-001',
      doctorId: doctors[0].id,
      timestamp: pastDate(0.5), // 12 hours ago
      type: 'appointment',
      title: 'Upcoming Appointment',
      description: `Appointment with ${patients[0].firstName} ${patients[0].lastName} tomorrow at 9:00 AM.`,
      relatedPatientId: patients[0].id,
      relatedPatientName: `${patients[0].firstName} ${patients[0].lastName}`,
      actionRequired: false,
      link: `/doctor/appointments/${getTodayAppointments()[0].id}`,
      read: false
    },
    {
      id: 'activity-002',
      doctorId: doctors[0].id,
      timestamp: pastDate(1),
      type: 'lab_result',
      title: 'Lab Results Ready',
      description: `New lab results for ${patients[2].firstName} ${patients[2].lastName} are ready for review.`,
      status: 'pending',
      relatedPatientId: patients[2].id,
      relatedPatientName: `${patients[2].firstName} ${patients[2].lastName}`,
      actionRequired: true,
      link: `/doctor/lab-results/lab-001`,
      read: false
    },
    {
      id: 'activity-003',
      doctorId: doctors[0].id,
      timestamp: pastDate(1.5),
      type: 'message',
      title: 'New Message',
      description: `${patients[3].firstName} ${patients[3].lastName} sent you a message about medication side effects.`,
      relatedPatientId: patients[3].id,
      relatedPatientName: `${patients[3].firstName} ${patients[3].lastName}`,
      actionRequired: true,
      link: `/doctor/messages/msg-001`,
      read: true
    },
    {
      id: 'activity-004',
      doctorId: doctors[0].id,
      timestamp: pastDate(2),
      type: 'note',
      title: 'Note Updated',
      description: `You updated clinical notes for ${patients[1].firstName} ${patients[1].lastName} after today's appointment.`,
      relatedPatientId: patients[1].id,
      relatedPatientName: `${patients[1].firstName} ${patients[1].lastName}`,
      actionRequired: false,
      link: `/doctor/patients/${patients[1].id}/notes/note-001`,
      read: true
    },
    {
      id: 'activity-005',
      doctorId: doctors[0].id,
      timestamp: pastDate(3),
      type: 'prescription',
      title: 'Prescription Filled',
      description: `${patients[2].firstName} ${patients[2].lastName}'s prescription for Metformin has been filled by the pharmacy.`,
      relatedPatientId: patients[2].id,
      relatedPatientName: `${patients[2].firstName} ${patients[2].lastName}`,
      actionRequired: false,
      link: `/doctor/prescriptions/rx-001`,
      read: true
    },
    {
      id: 'activity-006',
      doctorId: doctors[0].id,
      timestamp: pastDate(4),
      type: 'task',
      title: 'Medical Record Review Due',
      description: `Annual review of ${patients[0].firstName} ${patients[0].lastName}'s medical record is due in 3 days.`,
      status: 'pending',
      relatedPatientId: patients[0].id,
      relatedPatientName: `${patients[0].firstName} ${patients[0].lastName}`,
      actionRequired: true,
      link: `/doctor/tasks/task-001`,
      read: false
    },
    {
      id: 'activity-007',
      doctorId: doctors[0].id,
      timestamp: pastDate(5),
      type: 'appointment',
      title: 'Appointment Completed',
      description: `You completed an appointment with ${patients[4].firstName} ${patients[4].lastName}.`,
      status: 'completed',
      relatedPatientId: patients[4].id,
      relatedPatientName: `${patients[4].firstName} ${patients[4].lastName}`,
      actionRequired: false,
      link: `/doctor/appointments/apt-007`,
      read: true
    },
    {
      id: 'activity-008',
      doctorId: doctors[0].id,
      timestamp: pastDate(6),
      type: 'system',
      title: 'System Maintenance',
      description: 'System maintenance scheduled for Sunday at 2:00 AM. The EHR will be unavailable for approximately 2 hours.',
      actionRequired: false,
      read: true
    },
    {
      id: 'activity-009',
      doctorId: doctors[0].id,
      timestamp: pastDate(7),
      type: 'message',
      title: 'Message from Nurse',
      description: 'Nurse Karen left a message about patient preparation for upcoming procedures.',
      actionRequired: true,
      link: '/doctor/messages/msg-002',
      read: true
    },
    {
      id: 'activity-010',
      doctorId: doctors[0].id,
      timestamp: pastDate(8),
      type: 'lab_result',
      title: 'Abnormal Lab Result',
      description: `${patients[3].firstName} ${patients[3].lastName}'s recent blood test shows elevated liver enzymes.`,
      status: 'urgent',
      relatedPatientId: patients[3].id,
      relatedPatientName: `${patients[3].firstName} ${patients[3].lastName}`,
      actionRequired: true,
      link: '/doctor/lab-results/lab-002',
      read: true
    },
    {
      id: 'activity-011',
      doctorId: doctors[1].id, // Different doctor
      timestamp: pastDate(1),
      type: 'appointment',
      title: 'New Appointment Request',
      description: 'A new patient has requested an appointment for neurological consultation.',
      actionRequired: true,
      link: '/doctor/appointments/apt-011',
      read: false
    },
    {
      id: 'activity-012',
      doctorId: doctors[0].id,
      timestamp: pastDate(9),
      type: 'note',
      title: 'Clinical Note Template Updated',
      description: 'The hospital has updated the standard clinical note templates. Please review the changes.',
      actionRequired: true,
      link: '/doctor/settings/templates',
      read: false
    }
  ];
  
  // Filter activities for this doctor and limit the number
  return activities
    .filter(activity => activity.doctorId === doctorId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

// Get pending tasks for a doctor
export const getDoctorTasks = (doctorId: UUID): DoctorTask[] => {
  // Sample tasks
  const tasks: DoctorTask[] = [
    {
      id: 'task-001',
      doctorId: doctors[0].id,
      title: 'Complete medical record review',
      description: `Review ${patients[0].firstName} ${patients[0].lastName}'s annual medical record and update as needed.`,
      dueDate: pastDate(-3), // Due in 3 days
      priority: 'medium',
      status: 'not_started',
      category: 'clinical',
      relatedPatientId: patients[0].id,
      relatedPatientName: `${patients[0].firstName} ${patients[0].lastName}`,
      createdAt: pastDate(7),
      updatedAt: pastDate(7)
    },
    {
      id: 'task-002',
      doctorId: doctors[0].id,
      title: 'Review abnormal lab results',
      description: `${patients[3].firstName} ${patients[3].lastName}'s liver enzyme tests show elevated levels. Review and follow up.`,
      dueDate: pastDate(-1), // Due tomorrow
      priority: 'high',
      status: 'in_progress',
      category: 'clinical',
      relatedPatientId: patients[3].id,
      relatedPatientName: `${patients[3].firstName} ${patients[3].lastName}`,
      createdAt: pastDate(3),
      updatedAt: pastDate(2)
    },
    {
      id: 'task-003',
      doctorId: doctors[0].id,
      title: 'Continuing education module',
      description: 'Complete the required continuing education module on new hypertension treatment guidelines.',
      dueDate: pastDate(-14), // Due in 2 weeks
      priority: 'low',
      status: 'not_started',
      category: 'educational',
      createdAt: pastDate(10),
      updatedAt: pastDate(10)
    },
    {
      id: 'task-004',
      doctorId: doctors[0].id,
      title: 'Complete monthly clinic report',
      description: 'Fill out and submit monthly patient statistics and clinical outcome report.',
      dueDate: pastDate(-7), // Due in 1 week
      priority: 'medium',
      status: 'not_started',
      category: 'administrative',
      createdAt: pastDate(5),
      updatedAt: pastDate(5)
    },
    {
      id: 'task-005',
      doctorId: doctors[0].id,
      title: 'Follow up with patient',
      description: `Call ${patients[2].firstName} ${patients[2].lastName} to discuss medication adjustment based on recent lab results.`,
      dueDate: pastDate(-2), // Due in 2 days
      priority: 'high',
      status: 'not_started',
      category: 'clinical',
      relatedPatientId: patients[2].id,
      relatedPatientName: `${patients[2].firstName} ${patients[2].lastName}`,
      createdAt: pastDate(1),
      updatedAt: pastDate(1)
    },
    {
      id: 'task-006',
      doctorId: doctors[0].id,
      title: 'Update clinical protocols',
      description: 'Review and update clinical protocols for cardiac patient management based on new guidelines.',
      dueDate: pastDate(-30), // Due in 30 days
      priority: 'medium',
      status: 'not_started',
      category: 'administrative',
      createdAt: pastDate(15),
      updatedAt: pastDate(15)
    },
    {
      id: 'task-007',
      doctorId: doctors[0].id,
      title: 'Research protocol review',
      description: 'Review and provide feedback on the cardiology research protocol submitted for approval.',
      dueDate: pastDate(-10), // Due in 10 days
      priority: 'medium',
      status: 'in_progress',
      category: 'research',
      createdAt: pastDate(5),
      updatedAt: pastDate(3)
    },
    {
      id: 'task-008',
      doctorId: doctors[1].id, // Different doctor
      title: 'Review MRI results',
      description: 'Review MRI results for patient with suspected multiple sclerosis.',
      dueDate: pastDate(-1), // Due tomorrow
      priority: 'urgent',
      status: 'not_started',
      category: 'clinical',
      createdAt: pastDate(1),
      updatedAt: pastDate(1)
    }
  ];
  
  // Filter tasks for this doctor and sort by priority and due date
  return tasks
    .filter(task => task.doctorId === doctorId && task.status !== 'completed')
    .sort((a, b) => {
      // Sort by priority first (urgent > high > medium > low)
      const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then sort by due date (earliest first)
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
};

// Dashboard data aggregation function
export const getDoctorDashboardData = (doctorId: UUID) => {
  return {
    doctorInfo: doctors.find(d => d.id === doctorId),
    metrics: getDoctorMetrics(doctorId),
    recentActivity: getDoctorActivity(doctorId, 5),
    upcomingAppointments: getUpcomingAppointmentsByDoctorId(doctorId).slice(0, 5),
    pendingTasks: getDoctorTasks(doctorId).slice(0, 5),
    todayAppointments: getTodayAppointments().filter(a => a.doctorId === doctorId)
  };
}; 