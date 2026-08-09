import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { DoctorPortalLayout } from './layout/DoctorPortalLayout';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { PatientsPage } from './pages/PatientsPage';
import { PatientDetailPage } from './pages/PatientDetailPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { PrescriptionPage } from './pages/PrescriptionPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { VaccinationsPage } from './pages/VaccinationsPage';
import { LabReportsPage } from './pages/LabReportsPage';
import { SchedulePage } from './pages/SchedulePage';
import { ProfilePage } from './pages/ProfilePage';
import { NotificationsPage } from './pages/NotificationsPage';
import { DoctorPortalPage } from './types';
import { DEMO_NOTIFICATIONS } from './data/demoData';

const DoctorPortalInner: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<DoctorPortalPage>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string>('pat-milo');

  const handleNavigate = (page: DoctorPortalPage, params?: string) => {
    if (params) setSelectedPatientId(params);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const unreadCount = DEMO_NOTIFICATIONS.filter(n => !n.read).length;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DoctorDashboard onNavigate={handleNavigate} />;
      case 'patients':
        return <PatientsPage onNavigate={handleNavigate} />;
      case 'patient-detail':
        return <PatientDetailPage patientId={selectedPatientId} onNavigate={handleNavigate} />;
      case 'consultation':
        return <ConsultationPage patientId={selectedPatientId} onNavigate={handleNavigate} />;
      case 'prescription':
        return <PrescriptionPage patientId={selectedPatientId} onNavigate={handleNavigate} />;
      case 'appointments':
        return <AppointmentsPage onNavigate={handleNavigate} />;
      case 'vaccinations':
        return <VaccinationsPage onNavigate={handleNavigate} />;
      case 'lab-reports':
        return <LabReportsPage onNavigate={handleNavigate} />;
      case 'schedule':
        return <SchedulePage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'notifications':
        return <NotificationsPage onNavigate={handleNavigate} />;
      default:
        return <DoctorDashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <DoctorPortalLayout
      currentPage={currentPage}
      onNavigate={handleNavigate}
      notificationCount={unreadCount}
    >
      {renderPage()}
    </DoctorPortalLayout>
  );
};

export const DoctorPortal: React.FC = () => {
  return (
    <AuthProvider>
      <DoctorPortalInner />
    </AuthProvider>
  );
};
