import { DoctorUser, Patient, Appointment, MedicalRecord, Prescription, VaccinationRecord, LabReport, Notification, DoctorSchedule } from '../types';

export const DEMO_DOCTORS: DoctorUser[] = [
  {
    id: 'doc-partha',
    name: 'Dr. Partha Sarathi Chanda',
    designation: 'Co-Founder & CEO',
    specialization: 'Veterinary Healthcare Management',
    degree: 'DVM, MS (Veterinary Surgery)',
    registrationNo: 'VET-BD-2018-0452',
    email: 'partha@entityveterinary.com',
    phone: '+8801812345678',
    branch: 'Main Hospital — Chattogram',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    bio: 'Visionary leader with 8+ years of experience in veterinary healthcare management. Specializes in surgical procedures and hospital operations.',
    experienceYears: 8,
    role: 'doctor'
  },
  {
    id: 'doc-aslam',
    name: 'Dr. Aslam Hossain',
    designation: 'Chief Operating Officer',
    specialization: 'Clinical Operations & Emergency Care',
    degree: 'DVM, BVSc & AH',
    registrationNo: 'VET-BD-2019-0783',
    email: 'aslam@entityveterinary.com',
    phone: '+8801812345679',
    branch: 'Main Hospital — Chattogram',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    bio: 'Operations expert ensuring excellence in every aspect of patient care. Specializes in emergency triage and critical care.',
    experienceYears: 7,
    role: 'doctor'
  },
  {
    id: 'doc-sarah',
    name: 'Dr. Sarah Ahmed',
    designation: 'Senior Veterinary Surgeon',
    specialization: 'Small Animal Medicine & Surgery',
    degree: 'DVM, MS (Small Animal Medicine)',
    registrationNo: 'VET-BD-2020-1205',
    email: 'sarah@entityveterinary.com',
    phone: '+8801812345680',
    branch: 'North Clinic — Chattogram',
    avatar: 'https://images.unsplash.com/photo-1594824813566-78a9c33630f9?auto=format&fit=crop&q=80&w=200',
    bio: 'Experienced small animal clinician with expertise in feline medicine, preventive care, and soft tissue surgery.',
    experienceYears: 5,
    role: 'doctor'
  }
];

export const DEMO_PATIENTS: Patient[] = [
  {
    id: 'pat-milo',
    name: 'Milo',
    species: 'Cat',
    breed: 'Persian',
    age: '3 Years',
    gender: 'Male',
    weight: '4.2 kg',
    bloodGroup: 'Type A',
    allergies: 'None',
    chronicConditions: 'None',
    microchipId: 'BD-2024-00156',
    photo: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=200',
    ownerName: 'Ahmed Rahman',
    ownerPhone: '+8801712345678',
    ownerEmail: 'ahmed.rahman@email.com',
    lastVisit: '2026-08-05',
    assignedDoctor: 'doc-sarah',
    status: 'active',
    vaccinationStatus: 'up-to-date',
    createdAt: '2025-01-15'
  },
  {
    id: 'pat-bruno',
    name: 'Bruno',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '5 Years',
    gender: 'Male',
    weight: '32.5 kg',
    bloodGroup: 'Type DEA 1.1+',
    allergies: 'Chicken-based treats',
    chronicConditions: 'Mild hip dysplasia',
    photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200',
    ownerName: 'Fatima Khan',
    ownerPhone: '+8801812345681',
    lastVisit: '2026-08-01',
    assignedDoctor: 'doc-partha',
    status: 'follow-up',
    vaccinationStatus: 'up-to-date',
    createdAt: '2024-06-20'
  },
  {
    id: 'pat-luna',
    name: 'Luna',
    species: 'Cat',
    breed: 'Domestic Shorthair',
    age: '2 Years',
    gender: 'Female',
    weight: '3.8 kg',
    bloodGroup: 'Type A',
    allergies: 'None',
    chronicConditions: 'None',
    photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=200',
    ownerName: 'Nadia Hassan',
    ownerPhone: '+8801912345682',
    lastVisit: '2026-07-28',
    assignedDoctor: 'doc-sarah',
    status: 'active',
    vaccinationStatus: 'due',
    createdAt: '2025-03-10'
  },
  {
    id: 'pat-max',
    name: 'Max',
    species: 'Dog',
    breed: 'Labrador Retriever',
    age: '4 Years',
    gender: 'Male',
    weight: '29.0 kg',
    bloodGroup: 'Type DEA 1.1-',
    allergies: 'None',
    chronicConditions: 'None',
    photo: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=200',
    ownerName: 'Karim Uddin',
    ownerPhone: '+8801612345683',
    lastVisit: '2026-08-07',
    assignedDoctor: 'doc-partha',
    status: 'stable',
    vaccinationStatus: 'up-to-date',
    createdAt: '2024-11-05'
  },
  {
    id: 'pat-coco',
    name: 'Coco',
    species: 'Bird',
    breed: 'Cockatiel',
    age: '1.5 Years',
    gender: 'Male',
    weight: '95 g',
    allergies: 'None',
    chronicConditions: 'None',
    photo: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&q=80&w=200',
    ownerName: 'Rina Akter',
    ownerPhone: '+8801512345684',
    lastVisit: '2026-08-03',
    assignedDoctor: 'doc-sarah',
    status: 'active',
    vaccinationStatus: 'up-to-date',
    createdAt: '2025-06-12'
  },
  {
    id: 'pat-tommy',
    name: 'Tommy',
    species: 'Dog',
    breed: 'German Shepherd',
    age: '6 Years',
    gender: 'Male',
    weight: '35.0 kg',
    bloodGroup: 'Type DEA 1.1+',
    allergies: 'Grain-based foods',
    chronicConditions: 'Chronic ear infection',
    photo: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=200',
    ownerName: 'Sohel Mia',
    ownerPhone: '+8801712345685',
    lastVisit: '2026-07-20',
    assignedDoctor: 'doc-aslam',
    status: 'follow-up',
    vaccinationStatus: 'overdue',
    createdAt: '2024-02-28'
  },
  {
    id: 'pat-bella',
    name: 'Bella',
    species: 'Cat',
    breed: 'Siamese',
    age: '4 Years',
    gender: 'Female',
    weight: '3.5 kg',
    bloodGroup: 'Type A',
    allergies: 'Dairy products',
    chronicConditions: 'Mild asthma',
    photo: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&q=80&w=200',
    ownerName: 'Tanvir Hasan',
    ownerPhone: '+8801812345686',
    lastVisit: '2026-08-08',
    assignedDoctor: 'doc-sarah',
    status: 'critical',
    vaccinationStatus: 'up-to-date',
    createdAt: '2024-09-15'
  }
];

export const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-001',
    patientId: 'pat-milo',
    patientName: 'Milo',
    patientPhoto: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=100',
    species: 'Cat',
    ownerName: 'Ahmed Rahman',
    ownerPhone: '+8801712345678',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Ahmed',
    date: '2026-08-09',
    time: '09:00 AM',
    reason: 'Annual Vaccination',
    status: 'confirmed',
    branch: 'North Clinic',
    service: 'Vaccination'
  },
  {
    id: 'apt-002',
    patientId: 'pat-bruno',
    patientName: 'Bruno',
    patientPhoto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=100',
    species: 'Dog',
    ownerName: 'Fatima Khan',
    ownerPhone: '+8801812345681',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Ahmed',
    date: '2026-08-09',
    time: '10:00 AM',
    reason: 'Follow-up — Hip Joint Assessment',
    status: 'waiting',
    branch: 'North Clinic',
    service: 'Follow-up'
  },
  {
    id: 'apt-003',
    patientId: 'pat-luna',
    patientName: 'Luna',
    patientPhoto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=100',
    species: 'Cat',
    ownerName: 'Nadia Hassan',
    ownerPhone: '+8801912345682',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Ahmed',
    date: '2026-08-09',
    time: '11:30 AM',
    reason: 'Vaccination Overdue — FVRCP Booster',
    status: 'confirmed',
    branch: 'North Clinic',
    service: 'Vaccination'
  },
  {
    id: 'apt-004',
    patientId: 'pat-coco',
    patientName: 'Coco',
    patientPhoto: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&q=80&w=100',
    species: 'Bird',
    ownerName: 'Rina Akter',
    ownerPhone: '+8801512345684',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Ahmed',
    date: '2026-08-09',
    time: '02:00 PM',
    reason: 'Routine Health Checkup',
    status: 'confirmed',
    branch: 'North Clinic',
    service: 'Consultation'
  },
  {
    id: 'apt-005',
    patientId: 'pat-bella',
    patientName: 'Bella',
    patientPhoto: 'https://images.unsplash.com/photo-1571566882372-1598d88abd90?auto=format&fit=crop&q=80&w=100',
    species: 'Cat',
    ownerName: 'Tanvir Hasan',
    ownerPhone: '+8801812345686',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Ahmed',
    date: '2026-08-09',
    time: '03:30 PM',
    reason: 'Asthma Flare-up — Breathing Difficulty',
    status: 'confirmed',
    branch: 'North Clinic',
    service: 'Emergency Consultation'
  },
  {
    id: 'apt-006',
    patientId: 'pat-max',
    patientName: 'Max',
    patientPhoto: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=100',
    species: 'Dog',
    ownerName: 'Karim Uddin',
    ownerPhone: '+8801612345683',
    doctorId: 'doc-partha',
    doctorName: 'Dr. Partha Sarathi Chanda',
    date: '2026-08-10',
    time: '09:30 AM',
    reason: 'Routine Dental Cleaning',
    status: 'confirmed',
    branch: 'Main Hospital',
    service: 'Dental'
  },
  {
    id: 'apt-007',
    patientId: 'pat-tommy',
    patientName: 'Tommy',
    patientPhoto: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=100',
    species: 'Dog',
    ownerName: 'Sohel Mia',
    ownerPhone: '+8801712345685',
    doctorId: 'doc-aslam',
    doctorName: 'Dr. Aslam Hossain',
    date: '2026-08-10',
    time: '11:00 AM',
    reason: 'Ear Infection Follow-up',
    status: 'confirmed',
    branch: 'Main Hospital',
    service: 'Follow-up'
  },
  {
    id: 'apt-008',
    patientId: 'pat-milo',
    patientName: 'Milo',
    patientPhoto: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&q=80&w=100',
    species: 'Cat',
    ownerName: 'Ahmed Rahman',
    ownerPhone: '+8801712345678',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Ahmed',
    date: '2026-08-16',
    time: '10:00 AM',
    reason: 'Vaccination Follow-up',
    status: 'confirmed',
    branch: 'North Clinic',
    service: 'Follow-up'
  }
];

export const DEMO_MEDICAL_RECORDS: MedicalRecord[] = [
  {
    id: 'med-001',
    patientId: 'pat-milo',
    doctorId: 'doc-sarah',
    date: '2026-08-05',
    chiefComplaint: 'Annual vaccination due, mild sneezing',
    symptoms: 'Occasional sneezing, clear nasal discharge, appetite normal',
    temperature: '38.6°C',
    weight: '4.2 kg',
    heartRate: '180 bpm',
    respiratoryRate: '24 rpm',
    clinicalExamination: 'Eyes clear, ears clean, coat condition good, lymph nodes normal, respiratory sounds clear',
    diagnosis: 'Healthy — routine vaccination candidate. Mild upper respiratory irritation (non-infectious)',
    treatmentPlan: 'FVRCP vaccination administered. Monitor sneezing — if persists beyond 5 days, recheck for upper respiratory infection.',
    followUpDate: '2026-08-16',
    status: 'completed'
  },
  {
    id: 'med-002',
    patientId: 'pat-bruno',
    doctorId: 'doc-partha',
    date: '2026-08-01',
    chiefComplaint: 'Limping on right hind leg after exercise',
    symptoms: 'Intermittent lameness, worse after long walks, stiff gait in morning',
    temperature: '38.8°C',
    weight: '32.5 kg',
    heartRate: '90 bpm',
    respiratoryRate: '18 rpm',
    clinicalExamination: 'Right hip joint shows reduced range of motion, mild pain on extension, muscle mass bilaterally symmetrical, no swelling',
    diagnosis: 'Bilateral hip dysplasia — mild to moderate. Right side exacerbation.',
    treatmentPlan: '1. Carprofen 75mg PO SID x 10 days\n2. Joint supplement (Glucosamine/Chondroitin) daily\n3. Restrict vigorous exercise for 2 weeks\n4. Weight management program initiated',
    followUpDate: '2026-08-15',
    status: 'completed'
  },
  {
    id: 'med-003',
    patientId: 'pat-bella',
    doctorId: 'doc-sarah',
    date: '2026-08-08',
    chiefComplaint: 'Difficulty breathing, open-mouth panting at rest',
    symptoms: 'Increased respiratory rate, wheezing, reduced appetite, lethargy',
    temperature: '39.2°C',
    weight: '3.5 kg',
    heartRate: '200 bpm',
    respiratoryRate: '40 rpm',
    clinicalExamination: 'Increased respiratory effort, bilateral wheezing on auscultation, mucous membranes pink, CRT < 2 sec, body condition 5/9',
    diagnosis: 'Feline asthma — acute exacerbation',
    treatmentPlan: '1. Dexamethasone 0.5mg IV STAT\n2. Salbutamol nebulization x 15 min\n3. Prednisolone 5mg PO SID x 7 days, then taper\n4. Environmental allergen assessment recommended\n5. Recheck in 48 hours',
    followUpDate: '2026-08-10',
    status: 'completed'
  }
];

export const DEMO_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-001',
    patientId: 'pat-milo',
    doctorId: 'doc-sarah',
    date: '2026-08-05',
    diagnosis: 'Healthy — Routine Vaccination',
    medicines: [
      {
        name: 'FVRCP Vaccine',
        dosage: '1 dose (0.5 mL)',
        frequency: 'Single dose',
        duration: 'N/A',
        instructions: 'Subcutaneous injection administered. Monitor for 30 minutes post-vaccination.'
      }
    ],
    specialInstructions: 'Keep indoors for 24 hours post-vaccination. Provide fresh water and quiet rest. If lethargy persists beyond 48 hours, contact clinic.',
    followUpDate: '2026-08-16'
  },
  {
    id: 'rx-002',
    patientId: 'pat-bruno',
    doctorId: 'doc-partha',
    date: '2026-08-01',
    diagnosis: 'Bilateral Hip Dysplasia — Mild/Moderate',
    medicines: [
      {
        name: 'Carprofen (Rimadyl)',
        dosage: '75 mg',
        frequency: 'Once daily',
        duration: '10 days',
        instructions: 'Give with food to prevent GI upset.'
      },
      {
        name: 'Glucosamine Chondroitin Supplement',
        dosage: '500 mg',
        frequency: 'Once daily',
        duration: 'Ongoing',
        instructions: 'Give with breakfast. Continue indefinitely for joint support.'
      },
      {
        name: 'Omega-3 Fish Oil',
        dosage: '1000 mg',
        frequency: 'Once daily',
        duration: 'Ongoing',
        instructions: 'Puncture capsule and mix with food.'
      }
    ],
    specialInstructions: 'Strict rest for 2 weeks — no running, jumping, or rough play. Leash walks only (15 minutes, 3 times daily). Recheck in 2 weeks.',
    followUpDate: '2026-08-15'
  },
  {
    id: 'rx-003',
    patientId: 'pat-bella',
    doctorId: 'doc-sarah',
    date: '2026-08-08',
    diagnosis: 'Feline Asthma — Acute Exacerbation',
    medicines: [
      {
        name: 'Prednisolone',
        dosage: '5 mg',
        frequency: 'Once daily',
        duration: '7 days',
        instructions: 'Oral tablet. Give after food. Taper as directed.'
      },
      {
        name: 'Salbutamol Inhaler (with Aerokat)',
        dosage: '1 puff',
        frequency: 'Twice daily',
        duration: '14 days',
        instructions: 'Use with AeroKat spacer. Administer when wheezing is audible.'
      },
      {
        name: 'Doxycycline',
        dosage: '25 mg',
        frequency: 'Once daily',
        duration: '10 days',
        instructions: 'Given with food to prevent esophageal stricture. Follow with water灌.'
      }
    ],
    specialInstructions: 'Avoid scented litter, incense, and aerosol sprays in the home. Keep environment dust-free. If breathing difficulty worsens or appetite drops, bring in immediately.',
    followUpDate: '2026-08-10'
  }
];

export const DEMO_VACCINATIONS: VaccinationRecord[] = [
  {
    id: 'vac-001',
    patientId: 'pat-milo',
    vaccineName: 'FVRCP',
    dateGiven: '2026-08-05',
    dose: 'Booster',
    nextDueDate: '2027-08-05',
    batchNumber: 'FVR-2026-B045',
    notes: 'No adverse reaction observed',
    administeredBy: 'Dr. Sarah Ahmed'
  },
  {
    id: 'vac-002',
    patientId: 'pat-milo',
    vaccineName: 'Rabies',
    dateGiven: '2026-01-15',
    dose: 'Annual',
    nextDueDate: '2027-01-15',
    batchNumber: 'RAB-2026-A112',
    administeredBy: 'Dr. Sarah Ahmed'
  },
  {
    id: 'vac-003',
    patientId: 'pat-bruno',
    vaccineName: 'DHPP (Distemper combo)',
    dateGiven: '2025-12-10',
    dose: 'Annual Booster',
    nextDueDate: '2026-12-10',
    batchNumber: 'DHPP-2025-X088',
    administeredBy: 'Dr. Partha Sarathi Chanda'
  },
  {
    id: 'vac-004',
    patientId: 'pat-bruno',
    vaccineName: 'Rabies',
    dateGiven: '2025-12-10',
    dose: 'Triennial',
    nextDueDate: '2028-12-10',
    batchNumber: 'RAB-2025-X099',
    administeredBy: 'Dr. Partha Sarathi Chanda'
  },
  {
    id: 'vac-005',
    patientId: 'pat-luna',
    vaccineName: 'FVRCP',
    dateGiven: '2025-07-20',
    dose: 'Booster overdue',
    nextDueDate: '2026-07-20',
    batchNumber: 'FVR-2025-M032',
    administeredBy: 'Dr. Sarah Ahmed'
  },
  {
    id: 'vac-006',
    patientId: 'pat-max',
    vaccineName: 'DHPP (Distemper combo)',
    dateGiven: '2026-03-15',
    dose: 'Annual',
    nextDueDate: '2027-03-15',
    batchNumber: 'DHPP-2026-D021',
    administeredBy: 'Dr. Partha Sarathi Chanda'
  },
  {
    id: 'vac-007',
    patientId: 'pat-tommy',
    vaccineName: 'DHPP (Distemper combo)',
    dateGiven: '2025-06-01',
    dose: 'Overdue',
    nextDueDate: '2026-06-01',
    batchNumber: 'DHPP-2025-K055',
    administeredBy: 'Dr. Aslam Hossain'
  },
  {
    id: 'vac-008',
    patientId: 'pat-bella',
    vaccineName: 'FVRCP',
    dateGiven: '2026-02-20',
    dose: 'Annual',
    nextDueDate: '2027-02-20',
    batchNumber: 'FVR-2026-B018',
    administeredBy: 'Dr. Sarah Ahmed'
  }
];

export const DEMO_LAB_REPORTS: LabReport[] = [
  {
    id: 'lab-001',
    patientId: 'pat-bruno',
    patientName: 'Bruno',
    testName: 'Complete Blood Count (CBC)',
    date: '2026-08-01',
    status: 'completed',
    doctorId: 'doc-partha',
    doctorName: 'Dr. Partha Sarathi Chanda',
    results: 'WBC: 11.2 x10^3/uL (Normal)\nRBC: 7.1 x10^6/uL (Normal)\nHemoglobin: 15.8 g/dL (Normal)\nPlatelets: 285 x10^3/uL (Normal)\nNeutrophils: 68% (Normal)\nLymphocytes: 25% (Normal)',
    interpretation: 'Within normal limits. No signs of infection or anemia.'
  },
  {
    id: 'lab-002',
    patientId: 'pat-bruno',
    patientName: 'Bruno',
    testName: 'Hip Joint X-Ray Report',
    date: '2026-08-01',
    status: 'reviewed',
    doctorId: 'doc-partha',
    doctorName: 'Dr. Partha Sarathi Chanda',
    results: 'Bilateral hip dysplasia confirmed. Norberg angle: Right 95°, Left 98°. Mild osteoarthritic changes on right femoral head.',
    interpretation: 'Moderate hip dysplasia. Conservative management recommended. Surgical options discussed with owner.'
  },
  {
    id: 'lab-003',
    patientId: 'pat-bella',
    patientName: 'Bella',
    testName: 'Serum Biochemistry Panel',
    date: '2026-08-08',
    status: 'completed',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Ahmed',
    results: 'Glucose: 95 mg/dL (Normal)\nBUN: 22 mg/dL (Normal)\nCreatinine: 1.4 mg/dL (Normal)\nALT: 45 U/L (Normal)\nALP: 38 U/L (Normal)\nTotal Protein: 7.2 g/dL (Normal)\nAlbumin: 3.1 g/dL (Normal)',
    interpretation: 'Biochemistry within normal limits. Rule out systemic disease as cause of respiratory symptoms.'
  },
  {
    id: 'lab-004',
    patientId: 'pat-milo',
    patientName: 'Milo',
    testName: 'Fecal Flotation Test',
    date: '2026-08-05',
    status: 'completed',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Ahmed',
    results: 'No internal parasites detected. No eggs, cysts, or oocysts found.',
    interpretation: 'Negative for intestinal parasites. Current deworming protocol is effective.'
  }
];

export const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    type: 'appointment',
    title: 'New Appointment Assigned',
    message: 'Milo — Annual Vaccination scheduled at 09:00 AM today.',
    time: '8:00 AM',
    read: false,
    patientId: 'pat-milo'
  },
  {
    id: 'notif-002',
    type: 'follow-up',
    title: 'Follow-up Reminder',
    message: 'Bruno — Follow-up due in 6 days for hip joint assessment.',
    time: '8:15 AM',
    read: false,
    patientId: 'pat-bruno'
  },
  {
    id: 'notif-003',
    type: 'vaccination',
    title: 'Vaccination Overdue',
    message: 'Luna — FVRCP booster is overdue since 20 Jul 2026.',
    time: '8:30 AM',
    read: true,
    patientId: 'pat-luna'
  },
  {
    id: 'notif-004',
    type: 'lab-report',
    title: 'Lab Report Ready',
    message: 'CBC results for Bruno are available for review.',
    time: 'Yesterday',
    read: true,
    patientId: 'pat-bruno'
  },
  {
    id: 'notif-005',
    type: 'follow-up',
    title: 'Follow-up Tomorrow',
    message: 'Bella — Recheck for asthma exacerbation scheduled tomorrow at 03:30 PM.',
    time: 'Yesterday',
    read: true,
    patientId: 'pat-bella'
  },
  {
    id: 'notif-006',
    type: 'vaccination',
    title: 'Vaccination Reminder',
    message: 'Tommy — DHPP booster was due in June 2026. Schedule immediately.',
    time: '2 days ago',
    read: true,
    patientId: 'pat-tommy'
  }
];

export const DEMO_SCHEDULE: DoctorSchedule[] = [
  { day: 'Saturday', slots: [{ startTime: '10:00 AM', endTime: '2:00 PM', isBreak: false }, { startTime: '4:00 PM', endTime: '8:00 PM', isBreak: false }], branch: 'North Clinic', isAvailable: true },
  { day: 'Sunday', slots: [{ startTime: '10:00 AM', endTime: '2:00 PM', isBreak: false }, { startTime: '4:00 PM', endTime: '8:00 PM', isBreak: false }], branch: 'North Clinic', isAvailable: true },
  { day: 'Monday', slots: [{ startTime: '10:00 AM', endTime: '2:00 PM', isBreak: false }, { startTime: '4:00 PM', endTime: '8:00 PM', isBreak: false }], branch: 'North Clinic', isAvailable: true },
  { day: 'Tuesday', slots: [{ startTime: '10:00 AM', endTime: '2:00 PM', isBreak: false }, { startTime: '4:00 PM', endTime: '8:00 PM', isBreak: false }], branch: 'North Clinic', isAvailable: true },
  { day: 'Wednesday', slots: [{ startTime: '10:00 AM', endTime: '2:00 PM', isBreak: false }], branch: 'North Clinic', isAvailable: true },
  { day: 'Thursday', slots: [{ startTime: '10:00 AM', endTime: '1:00 PM', isBreak: false }], branch: 'Main Hospital', isAvailable: true },
  { day: 'Friday', slots: [], branch: 'Off', isAvailable: false }
];
