import React, { useState } from 'react';
import { Menu, X, Moon, Sun, Briefcase, UserCircle } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onPostJob: () => void;
  onNavigate: (page: 'home' | 'about') => void;
  currentPage: 'home' | 'about';
}

const Navbar: React.FC<NavbarProps> = ({ 
  darkMode, 
  toggleDarkMode, 
  userRole, 
  setUserRole, 
  onPostJob,
  onNavigate,
  currentPage
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-black dark:bg-white text-white dark:text-black p-1.5 rounded-lg">
              <Briefcase size={20} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              Sof Kadr
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
            >
              Ish qidirish
            </button>
            <button 
              onClick={() => onNavigate('about')}
              className={`text-sm font-medium transition-colors ${currentPage === 'about' ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
            >
              Biz haqimizda
            </button>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            {/* Role Switcher - Segmented Control */}
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setUserRole(UserRole.SEEKER)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  userRole === UserRole.SEEKER
                    ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Ish izlash
              </button>
              <button
                onClick={() => setUserRole(UserRole.EMPLOYER)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  userRole === UserRole.EMPLOYER
                    ? 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Ishchi topish
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <UserCircle size={20} />
                Kirish
              </button>
              
              {userRole === UserRole.EMPLOYER && (
                <button 
                  onClick={onPostJob}
                  className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  E'lon berish
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
             <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <button 
              onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 ${currentPage === 'home' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}
            >
              Ish qidirish
            </button>
            <button 
              onClick={() => { onNavigate('about'); setIsMobileMenuOpen(false); }}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-800 ${currentPage === 'about' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}
            >
              Biz haqimizda
            </button>
            
            <div className="border-t border-gray-200 dark:border-gray-800 my-2 pt-4">
              <p className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                Rejimni tanlang
              </p>
              <div className="grid grid-cols-2 gap-3 px-3">
                 <button
                  onClick={() => {
                    setUserRole(UserRole.SEEKER);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-center transition-all border ${
                    userRole === UserRole.SEEKER
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  Ish izlash
                </button>
                <button
                  onClick={() => {
                    setUserRole(UserRole.EMPLOYER);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-center transition-all border ${
                    userRole === UserRole.EMPLOYER
                      ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                  }`}
                >
                   Ishchi topish
                </button>
              </div>
            </div>

            <div className="px-3 mt-4 space-y-3">
               <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                <UserCircle size={20} />
                Kirish
              </button>

              {userRole === UserRole.EMPLOYER && (
                <button 
                  onClick={() => {
                    onPostJob();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-black dark:bg-white text-white dark:text-black px-4 py-3 rounded-lg text-base font-medium text-center hover:opacity-90"
                >
                  E'lon berish
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;