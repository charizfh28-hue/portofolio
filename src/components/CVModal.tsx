import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Printer, Download, Mail, Phone, MapPin, Briefcase, GraduationCap, CheckCircle, ExternalLink, FileText, Eye, Layout } from 'lucide-react';
import { ProfileData, Experience, Skill } from '../types';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  experiences: Experience[];
  skills: Skill[];
}

export const CVModal: React.FC<CVModalProps> = ({
  isOpen,
  onClose,
  profile,
  experiences,
  skills,
}) => {
  const [viewTab, setViewTab] = useState<'ringkas' | 'drive'>('ringkas');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getDriveEmbedUrl = (url?: string) => {
    if (!url) return null;
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    if (url.includes('drive.google.com')) {
      return url.replace(/\/view(\?.*)?$/, '/preview');
    }
    return url;
  };

  const getDriveViewUrl = (url?: string) => {
    if (!url) return '#';
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/file/d/${match[1]}/view?usp=sharing`;
    }
    return url;
  };

  const embedDriveUrl = getDriveEmbedUrl(profile.cvDriveUrl);
  const directDriveUrl = getDriveViewUrl(profile.cvDriveUrl);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
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
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto"
        >
          {/* Action Header */}
          <div className="p-4 sm:p-5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                Curriculum Vitae (CV) - {profile.name}
              </span>
            </div>

            {/* View Tab Switcher */}
            <div className="flex items-center p-1 bg-slate-200 dark:bg-slate-800 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setViewTab('ringkas')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewTab === 'ringkas'
                    ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Layout className="w-3.5 h-3.5" />
                <span>Format Ringkas</span>
              </button>

              <button
                onClick={() => setViewTab('drive')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                  viewTab === 'drive'
                    ? 'bg-[#527a3a] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Document Google Drive</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {profile.cvDriveUrl && (
                <a
                  href={directDriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-semibold text-xs hover:bg-indigo-500/20 transition-colors flex items-center gap-1.5"
                  title="Buka langsung di tab Google Drive"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Google Drive</span>
                </a>
              )}

              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-sm hover:bg-cyan-600 transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / PDF</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-rose-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          {viewTab === 'ringkas' ? (
            /* Printable / Compact CV Layout */
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 print:p-0 print:overflow-visible">
              {/* Header */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-cyan-500 shadow-md shrink-0"
                  />
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {profile.name}
                    </h1>
                    <p className="text-cyan-600 dark:text-cyan-400 font-bold text-base mt-0.5">
                      {profile.title}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl italic">
                      "{profile.bio}"
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 shrink-0 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>

              {/* Grid 2 Columns - Personal Data & CV Content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Column: Data Diri & Kontak & Sosial Media */}
                <div className="md:col-span-4 space-y-6 bg-slate-50/70 dark:bg-slate-950/70 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
                  {/* Data Diri */}
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-3 pb-1 border-b border-cyan-500/30">
                      Data Diri
                    </h3>
                    <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tempat / Tanggal Lahir</span>
                        <span className="font-semibold">{profile.birthPlaceDate || 'Gresik, 28/12/2008'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Jenis Kelamin</span>
                        <span className="font-semibold">{profile.gender || 'Laki-Laki'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Status</span>
                        <span className="font-semibold">{profile.maritalStatus || 'Belum Menikah'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Kewarganegaraan</span>
                        <span className="font-semibold">{profile.nationality || 'Indonesia'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sosial Media */}
                  <div>
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-3 pb-1 border-b border-cyan-500/30">
                      Sosial Media
                    </h3>
                    <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-400">Ig:</span>
                        <span>{profile.instagram || '@chrissssjh'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-400">Tiktok:</span>
                        <span>{profile.tiktok || '@chriz_1228'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Tentang Saya, Pengalaman Magang, Pendidikan, Kemampuan */}
                <div className="md:col-span-8 space-y-6">
                  {/* Tentang Saya */}
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2 pb-1 border-b border-slate-200 dark:border-slate-800">
                      Tentang Saya
                    </h2>
                    {profile.aboutText.map((text, i) => (
                      <p key={i} className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                        {text}
                      </p>
                    ))}
                  </div>

                  {/* Pengalaman Magang */}
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-3 pb-1 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-cyan-500" />
                      <span>Pengalaman Magang</span>
                    </h2>

                    <div className="space-y-4">
                      {experiences
                        .filter((e) => e.type === 'work')
                        .map((exp) => (
                          <div key={exp.id} className="border-l-2 border-cyan-500 pl-3 py-1">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                              <span>{exp.company}</span>
                              <span className="text-slate-500">{exp.period}</span>
                            </div>
                            <div className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 mb-1">
                              {exp.role}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                              {exp.description}
                            </p>
                            <ul className="space-y-1">
                              {exp.achievements.map((ach, idx) => (
                                <li key={idx} className="text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                                  <CheckCircle className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                                  <span>{ach}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Pendidikan */}
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-3 pb-1 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-indigo-500" />
                      <span>Pendidikan</span>
                    </h2>

                    <div className="space-y-2">
                      {experiences
                        .filter((e) => e.type === 'education')
                        .map((edu) => (
                          <div key={edu.id} className="flex items-center justify-between text-xs border-l-2 border-indigo-500 pl-3 py-1">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {edu.company}
                            </span>
                            <span className="text-slate-500 font-semibold">{edu.period}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Kemampuan */}
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2 pb-1 border-b border-slate-200 dark:border-slate-800">
                      Kemampuan Utama
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {skills.map((skill) => (
                        <li key={skill.id} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                          <span>{skill.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Google Drive Document Viewer Embed */
            <div className="p-4 sm:p-6 overflow-y-auto flex flex-col flex-1 gap-4">
              <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <FileText className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span>
                    Pratinjau File CV Asli dari Google Drive (PDF / Dokumentasi).
                  </span>
                </div>

                {profile.cvDriveUrl && (
                  <a
                    href={directDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Buka Google Drive</span>
                  </a>
                )}
              </div>

              {profile.cvDriveUrl && embedDriveUrl ? (
                <div className="w-full h-[65vh] min-h-[450px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-inner relative">
                  <iframe
                    src={embedDriveUrl}
                    className="w-full h-full border-0"
                    title={`Pratinjau CV Google Drive - ${profile.name}`}
                    allow="autoplay"
                  />
                </div>
              ) : (
                <div className="p-12 text-center my-auto space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 flex items-center justify-center mx-auto">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Link Google Drive Belum Diatur
                    </h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                      Silakan buka <strong>Panel Admin</strong> &gt; Tab <strong>Tentang & CV Diri</strong>, lalu masukkan link shareable Google Drive file CV Anda.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
