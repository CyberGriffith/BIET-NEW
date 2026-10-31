import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface AdmissionsSectionProps {
  onApplyClick: () => void;
  onProspectusClick: () => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({ onApplyClick }) => {
  return (
    <section className="bg-gradient-to-b from-[#171717] via-[#111111] to-[#0D0D0D] text-white py-24 lg:py-32 border-y border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-[#FFCC00]">
          <span>Admissions 2026 / 2027</span>
        </div>

        {/* Strong Minimal Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
          Start Your Journey in Engineering &amp; Technology.
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
          Applications are open for 2026/2027 academic intakes at BIET Colombo Campus.
        </p>

        {/* Simple Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onApplyClick}
            className="w-full sm:w-auto px-9 py-4 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-full transition-all shadow-lg active:scale-[0.98] cursor-pointer"
          >
            Apply Now
          </button>
          <Link
            to="/admissions"
            className="text-xs font-bold text-white hover:text-[#FFCC00] transition-colors flex items-center gap-1.5 py-2 cursor-pointer"
          >
            <span>Entry Requirements</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#FFCC00]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
