import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CVModal } from './components/CVModal';
import { AdminPanelModal } from './components/AdminPanelModal';

import {
  initialProfileData,
  skillsData,
  projectsData,
  experiencesData,
} from './data/portfolioData';

import { ThemeMode, ProfileData, Project, Skill, Experience } from './types';
import {
  subscribeToPortfolio,
  savePortfolioToFirestore,
  resetPortfolioInFirestore,
} from './lib/firebase';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  
  // State for all portfolio data
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem('portfolio_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, avatarUrl: parsed.avatarUrl || initialProfileData.avatarUrl };
    }
    return initialProfileData;
  });

  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('portfolio_skills');
    return saved ? JSON.parse(saved) : skillsData;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : projectsData;
  });

  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem('portfolio_experiences');
    return saved ? JSON.parse(saved) : experiencesData;
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCVOpen, setIsCVOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Real-time Firestore sync across all devices
  useEffect(() => {
    const defaultPortfolio = {
      profile: initialProfileData,
      skills: skillsData,
      projects: projectsData,
      experiences: experiencesData,
    };

    const unsubscribe = subscribeToPortfolio((data) => {
      if (data.profile) {
        setProfile(data.profile);
        localStorage.setItem('portfolio_profile', JSON.stringify(data.profile));
      }
      if (data.skills) {
        setSkills(data.skills);
        localStorage.setItem('portfolio_skills', JSON.stringify(data.skills));
      }
      if (data.projects) {
        setProjects(data.projects);
        localStorage.setItem('portfolio_projects', JSON.stringify(data.projects));
      }
      if (data.experiences) {
        setExperiences(data.experiences);
        localStorage.setItem('portfolio_experiences', JSON.stringify(data.experiences));
      }
    }, defaultPortfolio);

    return () => unsubscribe();
  }, []);

  // Sync theme class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Admin Panel Callbacks with Firestore persistence
  const handleSaveProfile = async (updated: ProfileData) => {
    setProfile(updated);
    localStorage.setItem('portfolio_profile', JSON.stringify(updated));
    await savePortfolioToFirestore({ profile: updated });
  };

  const handleSaveSkills = async (updated: Skill[]) => {
    setSkills(updated);
    localStorage.setItem('portfolio_skills', JSON.stringify(updated));
    await savePortfolioToFirestore({ skills: updated });
  };

  const handleSaveProjects = async (updated: Project[]) => {
    setProjects(updated);
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
    await savePortfolioToFirestore({ projects: updated });
  };

  const handleSaveExperiences = async (updated: Experience[]) => {
    setExperiences(updated);
    localStorage.setItem('portfolio_experiences', JSON.stringify(updated));
    await savePortfolioToFirestore({ experiences: updated });
  };

  const handleResetAll = async () => {
    setProfile(initialProfileData);
    setSkills(skillsData);
    setProjects(projectsData);
    setExperiences(experiencesData);
    localStorage.removeItem('portfolio_profile');
    localStorage.removeItem('portfolio_skills');
    localStorage.removeItem('portfolio_projects');
    localStorage.removeItem('portfolio_experiences');
    await resetPortfolioInFirestore({
      profile: initialProfileData,
      skills: skillsData,
      projects: projectsData,
      experiences: experiencesData,
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* Sticky Navigation Bar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        profile={profile}
        onOpenCV={() => setIsCVOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero profile={profile} onOpenCV={() => setIsCVOpen(true)} />

        {/* 2. About Section */}
        <About profile={profile} experiences={experiences} />

        {/* 3. Skills Section */}
        <Skills skills={skills} />

        {/* 4. Projects Section */}
        <Projects
          projects={projects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 5. Contact Section */}
        <Contact profile={profile} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CVModal
        isOpen={isCVOpen}
        onClose={() => setIsCVOpen(false)}
        profile={profile}
        experiences={experiences}
        skills={skills}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        profile={profile}
        skills={skills}
        projects={projects}
        experiences={experiences}
        onSaveProfile={handleSaveProfile}
        onSaveSkills={handleSaveSkills}
        onSaveProjects={handleSaveProjects}
        onSaveExperiences={handleSaveExperiences}
        onResetAll={handleResetAll}
      />
    </div>
  );
}
