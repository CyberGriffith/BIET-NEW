import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { AboutPreview } from '../components/AboutPreview';
import { ProgrammesSection } from '../components/ProgrammesSection';
import { WhyChooseBiet } from '../components/WhyChooseBiet';
import { CampusLifeSection } from '../components/CampusLifeSection';
import { NewsSection } from '../components/NewsSection';
import { AdmissionsSection } from '../components/AdmissionsSection';
import { Programme, NewsItem } from '../types';

interface HomePageProps {
  onApplyClick: (programmeTitle?: string) => void;
  onProspectusClick: () => void;
  onSelectProgramme: (programme: Programme) => void;
  onSelectNewsArticle: (article: NewsItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onApplyClick,
  onProspectusClick,
  onSelectProgramme,
  onSelectNewsArticle,
}) => {
  return (
    <>
      {/* A. Hero Slider */}
      <HeroSection
        onApplyClick={() => onApplyClick()}
        onProspectusClick={onProspectusClick}
      />

      {/* B. Welcome to BIET – Short introduction (max 50 words) */}
      <AboutPreview
        onApplyClick={() => onApplyClick()}
        onProspectusClick={onProspectusClick}
      />

      {/* B2. Interactive Find My Path Discovery Banner */}
      <section className="bg-[#141414] py-12 border-y border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1E1E1E] via-[#2A2A2A] to-[#1E1E1E] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-3 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFCC00]/15 text-[#FFCC00] text-xs font-extrabold uppercase tracking-wider border border-[#FFCC00]/30">
                <span>NEW</span> • <span>Interactive Pathway Finder</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Not Sure Which BIET Programme Fits Your Qualifications?
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Use our step-by-step pathway discovery tool. Input your G.C.E. O/L, A/L, Cambridge, or vocational qualifications to find direct degree entry or foundation progression routes tailored to your career goals.
              </p>
            </div>

            <div className="relative z-10 shrink-0 w-full md:w-auto">
              <Link
                to="/find-my-path"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#FFCC00] hover:bg-[#FFE066] text-[#111111] font-extrabold text-xs sm:text-sm shadow-xl shadow-[#FFCC00]/20 hover:scale-105 transition-all"
              >
                Launch Find My Path Tool
                <span className="text-base">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* C. Explore Our Programmes – 3 to 4 attractive image cards */}
      <ProgrammesSection
        onSelectProgramme={onSelectProgramme}
        onApplyForProgramme={(courseTitle) => onApplyClick(courseTitle)}
        onProspectusClick={onProspectusClick}
      />

      {/* D. Why Choose BIET – Maximum 3 key points with icons */}
      <WhyChooseBiet
        onApplyClick={() => onApplyClick()}
        onProspectusClick={onProspectusClick}
      />

      {/* E. Campus & Student Experience – Large photographs with short captions */}
      <CampusLifeSection onApplyClick={() => onApplyClick()} />

      {/* F. Latest News & Events – Maximum 3 cards */}
      <NewsSection
        onSelectArticle={onSelectNewsArticle}
        onApplyClick={() => onApplyClick()}
      />

      {/* G. Admissions Call to Action – One strong headline and button */}
      <AdmissionsSection
        onApplyClick={() => onApplyClick()}
        onProspectusClick={onProspectusClick}
      />
    </>
  );
};
