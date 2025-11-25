import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  loginWithGoogle: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface ConfigUrls {
  login: string;
  callback: string;
  user: string;
  logout: string;
}

let configUrls: ConfigUrls | null = null;

const loadConfig = async (): Promise<ConfigUrls> => {
  if (configUrls) return configUrls;
  
  try {
    const response = await fetch('/config.json');
    if (response.ok) {
      configUrls = await response.json();
      return configUrls;
    }
  } catch (error) {
    console.debug('Config not found, using defaults');
  }

  configUrls = {
    login: 'http://localhost:5000/auth/google/login',
    callback: 'http://localhost:5000/auth/callback',
    user: 'http://localhost:5000/auth/user',
    logout: 'http://localhost:5000/auth/logout',
  };
  return configUrls;
};

// Initialize config load
loadConfig();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const urls = await loadConfig();
        const response = await fetch(urls.user, {
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          if (data.logged_in) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const loginWithGoogle = () => {
    loadConfig().then((urls) => {
      window.location.href = urls.login;
    });
  };

  const logout = async () => {
    try {
      const urls = await loadConfig();
      await fetch(urls.logout, {
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loginWithGoogle, 
        logout, 
        isAuthenticated: !!user,
        isLoading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
