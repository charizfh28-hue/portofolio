import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, ShieldCheck, FileText } from 'lucide-react';
import { ThemeMode, ProfileData } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  toggleTheme: () => void;
  profile: ProfileData;
  onOpenCV: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  profile,
  onOpenCV,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Beranda', href: '#home', id: 'home' },
    { label: 'Tentang Saya', href: '#about', id: 'about' },
    { label: 'Keahlian', href: '#skills', id: 'skills' },
    { label: 'Proyek', href: '#projects', id: 'projects' },
    { label: 'Kontak', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section detection
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 dark:bg-slate-950/85 bg-white/85 backdrop-blur-md shadow-lg shadow-black/5 border-b border-slate-800/50 dark:border-slate-800/60'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#527a3a] hover:bg-[#43662f] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-all">
              {profile.nickname.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white group-hover:text-[#527a3a] dark:group-hover:text-[#95be78] transition-colors">
                {profile.nickname}
                <span className="text-[#a32b31] font-black">.dev</span>
              </span>
              <span className="text-[10px] font-medium tracking-wide text-slate-500 dark:text-slate-400 uppercase">
                Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-[#527a3a] rounded-full shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#527a3a] dark:hover:text-[#95be78] hover:border-[#527a3a]/40 transition-all shadow-sm"
              title={theme === 'dark' ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Resume Button */}
            <button
              onClick={onOpenCV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:border-[#527a3a]/50 hover:text-[#527a3a] dark:hover:text-[#95be78] transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#527a3a] dark:text-[#95be78]" />
              <span>Lihat CV</span>
            </button>

            {/* Admin Panel Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#527a3a] hover:bg-[#43662f] text-white text-xs font-semibold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#95be78]" />
              <span>Panel Admin</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme Mobile"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open Menu"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-[#527a3a]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-2xl px-4 pt-2 pb-6"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-[#527a3a]/15 text-[#527a3a] dark:text-[#95be78] font-semibold border-l-4 border-[#527a3a]'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                );
              })}

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCV();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium text-sm border border-slate-200 dark:border-slate-800"
                >
                  <FileText className="w-4 h-4 text-[#527a3a] dark:text-[#95be78]" />
                  <span>Lihat CV Lengkap</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#527a3a] text-white font-medium text-sm shadow-md"
                >
                  <ShieldCheck className="w-4 h-4 text-[#95be78]" />
                  <span>Panel Admin Web</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
