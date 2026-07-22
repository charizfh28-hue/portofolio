import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ProfileData, Experience } from '../types';

interface AboutProps {
  profile: ProfileData;
  experiences: Experience[];
}

export const About: React.FC<AboutProps> = ({ profile, experiences }) => {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  const filteredTimeline = experiences.filter((item) => item.type === activeTab);

  return (
    <section id="about" className="py-20 relative bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#527a3a]/15 border border-[#527a3a]/30 text-[#527a3a] dark:text-[#95be78] text-xs font-semibold mb-3">
            <User className="w-3.5 h-3.5" />
            <span>Mengenal Lebih Dekat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tentang Saya
          </h2>
          <div className="w-16 h-1 bg-[#527a3a] mx-auto mt-4 rounded-full" />
        </div>

        {/* Bio & Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Decorative Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 shadow-xl group">
              <img
                src={profile.avatarUrl}
                alt="Profile About"
                referrerPolicy="no-referrer"
                className="w-full h-[420px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/80 rounded-2xl flex flex-col justify-end p-6">
                <div className="text-white font-bold text-xl">{profile.name}</div>
                <div className="text-[#95be78] text-xs font-medium">{profile.title}</div>
                <div className="text-slate-300 text-xs mt-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#95be78]" />
                  <span>Membangun antarmuka web berkualitas tinggi</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Bio Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Satu Langkah Lebih Dekat dengan Dedikasi & Passion Saya di Dunia Teknologi
            </h3>

            {profile.aboutText.map((paragraph, index) => (
              <p
                key={index}
                className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base"
              >
                {paragraph}
              </p>
            ))}

            {/* Interest Tags */}
            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#a32b31]" />
                <span>Minat & Fokus Pengembangan:</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium shadow-sm hover:border-[#527a3a] hover:text-[#527a3a] dark:hover:text-[#95be78] transition-colors"
                  >
                    #{interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline Tabs Section (Pengalaman & Pendidikan) */}
        <div className="mt-12 bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-10 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Pengalaman & Latar Belakang
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Perjalanan profesional dan riwayat pendidikan formal saya
              </p>
            </div>

            {/* Tab Buttons */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveTab('work')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'work'
                    ? 'bg-[#527a3a] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Pengalaman Kerja</span>
              </button>

              <button
                onClick={() => setActiveTab('education')}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'education'
                    ? 'bg-[#527a3a] text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Pendidikan</span>
              </button>
            </div>
          </div>

          {/* Timeline List */}
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-8">
            {filteredTimeline.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Bullet Icon */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border-2 border-[#527a3a] flex items-center justify-center text-[#527a3a] dark:text-[#95be78] shadow-md group-hover:scale-110 transition-transform">
                  {item.type === 'work' ? (
                    <Briefcase className="w-4 h-4" />
                  ) : (
                    <GraduationCap className="w-4 h-4" />
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#527a3a] dark:group-hover:text-[#95be78] transition-colors">
                    {item.role}
                  </h4>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#527a3a]/15 border border-[#527a3a]/30 text-[#527a3a] dark:text-[#95be78] text-xs font-semibold">
                    <Calendar className="w-3 h-3" />
                    <span>{item.period}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#a32b31] mb-3">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{item.company}</span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                {item.achievements.length > 0 && (
                  <ul className="space-y-1.5">
                    {item.achievements.map((ach, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#527a3a] dark:text-[#95be78] mt-0.5 shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
