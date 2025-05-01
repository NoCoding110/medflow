import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SmartVisitPrep } from '../SmartVisitPrep';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { act } from 'react';

// Mock the hooks
jest.mock('@/components/ui/use-toast');
jest.mock('react-router-dom');

// Mock the data fetching function
const mockData = {
  visits: [
    {
      id: '1',
      patientName: 'John Doe',
      dateTime: '2024-03-20 09:00 AM',
      status: 'scheduled',
      type: 'initial',
      preparationStatus: 'pending',
      aiSuggestions: [
        'Review previous medical history',
        'Prepare questionnaire for chronic condition',
      ],
      requiredDocuments: [
        'Medical History Form',
        'Insurance Information',
      ],
      notes: 'Initial consultation for chronic condition',
    },
  ],
  analytics: {
    preparationTrends: [],
    visitTypeDistribution: [],
    upcomingVisits: 1,
    completedPrep: 0,
    pendingPrep: 1,
    alerts: 0,
  },
};

// Mock data fetching with controlled delay
const mockFetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 100);
  });
};

jest.mock('../SmartVisitPrep', () => {
  const actual = jest.requireActual('../SmartVisitPrep');
  return {
    ...actual,
    simulateDataFetch: jest.fn().mockImplementation(mockFetchData),
  };
});

describe('SmartVisitPrep', () => {
  const mockToast = {
    toast: jest.fn(),
  };

  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useToast as jest.Mock).mockReturnValue(mockToast);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders loading state initially', async () => {
    render(<SmartVisitPrep />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    
    // Wait for loading to complete to clean up
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });

  it('renders the component correctly after loading', async () => {
    render(<SmartVisitPrep />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Visit Preparation')).toBeInTheDocument();
    expect(screen.getByText('Prepare for upcoming patient visits with AI assistance')).toBeInTheDocument();
  });

  it('handles search functionality', async () => {
    render(<SmartVisitPrep />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText('Search patients, visit types...');
    await act(async () => {
      await userEvent.type(searchInput, 'John');
    });
    
    expect(searchInput).toHaveValue('John');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('handles status filter changes', async () => {
    render(<SmartVisitPrep />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    
    const statusSelect = screen.getByTestId('status-select');
    await act(async () => {
      fireEvent.click(statusSelect);
    });
    
    expect(screen.getByText('All Status')).toBeInTheDocument();
  });

  it('handles visit type filter changes', async () => {
    render(<SmartVisitPrep />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    
    const typeSelect = screen.getByTestId('type-select');
    await act(async () => {
      fireEvent.click(typeSelect);
    });
    
    expect(screen.getByText('All Types')).toBeInTheDocument();
  });

  it('handles tab changes', async () => {
    render(<SmartVisitPrep />);
    
    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    
    const analyticsTab = screen.getByTestId('analytics-tab');
    
    // Click the analytics tab
    await act(async () => {
      fireEvent.click(analyticsTab);
      // Wait for any state updates to complete
      await new Promise(resolve => setTimeout(resolve, 0));
    });
    
    // Verify the analytics content is shown
    await waitFor(() => {
      expect(screen.getByTestId('preparation-trends')).toBeInTheDocument();
    });
  });

  it('handles refresh button click', async () => {
    render(<SmartVisitPrep />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    
    const refreshButton = screen.getByTestId('refresh-button');
    await act(async () => {
      fireEvent.click(refreshButton);
      // Wait for refresh to complete
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(mockToast.toast).toHaveBeenCalledWith({
      title: 'Data Updated',
      description: 'Visit preparation data has been refreshed',
    });
  });

  it('handles back button navigation', async () => {
    render(<SmartVisitPrep />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    
    const backButton = screen.getByTestId('back-button');
    await act(async () => {
      fireEvent.click(backButton);
    });
    
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('displays visit cards with correct information', async () => {
    render(<SmartVisitPrep />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('2024-03-20 09:00 AM')).toBeInTheDocument();
    expect(screen.getByTestId('status-badge-pending')).toBeInTheDocument();
  });

  it('displays AI suggestions correctly', async () => {
    render(<SmartVisitPrep />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Review previous medical history')).toBeInTheDocument();
    expect(screen.getByText('Prepare questionnaire for chronic condition')).toBeInTheDocument();
  });

  it('displays required documents correctly', async () => {
    render(<SmartVisitPrep />);
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Medical History Form')).toBeInTheDocument();
    expect(screen.getByText('Insurance Information')).toBeInTheDocument();
  });
}); 