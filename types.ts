export enum JobType {
  FULL_TIME = 'To\'liq kun',
  PART_TIME = 'Yarim kun',
  REMOTE = 'Masofaviy',
  INTERNSHIP = 'Amaliyot',
  PROJECT = 'Loyiha ishi'
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  type: JobType;
  description: string;
  postedAt: Date;
  tags: string[];
}

export interface FilterState {
  search: string;
  location: string;
  type: string[];
}

export enum UserRole {
  SEEKER = 'SEEKER', // Ish qidiruvchi
  EMPLOYER = 'EMPLOYER' // Ish beruvchi
}