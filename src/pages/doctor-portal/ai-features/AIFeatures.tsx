import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, MessageSquare, LineChart, Bot } from "lucide-react";
import { GenerativeAI } from './GenerativeAI';
import { PredictiveAnalysis } from './PredictiveAnalysis';
import { ConversationalAI } from './ConversationalAI';

const AIFeatures = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Features</h1>
          <p className="text-muted-foreground">
            Leverage advanced AI capabilities to enhance patient care and decision-making
          </p>
        </div>
      </div>

      <Tabs defaultValue="generative" className="space-y-4">
        <TabsList>
          <TabsTrigger value="generative" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Generative AI
          </TabsTrigger>
          <TabsTrigger value="predictive" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Predictive Analysis
          </TabsTrigger>
          <TabsTrigger value="conversational" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Conversational AI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generative" className="space-y-4">
          <GenerativeAI />
        </TabsContent>

        <TabsContent value="predictive" className="space-y-4">
          <PredictiveAnalysis />
        </TabsContent>

        <TabsContent value="conversational" className="space-y-4">
          <ConversationalAI />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIFeatures; 