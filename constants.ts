import { Job, JobType } from './types';

export const CITIES = [
  "Barcha hududlar",
  "Toshkent",
  "Samarqand",
  "Buxoro",
  "Farg'ona",
  "Andijon",
  "Namangan",
  "Xiva",
  "Nukus",
  "Qarshi"
];

export const SALARY_RANGES = [
  { value: 'all', label: 'Barchasi' },
  { value: 'under_500', label: '$500 gacha' },
  { value: '500_1000', label: '$500 - $1,000' },
  { value: '1000_2000', label: '$1,000 - $2,000' },
  { value: '2000_plus', label: '$2,000 dan yuqori' }
];

export const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'Click',
    location: 'Toshkent',
    salary: '$2,500 - $4,000',
    type: JobType.FULL_TIME,
    tags: ['React', 'TypeScript', 'Tailwind'],
    postedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    description: 'Bizning jamoamizga tajribali Frontend dasturchi qidirilmoqda.',
    logoUrl: 'https://picsum.photos/64/64?random=1'
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Payme',
    location: 'Toshkent',
    salary: '$1,500 - $2,500',
    type: JobType.FULL_TIME,
    tags: ['Figma', 'UI/UX', 'Design System'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    description: 'Foydalanuvchilarga qulay interfeyslar yaratish uchun dizayner kerak.',
    logoUrl: 'https://picsum.photos/64/64?random=2'
  },
  {
    id: '3',
    title: 'Backend Developer (Go)',
    company: 'Uzum Market',
    location: 'Toshkent',
    salary: '$3,000 - $5,000',
    type: JobType.FULL_TIME,
    tags: ['Golang', 'PostgreSQL', 'Microservices'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    description: 'Yuqori yuklamali tizimlar bilan ishlash tajribasiga ega mutaxassis.',
    logoUrl: 'https://picsum.photos/64/64?random=3'
  },
  {
    id: '4',
    title: 'SMM Menejer',
    company: 'Najot Ta\'lim',
    location: 'Toshkent',
    salary: '$600 - $1,000',
    type: JobType.PART_TIME,
    tags: ['Instagram', 'Copywriting', 'Marketing'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    description: 'Ijtimoiy tarmoqlarda faol kontent yurita oladigan ijodkor inson.',
    logoUrl: 'https://picsum.photos/64/64?random=4'
  },
  {
    id: '5',
    title: 'Full Stack Developer',
    company: 'EPAM Systems',
    location: 'Masofaviy',
    salary: '$3,500+',
    type: JobType.REMOTE,
    tags: ['Node.js', 'React', 'AWS'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 26), // 1 day ago
    description: 'Xalqaro loyihada ishlash imkoniyati.',
    logoUrl: 'https://picsum.photos/64/64?random=5'
  },
  {
    id: '6',
    title: 'Call Center Operator',
    company: 'Beeline Uzbekistan',
    location: 'Samarqand',
    salary: '$400 - $600',
    type: JobType.FULL_TIME,
    tags: ['Communication', 'Uzbek', 'Russian'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    description: 'Mijozlarga xizmat ko\'rsatish bo\'limi uchun operatorlar.',
    logoUrl: 'https://picsum.photos/64/64?random=6'
  },
  {
    id: '7',
    title: 'Flutter Developer',
    company: 'Super Dispatch',
    location: 'Toshkent',
    salary: '$2,000 - $3,500',
    type: JobType.CONTRACT,
    tags: ['Dart', 'Flutter', 'Mobile'],
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 50), // 2 days ago
    description: 'Mobil ilovalar ishlab chiqish.',
    logoUrl: 'https://picsum.photos/64/64?random=7'
  }
];