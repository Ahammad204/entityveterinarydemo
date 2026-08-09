import React from 'react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Calendar, PhoneCall, ShieldCheck, HeartHandshake } from 'lucide-react';

export interface CTASectionProps {
  title?: string;
  subtitle?: string;
  onBook: () => void;
  onContact?: () => void;
  variant?: 'teal' | 'dark' | 'emergency';
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = "Give Your Pet the Premier Healthcare They Deserve",
  subtitle = "Book an appointment with Chattogram's dedicated veterinary professionals at Entity Veterinary Hospital.",
  onBook,
  onContact,
  variant = 'teal'
}) => {
  const bgClasses = {
    teal: 'bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 text-white border border-teal-800/60',
    dark: 'bg-slate-900 text-white border border-slate-800',
    emergency: 'bg-gradient-to-r from-red-950 via-slate-900 to-red-900 text-white border border-red-800/80'
  };

  return (
    <section className="py-12 sm:py-16">
      <Container size="normal">
        <div className={`rounded-3xl p-8 sm:p-12 shadow-xl ${bgClasses[variant]} relative overflow-hidden`}>
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="verified" size="sm" icon={<ShieldCheck className="w-3 h-3 text-emerald-700" />}>
                Entity Veterinary Hospital
              </Badge>
              <Badge variant="demo" size="sm">
                Chattogram, Bangladesh
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
              {title}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={Calendar}
                onClick={onBook}
                className="shadow-lg shadow-teal-600/30"
              >
                Book Appointment Now
              </Button>

              {onContact && (
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-slate-900/60 border-slate-700 text-white hover:bg-slate-800"
                  icon={PhoneCall}
                  onClick={onContact}
                >
                  Contact Hospital Team
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
