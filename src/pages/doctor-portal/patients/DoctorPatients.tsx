
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Plus, User, Calendar, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.includes(searchTerm)
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1 text-navy-800">Patient Management</h1>
          <div className="w-16 h-1 bg-lightblue-400 rounded-full"></div>
        </div>
        <Button className="bg-lightblue-600 hover:bg-lightblue-700 text-white mt-4 sm:mt-0 btn-hover-glow">
          <Plus className="mr-2 h-4 w-4" /> Add New Patient
        </Button>
      </div>
      
      <Card className="mb-8 border-navy-100 shadow-sm">
        <CardHeader className="pb-3 bg-navy-50/50">
          <CardTitle className="text-navy-700 font-display">Patient Search</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-navy-400" />
                <Input
                  type="search"
                  placeholder="Search by name, ID, or condition..."
                  className="pl-8 py-6 border-navy-100 focus:border-lightblue-300 focus:ring-lightblue-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <select className="w-full h-12 px-3 rounded-md border border-navy-100 bg-background focus:border-lightblue-300 focus:ring-lightblue-200">
                <option value="">Filter by status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <select className="w-full h-12 px-3 rounded-md border border-navy-100 bg-background focus:border-lightblue-300 focus:ring-lightblue-200">
                <option value="">Sort by</option>
                <option value="name">Name (A-Z)</option>
                <option value="nameDesc">Name (Z-A)</option>
                <option value="recent">Recent visit</option>
                <option value="oldest">Oldest visit</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-navy-50 p-1">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-navy-800 data-[state=active]:font-medium">All Patients</TabsTrigger>
          <TabsTrigger value="active" className="data-[state=active]:bg-white data-[state=active]:text-navy-800 data-[state=active]:font-medium">Active</TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-white data-[state=active]:text-navy-800 data-[state=active]:font-medium">Recently Seen</TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-white data-[state=active]:text-navy-800 data-[state=active]:font-medium">Upcoming Appointments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="rounded-md border border-navy-100 overflow-hidden shadow-sm">
            <div className="bg-navy-50/80 p-3 grid grid-cols-12 gap-3 font-medium text-navy-700">
              <div className="col-span-4">Patient</div>
              <div className="col-span-1">Age</div>
              <div className="col-span-2">Gender</div>
              <div className="col-span-2">Last Visit</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {filteredPatients.map((patient) => (
              <div key={patient.id} className="p-3 grid grid-cols-12 gap-3 items-center border-t border-navy-100 hover:bg-navy-50/30 transition-colors">
                <div className="col-span-4 flex items-center space-x-3">
                  <div className="flex h-10 w-10 rounded-full bg-lightblue-100 items-center justify-center">
                    <User className="h-5 w-5 text-lightblue-700" />
                  </div>
                  <div>
                    <div className="font-medium text-navy-800">{patient.name}</div>
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
                  <Link to={`/doctor/patients/${patient.id}`}>
                    <Button variant="outline" size="icon" className="h-8 w-8 border-navy-200 hover:bg-navy-100 hover:border-navy-300">
                      <FileText className="h-4 w-4 text-navy-700" />
                    </Button>
                  </Link>
                  <Link to={`/doctor/appointments/new?patientId=${patient.id}`}>
                    <Button variant="outline" size="icon" className="h-8 w-8 border-navy-200 hover:bg-navy-100 hover:border-navy-300">
                      <Calendar className="h-4 w-4 text-navy-700" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            
            {filteredPatients.length === 0 && (
              <div className="p-8 text-center">
                <p className="text-navy-500">No patients found matching your search criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          <div className="rounded-md border border-navy-100 overflow-hidden">
            {/* Similar content as "all" tab but filtered for active patients */}
            <div className="p-8 text-center">
              <p className="text-navy-500">Active patients list would display here.</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <div className="rounded-md border border-navy-100 overflow-hidden">
            {/* Similar content as "all" tab but filtered for recently seen patients */}
            <div className="p-8 text-center">
              <p className="text-navy-500">Recently seen patients list would display here.</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4">
          <div className="rounded-md border border-navy-100 overflow-hidden">
            {/* Similar content as "all" tab but filtered for patients with upcoming appointments */}
            <div className="p-8 text-center">
              <p className="text-navy-500">Patients with upcoming appointments would display here.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorPatients;
