export type ProgrammeCategory = 'all' | 'engineering' | 'computing' | 'built-environment';

export interface ProgrammeYearStructure {
  yearTitle: string;
  level: string;
  credits: number;
  description: string;
  modules: {
    code: string;
    name: string;
    credits: number;
    description: string;
  }[];
}

export interface ProgrammeModuleItem {
  no: number;
  code: string;
  title: string;
  credits: number;
  creditsDisplay?: string;
  semester?: string;
  academicYear?: string;
  moduleType?: string;
}

export interface ProgrammeGalleryImage {
  url: string;
  caption: string;
  category?: string;
}

export interface Programme {
  id: string;
  title: string;
  category: 'engineering' | 'computing' | 'built-environment';
  school: string;
  qualification: string;
  awardingBodyPlaceholder: string;
  duration: string;
  studyMode: string;
  intakes: string[];
  overview: string;
  sampleBadgeNote: string;
  whatYouWillLearn: string[];
  coreModulesYear1: string[];
  coreModulesYear2: string[];
  coreModulesYear3: string[];
  structureBreakdown: ProgrammeYearStructure[];
  entryRequirements: string[];
  careerPathways: string[];
  industrySectors: string[];
  laboratories: string[];
  imageSvgType: 'civil' | 'mechanical' | 'electrical' | 'software' | 'cyber' | 'quantity-surveying';
  imageUrl: string;
  heroImageUrl?: string;
  totalCredits?: string;
  moduleCount?: number;
  assessmentMethod?: string;
  assessmentNote?: string;
  affiliatedInstitution?: string;
  studySchedule?: string;
  progressionOpportunities?: string[];
  nextIntakeHighlight?: string;
  allModules?: ProgrammeModuleItem[];
  galleryImages?: ProgrammeGalleryImage[];
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Academic Notice' | 'Admissions' | 'Guest Lecture' | 'Student Achievement';
  date: string;
  readTime: string;
  summary: string;
  content: string[];
  author: string;
  imageUrl: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Open Day' | 'Guest Lecture' | 'Symposium' | 'Admissions';
  description: string;
  registrationRequired: boolean;
  imageUrl: string;
}

export interface CampusFacility {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  locationInCampus?: string;
  imageUrl: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  department: string;
  credentialsPlaceholder: string;
  bio: string;
  imageUrl?: string;
}

export interface StudentActivity {
  id: string;
  name: string;
  category: string;
  description: string;
  highlights: string[];
  imageUrl: string;
}
