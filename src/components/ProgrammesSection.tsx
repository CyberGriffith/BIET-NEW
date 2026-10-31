import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { PROGRAMMES_DATA } from '../data/mockData';
import { Programme } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface ProgrammesSectionProps {
  onSelectProgramme: (programme: Programme) => void;
  onApplyForProgramme: (programmeTitle: string) => void;
  onProspectusClick: () => void;
}

export const ProgrammesSection: React.FC<ProgrammesSectionProps> = ({
  onSelectProgramme,
  onApplyForProgramme,
}) => {
  // Select 4 premier programmes across the disciplines
  const featuredProgrammes = PROGRAMMES_DATA.slice(0, 4);

  return (
    <section id="programmes" className="py-24 lg:py-32 bg-white text-[#111111] border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
              <span className="w-6 h-0.5 bg-[#FFCC00]" />
              <span>Programmes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight">
              Explore Our Programmes
            </h2>
            <p className="text-base text-neutral-600">
              Undergraduate degrees combining British academic rigor with hands-on laboratory application.
            </p>
          </div>

          <Link
            to="/programmes"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#111111] bg-white hover:bg-[#FFCC00]/15 border border-neutral-300 hover:border-[#111111] rounded-full transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#111111]" />
            <span>Explore Programmes</span>
            <ArrowRight className="w-4 h-4 text-[#111111]" />
          </Link>
        </div>

        {/* 4 Attractive Image Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {featuredProgrammes.map((prog) => (
            <div
              key={prog.id}
              onClick={() => onSelectProgramme(prog)}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-[#FFCC00] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Large Photograph with School Tag */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-neutral-100">
                  <ImageWithFallback
                    src={prog.imageUrl}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#FFCC00] uppercase tracking-wider">
                      {prog.qualification.split('/')[0]}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                    {prog.school.replace('School of ', '')}
                  </span>
                  <h3 className="text-lg font-bold text-[#111111] group-hover:text-black leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {prog.overview}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-neutral-100 mt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProgramme(prog);
                  }}
                  className="text-xs font-bold text-[#111111] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FFCC00]" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onApplyForProgramme(prog.title);
                  }}
                  className="px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-full transition-colors cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
