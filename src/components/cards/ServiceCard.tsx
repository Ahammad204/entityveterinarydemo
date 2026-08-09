import React from 'react';
import { Service } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AlertCircle, Stethoscope, ShieldCheck, Activity, Sparkles, Pill, CheckCircle2, ArrowRight, Info } from 'lucide-react';

export interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
  onSelectDetail?: (serviceId: string) => void;
  showDemoBadge?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onBook,
  onSelectDetail,
  showDemoBadge = true
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertCircle': return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-teal-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'Activity': return <Activity className="w-5 h-5 text-sky-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-600" />;
      case 'Pill': return <Pill className="w-5 h-5 text-indigo-600" />;
      default: return <Stethoscope className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <Card hoverable className="flex flex-col h-full relative group border-slate-200/90 overflow-hidden p-0">
      {/* Service Header Image */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent" />
        
        {service.isEmergency ? (
          <div className="absolute top-3 right-3">
            <Badge variant="emergency" size="sm">24/7 Emergency</Badge>
          </div>
        ) : (
          <div className="absolute top-3 right-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 bg-white/95 backdrop-blur px-2.5 py-1 rounded-md shadow-sm border border-slate-200/80">
              {service.category}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 text-white">
          <div className={`p-2 rounded-lg backdrop-blur-md ${
            service.isEmergency ? 'bg-red-600/90 text-white' : 'bg-teal-600/90 text-white'
          }`}>
            {getIcon(service.icon)}
          </div>
          <h3 className="text-lg font-bold font-display leading-snug drop-shadow-sm text-white">
            {service.title}
          </h3>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
          {service.shortDesc}
        </p>

        <div className="space-y-1.5 mb-5 flex-1">
          {service.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="truncate">{feature}</span>
            </div>
          ))}
        </div>

        {showDemoBadge && service.demoNotice && (
          <div className="mb-4 pt-2 border-t border-slate-100">
            <span className="text-[10px] sm:text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block font-medium">
              💡 {service.demoNotice}
            </span>
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
          {onSelectDetail && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelectDetail(service.id)}
              icon={Info}
              iconPosition="left"
              className="bg-white"
            >
              Learn More
            </Button>
          )}

          <Button
            variant={service.isEmergency ? 'emergency' : 'primary'}
            size="sm"
            onClick={() => onBook(service.id)}
            icon={ArrowRight}
            iconPosition="right"
            className={!onSelectDetail ? 'col-span-2' : ''}
          >
            {service.isEmergency ? 'Emergency' : 'Book Now'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
