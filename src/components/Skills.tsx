import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Server,
  Database,
  Wrench,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  CheckCircle,
  FileCode2,
  Palette,
  Globe,
  Braces,
  Layout,
  Layers,
  Webhook,
  Cpu,
  HardDrive,
  Flame,
  GitBranch,
  Figma,
  Zap,
  Box,
} from 'lucide-react';
import { Skill } from '../types';

interface SkillsProps {
  skills: Skill[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'card' | 'compact'>('card');

  const categories = [
    { id: 'all', label: 'Semua Skill', icon: <Code2 className="w-4 h-4" /> },
    { id: 'frontend', label: 'Frontend', icon: <Code2 className="w-4 h-4" /> },
    { id: 'backend', label: 'Backend', icon: <Server className="w-4 h-4" /> },
    { id: 'database', label: 'Database', icon: <Database className="w-4 h-4" /> },
    { id: 'tools', label: 'Tools & DevOps', icon: <Wrench className="w-4 h-4" /> },
  ];

  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'FileCode2':
        return <FileCode2 className="w-5 h-5 text-blue-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-teal-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-slate-300" />;
      case 'Braces':
        return <Braces className="w-5 h-5 text-yellow-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-orange-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-green-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'Webhook':
        return <Webhook className="w-5 h-5 text-sky-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-300" />;
      case 'Database':
        return <Database className="w-5 h-5 text-sky-400" />;
      case 'HardDrive':
        return <HardDrive className="w-5 h-5 text-emerald-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-orange-500" />;
      case 'Figma':
        return <Figma className="w-5 h-5 text-purple-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-violet-400" />;
      case 'Box':
        return <Box className="w-5 h-5 text-blue-500" />;
      default:
        return <Code2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#527a3a]/15 border border-[#527a3a]/30 text-[#527a3a] dark:text-[#95be78] text-xs font-semibold mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Keahlian Teknis</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skill & Spesialisasi
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Teknologi dan alat yang biasa saya gunakan untuk membangun aplikasi skala produksi
          </p>
          <div className="w-16 h-1 bg-[#527a3a] mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-white/60 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm shadow-sm">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#527a3a] text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Search & View Mode Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="relative w-full md:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#527a3a]"
              />
            </div>

            <div className="flex items-center bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
              <button
                onClick={() => setViewMode('card')}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  viewMode === 'card'
                    ? 'bg-[#527a3a] text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Tampilan Progress Card"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  viewMode === 'compact'
                    ? 'bg-[#527a3a] text-white'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Tampilan Badge Ringkas"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 text-sm">Tidak ada skill yang cocok dengan kriteria pencarian.</p>
          </div>
        ) : viewMode === 'card' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-[#527a3a]/50 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 group-hover:scale-110 transition-transform">
                      {getSkillIcon(skill.iconName)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {skill.experienceYears} pengalaman
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#527a3a] dark:text-[#95be78] bg-[#527a3a]/15 px-2.5 py-1 rounded-lg">
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-950 rounded-full h-2 overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-800/50">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-[#527a3a] rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Compact Badge View */
          <div className="flex flex-wrap gap-3">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#527a3a]/50 hover:shadow-md transition-all group"
              >
                {getSkillIcon(skill.iconName)}
                <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                  {skill.name}
                </span>
                <span className="text-[10px] font-bold text-[#527a3a] dark:text-[#95be78] bg-[#527a3a]/15 px-2 py-0.5 rounded-full">
                  {skill.level}%
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
