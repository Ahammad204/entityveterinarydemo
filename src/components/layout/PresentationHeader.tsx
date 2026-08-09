import React, { useState } from 'react';
import { Page } from '../../types';
import { CLIENT_TECTONIC_NOTES } from '../../data/mockData';
import { Container } from '../ui/Container';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { 
  Sparkles, 
  Info, 
  Layers, 
  CheckCircle2, 
  FileText, 
  X, 
  ExternalLink,
  ChevronDown,
  Monitor
} from 'lucide-react';

export interface PresentationHeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  showDemoBadges: boolean;
  onToggleDemoBadges: () => void;
  onOpenBooking: () => void;
}

export const PresentationHeader: React.FC<PresentationHeaderProps> = ({
  currentPage,
  onNavigate,
  showDemoBadges,
  onToggleDemoBadges,
  onOpenBooking
}) => {
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <>
      {/* Strategy Notes Drawer / Modal */}
      {notesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative border border-slate-200">
            <button
              onClick={() => setNotesOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-2 rounded-lg bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent" size="sm" icon={<Sparkles className="w-3 h-3 text-teal-700" />}>
                Tectonic Agency Client Presentation
              </Badge>
              <Badge variant="demo" size="sm">Concept Version 1.0</Badge>
            </div>

            <h3 className="text-2xl font-bold font-display text-slate-900 mb-1">
              Entity Veterinary Hospital — Strategy & Architecture
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Client demo prepared by <strong>Tectonic</strong> agency for Entity Veterinary in Chattogram, Bangladesh.
            </p>

            <div className="space-y-4 text-sm text-slate-700">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  Presentation Objectives
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 leading-relaxed">
                  <li>Establish premium veterinary healthcare authority in Chattogram</li>
                  <li>Build immediate client trust with verified doctor bios (Dr. Partha & Dr. Aslam Hossain)</li>
                  <li>Highlight 24/7 emergency response and clear booking conversion paths</li>
                  <li>Maintain strict compliance by labeling unconfirmed data as "Information to be confirmed"</li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1.5">
                <strong className="block font-semibold">Verified Client Data vs Demo Placeholders:</strong>
                <p>
                  • <strong>Verified Facts:</strong> Hospital brand name, Dr. Partha (Co-Founder & CEO), Dr. Aslam Hossain (COO), location city (Chattogram), and social links.
                </p>
                <p>
                  • <strong>Demo Placeholders:</strong> Specific street addresses, emergency phone hotlines, prices, opening hours, and secondary clinical staff are clearly flagged with demo badges.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <a
                  href={CLIENT_TECTONIC_NOTES.officialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-slate-800 font-medium inline-flex items-center gap-1"
                >
                  <span>Entity Veterinary Existing Web</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <a
                  href={CLIENT_TECTONIC_NOTES.officialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-sky-50 hover:bg-sky-100 text-sky-800 px-3 py-1.5 rounded-lg font-medium inline-flex items-center gap-1"
                >
                  <span>Entity Veterinary Facebook</span>
                  <ExternalLink className="w-3 h-3 text-sky-600" />
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <Button variant="primary" onClick={() => setNotesOpen(false)}>
                Close Presentation Notes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
