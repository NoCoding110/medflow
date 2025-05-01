import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Microscope, 
  Upload, 
  Eye, 
  FileBarChart, 
  Layers, 
  Zap, 
  AlertTriangle,
  Download,
  Play,
  Info
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock report data
const recentReports = [
  {
    id: "1",
    title: "H&E Slide - Patient #12458",
    uploadTime: "2 hours ago",
    type: "H&E",
    patientId: "12458",
    findings: {
      diagnosis: "Invasive Ductal Carcinoma",
      grade: "Grade 2",
      tumorSize: "2.3 cm",
      margins: "Negative",
      lymphNodes: "0/3 positive",
      notes: "Moderate nuclear pleomorphism, 2-3 mitotic figures per HPF"
    }
  },
  {
    id: "2",
    title: "IHC Panel - Patient #12377",
    uploadTime: "yesterday",
    type: "IHC",
    patientId: "12377",
    findings: {
      er: "Positive (90%)",
      pr: "Positive (85%)",
      her2: "Negative (1+)",
      ki67: "20%",
      notes: "Strong and diffuse ER/PR positivity"
    }
  }
];

// Mock AI models with additional details
const aiModels = [
  {
    id: "breast",
    name: "Breast Cancer Subtyping",
    accuracy: "99%",
    description: "Classifies invasive breast cancer subtypes and grades with high precision",
    status: ["Validated", "FDA Approved"],
    details: {
      trainedOn: "100,000+ H&E slides",
      lastUpdated: "2024-03-01",
      supportedTypes: ["H&E", "IHC"],
      features: [
        "Tumor grade prediction",
        "Molecular subtype estimation",
        "Proliferation index calculation",
        "Stromal TIL assessment"
      ]
    }
  },
  {
    id: "lung",
    name: "Lung Cancer Biomarker Predictor",
    accuracy: "95%",
    description: "Predicts probable biomarkers from H&E slides before molecular testing",
    status: ["Validated"],
    details: {
      trainedOn: "50,000+ lung cancer cases",
      lastUpdated: "2024-02-15",
      supportedTypes: ["H&E"],
      features: [
        "EGFR mutation prediction",
        "PD-L1 expression estimation",
        "ALK fusion probability",
        "Tumor mutation burden prediction"
      ]
    }
  },
  {
    id: "lymph",
    name: "Lymph Node Metastasis Detection",
    accuracy: "97%",
    description: "Identifies metastatic cells in lymph node sections",
    status: ["Validated", "FDA Approved"],
    details: {
      trainedOn: "75,000+ lymph node sections",
      lastUpdated: "2024-03-10",
      supportedTypes: ["H&E", "IHC"],
      features: [
        "Micrometastasis detection",
        "Tumor cell quantification",
        "Extranodal extension assessment",
        "Size measurement automation"
      ]
    }
  }
];

const AIPathologyAnalysis = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<typeof recentReports[0] | null>(null);
  
  // Mock function to simulate analysis
  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setActiveTab('results');
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };

  // Function to handle AI model selection
  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
  };

  // Function to start analysis with selected model
  const startModelAnalysis = () => {
    if (selectedModel) {
      startAnalysis();
    }
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Pathology Analysis</h1>
          <p className="text-muted-foreground">Upload, analyze and get AI insights on pathology slides</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload Slides</TabsTrigger>
          <TabsTrigger value="viewer">Digital Viewer</TabsTrigger>
          <TabsTrigger value="results" disabled={progress < 100 && !isAnalyzing}>AI Analysis</TabsTrigger>
          <TabsTrigger value="biomarkers">Biomarkers</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4 animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Pathology Slides
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 border-2 border-dashed rounded-lg mb-4 bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer">
                  <div className="space-y-2">
                    <Microscope className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="font-medium">Drag & Drop Slide Images</h3>
                    <p className="text-sm text-muted-foreground">
                      Upload H&E, IHC, or other pathology slides<br />
                      Supported formats: SVS, TIFF, JPEG, PNG
                    </p>
                    <Button className="mt-2">
                      Select Files
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Recently Uploaded</h3>
                  {recentReports.map((report) => (
                    <Dialog key={report.id}>
                      <DialogTrigger asChild>
                        <div className="border rounded-md p-3 flex justify-between items-center hover:bg-accent/50 cursor-pointer">
                          <div>
                            <p className="font-medium">{report.title}</p>
                            <p className="text-xs text-muted-foreground">Uploaded {report.uploadTime}</p>
                          </div>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>{report.title}</DialogTitle>
                          <DialogDescription>
                            Uploaded {report.uploadTime} | Type: {report.type} | Patient ID: {report.patientId}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {report.type === 'H&E' ? (
                            <div className="space-y-2">
                              <h3 className="font-medium">Pathology Findings</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <p><span className="font-medium">Diagnosis:</span> {report.findings.diagnosis}</p>
                                  <p><span className="font-medium">Grade:</span> {report.findings.grade}</p>
                                  <p><span className="font-medium">Tumor Size:</span> {report.findings.tumorSize}</p>
                                </div>
                                <div className="space-y-2">
                                  <p><span className="font-medium">Margins:</span> {report.findings.margins}</p>
                                  <p><span className="font-medium">Lymph Nodes:</span> {report.findings.lymphNodes}</p>
                                </div>
                              </div>
                              <Separator className="my-2" />
                              <p><span className="font-medium">Notes:</span> {report.findings.notes}</p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <h3 className="font-medium">IHC Results</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <p><span className="font-medium">ER Status:</span> {report.findings.er}</p>
                                  <p><span className="font-medium">PR Status:</span> {report.findings.pr}</p>
                                </div>
                                <div className="space-y-2">
                                  <p><span className="font-medium">HER2 Status:</span> {report.findings.her2}</p>
                                  <p><span className="font-medium">Ki-67:</span> {report.findings.ki67}</p>
                                </div>
                              </div>
                              <Separator className="my-2" />
                              <p><span className="font-medium">Notes:</span> {report.findings.notes}</p>
                            </div>
                          )}
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">
                              <Eye className="mr-2 h-4 w-4" />
                              View Slide
                            </Button>
                            <Button>
                              <Download className="mr-2 h-4 w-4" />
                              Download Report
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                {isAnalyzing ? (
                  <div className="w-full space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Analyzing slide...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                ) : (
                  <Button 
                    className="w-full"
                    onClick={startAnalysis}
                    disabled={isAnalyzing || !selectedModel}
                  >
                    <FileBarChart className="mr-2 h-4 w-4" />
                    Start AI Analysis
                  </Button>
                )}
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Available AI Models
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiModels.map((model) => (
                    <Dialog key={model.id}>
                      <div className={`border rounded-lg p-4 hover:bg-muted/10 transition-colors ${
                        selectedModel === model.id ? 'ring-2 ring-primary' : ''
                      }`}>
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{model.name}</h3>
                          <Badge variant="outline">{model.accuracy} Accuracy</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground my-2">
                          {model.description}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex gap-2">
                            {model.status.map((status, index) => (
                              <Badge key={index} variant="secondary">{status}</Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Info className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                            </DialogTrigger>
                            <Button 
                              size="sm"
                              variant={selectedModel === model.id ? "default" : "outline"}
                              onClick={() => handleModelSelect(model.id)}
                            >
                              {selectedModel === model.id ? (
                                <>Selected</>
                              ) : (
                                <>
                                  <Play className="h-4 w-4 mr-1" />
                                  Use Model
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{model.name}</DialogTitle>
                          <DialogDescription>{model.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Model Information</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p><span className="font-medium">Trained On:</span> {model.details.trainedOn}</p>
                                <p><span className="font-medium">Last Updated:</span> {model.details.lastUpdated}</p>
                              </div>
                              <div>
                                <p><span className="font-medium">Supported Types:</span> {model.details.supportedTypes.join(', ')}</p>
                                <p><span className="font-medium">Accuracy:</span> {model.accuracy}</p>
                              </div>
                            </div>
                          </div>
                          <Separator />
                          <div>
                            <h4 className="font-medium mb-2">Key Features</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {model.details.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex justify-end">
                            <Button onClick={() => handleModelSelect(model.id)}>
                              Use This Model
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="viewer" className="space-y-4 animate-fade-in">
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <div className="bg-black rounded-lg h-[70vh] flex items-center justify-center relative">
                {/* This would be a canvas or specialized viewer in a real app */}
                <div className="text-white text-center">
                  <Eye className="h-12 w-12 mx-auto mb-2" />
                  <p>Digital Pathology Viewer</p>
                  <p className="text-sm text-gray-400">Select a slide to view</p>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 bg-black/70 rounded-lg p-3 flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon"><Layers className="h-4 w-4" /></Button>
                    <Button variant="outline" size="sm">10x</Button>
                    <Button variant="outline" size="sm">20x</Button>
                    <Button variant="outline" size="sm">40x</Button>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Annotate</Button>
                    <Button size="sm" variant="secondary">Share</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
                
        <TabsContent value="results" className="space-y-4 animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileBarChart className="h-5 w-5" />
                  AI Analysis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">Primary Diagnosis</h3>
                      <Badge>High Confidence</Badge>
                    </div>
                    <Separator className="my-2" />
                    <p className="font-medium">Invasive Ductal Carcinoma, Grade 2</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      The AI detected characteristic morphological patterns consistent with invasive ductal carcinoma, with moderate nuclear pleomorphism.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">Key Features</h3>
                    <Separator className="my-2" />
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span>Invasive ductal structures (detected in 23 regions)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span>Moderate nuclear pleomorphism</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>2-3 mitotic figures per HPF</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>Minimal necrosis</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">Predicted Biomarkers</h3>
                      <Badge variant="outline">AI Prediction</Badge>
                    </div>
                    <Separator className="my-2" />
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>ER Status</span>
                        <Badge>Positive (95%)</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>PR Status</span>
                        <Badge>Positive (87%)</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>HER2 Status</span>
                        <Badge variant="outline">Negative (92%)</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Ki-67 Index</span>
                        <Badge>15-20%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-between">
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    View Heatmap
                  </Button>
                  <Button>Download Report</Button>
                </div>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Treatment Implications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold">Standard of Care</h3>
                    <p className="text-sm mt-1">
                      Based on the predicted Luminal A (ER+/PR+/HER2-) phenotype, endocrine therapy would be recommended after surgery, with consideration of chemotherapy based on genomic testing.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <h3 className="font-semibold">Important Considerations</h3>
                    </div>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-foreground mt-2"></div>
                        <span>AI predictions suggest genomic testing may be beneficial to determine chemotherapy benefit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-foreground mt-2"></div>
                        <span>Features indicate low tumor heterogeneity, suggesting good response to targeted therapy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-foreground mt-2"></div>
                        <span>Recommend confirming biomarker status with IHC and FISH testing</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Clinical Trials</h3>
                    <div className="mt-2 space-y-3">
                      <div className="border rounded-md p-3">
                        <h4 className="font-medium">CDK4/6 Inhibitor + AI Therapy</h4>
                        <p className="text-xs text-muted-foreground">NCT04553770</p>
                        <div className="mt-1 flex justify-between items-center">
                          <Badge variant="outline">92% Match</Badge>
                          <Button variant="ghost" size="sm">Details</Button>
                        </div>
                      </div>
                      <div className="border rounded-md p-3">
                        <h4 className="font-medium">Novel SERDs in ER+ Breast Cancer</h4>
                        <p className="text-xs text-muted-foreground">NCT04478266</p>
                        <div className="mt-1 flex justify-between items-center">
                          <Badge variant="outline">87% Match</Badge>
                          <Button variant="ghost" size="sm">Details</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="biomarkers" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Biomarker Predictions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">The AI model predicts the following biomarkers based on image analysis:</p>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Receptor Status</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-2xl">ER+</h4>
                      <Progress value={95} className="h-2 mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">95% probability</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-2xl">PR+</h4>
                      <Progress value={87} className="h-2 mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">87% probability</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-2xl">HER2-</h4>
                      <Progress value={92} className="h-2 mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">92% probability</p>
                    </div>
                    <div className="border rounded-lg p-4 text-center">
                      <h4 className="font-semibold text-2xl">Ki-67</h4>
                      <p className="font-medium">15-20%</p>
                      <p className="text-xs text-muted-foreground mt-1">Intermediate</p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Genomic Predictions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Recurrence Score</h4>
                        <Badge>Intermediate</Badge>
                      </div>
                      <p className="text-sm mt-1">Predicted score: 18-25</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Based on morphological features associated with moderate proliferation
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Molecular Subtype</h4>
                        <Badge>Luminal A</Badge>
                      </div>
                      <p className="text-sm mt-1">ER+/PR+/HER2-, low proliferation</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Typically associated with better prognosis and response to hormonal therapy
                      </p>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">Emerging Biomarkers</h3>
                    <Badge variant="secondary">AI Research</Badge>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Tumor Microenvironment</h4>
                        <Badge variant="outline">Low Immune Infiltration</Badge>
                      </div>
                      <p className="text-sm mt-1">Limited stromal TILs detected (5-10%)</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        May suggest limited benefit from immunotherapeutic approaches
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Tumor Heterogeneity</h4>
                        <Badge variant="outline">Low</Badge>
                      </div>
                      <p className="text-sm mt-1">Consistent morphological patterns throughout sample</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Suggests uniform response to targeted therapies
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full flex justify-between">
                <Button variant="outline">Compare with Actual Results</Button>
                <Button>Order Confirmatory Testing</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIPathologyAnalysis;
