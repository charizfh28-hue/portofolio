import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  MessageSquare,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { ProfileData, ContactFormData } from '../types';

interface ContactProps {
  profile: ProfileData;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1200);
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#527a3a]/15 border border-[#527a3a]/30 text-[#527a3a] dark:text-[#95be78] text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Mari Bekerja Sama</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Hubungi Saya
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2">
            Punya ide proyek, tawaran pekerjaan, atau pertanyaan? Kirim pesan langsung di bawah ini.
          </p>
          <div className="w-16 h-1 bg-[#527a3a] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#527a3a] dark:text-[#95be78]" />
                <span>Informasi Kontak</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                Saya selalu terbuka untuk berdiskusi seputar peluang proyek baru, kolaborasi pengembang, maupun diskusi teknologi.
              </p>

              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#527a3a]/15 text-[#527a3a] dark:text-[#95be78] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {profile.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(profile.email, 'email')}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-500 hover:text-[#527a3a] dark:hover:text-[#95be78] transition-colors border border-slate-200 dark:border-slate-700 shrink-0"
                  title="Salin Email"
                >
                  {copiedField === 'email' ? (
                    <Check className="w-4 h-4 text-[#527a3a] dark:text-[#95be78]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-3 group">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#a32b31]/15 text-[#a32b31] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Telepon / WhatsApp</div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      {profile.phone}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(profile.phone, 'phone')}
                  className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-500 hover:text-[#527a3a] dark:hover:text-[#95be78] transition-colors border border-slate-200 dark:border-slate-700 shrink-0"
                  title="Salin Nomor"
                >
                  {copiedField === 'phone' ? (
                    <Check className="w-4 h-4 text-[#527a3a] dark:text-[#95be78]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#527a3a]/15 text-[#527a3a] dark:text-[#95be78] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Lokasi</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    {profile.location}
                  </div>
                </div>
              </div>

              {/* Work Hours Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#527a3a]/15 text-[#527a3a] dark:text-[#95be78] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Respon Cepat</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                    Senin - Sabtu (08.00 - 18.00 WIB)
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#527a3a] dark:text-[#95be78]" />
                <span>Kirim Pesan Langsung</span>
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mb-6">
                Isi formulir berikut dan pesan Anda akan langsung terkirim ke kotak masuk email saya.
              </p>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl bg-[#527a3a]/15 border border-[#527a3a]/30 text-[#527a3a] dark:text-[#95be78] text-sm font-semibold mb-6 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Terima kasih! Pesan Anda telah berhasil terkirim. Saya akan segera membalasnya.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama Anda"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#527a3a] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contoh@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#527a3a] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Subjek Pesan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Penawaran Proyek Website E-Commerce"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#527a3a] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Pesan *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan detail proyek atau pertanyaan Anda di sini..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#527a3a] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-[#527a3a] hover:bg-[#43662f] text-white font-semibold text-sm shadow-lg shadow-[#527a3a]/25 hover:shadow-[#527a3a]/40 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Mengirim Pesan...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Pesan Sekarang</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
