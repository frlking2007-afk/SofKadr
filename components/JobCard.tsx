import React from 'react';
import { MapPin, DollarSign, Clock } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const timeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " soat oldin";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " daqiqa oldin";
    return "Hozirgina";
  };

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
            {job.logoUrl ? (
                <img src={job.logoUrl} alt={job.company} className="w-full h-full object-cover" />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs font-bold">LOGO</div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
              {job.company}
            </p>
          </div>
        </div>
        
        <span className="text-xs font-medium text-gray-400 whitespace-nowrap hidden sm:block">
          {timeAgo(job.postedAt)}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-1.5">
          <MapPin size={16} className="text-gray-400" />
          {job.location}
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign size={16} className="text-gray-400" />
          {job.salary}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={16} className="text-gray-400" />
          {job.type}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span 
            key={tag} 
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JobCard;