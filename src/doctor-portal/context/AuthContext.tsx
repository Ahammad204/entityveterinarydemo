import React, { createContext, useContext, useState, useCallback } from 'react';
import { DoctorUser } from '../types';
import { DEMO_DOCTORS } from '../data/demoData';

interface AuthContextType {
  doctor: DoctorUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctor, setDoctor] = useState<DoctorUser | null>(() => {
    const saved = localStorage.getItem('doctor_portal_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string, _password: string): boolean => {
    const found = DEMO_DOCTORS.find(d => d.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setDoctor(found);
      localStorage.setItem('doctor_portal_user', JSON.stringify(found));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setDoctor(null);
    localStorage.removeItem('doctor_portal_user');
  }, []);

  return (
    <AuthContext.Provider value={{ doctor, isAuthenticated: !!doctor, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
