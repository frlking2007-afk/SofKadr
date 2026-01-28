import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterSidebar from './components/FilterSidebar';
import JobCard from './components/JobCard';
import PostJobModal from './components/PostJobModal';
import { Job, JobType, UserRole } from './types';
import { INITIAL_JOBS } from './constants';
import { Filter } from 'lucide-react';

const App: React.FC = () => {
  // Global State
  const [darkMode, setDarkMode] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.SEEKER);
  
  // Data State
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<JobType[]>([]);
  const [selectedSalary, setSelectedSalary] = useState('all');

  // Dark Mode Effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handlers
  const toggleJobType = (type: JobType) => {
    if (selectedJobTypes.includes(type)) {
      setSelectedJobTypes(selectedJobTypes.filter(t => t !== type));
    } else {
      setSelectedJobTypes([...selectedJobTypes, type]);
    }
  };

  const handlePostJob = (newJob: Job) => {
    setJobs([newJob, ...jobs]);
  };

  // Filter Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // 1. Text Search
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        job.title.toLowerCase().includes(query) || 
        job.company.toLowerCase().includes(query) ||
        job.tags.some(tag => tag.toLowerCase().includes(query));

      // 2. Location
      const matchesLocation = locationFilter === '' || locationFilter === 'Barcha hududlar' || job.location === locationFilter;

      // 3. Job Type
      const matchesType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type);

      // 4. Salary (Simple logic for demo)
      let matchesSalary = true;
      if (selectedSalary !== 'all') {
          // Very basic simulation of salary matching based on mock data strings
          // In a real app, salary would be numeric
          // keeping it simple to just pass through for now or basic check
          matchesSalary = true; 
      }

      return matchesSearch && matchesLocation && matchesType && matchesSalary;
    });
  }, [jobs, searchQuery, locationFilter, selectedJobTypes, selectedSalary]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 pb-20">
      
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)}
        userRole={userRole}
        setUserRole={setUserRole}
        onPostJob={() => setIsModalOpen(true)}
      />

      <Hero 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={locationFilter}
        setLocation={setLocationFilter}
        onSearch={() => { /* Real time filtering already active, visual trigger only */ }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="md:hidden mb-4">
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 w-full justify-center"
            >
              <Filter size={16} />
              Filtrlar
            </button>
          </div>

          {/* Sidebar */}
          <FilterSidebar 
            selectedJobTypes={selectedJobTypes}
            toggleJobType={toggleJobType}
            selectedSalary={selectedSalary}
            setSalary={setSelectedSalary}
            isOpenMobile={isMobileFiltersOpen}
            closeMobile={() => setIsMobileFiltersOpen(false)}
          />

          {/* Feed */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Natijalar <span className="text-gray-400 font-normal text-base ml-2">({filteredJobs.length} ta vakansiya)</span>
              </h2>
            </div>

            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))
              ) : (
                <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">Hozircha mos keluvchi ishlar yo'q</p>
                  <button 
                    onClick={() => {
                        setSearchQuery('');
                        setLocationFilter('');
                        setSelectedJobTypes([]);
                    }}
                    className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Filtrlarni tozalash
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <PostJobModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPost={handlePostJob}
      />
    </div>
  );
};

export default App;