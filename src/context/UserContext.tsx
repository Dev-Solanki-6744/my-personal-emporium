
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// This is a mock authentication system
// In a real app, you'd integrate with a backend service

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user database
const MOCK_USERS: Record<string, {name: string, password: string}> = {
  'user@example.com': { name: 'Demo User', password: 'password123' },
  'admin@example.com': { name: 'Admin User', password: 'admin123' },
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      }
    }
    setLoading(false);
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Validate credentials against our mock database
    const userRecord = MOCK_USERS[email.toLowerCase()];
    if (userRecord && userRecord.password === password) {
      setUser({
        id: Math.random().toString(36).substring(2, 9),
        name: userRecord.name,
        email: email.toLowerCase()
      });
      toast.success('Login successful');
      setLoading(false);
      return true;
    } else {
      toast.error('Invalid email or password');
      setLoading(false);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if user already exists in our mock database
    if (MOCK_USERS[email.toLowerCase()]) {
      toast.error('Email already in use');
      setLoading(false);
      return false;
    }
    
    // Create new user (in a real app, this would call your backend API)
    MOCK_USERS[email.toLowerCase()] = { name, password };
    
    // Auto-login the new user
    setUser({
      id: Math.random().toString(36).substring(2, 9),
      name,
      email: email.toLowerCase()
    });
    
    toast.success('Registration successful');
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    toast.info('Logged out successfully');
  };

  return (
    <UserContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
