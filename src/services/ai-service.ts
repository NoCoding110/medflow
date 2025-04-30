import axios from 'axios';
import { useAuth } from '@/lib/auth';

// Define environment variable type
declare const process: {
  env: {
    REACT_APP_API_BASE_URL?: string;
  };
};

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIAnalysisResult {
  summary: string;
  findings: Array<{
    severity: 'critical' | 'warning' | 'normal';
    title: string;
    description: string;
  }>;
  recommendations?: string[];
}

export interface AIPathologyResult {
  summary: string;
  findings: Array<{
    severity: 'critical' | 'warning' | 'normal';
    title: string;
    description: string;
  }>;
  recommendations?: string[];
}

export interface AILiteratureResult {
  title: string;
  authors: string[];
  journal: string;
  year: string;
  abstract: string;
  citations: number;
  relevanceScore: number;
  url: string;
}

class AIService {
  private getAuthHeaders() {
    // Since we can't use hooks in a class, we'll need to get the token differently
    // This is a temporary solution - in a real app, you'd want to use a proper auth service
    const token = localStorage.getItem('auth_token');
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  // Chat/Conversation APIs
  async sendMessage(message: string, context: string = 'general'): Promise<AIMessage> {
    try {
      const response = await axios.post<AIMessage>(
        `${API_BASE_URL}/ai/chat`,
        { message, context },
        { headers: this.getAuthHeaders() }
      );
      return {
        ...response.data,
        timestamp: new Date(response.data.timestamp)
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  // Medical Analysis APIs
  async analyzeECG(file: File): Promise<AIAnalysisResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post<AIAnalysisResult>(
        `${API_BASE_URL}/ai/ecg-analysis`,
        formData,
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error analyzing ECG:', error);
      throw error;
    }
  }

  async analyzePathology(file: File): Promise<AIPathologyResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post<AIPathologyResult>(
        `${API_BASE_URL}/ai/pathology-analysis`,
        formData,
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error analyzing pathology:', error);
      throw error;
    }
  }

  async analyzeBrainMRI(file: File): Promise<AIAnalysisResult> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post<AIAnalysisResult>(
        `${API_BASE_URL}/ai/brain-mri-analysis`,
        formData,
        {
          headers: {
            ...this.getAuthHeaders(),
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error analyzing brain MRI:', error);
      throw error;
    }
  }

  // Literature Search API
  async searchLiterature(query: string): Promise<AILiteratureResult[]> {
    try {
      const response = await axios.get<AILiteratureResult[]>(
        `${API_BASE_URL}/ai/literature-search`,
        {
          params: { query },
          headers: this.getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error searching literature:', error);
      throw error;
    }
  }

  // Clinical Trial Matching API
  async matchClinicalTrials(patientData: any): Promise<any> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/ai/clinical-trial-matching`,
        patientData,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error matching clinical trials:', error);
      throw error;
    }
  }

  // Care Pathway Analysis API
  async analyzeCarePathway(patientId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/ai/care-pathway-analysis/${patientId}`,
        { headers: this.getAuthHeaders() }
      );
      return response.data;
    } catch (error) {
      console.error('Error analyzing care pathway:', error);
      throw error;
    }
  }
}

export const aiService = new AIService(); 