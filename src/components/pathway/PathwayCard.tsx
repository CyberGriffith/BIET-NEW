import React from 'react';
import { RecommendationResult, PathwayEligibilityStatus } from '../../types/pathway';
import { CheckCircle2, AlertTriangle, GitPullRequest, ArrowRight, BookOpen, UserCheck, MessageSquare, Clock, GraduationCap } from 'lucide-react';
import { ProgrammeIllustration } from '../ProgrammeIllustration';

interface PathwayCardProps {
  result: RecommendationResult;
  onViewDetails: (programmeId: string) => void;
  onApplyNow: (programmeTitle: string) => void;
  onContactCounsellor: (programmeTitle: string) => void;
}

export const PathwayCard: React.FC<PathwayCardProps> = ({
  result,
  onViewDetails,
  onApplyNow,
  onContactCounsellor,
}) => {
  const { programme, status, matchScore, headline, matchReasons, recommendedPathway } = result;

  const renderBadge = (status: PathwayEligibilityStatus) => {
    switch (status) {
      case 'DIRECT_ENTRY':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Direct Entry Eligible ({matchScore}% Match)
          </span>
        );
      case 'CONDITIONAL_ASSESSMENT':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            Requires Assessment ({matchScore}% Match)
          </span>
        );
      case 'PROGRESSION_PATHWAY':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30 shadow-xs">
            <GitPullRequest className="w-3.5 h-3.5 text-blue-300" />
            Foundation Pathway Recommended
          </span>
        );
    }
  };

  return (
    <div className="group relative bg-[#1A1A1A] hover:bg-[#222222] border border-white/10 hover:border-[#FFCC00]/50 rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#FFCC00]/5 flex flex-col justify-between overflow-hidden">
      {/* Top Gold Subtle Gradient Glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFCC00]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Category & Status Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
            {programme.school}
          </span>
          {renderBadge(status)}
        </div>

        {/* Title & Qualification */}
        <div className="flex gap-4 items-start mb-4">
          <div className="hidden sm:block shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#262626] to-[#141414] border border-white/10 overflow-hidden flex items-center justify-center p-1.5">
            <ProgrammeIllustration type={programme.imageSvgType} className="w-full h-full text-[#FFCC00]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#FFCC00] transition-colors leading-tight">
              {programme.title}
            </h3>
            <p className="text-xs text-[#FFCC00] font-semibold mt-0.5">
              Award: {programme.qualification}
            </p>
          </div>
        </div>

        {/* Dynamic Match Headline */}
        <div className="mb-4 bg-white/[0.03] border border-white/5 rounded-xl p-3">
          <p className="text-xs font-bold text-white mb-1.5 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-[#FFCC00]" />
            {headline}
          </p>
          <ul className="space-y-1">
            {matchReasons.map((reason, idx) => (
              <li key={idx} className="text-xs text-white/70 flex items-start gap-1.5 leading-relaxed">
                <span className="text-[#FFCC00] font-bold">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Foundation Route if Pathway */}
        {status === 'PROGRESSION_PATHWAY' && recommendedPathway && (
          <div className="mb-4 bg-blue-950/40 border border-blue-500/30 rounded-xl p-3">
            <p className="text-xs font-bold text-blue-300 mb-1 flex items-center gap-1.5">
              <GitPullRequest className="w-3.5 h-3.5 text-blue-400" />
              Recommended Progression Step:
            </p>
            <p className="text-xs text-white font-medium">{recommendedPathway}</p>
            <p className="text-[11px] text-white/60 mt-1">
              Provides guaranteed progression to Year 1 upon completion.
            </p>
          </div>
        )}

        {/* Key Attributes */}
        <div className="grid grid-cols-2 gap-2 text-xs text-white/70 mb-4 bg-black/30 p-2.5 rounded-xl border border-white/5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#FFCC00] shrink-0" />
            <span>{programme.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-[#FFCC00] shrink-0" />
            <span>{programme.studyMode}</span>
          </div>
        </div>

        {/* Career Pathways preview */}
        <div className="mb-5">
          <p className="text-[11px] font-bold text-white/50 uppercase tracking-wider mb-1.5">Career Opportunities</p>
          <div className="flex flex-wrap gap-1.5">
            {programme.careerPathways.slice(0, 3).map((career, i) => (
              <span key={i} className="text-[11px] bg-white/5 hover:bg-white/10 text-white/80 px-2.5 py-0.5 rounded-md border border-white/5">
                {career}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <button
          onClick={() => onViewDetails(programme.id)}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          View Details
        </button>

        <button
          onClick={() => onApplyNow(programme.title)}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-[#111111] bg-[#FFCC00] hover:bg-[#FFE066] transition-all shadow-md shadow-[#FFCC00]/10 hover:shadow-[#FFCC00]/25"
        >
          Apply Now
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onContactCounsellor(programme.title)}
          className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-emerald-300 hover:text-emerald-200 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          Talk to Counsellor
        </button>
      </div>
    </div>
  );
};
