import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_JOBS, LOCATIONS } from './constants';
import { Job, FilterState, UserRole, JobType } from './types';
import { Button } from './components/Button';
import { PostJobModal } from './components/PostJobModal';

// Components defined within App.tsx to keep it single-file friendly for the prompt requirements where possible
// but distinct enough for clarity.

const Navbar: React.FC<{ 
  role: UserRole; 
  setRole: (r: UserRole) => void; 
  onPostClick: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}> = ({ role, setRole, onPostClick, darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20">
          {/* Logo and Desktop Nav */}
          <div className="flex items-center gap-4 md:gap-12">
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <img 
                src="https://raw.githubusercontent.com/frlking2007-afk/Rasmlar/refs/heads/main/IMG_20260127_131138_716.webp" 
                alt="Sof Kadr Logo" 
                className="h-10 w-10 mr-3 object-contain rounded-xl" 
              />
              <span className="text-xl md:text-2xl font-bold text-black dark:text-white tracking-tight transition-colors">Sof Kadr</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-900 dark:text-gray-300 hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-black dark:hover:border-white px-1 py-1 text-sm font-medium transition-colors">Ish qidirish</a>
              <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border-b-2 border-transparent hover:border-black dark:hover:border-white px-1 py-1 text-sm font-medium transition-colors">Biz haqimizda</a>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
             <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <div className="flex bg-gray-50 dark:bg-gray-900 rounded-lg p-1 border border-gray-200 dark:border-gray-800">
              <button 
                onClick={() => setRole(UserRole.SEEKER)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${role === UserRole.SEEKER ? 'bg-white dark:bg-gray-800 shadow text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
              >
                Ish izlayapman
              </button>
              <button 
                onClick={() => setRole(UserRole.EMPLOYER)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${role === UserRole.EMPLOYER ? 'bg-white dark:bg-gray-800 shadow text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
              >
                Xodim izlayapman
              </button>
            </div>
            {role === UserRole.EMPLOYER && (
              <Button onClick={onPostClick} size="sm">
                E'lon berish
              </Button>
            )}
             {role === UserRole.SEEKER && (
              <Button variant="outline" size="sm">
                Kirish
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-3">
             <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Menyuni ochish</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900">Ish qidirish</a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900">Biz haqimizda</a>
          </div>
          <div className="pt-4 pb-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center px-4 mb-4">
              <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-lg p-1 border border-gray-200 dark:border-gray-800 flex">
                <button 
                  onClick={() => setRole(UserRole.SEEKER)}
                  className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${role === UserRole.SEEKER ? 'bg-white dark:bg-gray-800 shadow text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  Ish izlayapman
                </button>
                <button 
                  onClick={() => setRole(UserRole.EMPLOYER)}
                  className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${role === UserRole.EMPLOYER ? 'bg-white dark:bg-gray-800 shadow text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                >
                  Xodim izlayapman
                </button>
              </div>
            </div>
            <div className="px-4 space-y-2">
              {role === UserRole.EMPLOYER && (
                <Button onClick={onPostClick} className="w-full justify-center">
                  E'lon berish
                </Button>
              )}
               {role === UserRole.SEEKER && (
                <Button variant="outline" className="w-full justify-center">
                  Kirish
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const JobCard: React.FC<{ job: Job; onClick: () => void }> = ({ job, onClick }) => {
  // Calculate relative time
  const timeAgo = (date: Date) => {
    const hours = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Hozirgina';
    if (hours < 24) return `${hours} soat oldin`;
    return `${Math.floor(hours / 24)} kun oldin`;
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-gray-900 rounded-none border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:border-black dark:hover:border-white transition-colors cursor-pointer group"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
        <div className="w-full sm:w-auto">
          <h3 className="text-base sm:text-lg font-bold text-black dark:text-white group-hover:underline transition-all decoration-1 underline-offset-4 line-clamp-2">
            {job.title}
          </h3>
          <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300 mt-1">{job.salaryRange}</p>
        </div>
        <span className="inline-flex items-center px-2 py-1 rounded-none border border-gray-200 dark:border-gray-700 text-[10px] sm:text-xs font-medium bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 whitespace-nowrap">
          {job.type}
        </span>
      </div>
      
      <div className="mt-3 sm:mt-4">
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {job.description}
        </p>
      </div>

      <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
        {job.tags.map(tag => (
          <span key={tag} className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-300 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 px-2 py-1">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-between text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 gap-y-2">
        <div className="flex items-center gap-1 text-gray-900 dark:text-gray-300 font-medium">
          {job.company}
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-gray-500 dark:text-gray-400 w-full sm:w-auto justify-between sm:justify-end">
          <span className="flex items-center gap-1">
             <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
             {job.location}
          </span>
          <span>{timeAgo(job.postedAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [role, setRole] = useState<UserRole>(UserRole.SEEKER);
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    location: '',
    type: []
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handlePostJob = (job: Job) => {
    setJobs([job, ...jobs]);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                            job.company.toLowerCase().includes(filters.search.toLowerCase());
      const matchesLocation = filters.location ? job.location === filters.location : true;
      const matchesType = filters.type.length === 0 || filters.type.includes(job.type);
      return matchesSearch && matchesLocation && matchesType;
    });
  }, [jobs, filters]);

  const handleTypeChange = (type: string) => {
    setFilters(prev => {
      const newTypes = prev.type.includes(type)
        ? prev.type.filter(t => t !== type)
        : [...prev.type, type];
      return { ...prev, type: newTypes };
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white font-light transition-colors duration-200">
      <Navbar 
        role={role} 
        setRole={setRole} 
        onPostClick={() => setIsModalOpen(true)} 
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Hero Search Section - Responsive */}
      <div className="bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 pb-12 sm:pb-20 pt-8 sm:pt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-black dark:text-white mb-4 sm:mb-6 leading-tight transition-colors">
              {role === UserRole.SEEKER 
                ? "Orzuingizdagi ishni toping" 
                : "Jamoangiz uchun mutaxassislar"}
            </h1>
            <p className="text-base sm:text-xl text-gray-500 dark:text-gray-400 mb-8 sm:mb-10 font-light transition-colors">
              Sof Kadr — minglab vakansiyalar va rezyumelar bazasi.
            </p>
            
            <div className="bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-300 dark:border-gray-700 shadow-xl shadow-gray-100/50 dark:shadow-none flex flex-col md:flex-row gap-2 md:gap-2 transition-colors">
              <div className="flex-grow relative border md:border-none border-gray-200 dark:border-gray-700 rounded md:rounded-none">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 sm:pl-11 pr-3 py-3 sm:py-4 border-none rounded-md leading-5 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 text-base sm:text-lg"
                  placeholder={role === UserRole.SEEKER ? "Kasb yoki kompaniya..." : "Ko'nikma..."}
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({...prev, search: e.target.value}))}
                />
              </div>
              <div className="md:w-56 relative border md:border-none md:border-l border-gray-200 dark:border-gray-700 rounded md:rounded-none">
                <select
                  className="block w-full pl-3 sm:pl-4 pr-10 py-3 sm:py-4 text-base sm:text-lg border-none focus:outline-none focus:ring-0 text-gray-900 dark:text-white bg-transparent cursor-pointer"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({...prev, location: e.target.value}))}
                >
                  <option value="" className="dark:bg-gray-900">Barcha hududlar</option>
                  {LOCATIONS.map(loc => (
                    <option key={loc} value={loc} className="dark:bg-gray-900">{loc}</option>
                  ))}
                </select>
              </div>
              <div className="p-0 sm:p-1">
                <Button size="lg" className="w-full md:w-auto h-full px-8 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-md py-3 sm:py-3 text-base sm:text-lg">
                  Qidirish
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Mobile Filter Toggle Button */}
          <div className="lg:hidden">
            <Button 
              variant="outline" 
              className="w-full justify-between items-center bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-black dark:text-white"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Filtrlar
              </span>
              <span>{showMobileFilters ? '▲' : '▼'}</span>
            </Button>
          </div>

          {/* Filters Sidebar - Responsive */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block space-y-8 bg-white lg:bg-transparent dark:bg-gray-900 lg:dark:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none border lg:border-none border-gray-100 dark:border-gray-800 shadow-sm lg:shadow-none`}>
            <div className="space-y-6">
              <h3 className="font-bold text-black dark:text-white text-lg">Filtrlar</h3>
              
              <div className="pt-2">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">Ish turi</h4>
                <div className="space-y-3">
                  {Object.values(JobType).map((type) => (
                    <div key={type} className="flex items-center">
                      <input 
                        id={`type-${type}`}
                        type="checkbox"
                        className="h-5 w-5 text-black dark:text-white bg-white dark:bg-black border-gray-300 dark:border-gray-600 rounded-sm focus:ring-black dark:focus:ring-white transition-colors"
                        checked={filters.type.includes(type)}
                        onChange={() => handleTypeChange(type)}
                      />
                      <label htmlFor={`type-${type}`} className="ml-3 text-gray-700 dark:text-gray-300 select-none cursor-pointer">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Maosh</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input name="salary" type="radio" className="h-4 w-4 text-black dark:text-white border-gray-300 dark:border-gray-600 focus:ring-black dark:focus:ring-white dark:bg-black" />
                    <label className="ml-3 text-gray-700 dark:text-gray-300">Ko'rsatilmagan</label>
                  </div>
                  <div className="flex items-center">
                    <input name="salary" type="radio" className="h-4 w-4 text-black dark:text-white border-gray-300 dark:border-gray-600 focus:ring-black dark:focus:ring-white dark:bg-black" />
                    <label className="ml-3 text-gray-700 dark:text-gray-300">5 mln dan yuqori</label>
                  </div>
                  <div className="flex items-center">
                    <input name="salary" type="radio" className="h-4 w-4 text-black dark:text-white border-gray-300 dark:border-gray-600 focus:ring-black dark:focus:ring-white dark:bg-black" />
                    <label className="ml-3 text-gray-700 dark:text-gray-300">10 mln dan yuqori</label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Promo box removed */}
          </div>

          {/* Job List */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-6 sm:mb-8 gap-2 sm:gap-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white transition-colors">
                {role === UserRole.SEEKER ? "So'nggi vakansiyalar" : "Top nomzodlar"}
              </h2>
              <span className="text-gray-500 dark:text-gray-400 font-medium text-sm sm:text-base">{filteredJobs.length} ta natija</span>
            </div>

            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} onClick={() => console.log('Job clicked', job.id)} />
                ))
              ) : (
                <div className="text-center py-12 sm:py-20 bg-gray-50 dark:bg-gray-900 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                  <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900 dark:text-white">Natija topilmadi</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Qidiruv so'zlarini o'zgartirib ko'ring.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <PostJobModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onPost={handlePostJob} 
      />

      {/* Simple Footer */}
      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-10 sm:py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white tracking-wider uppercase mb-4 sm:mb-6">Sof Kadr</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li><a href="#" className="text-sm sm:text-base text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Biz haqimizda</a></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white tracking-wider uppercase mb-4 sm:mb-6">Nomzodlarga</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li><a href="#" className="text-sm sm:text-base text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Vakansiyalar</a></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Kompaniyalar</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white tracking-wider uppercase mb-4 sm:mb-6">Ish beruvchilarga</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li><a href="#" className="text-sm sm:text-base text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">E'lon joylash</a></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Narxlar</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-black dark:text-white tracking-wider uppercase mb-4 sm:mb-6">Yordam</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li><a href="#" className="text-sm sm:text-base text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Qo'llab-quvvatlash</a></li>
                <li><a href="#" className="text-sm sm:text-base text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Kontaktlar</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 sm:mt-16 border-t border-gray-100 dark:border-gray-800 pt-8 text-center">
            <p className="text-sm sm:text-base text-gray-400">&copy; 2024 Sof Kadr. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}