
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Search, FileBarChart, Download, Users, Filter, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const RealWorldDataPlatform = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast({
        variant: "destructive",
        title: "Search term required",
        description: "Please enter a search term to continue."
      });
      return;
    }
    
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
      toast({
        title: "Search Complete",
        description: `Found 24 results for "${searchTerm}"`
      });
    }, 1500);
  };
  
  const handleExportData = () => {
    toast({
      title: "Export Initiated",
      description: "Your data export is being prepared and will be available shortly."
    });
  };

  // Mock datasets
  const datasets = [
    { id: 1, name: "Cardiovascular Outcomes Study", patients: 25000, years: "2015-2023", description: "Long-term study of cardiovascular outcomes in patients with hypertension" },
    { id: 2, name: "Diabetes Treatment Comparative Analysis", patients: 12500, years: "2018-2023", description: "Comparison of treatment efficacy across different diabetes medications" },
    { id: 3, name: "Psychiatric Medication Safety Database", patients: 18000, years: "2016-2023", description: "Safety profiles of psychiatric medications in real-world usage" },
    { id: 4, name: "Oncology Treatment Response Registry", patients: 8500, years: "2019-2023", description: "Patient responses to various cancer treatment protocols" },
  ];
  
  // Mock recent searches
  const recentSearches = [
    "statin efficacy elderly patients",
    "diabetes complications by treatment",
    "antidepressant discontinuation",
    "post-surgical recovery time knee replacement"
  ];

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Real-World Data Platform</h1>
        <p className="text-muted-foreground">Access de-identified patient datasets for research and analysis</p>
      </div>

      <Tabs defaultValue="search">
        <TabsList className="mb-6">
          <TabsTrigger value="search">Data Search</TabsTrigger>
          <TabsTrigger value="datasets">Available Datasets</TabsTrigger>
          <TabsTrigger value="cohort">Cohort Builder</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-purple-500" />
                Search Real-World Data
              </CardTitle>
              <CardDescription>
                Search across de-identified patient data to discover insights and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search clinical data (e.g., 'statin efficacy in elderly patients')"
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearch();
                    }}
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></div>
                      Searching...
                    </>
                  ) : "Search"}
                </Button>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Recent Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSearchTerm(search);
                        handleSearch();
                      }}
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Advanced Filters</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Patient Age Range</label>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Min" type="number" className="w-20" />
                      <span>to</span>
                      <Input placeholder="Max" type="number" className="w-20" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Data Date Range</label>
                    <div className="flex items-center gap-2">
                      <Input placeholder="From" type="date" />
                      <span>to</span>
                      <Input placeholder="To" type="date" />
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  <Filter className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                De-identified patient data matching your search criteria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                <div className="text-center">
                  <Search className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Enter a search term to view results</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="datasets">
          <div className="grid gap-6">
            {datasets.map(dataset => (
              <Card key={dataset.id}>
                <CardHeader>
                  <CardTitle>{dataset.name}</CardTitle>
                  <CardDescription>
                    {dataset.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span><strong>{dataset.patients.toLocaleString()}</strong> patients</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span><strong>{dataset.years}</strong></span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Search className="mr-2 h-4 w-4" />
                      Explore Data
                    </Button>
                    <Button>
                      <Download className="mr-2 h-4 w-4" />
                      Access Dataset
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="cohort">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-purple-500" />
                Cohort Builder
              </CardTitle>
              <CardDescription>
                Create custom patient cohorts for analysis and research
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-3">Define Cohort Criteria</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Diagnosis (ICD-10)</label>
                      <Input placeholder="E.g., I21.3 (STEMI)" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Medication</label>
                      <Input placeholder="E.g., atorvastatin" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Procedure (CPT)</label>
                      <Input placeholder="E.g., 33533 (CABG)" />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => toast({
                      title: "Cohort Built",
                      description: "Your custom cohort has been created with 1,245 matching patients."
                    })}>
                      Build Cohort
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-3">Saved Cohorts</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Post-MI Patients on Beta Blockers</p>
                        <p className="text-sm text-muted-foreground">2,450 patients</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleExportData}>
                        <FileBarChart className="mr-2 h-4 w-4" />
                        View Analysis
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Type 2 Diabetes with CKD</p>
                        <p className="text-sm text-muted-foreground">1,875 patients</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleExportData}>
                        <FileBarChart className="mr-2 h-4 w-4" />
                        View Analysis
                      </Button>
                    </div>
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

export default RealWorldDataPlatform;
