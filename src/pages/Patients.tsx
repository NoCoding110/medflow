import React, { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
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

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Patient>("lastName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [showNewPatientDialog, setShowNewPatientDialog] = useState(false);
  const { toast } = useToast();

  const handleSort = (field: keyof Patient) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleStatusChange = (patientId: string, newStatus: 'active' | 'inactive') => {
    setPatients(currentPatients =>
      currentPatients.map(patient =>
        patient.id === patientId
          ? { ...patient, status: newStatus }
          : patient
      )
    );
  };

  const handleNewPatient = (patient: Patient) => {
    setPatients(currentPatients => [...currentPatients, patient]);
    setShowNewPatientDialog(false);
    toast({
      title: "Success",
      description: "New patient has been added successfully",
    });
  };

  const filteredPatients = useMemo(() => {
    return patients
      .filter((patient) => {
        // Apply search filter
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = fullName.includes(searchLower) ||
          patient.email?.toLowerCase().includes(searchLower) ||
          patient.phone?.includes(searchTerm);

        // Apply status filter
        if (statusFilter === "all") return matchesSearch;
        const isActive = !patient.status || patient.status === "active";
        return matchesSearch && (
          (statusFilter === "active" && isActive) ||
          (statusFilter === "inactive" && !isActive)
        );
      })
      .sort((a, b) => {
        const aValue = a[sortField]?.toString().toLowerCase() || "";
        const bValue = b[sortField]?.toString().toLowerCase() || "";
        
        if (sortDirection === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
  }, [patients, searchTerm, statusFilter, sortField, sortDirection]);

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
          <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
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
                  onClick={() => handleSort("lastName")}
                >
                  <div className="flex items-center gap-1">
                    Name
                    {sortField === "lastName" && (
                      <ArrowUpDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                        sortDirection === "desc" ? "rotate-180" : ""
                      }`} />
                    )}
                  </div>
                </TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Age</TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("gender")}
                >
                  <div className="flex items-center gap-1">
                    Gender
                    {sortField === "gender" && (
                      <ArrowUpDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                        sortDirection === "desc" ? "rotate-180" : ""
                      }`} />
                    )}
                  </div>
                </TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
                <TableHead 
                  className="cursor-pointer"
                  onClick={() => handleSort("insuranceProvider")}
                >
                  <div className="flex items-center gap-1">
                    Insurance
                    {sortField === "insuranceProvider" && (
                      <ArrowUpDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${
                        sortDirection === "desc" ? "rotate-180" : ""
                      }`} />
                    )}
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No patients found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      <Link
                        to={`/patients/${patient.id}`}
                        className="hover:text-primary hover:underline"
                      >
                        {patient.lastName}, {patient.firstName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{calculateAge(patient.dateOfBirth)}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.phone || "—"}</TableCell>
                    <TableCell>{patient.email || "—"}</TableCell>
                    <TableCell>{patient.insuranceProvider || "—"}</TableCell>
                    <TableCell className="text-right">
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
