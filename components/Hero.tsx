import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { CITIES } from '../constants';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  location: string;
  setLocation: (loc: string) => void;
  onSearch: () => void;
}

const Hero: React.FC<HeroProps> = ({ searchQuery, setSearchQuery, location, setLocation, onSearch }) => {
  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Orzuingizdagi ishni toping
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          O'zbekistonning eng yaxshi kompaniyalaridan minglab vakansiyalar bir joyda.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-3 bg-white dark:bg-gray-900 p-2 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
          {/* Keyword Input */}
          <div className="relative flex-grow group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border-none rounded-xl bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 focus:bg-gray-50 dark:focus:bg-gray-800 transition-all outline-none"
              placeholder="Ish nomi, kompaniya yoki kalit so'zlar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="w-px bg-gray-200 dark:bg-gray-700 hidden md:block my-2"></div>

          {/* Location Dropdown */}
          <div className="relative md:w-1/4 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
            </div>
            <select
              className="block w-full pl-10 pr-10 py-3 border-none rounded-xl bg-transparent text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 focus:bg-gray-50 dark:focus:bg-gray-800 transition-all outline-none appearance-none cursor-pointer"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="" disabled>Hudud</option>
              {CITIES.map((city) => (
                <option key={city} value={city} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button 
            onClick={onSearch}
            className="md:w-auto px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-md"
          >
            Qidirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;