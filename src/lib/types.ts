export interface Workflow {
  id: string;
  testId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  steps: {
    name: string;
    status: 'completed' | 'pending' | 'in_progress';
    completedAt?: string;
  }[];
}

export interface LabTest {
  id: string;
  patientName: string;
  patientId: string;
  testType: string;
  status: string;
  date: string;
  results: any;
  priority: string;
  workflow?: Workflow;
} 