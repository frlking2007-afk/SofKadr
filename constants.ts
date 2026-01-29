import { Job, JobType } from './types';

export const LOCATIONS = [
  'Toshkent',
  'Samarqand',
  'Buxoro',
  'Namangan',
  'Andijon',
  'Farg\'ona',
  'Xorazm',
  'Navoiy',
  'Qashqadaryo',
  'Surxondaryo',
  'Jizzax',
  'Sirdaryo',
  'Qoraqalpog\'iston'
];

export const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Frontend Dasturchi (React)',
    company: 'TechSoft LLC',
    location: 'Toshkent',
    salaryRange: '15,000,000 - 25,000,000 UZS',
    type: JobType.FULL_TIME,
    description: 'Biz tajribali Frontend dasturchini qidirmoqdamiz. Talablar: React, TypeScript, Tailwind CSS.',
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    tags: ['React', 'TypeScript', 'Frontend']
  },
  {
    id: '2',
    title: 'Bosh Hisobchi',
    company: 'Gold Textile',
    location: 'Samarqand',
    salaryRange: '8,000,000 - 12,000,000 UZS',
    type: JobType.FULL_TIME,
    description: 'Korxonaga bosh hisobchi kerak. 1C dasturini mukammal bilishi shart.',
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    tags: ['1C', 'Hisob-kitob', 'Finance']
  },
  {
    id: '3',
    title: 'SMM Menejer',
    company: 'Creative Agency',
    location: 'Masofaviy',
    salaryRange: '5,000,000 - 10,000,000 UZS',
    type: JobType.REMOTE,
    description: 'Ijtimoiy tarmoqlar uchun kontent yaratish va target reklama yoqish.',
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    tags: ['Marketing', 'Instagram', 'Telegram']
  },
  {
    id: '4',
    title: 'Sotuv Menejeri',
    company: 'Real Estate Pro',
    location: 'Toshkent',
    salaryRange: 'Fix + Bonus (20m+)',
    type: JobType.FULL_TIME,
    description: 'Ko\'chmas mulk sotuvi bo\'yicha faol menejerlarni jamoamizga taklif qilamiz.',
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
    tags: ['Sotuv', 'Muloqot']
  },
  {
    id: '5',
    title: 'Node.js Backend Dasturchi',
    company: 'FinTech Solutions',
    location: 'Toshkent',
    salaryRange: '20,000,000 - 35,000,000 UZS',
    type: JobType.FULL_TIME,
    description: 'Yuqori yuklamali tizimlar bilan ishlash tajribasiga ega Backend dasturchi kerak.',
    postedAt: new Date(Date.now() - 1000 * 60 * 30),
    tags: ['Node.js', 'PostgreSQL', 'Redis']
  }
];