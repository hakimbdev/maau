import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAuth = localStorage.getItem('isAuthenticated');
    
    if (storedUser && storedAuth === 'true') {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, accept any email with admin password
    if (password === 'admin123') {
      const user = {
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'admin'
      };
      
      setUser(user);
      setIsAuthenticated(true);
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
