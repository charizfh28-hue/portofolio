import React from 'react';
import { ArrowUp, Github, Linkedin, Instagram, Twitter, Heart } from 'lucide-react';
import { ProfileData } from '../types';

interface FooterProps {
  profile: ProfileData;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      default:
        return <Twitter className="w-4 h-4" />;
    }
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80 items-center">
          {/* Brand & Logo */}
          <div className="md:col-span-5 flex flex-col items-start gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#527a3a] flex items-center justify-center text-white font-bold text-lg">
                {profile.nickname.charAt(0)}
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                {profile.nickname}<span className="text-[#95be78]">.dev</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Website portofolio pribadi modern, minimalis, dan fully responsive yang dibuat dengan React, TypeScript, dan Tailwind CSS.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
            <a href="#home" className="hover:text-[#95be78] transition-colors">Beranda</a>
            <a href="#about" className="hover:text-[#95be78] transition-colors">Tentang Saya</a>
            <a href="#skills" className="hover:text-[#95be78] transition-colors">Keahlian</a>
            <a href="#projects" className="hover:text-[#95be78] transition-colors">Proyek</a>
            <a href="#contact" className="hover:text-[#95be78] transition-colors">Kontak</a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="md:col-span-3 flex items-center justify-start md:justify-end gap-3">
            {profile.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-[#95be78] hover:border-[#527a3a]/60 transition-all"
                title={social.name}
              >
                {getSocialIcon(social.icon)}
              </a>
            ))}

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-[#527a3a] hover:bg-[#43662f] text-white hover:scale-110 transition-all shadow-md ml-2"
              title="Kembali ke Atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            &copy; {new Date().getFullYear()} {profile.name}. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-[#a32b31] fill-[#a32b31]" />
            <span>menggunakan React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
