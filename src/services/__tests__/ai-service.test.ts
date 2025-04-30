import { aiService } from '../ai-service';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('AIService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue('test-token');
  });

  describe('sendMessage', () => {
    const mockMessage = {
      role: 'assistant' as const,
      content: 'This is a test response',
      timestamp: new Date().toISOString(),
    };

    it('should send a message and return the response', async () => {
      const mockResponse: AxiosResponse = {
        data: mockMessage,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const response = await aiService.sendMessage('Hello', 'patient-health');

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/ai/chat'),
        { message: 'Hello', context: 'patient-health' },
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );

      expect(response).toEqual({
        ...mockMessage,
        timestamp: expect.any(Date),
      });
    });

    it('should handle errors when sending a message', async () => {
      const error = new Error('Network error');
      mockedAxios.post.mockRejectedValueOnce(error);

      await expect(aiService.sendMessage('Hello')).rejects.toThrow('Network error');
    });
  });

  describe('analyzeECG', () => {
    const mockFile = new File(['test'], 'test.ecg', { type: 'application/octet-stream' });
    const mockResult = {
      result: 'Normal ECG',
      findings: [
        {
          severity: 'info' as const,
          finding: 'Normal sinus rhythm',
          confidence: 0.95,
        },
      ],
    };

    it('should analyze an ECG file and return results', async () => {
      const mockResponse: AxiosResponse = {
        data: mockResult,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      mockedAxios.post.mockResolvedValueOnce(mockResponse);

      const response = await aiService.analyzeECG(mockFile);

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/ai/ecg-analysis'),
        expect.any(FormData),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'multipart/form-data',
          }),
        })
      );

      expect(response).toEqual(mockResult);
    });
  });

  describe('searchLiterature', () => {
    const mockResults = [
      {
        title: 'Test Article',
        journal: 'Test Journal',
        date: '2024-01-01',
        summary: 'Test summary',
        relevance: 0.9,
      },
    ];

    it('should search literature and return results', async () => {
      const mockResponse: AxiosResponse = {
        data: mockResults,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const response = await aiService.searchLiterature('test query');

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/ai/literature-search'),
        expect.objectContaining({
          params: { query: 'test query' },
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );

      expect(response).toEqual(mockResults);
    });
  });

  describe('analyzeCarePathway', () => {
    const mockPatientId = '123';
    const mockResult = {
      recommendations: ['Test recommendation'],
      timeline: '2 weeks',
    };

    it('should analyze care pathway and return results', async () => {
      const mockResponse: AxiosResponse = {
        data: mockResult,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      };
      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const response = await aiService.analyzeCarePathway(mockPatientId);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining(`/ai/care-pathway-analysis/${mockPatientId}`),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }),
        })
      );

      expect(response).toEqual(mockResult);
    });
  });
}); 