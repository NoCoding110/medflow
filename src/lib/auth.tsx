import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for saved authentication state
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Persist authentication state
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Handle route persistence
  useEffect(() => {
    if (!isLoading) {
      if (!user && !location.pathname.startsWith('/login')) {
        // Save the attempted URL
        sessionStorage.setItem('redirectTo', location.pathname);
        navigate('/login');
      } else if (user && location.pathname === '/login') {
        // Redirect to saved URL or default route based on role
        const redirectTo = sessionStorage.getItem('redirectTo') || getDefaultRoute(user.role);
        sessionStorage.removeItem('redirectTo');
        navigate(redirectTo);
      }
    }
  }, [user, isLoading, location.pathname, navigate]);

  const login = async (email: string, password: string) => {
    // Find user with matching credentials
    const matchedUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!matchedUser) {
      throw new Error('Invalid credentials');
    }

    const authenticatedUser = {
      id: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
      avatar: matchedUser.avatar
    };

    // Set the authenticated user
    setUser(authenticatedUser);

    // Redirect to saved URL or default route
    const redirectTo = sessionStorage.getItem('redirectTo') || getDefaultRoute(authenticatedUser.role);
    sessionStorage.removeItem('redirectTo');
    navigate(redirectTo);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('redirectTo');
    navigate('/login');
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

// Helper function to get default route based on user role
const getDefaultRoute = (role: User['role']) => {
  switch (role) {
    case 'doctor':
      return '/doctor';
    case 'nurse':
      return '/nurse';
    case 'admin':
      return '/admin';
    case 'patient':
      return '/patient';
    default:
      return '/';
  }
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
