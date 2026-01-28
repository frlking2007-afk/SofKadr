import React from 'react';
import { MapPin, DollarSign, Clock, ArrowRight } from 'lucide-react';
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
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 cursor-pointer overflow-hidden">
      {/* Subtle Glow Effect on Hover */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative flex items-start justify-between">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-xl bg-white dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-700 shadow-sm group-hover:shadow-md transition-all duration-300 flex items-center justify-center">
            {job.logoUrl ? (
                <img src={job.logoUrl} alt={job.company} className="w-full h-full object-cover" />
            ) : (
                <span className="text-xl font-bold text-gray-300">SK</span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
              {job.company}
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 mx-1"></span>
              <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                {timeAgo(job.postedAt)}
              </span>
            </p>
          </div>
        </div>
        
        {/* Arrow Icon that appears on hover */}
        <div className="text-blue-600 dark:text-blue-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
           <ArrowRight size={24} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-50 dark:border-gray-800/50 pt-4">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors">
          <MapPin size={16} className="text-gray-400 group-hover:text-red-400 transition-colors" />
          {job.location}
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors">
          <DollarSign size={16} className="text-gray-400 group-hover:text-green-400 transition-colors" />
          {job.salary}
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-800/50 group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors">
          <Clock size={16} className="text-gray-400 group-hover:text-orange-400 transition-colors" />
          {job.type}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span 
            key={tag} 
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-800 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JobCard;