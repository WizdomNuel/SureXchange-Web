
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Sun, Moon, User, LogOut } from 'lucide-react';
import { NAV_ITEMS, WHATSAPP_LINK } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkState = !isDark;
    setIsDark(newDarkState);
    if (newDarkState) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = async () => {
    await signOut();
    setShowProfileMenu(false);
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0B132B]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-[#0B132B] dark:bg-[#007BFF] rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                 <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 32V20M20 32V12M32 32V8" stroke="#007BFF" strokeWidth="4" strokeLinecap="round" className="dark:stroke-[#0B132B]"/>
                  <path d="M4 28C10 28 15 22 15 12C15 8 18 5 22 5C28 5 32 10 32 18" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M30 14L34 18L38 14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#0B132B] dark:text-white tracking-tight">SureXchange</span>
                <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest -mt-1">Exchange Made Friendly</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-semibold transition-colors ${
                    isActive(item.path) ? 'text-[#007BFF]' : 'text-gray-600 dark:text-gray-300 hover:text-[#007BFF]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-[#007BFF] transition-colors"
                aria-label="Toggle Theme"
              >
                {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-3 bg-gray-100 dark:bg-white/10 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30"
                  >
                    <div className="w-8 h-8 bg-[#007BFF] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-[#0B132B] dark:text-white truncate max-w-[100px]">{user.email?.split('@')[0]}</span>
                  </button>

                  {showProfileMenu && (
                    <>
                      <div className="fixed inset-0 z-0" onClick={() => setShowProfileMenu(false)}></div>
                      <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#1C2541] rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 p-2 animate-in slide-in-from-top-2 duration-200 z-10">
                        <Link 
                          to="/profile" 
                          onClick={() => setShowProfileMenu(false)}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile Settings</span>
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-[#007BFF] text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center space-x-2 hover:bg-[#0069d9] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-200"
                >
                  <span>Sign In</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
              >
                {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-[#007BFF] hover:bg-blue-50 dark:hover:bg-white/5 transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-[#0B132B] border-b border-gray-100 dark:border-white/10 animate-in slide-in-from-top duration-300">
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 rounded-md text-base font-semibold ${
                    isActive(item.path) ? 'bg-blue-50 dark:bg-white/5 text-[#007BFF]' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                {user ? (
                  <>
                    <Link 
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-blue-50 dark:bg-white/5 text-[#007BFF] px-6 py-4 rounded-xl text-center font-bold"
                    >
                      My Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full bg-red-500 text-white px-6 py-4 rounded-xl text-center font-bold"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { setIsOpen(false); setIsAuthModalOpen(true); }}
                    className="w-full bg-[#007BFF] text-white px-6 py-4 rounded-xl text-center font-bold shadow-lg"
                  >
                    Sign In
                  </button>
                )}
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full border-2 border-[#007BFF] text-[#007BFF] px-6 py-4 rounded-xl text-center font-bold flex items-center justify-center space-x-2"
                >
                  <span>WhatsApp Support</span>
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
