import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, User, Calendar, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewPatientDialog from "./NewPatientDialog";

// Sample patient data
const patients = [
  {
    id: '1',
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    lastVisit: '2025-04-15',
    status: 'Active',
    upcomingAppointment: '2025-04-30'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    age: 32,
    gender: 'Female',
    lastVisit: '2025-03-22',
    status: 'Active',
    upcomingAppointment: '2025-05-05'
  },
  {
    id: '3',
    name: 'Michael Brown',
    age: 58,
    gender: 'Male',
    lastVisit: '2025-04-10',
    status: 'Active',
    upcomingAppointment: null
  },
  {
    id: '4',
    name: 'Sarah Davis',
    age: 27,
    gender: 'Female',
    lastVisit: '2025-01-15',
    status: 'Inactive',
    upcomingAppointment: null
  },
  {
    id: '5',
    name: 'Robert Wilson',
    age: 65,
    gender: 'Male',
    lastVisit: '2025-04-20',
    status: 'Active',
    upcomingAppointment: '2025-05-10'
  },
  {
    id: '6',
    name: 'Jennifer Martinez',
    age: 41,
    gender: 'Female',
    lastVisit: '2025-03-30',
    status: 'Active',
    upcomingAppointment: '2025-05-15'
  },
];

const DoctorPatients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('name');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'lastVisit', direction: 'desc' });
  const [isNewPatientDialogOpen, setIsNewPatientDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter and sort patients
  const filteredAndSortedPatients = useMemo(() => {
    let filtered = [...patients];
    
    // Apply search filter based on selected field
    if (searchTerm) {
      filtered = filtered.filter(patient => {
        switch (searchField) {
          case 'name':
            return patient.name.toLowerCase().includes(searchTerm.toLowerCase());
          case 'mrn':
            return patient.id.includes(searchTerm);
          case 'dob':
            return patient.dob?.includes(searchTerm);
          case 'phone':
            return patient.phone?.includes(searchTerm);
          case 'email':
            return patient.email?.toLowerCase().includes(searchTerm.toLowerCase());
          default:
            return patient.name.toLowerCase().includes(searchTerm.toLowerCase());
        }
      });
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(patient => 
        patient.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    // Apply tab filters
    switch (activeTab) {
      case 'active':
        filtered = filtered.filter(patient => patient.status === 'Active');
        break;
      case 'recent':
        filtered = filtered.filter(patient => {
          const lastVisitDate = new Date(patient.lastVisit);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return lastVisitDate >= thirtyDaysAgo;
        });
        break;
      case 'upcoming':
        filtered = filtered.filter(patient => patient.upcomingAppointment !== null);
        break;
    }
    
    // Sort patients
    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [patients, searchTerm, searchField, statusFilter, sortConfig, activeTab]);

  // Handle sort change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === 'name') {
      setSortConfig({ key: 'name', direction: 'asc' });
    } else if (value === 'nameDesc') {
      setSortConfig({ key: 'name', direction: 'desc' });
    } else if (value === 'recent') {
      setSortConfig({ key: 'lastVisit', direction: 'desc' });
    } else if (value === 'oldest') {
      setSortConfig({ key: 'lastVisit', direction: 'asc' });
    }
  };

  // Navigate to patient profile
  const handlePatientClick = (patientId: string) => {
    navigate(`/doctor/patients/${patientId}/profile`);
  };

  // Handle view patient notes
  const handleViewNotes = (event: React.MouseEvent, patientId: string) => {
    event.stopPropagation();
    navigate(`/doctor/patients/${patientId}/notes`);
  };

  // Handle schedule appointment
  const handleScheduleAppointment = (event: React.MouseEvent, patientId: string) => {
    event.stopPropagation();
    navigate(`/doctor/appointments/new?patientId=${patientId}`);
  };

  return (
    <div className="container py-8">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Patient Management</CardTitle>
              <CardDescription>Search and manage your patients</CardDescription>
            </div>
            <Button onClick={() => setIsNewPatientDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> New Patient
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex gap-2">
                <select 
                  className="h-12 px-3 rounded-md border border-navy-100 bg-background focus:border-lightblue-300 focus:ring-lightblue-200"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="mrn">MRN</option>
                  <option value="dob">Date of Birth</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                </select>
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-navy-400" />
                  <Input
                    type="search"
                    placeholder={`Search by ${searchField}...`}
                    className="pl-8 py-6 border-navy-100 focus:border-lightblue-300 focus:ring-lightblue-200"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <select 
                className="w-full h-12 px-3 rounded-md border border-navy-100 bg-background focus:border-lightblue-300 focus:ring-lightblue-200"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <select 
                className="w-full h-12 px-3 rounded-md border border-navy-100 bg-background focus:border-lightblue-300 focus:ring-lightblue-200"
                onChange={handleSortChange}
                defaultValue="recent"
              >
                <option value="name">Name (A-Z)</option>
                <option value="nameDesc">Name (Z-A)</option>
                <option value="recent">Recent visit</option>
                <option value="oldest">Oldest visit</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-navy-50 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-navy-800 data-[state=active]:font-medium">
            All Patients
          </TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-white data-[state=active]:text-navy-800 data-[state=active]:font-medium">
            Active
          </TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-white data-[state=active]:text-navy-800 data-[state=active]:font-medium">
            Recently Seen
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:text-navy-800 data-[state=active]:font-medium">
            Upcoming Appointments
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          <div className="rounded-md border border-navy-100 overflow-hidden shadow-sm">
            <div className="bg-navy-50/80 p-3 grid grid-cols-12 gap-3 font-medium text-navy-700">
              <div className="col-span-4">Patient</div>
              <div className="col-span-1">Age</div>
              <div className="col-span-2">Gender</div>
              <div className="col-span-2">Last Visit</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {filteredAndSortedPatients.map((patient) => (
              <div 
                key={patient.id} 
                className="p-3 grid grid-cols-12 gap-3 items-center border-t border-navy-100 hover:bg-navy-50/30 transition-colors cursor-pointer"
                onClick={() => handlePatientClick(patient.id)}
              >
                <div className="col-span-4 flex items-center space-x-3">
                  <div className="flex h-10 w-10 rounded-full bg-lightblue-100 items-center justify-center">
                    <User className="h-5 w-5 text-lightblue-700" />
                  </div>
                  <div>
                    <div className="font-medium text-navy-800 hover:text-lightblue-600 transition-colors">
                      {patient.name}
                    </div>
                    <div className="text-sm text-navy-500">ID: {patient.id}</div>
                  </div>
                </div>
                <div className="col-span-1">{patient.age}</div>
                <div className="col-span-2">{patient.gender}</div>
                <div className="col-span-2">{new Date(patient.lastVisit).toLocaleDateString()}</div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    patient.status === 'Active' ? 'bg-lightblue-100 text-lightblue-800' : 'bg-navy-100 text-navy-800'
                  }`}>
                    {patient.status}
                  </span>
                </div>
                <div className="col-span-1 flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-navy-200 hover:bg-navy-100 hover:border-navy-300"
                    onClick={(e) => handleViewNotes(e, patient.id)}
                    title="View Patient Notes"
                  >
                    <FileText className="h-4 w-4 text-navy-700" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-navy-200 hover:bg-navy-100 hover:border-navy-300"
                    onClick={(e) => handleScheduleAppointment(e, patient.id)}
                    title="Schedule Appointment"
                  >
                    <Calendar className="h-4 w-4 text-navy-700" />
                  </Button>
                </div>
              </div>
            ))}
            
            {filteredAndSortedPatients.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-navy-500">No patients found matching your search criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <NewPatientDialog
        open={isNewPatientDialogOpen}
        onClose={() => setIsNewPatientDialogOpen(false)}
      />
    </div>
  );
};

export default DoctorPatients;
