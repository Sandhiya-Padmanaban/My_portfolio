export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Education {
  id: string;
  level: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  score: string;
}

export interface Internship {
  id: string;
  domain: string;
  company: string;
  location: string;
  duration: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  organization?: string;
  date?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  organization?: string;
  date?: string;
  isSpecial?: boolean;
}

export interface PreferredInterest {
  id: string;
  title: string;
  category: string;
  description: string;
  highlight: string;
  skills: string[];
}

