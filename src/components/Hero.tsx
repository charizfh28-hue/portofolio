import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Send,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Code2,
  Sparkles,
  Download,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { ProfileData } from '../types';

interface HeroProps {
  profile: ProfileData;
  onOpenCV: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onOpenCV }) => {
  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'twitter':
      case 'x':
        return <Twitter className="w-5 h-5" />;
      default:
        return <Code2 className="w-5 h-5" />;
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background Decor Lights - Solid blur without gradients */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#527a3a]/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#95be78]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Available Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#527a3a]/15 border border-[#527a3a]/40 text-[#527a3a] dark:text-[#95be78] text-xs font-semibold mb-6 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#95be78] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#527a3a]"></span>
              </span>
              <span>{profile.availableForHire ? 'Tersedia untuk Freelance & Full-time' : 'Proyek Berjalan'}</span>
            </div>

            {/* Greeting & Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4">
              Halo, Saya <br className="hidden sm:inline" />
              <span className="text-[#527a3a] dark:text-[#95be78]">
                {profile.name}
              </span>
            </h1>

            {/* Role / Profession Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-6 text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-300">
              <span className="text-[#a32b31] font-mono">&lt;</span>
              <span>{profile.title}</span>
              <span className="text-[#a32b31] font-mono">/&gt;</span>
            </div>

            {/* Bio Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8 max-w-2xl">
              {profile.bio}
            </p>

            {/* Location & Quick Info */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#527a3a] dark:text-[#95be78]" />
                <span>{profile.location}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#527a3a] dark:text-[#95be78]" />
                <span>Pengalaman 3+ Tahun</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => scrollToSection('projects')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#527a3a] hover:bg-[#43662f] text-white font-semibold text-sm shadow-lg shadow-[#527a3a]/25 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                <span>Lihat Proyek Saya</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 hover:border-[#527a3a]/50 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#a32b31]" />
                <span>Hubungi Saya</span>
              </button>

              <button
                onClick={onOpenCV}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-transparent text-slate-600 dark:text-slate-400 font-semibold text-sm hover:text-[#527a3a] dark:hover:text-[#95be78] flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Unduh CV</span>
              </button>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-2">
                Sosial Media:
              </span>
              {profile.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-[#527a3a] dark:hover:text-[#95be78] hover:border-[#527a3a]/50 hover:scale-110 transition-all shadow-sm"
                  aria-label={social.name}
                  title={social.name}
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Avatar Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Outer accent frame */}
              <div className="absolute -inset-1.5 bg-[#527a3a] rounded-[2rem] opacity-40 blur-sm" />

              {/* Main Avatar Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-[#527a3a] bg-slate-900 shadow-2xl group">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay Badge - Floating Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#527a3a]/30 text-[#95be78]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Focus Utama</div>
                      <div className="text-[11px] text-slate-400">Procurement & Dev</div>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-[#527a3a]/25 border border-[#527a3a]/50 text-[#95be78] text-[10px] font-bold uppercase tracking-wider">
                    Ready
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlight Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {profile.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm shadow-sm hover:border-[#527a3a]/50 transition-all text-center group"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-[#527a3a] dark:text-[#95be78] mb-1 group-hover:scale-105 transition-transform">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
