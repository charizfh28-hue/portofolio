import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FolderGit2,
  ExternalLink,
  Github,
  Eye,
  Sparkles,
  Layers,
  Globe,
  Smartphone,
  Layout,
  Star,
} from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Proyek', icon: <Layers className="w-4 h-4" /> },
    { id: 'web', label: 'Web Application', icon: <Globe className="w-4 h-4" /> },
    { id: 'fullstack', label: 'Full Stack App', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'uiux', label: 'UI/UX & Design', icon: <Layout className="w-4 h-4" /> },
  ];

  const filteredProjects = projects.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  return (
    <section id="projects" className="py-20 relative bg-slate-50/50 dark:bg-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#527a3a]/15 border border-[#527a3a]/30 text-[#527a3a] dark:text-[#95be78] text-xs font-semibold mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portofolio & Hasil Karya</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Proyek Pilihan
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Kumpulan proyek terbaru yang telah saya rancang dan kembangkan
          </p>
          <div className="w-16 h-1 bg-[#527a3a] mx-auto mt-4 rounded-full" />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#527a3a] text-white shadow-lg shadow-[#527a3a]/20'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#527a3a]/40'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#527a3a]/40 transition-all group"
            >
              {/* Project Image & Overlay */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/70 opacity-40 group-hover:opacity-70 transition-opacity" />

                {/* Featured Star Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#a32b31]/25 border border-[#a32b31]/50 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-white" />
                    <span>Unggulan</span>
                  </div>
                )}

                {/* Hover Quick Actions */}
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="p-3 rounded-2xl bg-[#527a3a] hover:bg-[#43662f] text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:scale-110 transition-transform"
                    title="Lihat Detail Proyek"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Detail</span>
                  </button>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl bg-white text-slate-900 font-semibold text-xs flex items-center gap-1.5 shadow-lg hover:scale-110 transition-transform"
                    title="Buka Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Demo</span>
                  </a>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-lg group-hover:text-[#527a3a] dark:group-hover:text-[#95be78] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 text-slate-400 text-[10px] font-medium">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-xs font-bold text-[#527a3a] dark:text-[#95be78] hover:underline flex items-center gap-1"
                    >
                      <span>Lihat Detail</span>
                      <Eye className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-[#527a3a] transition-colors"
                        title="Source Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-[#527a3a]/15 border border-[#527a3a]/30 text-[#527a3a] dark:text-[#95be78] hover:bg-[#527a3a] hover:text-white transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
