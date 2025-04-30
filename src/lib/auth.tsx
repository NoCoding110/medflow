import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'nurse' | 'admin' | 'staff' | 'patient';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah@medflow.com',
    password: 'password123', // In a real app, never store plaintext passwords
    role: 'doctor' as const,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael@medflow.com',
    password: 'password123',
    role: 'doctor' as const,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '3',
    name: 'Nurse Emma Wilson',
    email: 'emma@medflow.com',
    password: 'password123',
    role: 'nurse' as const,
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
  },
  {
    id: '4',
    name: 'Admin Alex Taylor',
    email: 'admin@medflow.com',
    password: 'admin123',
    role: 'admin' as const,
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: '5',
    name: 'John Patient',
    email: 'patient@medflow.com',
    password: 'patient123',
    role: 'patient' as const,
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Auto-login as test patient in development
    const testUser: User = {
      id: 'P001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'patient'
    };
    setUser(testUser);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In development, just set the test user
    const testUser: User = {
      id: 'P001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'patient'
    };
    setUser(testUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
