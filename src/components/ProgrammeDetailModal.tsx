import React from 'react';
import { Link } from 'react-router-dom';
import { X, Calendar, Clock, Award, BookOpen, Layers, CheckCircle2, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { Programme } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface ProgrammeDetailModalProps {
  programme: Programme | null;
  onClose: () => void;
  onApplyForProgramme: (programmeTitle: string) => void;
  onDownloadProspectus: () => void;
}

export const ProgrammeDetailModal: React.FC<ProgrammeDetailModalProps> = ({
  programme,
  onClose,
  onApplyForProgramme,
  onDownloadProspectus,
}) => {
  if (!programme) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="programme-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-white text-[#111111] p-6 sm:p-8 relative border-b border-neutral-200">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer"
            aria-label="Close programme details"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-2 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
            <span>{programme.school}</span>
            <span aria-hidden="true" className="text-neutral-400">·</span>
            <span>{programme.qualification}</span>
            {programme.affiliatedInstitution && (
              <>
                <span aria-hidden="true" className="text-neutral-400">·</span>
                <span className="px-2 py-0.5 rounded bg-black text-[#FFCC00] text-[10px] font-bold">
                  {programme.affiliatedInstitution}
                </span>
              </>
            )}
          </div>

          <h2 id="programme-modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#111111] pr-10">
            {programme.title}
          </h2>

          <p className="mt-3 text-sm text-neutral-600 max-w-2xl leading-relaxed">
            {programme.overview}
          </p>

          {/* Key Facts Ribbon */}
          <div className="mt-6 pt-6 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="text-neutral-500 flex items-center gap-1 mb-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#111111]" />
                <span>Duration</span>
              </div>
              <div className="font-bold text-[#111111]">{programme.duration}</div>
            </div>

            <div>
              <div className="text-neutral-500 flex items-center gap-1 mb-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#111111]" />
                <span>Next Intakes</span>
              </div>
              <div className="font-bold text-[#111111]">{programme.intakes.join(' · ')}</div>
            </div>

            <div>
              <div className="text-neutral-500 flex items-center gap-1 mb-1 font-medium">
                <Layers className="w-3.5 h-3.5 text-[#111111]" />
                <span>Study Mode</span>
              </div>
              <div className="font-bold text-[#111111]">{programme.studyMode}</div>
            </div>

            <div>
              <div className="text-neutral-500 flex items-center gap-1 mb-1 font-medium">
                <Award className="w-3.5 h-3.5 text-[#111111]" />
                <span>Award</span>
              </div>
              <div className="font-bold text-[#111111] text-[11px] truncate">
                {programme.qualification}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body: Tabs / Sections */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto bg-white">
          {/* Programme Photographic Visual Banner */}
          <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-xs">
            <ImageWithFallback
              src={programme.imageUrl}
              alt={programme.title}
              imageSvgType={programme.imageSvgType}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Section 1: Detailed Curriculum Structure */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] mb-4">
              <BookOpen className="w-4 h-4 text-[#111111]" />
              <span>Curriculum Structure</span>
            </div>

            <div className={`grid grid-cols-1 ${programme.coreModulesYear3 && programme.coreModulesYear3.length > 0 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
              {/* Year 1 */}
              <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2 pb-2 border-b border-neutral-100 flex items-center justify-between">
                  <span>Part / Year 1</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" />
                </div>
                <ul className="space-y-2 text-xs text-neutral-700">
                  {programme.coreModulesYear1.map((mod, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#111111] font-bold">·</span>
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Year 2 */}
              <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs">
                <div className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2 pb-2 border-b border-neutral-100 flex items-center justify-between">
                  <span>Part / Year 2</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" />
                </div>
                <ul className="space-y-2 text-xs text-neutral-700">
                  {programme.coreModulesYear2.map((mod, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#111111] font-bold">·</span>
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Year 3 (if applicable) */}
              {programme.coreModulesYear3 && programme.coreModulesYear3.length > 0 && (
                <div className="p-5 bg-white rounded-2xl border border-neutral-200 shadow-xs">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-2 pb-2 border-b border-neutral-100 flex items-center justify-between">
                    <span>Year 3: Advanced &amp; Capstone</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" />
                  </div>
                  <ul className="space-y-2 text-xs text-neutral-700">
                    {programme.coreModulesYear3.map((mod, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#111111] font-bold">·</span>
                        <span>{mod}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Laboratory Facilities & Practical Infrastructure */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#111111] mb-3">
              Practical Laboratories &amp; Studios
            </div>
            <div className="flex flex-wrap gap-2">
              {programme.laboratories.map((lab, i) => (
                <span
                  key={i}
                  className="px-3.5 py-1.5 bg-white text-neutral-800 text-xs font-medium rounded-xl border border-neutral-200 shadow-xs"
                >
                  {lab}
                </span>
              ))}
            </div>
          </div>

          {/* Section 3: Entry Criteria & Career Pathways (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-100">
            <div>
              <h4 className="text-sm font-bold text-[#111111] mb-3">Entry Requirements</h4>
              <ul className="space-y-2 text-xs text-neutral-700">
                {programme.entryRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 p-2 bg-white rounded-lg border border-neutral-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#111111] mt-0.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#111111] mb-3">Career Opportunities</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-neutral-700">
                {programme.careerPathways.map((career, i) => (
                  <div key={i} className="p-2.5 bg-white rounded-lg border border-neutral-200 font-semibold text-[#111111] shadow-xs">
                    {career}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="bg-white p-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              to={`/programmes/${programme.id}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111] bg-neutral-100 hover:bg-[#FFCC00]/25 px-3.5 py-2 rounded-xl transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Programme Page</span>
            </Link>

            <button
              onClick={onDownloadProspectus}
              className="inline-flex items-center gap-1.5 px-2 py-2 text-xs font-semibold text-neutral-600 hover:text-black hover:underline transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Syllabus</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:text-black transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onApplyForProgramme(programme.title);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#111111]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
