import React, { createContext, useContext } from 'react';
import { DoctorUser } from '../types';
import { DEMO_DOCTORS } from '../data/demoData';

interface AuthContextType {
  doctor: DoctorUser;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_DOCTOR = DEMO_DOCTORS.find(d => d.id === 'doc-sarah') || DEMO_DOCTORS[0];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthContext.Provider value={{ doctor: DEMO_DOCTOR }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
