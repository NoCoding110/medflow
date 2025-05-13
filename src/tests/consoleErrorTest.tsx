import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../lib/auth';
import App from '../App';

// Mock console.error
const originalConsoleError = console.error;
let consoleErrors: string[] = [];

beforeEach(() => {
  consoleErrors = [];
  console.error = (...args: any[]) => {
    consoleErrors.push(args.join(' '));
    originalConsoleError.apply(console, args);
  };
});

afterEach(() => {
  console.error = originalConsoleError;
});

// Test public routes
describe('Public Routes Console Error Testing', () => {
  test('Home page has no console errors', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(consoleErrors).toHaveLength(0);
    });
  });

  test('Login page has no console errors', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );
    
    // Navigate to login
    window.history.pushState({}, '', '/login');
    
    await waitFor(() => {
      expect(consoleErrors).toHaveLength(0);
    });
  });
});

// Test protected routes
describe('Protected Routes Console Error Testing', () => {
  test('Doctor portal has no console errors', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );
    
    // Mock authentication
    localStorage.setItem('user', JSON.stringify({
      id: '1',
      name: 'Dr. John Smith',
      email: 'john@medflow.com',
      role: 'doctor'
    }));
    
    // Navigate to doctor portal
    window.history.pushState({}, '', '/doctor');
    
    await waitFor(() => {
      expect(consoleErrors).toHaveLength(0);
    });
  });

  test('Patient portal has no console errors', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );
    
    // Mock authentication
    localStorage.setItem('user', JSON.stringify({
      id: '2',
      name: 'John Patient',
      email: 'patient@medflow.com',
      role: 'patient'
    }));
    
    // Navigate to patient portal
    window.history.pushState({}, '', '/patient');
    
    await waitFor(() => {
      expect(consoleErrors).toHaveLength(0);
    });
  });
});

// Test component mounting/unmounting
describe('Component Lifecycle Console Error Testing', () => {
  test('Navigation between pages has no console errors', async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );
    
    // Navigate through different routes
    const routes = ['/', '/login', '/doctor', '/patient', '/admin'];
    
    for (const route of routes) {
      window.history.pushState({}, '', route);
      await waitFor(() => {
        expect(consoleErrors).toHaveLength(0);
      });
    }
  });
}); 