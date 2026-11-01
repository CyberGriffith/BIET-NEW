import { Programme } from './index';

export type QualificationType =
  | 'gce-ol-sl'
  | 'gce-al-sl'
  | 'cambridge-ol'
  | 'cambridge-al'
  | 'foundation'
  | 'certificate'
  | 'diploma'
  | 'higher-diploma'
  | 'bachelor'
  | 'professional'
  | 'international'
  | 'other';

export interface QualificationOption {
  id: QualificationType;
  title: string;
  category: 'secondary' | 'post-secondary' | 'higher' | 'other';
  description: string;
}

export interface StudentAcademicProfile {
  qualifications: QualificationType[];
  customQualification?: string;
  examCountry: string;
  stream: string;
  mathsGrade: string; // 'A' | 'B' | 'C' | 'S' | 'F' | 'Pending'
  englishGrade: string; // 'A' | 'B' | 'C' | 'S' | 'F' | 'Pending'
  alPassesCount: number; // 0, 1, 2, 3
  subjectsStudied: string[];
  yearOfCompletion: string;
  additionalQualifications: string;
  currentStatus: string;
  goals: string[];
  preferredFields: string[]; // 'engineering' | 'computing' | 'built-environment'
  studyMode: 'any' | 'full-time' | 'part-time' | 'hybrid';
}

export type PathwayEligibilityStatus = 'DIRECT_ENTRY' | 'CONDITIONAL_ASSESSMENT' | 'PROGRESSION_PATHWAY';

export interface CourseRule {
  id: string;
  programmeId: string;
  programmeTitle: string;
  category: 'engineering' | 'computing' | 'built-environment';
  minOLMathsGrade: 'A' | 'B' | 'C' | 'S' | 'Any';
  minOLEnglishGrade: 'A' | 'B' | 'C' | 'S' | 'Any';
  requiredALStreams: string[]; // e.g. ['Physical Science', 'Combined Mathematics', 'Physics', 'Any Stream']
  minALPasses: number;
  acceptedAlternativeQualifications: string[];
  progressionPathwayCourse: string; // e.g. "BIET International Engineering Foundation (1 Year)"
  progressionNote: string;
  isActive: boolean;
}

export interface RecommendationResult {
  programme: Programme;
  status: PathwayEligibilityStatus;
  matchScore: number; // 0-100%
  headline: string;
  matchReasons: string[];
  requirementsSummary: string;
  progressionNote?: string;
  recommendedPathway?: string;
  alternativeRoutes?: string[];
}

export interface PathwayLead {
  id: string;
  timestamp: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  preferredIntake: string;
  additionalNotes?: string;
  profile: StudentAcademicProfile;
  recommendedProgrammes: {
    id: string;
    title: string;
    status: PathwayEligibilityStatus;
  }[];
}
