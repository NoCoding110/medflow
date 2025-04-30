import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { FileText, Download, Loader2 } from "lucide-react";

export const GenerativeAI = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [contentType, setContentType] = useState('report');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        variant: "destructive",
        title: "Prompt required",
        description: "Please enter a prompt to generate content."
      });
      return;
    }

    setGenerating(true);
    try {
      // Simulate API call to AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response based on content type
      const mockResponses = {
        report: `Medical Report Summary:\n\nPatient presents with symptoms of ${prompt}. Based on the examination and test results, the following findings were noted:\n\n1. Primary Diagnosis: [AI-generated diagnosis]\n2. Treatment Plan: [AI-generated treatment plan]\n3. Recommendations: [AI-generated recommendations]`,
        plan: `Treatment Plan:\n\nFor the condition: ${prompt}\n\n1. Medication: [AI-generated medication plan]\n2. Lifestyle Changes: [AI-generated lifestyle recommendations]\n3. Follow-up Schedule: [AI-generated follow-up plan]`,
        research: `Research Summary:\n\nTopic: ${prompt}\n\nKey Findings:\n1. [AI-generated research point 1]\n2. [AI-generated research point 2]\n3. [AI-generated research point 3]\n\nClinical Implications: [AI-generated implications]`
      };

      setGeneratedContent(mockResponses[contentType as keyof typeof mockResponses]);
      
      toast({
        title: "Content Generated",
        description: "The AI has generated the requested content."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Failed to generate content. Please try again."
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${contentType}-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Generate Medical Content</CardTitle>
          <CardDescription>
            Use AI to generate medical reports, treatment plans, or research summaries
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={contentType} onValueChange={setContentType}>
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="report">Medical Report</SelectItem>
              <SelectItem value="plan">Treatment Plan</SelectItem>
              <SelectItem value="research">Research Summary</SelectItem>
            </SelectContent>
          </Select>

          <Textarea
            placeholder="Enter your prompt or requirements..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-[100px]"
          />

          <Button 
            onClick={handleGenerate} 
            disabled={generating || !prompt.trim()}
            className="w-full"
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Generate Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Content</CardTitle>
          <CardDescription>
            Review and download the AI-generated content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="min-h-[200px] p-4 rounded-md bg-muted">
            {generatedContent ? (
              <pre className="whitespace-pre-wrap text-sm">{generatedContent}</pre>
            ) : (
              <p className="text-muted-foreground text-sm">
                Generated content will appear here...
              </p>
            )}
          </div>

          {generatedContent && (
            <Button 
              onClick={handleDownload}
              variant="outline"
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Content
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 