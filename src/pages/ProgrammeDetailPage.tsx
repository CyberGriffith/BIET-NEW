import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  ArrowRight,
  GraduationCap,
  Sparkles,
  Table,
  LayoutGrid,
  Cpu
} from 'lucide-react';
import { PROGRAMMES_DATA, INSTITUTION_INFO } from '../data/mockData';
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

  const programme = PROGRAMMES_DATA.find((p) => p.id === programmeId);
  const [activeYearIndex, setActiveYearIndex] = useState(0);
  const [moduleViewMode, setModuleViewMode] = useState<'table' | 'cards'>('table');

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
  const heroImage = programme.heroImageUrl || programme.imageUrl;

  return (
    <div className="bg-white text-[#111111]">
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-neutral-200 text-xs text-neutral-600 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <nav className="flex items-center gap-2 text-neutral-500 flex-wrap">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link to="/programmes" className="hover:text-black transition-colors">Programmes</Link>
            <span>/</span>
            <span className="text-[#111111] font-bold truncate max-w-[240px] sm:max-w-none">{programme.title}</span>
          </nav>
          <Link
            to="/programmes"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-700 hover:text-black"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Courses</span>
          </Link>
        </div>
      </div>

      {/* 1. Large Hero Header Section */}
      <section className="relative bg-white text-[#111111] border-b border-neutral-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Heading, Badges, Summary & CTAs */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#111111]">
                <span className="px-3 py-1 rounded-full bg-[#FFCC00]/25 text-[#111111] font-extrabold border border-[#FFCC00]/40">
                  {programme.school}
                </span>
                <span aria-hidden="true" className="text-neutral-400">·</span>
                <span className="font-bold text-neutral-800">{programme.qualification}</span>
                {programme.affiliatedInstitution && (
                  <>
                    <span aria-hidden="true" className="text-neutral-400">·</span>
                    <span className="px-3 py-1 rounded-full bg-[#111111] text-white font-extrabold border border-neutral-900 shadow-2xs">
                      Affiliated: {programme.affiliatedInstitution}
                    </span>
                  </>
                )}
                {programme.assessmentMethod && (
                  <>
                    <span aria-hidden="true" className="text-neutral-400">·</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 font-bold border border-neutral-200">
                      {programme.assessmentMethod.includes(',') ? 'Modular Assessment' : programme.assessmentMethod}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight text-balance">
                {programme.title}
              </h1>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-800">
                <Building className="w-4 h-4 text-[#111111] shrink-0" />
                <span>
                  {programme.affiliatedInstitution === 'TVEC (Pending)' ? (
                    <>Institution: <strong>British Institute of Engineering Technology (BIET)</strong> · Affiliation: <strong>TVEC (Pending)</strong></>
                  ) : programme.affiliatedInstitution ? (
                    <>Awarding / Affiliated Institution: <strong>{programme.affiliatedInstitution}</strong></>
                  ) : (
                    <>Institution: <strong>{programme.awardingBodyPlaceholder.includes('[') ? 'British Institute of Engineering Technology (BIET)' : programme.awardingBodyPlaceholder}</strong></>
                  )}
                </span>
              </div>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl">
                {programme.overview}
              </p>

              {/* Quick Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
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
                  <span>Enquire Now</span>
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

            {/* Right Column: Large High-Quality Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/11] sm:aspect-[4/3] w-full rounded-3xl overflow-hidden border border-neutral-200 shadow-xl bg-neutral-100 group">
                <ImageWithFallback
                  src={heroImage}
                  alt={programme.title}
                  imageSvgType={programme.imageSvgType}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-[#FFCC00] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFCC00]" />
                    <span>{programme.affiliatedInstitution || 'BIET Engineering Faculty'}</span>
                  </div>
                  <p className="text-xs text-white/90 mt-1.5 font-medium line-clamp-1">
                    Hands-on laboratory training &amp; practical coursework
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Programme Overview Ribbon */}
          <div className={`mt-10 pt-8 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-3 ${programme.affiliatedInstitution && programme.studySchedule ? 'lg:grid-cols-4 xl:grid-cols-7' : programme.affiliatedInstitution || programme.studySchedule ? 'lg:grid-cols-6' : 'lg:grid-cols-5'} gap-4 text-xs`}>
            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
              <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                <Clock className="w-4 h-4 text-[#111111]" />
                <span>Duration</span>
              </div>
              <div className="font-extrabold text-[#111111] text-sm sm:text-base">{programme.duration}</div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
              <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                <Award className="w-4 h-4 text-[#111111]" />
                <span>Total Credits</span>
              </div>
              <div className="font-extrabold text-[#111111] text-xs sm:text-sm">
                {programme.totalCredits ? (programme.totalCredits.includes('Credits') ? programme.totalCredits : `${programme.totalCredits} Credits`) : '360 UK Credits'}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
              <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                <Layers className="w-4 h-4 text-[#111111]" />
                <span>Number of Modules</span>
              </div>
              <div className="font-extrabold text-[#111111] text-sm sm:text-base">
                {programme.moduleCount
                  ? `${programme.moduleCount} Modules`
                  : programme.allModules
                  ? `${programme.allModules.length} Modules`
                  : `${programme.structureBreakdown.reduce((acc, y) => acc + y.modules.length, 0)} Modules`}
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
              <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                <FileText className="w-4 h-4 text-[#111111]" />
                <span>Assessment</span>
              </div>
              <div className="font-extrabold text-[#111111] text-xs sm:text-sm line-clamp-2">
                {programme.assessmentMethod || 'Coursework & Exams'}
              </div>
            </div>

            {programme.studySchedule && (
              <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
                <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                  <Clock className="w-4 h-4 text-[#111111]" />
                  <span>{programme.id === 'hnd-cyber-security-digital-forensics' ? 'Study Method' : 'Study Schedule'}</span>
                </div>
                <div className="font-extrabold text-[#111111] text-xs sm:text-sm">
                  {programme.studySchedule}
                </div>
              </div>
            )}

            <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-2xs">
              <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#111111]" />
                <span>Intake Dates</span>
              </div>
              <div className="font-extrabold text-[#111111] text-xs sm:text-sm">
                {programme.intakes.join(' · ')}
              </div>
            </div>

            {programme.affiliatedInstitution && (
              <div className="bg-white p-4 rounded-2xl border border-[#FFCC00]/60 shadow-2xs col-span-2 sm:col-span-1 bg-[#FFCC00]/5">
                <div className="text-neutral-500 flex items-center gap-1.5 mb-1.5 font-medium">
                  <Building className="w-4 h-4 text-[#111111]" />
                  <span>Affiliation</span>
                </div>
                <div className="font-extrabold text-[#111111] text-xs sm:text-sm">
                  {programme.affiliatedInstitution}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Body Grid */}
      <section className="py-14 lg:py-20 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Academic Content */}
            <div className="lg:col-span-8 space-y-12">
              {/* 3. About the Programme */}
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                  <span className="w-6 h-0.5 bg-[#FFCC00]" />
                  <span>About The Programme</span>
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">Programme Overview &amp; Learning Scope</h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  {programme.overview}
                </p>

                <div className="pt-2 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#111111]" />
                    <span>Key Competencies &amp; Learning Outcomes</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {programme.whatYouWillLearn.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 hover:border-[#FFCC00] transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-neutral-800 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Official Entry Requirements */}
              <div className="bg-white p-8 rounded-3xl border-2 border-[#FFCC00]/50 shadow-sm space-y-5 bg-gradient-to-br from-white to-[#FFCC00]/5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                    <CheckCircle2 className="w-4 h-4 text-[#111111]" />
                    <span>Admissions Criteria</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#FFCC00] text-[#111111] text-[11px] font-extrabold uppercase tracking-wider">
                    Official Entry Requirements
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-[#111111]">Entry Requirements</h2>

                <ul className="space-y-3">
                  {programme.entryRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-neutral-200 shadow-2xs">
                      <div className="w-6 h-6 rounded-full bg-[#FFCC00] flex items-center justify-center shrink-0 mt-0.5 text-[#111111] font-bold text-xs">
                        ✓
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-sm sm:text-base font-semibold text-neutral-900 whitespace-pre-line">{req}</span>
                        {programme.id !== 'foundation-in-engineering' && programme.id !== 'beng-mechanical-manufacturing' && programme.id !== 'beng-mechanical-mechatronics' && programme.id !== 'diploma-in-computing' && programme.id !== 'hnd-artificial-intelligence' && programme.id !== 'hnd-cyber-security-digital-forensics' && (
                          <p className="text-xs text-neutral-500">
                            Students with relevant foundation diplomas or equivalent qualifications are encouraged to apply.
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5. Module Structure */}
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-neutral-200">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                      <FileText className="w-4 h-4 text-[#111111]" />
                      <span>Curriculum &amp; Modules</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#111111] mt-1">Module Structure</h2>
                    <p className="text-xs text-neutral-500 mt-1">
                      {programme.assessmentNote
                        ? programme.assessmentNote
                        : programme.allModules
                        ? `All ${programme.allModules.length} modules structured for academic excellence.`
                        : 'Comprehensive modular structure.'}
                    </p>
                  </div>

                  {programme.allModules && (
                    <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl self-start sm:self-auto">
                      <button
                        onClick={() => setModuleViewMode('table')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          moduleViewMode === 'table'
                            ? 'bg-[#FFCC00] text-[#111111] shadow-2xs'
                            : 'text-neutral-600 hover:text-black'
                        }`}
                      >
                        <Table className="w-3.5 h-3.5" />
                        <span>Table View</span>
                      </button>
                      <button
                        onClick={() => setModuleViewMode('cards')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                          moduleViewMode === 'cards'
                            ? 'bg-[#FFCC00] text-[#111111] shadow-2xs'
                            : 'text-neutral-600 hover:text-black'
                        }`}
                      >
                        <LayoutGrid className="w-3.5 h-3.5" />
                        <span>Stages View</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Display Modules in Table Mode */}
                {programme.allModules && moduleViewMode === 'table' ? (
                  <div className="space-y-4">
                    <div className="overflow-x-auto rounded-2xl border border-neutral-200 shadow-2xs">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-neutral-100 border-b border-neutral-200 text-neutral-700 font-bold uppercase text-[11px] tracking-wider">
                            <th className="py-3.5 px-4 w-12 text-center">No.</th>
                            <th className="py-3.5 px-4">Module Code</th>
                            <th className="py-3.5 px-4">Module Title</th>
                            <th className="py-3.5 px-4 text-center">Credits</th>
                            {programme.id === 'hnd-cyber-security-digital-forensics' ? (
                              <th className="py-3.5 px-4 text-center">Year / Semester</th>
                            ) : (
                              <>
                                {programme.allModules.some((m) => !!m.academicYear) && (
                                  <th className="py-3.5 px-4 text-center">Academic Year</th>
                                )}
                                {programme.allModules.some((m) => !!m.semester) && (
                                  <th className="py-3.5 px-4 text-center">Semester</th>
                                )}
                              </>
                            )}
                            {programme.allModules.some((m) => !!m.moduleType) && (
                              <th className="py-3.5 px-4 text-center">Type</th>
                            )}
                            <th className="py-3.5 px-4 text-right">Assessment</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 bg-white">
                          {programme.allModules.map((mod) => (
                            <tr key={mod.no} className="hover:bg-neutral-50/80 transition-colors">
                              <td className="py-3.5 px-4 font-mono font-bold text-neutral-400 text-center">
                                {mod.no}
                              </td>
                              <td className="py-3.5 px-4 font-mono font-bold text-[#111111]">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="bg-[#FFCC00]/25 px-2.5 py-1 rounded text-xs">
                                    {mod.code}
                                  </span>
                                  {mod.moduleType && programme.id !== 'hnd-cyber-security-digital-forensics' && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded border border-neutral-200">
                                      {mod.moduleType}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-3.5 px-4 font-semibold text-neutral-900">
                                {mod.title}
                              </td>
                              <td className="py-3.5 px-4 text-center font-mono font-bold text-neutral-700 whitespace-nowrap">
                                {mod.creditsDisplay || mod.credits}
                              </td>
                              {programme.id === 'hnd-cyber-security-digital-forensics' ? (
                                <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFCC00]/20 text-[#111111] text-[11px] font-bold border border-[#FFCC00]/40">
                                    {mod.academicYear ? `${mod.academicYear} – ${mod.semester}` : mod.semester}
                                  </span>
                                </td>
                              ) : (
                                <>
                                  {programme.allModules?.some((m) => !!m.academicYear) && (
                                    <td className="py-3.5 px-4 text-center font-mono text-xs text-neutral-700 whitespace-nowrap">
                                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-medium border border-neutral-200">
                                        {mod.academicYear || '2026/27'}
                                      </span>
                                    </td>
                                  )}
                                  {programme.allModules?.some((m) => !!m.semester) && (
                                    <td className="py-3.5 px-4 text-center">
                                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FFCC00]/20 text-[#111111] text-[11px] font-bold border border-[#FFCC00]/40">
                                        {mod.semester || 'Core'}
                                      </span>
                                    </td>
                                  )}
                                </>
                              )}
                              {programme.allModules?.some((m) => !!m.moduleType) && (
                                <td className="py-3.5 px-4 text-center">
                                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-bold border border-neutral-200 uppercase tracking-wider">
                                    {mod.moduleType || 'Core'}
                                  </span>
                                </td>
                              )}
                              <td className="py-3.5 px-4 text-right">
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium border border-neutral-200">
                                  {programme.assessmentMethod || (programme.assessmentNote ? 'Coursework & Exams' : 'Coursework')}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-neutral-50 font-bold text-xs sm:text-sm border-t-2 border-neutral-200">
                            <td colSpan={
                              3 +
                              (programme.id === 'hnd-cyber-security-digital-forensics'
                                ? 1
                                : (programme.allModules.some((m) => !!m.academicYear) ? 1 : 0) + (programme.allModules.some((m) => !!m.semester) ? 1 : 0)
                              ) +
                              (programme.allModules.some((m) => !!m.moduleType) ? 1 : 0)
                            } className="py-3.5 px-4 text-neutral-900">
                              Total Programme Requirements ({programme.allModules.length} Modules)
                            </td>
                            <td className="py-3.5 px-4 text-center font-mono text-[#111111] whitespace-nowrap">
                              {programme.totalCredits || `${programme.allModules.reduce((sum, m) => sum + m.credits, 0)} Credits`}
                            </td>
                            <td className="py-3.5 px-4 text-right font-medium text-neutral-600">
                              {programme.assessmentMethod || (programme.assessmentNote ? 'Modular Weighting' : '100% Coursework')}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {programme.assessmentNote && (
                      <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-700 flex items-start gap-2.5">
                        <FileText className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-neutral-900 font-bold">Assessment Note: </strong>
                          {programme.assessmentNote}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Stage/Year Breakdown Accordion / Tabs */
                  <div className="space-y-4">
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
                          {year.yearTitle}
                        </button>
                      ))}
                    </div>

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
                          <span className="text-xs font-bold text-[#111111] bg-[#FFCC00]/25 px-3 py-1 rounded-lg">
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
                                  <span className="font-mono text-xs font-bold text-[#111111] bg-[#FFCC00]/20 px-2.5 py-0.5 rounded">
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
                )}
              </div>

              {/* 4. Photographic Presentation: Laboratories & Practical Environments */}
              {programme.galleryImages && programme.galleryImages.length > 0 && (
                <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                      <Building className="w-4 h-4 text-[#111111]" />
                      <span>Laboratories &amp; Practical Training</span>
                    </div>
                    <span className="text-xs font-semibold text-neutral-500">
                      Real Engineering Environments
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-[#111111]">
                      Practical Learning &amp; Engineering Labs
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-600 mt-1">
                      Students engage with hands-on circuitry, test instruments, microcontrollers, and robotics.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {programme.galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl overflow-hidden border border-neutral-200 shadow-2xs group bg-neutral-100 flex flex-col"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden">
                          <img
                            src={img.url}
                            alt={img.caption}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          {img.category && (
                            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold text-[#FFCC00] uppercase tracking-wider">
                              {img.category}
                            </span>
                          )}
                        </div>
                        <div className="p-3.5 bg-white flex-1 flex items-center">
                          <p className="text-xs text-neutral-700 font-medium leading-relaxed">
                            {img.caption}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dedicated Laboratories List */}
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                  <Cpu className="w-4 h-4 text-[#111111]" />
                  <span>Facilities</span>
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">Dedicated Laboratories &amp; Studios</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {programme.laboratories.map((lab, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 text-xs sm:text-sm font-medium text-neutral-800">
                      <span className="w-2 h-2 rounded-full bg-[#FFCC00] shrink-0" />
                      <span>{lab}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. Progression Opportunities */}
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                  <GraduationCap className="w-4 h-4 text-[#111111]" />
                  <span>Academic &amp; Career Progression</span>
                </div>
                <h2 className="text-2xl font-bold text-[#111111]">Progression Opportunities</h2>

                <div className="p-5 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-[#FFCC00] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>
                      {programme.id === 'foundation-in-engineering' || programme.id === 'diploma-in-computing'
                        ? 'Higher National Diploma (HND) Progression'
                        : programme.id === 'hnd-artificial-intelligence' || programme.id === 'hnd-cyber-security-digital-forensics'
                        ? 'Top - Up Degree Progression'
                        : programme.progressionOpportunities?.some(p => p.toLowerCase().includes('master'))
                        ? 'Postgraduate Progression'
                        : 'Degree Pathways'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">
                    {programme.id === 'foundation-in-engineering' || programme.id === 'diploma-in-computing'
                      ? 'Eligibility for Higher National Diploma (HND) Programmes'
                      : programme.id === 'hnd-artificial-intelligence' || programme.id === 'hnd-cyber-security-digital-forensics'
                      ? 'Top - Up Degree Programmes'
                      : programme.progressionOpportunities?.some(p => p.toLowerCase().includes('master'))
                      ? 'Masters & Advanced Professional Career Pathways'
                      : 'Top-Up Degrees & Career Pathways'}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {programme.id === 'hnd-cyber-security-digital-forensics' ? (
                      <>
                        Graduates of the Higher National Diploma in Cyber Security and Digital Forensics can progress directly into Top - Up Degree Programmes to complete a full Bachelor of Science (BSc) or Bachelor of Engineering (BEng) degree.
                      </>
                    ) : programme.id === 'hnd-artificial-intelligence' ? (
                      <>
                        Graduates of the Higher National Diploma in Artificial Intelligence (AI) can progress directly into Top-Up Degree Programmes to complete a full Bachelor of Science (BSc Hons) or Bachelor of Engineering (BEng Hons) degree.
                      </>
                    ) : programme.id === 'diploma-in-computing' ? (
                      <>
                        Students will be eligible for progression into Higher National Diploma (HND) programmes upon successful completion of the Diploma in Computing.
                      </>
                    ) : programme.id === 'foundation-in-engineering' ? (
                      <>
                        Students will be eligible for progression into Higher National Diploma (HND) programmes upon successful completion of the Foundation in Engineering.
                      </>
                    ) : programme.id === 'beng-mechanical-manufacturing' ? (
                      <>
                        Graduates of the BEng (Hons) Mechanical Engineering specialise in Manufacturing programme, affiliated with the University of West England, earn a full honours degree that enables direct progression to Master’s programmes (MSc, MEng, MPhil, or PhD).
                      </>
                    ) : programme.id === 'beng-mechanical-mechatronics' ? (
                      <>
                        Graduates of the BEng(Hons) Mechanical Engineering specialise in Mechatronics programme, affiliated with the University of West England, earn a full honours degree that enables direct progression to Master’s programmes (MSc, MEng, MPhil, or PhD).
                      </>
                    ) : programme.id === 'beng-electrical-electronics' ? (
                      <>
                        Graduates of the BEng (Hons) Electrical and Electronics Engineering programme, affiliated with the University of West England, earn a full honours degree that enables direct progression to Master’s programmes (MSc, MEng, MPhil, or PhD) as well as leading engineering careers in international electronics, energy, and robotics sectors.
                      </>
                    ) : (
                      <>
                        Graduates of {programme.title} can progress to top-up degree programmes to complete a full Bachelor of Engineering (BEng) or Bachelor of Science (BSc) degree, or pursue dynamic careers across leading industry sectors.
                      </>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                      Career Pathways:
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
                      Target Industry Sectors:
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

              {/* 7. Upcoming Intakes Spotlight */}
              <div className="bg-[#111111] text-white p-8 rounded-3xl border border-neutral-800 shadow-xl space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFCC00]">
                    <Calendar className="w-4 h-4 text-[#FFCC00]" />
                    <span>Intake Schedule</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#FFCC00] text-[#111111] text-[11px] font-bold uppercase tracking-wider">
                    {programme.duration} Duration
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Upcoming Intakes</h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                    Enrolment is now open for prospective students for the upcoming academic cohorts.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                  {programme.intakes.map((intakeDate, i) => {
                    const isNextStartingDate =
                      intakeDate.toLowerCase().includes('next starting') ||
                      (programme.nextIntakeHighlight && intakeDate.includes(programme.nextIntakeHighlight));
                    const cleanDate = intakeDate.split(' – ')[0].replace(' – Next Starting Date', '').trim();

                    return (
                      <div
                        key={i}
                        className={`p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all relative overflow-hidden ${
                          isNextStartingDate
                            ? 'bg-neutral-900 border-2 border-[#FFCC00] shadow-lg shadow-[#FFCC00]/10 ring-1 ring-[#FFCC00]/30'
                            : 'bg-neutral-900 border border-neutral-800'
                        }`}
                      >
                        {isNextStartingDate && (
                          <div className="absolute top-0 right-0 bg-[#FFCC00] text-[#111111] text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-bl-lg tracking-wider">
                            Next Starting Date
                          </div>
                        )}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                            Intake {i + 1}
                          </span>
                          <div className="text-lg font-extrabold text-[#FFCC00] leading-snug">{cleanDate}</div>
                          {isNextStartingDate ? (
                            <span className="text-[11px] font-bold text-[#FFCC00] flex items-center gap-1">
                              ● Priority Enrolment Open
                            </span>
                          ) : (
                            <span className="text-[11px] text-neutral-400 block">Registration Open</span>
                          )}
                        </div>
                        <button
                          onClick={() => onApplyClick(programme.title)}
                          className={`w-full py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                            isNextStartingDate
                              ? 'bg-[#FFCC00] hover:bg-[#E6B800] text-[#111111] shadow-xs'
                              : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                          }`}
                        >
                          Apply for Intake {i + 1}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 8. Application Section */}
              <div className="bg-gradient-to-br from-[#FFCC00]/15 via-white to-white p-8 rounded-3xl border-2 border-[#FFCC00] shadow-md space-y-5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111111]">
                  <Sparkles className="w-4 h-4 text-[#111111]" />
                  <span>Begin Your Engineering Journey</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111]">
                  Apply for {programme.title}
                </h2>

                <p className="text-sm text-neutral-700 leading-relaxed max-w-2xl">
                  Take the first step towards world-class engineering qualifications. Submit your application online or speak directly with our admissions counsellors.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onApplyClick(programme.title)}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-extrabold uppercase tracking-wider text-[#111111] bg-[#FFCC00] hover:bg-[#E6B800] rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-4 h-4 text-[#111111]" />
                  </button>

                  <button
                    onClick={() => onApplyClick(`Inquiry regarding ${programme.title}`)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-semibold text-[#111111] bg-white hover:bg-neutral-50 border border-neutral-300 hover:border-black rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Enquire Now</span>
                  </button>
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
                  <p className="text-xs text-neutral-600 mt-1">Applications open for upcoming intakes.</p>
                </div>

                <div className="space-y-2.5 text-xs text-neutral-700">
                  {programme.affiliatedInstitution && (
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span className="text-neutral-500">Affiliation:</span>
                      <span className="font-bold text-[#111111] text-right">{programme.affiliatedInstitution}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Qualification:</span>
                    <span className="font-semibold text-[#111111] text-right">{programme.qualification}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Duration:</span>
                    <span className="font-semibold text-[#111111]">{programme.duration}</span>
                  </div>
                  {programme.studyMode && (
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span className="text-neutral-500">Delivery Mode:</span>
                      <span className="font-semibold text-[#111111] text-right">{programme.studyMode}</span>
                    </div>
                  )}
                  {programme.studySchedule && (
                    <div className="flex justify-between py-1 border-b border-neutral-100">
                      <span className="text-neutral-500">Study Method:</span>
                      <span className="font-semibold text-[#111111]">{programme.studySchedule}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Credits:</span>
                    <span className="font-semibold text-[#111111]">{programme.totalCredits || '360 UK'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Assessment:</span>
                    <span className="font-semibold text-[#111111] text-right line-clamp-2">{programme.assessmentMethod || 'Coursework'}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Intakes:</span>
                    <span className="font-semibold text-[#111111] text-right">{programme.intakes.join(', ')}</span>
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
                    Enquire Now
                  </button>

                  <button
                    onClick={onProspectusClick}
                    className="w-full py-2.5 px-4 text-center text-xs font-medium text-neutral-600 hover:text-black transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-[#111111]" />
                    <span>Download Syllabus Outline</span>
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
                    Contact Admissions Office →
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
