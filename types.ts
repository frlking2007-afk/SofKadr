export enum JobType {
  FULL_TIME = 'To\'liq bandlik',
  PART_TIME = 'Yarim kunlik',
  REMOTE = 'Masofaviy',
  INTERNSHIP = 'Stajirovka',
  CONTRACT = 'Shartnoma asosida'
}

export enum UserRole {
  SEEKER = 'SEEKER',
  EMPLOYER = 'EMPLOYER'
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: JobType;
  tags: string[];
  postedAt: Date;
  description: string;
  logoUrl?: string;
}

export interface FilterState {
  searchQuery: string;
  location: string;
  jobTypes: JobType[];
  salaryRange: string; // Simplified for UI demo
}
