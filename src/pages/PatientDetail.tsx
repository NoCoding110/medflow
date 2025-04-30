
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { 
  getPatientById, 
  getNotesByPatientId, 
  getAppointmentsByPatientId, 
  calculateAge,
  createNote,
} from "@/lib/data";
import { useAuth } from "@/lib/auth";
import NoteForm from "@/components/NoteForm";
import { 
  Edit, 
  Calendar, 
  Clock, 
  FileText, 
  Activity, 
  PlusCircle, 
  ChevronLeft,
  ArrowRight,
  AlertCircle
} from "lucide-react";

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showNoteForm, setShowNoteForm] = useState(false);
  
  const patient = getPatientById(id!);
  const notes = getNotesByPatientId(id!);
  const appointments = getAppointmentsByPatientId(id!);
  
  // Filter appointments into upcoming and past
  const today = new Date().toISOString().split('T')[0];
  const upcomingAppointments = appointments.filter(a => a.date >= today);
  const pastAppointments = appointments.filter(a => a.date < today);
  
  if (!patient) {
    return (
      <Layout>
        <div className="flex h-full flex-col items-center justify-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-2xl font-semibold">Patient Not Found</h2>
          <p className="mt-2 text-muted-foreground">
            The patient record you're looking for doesn't exist.
          </p>
          <Button className="mt-6" onClick={() => navigate("/patients")}>
            Return to Patient List
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleCreateNote = (noteData: any) => {
    if (user) {
      createNote({
        ...noteData,
        patientId: patient.id,
        doctorId: user.id,
        doctorName: user.name,
      });
      setShowNoteForm(false);
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        {/* Back button and actions */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <Button variant="ghost" size="sm" className="mb-2" asChild>
              <Link to="/patients" className="flex items-center">
                <ChevronLeft className="mr-1 h-4 w-4" /> Back to Patients
              </Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              {patient.firstName} {patient.lastName}
            </h1>
            <p className="text-muted-foreground">
              Patient ID: {patient.id} • {calculateAge(patient.dateOfBirth)} years old • {patient.gender}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to={`/appointments/new?patientId=${patient.id}`} className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Schedule Appointment
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to={`/patients/${patient.id}/edit`} className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                Edit Patient
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Patient summary card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Patient Information</CardTitle>
            <CardDescription>
              Basic demographic and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Demographics</h3>
                <div className="mt-2 space-y-1">
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm text-muted-foreground">Date of Birth:</span>
                    <span className="col-span-2 text-sm">
                      {new Date(patient.dateOfBirth).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm text-muted-foreground">Age:</span>
                    <span className="col-span-2 text-sm">{calculateAge(patient.dateOfBirth)} years</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm text-muted-foreground">Gender:</span>
                    <span className="col-span-2 text-sm">{patient.gender}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                <div className="mt-2 space-y-1">
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm text-muted-foreground">Email:</span>
                    <span className="col-span-2 text-sm">{patient.email || "—"}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm text-muted-foreground">Phone:</span>
                    <span className="col-span-2 text-sm">{patient.phone || "—"}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm text-muted-foreground">Address:</span>
                    <span className="col-span-2 text-sm">{patient.address || "—"}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Insurance</h3>
                <div className="mt-2 space-y-1">
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm text-muted-foreground">Provider:</span>
                    <span className="col-span-2 text-sm">{patient.insuranceProvider || "—"}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-sm text-muted-foreground">Policy #:</span>
                    <span className="col-span-2 text-sm">{patient.insuranceNumber || "—"}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Medical information */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="notes">Notes ({notes.length})</TabsTrigger>
            <TabsTrigger value="appointments">Appointments ({appointments.length})</TabsTrigger>
            <TabsTrigger value="history">Medical History</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
          </TabsList>
          
          {/* Overview tab */}
          <TabsContent value="overview" className="space-y-6 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Recent Notes */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Recent Notes</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="#" onClick={() => setShowNoteForm(true)} className="flex items-center gap-1">
                      <PlusCircle className="h-4 w-4" />
                      Add Note
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                      <h3 className="mt-3 font-medium">No Notes Yet</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Create your first note for this patient.
                      </p>
                      <Button className="mt-4" size="sm" onClick={() => setShowNoteForm(true)}>
                        Add Note
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {notes.slice(0, 3).map((note) => (
                        <div key={note.id} className="rounded-lg border p-4">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{note.title}</div>
                            <div className="rounded bg-secondary px-1.5 py-0.5 text-xs">
                              {note.type}
                            </div>
                          </div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {new Date(note.createdAt).toLocaleDateString()} by {note.doctorName}
                          </div>
                          <div className="mt-2 line-clamp-2 text-sm">
                            {note.content}
                          </div>
                        </div>
                      ))}
                      {notes.length > 3 && (
                        <Button variant="ghost" size="sm" className="w-full" asChild>
                          <Link to="#notes" className="flex items-center justify-center gap-1">
                            View all notes <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/appointments/new?patientId=${patient.id}`} className="flex items-center gap-1">
                      <PlusCircle className="h-4 w-4" />
                      Schedule
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                      <Calendar className="h-8 w-8 text-muted-foreground" />
                      <h3 className="mt-3 font-medium">No Upcoming Appointments</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Schedule an appointment for this patient.
                      </p>
                      <Button 
                        className="mt-4" 
                        size="sm" 
                        asChild
                      >
                        <Link to={`/appointments/new?patientId=${patient.id}`}>
                          Schedule Appointment
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingAppointments.slice(0, 3).map((appointment) => (
                        <div 
                          key={appointment.id} 
                          className="flex items-center justify-between rounded-lg border p-4"
                        >
                          <div>
                            <div className="font-medium">{appointment.reason}</div>
                            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>
                                {new Date(appointment.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              <span>
                                {appointment.startTime} - {appointment.endTime}
                              </span>
                            </div>
                          </div>
                          <div className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            {appointment.status}
                          </div>
                        </div>
                      ))}
                      
                      {upcomingAppointments.length > 3 && (
                        <Button variant="ghost" size="sm" className="w-full" asChild>
                          <Link to="#appointments" className="flex items-center justify-center gap-1">
                            View all appointments <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Medical History</CardTitle>
                <CardDescription>
                  Conditions, allergies, and past procedures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Conditions */}
                  <div>
                    <h3 className="mb-2 font-medium">Conditions</h3>
                    {patient.medicalHistory?.conditions?.length ? (
                      <ul className="ml-5 list-disc space-y-1">
                        {patient.medicalHistory.conditions.map((condition, idx) => (
                          <li key={idx} className="text-sm">{condition}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No conditions recorded</p>
                    )}
                  </div>
                  
                  {/* Allergies */}
                  <div>
                    <h3 className="mb-2 font-medium">Allergies</h3>
                    {patient.allergies?.length ? (
                      <ul className="ml-5 list-disc space-y-1">
                        {patient.allergies.map((allergy, idx) => (
                          <li key={idx} className="text-sm">{allergy}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No allergies recorded</p>
                    )}
                  </div>
                  
                  {/* Surgeries / Procedures */}
                  <div>
                    <h3 className="mb-2 font-medium">Procedures</h3>
                    {patient.medicalHistory?.surgeries?.length ? (
                      <ul className="ml-5 list-disc space-y-1">
                        {patient.medicalHistory.surgeries.map((surgery, idx) => (
                          <li key={idx} className="text-sm">
                            {surgery.name} ({new Date(surgery.date).toLocaleDateString()})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">No procedures recorded</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Current Medications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.medications?.length ? (
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Medication</TableHead>
                          <TableHead>Dosage</TableHead>
                          <TableHead>Frequency</TableHead>
                          <TableHead>Started</TableHead>
                          <TableHead>Prescribed By</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.medications.map((medication, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{medication.name}</TableCell>
                            <TableCell>{medication.dosage}</TableCell>
                            <TableCell>{medication.frequency}</TableCell>
                            <TableCell>{new Date(medication.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{medication.prescribedBy || "—"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <Activity className="h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-3 font-medium">No Active Medications</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      This patient has no active medications recorded.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6 pt-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Progress Notes</h2>
              <Button onClick={() => setShowNoteForm(true)}>Add Note</Button>
            </div>
            
            {notes.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No Notes Yet</h3>
                <p className="mt-2 text-muted-foreground">
                  Create your first clinical note for this patient.
                </p>
                <Button className="mt-6" onClick={() => setShowNoteForm(true)}>
                  Create Note
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {notes.map((note) => (
                  <Card key={note.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{note.title}</CardTitle>
                          <CardDescription>
                            {new Date(note.createdAt).toLocaleDateString()} at {
                              new Date(note.createdAt).toLocaleTimeString(undefined, { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })
                            } by {note.doctorName}
                          </CardDescription>
                        </div>
                        <div className="rounded bg-secondary px-2.5 py-1 text-sm font-medium">
                          {note.type}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-wrap">{note.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6 pt-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">Appointments</h2>
              <Button asChild>
                <Link to={`/appointments/new?patientId=${patient.id}`}>
                  Schedule Appointment
                </Link>
              </Button>
            </div>
            
            {/* Upcoming appointments */}
            <div>
              <h3 className="mb-4 font-medium">Upcoming Appointments</h3>
              {upcomingAppointments.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center">
                  <p className="text-muted-foreground">No upcoming appointments scheduled</p>
                  <Button className="mt-4" size="sm" asChild>
                    <Link to={`/appointments/new?patientId=${patient.id}`}>
                      Schedule Now
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{appointment.reason}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(appointment.date).toLocaleDateString()} at {appointment.startTime}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`rounded px-2.5 py-1 text-xs font-medium ${
                            appointment.status === 'Scheduled' 
                              ? 'bg-blue-50 text-blue-700' 
                              : 'bg-gray-50 text-gray-700'
                          }`}>
                            {appointment.status}
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            
            {/* Past appointments */}
            {pastAppointments.length > 0 && (
              <div>
                <Separator className="my-6" />
                <h3 className="mb-4 font-medium">Past Appointments</h3>
                <div className="space-y-4">
                  {pastAppointments.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium">{appointment.reason}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(appointment.date).toLocaleDateString()} at {appointment.startTime}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="rounded bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                            {appointment.status}
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Medical History Tab */}
          <TabsContent value="history" className="space-y-6 pt-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Medical History</h2>
              <p className="text-muted-foreground">
                Comprehensive medical history for {patient.firstName} {patient.lastName}
              </p>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Medical Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.medicalHistory?.conditions?.length ? (
                    <div className="space-y-2">
                      {patient.medicalHistory.conditions.map((condition, idx) => (
                        <div key={idx} className="rounded-lg border p-3">
                          <div className="font-medium">{condition}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center rounded-lg border border-dashed p-6 text-center">
                      <p className="text-muted-foreground">No medical conditions recorded</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Surgeries */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Surgeries & Procedures</CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.medicalHistory?.surgeries?.length ? (
                    <div className="space-y-3">
                      {patient.medicalHistory.surgeries.map((surgery, idx) => (
                        <div key={idx} className="rounded-lg border p-3">
                          <div className="font-medium">{surgery.name}</div>
                          <div className="mt-1 text-sm">
                            {new Date(surgery.date).toLocaleDateString()}
                          </div>
                          {surgery.notes && (
                            <div className="mt-2 text-sm text-muted-foreground">
                              {surgery.notes}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center rounded-lg border border-dashed p-6 text-center">
                      <p className="text-muted-foreground">No surgeries or procedures recorded</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Allergies */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Allergies</CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.allergies?.length ? (
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {patient.allergies.map((allergy, idx) => (
                        <div key={idx} className="rounded-lg border p-3">
                          <div className="font-medium">{allergy}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center rounded-lg border border-dashed p-6 text-center">
                      <p className="text-muted-foreground">No allergies recorded</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Family History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Family History</CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.medicalHistory?.familyHistory?.length ? (
                    <div className="space-y-2">
                      {patient.medicalHistory.familyHistory.map((item, idx) => (
                        <div key={idx} className="rounded-lg border p-3">
                          <div className="font-medium">{item}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center rounded-lg border border-dashed p-6 text-center">
                      <p className="text-muted-foreground">No family history recorded</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Immunizations */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Immunizations</CardTitle>
                </CardHeader>
                <CardContent>
                  {patient.medicalHistory?.immunizations?.length ? (
                    <div className="overflow-hidden rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Vaccine</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Provider</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {patient.medicalHistory.immunizations.map((immunization, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{immunization.name}</TableCell>
                              <TableCell>{new Date(immunization.date).toLocaleDateString()}</TableCell>
                              <TableCell>{immunization.provider || "—"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center rounded-lg border border-dashed p-6 text-center">
                      <p className="text-muted-foreground">No immunizations recorded</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Medications Tab */}
          <TabsContent value="medications" className="space-y-6 pt-4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Medications</h2>
              <p className="text-muted-foreground">
                Current and past medications for {patient.firstName} {patient.lastName}
              </p>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current Medications</CardTitle>
              </CardHeader>
              <CardContent>
                {patient.medications?.length ? (
                  <div className="overflow-hidden rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Medication</TableHead>
                          <TableHead>Dosage</TableHead>
                          <TableHead>Frequency</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>Prescribed By</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {patient.medications.map((medication, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{medication.name}</TableCell>
                            <TableCell>{medication.dosage}</TableCell>
                            <TableCell>{medication.frequency}</TableCell>
                            <TableCell>{new Date(medication.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{medication.prescribedBy || "—"}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center rounded-lg border border-dashed p-8 text-center">
                    <Activity className="h-8 w-8 text-muted-foreground" />
                    <h3 className="mt-4 font-medium">No Active Medications</h3>
                    <p className="mt-2 text-muted-foreground">
                      This patient has no active medications recorded.
                    </p>
                    <Button className="mt-4">Add Medication</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {showNoteForm && (
          <NoteForm 
            onSubmit={handleCreateNote}
            onCancel={() => setShowNoteForm(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default PatientDetail;
