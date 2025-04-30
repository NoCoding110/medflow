import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import '@testing-library/jest-dom';
import PatientHealthAssistant from '../PatientHealthAssistant';
import { aiService } from '@/services/ai-service';
import { useToast } from '@/components/ui/use-toast';

// Mock the AI service
jest.mock('@/services/ai-service', () => ({
  aiService: {
    sendMessage: jest.fn(),
  },
}));

// Mock the auth hook
jest.mock('@/lib/auth', () => ({
  useAuth: () => ({
    user: { id: 'test-user' },
  }),
}));

// Mock the toast hook
jest.mock('@/components/ui/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('PatientHealthAssistant', () => {
  const mockToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  });

  it('renders the initial UI correctly', () => {
    render(<PatientHealthAssistant />);

    // Check for main elements
    expect(screen.getByRole('heading', { name: 'AI Health Assistant', level: 1 })).toBeInTheDocument();
    expect(screen.getByText('Get instant answers to your health questions, 24/7')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your health question here...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();

    // Check for suggested questions
    expect(screen.getByText('What does my blood pressure reading mean?')).toBeInTheDocument();
    expect(screen.getByText('When is my next appointment?')).toBeInTheDocument();

    // Check for features
    expect(screen.getByText('Answer health questions')).toBeInTheDocument();
    expect(screen.getByText('Interpret lab results')).toBeInTheDocument();
    expect(screen.getByText('Explain medical conditions')).toBeInTheDocument();
  });

  it('sends a message and displays the response', async () => {
    const mockResponse = {
      role: 'assistant',
      content: 'Your blood pressure is within normal range.',
      timestamp: new Date(),
    };

    (aiService.sendMessage as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(<PatientHealthAssistant />);

    // Type a message
    const input = screen.getByPlaceholderText('Type your health question here...');
    await userEvent.type(input, 'What is my blood pressure?');

    // Send the message
    const sendButton = screen.getByRole('button', { name: 'Send' });
    await userEvent.click(sendButton);

    // Check if the message was sent
    expect(aiService.sendMessage).toHaveBeenCalledWith(
      'What is my blood pressure?',
      'patient-health'
    );

    // Wait for and verify the response
    await waitFor(() => {
      expect(screen.getByText('Your blood pressure is within normal range.')).toBeInTheDocument();
    });
  });

  it('handles errors when sending a message', async () => {
    const error = new Error('Failed to send message');
    (aiService.sendMessage as jest.Mock).mockRejectedValueOnce(error);

    render(<PatientHealthAssistant />);

    // Type and send a message
    const input = screen.getByPlaceholderText('Type your health question here...');
    await userEvent.type(input, 'Test message');
    const sendButton = screen.getByRole('button', { name: 'Send' });
    await userEvent.click(sendButton);

    // Verify error toast was shown
    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Error',
        description: 'Failed to get response from AI assistant. Please try again.',
        variant: 'destructive',
      });
    });
  });

  it('sends a suggested question when clicked', async () => {
    const mockResponse = {
      role: 'assistant',
      content: 'Your next appointment is on...',
      timestamp: new Date(),
    };

    (aiService.sendMessage as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(<PatientHealthAssistant />);

    // Click a suggested question
    const suggestedQuestion = screen.getByRole('button', { name: 'When is my next appointment?' });
    await userEvent.click(suggestedQuestion);

    // Verify the message was sent
    await waitFor(() => {
      expect(aiService.sendMessage).toHaveBeenCalledWith(
        'When is my next appointment?',
        'patient-health'
      );
    });

    // Verify the response is displayed
    await waitFor(() => {
      expect(screen.getByText('Your next appointment is on...')).toBeInTheDocument();
    });
  });

  it('disables input while sending a message', async () => {
    const mockResponse = {
      role: 'assistant',
      content: 'Test response',
      timestamp: new Date(),
    };

    // Add a delay to simulate network request
    (aiService.sendMessage as jest.Mock).mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve(mockResponse), 100))
    );

    render(<PatientHealthAssistant />);

    // Type and send a message
    const input = screen.getByPlaceholderText('Type your health question here...');
    await userEvent.type(input, 'Test message');
    const sendButton = screen.getByRole('button', { name: 'Send' });
    await userEvent.click(sendButton);

    // Verify input and button are disabled while sending
    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();

    // Wait for the response and verify controls are enabled again
    await waitFor(() => {
      expect(input).not.toBeDisabled();
      expect(sendButton).not.toBeDisabled();
    });
  });
}); 