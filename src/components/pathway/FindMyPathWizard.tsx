import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  BookOpen,
  Send,
  RotateCcw,
  Settings,
  HelpCircle,
  MessageSquare,
  Share2,
  Check,
  AlertCircle,
  Filter,
} from 'lucide-react';
import { QUALIFICATION_OPTIONS, STUDY_STREAMS, COMMON_SUBJECTS, FUTURE_GOAL_OPTIONS, STUDY_AREAS } from '../../data/pathwayData';
import { QualificationType, StudentAcademicProfile, RecommendationResult, PathwayEligibilityStatus, PathwayLead } from '../../types/pathway';
import { evaluatePathwayRecommendations, savePathwayLead } from '../../utils/pathwayEngine';
import { PathwayCard } from './PathwayCard';
import { INSTITUTION_INFO } from '../../data/mockData';

interface FindMyPathWizardProps {
  onViewProgrammeDetails: (programmeId: string) => void;
  onApplyForProgramme: (programmeTitle: string) => void;
  onOpenAdmin: () => void;
}

const INITIAL_PROFILE: StudentAcademicProfile = {
  qualifications: ['gce-al-sl'],
  customQualification: '',
  examCountry: 'Sri Lanka',
  stream: 'Physical Science / Combined Mathematics',
  mathsGrade: 'C',
  englishGrade: 'S',
  alPassesCount: 2,
  subjectsStudied: ['Combined Mathematics', 'Physics', 'Chemistry'],
  yearOfCompletion: '2025',
  additionalQualifications: '',
  currentStatus: 'Completed G.C.E. A/L',
  goals: ['start-new'],
  preferredFields: [],
  studyMode: 'any',
};

export const FindMyPathWizard: React.FC<FindMyPathWizardProps> = ({
  onViewProgrammeDetails,
  onApplyForProgramme,
  onOpenAdmin,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [profile, setProfile] = useState<StudentAcademicProfile>(INITIAL_PROFILE);
  const [customSubject, setCustomSubject] = useState('');

  // Step 4 state
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [filterTab, setFilterTab] = useState<'all' | PathwayEligibilityStatus>('all');

  // Lead Generation state
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCity, setLeadCity] = useState('Colombo');
  const [leadIntake, setLeadIntake] = useState('September 2026');
  const [leadNotes, setLeadNotes] = useState('');
  const [submittedLead, setSubmittedLead] = useState<PathwayLead | null>(null);

  // Qualification toggle
  const toggleQualification = (id: QualificationType) => {
    let updated = [...profile.qualifications];
    if (updated.includes(id)) {
      if (updated.length > 1) {
        updated = updated.filter((q) => q !== id);
      }
    } else {
      updated.push(id);
    }
    setProfile({ ...profile, qualifications: updated });
  };

  // Subject toggle
  const toggleSubject = (sub: string) => {
    let updated = [...profile.subjectsStudied];
    if (updated.includes(sub)) {
      updated = updated.filter((s) => s !== sub);
    } else {
      updated.push(sub);
    }
    setProfile({ ...profile, subjectsStudied: updated });
  };

  const handleAddCustomSubject = () => {
    if (!customSubject.trim()) return;
    if (!profile.subjectsStudied.includes(customSubject.trim())) {
      setProfile({
        ...profile,
        subjectsStudied: [...profile.subjectsStudied, customSubject.trim()],
      });
    }
    setCustomSubject('');
  };

  // Goal toggle
  const toggleGoal = (goalId: string) => {
    let updated = [...profile.goals];
    if (updated.includes(goalId)) {
      if (updated.length > 1) updated = updated.filter((g) => g !== goalId);
    } else {
      updated.push(goalId);
    }
    setProfile({ ...profile, goals: updated });
  };

  // Field toggle
  const toggleField = (fieldId: string) => {
    let updated = [...profile.preferredFields];
    if (updated.includes(fieldId)) {
      updated = updated.filter((f) => f !== fieldId);
    } else {
      updated.push(fieldId);
    }
    setProfile({ ...profile, preferredFields: updated });
  };

  // Run engine when proceeding to Step 4
  const handleCalculatePath = () => {
    const computedResults = evaluatePathwayRecommendations(profile);
    setResults(computedResults);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle lead submission
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadEmail || !leadPhone) return;

    const saved = savePathwayLead({
      fullName: leadName,
      email: leadEmail,
      phone: leadPhone,
      city: leadCity,
      preferredIntake: leadIntake,
      additionalNotes: leadNotes,
      profile,
      recommendedProgrammes: results.map((r) => ({
        id: r.programme.id,
        title: r.programme.title,
        status: r.status,
      })),
    });

    setSubmittedLead(saved);
  };

  // Filtered results
  const filteredResults = results.filter((r) => {
    if (filterTab === 'all') return true;
    return r.status === filterTab;
  });

  // Direct WhatsApp contact link with report summary
  const getWhatsAppShareLink = (courseTitle?: string) => {
    const cleanNum = (INSTITUTION_INFO.whatsappNumber || '94112345678').replace(/[^0-9]/g, '');
    const topMatch = courseTitle || results[0]?.programme.title || 'BIET Degrees';
    const text = `Hello BIET Admissions, I used the Find My Path tool on your website. My qualifications: ${profile.qualifications.join(', ')} (${profile.stream || 'General'}). Recommended course: ${topMatch}. I would like to speak with an admissions counsellor.`;
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#171717] via-[#222222] to-[#1A1A1A] border border-white/10 rounded-3xl p-6 sm:p-10 mb-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#FFCC00]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFCC00]/15 text-[#FFCC00] text-xs font-extrabold uppercase tracking-wider mb-3 border border-[#FFCC00]/30 shadow-xs">
              <Compass className="w-4 h-4" />
              BIET Interactive Pathway Discovery
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Find Your Academic Path at BIET
            </h1>
            <p className="text-sm sm:text-base text-white/70 mt-2 max-w-2xl leading-relaxed">
              Explore custom educational pathways into Engineering, Computing, and the Built Environment based on your unique academic qualifications, interests, and career ambitions.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white/80 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-colors"
              title="Admin Console to manage course entry rules & view leads"
            >
              <Settings className="w-4 h-4 text-[#FFCC00]" />
              Manage Entry Rules (Admin)
            </button>
            {step === 4 && (
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#111111] bg-[#FFCC00] hover:bg-[#FFE066] transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Start New Search
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar & Steps Indicator */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between mb-3">
            {[
              { num: 1, label: 'Qualifications' },
              { num: 2, label: 'Academic Details' },
              { num: 3, label: 'Future Goals' },
              { num: 4, label: 'Matched Pathways' },
            ].map((s) => {
              const isActive = step === s.num;
              const isCompleted = step > s.num;
              return (
                <div
                  key={s.num}
                  onClick={() => s.num < step && setStep(s.num as any)}
                  className={`flex items-center gap-2 cursor-pointer transition-all ${
                    isActive
                      ? 'text-[#FFCC00] font-bold'
                      : isCompleted
                      ? 'text-white font-medium hover:text-[#FFCC00]'
                      : 'text-white/40'
                  }`}
                >
                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#FFCC00] text-[#111111] shadow-md shadow-[#FFCC00]/30 ring-4 ring-[#FFCC00]/20'
                        : isCompleted
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className="hidden sm:inline-block text-xs">{s.label}</span>
                </div>
              );
            })}
          </div>

          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#FFCC00] to-emerald-400 h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* STEP 1: Flexible Qualification Selection */}
      {step === 1 && (
        <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#FFCC00] uppercase tracking-wider">Step 1 of 3</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Select Your Qualifications</h2>
            <p className="text-xs sm:text-sm text-white/70 mt-1">
              Select one or multiple educational qualifications you hold or are currently completing. You are not restricted to a single pathway.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {QUALIFICATION_OPTIONS.map((opt) => {
              const isSelected = profile.qualifications.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => toggleQualification(opt.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                    isSelected
                      ? 'bg-[#FFCC00]/15 border-[#FFCC00] shadow-lg shadow-[#FFCC00]/5 text-white'
                      : 'bg-[#202020] border-white/5 text-white/80 hover:bg-[#262626] hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md mt-0.5 shrink-0 flex items-center justify-center border transition-colors ${
                      isSelected ? 'bg-[#FFCC00] border-[#FFCC00] text-[#111111]' : 'border-white/30 bg-white/5'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">{opt.title}</h3>
                    <p className="text-[11px] text-white/60 mt-0.5">{opt.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Qualification Field */}
          {profile.qualifications.includes('other') && (
            <div className="mt-4 p-4 bg-black/40 border border-white/10 rounded-2xl space-y-2 animate-fadeIn">
              <label className="block text-xs font-bold text-white">Specify Your Other Qualification:</label>
              <input
                type="text"
                placeholder="e.g. German Abitur, Indian CBSE Class XII, NVQ Level 4 Civil, etc."
                value={profile.customQualification}
                onChange={(e) => setProfile({ ...profile, customQualification: e.target.value })}
                className="w-full bg-[#222222] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FFCC00]"
              />
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-white/50">
              Selected: <strong className="text-[#FFCC00]">{profile.qualifications.length}</strong> qualification(s)
            </span>
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-[#111111] font-extrabold text-xs sm:text-sm shadow-lg shadow-[#FFCC00]/20 transition-all hover:scale-105"
            >
              Next: Academic Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Academic Background Details */}
      {step === 2 && (
        <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#FFCC00] uppercase tracking-wider">Step 2 of 3</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Academic Background Details</h2>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                Tell us a little more about your subjects, streams, and grades. You can skip any optional fields.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Examination Country & Stream */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-white mb-1.5">Examination Country / Authority</label>
                <select
                  value={profile.examCountry}
                  onChange={(e) => setProfile({ ...profile, examCountry: e.target.value })}
                  className="w-full bg-[#222222] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FFCC00]"
                >
                  <option value="Sri Lanka">Sri Lanka (G.C.E. Examinations Department)</option>
                  <option value="United Kingdom">United Kingdom (Cambridge Assessment / Pearson Edexcel)</option>
                  <option value="India">India (CBSE / ICSE / State Board)</option>
                  <option value="International">International / Other Country</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5">Academic Stream Studied</label>
                <select
                  value={profile.stream}
                  onChange={(e) => setProfile({ ...profile, stream: e.target.value })}
                  className="w-full bg-[#222222] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FFCC00]"
                >
                  {STUDY_STREAMS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5">Number of G.C.E. A/L Passes Achieved</label>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 1, 2, 3].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setProfile({ ...profile, alPassesCount: count })}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        profile.alPassesCount === count
                          ? 'bg-[#FFCC00] text-[#111111] border-[#FFCC00]'
                          : 'bg-[#222222] text-white/70 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {count === 0 ? '0 Passes' : `${count} Pass${count > 1 ? 'es' : ''}`}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5">Current Educational Status</label>
                <select
                  value={profile.currentStatus}
                  onChange={(e) => setProfile({ ...profile, currentStatus: e.target.value })}
                  className="w-full bg-[#222222] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#FFCC00]"
                >
                  <option value="Completed G.C.E. A/L">Completed G.C.E. A/L</option>
                  <option value="Awaiting A/L Results">Awaiting G.C.E. A/L Results</option>
                  <option value="Completed O/L (Exploring Pathways)">Completed O/L (Exploring Foundation)</option>
                  <option value="Studying Diploma / Higher Diploma">Studying Diploma / Higher Diploma</option>
                  <option value="Working Professional Seeking Degree Top-Up">Working Professional Seeking Degree Top-Up</option>
                </select>
              </div>
            </div>

            {/* O/L Grades & Subjects */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">O/L Mathematics Grade</label>
                  <select
                    value={profile.mathsGrade}
                    onChange={(e) => setProfile({ ...profile, mathsGrade: e.target.value })}
                    className="w-full bg-[#222222] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                  >
                    <option value="A">Distinction (A)</option>
                    <option value="B">Very Good (B)</option>
                    <option value="C">Credit (C)</option>
                    <option value="S">Ordinary Pass (S)</option>
                    <option value="F">Fail / Weak (F)</option>
                    <option value="Pending">Pending / Awaiting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-white mb-1.5">O/L English Grade</label>
                  <select
                    value={profile.englishGrade}
                    onChange={(e) => setProfile({ ...profile, englishGrade: e.target.value })}
                    className="w-full bg-[#222222] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                  >
                    <option value="A">Distinction (A)</option>
                    <option value="B">Very Good (B)</option>
                    <option value="C">Credit (C)</option>
                    <option value="S">Ordinary Pass (S)</option>
                    <option value="F">Fail / Weak (F)</option>
                    <option value="Pending">Pending / Awaiting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5">Key Subjects Studied</label>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-[#202020] rounded-xl border border-white/10">
                  {COMMON_SUBJECTS.map((sub) => {
                    const isChecked = profile.subjectsStudied.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleSubject(sub)}
                        className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                          isChecked
                            ? 'bg-[#FFCC00] text-[#111111] font-bold'
                            : 'bg-white/5 text-white/70 hover:bg-white/15'
                        }`}
                      >
                        {sub}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Add other subject..."
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomSubject())}
                    className="flex-1 bg-[#222222] border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomSubject}
                    className="px-3 py-1.5 bg-white/10 text-white rounded-lg text-xs font-bold hover:bg-white/20"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white mb-1.5">Additional Qualifications / Certifications (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Pearson HND, NVQ Level 4/5, CIMA Operational, City & Guilds..."
                  value={profile.additionalQualifications}
                  onChange={(e) => setProfile({ ...profile, additionalQualifications: e.target.value })}
                  className="w-full bg-[#222222] border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                />
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={() => setStep(3)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFCC00] hover:bg-[#FFE066] text-[#111111] font-extrabold text-xs sm:text-sm shadow-lg shadow-[#FFCC00]/20 transition-all hover:scale-105"
            >
              Next: Future Goals
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Future Goals & Study Preferences */}
      {step === 3 && (
        <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
          <div>
            <span className="text-xs font-bold text-[#FFCC00] uppercase tracking-wider">Step 3 of 3</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Your Future Goals & Preferred Disciplines</h2>
            <p className="text-xs sm:text-sm text-white/70 mt-1">
              Select what you wish to achieve so we can tailor the best BIET degree & progression pathways for you.
            </p>
          </div>

          {/* Primary Goal Selection */}
          <div>
            <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider text-white/60">
              What is your primary educational goal?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {FUTURE_GOAL_OPTIONS.map((g) => {
                const isSelected = profile.goals.includes(g.id);
                return (
                  <div
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                      isSelected
                        ? 'bg-[#FFCC00]/15 border-[#FFCC00] shadow-md text-white'
                        : 'bg-[#202020] border-white/5 text-white/80 hover:bg-[#262626]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md mt-0.5 shrink-0 flex items-center justify-center border ${
                        isSelected ? 'bg-[#FFCC00] border-[#FFCC00] text-[#111111]' : 'border-white/30'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{g.title}</h4>
                      <p className="text-[11px] text-white/60 mt-0.5">{g.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preferred Study Areas */}
          <div>
            <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider text-white/60">
              Preferred BIET Schools / Fields of Interest (Optional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {STUDY_AREAS.map((area) => {
                const isSelected = profile.preferredFields.includes(area.id);
                return (
                  <div
                    key={area.id}
                    onClick={() => toggleField(area.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all select-none ${
                      isSelected
                        ? 'bg-[#FFCC00]/15 border-[#FFCC00] text-white'
                        : 'bg-[#202020] border-white/5 text-white/70 hover:bg-[#262626]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{area.label}</h4>
                      {isSelected && <Check className="w-4 h-4 text-[#FFCC00]" />}
                    </div>
                    <p className="text-[11px] text-white/60 mt-1">{area.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preferred Study Mode */}
          <div>
            <label className="block text-xs font-bold text-white mb-2 uppercase tracking-wider text-white/60">
              Preferred Study Mode
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'any', label: 'Any Delivery Mode' },
                { id: 'full-time', label: 'Full-Time (Weekday)' },
                { id: 'part-time', label: 'Part-Time (Weekend/Evening)' },
                { id: 'hybrid', label: 'Hybrid / Blended' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setProfile({ ...profile, studyMode: m.id as any })}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                    profile.studyMode === m.id
                      ? 'bg-[#FFCC00] text-[#111111] border-[#FFCC00]'
                      : 'bg-[#202020] text-white/70 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleCalculatePath}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FFCC00] to-[#FFE066] text-[#111111] font-extrabold text-xs sm:text-sm shadow-xl shadow-[#FFCC00]/25 hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Discover My Matched BIET Pathways
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Personalised Recommendations & Lead Capture */}
      {step === 4 && (
        <div className="space-y-8 animate-fadeIn">
          {/* Summary Box */}
          <div className="bg-[#171717] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
              <div>
                <span className="text-xs font-extrabold text-[#FFCC00] uppercase tracking-wider">
                  Personalised Educational Pathway Report
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  We Found {results.length} Suitable Pathways For You
                </h2>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Based on: <strong className="text-white">{profile.qualifications.join(', ')}</strong> ({profile.stream || 'General Stream'}, {profile.alPassesCount} A/L passes).
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#FFCC00]" />
                  Edit Qualifications
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: `All Recommended Pathways (${results.length})` },
                {
                  id: 'DIRECT_ENTRY',
                  label: `Direct Entry Eligible (${results.filter((r) => r.status === 'DIRECT_ENTRY').length})`,
                },
                {
                  id: 'CONDITIONAL_ASSESSMENT',
                  label: `Requires Assessment (${results.filter((r) => r.status === 'CONDITIONAL_ASSESSMENT').length})`,
                },
                {
                  id: 'PROGRESSION_PATHWAY',
                  label: `Foundation Pathways (${results.filter((r) => r.status === 'PROGRESSION_PATHWAY').length})`,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    filterTab === tab.id
                      ? 'bg-[#FFCC00] text-[#111111] shadow-md shadow-[#FFCC00]/20'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recommendation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResults.map((res) => (
              <PathwayCard
                key={res.programme.id}
                result={res}
                onViewDetails={onViewProgrammeDetails}
                onApplyNow={onApplyForProgramme}
                onContactCounsellor={(title) => {
                  window.open(getWhatsAppShareLink(title), '_blank');
                }}
              />
            ))}
          </div>

          {/* Lead Generation & Counsellor Follow-up Section */}
          <div className="bg-gradient-to-br from-[#1A1A1A] to-[#121212] border border-[#FFCC00]/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFCC00]/5 rounded-full blur-3xl pointer-events-none" />

            {submittedLead ? (
              <div className="text-center py-8 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Pathway Submission Received!</h3>
                <p className="text-sm text-white/80 max-w-lg mx-auto">
                  Thank you <strong className="text-[#FFCC00]">{submittedLead.fullName}</strong>. Reference ID:{' '}
                  <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-xs text-white">{submittedLead.id}</span>.
                  A BIET admissions counsellor will contact you at <strong className="text-white">{submittedLead.email}</strong> / <strong className="text-white">{submittedLead.phone}</strong>.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={getWhatsAppShareLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-[#25D366]/20"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat Directly on WhatsApp Now
                  </a>

                  <button
                    onClick={() => setSubmittedLead(null)}
                    className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Additional Query
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-extrabold border border-emerald-500/30">
                    <GraduationCap className="w-3.5 h-3.5" />
                    Personalised Counsellor Consultation
                  </div>
                  <h3 className="text-2xl font-bold text-white">Speak with a BIET Admissions Specialist</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    Have your qualifications officially reviewed by BIET academic officers. Get guidance on scholarships, credit transfers, and upcoming semester intakes.
                  </p>
                  <ul className="space-y-2 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FFCC00]" />
                      Official entry requirements verification
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FFCC00]" />
                      Special RPL (Prior Learning) assessment for working professionals
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#FFCC00]" />
                      Institutional scholarship advisory
                    </li>
                  </ul>
                </div>

                <form onSubmit={handleLeadSubmit} className="lg:col-span-7 bg-[#202020] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
                  <h4 className="text-sm font-bold text-white border-b border-white/10 pb-2">Request Counsellor Follow-Up</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kasun Perera"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full bg-[#171717] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="kasun@example.com"
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full bg-[#171717] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+94 77 123 4567"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        className="w-full bg-[#171717] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 mb-1">City / Region</label>
                      <input
                        type="text"
                        placeholder="e.g. Colombo, Kandy, Galle..."
                        value={leadCity}
                        onChange={(e) => setLeadCity(e.target.value)}
                        className="w-full bg-[#171717] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/70 mb-1">Intended Intake</label>
                    <select
                      value={leadIntake}
                      onChange={(e) => setLeadIntake(e.target.value)}
                      className="w-full bg-[#171717] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                    >
                      <option value="September 2026">September 2026 Intake</option>
                      <option value="February 2027">February 2027 Intake</option>
                      <option value="Exploring Options">Just Exploring Options</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-white/70 mb-1">Additional Notes / Questions (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Specify any questions about entry requirements, fees, or weekend classes..."
                      value={leadNotes}
                      onChange={(e) => setLeadNotes(e.target.value)}
                      className="w-full bg-[#171717] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFCC00]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#FFCC00] hover:bg-[#FFE066] text-[#111111] rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-[#FFCC00]/15"
                  >
                    <Send className="w-4 h-4" />
                    Submit Profile for Counsellor Evaluation
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
