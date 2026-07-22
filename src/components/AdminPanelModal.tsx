import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  Unlock,
  KeyRound,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Plus,
  Trash2,
  Save,
  RotateCcw,
  LogOut,
  Code2,
  FolderPlus,
  Eye,
  EyeOff,
  CheckCircle,
  ShieldCheck,
  Building2,
  Calendar,
  Globe,
  Tag,
  ExternalLink,
  FileText,
  Link2,
  Upload,
  Camera,
  Image as ImageIcon
} from 'lucide-react';
import { ProfileData, Skill, Project, Experience, SocialLink } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  onSaveProfile: (updated: ProfileData) => void;
  onSaveSkills: (updated: Skill[]) => void;
  onSaveProjects: (updated: Project[]) => void;
  onSaveExperiences: (updated: Experience[]) => void;
  onResetAll: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  profile,
  skills,
  projects,
  experiences,
  onSaveProfile,
  onSaveSkills,
  onSaveProjects,
  onSaveExperiences,
  onResetAll,
}) => {
  // Admin Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [adminPin, setAdminPin] = useState<string>('123456');
  const [authError, setAuthError] = useState<string>('');
  const [showPin, setShowPin] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'about' | 'experience' | 'skills' | 'projects' | 'security'>('profile');

  // Form local state copies
  const [profileForm, setProfileForm] = useState<ProfileData>({ ...profile });
  const [skillsForm, setSkillsForm] = useState<Skill[]>([...skills]);
  const [projectsForm, setProjectsForm] = useState<Project[]>([...projects]);
  const [experiencesForm, setExperiencesForm] = useState<Experience[]>([...experiences]);

  // Security New PIN
  const [newPin, setNewPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [securitySuccess, setSecuritySuccess] = useState<string>('');

  // Sync state when props change or modal opens
  useEffect(() => {
    setProfileForm({ ...profile });
    setSkillsForm([...skills]);
    setProjectsForm([...projects]);
    setExperiencesForm([...experiences]);

    const savedPin = localStorage.getItem('admin_portfolio_pin');
    if (savedPin) {
      setAdminPin(savedPin);
    }
  }, [isOpen, profile, skills, projects, experiences]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === adminPin) {
      setIsAuthenticated(true);
      setAuthError('');
      setPinInput('');
    } else {
      setAuthError('Kata sandi / PIN Admin salah! Silakan coba lagi (Default: 123456)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPinInput('');
  };

  const handleSaveAll = () => {
    onSaveProfile(profileForm);
    onSaveSkills(skillsForm);
    onSaveProjects(projectsForm);
    onSaveExperiences(experiencesForm);
    onClose();
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin || newPin.length < 4) {
      setSecuritySuccess('PIN minimal 4 karakter!');
      return;
    }
    if (newPin !== confirmPin) {
      setSecuritySuccess('Konfirmasi PIN tidak cocok!');
      return;
    }
    setAdminPin(newPin);
    localStorage.setItem('admin_portfolio_pin', newPin);
    setSecuritySuccess('Kata sandi Admin berhasil diperbarui!');
    setNewPin('');
    setConfirmPin('');
    setTimeout(() => setSecuritySuccess(''), 4000);
  };

  // Helper CRUD Skill
  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: 'Skill Baru',
      category: 'tools',
      level: 80,
      iconName: 'Code2',
      experienceYears: 'Aktif',
      color: 'text-cyan-400'
    };
    setSkillsForm([...skillsForm, newSkill]);
  };

  const handleDeleteSkill = (id: string) => {
    setSkillsForm(skillsForm.filter(s => s.id !== id));
  };

  // Helper CRUD Experience
  const handleAddExperience = (type: 'work' | 'education') => {
    const newExp: Experience = {
      id: Date.now().toString(),
      role: type === 'work' ? 'Posisi / Jabatan Baru' : 'Siswa / Mahasiswa',
      company: type === 'work' ? 'Nama Perusahaan' : 'Nama Sekolah / Kampus',
      period: '2024 - Sekarang',
      description: 'Deskripsi kegiatan dan tanggung jawab...',
      achievements: ['Prestasi / poin tugas 1'],
      type
    };
    setExperiencesForm([...experiencesForm, newExp]);
  };

  const handleDeleteExperience = (id: string) => {
    setExperiencesForm(experiencesForm.filter(e => e.id !== id));
  };

  // Helper CRUD Project
  const handleAddProject = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      title: 'Judul Proyek Baru',
      description: 'Deskripsi singkat mengenai proyek...',
      longDescription: 'Penjelasan lengkap alur dan fitur proyek...',
      category: 'web',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      tags: ['React', 'Tailwind'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com',
      featured: true,
      completionDate: '2026',
      highlights: ['Fitur unggulan 1', 'Fitur unggulan 2']
    };
    setProjectsForm([...projectsForm, newProj]);
  };

  const handleDeleteProject = (id: string) => {
    setProjectsForm(projectsForm.filter(p => p.id !== id));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto"
        >
          {/* Top Header */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#527a3a] text-white shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold tracking-tight">
                  Panel Admin Portofolio
                </h2>
                <p className="text-xs text-slate-400">
                  {isAuthenticated ? `Terautentikasi — Kelola Semua Konten Web` : `Sistem Terkunci — Masukkan Kata Sandi`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-400 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="Keluar Admin"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Keluar</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isAuthenticated ? (
            /* Authentication Screen */
            <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-[#527a3a]/15 border border-[#527a3a]/30 text-[#95be78] flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Autentikasi Admin
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Masukkan PIN / Kata Sandi Admin untuk mengedit konten beranda web. <br />
                  <span className="text-[#95be78] font-semibold">(Default PIN: 123456)</span>
                </p>
              </div>

              <form onSubmit={handleLogin} className="w-full space-y-4">
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    placeholder="Masukkan PIN / Kata Sandi..."
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full px-4 py-3 pr-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#527a3a]"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {authError && (
                  <p className="text-xs text-rose-500 font-semibold">{authError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#527a3a] hover:bg-[#43662f] text-white font-bold text-sm shadow-lg shadow-[#527a3a]/25 transition-all flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Buka Akses Admin</span>
                </button>
              </form>
            </div>
          ) : (
            /* Admin Dashboard Body */
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Sidebar Navigation */}
              <div className="w-full md:w-64 bg-slate-100 dark:bg-slate-950/80 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-3 sm:p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                    activeTab === 'profile'
                      ? 'bg-[#527a3a] text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Profil & Kontak</span>
                </button>

                <button
                  onClick={() => setActiveTab('about')}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                    activeTab === 'about'
                      ? 'bg-[#527a3a] text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Tentang & CV Diri</span>
                </button>

                <button
                  onClick={() => setActiveTab('experience')}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                    activeTab === 'experience'
                      ? 'bg-[#527a3a] text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Pengalaman & Edukasi</span>
                </button>

                <button
                  onClick={() => setActiveTab('skills')}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                    activeTab === 'skills'
                      ? 'bg-[#527a3a] text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  <span>Keahlian (Skills)</span>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                    activeTab === 'projects'
                      ? 'bg-[#527a3a] text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Proyek Portfolio</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
                    activeTab === 'security'
                      ? 'bg-[#527a3a] text-white shadow-md'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Sandi Admin & Reset</span>
                </button>
              </div>

              {/* Main Tab Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50 dark:bg-slate-900/50">
                {/* Tab 1: Profile & Contact */}
                {activeTab === 'profile' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
                      Informasi Profil Utama & Kontak
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Nama Panggilan / Brand
                        </label>
                        <input
                          type="text"
                          value={profileForm.nickname}
                          onChange={(e) => setProfileForm({ ...profileForm, nickname: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Judul Profesi / Title
                      </label>
                      <input
                        type="text"
                        value={profileForm.title}
                        onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Deskripsi Singkat (Bio Hero)
                      </label>
                      <textarea
                        rows={3}
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Nomor Telepon / WhatsApp
                        </label>
                        <input
                          type="text"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Lokasi Alamat
                        </label>
                        <input
                          type="text"
                          value={profileForm.location}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    {/* Card Khusus Pengaturan Foto Profil Beranda & CV */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 border border-cyan-500/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                            <Camera className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                              <span>Foto Profil Utama (Beranda & CV)</span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                                Beranda Web
                              </span>
                            </h4>
                            <p className="text-xs text-slate-400">
                              Ubah foto Anda yang tampil di kartu utama beranda dan dokumen CV.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        {/* Preview Foto */}
                        <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-cyan-500/60 shadow-lg group mb-2 bg-slate-900">
                            <img
                              src={profileForm.avatarUrl}
                              alt="Preview Foto Profil"
                              className="w-full h-full object-cover object-center"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=500';
                              }}
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-semibold">
                              Pratinjau
                            </div>
                          </div>
                          <span className="text-[11px] text-slate-400 font-mono">Tampilan Beranda</span>
                        </div>

                        {/* Opsi Upload / Link */}
                        <div className="sm:col-span-8 space-y-3">
                          {/* Unggah Berkas */}
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                              <Upload className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Unggah Foto Baru dari Komputer / HP</span>
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    if (reader.result) {
                                      setProfileForm({ ...profileForm, avatarUrl: reader.result as string });
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="block w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-3.5 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-500/30 cursor-pointer bg-slate-950 p-1.5 rounded-xl border border-slate-800"
                            />
                          </div>

                          {/* Link URL Direct */}
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                              <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                              <span>Atau Tempelkan Link URL Gambar / Foto</span>
                            </label>
                            <input
                              type="url"
                              placeholder="https://... link foto"
                              value={profileForm.avatarUrl}
                              onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                            />
                          </div>

                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            💡 Pilih berkas foto dari galeri HP / laptop Anda untuk langsung mengganti foto di beranda secara otomatis.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: About & CV Details */}
                {activeTab === 'about' && (
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800 pb-2">
                      Detail "Tentang Saya" & Data Diri CV
                    </h3>

                    {/* Pengaturan File / Link CV Google Drive */}
                    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-slate-900/50 to-indigo-500/10 border border-cyan-500/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                              <span>Link CV Google Drive (PDF / Doc)</span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                Fitur Google Drive
                              </span>
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              Tempelkan link file CV dari Google Drive agar pengunjung web dapat melihat & mengunduh berkas CV asli milik Anda.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                          URL Shareable Google Drive
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            placeholder="Contoh: https://drive.google.com/file/d/xxxxxx/view?usp=sharing"
                            value={profileForm.cvDriveUrl || ''}
                            onChange={(e) => setProfileForm({ ...profileForm, cvDriveUrl: e.target.value })}
                            className="flex-1 px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 font-mono"
                          />
                          {profileForm.cvDriveUrl && (
                            <a
                              href={profileForm.cvDriveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
                              title="Uji / Buka Link Google Drive"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Uji Link</span>
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        <span className="font-bold text-cyan-500 flex items-center gap-1">
                          💡 Cara Mengambil Link dari Google Drive:
                        </span>
                        <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">
                          <li>Buka <strong>Google Drive</strong> dan upload file CV Anda (PDF/Word).</li>
                          <li>Klik kanan pada file CV &gt; pilih <strong>Bagikan (Share)</strong>.</li>
                          <li>Ubah Akses Umum menjadi <strong>"Siapa saja yang memiliki link" (Anyone with link)</strong>.</li>
                          <li>Klik <strong>Salin Link (Copy Link)</strong> lalu tempel di atas.</li>
                        </ol>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Paragraf "Tentang Saya"
                      </label>
                      {profileForm.aboutText.map((p, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <textarea
                            rows={2}
                            value={p}
                            onChange={(e) => {
                              const updated = [...profileForm.aboutText];
                              updated[idx] = e.target.value;
                              setProfileForm({ ...profileForm, aboutText: updated });
                            }}
                            className="flex-1 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white resize-none"
                          />
                          <button
                            onClick={() => {
                              const updated = profileForm.aboutText.filter((_, i) => i !== idx);
                              setProfileForm({ ...profileForm, aboutText: updated });
                            }}
                            className="p-2 text-rose-500 hover:bg-rose-500/10 rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() =>
                          setProfileForm({
                            ...profileForm,
                            aboutText: [...profileForm.aboutText, 'Paragraf penjelasan baru...']
                          })
                        }
                        className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-500 text-xs font-semibold hover:bg-cyan-500/20 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Paragraf</span>
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-cyan-500 uppercase tracking-wider">
                        Data Diri CV Resmi
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">
                            Tempat / Tanggal Lahir
                          </label>
                          <input
                            type="text"
                            value={profileForm.birthPlaceDate || ''}
                            onChange={(e) => setProfileForm({ ...profileForm, birthPlaceDate: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">
                            Jenis Kelamin
                          </label>
                          <input
                            type="text"
                            value={profileForm.gender || ''}
                            onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">
                            Status
                          </label>
                          <input
                            type="text"
                            value={profileForm.maritalStatus || ''}
                            onChange={(e) => setProfileForm({ ...profileForm, maritalStatus: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">
                            Kewarganegaraan
                          </label>
                          <input
                            type="text"
                            value={profileForm.nationality || ''}
                            onChange={(e) => setProfileForm({ ...profileForm, nationality: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Experience & Education */}
                {activeTab === 'experience' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Pengalaman Kerja / Magang & Pendidikan
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddExperience('work')}
                          className="px-3 py-1.5 rounded-xl bg-cyan-500 text-white text-xs font-semibold shadow-sm hover:bg-cyan-600 flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Magang / Kerja</span>
                        </button>
                        <button
                          onClick={() => handleAddExperience('education')}
                          className="px-3 py-1.5 rounded-xl bg-indigo-500 text-white text-xs font-semibold shadow-sm hover:bg-indigo-600 flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Pendidikan</span>
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {experiencesForm.map((exp, idx) => (
                        <div
                          key={exp.id}
                          className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 relative group"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                              exp.type === 'work' ? 'bg-cyan-500/10 text-cyan-500' : 'bg-indigo-500/10 text-indigo-500'
                            }`}>
                              {exp.type === 'work' ? 'Pengalaman Magang / Kerja' : 'Pendidikan Formal'}
                            </span>

                            <button
                              onClick={() => handleDeleteExperience(exp.id)}
                              className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] text-slate-500 mb-1">
                                Peran / Jabatan
                              </label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => {
                                  const updated = [...experiencesForm];
                                  updated[idx].role = e.target.value;
                                  setExperiencesForm(updated);
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] text-slate-500 mb-1">
                                Nama Instansi / Perusahaan
                              </label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => {
                                  const updated = [...experiencesForm];
                                  updated[idx].company = e.target.value;
                                  setExperiencesForm(updated);
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-500 mb-1">
                              Periode Waktu
                            </label>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => {
                                const updated = [...experiencesForm];
                                updated[idx].period = e.target.value;
                                setExperiencesForm(updated);
                              }}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-500 mb-1">
                              Deskripsi Tugas
                            </label>
                            <textarea
                              rows={2}
                              value={exp.description}
                              onChange={(e) => {
                                const updated = [...experiencesForm];
                                updated[idx].description = e.target.value;
                                setExperiencesForm(updated);
                              }}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white resize-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 4: Skills */}
                {activeTab === 'skills' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Daftar Keahlian (Skills)
                      </h3>
                      <button
                        onClick={handleAddSkill}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500 text-white text-xs font-semibold shadow-sm hover:bg-cyan-600 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Skill Baru</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {skillsForm.map((skill, idx) => (
                        <div
                          key={skill.id}
                          className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 relative"
                        >
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => {
                                const updated = [...skillsForm];
                                updated[idx].name = e.target.value;
                                setSkillsForm(updated);
                              }}
                              className="font-bold text-xs text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-slate-700 focus:border-cyan-500 focus:outline-none w-3/4"
                            />
                            <button
                              onClick={() => handleDeleteSkill(skill.id)}
                              className="p-1 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] text-slate-500">Tingkat (%)</label>
                              <input
                                type="number"
                                min="0"
                                max="100"
                                value={skill.level}
                                onChange={(e) => {
                                  const updated = [...skillsForm];
                                  updated[idx].level = parseInt(e.target.value) || 0;
                                  setSkillsForm(updated);
                                }}
                                className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] text-slate-500">Pengalaman</label>
                              <input
                                type="text"
                                value={skill.experienceYears}
                                onChange={(e) => {
                                  const updated = [...skillsForm];
                                  updated[idx].experienceYears = e.target.value;
                                  setSkillsForm(updated);
                                }}
                                className="w-full px-2 py-1 rounded bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 5: Projects */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Daftar Proyek Portfolio
                      </h3>
                      <button
                        onClick={handleAddProject}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500 text-white text-xs font-semibold shadow-sm hover:bg-cyan-600 flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Tambah Proyek Baru</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {projectsForm.map((proj, idx) => (
                        <div
                          key={proj.id}
                          className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => {
                                const updated = [...projectsForm];
                                updated[idx].title = e.target.value;
                                setProjectsForm(updated);
                              }}
                              className="font-bold text-sm text-slate-900 dark:text-white bg-transparent border-b border-slate-300 dark:border-slate-700 focus:border-cyan-500 focus:outline-none w-3/4"
                            />
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div>
                            <label className="block text-[11px] text-slate-500 mb-1">
                              Deskripsi Proyek
                            </label>
                            <textarea
                              rows={2}
                              value={proj.description}
                              onChange={(e) => {
                                const updated = [...projectsForm];
                                updated[idx].description = e.target.value;
                                setProjectsForm(updated);
                              }}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white resize-none"
                            />
                          </div>

                          {/* Pengaturan & Upload Foto Proyek */}
                          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                              <ImageIcon className="w-4 h-4 text-cyan-500" />
                              <span>Foto / Visual Proyek</span>
                            </label>

                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                              {/* Preview Gambar Proyek */}
                              <div className="sm:col-span-4 flex flex-col items-center justify-center p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center">
                                <div className="relative w-full h-24 sm:h-28 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 mb-1">
                                  {proj.image ? (
                                    <img
                                      src={proj.image}
                                      alt={proj.title || 'Preview Proyek'}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600';
                                      }}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-xs p-2">
                                      <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                                      <span>Belum ada foto</span>
                                    </div>
                                  )}
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono">Pratinjau Foto</span>
                              </div>

                              {/* Input File & Link URL */}
                              <div className="sm:col-span-8 space-y-2.5">
                                {/* Upload File dari Perangkat */}
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                                    <Upload className="w-3 h-3 text-cyan-500" />
                                    <span>Unggah Foto dari HP / Komputer</span>
                                  </label>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          if (reader.result) {
                                            const updated = [...projectsForm];
                                            updated[idx].image = reader.result as string;
                                            setProjectsForm(updated);
                                          }
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                    className="block w-full text-[11px] text-slate-500 dark:text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-semibold file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 cursor-pointer bg-white dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800"
                                  />
                                </div>

                                {/* Link URL Gambar Direct */}
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                                    <Link2 className="w-3 h-3 text-cyan-500" />
                                    <span>Atau Tempelkan Link URL Gambar</span>
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="https://... link foto proyek"
                                    value={proj.image}
                                    onChange={(e) => {
                                      const updated = [...projectsForm];
                                      updated[idx].image = e.target.value;
                                      setProjectsForm(updated);
                                    }}
                                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white font-mono"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] text-slate-500 mb-1">
                                Link Demo / Github (Opsional)
                              </label>
                              <input
                                type="text"
                                placeholder="https://..."
                                value={proj.demoUrl || ''}
                                onChange={(e) => {
                                  const updated = [...projectsForm];
                                  updated[idx].demoUrl = e.target.value;
                                  setProjectsForm(updated);
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] text-slate-500 mb-1">
                                Tags / Teknologi (Pisahkan Koma)
                              </label>
                              <input
                                type="text"
                                value={proj.tags.join(', ')}
                                onChange={(e) => {
                                  const updated = [...projectsForm];
                                  updated[idx].tags = e.target.value.split(',').map(t => t.trim());
                                  setProjectsForm(updated);
                                }}
                                className="w-full px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 6: Security & Reset */}
                {activeTab === 'security' && (
                  <div className="space-y-6 max-w-xl">
                    <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Pengaturan Keamanan Admin
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Ubah Kata Sandi / PIN login Admin untuk mengamankan akses editor portofolio.
                      </p>
                    </div>

                    {securitySuccess && (
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-semibold flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>{securitySuccess}</span>
                      </div>
                    )}

                    <form onSubmit={handleChangePin} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Kata Sandi / PIN Baru
                        </label>
                        <input
                          type="password"
                          placeholder="Minimal 4 Karakter..."
                          value={newPin}
                          onChange={(e) => setNewPin(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Konfirmasi Kata Sandi Baru
                        </label>
                        <input
                          type="password"
                          placeholder="Masukkan ulang PIN baru..."
                          value={confirmPin}
                          onChange={(e) => setConfirmPin(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-cyan-500 text-white font-semibold text-xs shadow-sm hover:bg-cyan-600"
                      >
                        Perbarui PIN Admin
                      </button>
                    </form>

                    <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                      <h4 className="text-xs font-bold text-rose-500 mb-1">
                        Zona Bahaya / Danger Zone
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                        Mengembalikan seluruh data profil, skill, pengalaman, dan proyek ke data CV asli Chariz Faghrun N.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Apakah Anda yakin ingin mereset seluruh data kembali ke CV bawaan Chariz Faghrun N?')) {
                            onResetAll();
                            onClose();
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 font-semibold text-xs hover:bg-rose-500/20 flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset ke Data CV Asli</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Modal Footer Controls (When Authenticated) */}
          {isAuthenticated && (
            <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-300 dark:hover:bg-slate-700"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleSaveAll}
                className="px-6 py-2.5 rounded-xl bg-[#527a3a] hover:bg-[#43662f] text-white font-semibold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Semua Perubahan</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
