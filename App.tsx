import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterSidebar from './components/FilterSidebar';
import JobCard from './components/JobCard';
import PostJobModal from './components/PostJobModal';
import About from './components/About';
import { Job, JobType, UserRole } from './types';
import { INITIAL_JOBS } from './constants';
import { Filter, SearchX } from 'lucide-react';

const App: React.FC = () => {
  // Global State
  const [darkMode, setDarkMode] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.SEEKER);
  const [currentView, setCurrentView] = useState<'home' | 'about'>('home');
  
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

  const handleNavigate = (page: 'home' | 'about') => {
    setCurrentView(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

      // 4. Salary Logic (Range Intersection)
      let matchesSalary = true;
      if (selectedSalary !== 'all') {
          // Extract numbers from salary string like "$1,000 - $2,000" or "$3,500+"
          const cleanSalary = job.salary.replace(/,/g, '');
          const numbers = cleanSalary.match(/\d+/g)?.map(Number);
          
          if (numbers && numbers.length > 0) {
             const min = numbers[0];
             const max = numbers.length > 1 ? numbers[1] : min;
             
             switch(selectedSalary) {
                case 'under_500':
                   // Job min salary is under 500
                   matchesSalary = min <= 500;
                   break;
                case '500_1000':
                   // Check for overlap: [min, max] overlaps with [500, 1000]
                   // Formula: startA <= endB && endA >= startB
                   matchesSalary = min <= 1000 && max >= 500;
                   break;
                case '1000_2000':
                   // Check for overlap with [1000, 2000]
                   matchesSalary = min <= 2000 && max >= 1000;
                   break;
                case '2000_plus':
                   // Job max salary is at least 2000
                   matchesSalary = max >= 2000;
                   break;
                default:
                   matchesSalary = true;
             }
          }
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
        onNavigate={handleNavigate}
        currentPage={currentView}
      />

      {currentView === 'home' ? (
        <>
          <Hero 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            location={locationFilter}
            setLocation={setLocationFilter}
            onSearch={() => { /* Real time filtering */ }}
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
                    {userRole === UserRole.SEEKER ? 'Mavjud Vakansiyalar' : 'Qidirilayotgan Mutaxassislar'} 
                    <span className="text-gray-400 font-normal text-base ml-2">({filteredJobs.length})</span>
                  </h2>
                </div>

                {userRole === UserRole.EMPLOYER && (
                  <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl text-sm text-blue-800 dark:text-blue-300">
                    Siz "Ishchi topish" rejimidasiz. Quyida ish izlayotgan nomzodlar ro'yxati chiqishi kerak (Hozircha demo rejimda vakansiyalar ko'rsatilmoqda).
                  </div>
                )}

                <div className="space-y-4">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                      <JobCard key={job.id} job={job} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 group">
                        
                        {/* Illustration Container */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                            <div className="relative bg-gray-50 dark:bg-gray-800 p-6 rounded-full ring-1 ring-gray-100 dark:ring-gray-700 group-hover:scale-110 transition-transform duration-500 ease-out">
                                <SearchX size={48} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300" />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            Afsuski, hech narsa topilmadi
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8 leading-relaxed">
                            Qidiruv so'rovingiz bo'yicha vakansiyalar mavjud emas. Filtrlarni o'zgartirib yoki boshqa kalit so'zlar bilan urinib ko'ring.
                        </p>

                        <button 
                            onClick={() => {
                                setSearchQuery('');
                                setLocationFilter('');
                                setSelectedJobTypes([]);
                                setSelectedSalary('all');
                            }}
                            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
                        >
                            Filtrlarni tozalash
                        </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <About />
      )}

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