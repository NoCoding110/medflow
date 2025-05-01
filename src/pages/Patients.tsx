import React, { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockPatients, calculateAge } from "@/lib/data";
import { Search, PlusCircle, ArrowUpDown } from "lucide-react";
import NewPatientDialog from "@/components/NewPatientDialog";
import PatientActions from "@/components/PatientActions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Patient } from "@/lib/types/patient";
import { useToast } from "@/components/ui/use-toast";

type SortConfig = {
  key: keyof Patient;
  direction: 'asc' | 'desc';
};

const Patients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'lastName', direction: 'asc' });
  const [showNewPatientDialog, setShowNewPatientDialog] = useState(false);
  const { toast } = useToast();

  const handleSort = (key: keyof Patient) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleStatusChange = (patientId: string, newStatus: 'active' | 'inactive') => {
    setPatients(currentPatients =>
      currentPatients.map(patient =>
        patient.id === patientId
          ? { ...patient, status: newStatus }
          : patient
      )
    );
    toast({
      title: "Status Updated",
      description: `Patient status has been updated to ${newStatus}`,
    });
  };

  const handleNewPatient = (patient: Patient) => {
    setPatients(currentPatients => [...currentPatients, patient]);
    setShowNewPatientDialog(false);
    toast({
      title: "Success",
      description: "New patient has been added successfully",
    });
  };

  const handlePatientClick = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  const filteredAndSortedPatients = useMemo(() => {
    return patients
      .filter(patient => {
        const matchesSearch = (
          patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.id.toString().includes(searchTerm) ||
          patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.phone?.includes(searchTerm)
        );

        const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const aValue = String(a[sortConfig.key]).toLowerCase();
        const bValue = String(b[sortConfig.key]).toLowerCase();
        
        if (sortConfig.direction === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
  }, [patients, searchTerm, statusFilter, sortConfig]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
            <p className="text-muted-foreground">
              Manage and view your patient records
            </p>
          </div>
          <div>
            <Button onClick={() => setShowNewPatientDialog(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Patients</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  className="w-[250px] cursor-pointer" 
                  onClick={() => handleSort('lastName')}
                >
                  <div className="flex items-center gap-1">
                    Name
                    {sortConfig.key === 'lastName' && (
                      <ArrowUpDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                        sortConfig.direction === 'desc' ? 'rotate-180' : ''
                      }`} />
                    )}
                  </div>
                </TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Age</TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('gender')}
                >
                  <div className="flex items-center gap-1">
                    Gender
                    {sortConfig.key === 'gender' && (
                      <ArrowUpDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                        sortConfig.direction === 'desc' ? 'rotate-180' : ''
                      }`} />
                    )}
                  </div>
                </TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-1">
                    Status
                    {sortConfig.key === 'status' && (
                      <ArrowUpDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                        sortConfig.direction === 'desc' ? 'rotate-180' : ''
                      }`} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No patients found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedPatients.map((patient) => (
                  <TableRow 
                    key={patient.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handlePatientClick(patient.id)}
                  >
                    <TableCell className="font-medium">
                      {patient.lastName}, {patient.firstName}
                    </TableCell>
                    <TableCell>
                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{calculateAge(patient.dateOfBirth)}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.phone || "—"}</TableCell>
                    <TableCell>{patient.email || "—"}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        patient.status === 'active' 
                          ? 'bg-green-50 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {patient.status || 'active'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <PatientActions 
                        patientId={patient.id} 
                        onStatusChange={handleStatusChange}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <NewPatientDialog 
        open={showNewPatientDialog} 
        onClose={() => setShowNewPatientDialog(false)}
        onSubmit={handleNewPatient}
      />
    </Layout>
  );
};

export default Patients;
