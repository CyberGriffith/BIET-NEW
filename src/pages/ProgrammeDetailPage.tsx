import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Layers,
  Award,
  BookOpen,
  CheckCircle2,
  FileText,
  Briefcase,
  Building,
  Phone,
  Mail,
  Download,
  ArrowRight
} from 'lucide-react';
import { PROGRAMMES_DATA, INSTITUTION_INFO } from '../data/mockData';
import { ProgrammeIllustration } from '../components/ProgrammeIllustration';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface ProgrammeDetailPageProps {
  onApplyClick: (programmeTitle?: string) => void;
  onProspectusClick: () => void;
}

export const ProgrammeDetailPage: React.FC<ProgrammeDetailPageProps> = ({
  onApplyClick,
  onProspectusClick,
}) => {
  const { programmeId } = useParams<{ programmeId: string }>();
  const navigate = useNavigate();

  const programme = PROGRAMMES_DATA.find((p) => p.id === programmeId);
  const [activeYearIndex, setActiveYearIndex] = useState(0);

  if (!programme) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white px-4 py-20">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-neutral-200 text-center space-y-4 shadow-sm">
          <h1 className="text-2xl font-bold text-[#111111]">Programme Not Found</h1>
          <p className="text-sm text-neutral-600">
            The requested course specification could not be located.
          </p>
          <div className="pt-2">
            <Link
              to="/programmes"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Programmes</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const relatedProgrammes = PROGRAMMES_DATA.filter((p) => p.id !== programme.id).slice(0, 3);

  return (
    <div className="bg-white text-[#111111]">
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-neutral-200 text-xs text-neutral-600 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <nav className="flex items-center gap-2 text-neutral-500">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link to="/programmes" className="hover:text-black transition-colors">Programmes</Link>
            <span>/</span>
            <span className="text-[#111111] font-bold truncate max-w-[200px] sm:max-w-none">{programme.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-white text-[#111111] py-12 lg:py-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111]">
              <span className="px-2.5 py-0.5 rounded bg-[#FFCC00]/20 text-[#111111] font-bold">
                {programme.school}
              </span>
              <span aria-hidden="true" className="text-neutral-400">·</span>
              <span className="font-bold">{programme.qualification}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight text-balance">
              {programme.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-3xl">
              {programme.overview}
            </p>

            {/* Key Metric Facts Ribbon */}
            <div className="pt-6 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-2xs">
                <div className="text-neutral-500 flex items-center gap-1.5 mb-1 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#111111]" />
                  <span>Duration</span>
                </div>
                <div className="font-bold text-[#111111] text-sm">{programme.duration}</div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-2xs">
                <div className="text-neutral-500 flex items-center gap-1.5 mb-1 font-medium">
                  <Layers className="w-3.5 h-3.5 text-[#111111]" />
                  <span>Study Mode</span>
                </div>
                <div className="font-bold text-[#111111] text-sm">{programme.studyMode}</div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-2xs">
                <div className="text-neutral-500 flex items-center gap-1.5 mb-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#111111]" />
                  <span>Intakes</span>
                </div>
                <div className="font-bold text-[#111111] text-sm">{programme.intakes.join(', ')}</div>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-2xs">
                <div className="text-neutral-500 flex items-center gap-1.5 mb-1 font-medium">
                  <Award className="w-3.5 h-3.5 text-[#111111]" />
                  <span>Level</span>
                </div>
                <div className="font-bold text-[#111111] text-sm">
                  {programme.qualification.split('/')[0]}
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onApplyClick(programme.title)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <span>Apply Now</span>
                <ArrowRight className="w-4 h-4 text-[#111111]" />
              </button>

              <button
                onClick={() => onApplyClick(`Inquiry regarding ${programme.title}`)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black rounded-xl transition-colors cursor-pointer"
              >
                <span>Contact Us</span>
              </button>

              <button
                onClick={onProspectusClick}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-medium text-neutral-600 hover:text-black transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#111111]" />
                <span>Syllabus Outline</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body Grid */}
      <section className="py-16 lg:py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Academic Content */}
            <div className="lg:col-span-8 space-y-10">
              {/* Photographic Banner */}
              <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-sm relative h-64 sm:h-80 w-full bg-neutral-100">
                <ImageWithFallback
                  src={programme.imageUrl}
                  alt={programme.title}
                  imageSvgType={programme.imageSvgType}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Section 1: Overview */}
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                  <span className="w-6 h-0.5 bg-[#FFCC00]" />
                  <span>Overview</span>
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">Programme Overview</h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {programme.overview}
                </p>
              </div>

              {/* Section 2: What You Will Learn */}
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                  <BookOpen className="w-4 h-4 text-[#111111]" />
                  <span>Key Outcomes</span>
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">What Students Will Learn</h2>
                <div className="space-y-3">
                  {programme.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-neutral-200 hover:border-[#FFCC00] transition-colors shadow-2xs">
                      <CheckCircle2 className="w-5 h-5 text-[#111111] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-neutral-800 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Programme Structure */}
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                      <FileText className="w-4 h-4 text-[#111111]" />
                      <span>Curriculum</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#111111] mt-1">Programme Structure</h2>
                  </div>
                  <span className="text-xs text-neutral-500 font-mono font-bold">360 UK CREDITS</span>
                </div>

                {/* Year Selectors */}
                <div className="flex flex-wrap gap-2 p-1 bg-white border border-neutral-200 rounded-xl">
                  {programme.structureBreakdown.map((year, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveYearIndex(idx)}
                      className={`flex-1 min-w-[140px] py-2.5 px-4 text-xs font-bold rounded-lg transition-all cursor-pointer text-center ${
                        activeYearIndex === idx
                          ? 'bg-[#FFCC00] text-[#111111] shadow-2xs'
                          : 'text-neutral-600 hover:text-[#111111] hover:bg-neutral-50'
                      }`}
                    >
                      {year.yearTitle.split(':')[0]} ({year.level})
                    </button>
                  ))}
                </div>

                {/* Active Year Modules */}
                {programme.structureBreakdown[activeYearIndex] && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                      <div>
                        <h3 className="text-lg font-bold text-[#111111]">
                          {programme.structureBreakdown[activeYearIndex].yearTitle}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {programme.structureBreakdown[activeYearIndex].description}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#111111] bg-[#FFCC00]/20 px-3 py-1 rounded-lg">
                        {programme.structureBreakdown[activeYearIndex].credits} Credits
                      </span>
                    </div>

                    <div className="space-y-3">
                      {programme.structureBreakdown[activeYearIndex].modules.map((mod) => (
                        <div
                          key={mod.code}
                          className="p-4 bg-white rounded-2xl border border-neutral-200 hover:border-[#FFCC00] transition-colors shadow-2xs"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-[#111111] bg-[#FFCC00]/20 px-2 py-0.5 rounded">
                                {mod.code}
                              </span>
                              <h4 className="text-sm font-bold text-[#111111]">{mod.name}</h4>
                            </div>
                            <span className="text-xs font-semibold text-neutral-500 font-mono">
                              {mod.credits} Cr
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600 leading-relaxed pl-1">
                            {mod.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Section 4: Practical Laboratories */}
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                  <Building className="w-4 h-4 text-[#111111]" />
                  <span>Facilities</span>
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">Dedicated Laboratories &amp; Studios</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {programme.laboratories.map((lab, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3.5 bg-white rounded-xl border border-neutral-200 text-xs sm:text-sm font-medium text-neutral-800 shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-[#FFCC00] shrink-0" />
                      <span>{lab}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Academic Entry Requirements */}
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                  <CheckCircle2 className="w-4 h-4 text-[#111111]" />
                  <span>Admissions</span>
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">Entry Requirements</h2>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-700">
                  {programme.entryRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2.5 p-3.5 bg-white rounded-xl border border-neutral-200 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-[#111111] mt-0.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 6: Career Opportunities */}
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                  <Briefcase className="w-4 h-4 text-[#111111]" />
                  <span>Careers</span>
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">Career Opportunities</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                      Target Job Roles:
                    </h3>
                    <div className="space-y-2">
                      {programme.careerPathways.map((career, i) => (
                        <div key={i} className="p-3 bg-white rounded-xl border border-neutral-200 text-xs sm:text-sm font-semibold text-[#111111] shadow-2xs">
                          {career}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                      Employing Sectors:
                    </h3>
                    <div className="space-y-2">
                      {programme.industrySectors.map((sector, i) => (
                        <div key={i} className="p-3 bg-white rounded-xl border border-neutral-200 text-xs sm:text-sm text-neutral-700 shadow-2xs">
                          {sector}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Admissions Sidebar */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Quick Action Box */}
              <div className="p-6 bg-white rounded-3xl border-2 border-neutral-200 space-y-5 shadow-lg">
                <div className="border-b border-neutral-200 pb-3">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-[#111111] bg-[#FFCC00]/25 px-2.5 py-0.5 rounded">
                    Admissions
                  </span>
                  <h3 className="text-xl font-bold text-[#111111] mt-2">Ready to Apply?</h3>
                  <p className="text-xs text-neutral-600 mt-1">Applications open for 2026/27 intakes.</p>
                </div>

                <div className="space-y-2.5 text-xs text-neutral-700">
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Qualification:</span>
                    <span className="font-semibold text-[#111111]">{programme.qualification}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Duration:</span>
                    <span className="font-semibold text-[#111111]">{programme.duration}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Mode:</span>
                    <span className="font-semibold text-[#111111]">{programme.studyMode}</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <button
                    onClick={() => onApplyClick(programme.title)}
                    className="w-full py-3.5 px-4 text-center text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-sm active:scale-[0.98] cursor-pointer"
                  >
                    Apply Now
                  </button>

                  <button
                    onClick={() => onApplyClick(`Inquiry regarding ${programme.title}`)}
                    className="w-full py-3 px-4 text-center text-xs font-semibold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black rounded-xl transition-colors cursor-pointer"
                  >
                    Contact Us
                  </button>

                  <button
                    onClick={onProspectusClick}
                    className="w-full py-2.5 px-4 text-center text-xs font-medium text-neutral-600 hover:text-black transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#111111]" />
                    <span>Download Syllabus</span>
                  </button>
                </div>
              </div>

              {/* Admissions Contact Card */}
              <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-4 text-xs">
                <h4 className="font-bold text-[#111111] text-sm uppercase tracking-wider pb-2 border-b border-neutral-100 flex items-center justify-between">
                  <span>Admissions Office</span>
                  <span className="w-2 h-2 rounded-full bg-[#FFCC00]" />
                </h4>
                <div className="space-y-2.5 text-neutral-700">
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-[#111111] mt-0.5 shrink-0" />
                    <span>{INSTITUTION_INFO.telephonePlaceholder}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-[#111111] mt-0.5 shrink-0" />
                    <span>{INSTITUTION_INFO.emailPlaceholder}</span>
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    to="/contact"
                    className="text-xs font-bold text-[#111111] hover:underline block"
                  >
                    Contact Us →
                  </Link>
                </div>
              </div>

              {/* Other Programmes */}
              <div className="p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm space-y-3 text-xs">
                <h4 className="font-bold text-[#111111] text-xs uppercase tracking-wider pb-2 border-b border-neutral-100">
                  Other Programmes
                </h4>
                <div className="space-y-2">
                  {relatedProgrammes.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/programmes/${rel.id}`}
                      className="block p-2.5 rounded-xl hover:bg-[#FFCC00]/10 border border-transparent hover:border-neutral-200 transition-colors group"
                    >
                      <span className="text-[10px] text-neutral-500 font-semibold uppercase block">
                        {rel.school}
                      </span>
                      <span className="font-bold text-neutral-800 group-hover:text-black group-hover:underline">
                        {rel.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Navigation Ribbon */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/programmes"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111] hover:underline"
          >
            <ArrowLeft className="w-4 h-4 text-[#111111]" />
            <span>All Programmes</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onApplyClick(programme.title)}
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-sm"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
