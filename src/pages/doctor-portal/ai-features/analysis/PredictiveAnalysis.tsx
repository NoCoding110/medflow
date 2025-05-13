import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { LineChart, BarChart, PieChart, Loader2, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const PredictiveAnalysis = () => {
  const { toast } = useToast();
  const [analysisType, setAnalysisType] = useState('outcome');
  const [patientData, setPatientData] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!patientData.trim()) {
      toast({
        variant: "destructive",
        title: "Data required",
        description: "Please enter patient data for analysis."
      });
      return;
    }

    setAnalyzing(true);
    try {
      // Simulate API call to AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock responses based on analysis type
      const mockResponses = {
        outcome: {
          prediction: "Positive",
          confidence: 85,
          factors: [
            { name: "Treatment Adherence", impact: 0.8 },
            { name: "Lifestyle Factors", impact: 0.6 },
            { name: "Comorbidities", impact: 0.3 }
          ],
          recommendations: [
            "Maintain current treatment regimen",
            "Increase physical activity",
            "Monitor blood pressure weekly"
          ]
        },
        risk: {
          riskLevel: "Moderate",
          score: 65,
          factors: [
            { name: "Age", risk: 0.7 },
            { name: "Family History", risk: 0.8 },
            { name: "Lifestyle", risk: 0.5 }
          ],
          preventiveMeasures: [
            "Regular screening",
            "Lifestyle modifications",
            "Preventive medication"
          ]
        },
        treatment: {
          effectiveness: 75,
          timeline: "6-8 weeks",
          sideEffects: [
            "Mild nausea",
            "Drowsiness",
            "Headache"
          ],
          alternatives: [
            "Alternative treatment A",
            "Alternative treatment B"
          ]
        }
      };

      setResults(mockResponses[analysisType as keyof typeof mockResponses]);
      
      toast({
        title: "Analysis Complete",
        description: "The AI has completed the predictive analysis."
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Failed to complete the analysis. Please try again."
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const renderResults = () => {
    if (!results) return null;

    switch (analysisType) {
      case 'outcome':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Predicted Outcome:</span>
              <span className={`font-bold ${results.prediction === 'Positive' ? 'text-green-600' : 'text-red-600'}`}>
                {results.prediction}
              </span>
            </div>
            <div>
              <span className="font-medium">Confidence:</span>
              <Progress value={results.confidence} className="mt-2" />
            </div>
            <div>
              <span className="font-medium">Key Factors:</span>
              <ul className="mt-2 space-y-2">
                {results.factors.map((factor: any, index: number) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{factor.name}</span>
                    <Progress value={factor.impact * 100} className="w-32" />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-medium">Recommendations:</span>
              <ul className="mt-2 list-disc list-inside">
                {results.recommendations.map((rec: string, index: number) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'risk':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Risk Level:</span>
              <span className={`font-bold ${
                results.riskLevel === 'Low' ? 'text-green-600' :
                results.riskLevel === 'Moderate' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {results.riskLevel}
              </span>
            </div>
            <div>
              <span className="font-medium">Risk Score:</span>
              <Progress value={results.score} className="mt-2" />
            </div>
            <div>
              <span className="font-medium">Risk Factors:</span>
              <ul className="mt-2 space-y-2">
                {results.factors.map((factor: any, index: number) => (
                  <li key={index} className="flex items-center justify-between">
                    <span>{factor.name}</span>
                    <Progress value={factor.risk * 100} className="w-32" />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-medium">Preventive Measures:</span>
              <ul className="mt-2 list-disc list-inside">
                {results.preventiveMeasures.map((measure: string, index: number) => (
                  <li key={index}>{measure}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'treatment':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Effectiveness:</span>
              <Progress value={results.effectiveness} className="w-32" />
            </div>
            <div>
              <span className="font-medium">Expected Timeline:</span>
              <p className="mt-1">{results.timeline}</p>
            </div>
            <div>
              <span className="font-medium">Potential Side Effects:</span>
              <ul className="mt-2 list-disc list-inside">
                {results.sideEffects.map((effect: string, index: number) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-medium">Alternative Treatments:</span>
              <ul className="mt-2 list-disc list-inside">
                {results.alternatives.map((alt: string, index: number) => (
                  <li key={index}>{alt}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Predictive Analysis</CardTitle>
          <CardDescription>
            Analyze patient data to predict outcomes, assess risks, and evaluate treatment effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={analysisType} onValueChange={setAnalysisType}>
            <SelectTrigger>
              <SelectValue placeholder="Select analysis type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="outcome">Outcome Prediction</SelectItem>
              <SelectItem value="risk">Risk Assessment</SelectItem>
              <SelectItem value="treatment">Treatment Effectiveness</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Enter patient data or ID..."
            value={patientData}
            onChange={(e) => setPatientData(e.target.value)}
          />

          <Button 
            onClick={handleAnalyze} 
            disabled={analyzing || !patientData.trim()}
            className="w-full"
          >
            {analyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <LineChart className="mr-2 h-4 w-4" />
                Analyze Data
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>
            Review the AI-generated predictions and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {results ? (
            renderResults()
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              <p>Analysis results will appear here...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 