import React, { useState } from 'react';
import { SERVICES, BRANCHES, DOCTORS } from '../../data/mockData';
import { AppointmentFormState } from '../../types';
import { Input, Select, Textarea } from '../ui/FormElements';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { X, Calendar, CheckCircle2, ShieldAlert, PhoneCall, HeartHandshake } from 'lucide-react';

export interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedDoctorId?: string;
  preselectedBranchId?: string;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId = '',
  preselectedDoctorId = '',
  preselectedBranchId = ''
}) => {
  const [formData, setFormData] = useState<AppointmentFormState>({
    ownerName: '',
    phone: '',
    email: '',
    petType: 'dog',
    petName: '',
    serviceId: preselectedServiceId || SERVICES[0].id,
    branchId: preselectedBranchId || BRANCHES[0].id,
    doctorId: preselectedDoctorId || 'any',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    preferredTime: '10:00 AM',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const selectedService = SERVICES.find(s => s.id === formData.serviceId);
  const selectedBranch = BRANCHES.find(b => b.id === formData.branchId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8 overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded border border-teal-800/80">
              Entity Veterinary Hospital
            </span>
            <Badge variant="demo" size="sm">Demo Booking Engine</Badge>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
            Book a Veterinary Appointment
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Fast, compassionate care for your pet in Chattogram, Bangladesh.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold font-display text-slate-900">
                  Appointment Request Demo Complete!
                </h3>
                <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-800">{formData.ownerName || 'Pet Parent'}</strong>! Your appointment request for <strong className="text-teal-700">{formData.petName || 'your pet'}</strong> has been simulated.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 text-slate-700 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500 font-medium">Service:</span>
                  <span className="font-semibold text-slate-900">{selectedService?.title}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500 font-medium">Branch Location:</span>
                  <span className="font-semibold text-slate-900">{selectedBranch?.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500 font-medium">Preferred Date & Time:</span>
                  <span className="font-semibold text-slate-900">{formData.preferredDate} at {formData.preferredTime}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500 font-medium">Contact Phone:</span>
                  <span className="font-semibold text-slate-900">{formData.phone || '[Provided]'}</span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-800 text-left flex items-start gap-2.5 max-w-md mx-auto">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold">Tectonic Presentation Note:</strong>
                  This is a functional UI flow created for Entity Veterinary presentation. In production, this connects to WhatsApp notification, SMS confirmation, or direct hospital software.
                </div>
              </div>

              <div className="pt-3">
                <Button variant="primary" size="lg" onClick={handleReset} fullWidth>
                  Return to Website Demo
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Pet & Service Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Pet Name"
                  required
                  placeholder="e.g. Milo, Rocky, Coco"
                  value={formData.petName}
                  onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                />

                <Select
                  label="Pet Species / Category"
                  required
                  value={formData.petType}
                  onChange={(e) => setFormData({ ...formData, petType: e.target.value as any })}
                  options={[
                    { value: 'dog', label: 'Dog 🐶' },
                    { value: 'cat', label: 'Cat 🐱' },
                    { value: 'bird', label: 'Bird 🦜' },
                    { value: 'exotic', label: 'Exotic Pet / Reptile 🐢' },
                    { value: 'other', label: 'Other Companion Animal' }
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Requested Service"
                  required
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  options={SERVICES.map(s => ({
                    value: s.id,
                    label: `${s.title} ${s.isEmergency ? '🚨' : ''}`
                  }))}
                />

                <Select
                  label="Hospital Branch"
                  required
                  value={formData.branchId}
                  onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                  options={BRANCHES.map(b => ({
                    value: b.id,
                    label: `${b.name} (${b.area})`
                  }))}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Select
                  label="Doctor Preference"
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  options={[
                    { value: 'any', label: 'Any Available Doctor' },
                    ...DOCTORS.map(d => ({
                      value: d.id,
                      label: `${d.name} (${d.title})`
                    }))
                  ]}
                />

                <Input
                  label="Preferred Date"
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                />

                <Select
                  label="Preferred Time"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  options={[
                    { value: '09:00 AM', label: '09:00 AM' },
                    { value: '11:00 AM', label: '11:00 AM' },
                    { value: '02:00 PM', label: '02:00 PM' },
                    { value: '05:00 PM', label: '05:00 PM' },
                    { value: '07:30 PM', label: '07:30 PM' }
                  ]}
                />
              </div>

              {/* Owner Contact */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-3">
                  Pet Parent Contact Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    required
                    placeholder="Your Name"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  />

                  <Input
                    label="Phone Number (WhatsApp preferred)"
                    required
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="mt-4">
                  <Textarea
                    label="Symptoms or Notes for the Doctor"
                    placeholder="Describe any symptoms, special care instructions, or questions..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </div>

              {/* Emergency Banner */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 flex items-center justify-between text-xs text-red-800">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Is your pet experiencing a critical emergency?</span>
                </div>
                <a
                  href="tel:+8801700000000"
                  className="font-bold text-red-700 underline shrink-0 hover:text-red-900"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Emergency Hotline Demo: In production, this dials Entity Veterinary 24/7 Emergency Triage immediately.");
                  }}
                >
                  Call 24/7 Hotline
                </a>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <Button variant="outline" type="button" onClick={onClose} className="bg-white">
                  Cancel
                </Button>
                <Button variant="primary" type="submit" isLoading={isSubmitting} icon={Calendar}>
                  Confirm Appointment Booking
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
