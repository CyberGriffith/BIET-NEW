import { StudentAcademicProfile, CourseRule, RecommendationResult, PathwayLead } from '../types/pathway';
import { PROGRAMMES_DATA } from '../data/mockData';
import { INITIAL_COURSE_RULES } from '../data/pathwayData';

const RULES_STORAGE_KEY = 'biet_pathway_course_rules_v1';
const LEADS_STORAGE_KEY = 'biet_pathway_leads_v1';

// Get current active rules (from localStorage if modified by Admin, or initial default rules)
export function getStoredCourseRules(): CourseRule[] {
  try {
    const saved = localStorage.getItem(RULES_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading saved pathway rules:', err);
  }
  return INITIAL_COURSE_RULES;
}

// Save updated rules (Admin interface)
export function saveCourseRules(rules: CourseRule[]): void {
  try {
    localStorage.setItem(RULES_STORAGE_KEY, JSON.stringify(rules));
  } catch (err) {
    console.error('Error saving pathway rules:', err);
  }
}

// Reset rules to initial defaults
export function resetCourseRulesToDefault(): CourseRule[] {
  localStorage.removeItem(RULES_STORAGE_KEY);
  return INITIAL_COURSE_RULES;
}

// Save leads for counsellor follow-up
export function savePathwayLead(lead: Omit<PathwayLead, 'id' | 'timestamp'>): PathwayLead {
  const fullLead: PathwayLead = {
    ...lead,
    id: `LEAD-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
  };

  try {
    const existingRaw = localStorage.getItem(LEADS_STORAGE_KEY);
    const existing: PathwayLead[] = existingRaw ? JSON.parse(existingRaw) : [];
    existing.unshift(fullLead);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Error saving lead:', err);
  }

  return fullLead;
}

export function getStoredPathwayLeads(): PathwayLead[] {
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error getting pathway leads:', err);
    return [];
  }
}

// Grade comparison helper
function isGradeSufficient(studentGrade: string, requiredGrade: string): boolean {
  if (requiredGrade === 'Any') return true;
  if (!studentGrade || studentGrade === 'Pending') return true; // Give benefit of doubt for pending
  const gradeRank: Record<string, number> = { A: 4, B: 3, C: 2, S: 1, F: 0 };
  const studentRank = gradeRank[studentGrade.toUpperCase()] ?? 1;
  const requiredRank = gradeRank[requiredGrade.toUpperCase()] ?? 1;
  return studentRank >= requiredRank;
}

// Core Matching Engine
export function evaluatePathwayRecommendations(profile: StudentAcademicProfile): RecommendationResult[] {
  const rules = getStoredCourseRules().filter((r) => r.isActive);
  const results: RecommendationResult[] = [];

  const hasAL = profile.qualifications.some((q) => q === 'gce-al-sl' || q === 'cambridge-al');
  const hasOL = profile.qualifications.some((q) => q === 'gce-ol-sl' || q === 'cambridge-ol');
  const hasHigher = profile.qualifications.some((q) =>
    ['diploma', 'higher-diploma', 'bachelor', 'professional', 'foundation'].includes(q)
  );

  const alPasses = profile.alPassesCount || 0;
  const stream = profile.stream || '';

  PROGRAMMES_DATA.forEach((programme) => {
    const rule = rules.find((r) => r.programmeId === programme.id || r.programmeTitle === programme.title);
    
    // Default fallback rule if not in list
    const effectiveRule: CourseRule = rule || {
      id: `default-${programme.id}`,
      programmeId: programme.id,
      programmeTitle: programme.title,
      category: programme.category,
      minOLMathsGrade: 'S',
      minOLEnglishGrade: 'S',
      requiredALStreams: ['Any Stream'],
      minALPasses: 2,
      acceptedAlternativeQualifications: ['Relevant Diploma or Foundation'],
      progressionPathwayCourse: 'BIET International Foundation',
      progressionNote: 'Entry via BIET Foundation Diploma',
      isActive: true,
    };

    const isFieldPreferred =
      profile.preferredFields.length === 0 || profile.preferredFields.includes(programme.category);

    let matchScore = 50;
    const matchReasons: string[] = [];
    let status: 'DIRECT_ENTRY' | 'CONDITIONAL_ASSESSMENT' | 'PROGRESSION_PATHWAY' = 'PROGRESSION_PATHWAY';
    let headline = '';

    // Check O/L prerequisites
    const mathsOk = isGradeSufficient(profile.mathsGrade, effectiveRule.minOLMathsGrade);
    const englishOk = isGradeSufficient(profile.englishGrade, effectiveRule.minOLEnglishGrade);

    // Stream check
    const streamMatches =
      effectiveRule.requiredALStreams.includes('Any Stream') ||
      effectiveRule.requiredALStreams.some((reqStream) =>
        stream.toLowerCase().includes(reqStream.toLowerCase()) || reqStream.toLowerCase().includes(stream.toLowerCase())
      );

    // Direct Entry Evaluation
    if (hasHigher) {
      status = 'DIRECT_ENTRY';
      matchScore = 95;
      headline = 'Direct Entry / Fast-Track Advanced Standing Eligible';
      matchReasons.push('Your prior diploma, foundation, or higher qualification matches entry criteria.');
      if (profile.additionalQualifications) {
        matchReasons.push(`Recognized background: ${profile.additionalQualifications}`);
      }
    } else if (hasAL && alPasses >= effectiveRule.minALPasses && streamMatches && mathsOk) {
      status = 'DIRECT_ENTRY';
      matchScore = 90;
      headline = 'Direct Degree Entry Eligible';
      matchReasons.push(`You meet the required G.C.E. A/L passes (${alPasses} passes) in a recognized stream.`);
      if (mathsOk && profile.mathsGrade) {
        matchReasons.push(`Satisfies G.C.E. O/L Mathematics requirement (Grade: ${profile.mathsGrade}).`);
      }
    } else if (hasAL && alPasses >= effectiveRule.minALPasses && !streamMatches && programme.category !== 'engineering') {
      // Computing / Built Environment allows non-STEM A/L
      status = 'DIRECT_ENTRY';
      matchScore = 85;
      headline = 'Direct Degree Entry Eligible (Cross-Stream)';
      matchReasons.push('This programme welcomes G.C.E. A/L graduates from any academic stream.');
    } else if (hasAL && alPasses === 1) {
      status = 'CONDITIONAL_ASSESSMENT';
      matchScore = 75;
      headline = 'Requires Special Assessment / Conditional Entry';
      matchReasons.push('You hold 1 G.C.E. A/L pass. Admissible subject to BIET Academic Board interview and portfolio review.');
      if (!streamMatches && programme.category === 'engineering') {
        matchReasons.push('Engineering programmes recommend Combined Maths foundation bridge module.');
      }
    } else if (profile.currentStatus?.toLowerCase().includes('awaiting') || profile.mathsGrade === 'Pending') {
      status = 'CONDITIONAL_ASSESSMENT';
      matchScore = 70;
      headline = 'Conditional Offer Pending Official Results';
      matchReasons.push('Provisional admission granted based on pending G.C.E. O/L or A/L results.');
    } else if (hasOL || alPasses === 0) {
      status = 'PROGRESSION_PATHWAY';
      matchScore = 65;
      headline = 'Foundation / Diploma Progression Pathway Recommended';
      matchReasons.push(`Start with ${effectiveRule.progressionPathwayCourse} to gain direct progression.`);
      if (effectiveRule.progressionNote) {
        matchReasons.push(effectiveRule.progressionNote);
      }
    } else {
      status = 'CONDITIONAL_ASSESSMENT';
      matchScore = 60;
      headline = 'Individual Counsellor Assessment Recommended';
      matchReasons.push('Your academic credentials will be evaluated individually by BIET admissions.');
    }

    // Adjust score based on preferred field match
    if (isFieldPreferred) {
      matchScore += 10;
    }
    matchScore = Math.min(98, Math.max(50, matchScore));

    const requirementsSummary = `Entry: Min ${effectiveRule.minALPasses} A/L passes in ${effectiveRule.requiredALStreams.join('/')} or recognized diploma. O/L Maths grade ${effectiveRule.minOLMathsGrade}+ required.`;

    results.push({
      programme,
      status,
      matchScore,
      headline,
      matchReasons,
      requirementsSummary,
      progressionNote: effectiveRule.progressionNote,
      recommendedPathway: effectiveRule.progressionPathwayCourse,
      alternativeRoutes: effectiveRule.acceptedAlternativeQualifications,
    });
  });

  // Sort by status priority (DIRECT_ENTRY first, then CONDITIONAL, then PROGRESSION) and matchScore
  const statusPriority: Record<string, number> = {
    DIRECT_ENTRY: 3,
    CONDITIONAL_ASSESSMENT: 2,
    PROGRESSION_PATHWAY: 1,
  };

  results.sort((a, b) => {
    const prioDiff = statusPriority[b.status] - statusPriority[a.status];
    if (prioDiff !== 0) return prioDiff;
    return b.matchScore - a.matchScore;
  });

  return results;
}
