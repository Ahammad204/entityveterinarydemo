import { Doctor, Service, Branch, BlogPost, Product } from '../types';

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-partha',
    slug: 'dr-partha',
    name: 'Dr. Partha',
    title: 'Co-Founder & CEO',
    role: 'Veterinary Healthcare Management & Leadership',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
    bio: 'Visionary leader with 8+ years of experience in veterinary healthcare management.',
    specialties: ['Veterinary Healthcare Management', 'Executive Leadership', 'Hospital Operations'],
    experienceYears: 8,
    education: 'Information to be confirmed',
    certifications: 'Information to be confirmed',
    isFounder: true,
    statusNotice: 'Fact Verified'
  },
  {
    id: 'dr-aslam',
    slug: 'dr-aslam-hossain',
    name: 'Dr. Aslam Hossain',
    title: 'Chief Operating Officer',
    role: 'Operations & Patient Care Quality Assurance',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600',
    bio: 'Operations expert ensuring excellence in every aspect of patient care.',
    specialties: ['Clinical Operations', 'Patient Care Excellence', 'Quality Management'],
    education: 'Information to be confirmed',
    certifications: 'Information to be confirmed',
    isFounder: false,
    statusNotice: 'Fact Verified'
  },
  {
    id: 'dr-clinical-associate-1',
    slug: 'dr-clinical-associate-1',
    name: 'Clinical Associate Practitioner',
    title: 'Veterinary Clinical Officer',
    role: 'General Consultations & Patient Assessment',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    bio: 'Clinical staff providing routine health evaluations and patient triage.',
    specialties: ['General Physical Exam', 'Triage Assessment'],
    education: 'Information to be confirmed',
    certifications: 'Information to be confirmed',
    statusNotice: 'Information to be confirmed'
  },
  {
    id: 'dr-diagnostics-lead',
    slug: 'dr-diagnostics-lead',
    name: 'Diagnostics & Imaging Specialist',
    title: 'Diagnostic Officer',
    role: 'Diagnostic Imaging & Laboratory Analysis',
    image: 'https://images.unsplash.com/photo-1594824813566-88824278c065?auto=format&fit=crop&q=80&w=600',
    bio: 'Diagnostic specialist overseeing imaging workflows and laboratory tests.',
    specialties: ['X-Ray Evaluation', 'Laboratory Diagnostics'],
    education: 'Information to be confirmed',
    certifications: 'Information to be confirmed',
    statusNotice: 'Information to be confirmed'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'veterinary-consultation',
    title: 'Veterinary Consultation',
    category: 'clinical',
    shortDesc: 'Comprehensive physical examination, health assessment, diagnostic evaluation, and expert treatment planning.',
    fullDesc: 'Our experienced clinical team provides thorough head-to-tail health exams for dogs, cats, and small animals. From routine wellness checks to complex disease management, we listen to your concerns and formulate clear care plans.',
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&q=80&w=800',
    features: ['Head-to-Tail Exam', 'Vital Signs Monitoring', 'Behavioral & Health Counseling', 'Customized Treatment Plan'],
    demoNotice: 'Demo Content — Consultation scheduling framework',
    detailData: {
      overview: 'A general veterinary consultation is the cornerstone of proactive pet healthcare. During each consultation, our veterinary clinicians evaluate your pet\'s physical condition, body score, dental health, eye and ear condition, heart rate, and respiratory sounds to detect early signs of illness before they escalate.',
      includes: [
        'Complete physical and vital signs examination (temperature, pulse, respiration)',
        'Otoscopic ear and ophthalmic eye evaluation',
        'Abdominal palpation and orthopedic joint check',
        'Nutritional and weight assessment',
        'Discussion of owner concerns and symptom history',
        'Personalized treatment and preventive prescription plan'
      ],
      suitableFor: [
        'Routine annual or semi-annual wellness checkups for pets of all ages',
        'Pets exhibiting signs of lethargy, appetite loss, or sudden behavioral changes',
        'Puppies and kittens starting their initial healthcare journey',
        'Senior pets requiring chronic condition monitoring (e.g. arthritis, kidney health)'
      ],
      petOwnerNotes: [
        'Please bring any previous medical records or vaccination passports if available.',
        'If your pet is anxious, consider using a secure carrier for cats or a sturdy leash for dogs.',
        'Write down any recent changes in diet, water intake, or bathroom habits to share during consultation.'
      ],
      faqs: [
        {
          question: 'How long does a standard veterinary consultation take?',
          answer: 'A standard routine consultation usually takes 20 to 30 minutes. If your pet requires specialized diagnostic testing or acute stabilization, additional time will be allocated.'
        },
        {
          question: 'What should I bring to my pet\'s first appointment at Entity Veterinary?',
          answer: 'Bring your pet\'s medical history, vaccination records, current medications, and a list of any questions or symptoms you wish to discuss.'
        },
        {
          question: 'Can I request a specific veterinarian for my consultation?',
          answer: 'Yes, when booking online or by phone, you can express a preference for Dr. Partha, Dr. Aslam Hossain, or available specialist doctors.'
        }
      ],
      seoTitle: 'Veterinary Consultation Services in Chattogram | Entity Veterinary Hospital',
      seoMetaDescription: 'Book a professional veterinary consultation at Entity Veterinary Hospital in Chattogram. Thorough physical examinations, diagnostics, and compassionate pet healthcare.',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": "Veterinary Medical Consultation",
        "procedureType": "DiagnosticProcedure",
        "provider": {
          "@type": "VeterinaryCare",
          "name": "Entity Veterinary Hospital",
          "address": "Chattogram, Bangladesh"
        },
        "description": "Comprehensive physical examination and clinical evaluation for pets."
      }, null, 2)
    }
  },
  {
    id: 'diagnostics-lab',
    title: 'In-House Diagnostics & Imaging',
    category: 'diagnostic',
    shortDesc: 'Digital X-Ray, ultrasonography, complete blood count (CBC), biochemistry, and infectious disease rapid testing.',
    fullDesc: 'Equipped with digital imaging and laboratory analyzers, Entity Veterinary provides rapid diagnostic turnarounds so our medical team can pinpoint health conditions accurately and initiate targeted therapy without delay.',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    features: ['High-Resolution Digital X-Ray', 'Abdominal & Cardiac Ultrasound', 'In-House Blood & Urine Panels', 'Rapid Antigen Test Kits'],
    demoNotice: 'Demo Content — Diagnostic equipment & testing workflows',
    detailData: {
      overview: 'Accurate veterinary treatment relies on timely diagnostic insight. Our diagnostic department combines advanced digital radiology, ultrasonography, and point-of-care laboratory analysis to evaluate organ function, detect internal injuries, and screen for systemic infectious diseases.',
      includes: [
        'Digital X-Ray imaging for bone fractures, thoracic, and abdominal views',
        'Diagnostic ultrasonography for soft tissue and organ evaluation',
        'Complete Blood Count (CBC) and serum biochemistry profiling',
        'Microscopic skin cytology and ear swab analysis',
        'Rapid diagnostic test kits for Parvovirus, Distemper, and Feline Leukemia'
      ],
      suitableFor: [
        'Pets experiencing acute trauma, limping, or suspected bone fractures',
        'Pets with chronic vomiting, diarrhea, or unexplained weight loss',
        'Pre-anesthetic blood screening before surgical procedures',
        'Routine health screening for senior dogs and cats'
      ],
      petOwnerNotes: [
        'For abdominal ultrasound or specific blood tests, fasting (8-12 hours) may be required. Our team will advise you when scheduling.',
        'X-rays and scans are non-invasive; mild sedation is only used if a pet is in significant pain or distress.'
      ],
      faqs: [
        {
          question: 'How quickly do we get diagnostic test results?',
          answer: 'In-house blood panels, digital X-rays, and rapid antigen tests yield results within 15 to 30 minutes during your visit.'
        },
        {
          question: 'Is digital X-Ray safe for my pet?',
          answer: 'Yes, modern digital X-rays use minimal radiation exposures and provide instant crystal-clear images reviewed by our veterinary team.'
        }
      ],
      seoTitle: 'In-House Pet Diagnostics & Digital X-Ray Chattogram | Entity Veterinary',
      seoMetaDescription: 'Advanced veterinary lab tests, digital radiology, and ultrasound in Chattogram. Fast in-house results for accurate diagnosis and emergency care.',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalTest",
        "name": "Veterinary Diagnostic Suite",
        "usedToDiagnose": "Animal illnesses, trauma, organ disease",
        "provider": {
          "@type": "VeterinaryCare",
          "name": "Entity Veterinary Hospital",
          "address": "Chattogram, Bangladesh"
        }
      }, null, 2)
    }
  },
  {
    id: 'surgical-care',
    title: 'Veterinary Surgery & Anesthesia',
    category: 'surgical',
    shortDesc: 'Sterile surgical suite for soft tissue procedures, spay/neuter, wound repair, and emergency abdominal surgery.',
    fullDesc: 'Our dedicated surgical theater adheres to strict aseptic protocols, gentle multi-agent anesthesia, continuous vital monitoring, and compassionate post-operative recovery care.',
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
    features: ['Sterile Operating Theater', 'Multi-Parameter Anesthesia Monitor', 'Routine Spay & Neuter', 'Soft Tissue & Emergency Surgery'],
    demoNotice: 'Demo Content — Surgical capabilities overview',
    detailData: {
      overview: 'Whether performing a routine preventive spay/neuter or a complex emergency abdominal surgery, safety and patient comfort are our top surgical priorities. Each surgical patient undergoes pre-anesthetic risk evaluation and receives dedicated monitoring from preparation to full recovery.',
      includes: [
        'Pre-surgical physical exam and mandatory blood screening options',
        'Inhalation anesthesia with real-time multi-parameter monitoring (ECG, SpO2, blood pressure)',
        'Sterile surgical packs, patient warming systems, and aseptic protocols',
        'Tailored perioperative pain management protocols',
        'Post-operative monitoring in temperature-controlled recovery units'
      ],
      suitableFor: [
        'Pet owners seeking safe routine spay and neuter procedures',
        'Pets needing soft tissue procedures (tumor removals, wound repair, foreign body removal)',
        'Emergency surgical emergencies (lacerations, gastrointestinal obstructions)'
      ],
      petOwnerNotes: [
        'Strict fasting (food withheld for 8–12 hours prior) is required before anesthesia unless instructed otherwise.',
        'Post-operative rest and keeping an Elizabethan collar (E-collar) on your pet is essential to protect incision sites during healing.'
      ],
      faqs: [
        {
          question: 'How is anesthesia monitored during surgery?',
          answer: 'Every surgical patient is monitored continuously by a dedicated staff member using digital multi-parameter sensors tracking heart rate, oxygen levels, and body temperature.'
        },
        {
          question: 'When can my pet return home after surgery?',
          answer: 'For routine procedures, pets typically go home the same evening once fully awake, stable, and comfortable.'
        }
      ],
      seoTitle: 'Veterinary Surgery & Spay/Neuter in Chattogram | Entity Veterinary',
      seoMetaDescription: 'Safe veterinary surgery, sterile operating theater, and continuous anesthesia monitoring at Entity Veterinary Hospital in Chattogram.',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SurgicalProcedure",
        "name": "Veterinary Surgical Care",
        "provider": {
          "@type": "VeterinaryCare",
          "name": "Entity Veterinary Hospital"
        }
      }, null, 2)
    }
  },
  {
    id: 'preventive-care',
    title: 'Preventive Care & Vaccination',
    category: 'preventive',
    shortDesc: 'Core vaccinations, anti-parasitic treatments, deworming, microchipping, and pet health passports.',
    fullDesc: 'Protect your pet from preventable infectious diseases like Rabies, Parvovirus, Distemper, and FVRCP. We create age-appropriate immunization schedules tailored to Chattogram\'s climate and environmental factors.',
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800',
    features: ['Core Vaccines (Rabies, DHPP, FVRCP)', 'Internal Deworming & Heartworm Risk Care', 'External Flea & Tick Protocols', 'Official Pet Health Passport'],
    demoNotice: 'Standard immunization protocols overview',
    detailData: {
      overview: 'Preventive care is the most effective way to ensure a long, healthy life for your companion. By administering timely vaccines, maintaining parasite protection, and documenting wellness in a Pet Health Passport, we shield your pet from severe regional health threats.',
      includes: [
        'Core puppy/kitten series and booster vaccinations',
        'Rabies immunization with official certification',
        'Broad-spectrum internal deworming treatments',
        'Topical and oral flea and tick prevention recommendations',
        'Pet health passport setup for travel and record-keeping'
      ],
      suitableFor: [
        'New puppies and kittens from 6 weeks of age onwards',
        'Adult dogs and cats needing annual or triennial booster shots',
        'Pets relocating or requiring health passports'
      ],
      petOwnerNotes: [
        'Ensure your pet is healthy and free of fever on vaccination day for optimal immune response.',
        'Mild sleepiness for 24 hours post-vaccination is normal; contact us if lethargy persists beyond 48 hours.'
      ],
      faqs: [
        {
          question: 'Why are vaccinations vital for pets in Chattogram?',
          answer: 'Endemic viral threats like Parvovirus and Rabies pose significant risks to unvaccinated animals. Timely vaccines build lifesaving antibodies.'
        },
        {
          question: 'How often should my adult pet be dewormed?',
          answer: 'In tropical climates like Bangladesh, routine internal deworming every 3 months is recommended for active pets.'
        }
      ],
      seoTitle: 'Pet Vaccination & Preventive Wellness Chattogram | Entity Veterinary',
      seoMetaDescription: 'Protect your dogs and cats with core vaccines, Rabies shots, deworming, and health passports at Entity Veterinary Hospital Chattogram.',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "MedicalProcedure",
        "name": "Pet Immunization & Preventive Care",
        "provider": {
          "@type": "VeterinaryCare",
          "name": "Entity Veterinary Hospital"
        }
      }, null, 2)
    }
  },
  {
    id: 'pet-grooming',
    title: 'Pet Grooming & Hygiene',
    category: 'wellness',
    shortDesc: 'Gentle medicated baths, coat trimming, nail clipping, ear flush, and hygiene maintenance.',
    fullDesc: 'Professional grooming keeps your pet clean, comfortable, and free from matted coat issues, skin fungal conditions, or painful ingrown nails.',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    features: ['Medicated & Anti-Fungal Baths', 'Sanitary & Coat Trimming', 'Precision Nail Clipping', 'Ear Cleaning & Flushing'],
    demoNotice: 'Demo Content — Pet Spa & Grooming lounge',
    detailData: {
      overview: 'Grooming is essential for both aesthetic appeal and dermatological health. Chattogram\'s humid weather can trap moisture in dense fur, leading to hot spots and fungal dermatitis. Our trained groomers handle pets gently, using vet-approved products.',
      includes: [
        'Warm water bath with soothing hypo-allergenic or medicated shampoo',
        'Gentle blow dry and coat brush-out',
        'Nail trimming and paw pad hair clearing',
        'Ear canal cleaning and debris removal',
        'Sanitary area trim and styling'
      ],
      suitableFor: [
        'Long-haired breeds prone to fur matting and tangles',
        'Pets recovering from skin conditions requiring therapeutic medicated baths',
        'Routine hygiene upkeep for household dogs and cats'
      ],
      petOwnerNotes: [
        'Please inform our groomers if your pet has skin sensitivities, allergies, or arthritic joints.',
        'Pets must be up to date on core vaccinations before entering the grooming suite.'
      ],
      faqs: [
        {
          question: 'How long does a full grooming session take?',
          answer: 'A standard full grooming session takes approximately 1.5 to 2.5 hours depending on coat length and pet temperament.'
        },
        {
          question: 'Do you groom nervous or easily stressed cats?',
          answer: 'Yes, our grooming team uses fear-free gentle handling techniques tailored for sensitive feline guests.'
        }
      ],
      seoTitle: 'Professional Pet Grooming & Spa Chattogram | Entity Veterinary',
      seoMetaDescription: 'Gentle pet baths, anti-fungal treatments, coat styling, nail trimming, and ear care at Entity Veterinary Hospital Chattogram.',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Veterinary Pet Grooming",
        "provider": {
          "@type": "VeterinaryCare",
          "name": "Entity Veterinary Hospital"
        }
      }, null, 2)
    }
  },
  {
    id: 'pet-boarding',
    title: 'Pet Boarding & Daycare',
    category: 'boarding',
    shortDesc: 'Clean, secure, climate-controlled boarding facilities with daily veterinary supervision and care.',
    fullDesc: 'When you are away on travel or business, Entity Veterinary provides a safe, comfortable, and medically supervised home away from home for your pets in Chattogram.',
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800',
    features: ['Climate-Controlled Individual Suites', 'Daily Veterinary Health Check', 'Customized Feeding Schedules', 'Supervised Play & Exercise'],
    demoNotice: 'Demo Content — Pet Boarding concept',
    detailData: {
      overview: 'Our pet boarding facility combines home-like comfort with the peace of mind of on-site veterinary care. Whether staying overnight or for an extended vacation, every guest receives individualized care, premium nutrition, and veterinary oversight.',
      includes: [
        'Individual sanitized kennel suites for dogs and cats',
        'Daily health checks by on-duty clinical staff',
        'Nutritious meal service according to owner instructions',
        'Fresh water refill and continuous sanitation',
        'Supervised exercise sessions in secure indoor play areas'
      ],
      suitableFor: [
        'Pet owners traveling out of town or undergoing home renovations',
        'Pets requiring regular medication or post-operative monitoring during owner absence',
        'Dogs and cats that thrive in safe, socialized environments'
      ],
      petOwnerNotes: [
        'Vaccination proof (Rabies, DHPP/FVRCP) is strictly required prior to check-in to ensure a safe environment for all guests.',
        'You are welcome to bring your pet\'s favorite blanket, toy, or food to help them feel at ease.'
      ],
      faqs: [
        {
          question: 'Can you administer daily medication during boarding?',
          answer: 'Yes, because our facility is attached to Entity Veterinary Hospital, trained clinical staff administer medications accurately.'
        },
        {
          question: 'What are the check-in and check-out hours for boarding?',
          answer: 'Check-in and check-out are available daily during regular operating hours (9:00 AM to 8:00 PM).'
        }
      ],
      seoTitle: 'Pet Boarding & Daycare in Chattogram | Entity Veterinary Hospital',
      seoMetaDescription: 'Safe, clean, climate-controlled pet boarding and daycare in Chattogram with daily veterinary supervision. Book your pet\'s stay today.',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Pet Boarding & Daycare",
        "provider": {
          "@type": "VeterinaryCare",
          "name": "Entity Veterinary Hospital"
        }
      }, null, 2)
    }
  },
  {
    id: 'emergency-care',
    title: '24/7 Emergency & Critical Care',
    category: 'emergency',
    shortDesc: 'Rapid triage, oxygen therapy, trauma stabilization, IV fluids, and immediate surgical response.',
    fullDesc: 'Equipped to handle acute trauma, toxicities, heat stroke, respiratory distress, and severe infections with around-the-clock clinical monitoring.',
    icon: 'AlertCircle',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800',
    features: ['Immediate Clinical Triage', 'Oxygen & IV Fluid Therapy', 'Critical Care Monitoring Unit', 'Immediate Trauma Surgery Preparedness'],
    isEmergency: true,
    demoNotice: 'Emergency framework demonstrated — specific hours to be confirmed',
    detailData: {
      overview: 'Veterinary emergencies require immediate action, expert medical assessment, and high-level medical equipment. Our critical care unit is prepared to stabilize pets facing life-threatening conditions ranging from severe trauma to toxic ingestion.',
      includes: [
        'Priority triage and immediate stabilization upon arrival',
        'Oxygen cage therapy and emergency airway support',
        'Intravenous (IV) fluid resuscitation and blood pressure management',
        'Emergency diagnostic blood work and point-of-care ultrasound',
        '24/7 continuous vital signs monitoring'
      ],
      suitableFor: [
        'Pets involved in vehicle accidents, falls, or animal bites',
        'Pets experiencing difficulty breathing, collapsed gums, or pale mucous membranes',
        'Pets with suspected poisoning, toxin ingestion, or severe allergic reaction',
        'Pets suffering from continuous seizures or acute urinary obstruction'
      ],
      petOwnerNotes: [
        'If possible, call our emergency line while en route so our clinical team can prepare the triage station.',
        'Keep your pet warm and calm during transit, minimizing movement if trauma is suspected.'
      ],
      faqs: [
        {
          question: 'What should I do if my pet ingests something toxic?',
          answer: 'Bring the packaging, plant sample, or substance with you immediately. Do NOT induce vomiting unless specifically directed by a veterinarian.'
        },
        {
          question: 'Is emergency triage available without an advance appointment?',
          answer: 'Yes! Emergency patients are evaluated immediately upon arrival based on clinical urgency.'
        }
      ],
      seoTitle: '24/7 Emergency Veterinary Care Chattogram | Entity Veterinary',
      seoMetaDescription: 'Immediate 24/7 emergency veterinary care, trauma surgery, oxygen therapy, and critical care in Chattogram. Call or visit immediately.',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "EmergencyService",
        "name": "Veterinary Emergency & Critical Care",
        "provider": {
          "@type": "VeterinaryCare",
          "name": "Entity Veterinary Hospital"
        }
      }, null, 2)
    }
  },
  {
    id: 'pet-pharmacy-nutrition',
    title: 'Veterinary Pharmacy & Clinical Diets',
    category: 'clinical',
    shortDesc: 'Prescription veterinary medications, therapeutic diets, skin supplements, and antiparasitics.',
    fullDesc: 'Authentic veterinary pharmaceuticals, skin supplements, cardiac care medications, and targeted diets for renal, gastrointestinal, and weight support.',
    icon: 'Pill',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    features: ['Prescription Medicines', 'Therapeutic Diets', 'Joint & Skin Supplements', 'Verified Authentic Products'],
    demoNotice: 'Demo Content — On-site pharmacy catalog',
    detailData: {
      overview: 'Having immediate access to authentic veterinary pharmaceuticals and specialized prescription diets ensures your pet receives the exact medication formulated for their recovery and health maintenance.',
      includes: [
        'Prescription antibiotics, analgesics, and anti-inflammatories',
        'Therapeutic prescription diets for kidney, liver, urinary, and GI conditions',
        'Dermatological shampoos, skin barrier supplements, and omega oils',
        'Heartworm and broad-spectrum antiparasitic medications'
      ],
      suitableFor: [
        'Pets undergoing medical treatment prescribed by a licensed veterinarian',
        'Pets with chronic conditions requiring specialized therapeutic nutrition',
        'Pet owners seeking guaranteed authentic veterinary medications in Chattogram'
      ],
      petOwnerNotes: [
        'Prescription medications require a valid prescription or recent consultation with an Entity Veterinary clinician.',
        'Store all medications in a cool, dry place away from children and pets.'
      ],
      faqs: [
        {
          question: 'Can I purchase prescription diets without a veterinary consultation?',
          answer: 'Therapeutic diets are formulated for specific health conditions, so our team will verify your pet\'s medical history before dispensing.'
        }
      ],
      seoTitle: 'Veterinary Pharmacy & Prescription Diets Chattogram | Entity Veterinary',
      seoMetaDescription: 'Authentic veterinary pharmacy, prescription medications, supplements, and specialized clinical pet food in Chattogram.',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Pharmacy",
        "name": "Entity Veterinary Pharmacy",
        "provider": {
          "@type": "VeterinaryCare",
          "name": "Entity Veterinary Hospital"
        }
      }, null, 2)
    }
  }
];

export const BRANCHES: Branch[] = [
  {
    id: 'branch-chattogram-main',
    slug: 'main-hospital-chattogram',
    name: 'Entity Veterinary Hospital — Main Hospital',
    area: 'Chattogram Central',
    city: 'Chattogram, Bangladesh',
    regionCategory: 'chattogram',
    address: 'Street address to be confirmed, Chattogram',
    phone: 'Phone number to be confirmed',
    emergencyPhone: 'Emergency hotline to be confirmed',
    hours: 'Opening hours to be confirmed',
    status: 'main',
    features: ['24/7 Emergency Triage', 'Operating Theater', 'In-House Laboratory', 'Pharmacy & Clinical Diets', 'Grooming & Boarding'],
    availableServices: ['emergency-care', 'surgical-care', 'diagnostic-imaging', 'veterinary-consultation', 'preventive-care', 'pet-grooming-hygiene', 'pet-boarding-daycare', 'pet-pharmacy-nutrition'],
    availableDoctors: ['dr-partha', 'dr-aslam', 'dr-clinical-associate-1', 'dr-diagnostics-lead'],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
    description: 'Our primary veterinary hospital hub serving pets across central Chattogram with full-spectrum clinical, surgical, and emergency care.',
    cmsNotice: 'Main Hospital Node — Live database synchronization ready'
  },
  {
    id: 'branch-chattogram-north',
    slug: 'north-chattogram-clinic',
    name: 'Entity Veterinary — North Clinic & Grooming',
    area: 'North Chattogram',
    city: 'Chattogram, Bangladesh',
    regionCategory: 'chattogram',
    address: 'Branch address to be confirmed, Chattogram',
    phone: 'Phone number to be confirmed',
    emergencyPhone: 'Hotline number to be confirmed',
    hours: 'Opening hours to be confirmed',
    status: 'demo',
    features: ['Wellness Consultations', 'Vaccination Desk', 'Pet Grooming Lounge', 'On-Site Pharmacy'],
    availableServices: ['veterinary-consultation', 'preventive-care', 'pet-grooming-hygiene', 'pet-pharmacy-nutrition'],
    availableDoctors: ['dr-aslam', 'dr-clinical-associate-1'],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
    description: 'Satellite clinical care center specializing in routine checkups, vaccinations, skin care, and professional pet grooming.',
    cmsNotice: 'Satellite Node — Headless CMS connected'
  },
  {
    id: 'branch-dhaka-demo',
    slug: 'dhaka-care-center',
    name: 'Entity Veterinary — Dhaka Regional Node',
    area: 'Dhaka Metropolitan',
    city: 'Dhaka, Bangladesh',
    regionCategory: 'other',
    address: 'Branch address to be confirmed, Dhaka',
    phone: 'Phone number to be confirmed',
    emergencyPhone: 'Hotline number to be confirmed',
    hours: 'Opening hours to be confirmed',
    status: 'upcoming',
    features: ['Consultation Suites', 'Diagnostic Screening', 'Vaccination Desk', 'Regional Tele-Triage'],
    availableServices: ['veterinary-consultation', 'preventive-care', 'diagnostic-imaging', 'pet-pharmacy-nutrition'],
    availableDoctors: ['dr-partha', 'dr-diagnostics-lead'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    description: 'Demonstration placeholder representing future regional expansion to Dhaka under Entity Veterinary network management.',
    cmsNotice: 'Expansion Node — Database record schema configured'
  },
  {
    id: 'branch-sylhet-demo',
    slug: 'sylhet-partner-clinic',
    name: 'Entity Veterinary — Sylhet Partner Clinic',
    area: 'Sylhet Division',
    city: 'Sylhet, Bangladesh',
    regionCategory: 'other',
    address: 'Branch address to be confirmed, Sylhet',
    phone: 'Phone number to be confirmed',
    emergencyPhone: 'Hotline number to be confirmed',
    hours: 'Opening hours to be confirmed',
    status: 'demo',
    features: ['Outpatient Consultations', 'Preventive Care', 'Partner Pharmacy'],
    availableServices: ['veterinary-consultation', 'preventive-care', 'pet-pharmacy-nutrition'],
    availableDoctors: ['dr-clinical-associate-1'],
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800',
    description: 'Partner network facility model demonstrating multi-region appointment routing and patient database sharing.',
    cmsNotice: 'Partner Node — Dynamic API schema ready'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-monsoon-pet-care',
    slug: 'monsoon-pet-care-chattogram',
    title: 'Essential Monsoon Pet Care: Protecting Dogs and Cats in Chattogram',
    category: 'Pet Health',
    date: 'August 2026',
    readTime: '4 min read',
    excerpt: 'High atmospheric humidity and monsoon rainfall in coastal Chattogram elevate risks of fungal dermatitis, ear infections, and waterborne parasites.',
    author: 'Dr. Partha Sarathi Barua',
    authorRole: 'Clinical Director & Veterinary Lead',
    authorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800',
    demoNotice: 'Demo Content — Local Organic SEO Strategy Example',
    content: {
      introduction: 'During the coastal rainy season in Chattogram, pet owners face distinct environmental health challenges. Prolonged dampness, wet paws after walks, and high ambient humidity create ideal conditions for fungal skin overgrowth, external parasites, and gastrointestinal upsets.',
      sections: [
        {
          heading: '1. Moisture Management & Paw Drying Protocols',
          body: 'After outdoor rain walks, thoroughly towel-dry your dog\'s coat and pay special attention to the interdigital paw pads. Leaving paws damp encourages Malassezia yeast overgrowth and painful interdigital dermatitis.',
          bulletPoints: [
            'Wipe paws with clean water and dry with a soft absorbent towel after outdoor outings.',
            'Trim excess pad hair to prevent mud and moisture entrapment.',
            'Avoid walking through stagnant puddles where bacterial pathogens accumulate.'
          ]
        },
        {
          heading: '2. Ear Hygiene & Humidity Controls',
          body: 'Floppy-eared breeds like Golden Retrievers and Cocker Spaniels are especially vulnerable to humid ear canal infections (Otitis Externa). Inspect ears weekly for redness, odor, or excess discharge.',
          bulletPoints: [
            'Use a veterinarian-approved pH-balanced ear drying cleanser.',
            'Never insert cotton swabs deep into the ear canal.',
            'Keep indoor bedding clean, dry, and elevated off humid floors.'
          ]
        },
        {
          heading: '3. Internal Parasite & Deworming Safeguards',
          body: 'Humid ground moisture speeds parasite egg development. Ensure your pet\'s internal deworming and core anti-parasitic schedules are fully up-to-date.'
        }
      ],
      conclusion: 'By maintaining proactive daily drying habits, clean living areas, and routine clinical checkups, pet parents can keep their companions vibrant and itch-free throughout the wet season.',
      disclaimer: 'Educational & Demo Notice: This article is produced as a demonstration of Tectonic\'s organic search content strategy for Entity Veterinary Hospital. It does not replace direct clinical consultation with a licensed veterinarian.'
    },
    seo: {
      metaTitle: 'Essential Monsoon Pet Care in Chattogram | Entity Veterinary Hospital',
      metaDescription: 'Protect your dogs and cats during Chattogram\'s monsoon season. Expert guidance on fungal skin care, paw drying, ear hygiene, and parasite prevention.',
      ogTitle: 'Monsoon Pet Care Guide — Entity Veterinary Hospital Chattogram',
      ogDescription: 'Practical veterinary advice for managing damp weather, coat moisture, and ear care during the coastal rainy season in Bangladesh.',
      ogImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200',
      canonicalUrl: 'https://entityveterinary.com/blog/monsoon-pet-care-chattogram',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Essential Monsoon Pet Care: Protecting Dogs and Cats in Chattogram",
        "description": "Protecting pets from monsoon fungal infections, dampness, and parasites in Chattogram.",
        "author": {
          "@type": "Person",
          "name": "Dr. Partha Sarathi Barua"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Entity Veterinary Hospital",
          "url": "https://entityveterinary.com"
        },
        "datePublished": "2026-08-01"
      }, null, 2)
    }
  },
  {
    id: 'post-vaccination-schedule',
    slug: 'puppy-kitten-vaccination-schedule',
    title: 'Puppy & Kitten Vaccination Guide: What Every Pet Parent Needs to Know',
    category: 'Preventive Care',
    date: 'July 2026',
    readTime: '5 min read',
    excerpt: 'Understanding Rabies, DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza), and FVRCP vaccine schedules for lifelong companion immunity.',
    author: 'Dr. Ananya Rahman',
    authorRole: 'Preventive Medicine Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1594824813566-78a9c33630f9?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800',
    demoNotice: 'Demo Content — Immunization Schedule SEO Resource',
    content: {
      introduction: 'Immunization is the cornerstone of lifelong pet wellness. In South Asian urban environments, viral threats like Canine Parvovirus and Feline Panleukopenia remain widespread among unimmunized populations. A structured puppy and kitten vaccination timeline builds vital maternal antibody replacement.',
      sections: [
        {
          heading: '1. Canine Core Vaccination Timeline (DHPP + Rabies)',
          body: 'Puppy immunization begins at 6 to 8 weeks of age, followed by booster shots every 3 to 4 weeks until approximately 16 weeks.',
          bulletPoints: [
            '6–8 Weeks: First DHPP (Distemper, Parvovirus) core dose.',
            '10–12 Weeks: Second DHPP booster + Leptospirosis evaluation.',
            '14–16 Weeks: Final puppy DHPP booster + Rabies primary dose.',
            'Annual / Triennial: Adult booster shots and Rabies renewal.'
          ]
        },
        {
          heading: '2. Feline Core Vaccination Schedule (FVRCP + Rabies)',
          body: 'Kittens require protection against Feline Viral Rhinotracheitis, Calicivirus, and Panleukopenia starting around 8 weeks of age.',
          bulletPoints: [
            '8 Weeks: Primary FVRCP vaccine dose.',
            '12 Weeks: FVRCP booster dose.',
            '16 Weeks: Rabies vaccination & Pet Health Passport setup.'
          ]
        },
        {
          heading: '3. What to Expect Post-Vaccination',
          body: 'Mild drowsiness or slight tenderness at the injection site for 12–24 hours is a normal immune response. Fresh water, quiet rest, and gentle attention help your pet recover smoothly.'
        }
      ],
      conclusion: 'Keeping an accurate Pet Health Passport ensures your companion stays protected, legal, and eligible for boarding or travel.',
      disclaimer: 'Educational & Demo Notice: Vaccination timelines vary based on individual maternal antibody levels and clinical assessment by a licensed veterinarian.'
    },
    seo: {
      metaTitle: 'Puppy & Kitten Vaccination Schedule | Entity Veterinary Chattogram',
      metaDescription: 'Complete immunization guide for puppies and kittens in Bangladesh. Learn about Rabies, DHPP, FVRCP vaccines, and booster timelines.',
      ogTitle: 'Puppy & Kitten Vaccine Guide — Entity Veterinary Hospital',
      ogDescription: 'Step-by-step vaccination schedule to shield your young dog or cat from infectious diseases in Chattogram.',
      ogImage: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=1200',
      canonicalUrl: 'https://entityveterinary.com/blog/puppy-kitten-vaccination-schedule',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Puppy & Kitten Vaccination Guide: What Every Pet Parent Needs to Know",
        "description": "Comprehensive puppy and kitten vaccination schedule and preventive health guide.",
        "author": {
          "@type": "Person",
          "name": "Dr. Ananya Rahman"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Entity Veterinary Hospital"
        },
        "datePublished": "2026-07-20"
      }, null, 2)
    }
  },
  {
    id: 'post-feline-canine-nutrition',
    slug: 'feline-canine-nutrition-guide',
    title: 'Optimal Pet Nutrition & Hydration: Preventing Kidney & Urinary Issues',
    category: 'Nutrition',
    date: 'July 2026',
    readTime: '6 min read',
    excerpt: 'Balanced protein ratios, clean hydration stations, and therapeutic prescription diets for feline lower urinary tract disease (FLUTD) and renal health.',
    author: 'Dr. Aslam Hossain',
    authorRole: 'Clinical Medicine Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800',
    demoNotice: 'Demo Content — Pet Dietary & Renal Health SEO Example',
    content: {
      introduction: 'Proper nutrition is fundamental to companion organ health. In warm climates like Bangladesh, inadequate fluid intake combined with unbalanced commercial or home-cooked diets can increase risks of urinary crystals, bladder stones, and renal strain.',
      sections: [
        {
          heading: '1. Feline Hydration Strategies & FLUTD Prevention',
          body: 'Cats have a low natural thirst drive derived from desert ancestors. Feeding exclusively dry kibble without sufficient moisture enrichment can concentrate urine, leading to painful crystal formation.',
          bulletPoints: [
            'Incorporate high-quality wet canned food into daily feeding routines.',
            'Place multiple recirculating water fountains in quiet household spots.',
            'Avoid excessive sodium or unverified table scraps.'
          ]
        },
        {
          heading: '2. Dog Nutrition: Portion Control & Life-Stage Needs',
          body: 'Growing puppies, active adults, and senior dogs require tailored macro-nutrient ratios. Overfeeding high-calorie human foods often leads to obesity, pancreatitis, and joint strain.',
          bulletPoints: [
            'Measure daily food portions using a standard cup or digital scale.',
            'Ensure protein sources are highly digestible and veterinary recommended.',
            'Provide joint supplements (glucosamine, omega-3 fatty acids) for aging dogs.'
          ]
        },
        {
          heading: '3. When to Consider Therapeutic Clinical Diets',
          body: 'Pets diagnosed with urinary tract crystals, chronic kidney disease (CKD), or food allergies benefit significantly from precise clinical prescription diets.'
        }
      ],
      conclusion: 'Consulting a veterinarian before making drastic diet changes helps tailor nutrition to your pet\'s specific breed, age, and renal status.',
      disclaimer: 'Educational & Demo Notice: Prescription diets require clinical diagnosis and veterinary prescription prior to administration.'
    },
    seo: {
      metaTitle: 'Optimal Pet Nutrition & Hydration Guide | Entity Veterinary',
      metaDescription: 'Learn how proper nutrition, wet food hydration, and therapeutic diets protect dogs and cats against urinary tract disease and renal strain.',
      ogTitle: 'Pet Nutrition & Urinary Health Guide — Entity Veterinary Hospital',
      ogDescription: 'Veterinary guide on feline hydration, canine protein balance, and urinary crystal prevention in Chattogram.',
      ogImage: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=1200',
      canonicalUrl: 'https://entityveterinary.com/blog/feline-canine-nutrition-guide',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Optimal Pet Nutrition & Hydration: Preventing Kidney & Urinary Issues",
        "description": "Veterinary article on pet dietary requirements and renal disease prevention.",
        "author": {
          "@type": "Person",
          "name": "Dr. Aslam Hossain"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Entity Veterinary Hospital"
        },
        "datePublished": "2026-07-12"
      }, null, 2)
    }
  },
  {
    id: 'post-humidity-coat-hygiene',
    slug: 'humidity-coat-hygiene-grooming',
    title: 'Managing Humidity & Matting: Coat Hygiene for Long-Haired Breeds',
    category: 'Grooming',
    date: 'June 2026',
    readTime: '4 min read',
    excerpt: 'Preventing fur matting, hot spots, and fungal dermatitis in Persian cats, Golden Retrievers, and Shih Tzus through professional coat hygiene.',
    author: 'Grooming & Hygiene Desk',
    authorRole: 'Professional Pet Care Team',
    authorAvatar: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    demoNotice: 'Demo Content — Pet Spa & Grooming Hygiene Guide',
    content: {
      introduction: 'Long-coated pets living in coastal Bangladesh require diligent grooming care. High humidity causes loose undercoat fur to tangle and trap moisture, resulting in painful skin mats, trapped dirt, and localized bacterial hot spots.',
      sections: [
        {
          heading: '1. Daily De-Shedding & Undercoat Raking',
          body: 'Regular brushing removes dead hair before it clumps into tight skin-level mats. Using a stainless-steel comb and slicker brush reaches the dense undercoat without pulling delicate skin.',
          bulletPoints: [
            'Brush Persian cats and long-haired dogs for 10–15 minutes daily.',
            'Never brush a dry, matted coat forcefully; use a detangling spray mist first.',
            'Pay close attention to high-friction areas: under armpits, behind ears, and groin.'
          ]
        },
        {
          heading: '2. Medicated Baths & Anti-Fungal Rinses',
          body: 'When humidity triggers itching or greasy coats, therapeutic medicated baths containing chlorhexidine or ketoconazole help restore the skin\'s natural protective barrier.',
          bulletPoints: [
            'Lather gently and leave medicated shampoo on the skin for 8–10 minutes before rinsing.',
            'Rinse thoroughly with lukewarm water to remove all soap residue.',
            'Dry completely with a low-heat high-velocity blow dryer.'
          ]
        },
        {
          heading: '3. Professional Sanitary & Paw Trimming',
          body: 'Sanitary trims keep the rear coat clean, while paw pad hair trimming prevents wet mud accumulation during walks.'
        }
      ],
      conclusion: 'Routine professional grooming keeps long-haired companions comfortable, stylish, and free from painful skin complications.',
      disclaimer: 'Educational & Demo Notice: For severe fur matting near sensitive skin, seek professional veterinary grooming assistance to avoid accidental scissor cuts.'
    },
    seo: {
      metaTitle: 'Pet Grooming & Coat Hygiene in Chattogram | Entity Veterinary',
      metaDescription: 'Expert tips on preventing fur matting, hot spots, and fungal skin issues in long-haired dogs and cats in humid weather.',
      ogTitle: 'Coat Hygiene & Grooming Guide — Entity Veterinary Hospital',
      ogDescription: 'How to manage Persian cat fur, Golden Retriever coats, and skin hygiene in coastal Bangladesh.',
      ogImage: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=1200',
      canonicalUrl: 'https://entityveterinary.com/blog/humidity-coat-hygiene-grooming',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "Managing Humidity & Matting: Coat Hygiene for Long-Haired Breeds",
        "description": "Pet grooming and coat maintenance advice for humid climates.",
        "author": {
          "@type": "Organization",
          "name": "Entity Veterinary Grooming Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Entity Veterinary Hospital"
        },
        "datePublished": "2026-06-28"
      }, null, 2)
    }
  },
  {
    id: 'post-new-pet-parent-checklist',
    slug: 'new-pet-parent-checklist-guide',
    title: 'New Pet Parent Checklist: Preparing Your Home for a Rescue Kitten or Dog',
    category: 'Pet Parenting',
    date: 'June 2026',
    readTime: '5 min read',
    excerpt: 'Essential home preparation, poisonous household items to remove, initial health screening, and stress-free acclimation for adopted pets.',
    author: 'Entity Veterinary Clinical Team',
    authorRole: 'Patient Care & Education Desk',
    authorAvatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=800',
    demoNotice: 'Demo Content — Pet Parenting Guide for Local SEO',
    content: {
      introduction: 'Welcoming a new rescue dog or kitten into your household is an exciting milestone. Setting up a safe space, removing toxic hazards, and scheduling an initial health checkup ensures a smooth transition into family life.',
      sections: [
        {
          heading: '1. Pet-Proofing Your Living Space',
          body: 'Curious animals explore with their mouths. Take time to inspect your apartment or house for common household hazards before bringing your new companion home.',
          bulletPoints: [
            'Secure loose electrical cords and place toxic cleaning chemicals in locked cabinets.',
            'Remove toxic indoor plants (e.g., Lilies, Sago Palms, Pothos, Oleander).',
            'Ensure balcony railings and window screens are securely netted to prevent falls.'
          ]
        },
        {
          heading: '2. The First 3 Days: Quiet Safe Zone Setup',
          body: 'Rehoming can feel overwhelming for a rescued pet. Designate a quiet room equipped with a soft bed, fresh water bowl, litter box (for cats), and familiar toys.',
          bulletPoints: [
            'Allow your pet to explore at their own pace without forcing social interaction.',
            'Maintain a consistent feeding and potty break schedule.',
            'Use soothing tones and positive reinforcement treats.'
          ]
        },
        {
          heading: '3. Scheduling the Initial Comprehensive Health Exam',
          body: 'Book a comprehensive veterinary wellness checkup within the first 48–72 hours to evaluate weight, screen for parasites, check ears, and initiate vaccine planning.'
        }
      ],
      conclusion: 'Patience, loving routines, and early veterinary partnership set the foundation for years of happy companionship.',
      disclaimer: 'Educational & Demo Notice: Always consult a veterinarian immediately if a newly adopted pet shows signs of extreme lethargy, refusal to eat, or continuous coughing.'
    },
    seo: {
      metaTitle: 'New Pet Parent Checklist & Preparation Guide | Entity Veterinary',
      metaDescription: 'Step-by-step checklist for adopting a new dog or cat in Bangladesh. Home pet-proofing tips, safe spaces, and initial health checkups.',
      ogTitle: 'New Pet Parent Checklist — Entity Veterinary Hospital Chattogram',
      ogDescription: 'How to prepare your home and family for a new rescue kitten or puppy with guidance from Entity Veterinary.',
      ogImage: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=1200',
      canonicalUrl: 'https://entityveterinary.com/blog/new-pet-parent-checklist-guide',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "New Pet Parent Checklist: Preparing Your Home for a Rescue Kitten or Dog",
        "description": "Essential adoption preparation checklist and home pet-proofing advice.",
        "author": {
          "@type": "Organization",
          "name": "Entity Veterinary Clinical Team"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Entity Veterinary Hospital"
        },
        "datePublished": "2026-06-15"
      }, null, 2)
    }
  },
  {
    id: 'post-emergency-signs',
    slug: 'emergency-veterinary-warning-signs',
    title: '5 Warning Signs Your Pet Needs Immediate Emergency Veterinary Triage',
    category: 'Pet Health',
    date: 'May 2026',
    readTime: '3 min read',
    excerpt: 'Recognizing urgent clinical red flags such as pale or blue gums, labored panting, collapse, bloat, or toxic ingestion before situation worsens.',
    author: 'Dr. Aslam Hossain',
    authorRole: 'Emergency & Critical Care Lead',
    authorAvatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800',
    demoNotice: 'Demo Content — Emergency Clinical Awareness Guide',
    content: {
      introduction: 'In acute medical emergencies, early recognition saved lives. Knowing which symptoms demand immediate clinical triage allows pet parents to act swiftly when every minute counts.',
      sections: [
        {
          heading: '1. Respiratory Distress & Open-Mouth Breathing',
          body: 'Labored abdominal breathing, rapid panting without heat exposure, or cats open-mouth breathing indicates severe hypoxia, pulmonary edema, or airway blockage requiring oxygen therapy.',
          bulletPoints: [
            'Gums appearing white, blue, or deep purple rather than healthy pink.',
            'Extended neck stretching to draw air in.'
          ]
        },
        {
          heading: '2. Abdominal Distension & Unproductive Retching (Bloat / GDV)',
          body: 'Sudden swelling of the abdomen accompanied by anxious pacing and unproductive attempts to vomit is a classic sign of Gastric Dilatation-Volvulus (GDV), a life-threatening surgical emergency in deep-chested dogs.'
        },
        {
          heading: '3. Inability to Urinate (Feline Urinary Obstruction)',
          body: 'Male cats straining repeatedly in the litter box without passing urine are experiencing a medical emergency. Complete blockage leads to acute kidney injury and electrolyte imbalance within 24 hours.'
        },
        {
          heading: '4. Continuous Seizures or Sudden Neurological Collapse',
          body: 'Seizures lasting longer than 2 minutes or recurring cluster seizures require immediate pharmacological stabilization to prevent brain overheating.'
        },
        {
          heading: '5. Suspected Toxic Ingestion or Severe Physical Trauma',
          body: 'Ingestion of rat poison, human medications, chocolate, or severe vehicular trauma requires immediate emergency facility transport.'
        }
      ],
      conclusion: 'If you observe any of these emergency warning signs, contact our 24/7 Chattogram Main Hospital emergency desk immediately.',
      disclaimer: 'Educational & Demo Notice: Do not attempt home remedies or force food/liquids if your pet shows severe emergency symptoms.'
    },
    seo: {
      metaTitle: '5 Veterinary Emergency Warning Signs | Entity Veterinary Chattogram',
      metaDescription: 'Recognize critical pet emergency symptoms: respiratory distress, bloat, pale gums, urinary blockage, and seizures. 24/7 triage guidance.',
      ogTitle: 'Emergency Pet Care Warning Signs — Entity Veterinary Hospital',
      ogDescription: 'Crucial warning signs that require immediate veterinary triage at Entity Veterinary Hospital in Chattogram.',
      ogImage: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1200',
      canonicalUrl: 'https://entityveterinary.com/blog/emergency-veterinary-warning-signs',
      structuredDataJson: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "5 Warning Signs Your Pet Needs Immediate Emergency Veterinary Triage",
        "description": "Veterinary emergency triage guidance for pet owners.",
        "author": {
          "@type": "Person",
          "name": "Dr. Aslam Hossain"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Entity Veterinary Hospital"
        },
        "datePublished": "2026-05-10"
      }, null, 2)
    }
  }
];

export const CLIENT_TECTONIC_NOTES = {
  agencyName: 'Tectonic',
  clientName: 'Entity Veterinary Hospital',
  location: 'Chattogram, Bangladesh',
  conceptGoal: 'Comprehensive digital strategy and web application demo built to showcase healthcare excellence, trust, emergency accessibility, and seamless booking for Chattogram pet owners.',
  officialLinks: {
    website: 'https://entityveterinary.com/',
    googleSites: 'https://sites.google.com/view/entityveterinaryhospital/home',
    facebook: 'https://www.facebook.com/share/19JJaRpM7w/'
  }
};

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 'prod-adult-dog-kibble',
    slug: 'premium-adult-dog-kibble-chicken-rice',
    name: 'VitalCare Premium Adult Dog Kibble (Chicken & Rice Formula)',
    category: 'Pet Food',
    priceBdt: 1850,
    originalPriceBdt: 2100,
    rating: 4.8,
    reviewCount: 34,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Specially formulated balanced daily nutrition with high-quality protein and essential fatty acids for adult dogs.',
    fullDesc: 'VitalCare Premium Dog Kibble provides optimal energy levels, lean muscle maintenance, and digestive support. Contains real roasted chicken, brown rice, and prebiotics suitable for active companion dogs.',
    benefits: [
      'High protein chicken formula for strong muscle tone',
      'Enriched with Omega-3 and Omega-6 for coat shine',
      'Natural prebiotic fibers for smooth digestion',
      'Free from artificial colors or harsh chemical preservers'
    ],
    usageInstructions: 'Serve according to body weight chart. Ensure clean drinking water is available at all times.',
    stockStatus: 'In Stock (Demo)',
    petType: 'Dogs',
    demoNotice: 'Demo Product — Fictional E-commerce Catalog Example'
  },
  {
    id: 'prod-feline-salmon-wet-food',
    slug: 'feline-salmon-omega-wet-food-pack',
    name: 'PurrPure Salmon & Omega Feline Wet Food Pouch (12-Pack)',
    category: 'Pet Food',
    priceBdt: 1450,
    originalPriceBdt: 1600,
    rating: 4.9,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Moisture-rich salmon paté crafted to support feline urinary tract health and optimal hydration.',
    fullDesc: 'Formulated for cats living in humid coastal environments, this gravy pouch delivers essential hydration alongside taurine and omega-3 fatty acids for heart and eye vitality.',
    benefits: [
      'High moisture content supports renal & bladder health',
      'Rich in natural taurine for eyesight and cardiac support',
      'Irresistible natural salmon broth flavor'
    ],
    usageInstructions: 'Feed 1 to 2 pouches daily based on adult cat weight. Refrigerate unused portion up to 24 hours.',
    stockStatus: 'In Stock (Demo)',
    petType: 'Cats',
    demoNotice: 'Demo Product — Fictional E-commerce Catalog Example'
  },
  {
    id: 'prod-canine-joint-chews',
    slug: 'canine-joint-mobility-chewables',
    name: 'FlexiPaw Glucosamine & Chondroitin Joint Support Chews',
    category: 'Supplements',
    priceBdt: 1250,
    originalPriceBdt: 1400,
    rating: 4.7,
    reviewCount: 28,
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Veterinary-inspired soft chewables to maintain hip cartilage and joint flexibility in aging or active dogs.',
    fullDesc: 'Combines Glucosamine HCl, Chondroitin Sulfate, MSM, and Organic Turmeric to help soothe joint stiffness and support smooth mobility.',
    benefits: [
      'Supports cartilage matrix renewal and flexibility',
      'Soft liver-flavored chewable texture dogs enjoy',
      'Ideal for senior dogs or large breeds'
    ],
    usageInstructions: 'Give 1 soft chew per 10kg body weight daily with meals.',
    stockStatus: 'In Stock (Demo)',
    petType: 'Dogs',
    demoNotice: 'Demo Product — Fictional E-commerce Catalog Example'
  },
  {
    id: 'prod-feline-hairball-drops',
    slug: 'feline-hairball-coat-support-drops',
    name: 'SilkyFur Feline Hairball & Coat Conditioning Drops (60ml)',
    category: 'Supplements',
    priceBdt: 950,
    rating: 4.6,
    reviewCount: 19,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Tasty liquid supplement designed to assist smooth hairball passage and nourish Persian cat coats.',
    fullDesc: 'Formulated with cold-pressed salmon oil and zinc to reduce excessive shedding and gently lubricate ingested fur in long-coated breeds.',
    benefits: [
      'Helps prevent uncomfortable hairball buildup in stomach',
      'Promotes thick, shiny, tangle-resistant fur',
      'Easy liquid dropper application over regular food'
    ],
    usageInstructions: 'Add 1 ml daily into daily cat food or lick from clean bowl.',
    stockStatus: 'In Stock (Demo)',
    petType: 'Cats',
    demoNotice: 'Demo Product — Fictional E-commerce Catalog Example'
  },
  {
    id: 'prod-oatmeal-pet-shampoo',
    slug: 'hypoallergenic-oatmeal-pet-shampoo',
    name: 'GentleCoat Organic Oatmeal & Aloe Pet Shampoo (500ml)',
    category: 'Grooming',
    priceBdt: 850,
    originalPriceBdt: 950,
    rating: 4.8,
    reviewCount: 51,
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Sulfate-free, pH-balanced soothing coat bath for sensitive, itchy skin in tropical climates.',
    fullDesc: 'Infused with colloidal oatmeal and natural aloe vera extract to soothe monsoon skin allergies, clear environmental dust, and leave a light fresh aroma.',
    benefits: [
      'Calms sensitive, dry, or irritated pet skin',
      'Tearless formula safe for sensitive areas',
      'Rinses cleanly without stripping skin oil'
    ],
    usageInstructions: 'Wet coat thoroughly with warm water, apply shampoo, lather gently for 5 minutes, then rinse completely.',
    stockStatus: 'In Stock (Demo)',
    petType: 'Dogs & Cats',
    demoNotice: 'Demo Product — Fictional E-commerce Catalog Example'
  },
  {
    id: 'prod-deshedding-brush',
    slug: 'pro-deshedding-stainless-undercoat-brush',
    name: 'ProGroom Ergonomic Stainless Undercoat De-Shedding Brush',
    category: 'Grooming',
    priceBdt: 720,
    rating: 4.9,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Reaches deep beneath topcoat to safely remove loose undercoat fur and reduce home shedding.',
    fullDesc: 'Features fine stainless steel teeth designed to glide safely through coat layers without scratching skin, significantly reducing fur matting.',
    benefits: [
      'Reduces loose hair shedding up to 90%',
      'Non-slip rubber ergonomic grip',
      'Quick fur ejection button'
    ],
    usageInstructions: 'Brush gently in the direction of coat growth once or twice weekly.',
    stockStatus: 'In Stock (Demo)',
    petType: 'Dogs & Cats',
    demoNotice: 'Demo Product — Fictional E-commerce Catalog Example'
  },
  {
    id: 'prod-reflective-harness',
    slug: 'padded-reflective-dog-harness-leash-set',
    name: 'SafeStride Padded Reflective Dog Harness & Heavy-Duty Leash',
    category: 'Accessories',
    priceBdt: 1100,
    originalPriceBdt: 1300,
    rating: 4.8,
    reviewCount: 37,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'No-choke breathable chest harness with 3M reflective stitching for evening safety.',
    fullDesc: 'Padded with soft mesh lining to distribute pulling pressure evenly across chest and shoulders rather than neck.',
    benefits: [
      'High-visibility reflective trim for night walks',
      'Dual leash ring attachment points (front & back)',
      'Fully adjustable chest straps with quick-release buckles'
    ],
    usageInstructions: 'Adjust buckles for a two-finger space fit between harness and dog skin.',
    stockStatus: 'In Stock (Demo)',
    petType: 'Dogs',
    demoNotice: 'Demo Product — Fictional E-commerce Catalog Example'
  },
  {
    id: 'prod-slow-feeder-bowl',
    slug: 'ceramic-elevated-slow-feeder-bowl',
    name: 'EcoPet Ceramic Elevated Anti-Gulping Slow Feeder Bowl',
    category: 'Accessories',
    priceBdt: 880,
    rating: 4.7,
    reviewCount: 22,
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Reduces eating speed, prevents choking bloat, and protects pet neck posture.',
    fullDesc: 'Designed with internal maze obstacles that slow down rapid eating habits, encouraging healthy chewing and improved digestion.',
    benefits: [
      'Slows feeding time up to 5x to prevent choking',
      'Heavy-weight ceramic prevents bowl tipping or sliding',
      'Dishwasher safe and non-toxic ceramic glaze'
    ],
    usageInstructions: 'Spread daily kibble or wet food evenly across inner bowl ridges.',
    stockStatus: 'In Stock (Demo)',
    petType: 'Dogs & Cats',
    demoNotice: 'Demo Product — Fictional E-commerce Catalog Example'
  },
  {
    id: 'prod-dental-kit',
    slug: 'enzymatic-pet-dental-toothpaste-brush-kit',
    name: 'DentaFresh Enzymatic Pet Toothpaste & Finger Brush Kit',
    category: 'Healthcare Products',
    priceBdt: 680,
    rating: 4.6,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Chicken-flavored enzymatic toothpaste formula that targets plaque, tartar, and bad breath.',
    fullDesc: 'Natural enzymes break down food residues along gumlines without requiring aggressive brushing. Safe to swallow with no foaming agents.',
    benefits: [
      'Enzymatic action works to break down soft tartar',
      'Includes soft silicone finger brush for gentle massaging',
      'Non-foaming, safe-if-swallowed formula'
    ],
    usageInstructions: 'Apply small dab on finger brush and gently stroke teeth and gums 2–3 times weekly.',
    stockStatus: 'In Stock (Demo)',
    petType: 'Dogs & Cats',
    demoNotice: 'Demo Product — Fictional E-commerce Catalog Example'
  },
  {
    id: 'prod-ear-cleanser',
    slug: 'clinical-ph-balanced-ear-drying-cleanser',
    name: 'OtoClean Clinical pH-Balanced Pet Ear Cleansing Solution (120ml)',
    category: 'Healthcare Products',
    priceBdt: 790,
    originalPriceBdt: 900,
    rating: 4.9,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800',
    shortDesc: 'Veterinary-grade gentle ear flush to remove excess wax, debris, and monsoon ear moisture.',
    fullDesc: 'Non-irritating ear wash containing salicylic acid and tea tree extracts to dry excess ear moisture and maintain healthy ear canals.',
    benefits: [
      'Dries trapped water after baths or rain walks',
      'Helps neutralize unpleasant ear odors',
      'Gentle non-stinging clinical formulation'
    ],
    usageInstructions: 'Fill ear canal gently, massage base of ear for 30 seconds, and allow pet to shake head. Wipe clean with soft gauze.',
    stockStatus: 'In Stock (Demo)',
    petType: 'Dogs & Cats',
    demoNotice: 'Demo Product — Fictional E-commerce Catalog Example'
  }
];
