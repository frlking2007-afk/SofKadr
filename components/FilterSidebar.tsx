import React from 'react';
import { JobType } from '../types';
import { SALARY_RANGES } from '../constants';
import { Filter } from 'lucide-react';

interface FilterSidebarProps {
  selectedJobTypes: JobType[];
  toggleJobType: (type: JobType) => void;
  selectedSalary: string;
  setSalary: (salary: string) => void;
  isOpenMobile: boolean;
  closeMobile: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  selectedJobTypes, 
  toggleJobType, 
  selectedSalary, 
  setSalary,
  isOpenMobile,
  closeMobile
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={closeMobile}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none md:transform-none md:static md:w-64 md:block md:bg-transparent dark:md:bg-transparent border-r md:border-r-0 border-gray-200 dark:border-gray-800 p-6 overflow-y-auto
        ${isOpenMobile ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filtrlar</h2>
          <button onClick={closeMobile} className="text-gray-500">
            <span className="sr-only">Yopish</span>
            &times;
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white md:mb-8">
            <Filter size={20} />
            <span className="font-semibold text-lg">Saralash</span>
        </div>

        {/* Job Type Filter */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4">
            Bandlik turi
          </h3>
          <div className="space-y-3">
            {Object.values(JobType).map((type) => (
              <label key={type} className="flex items-center group cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    className="peer appearance-none h-5 w-5 border-2 border-gray-300 dark:border-gray-600 rounded bg-transparent checked:bg-black dark:checked:bg-white checked:border-black dark:checked:border-white transition-all"
                    checked={selectedJobTypes.includes(type)}
                    onChange={() => toggleJobType(type)}
                  />
                  <svg className="absolute w-3 h-3 text-white dark:text-black pointer-events-none hidden peer-checked:block left-1 top-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Salary Filter */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4">
            Maosh
          </h3>
          <div className="space-y-3">
            {SALARY_RANGES.map((range) => (
              <label key={range.value} className="flex items-center group cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="salary"
                    className="peer appearance-none h-5 w-5 border-2 border-gray-300 dark:border-gray-600 rounded-full bg-transparent checked:border-black dark:checked:border-white transition-all"
                    checked={selectedSalary === range.value}
                    onChange={() => setSalary(range.value)}
                  />
                   <div className="absolute w-2.5 h-2.5 bg-black dark:bg-white rounded-full hidden peer-checked:block left-[5px] top-[5px]"></div>
                </div>
                <span className="ml-3 text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;