import React from 'react';
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
