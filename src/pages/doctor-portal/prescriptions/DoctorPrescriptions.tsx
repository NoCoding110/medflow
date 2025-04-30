
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pill, AlertTriangle, CheckCircle, Send, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample prescriptions data
const prescriptions = [
  {
    id: "1",
    patientName: "John Smith",
    patientId: "12345",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "30 days",
    date: "2025-04-26",
    status: "Active",
    pharmacy: "CVS Pharmacy",
    refillsRemaining: 2,
    prescriberName: "Dr. Sarah Johnson",
    notes: "Take with food in the morning.",
    interactionWarnings: []
  },
  {
    id: "2",
    patientName: "Emily Johnson",
    patientId: "23456",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    duration: "90 days",
    date: "2025-04-20",
    status: "Active",
    pharmacy: "Walgreens",
    refillsRemaining: 3,
    prescriberName: "Dr. Sarah Johnson",
    notes: "Take with meals.",
    interactionWarnings: []
  },
  {
    id: "3",
    patientName: "Michael Brown",
    patientId: "34567",
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    duration: "30 days",
    date: "2025-04-18",
    status: "Active",
    pharmacy: "CVS Pharmacy",
    refillsRemaining: 2,
    prescriberName: "Dr. Sarah Johnson",
    notes: "Take at bedtime.",
    interactionWarnings: [
      { severity: "Moderate", description: "Potential interaction with Clarithromycin" }
    ]
  },
  {
    id: "4",
    patientName: "Sarah Davis",
    patientId: "45678",
    medication: "Amoxicillin",
    dosage: "500mg",
    frequency: "Three times daily",
    duration: "10 days",
    date: "2025-04-25",
    status: "Active",
    pharmacy: "Rite Aid",
    refillsRemaining: 0,
    prescriberName: "Dr. Sarah Johnson",
    notes: "Take until completed.",
    interactionWarnings: []
  },
  {
    id: "5",
    patientName: "Robert Wilson",
    patientId: "56789",
    medication: "Prednisone",
    dosage: "10mg",
    frequency: "Once daily",
    duration: "7 days",
    date: "2025-04-22",
    status: "Active",
    pharmacy: "Walgreens",
    refillsRemaining: 0,
    prescriberName: "Dr. Sarah Johnson",
    notes: "Taper as directed.",
    interactionWarnings: [
      { severity: "Minor", description: "Potential interaction with NSAID medications" }
    ]
  },
  {
    id: "6",
    patientName: "Jennifer Martinez",
    patientId: "67890",
    medication: "Levothyroxine",
    dosage: "50mcg",
    frequency: "Once daily",
    duration: "90 days",
    date: "2025-04-15",
    status: "Active",
    pharmacy: "CVS Pharmacy",
    refillsRemaining: 3,
    prescriberName: "Dr. Sarah Johnson",
    notes: "Take on empty stomach.",
    interactionWarnings: []
  }
];

// Common medications data
const commonMedications = [
  { name: "Lisinopril", category: "Antihypertensive" },
  { name: "Atorvastatin", category: "Statin" },
  { name: "Metformin", category: "Antidiabetic" },
  { name: "Levothyroxine", category: "Thyroid" },
  { name: "Omeprazole", category: "Proton Pump Inhibitor" },
  { name: "Amlodipine", category: "Calcium Channel Blocker" },
  { name: "Metoprolol", category: "Beta Blocker" },
  { name: "Losartan", category: "Angiotensin Receptor Blocker" },
  { name: "Sertraline", category: "SSRI" },
  { name: "Gabapentin", category: "Anticonvulsant" },
];

const DoctorPrescriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState("");
  
  const filteredPrescriptions = prescriptions.filter(prescription => 
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.patientId.includes(searchTerm)
  );

  const filteredMedications = commonMedications.filter(medication =>
    medication.name.toLowerCase().includes(selectedMedication.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">E-Prescriptions</h1>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setShowNewPrescription(!showNewPrescription)}
        >
          <Plus className="mr-2 h-4 w-4" /> New Prescription
        </Button>
      </div>
      
      {showNewPrescription && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Prescription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Patient</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option value="">Select a patient</option>
                    {prescriptions.map(p => (
                      <option key={p.patientId} value={p.patientId}>{p.patientName}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">Medication</label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search medications..."
                      className="pl-8"
                      value={selectedMedication}
                      onChange={(e) => setSelectedMedication(e.target.value)}
                    />
                  </div>
                  
                  {selectedMedication && (
                    <div className="mt-2 border rounded-md max-h-40 overflow-y-auto">
                      {filteredMedications.map((medication, index) => (
                        <div 
                          key={index} 
                          className="p-2 hover:bg-muted cursor-pointer border-b last:border-0"
                          onClick={() => setSelectedMedication(medication.name)}
                        >
                          <div>{medication.name}</div>
                          <div className="text-xs text-muted-foreground">{medication.category}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Dosage</label>
                    <Input type="text" placeholder="e.g., 10mg" />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Frequency</label>
                    <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                      <option value="">Select frequency</option>
                      <option value="once">Once daily</option>
                      <option value="twice">Twice daily</option>
                      <option value="three">Three times daily</option>
                      <option value="four">Four times daily</option>
                      <option value="as_needed">As needed</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Duration</label>
                    <div className="flex items-center gap-2">
                      <Input type="number" placeholder="30" className="flex-1" />
                      <select className="h-10 px-3 rounded-md border border-input bg-background w-24">
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Refills</label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium block mb-1">Pharmacy</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option value="">Select pharmacy</option>
                    <option value="cvs">CVS Pharmacy</option>
                    <option value="walgreens">Walgreens</option>
                    <option value="riteaid">Rite Aid</option>
                    <option value="walmart">Walmart Pharmacy</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Special Instructions</label>
                  <textarea 
                    className="w-full min-h-[100px] p-2 rounded-md border border-input bg-background" 
                    placeholder="Enter any special instructions or notes..."
                  ></textarea>
                </div>
                
                <div className="border rounded-md p-4 bg-yellow-50">
                  <div className="flex items-center mb-2 text-yellow-700">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    <h3 className="font-semibold">Interaction Check</h3>
                  </div>
                  
                  <div className="text-sm">
                    {selectedMedication ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        No significant interactions found for {selectedMedication}
                      </div>
                    ) : (
                      <p className="text-gray-500">Select a medication to check for interactions.</p>
                    )}
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-semibold mb-2">Patient Allergies & Conditions</h3>
                  <p className="text-sm text-gray-600">Select a patient to view their allergies and conditions.</p>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setShowNewPrescription(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Send className="mr-2 h-4 w-4" /> Send to Pharmacy
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Prescriptions</TabsTrigger>
          <TabsTrigger value="history">Prescription History</TabsTrigger>
          <TabsTrigger value="pending">Pending Refills</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Active Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by patient name or medication..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="rounded-md border">
                <div className="bg-muted/50 p-3 grid grid-cols-12 gap-3 font-medium">
                  <div className="col-span-3">Patient</div>
                  <div className="col-span-2">Medication</div>
                  <div className="col-span-2">Dosage/Frequency</div>
                  <div className="col-span-2">Date Prescribed</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1">Actions</div>
                </div>
                
                {filteredPrescriptions.map((prescription) => (
                  <div key={prescription.id} className="p-3 grid grid-cols-12 gap-3 items-center border-t">
                    <div className="col-span-3">
                      <div className="font-medium">{prescription.patientName}</div>
                      <div className="text-xs text-muted-foreground">ID: {prescription.patientId}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center">
                        <Pill className="h-4 w-4 mr-2 text-purple-600" />
                        {prescription.medication}
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div>{prescription.dosage}</div>
                      <div className="text-xs text-muted-foreground">{prescription.frequency}</div>
                    </div>
                    <div className="col-span-2">{new Date(prescription.date).toLocaleDateString()}</div>
                    <div className="col-span-2">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                        {prescription.status}
                      </span>
                      <div className="text-xs text-muted-foreground mt-1">{prescription.refillsRemaining} refills remaining</div>
                    </div>
                    <div className="col-span-1">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {filteredPrescriptions.length === 0 && (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No prescriptions found matching your search criteria.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Prescription History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-muted-foreground">Prescription history would be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Refill Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-8 text-center">
                <p className="text-muted-foreground">No pending refill requests.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorPrescriptions;
