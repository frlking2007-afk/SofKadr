import React, { useState } from 'react';
import { Menu, X, Moon, Sun, Briefcase, UserCircle } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  onPostJob: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, userRole, setUserRole, onPostJob }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleRole = () => {
    setUserRole(userRole === UserRole.SEEKER ? UserRole.EMPLOYER : UserRole.SEEKER);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="bg-black dark:bg-white text-white dark:text-black p-1.5 rounded-lg">
              <Briefcase size={20} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              Sof Kadr
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
              Ish qidirish
            </a>
            <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
              Biz haqimizda
            </a>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

            {/* Role Switcher */}
            <button
              onClick={toggleRole}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              {userRole === UserRole.SEEKER ? 'Ish izlovchi' : 'Ish beruvchi'}
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Action Buttons */}
            {userRole === UserRole.EMPLOYER ? (
              <button 
                onClick={onPostJob}
                className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                E'lon berish
              </button>
            ) : (
               <button className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white">
                <UserCircle size={20} />
                Kirish
              </button>
            )}
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
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
              Ish qidirish
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
              Biz haqimizda
            </a>
            
            <div className="border-t border-gray-200 dark:border-gray-800 my-2 pt-2">
               <button
                onClick={() => {
                  toggleRole();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Rejim: {userRole === UserRole.SEEKER ? 'Ish izlovchi' : 'Ish beruvchi'}
              </button>
            </div>

            {userRole === UserRole.EMPLOYER && (
              <button 
                onClick={() => {
                  onPostJob();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full mt-4 bg-black dark:bg-white text-white dark:text-black px-4 py-3 rounded-lg text-base font-medium text-center"
              >
                E'lon berish
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;