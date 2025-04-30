
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, Brain, Search, FileText, ListChecks, Activity, Database, FileBarChart } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const DoctorAIAssistant = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('assistant');

  // Example suggestions - in a real app, these would come from an AI service
  const suggestions = [
    {
      condition: "Type 2 Diabetes",
      symptoms: ["frequent urination", "increased thirst", "fatigue"],
      suggestedTreatment: "Consider Metformin as first-line treatment, along with lifestyle modifications. Recent studies show benefits of GLP-1 agonists for weight management.",
      similarCases: 15,
      recentLiterature: "NEJM 2024: Early GLP-1 agonist intervention showed 15% reduction in cardiovascular events."
    },
    {
      condition: "Hypertension",
      symptoms: ["headache", "dizziness", "shortness of breath"],
      suggestedTreatment: "ACE inhibitors or ARBs may be appropriate, monitor BP regularly. Consider SGLT2 inhibitors if comorbid with diabetes.",
      similarCases: 23,
      recentLiterature: "JAMA 2025: Combination therapy with low-dose amlodipine and ARBs showed fewer side effects."
    }
  ];

  // Sample clinical literature
  const recentLiterature = [
    {
      title: "Novel Biomarkers for Early Alzheimer's Detection",
      journal: "Nature Medicine",
      date: "April 2025",
      summary: "Plasma phosphorylated tau-217 shows 94% accuracy in detecting early-stage Alzheimer's, potentially enabling non-invasive screening."
    },
    {
      title: "Artificial Intelligence for Cardiac Risk Stratification",
      journal: "JACC",
      date: "March 2025",
      summary: "Deep learning models analyzing standard ECG data demonstrated superior risk prediction compared to traditional scoring methods."
    },
    {
      title: "SGLT2 Inhibitors in Heart Failure with Preserved Ejection Fraction",
      journal: "New England Journal of Medicine",
      date: "February 2025",
      summary: "Extended follow-up confirms mortality benefit of dapagliflozin in HFpEF patients across all NYHA classes."
    }
  ];

  // Sample patient data insights
  const patientRecordInsights = [
    { category: "Medication Adherence", status: "At Risk", details: "Patient's refill pattern suggests 60% adherence to statin therapy" },
    { category: "Lab Trends", status: "Improving", details: "HbA1c decreased from 8.2% to 7.1% over 6 months" },
    { category: "Social Determinants", status: "Needs Review", details: "Transportation issues noted; may benefit from telehealth options" }
  ];

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Medical Assistant</h1>
          <p className="text-muted-foreground">Get AI-powered insights and treatment suggestions</p>
        </div>
        <Button className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          New Analysis
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="literature">Literature</TabsTrigger>
          <TabsTrigger value="records">Patient Records</TabsTrigger>
          <TabsTrigger value="trials">Clinical Trials</TabsTrigger>
          <TabsTrigger value="imaging">Imaging AI</TabsTrigger>
        </TabsList>

        <TabsContent value="assistant" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  Ask AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Describe patient symptoms, ask for treatment suggestions, request literature summaries, or search patient records..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="min-h-[120px]"
                  />
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Search patient records</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Summarize recent literature</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Find similar cases</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Suggest treatment plan</Badge>
                  </div>
                  <Button className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Get AI Insights
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Similar Cases & Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="border-b pb-4 last:border-0">
                        <h3 className="font-semibold mb-2">{suggestion.condition}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Symptoms: {suggestion.symptoms.join(", ")}
                        </p>
                        <p className="text-sm mb-2">
                          Suggested Treatment: {suggestion.suggestedTreatment}
                        </p>
                        <p className="text-xs text-muted-foreground mb-2">
                          Found in {suggestion.similarCases} similar cases
                        </p>
                        <p className="text-xs italic border-l-2 border-primary/20 pl-2">
                          {suggestion.recentLiterature}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="literature" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Recent Medical Literature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentLiterature.map((paper, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <h3 className="font-semibold">{paper.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {paper.journal} • {paper.date}
                    </p>
                    <p className="text-sm">{paper.summary}</p>
                    <div className="mt-2 flex gap-2">
                      <Button variant="outline" size="sm">View Full Paper</Button>
                      <Button variant="ghost" size="sm">Save</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Search More Literature
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="records" className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Patient Record Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patientRecordInsights.map((insight, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{insight.category}</h3>
                      <Badge 
                        variant={
                          insight.status === "At Risk" ? "destructive" : 
                          insight.status === "Improving" ? "default" : "outline"
                        }
                      >
                        {insight.status}
                      </Badge>
                    </div>
                    <p className="text-sm">{insight.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <FileBarChart className="mr-2 h-4 w-4" />
                Full Patient History
              </Button>
              <Button>
                <ListChecks className="mr-2 h-4 w-4" />
                Generate Care Plan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="trials" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Clinical Trial Matching
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Based on the current patient profile, the following clinical trials may be suitable:</p>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">SGLT2 Inhibitor Cardiovascular Outcomes Trial</h3>
                    <Badge>95% Match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground my-2">NCT04728750 • Phase 3 • Recruiting</p>
                  <p className="text-sm mb-2">Evaluating cardiovascular outcomes in Type 2 diabetes patients with established heart disease.</p>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
                
                <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">Novel Anti-Inflammatory for Diabetic Nephropathy</h3>
                    <Badge variant="secondary">82% Match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground my-2">NCT05127318 • Phase 2 • Recruiting</p>
                  <p className="text-sm mb-2">Testing efficacy of new therapeutic in slowing progression of diabetic kidney disease.</p>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Search className="mr-2 h-4 w-4" />
                Search More Clinical Trials
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="imaging" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileBarChart className="h-5 w-5" />
                AI Imaging Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 border-2 border-dashed rounded-lg mb-4 bg-muted/20">
                <div className="space-y-2">
                  <Brain className="h-10 w-10 mx-auto text-muted-foreground" />
                  <h3 className="font-medium">Upload Medical Imaging</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or click to upload DICOM, pathology slides, or other medical images
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Upload Image
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Available AI Analysis Tools:</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="border rounded-md p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-medium">ECG Analysis</h4>
                    <p className="text-xs text-muted-foreground">Detect arrhythmias, predict cardiovascular risk</p>
                  </div>
                  <div className="border rounded-md p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-medium">Chest X-Ray Review</h4>
                    <p className="text-xs text-muted-foreground">Pneumonia, nodule detection, tuberculosis</p>
                  </div>
                  <div className="border rounded-md p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-medium">Pathology Analysis</h4>
                    <p className="text-xs text-muted-foreground">H&E slide analysis, cancer subtyping</p>
                  </div>
                  <div className="border rounded-md p-3 hover:bg-muted/50 transition-colors cursor-pointer">
                    <h4 className="font-medium">Brain MRI Assessment</h4>
                    <p className="text-xs text-muted-foreground">Stroke detection, tumor identification</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DoctorAIAssistant;
