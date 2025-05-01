import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Pill, AlertTriangle, CheckCircle, Send, FileText, Filter, Download, MoreVertical, Star, History, BarChart, Clock, Calendar, User, Printer, Copy, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-hot-toast";

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
    interactionWarnings: [],
    lastFilled: "2025-04-26",
    nextRefillDate: "2025-05-26",
    adherence: 95,
    isFavorite: true
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

// Common medications data with additional information
const commonMedications = [
  { 
    name: "Lisinopril", 
    category: "Antihypertensive",
    commonDosages: ["5mg", "10mg", "20mg", "40mg"],
    typicalFrequency: ["Once daily"],
    commonDuration: ["30 days", "90 days"],
    sideEffects: ["Dizziness", "Cough", "Headache"],
    contraindications: ["Pregnancy", "Angioedema history"]
  },
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

// Add pharmacy data with additional information
const pharmacies = [
  { 
    id: "1", 
    name: "CVS Pharmacy", 
    address: "123 Main St", 
    phone: "555-0123",
    hours: "24/7",
    acceptsEprescriptions: true,
    preferred: true
  },
  { id: "2", name: "Walgreens", address: "456 Oak Ave", phone: "555-0124" },
  { id: "3", name: "Rite Aid", address: "789 Pine Rd", phone: "555-0125" }
];

// Add prescription templates
const prescriptionTemplates = [
  {
    id: "1",
    name: "Standard Hypertension",
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "30 days",
        instructions: "Take with food in the morning."
      }
    ],
    conditions: ["Hypertension"],
    isFavorite: true
  },
  // Add more templates...
];

// Update the drug interaction database with severity levels that match Badge variants
const drugInteractions = {
  "Lisinopril": [
    { drug: "Potassium supplements", severity: "secondary", description: "May increase potassium levels" },
    { drug: "NSAIDs", severity: "secondary", description: "May reduce blood pressure lowering effect" },
    { drug: "Lithium", severity: "destructive", description: "May increase lithium levels" }
  ],
  "Atorvastatin": ["Grapefruit juice", "Clarithromycin", "Cyclosporine"],
  "Metformin": ["Contrast media", "Alcohol", "Cimetidine"],
  "Levothyroxine": ["Iron supplements", "Calcium supplements", "Soy products"],
  "Omeprazole": ["Iron supplements", "Vitamin B12", "Clopidogrel"]
};

const DoctorPrescriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState("");
  const [selectedPharmacy, setSelectedPharmacy] = useState("");
  const [showInteractions, setShowInteractions] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });
  const [filterConfig, setFilterConfig] = useState({
    status: "all",
    pharmacy: "all",
    dateRange: "all",
    refills: "all"
  });
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);
  
  const [prescriptionDetails, setPrescriptionDetails] = useState({
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    refills: "0",
    startDate: "",
    endDate: "",
    quantity: "",
    route: "oral",
    specialInstructions: ""
  });

  // Filter and sort prescriptions
  const filteredAndSortedPrescriptions = useMemo(() => {
    let filtered = [...prescriptions];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(prescription => 
        prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prescription.patientId.includes(searchTerm)
      );
    }
    
    // Apply status filter
    if (filterConfig.status !== "all") {
      filtered = filtered.filter(prescription => 
        prescription.status.toLowerCase() === filterConfig.status.toLowerCase()
      );
    }
    
    // Apply pharmacy filter
    if (filterConfig.pharmacy !== "all") {
      filtered = filtered.filter(prescription => 
        prescription.pharmacy.toLowerCase() === filterConfig.pharmacy.toLowerCase()
      );
    }
    
    // Apply date range filter
    if (filterConfig.dateRange !== "all") {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      const ninetyDaysAgo = new Date(now.setDate(now.getDate() - 90));
      
      filtered = filtered.filter(prescription => {
        const prescriptionDate = new Date(prescription.date);
        switch (filterConfig.dateRange) {
          case "30d":
            return prescriptionDate >= thirtyDaysAgo;
          case "90d":
            return prescriptionDate >= ninetyDaysAgo;
          default:
            return true;
        }
      });
    }
    
    // Apply refills filter
    if (filterConfig.refills !== "all") {
      filtered = filtered.filter(prescription => {
        switch (filterConfig.refills) {
          case "available":
            return prescription.refillsRemaining > 0;
          case "none":
            return prescription.refillsRemaining === 0;
          default:
            return true;
        }
      });
    }
    
    // Sort prescriptions
    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [prescriptions, searchTerm, filterConfig, sortConfig]);

  // Filter medications for search
  const filteredMedications = useMemo(() => {
    return commonMedications.filter(medication =>
      medication.name.toLowerCase().includes(selectedMedication.toLowerCase())
    );
  }, [selectedMedication]);

  // Calculate prescription statistics
  const prescriptionStats = useMemo(() => {
    const total = prescriptions.length;
    const active = prescriptions.filter(p => p.status === "Active").length;
    const pendingRefills = prescriptions.filter(p => p.refillsRemaining > 0).length;
    const adherence = prescriptions.reduce((acc, p) => acc + p.adherence, 0) / total;
    
    return {
      total,
      active,
      pendingRefills,
      adherence
    };
  }, [prescriptions]);

  const handlePrescriptionSubmit = () => {
    // Check for drug interactions
    const interactions = drugInteractions[selectedMedication] || [];
    if (interactions.length > 0) {
      setShowInteractions(true);
      return;
    }

    // Submit prescription
    const newPrescription = {
      id: (prescriptions.length + 1).toString(),
      patientName: prescriptions.find(p => p.patientId === selectedPatient)?.patientName || "",
      patientId: selectedPatient,
      medication: selectedMedication,
      dosage: prescriptionDetails.dosage,
      frequency: prescriptionDetails.frequency,
      duration: prescriptionDetails.duration,
      date: new Date().toISOString().split('T')[0],
      status: "Active",
      pharmacy: pharmacies.find(p => p.id === selectedPharmacy)?.name || "",
      refillsRemaining: parseInt(prescriptionDetails.refills),
      prescriberName: "Dr. Sarah Johnson",
      notes: prescriptionDetails.instructions,
      interactionWarnings: [],
      lastFilled: new Date().toISOString().split('T')[0],
      nextRefillDate: calculateNextRefillDate(prescriptionDetails.duration),
      adherence: 100,
      isFavorite: false
    };

    // Add to prescriptions list
    prescriptions.unshift(newPrescription);
    setShowNewPrescription(false);
    toast.success("Prescription sent successfully");
  };

  const calculateNextRefillDate = (duration: string) => {
    const days = parseInt(duration);
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + days);
    return nextDate.toISOString().split('T')[0];
  };

  const handleTemplateSelect = (templateId: string) => {
    const template = prescriptionTemplates.find(t => t.id === templateId);
    if (template) {
      const medication = template.medications[0];
      setSelectedMedication(medication.name);
      setPrescriptionDetails({
        ...prescriptionDetails,
        dosage: medication.dosage,
        frequency: medication.frequency,
        duration: medication.duration,
        instructions: medication.instructions
      });
    }
    setShowTemplates(false);
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">E-Prescriptions</h1>
          <p className="text-muted-foreground">Manage and track patient prescriptions</p>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0">
          <Button variant="outline" onClick={() => setShowAnalytics(true)}>
            <BarChart className="mr-2 h-4 w-4" /> Analytics
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => setShowNewPrescription(true)}
          >
            <Plus className="mr-2 h-4 w-4" /> New Prescription
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Prescriptions</p>
                <h3 className="text-2xl font-bold">{prescriptionStats.total}</h3>
              </div>
              <Pill className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <h3 className="text-2xl font-bold">{prescriptionStats.active}</h3>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Refills</p>
                <h3 className="text-2xl font-bold">{prescriptionStats.pendingRefills}</h3>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Adherence Rate</p>
                <h3 className="text-2xl font-bold">{prescriptionStats.adherence.toFixed(1)}%</h3>
              </div>
              <BarChart className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {showNewPrescription && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Create New Prescription</CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowTemplates(true)}>
                  <FileText className="mr-2 h-4 w-4" /> Templates
                </Button>
                <Button variant="outline" onClick={() => setShowNewPrescription(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1">Patient</label>
                  <select 
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={selectedPatient}
                    onChange={(e) => setSelectedPatient(e.target.value)}
                  >
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
                          <div className="flex items-center justify-between">
                            <div>
                              <div>{medication.name}</div>
                              <div className="text-xs text-muted-foreground">{medication.category}</div>
                            </div>
                            <Star className="h-4 w-4 text-yellow-500" />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Common dosages: {medication.commonDosages.join(", ")}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">Pharmacy</label>
                  <select 
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={selectedPharmacy}
                    onChange={(e) => setSelectedPharmacy(e.target.value)}
                  >
                    <option value="">Select a pharmacy</option>
                    {pharmacies.map(pharmacy => (
                      <option key={pharmacy.id} value={pharmacy.id}>
                        {pharmacy.name} - {pharmacy.address}
                        {pharmacy.preferred && " (Preferred)"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Dosage</label>
                    <select 
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      value={prescriptionDetails.dosage}
                      onChange={(e) => setPrescriptionDetails(prev => ({...prev, dosage: e.target.value}))}
                    >
                      <option value="">Select dosage</option>
                      {commonMedications
                        .find(m => m.name === selectedMedication)
                        ?.commonDosages.map(dosage => (
                          <option key={dosage} value={dosage}>{dosage}</option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Frequency</label>
                    <select 
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      value={prescriptionDetails.frequency}
                      onChange={(e) => setPrescriptionDetails(prev => ({...prev, frequency: e.target.value}))}
                    >
                      <option value="">Select frequency</option>
                      <option value="once">Once daily</option>
                      <option value="twice">Twice daily</option>
                      <option value="three">Three times daily</option>
                      <option value="four">Four times daily</option>
                      <option value="as_needed">As needed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Duration</label>
                    <select 
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      value={prescriptionDetails.duration}
                      onChange={(e) => setPrescriptionDetails(prev => ({...prev, duration: e.target.value}))}
                    >
                      <option value="">Select duration</option>
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Refills</label>
                    <Input 
                      type="number" 
                      min="0"
                      max="11"
                      value={prescriptionDetails.refills}
                      onChange={(e) => setPrescriptionDetails(prev => ({...prev, refills: e.target.value}))}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium block mb-1">Special Instructions</label>
                  <textarea 
                    className="w-full min-h-[100px] p-2 rounded-md border border-input bg-background" 
                    placeholder="Enter any special instructions or notes..."
                    value={prescriptionDetails.instructions}
                    onChange={(e) => setPrescriptionDetails(prev => ({...prev, instructions: e.target.value}))}
                  ></textarea>
                </div>

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewPrescription(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handlePrescriptionSubmit}>
                    <Send className="mr-2 h-4 w-4" /> Send Prescription
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Drug Interactions Dialog */}
      <Dialog open={showInteractions} onOpenChange={setShowInteractions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Drug Interaction Warning</DialogTitle>
            <DialogDescription>
              The following potential interactions were found for {selectedMedication}:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {drugInteractions[selectedMedication]?.map((interaction, index) => (
              <div key={index} className="p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={`h-4 w-4 ${
                    interaction.severity === "destructive" ? "text-red-600" :
                    interaction.severity === "secondary" ? "text-yellow-600" :
                    "text-blue-600"
                  }`} />
                  <span className="font-medium">{interaction.drug}</span>
                  <Badge variant={interaction.severity}>
                    {interaction.severity === "destructive" ? "Major" :
                     interaction.severity === "secondary" ? "Moderate" :
                     "Minor"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{interaction.description}</p>
              </div>
            ))}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowInteractions(false)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => {
                  setShowInteractions(false);
                  handlePrescriptionSubmit();
                }}
              >
                Proceed Anyway
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Prescription Templates Dialog */}
      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prescription Templates</DialogTitle>
            <DialogDescription>
              Select a template to quickly create a prescription
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {prescriptionTemplates.map(template => (
              <div 
                key={template.id}
                className="p-3 border rounded-md hover:bg-muted cursor-pointer"
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{template.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {template.medications.map(m => m.name).join(", ")}
                    </p>
                  </div>
                  {template.isFavorite && (
                    <Star className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <div className="mt-2">
                  <Badge variant="outline">{template.conditions.join(", ")}</Badge>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      
      <Tabs defaultValue="active" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="active">Active Prescriptions</TabsTrigger>
            <TabsTrigger value="history">Prescription History</TabsTrigger>
            <TabsTrigger value="pending">Pending Refills</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <select 
              className="h-10 px-3 rounded-md border border-input bg-background"
              value={filterConfig.status}
              onChange={(e) => setFilterConfig(prev => ({...prev, status: e.target.value}))}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select 
              className="h-10 px-3 rounded-md border border-input bg-background"
              value={filterConfig.dateRange}
              onChange={(e) => setFilterConfig(prev => ({...prev, dateRange: e.target.value}))}
            >
              <option value="all">All Time</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <TabsContent value={activeTab} className="space-y-4">
          {viewMode === "list" ? (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Active Prescriptions</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                  </div>
                </div>
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
                  
                  {filteredAndSortedPrescriptions.map((prescription) => (
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
                      <div className="col-span-2">
                        <div>{new Date(prescription.date).toLocaleDateString()}</div>
                        <div className="text-xs text-muted-foreground">
                          Next refill: {new Date(prescription.nextRefillDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant={prescription.status === "Active" ? "default" : "secondary"}>
                            {prescription.status}
                          </Badge>
                          {prescription.isFavorite && (
                            <Star className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {prescription.refillsRemaining} refills remaining
                        </div>
                        <div className="mt-1">
                          <Progress value={prescription.adherence} className="h-1" />
                          <span className="text-xs text-muted-foreground">
                            Adherence: {prescription.adherence}%
                          </span>
                        </div>
                      </div>
                      <div className="col-span-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Prescription
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Star className="mr-2 h-4 w-4" />
                              Add to Favorites
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Cancel Prescription
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                  
                  {filteredAndSortedPrescriptions.length === 0 && (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No prescriptions found matching your search criteria.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAndSortedPrescriptions.map((prescription) => (
                <Card
                  key={prescription.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 rounded-full bg-purple-100 items-center justify-center">
                          <User className="h-5 w-5 text-purple-700" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{prescription.patientName}</CardTitle>
                          <CardDescription>ID: {prescription.patientId}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={prescription.status === "Active" ? "default" : "secondary"}>
                        {prescription.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Pill className="h-4 w-4 text-purple-600" />
                        <span className="font-medium">{prescription.medication}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Dosage</span>
                          <p>{prescription.dosage}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Frequency</span>
                          <p>{prescription.frequency}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Filled</span>
                          <p>{new Date(prescription.lastFilled).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Next Refill</span>
                          <p>{new Date(prescription.nextRefillDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Adherence</span>
                          <span className="text-sm font-medium">{prescription.adherence}%</span>
                        </div>
                        <Progress value={prescription.adherence} className="h-1" />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Analytics Dialog */}
      <Dialog open={showAnalytics} onOpenChange={setShowAnalytics}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Prescription Analytics</DialogTitle>
            <DialogDescription>
              View prescription statistics and trends
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Prescription Trends</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add prescription trends chart here */}
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Prescription trends chart will be displayed here
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Medication Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add medication distribution chart here */}
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Medication distribution chart will be displayed here
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Adherence Rates</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add adherence rates chart here */}
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Adherence rates chart will be displayed here
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Refill Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add refill patterns chart here */}
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Refill patterns chart will be displayed here
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorPrescriptions;
