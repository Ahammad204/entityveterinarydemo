export type PetSpecies = 'Dog' | 'Cat' | 'Bird' | 'Rabbit' | 'Other';
export type AppointmentStatus = 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'waiting';
export type Gender = 'Male' | 'Female';
export type UserRole = 'doctor' | 'admin';

export interface DoctorUser {
  id: string;
  name: string;
  designation: string;
  specialization: string;
  degree: string;
  registrationNo: string;
  email: string;
  phone: string;
  branch: string;
  avatar: string;
  bio: string;
  experienceYears: number;
  role: UserRole;
}

export interface Patient {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  age: string;
  gender: Gender;
  weight: string;
  bloodGroup?: string;
  allergies?: string;
  chronicConditions?: string;
  microchipId?: string;
  photo: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail?: string;
  lastVisit: string;
  assignedDoctor: string;
  status: 'active' | 'follow-up' | 'critical' | 'stable';
  vaccinationStatus: 'up-to-date' | 'due' | 'overdue';
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhoto: string;
  species: PetSpecies;
  ownerName: string;
  ownerPhone: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
  status: AppointmentStatus;
  branch: string;
  service: string;
  notes?: string;
  followUpDate?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  chiefComplaint: string;
  symptoms: string;
  temperature?: string;
  weight?: string;
  heartRate?: string;
  respiratoryRate?: string;
  clinicalExamination: string;
  diagnosis: string;
  treatmentPlan: string;
  additionalNotes?: string;
  followUpDate?: string;
  status: 'draft' | 'completed';
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  medicines: PrescriptionMedicine[];
  specialInstructions?: string;
  diagnosis: string;
  followUpDate?: string;
}

export interface PrescriptionMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface VaccinationRecord {
  id: string;
  patientId: string;
  vaccineName: string;
  dateGiven: string;
  dose: string;
  nextDueDate: string;
  batchNumber: string;
  notes?: string;
  administeredBy: string;
}

export interface LabReport {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  date: string;
  status: 'pending' | 'completed' | 'reviewed';
  doctorId: string;
  doctorName: string;
  results?: string;
  interpretation?: string;
  fileUrl?: string;
}

export interface Notification {
  id: string;
  type: 'appointment' | 'follow-up' | 'vaccination' | 'lab-report' | 'message';
  title: string;
  message: string;
  time: string;
  read: boolean;
  patientId?: string;
}

export interface DoctorSchedule {
  day: string;
  slots: ScheduleSlot[];
  branch: string;
  isAvailable: boolean;
}

export interface ScheduleSlot {
  startTime: string;
  endTime: string;
  isBreak: boolean;
}

export type DoctorPortalPage =
  | 'dashboard'
  | 'patients'
  | 'patient-detail'
  | 'consultation'
  | 'prescription'
  | 'appointments'
  | 'vaccinations'
  | 'lab-reports'
  | 'schedule'
  | 'profile'
  | 'notifications';
