import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Github,
  Calendar,
  CheckCircle2,
  Tag,
  Sparkles,
} from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
        >
          {/* Header Bar */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
            <img
              src={project.image}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-slate-950/80" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-[#a32b31] transition-colors border border-slate-700"
              aria-label="Tutup Detail Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Tag in Banner */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#527a3a]/25 border border-[#527a3a]/50 text-[#95be78] text-xs font-semibold uppercase tracking-wider">
                  {project.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-full border border-slate-800">
                  <Calendar className="w-3 h-3 text-[#95be78]" />
                  <span>{project.completionDate}</span>
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Body Content Scrollable */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Deskripsi Proyek
              </h4>
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Key Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#95be78]" />
                  <span>Fitur Utama & Keunggulan:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.highlights.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#527a3a] dark:text-[#95be78] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#a32b31]" />
                <span>Teknologi Digunakan:</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" />
              <span>Source Code</span>
            </a>

            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#527a3a] hover:bg-[#43662f] text-white font-semibold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
