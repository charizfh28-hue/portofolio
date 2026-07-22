export type ThemeMode = 'dark' | 'light';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
  level: number; // 0 - 100
  iconName: string;
  experienceYears: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'web' | 'mobile' | 'uiux' | 'fullstack';
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  completionDate: string;
  highlights?: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  type: 'work' | 'education';
}

export interface HighlightStat {
  label: string;
  value: string;
  subtext: string;
}

export interface ProfileData {
  name: string;
  nickname: string;
  title: string;
  subtitles: string[];
  bio: string;
  aboutText: string[];
  avatarUrl: string;
  location: string;
  email: string;
  phone: string;
  whatsapp: string;
  availableForHire: boolean;
  socials: SocialLink[];
  stats: HighlightStat[];
  interests: string[];
  // Personal Details from CV
  birthPlaceDate?: string;
  gender?: string;
  maritalStatus?: string;
  nationality?: string;
  instagram?: string;
  tiktok?: string;
  cvDriveUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
