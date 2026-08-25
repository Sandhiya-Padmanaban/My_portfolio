import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  GraduationCap, 
  Briefcase, 
  Award, 
  BookOpen, 
  Code2, 
  FolderGit2, 
  Menu, 
  X, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Database, 
  Cpu, 
  Wrench, 
  ShieldCheck, 
  ChevronRight, 
  User,
  ArrowUpRight, 
  Clock, 
  Star,
  FileText,
  Palette,
  PenTool,
  FileEdit,
  Layers,
  Compass,
  Eye,
  Globe,
  Upload
} from 'lucide-react';
import {
  PERSONAL_INFO,
  METRICS,
  EDUCATION_LIST,
  INTERNSHIPS_LIST,
  SKILL_CATEGORIES,
  PREFERRED_INTERESTS,
  PROJECTS_LIST,
  CERTIFICATIONS_LIST,
  ACHIEVEMENTS_LIST
} from './data';
import { ResumeModal } from './components/ResumeModal';
import { PhotoManagerModal } from './components/PhotoManagerModal';
import { ContactSection } from './components/ContactSection';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { useTheme } from './theme';
import { savePermanentPhoto, loadPermanentPhoto, removePermanentPhoto } from './utils/photoStorage';

export default function App() {
  const { currentTheme } = useTheme();
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [photoToast, setPhotoToast] = useState<string | null>(null);

  const [customPhoto, setCustomPhoto] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sandhiya_profile_photo') || localStorage.getItem('sandhiya_portfolio_custom_photo') || null;
    }
    return null;
  });

  // Re-hydrate async from IndexedDB on startup (in case localStorage was cleared or quota exceeded)
  useEffect(() => {
    loadPermanentPhoto().then((savedPhoto) => {
      if (savedPhoto && savedPhoto !== customPhoto) {
        setCustomPhoto(savedPhoto);
      }
    });
  }, []);

  // Photo priority: local custom upload > configured data.ts photoUrl > null (Monogram)
  const candidatePhoto = customPhoto || (PERSONAL_INFO.photoUrl ? PERSONAL_INFO.photoUrl : null);

  const handleUpdatePhoto = async (photoData: string) => {
    setCustomPhoto(photoData);
    await savePermanentPhoto(photoData);
    setPhotoToast('Your profile photo is permanently saved!');
    setTimeout(() => setPhotoToast(null), 3000);
  };

  const handleResetPhoto = async () => {
    await removePermanentPhoto();
    setCustomPhoto(null);
    setPhotoToast('Profile photo reset to professional monogram avatar.');
    setTimeout(() => setPhotoToast(null), 3000);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'languages' | 'backend' | 'domains' | 'tools'>('all');

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  const navLinks = [
    { label: 'About Me', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Internships', href: '#internships' },
    { label: 'Skills', href: '#skills' },
    { label: 'Preferred Interests', href: '#interests' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className={`min-h-screen ${currentTheme.pageBg} flex flex-col font-sans ${currentTheme.selection} antialiased transition-colors duration-200`}>
      {/* Top Header / Sticky Navigation Bar */}
      <header className={`sticky top-0 z-40 ${currentTheme.headerBg} transition-colors duration-200`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
          <a href="#about" className="flex items-center gap-3 group shrink-0">
            <div className={`w-10 h-10 rounded-xl ${currentTheme.accentGradient} flex items-center justify-center font-extrabold text-sm tracking-tight group-hover:scale-105 transition-all shadow-md`}>
              SP
            </div>
            <div>
              <span className={`font-extrabold text-base sm:text-lg ${currentTheme.headerText} tracking-tight block leading-none transition-colors`}>
                {PERSONAL_INFO.name}
              </span>
              <span className={`text-[11px] ${currentTheme.headerSubtext} mt-0.5 block`}>
                MCA Postgraduate • Holy Cross College
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className={`hidden xl:flex items-center gap-4 text-xs font-bold ${currentTheme.cardText}`}>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="hover:opacity-100 hover:text-blue-500 transition-colors py-1 relative"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Theme Switcher */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Quick Theme Switcher Component */}
            <ThemeSwitcher variant="header" />

            <button
              id="header-view-resume-btn"
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl ${currentTheme.primaryBtn} text-xs transition-all active:scale-98 cursor-pointer`}
              title="Open Curriculum Vitae / Resume in PDF Format"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume (PDF)</span>
            </button>

            <a
              id="header-contact-btn"
              href="#contact"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl ${currentTheme.secondaryBtn} text-xs transition-all active:scale-98`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button & Theme Switcher */}
          <div className="flex sm:hidden items-center gap-1.5">
            <ThemeSwitcher variant="header" />
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${currentTheme.cardText} hover:bg-black/5 dark:hover:bg-white/5`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`xl:hidden ${currentTheme.isLight ? 'bg-white/98 border-blue-200' : 'bg-[#06152b]/98 border-blue-950'} border-b px-4 py-4 space-y-2 shadow-2xl animate-fade-in`}>
            {/* Drawer Theme Switcher */}
            <div className="pb-2 border-b border-inherit/40">
              <ThemeSwitcher variant="drawer" />
            </div>

            <div className="grid grid-cols-2 gap-1 py-1">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-2.5 py-2 text-xs font-semibold rounded-lg transition-colors ${
                    currentTheme.isLight 
                      ? 'text-slate-700 hover:text-blue-600 hover:bg-blue-50' 
                      : 'text-slate-200 hover:text-teal-300 hover:bg-[#092242]'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-inherit/40 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setResumeModalOpen(true);
                }}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl ${currentTheme.primaryBtn} text-xs`}
              >
                <FileText className="w-4 h-4" />
                <span>View & Download Resume (PDF)</span>
              </button>
              <div className="flex items-center justify-between px-2 pt-1">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold opacity-80 hover:opacity-100 flex items-center gap-1.5"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-bold ${currentTheme.accentText} hover:underline flex items-center gap-1.5`}
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs font-extrabold px-3 py-1.5 rounded-lg ${currentTheme.primaryBtn}`}
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        )}
      </header>      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-14 sm:space-y-20">
        {/* HERO SECTION / ABOUT ME */}
        <section id="about" className="relative">
          {/* Main Hero Card Container */}
          <div className={`${currentTheme.heroBg} rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden border ${currentTheme.heroBorder}`}>
            {/* Subtle accent glows */}
            <div className={`absolute -right-24 -top-24 w-96 h-96 ${currentTheme.heroGlow1} rounded-full blur-3xl pointer-events-none`} />
            <div className={`absolute -left-24 -bottom-24 w-96 h-96 ${currentTheme.heroGlow2} rounded-full blur-3xl pointer-events-none`} />

            {/* PROFESSIONAL 'ABOUT ME' EXECUTIVE HEADER */}
            <div className={`relative z-10 mb-8 pb-5 border-b ${currentTheme.sectionBorder} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
              <div className="flex items-center gap-3.5">
                <div className={`w-11 h-11 rounded-2xl ${currentTheme.accentGradient} flex items-center justify-center font-black shadow-md`}>
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className={`text-xl sm:text-2xl font-black ${currentTheme.heroHeading} tracking-tight flex items-center gap-2`}>
                    About Me
                  </h2>
                  <p className={`text-xs ${currentTheme.heroSubtext} font-bold tracking-wide`}>
                    Master of Computer Applications (MCA) • Academic Distinction & Applied Research
                  </p>
                </div>
              </div>

              <div className={`self-start sm:self-center inline-flex items-center gap-2 px-3 py-1 ${currentTheme.accentBadgeBg} border ${currentTheme.accentBadgeBorder} ${currentTheme.accentBadgeText} rounded-full text-xs font-extrabold shadow-2xs`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Open for Software & Analytics Roles</span>
              </div>
            </div>

            {/* Profile Content Row: Fixed Round Photo Portrait + Executive Pitch */}
            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 sm:gap-12">
              {/* Left Column: Professional Round Portrait Avatar */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative">
                  {/* Executive circular portrait container */}
                  <div
                    id="profile-avatar-container"
                    className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border-4 ${
                      currentTheme.isLight ? 'border-blue-400/80 ring-4 ring-blue-100' : 'border-teal-400/50 ring-4 ring-blue-950'
                    } overflow-hidden shadow-2xl flex items-center justify-center ${currentTheme.innerBoxBg}`}
                  >
                    {candidatePhoto ? (
                      <img
                        src={candidatePhoto}
                        alt={PERSONAL_INFO.name}
                        className="w-full h-full object-cover object-center rounded-full"
                        referrerPolicy="no-referrer"
                        loading="eager"
                      />
                    ) : (
                      /* High-craft Monogram Brand Avatar */
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center rounded-full bg-gradient-to-b from-slate-900/30 to-black/40">
                        <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${currentTheme.accentGradient} flex items-center justify-center text-2xl sm:text-3xl font-black text-white shadow-lg mb-1.5`}>
                          SP
                        </div>
                        <span className={`text-xs sm:text-sm font-extrabold ${currentTheme.heroHeading} tracking-tight`}>
                          Sandhiya P
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Corner Honor Badge */}
                  <div
                    className={`absolute bottom-1.5 right-1.5 p-2.5 ${
                      currentTheme.isLight ? 'bg-white text-amber-600 border-amber-300' : 'bg-[#040f22] text-amber-400 border-amber-500/50'
                    } rounded-full shadow-lg border-2 flex items-center justify-center`}
                    title="International AI Conference Best Paper Award"
                  >
                    <Award className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                </div>

                {/* Candidate Credentials Tag */}
                <div className="mt-4 flex flex-col items-center text-center">
                  <span className={`text-sm font-extrabold ${currentTheme.heroHeading} tracking-tight`}>
                    {PERSONAL_INFO.name}
                  </span>
                  <span className={`text-xs font-semibold ${currentTheme.heroSubtext}`}>
                    Holy Cross College (Autonomous), Trichy
                  </span>
                  <span className={`text-[11px] ${currentTheme.cardSubtext} font-medium mt-0.5`}>
                    MCA (2025-2027) • 8.50 CGPA
                  </span>
                </div>
              </div>

              {/* Right Column: Bio & Core Pitch */}
              <div className="flex-1 text-center lg:text-left space-y-4.5">
                <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 ${currentTheme.accentBadgeBg} border ${currentTheme.accentBadgeBorder} ${currentTheme.accentBadgeText} rounded-full text-xs font-extrabold shadow-2xs`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{PERSONAL_INFO.title}</span>
                </div>

                <div className="space-y-1">
                  <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-black ${currentTheme.heroHeading} tracking-tight leading-tight`}>
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className={`text-base sm:text-lg ${currentTheme.heroSubtext}`}>
                    {PERSONAL_INFO.tagline}
                  </p>
                </div>

                <p className={`text-sm sm:text-base ${currentTheme.heroText} leading-relaxed font-normal text-justify lg:text-left`}>
                  {PERSONAL_INFO.bio}
                </p>

                {/* Quick Info Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1 text-xs font-semibold">
                  <span className={`inline-flex items-center gap-1.5 ${currentTheme.innerBoxBg} px-3.5 py-2 rounded-xl border ${currentTheme.innerBoxBorder} ${currentTheme.innerBoxText} shadow-2xs`}>
                    <MapPin className="w-3.5 h-3.5 opacity-80" />
                    {PERSONAL_INFO.location}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 ${
                    currentTheme.isLight ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
                  } px-3.5 py-2 rounded-xl border shadow-2xs`}>
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    Best Paper Award (AI)
                  </span>
                  <span className={`inline-flex items-center gap-1.5 ${currentTheme.accentBadgeBg} px-3.5 py-2 rounded-xl border ${currentTheme.accentBadgeBorder} ${currentTheme.accentBadgeText} shadow-2xs`}>
                    <GraduationCap className="w-3.5 h-3.5 opacity-80" />
                    MCA 8.50 CGPA | BCA 8.78 CGPA
                  </span>
                </div>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
                  <button
                    id="hero-view-resume-btn"
                    type="button"
                    onClick={() => setResumeModalOpen(true)}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl ${currentTheme.primaryBtn} text-sm transition-all active:scale-98 cursor-pointer`}
                    title="Open Curriculum Vitae in interactive 1-page format"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Resume (PDF)</span>
                  </button>

                  <a
                    id="hero-contact-btn"
                    href="#contact"
                    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl ${currentTheme.secondaryBtn} text-sm transition-all active:scale-98`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Get in Touch</span>
                  </a>

                  <a
                    id="hero-github-btn"
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl ${currentTheme.outlineBtn} text-sm font-bold shadow-xs transition-all`}
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    id="hero-linkedin-btn"
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-2 px-4.5 py-2.5 rounded-xl ${currentTheme.secondaryBtn} text-sm transition-all`}
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Direct Contact Bar right on the Hero */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${currentTheme.innerBoxBg} border ${currentTheme.innerBoxBorder} text-xs ${currentTheme.innerBoxText}`}>
                    <Phone className="w-3.5 h-3.5 opacity-80" />
                    <span className="font-bold">+91 {PERSONAL_INFO.phone}</span>
                    <button
                      type="button"
                      onClick={copyPhoneToClipboard}
                      className="p-1 rounded hover:opacity-80 transition-colors cursor-pointer"
                      title="Copy Phone Number"
                    >
                      {copiedPhone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-70" />}
                    </button>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${currentTheme.innerBoxBg} border ${currentTheme.innerBoxBorder} text-xs ${currentTheme.innerBoxText}`}>
                    <Mail className="w-3.5 h-3.5 opacity-80" />
                    <span className="font-bold">{PERSONAL_INFO.email}</span>
                    <button
                      type="button"
                      onClick={copyEmailToClipboard}
                      className="p-1 rounded hover:opacity-80 transition-colors cursor-pointer"
                      title="Copy Email"
                    >
                      {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 opacity-70" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Metric Highlights Grid */}
            <div className={`mt-8 pt-8 border-t ${currentTheme.sectionBorder} grid grid-cols-2 md:grid-cols-4 gap-4`}>
              {METRICS.map((metric, i) => (
                <div key={i} className={`${currentTheme.innerBoxBg} rounded-2xl p-4 border ${currentTheme.innerBoxBorder} flex flex-col justify-between ${currentTheme.innerBoxHover} transition-all shadow-2xs`}>
                  <span className={`text-xs ${currentTheme.cardSubtext} font-semibold leading-snug`}>
                    {metric.label}
                  </span>
                  <div className={`mt-2 text-xl sm:text-2xl font-black ${currentTheme.cardHeading} tracking-tight`}>
                    {metric.value}
                  </div>
                  <div className={`mt-1 text-[11px] ${currentTheme.accentText} font-bold truncate`}>
                    {metric.highlight}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="space-y-6">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b ${currentTheme.sectionBorder} gap-2`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${currentTheme.accentGradient} flex items-center justify-center font-black shadow-md`}>
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-2xl font-extrabold ${currentTheme.heroHeading} tracking-tight`}>
                  Academic Background
                </h2>
                <p className={`text-xs ${currentTheme.cardSubtext} font-medium`}>
                  Higher Education & Autonomous Degree Programs
                </p>
              </div>
            </div>
            <span className={`text-xs font-bold ${currentTheme.accentBadgeText} ${currentTheme.accentBadgeBg} px-3.5 py-1.5 rounded-xl border ${currentTheme.accentBadgeBorder} self-start sm:self-auto`}>
              Distinction & Autonomous Honors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION_LIST.map((edu) => (
              <div
                key={edu.id}
                id={`edu-card-${edu.id}`}
                className={`${currentTheme.cardBg} ${currentTheme.cardText} rounded-3xl p-6 sm:p-7 border ${currentTheme.cardBorder} shadow-xl ${currentTheme.cardHover} transition-all flex flex-col justify-between relative overflow-hidden group`}
              >
                {/* Degree badge tag */}
                <div className={`absolute top-0 right-0 px-4 py-1.5 ${currentTheme.accentGradient} text-xs font-black rounded-bl-2xl tracking-wide shadow-xs`}>
                  {edu.level}
                </div>

                <div>
                  <div className={`inline-flex items-center gap-1.5 text-xs font-bold ${currentTheme.accentText} mb-2`}>
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.duration}</span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-extrabold ${currentTheme.cardHeading} leading-snug pr-10`}>
                    {edu.degree}
                  </h3>

                  <p className={`text-sm font-bold ${currentTheme.cardSubtext} mt-2`}>
                    {edu.institution}
                  </p>

                  <div className={`flex items-center gap-2 text-xs ${currentTheme.cardSubtext} mt-2`}>
                    <MapPin className="w-3.5 h-3.5 opacity-80 shrink-0" />
                    <span>{edu.location}</span>
                  </div>
                </div>

                <div className={`mt-6 pt-4 border-t ${currentTheme.sectionBorder} flex items-center justify-between ${currentTheme.innerBoxBg} -mx-6 -mb-6 p-4 px-6 rounded-b-3xl`}>
                  <span className={`text-xs ${currentTheme.cardSubtext} font-semibold`}>Cumulative Academic Score</span>
                  <span className={`text-xs sm:text-sm font-black ${currentTheme.accentBadgeText} ${currentTheme.accentBadgeBg} px-3.5 py-1.5 rounded-xl border ${currentTheme.accentBadgeBorder} shadow-xs`}>
                    {edu.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERNSHIPS & INDUSTRY EXPERIENCE */}
        <section id="internships" className="space-y-6">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b ${currentTheme.sectionBorder} gap-2`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${currentTheme.accentGradient} flex items-center justify-center font-black shadow-md`}>
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-2xl font-extrabold ${currentTheme.heroHeading} tracking-tight`}>
                  Industry & Research Internships
                </h2>
                <p className={`text-xs ${currentTheme.cardSubtext} font-medium`}>
                  Practical Exposure Across Analytics, Embedded Tech, Design & Python
                </p>
              </div>
            </div>
            <span className={`text-xs font-bold ${currentTheme.accentBadgeText} ${currentTheme.accentBadgeBg} px-3.5 py-1.5 rounded-xl border ${currentTheme.accentBadgeBorder} self-start sm:self-auto`}>
              4 Industry Internships
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INTERNSHIPS_LIST.map((item) => (
              <div
                key={item.id}
                id={`internship-card-${item.id}`}
                className={`${currentTheme.cardBg} ${currentTheme.cardText} rounded-3xl p-6 border ${currentTheme.cardBorder} shadow-xl ${currentTheme.cardHover} transition-all flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-3 py-1 ${currentTheme.accentBadgeBg} ${currentTheme.accentBadgeText} border ${currentTheme.accentBadgeBorder} text-xs font-bold rounded-xl`}>
                      {item.domain}
                    </span>
                    <span className={`text-xs font-semibold ${currentTheme.cardSubtext} flex items-center gap-1`}>
                      <Clock className="w-3.5 h-3.5 opacity-80" />
                      {item.duration}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold ${currentTheme.cardHeading} leading-snug`}>
                    {item.company}
                  </h3>

                  <div className={`flex items-center gap-1.5 text-xs ${currentTheme.cardSubtext} mt-1 mb-3`}>
                    <MapPin className="w-3.5 h-3.5 opacity-80" />
                    <span>{item.location}</span>
                  </div>

                  <p className={`text-xs sm:text-sm ${currentTheme.cardText} leading-relaxed font-normal`}>
                    {item.description}
                  </p>
                </div>

                <div className={`mt-5 pt-4 border-t ${currentTheme.sectionBorder}`}>
                  <div className={`text-[11px] font-bold uppercase tracking-wider ${currentTheme.accentText} mb-2`}>
                    Key Competencies Applied:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-1 ${currentTheme.innerBoxBg} ${currentTheme.accentText} text-[11px] font-semibold rounded-lg border ${currentTheme.innerBoxBorder} transition-colors`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNICAL STACK & SKILL MATRIX */}
        <section id="skills" className="space-y-6">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b ${currentTheme.sectionBorder} gap-2`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${currentTheme.accentGradient} flex items-center justify-center font-black shadow-md`}>
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-2xl font-extrabold ${currentTheme.heroHeading} tracking-tight`}>
                  Technical Competencies
                </h2>
                <p className={`text-xs ${currentTheme.cardSubtext} font-medium`}>
                  Programming Languages, Databases, Tools & Applied Methodologies
                </p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className={`flex items-center gap-1.5 ${currentTheme.innerBoxBg} p-1 rounded-2xl border ${currentTheme.innerBoxBorder} self-start sm:self-auto overflow-x-auto max-w-full`}>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'all' ? currentTheme.primaryBtn : `${currentTheme.cardSubtext} hover:opacity-100`
                }`}
              >
                All Domains
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('languages')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'languages' ? currentTheme.primaryBtn : `${currentTheme.cardSubtext} hover:opacity-100`
                }`}
              >
                Languages
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('domains')}
                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === 'domains' ? currentTheme.primaryBtn : `${currentTheme.cardSubtext} hover:opacity-100`
                }`}
              >
                Specializations
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILL_CATEGORIES.map((cat, i) => {
              if (activeTab === 'languages' && i !== 0) return null;
              if (activeTab === 'domains' && i !== 2) return null;

              return (
                <div
                  key={cat.category}
                  className={`${currentTheme.cardBg} ${currentTheme.cardText} rounded-3xl p-6 border ${currentTheme.cardBorder} shadow-xl ${currentTheme.cardHover} transition-all flex flex-col justify-between group`}
                >
                  <div>
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className={`w-8 h-8 rounded-xl ${currentTheme.innerBoxBg} ${currentTheme.accentText} flex items-center justify-center border ${currentTheme.innerBoxBorder}`}>
                        {i === 0 && <Code2 className="w-4 h-4" />}
                        {i === 1 && <Database className="w-4 h-4" />}
                        {i === 2 && <Cpu className="w-4 h-4" />}
                        {i === 3 && <Wrench className="w-4 h-4" />}
                      </div>
                      <h3 className={`text-sm sm:text-base font-bold ${currentTheme.cardHeading} tracking-wide`}>
                        {cat.category}
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {cat.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className={`flex items-center justify-between p-2.5 px-3 ${currentTheme.innerBoxBg} rounded-2xl border ${currentTheme.innerBoxBorder} transition-colors`}
                        >
                          <span className={`text-xs font-bold ${currentTheme.cardHeading}`}>{skill.name}</span>
                          <span className={`text-[10px] font-bold ${currentTheme.accentBadgeText} ${currentTheme.accentBadgeBg} px-2 py-0.5 rounded-lg border ${currentTheme.accentBadgeBorder}`}>
                            {skill.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PREFERRED INTERESTS SECTION */}
        <section id="interests" className="space-y-6">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b ${currentTheme.sectionBorder} gap-2`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${currentTheme.accentGradient} flex items-center justify-center font-black shadow-md`}>
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-2xl font-extrabold ${currentTheme.heroHeading} tracking-tight`}>
                  Preferred Interests
                </h2>
                <p className={`text-xs ${currentTheme.cardSubtext} font-medium`}>
                  Focused Core Disciplines in UI/UX Design, Prompt Engineering & Modern Web Development
                </p>
              </div>
            </div>
            <span className={`text-xs font-bold ${currentTheme.accentBadgeText} ${currentTheme.accentBadgeBg} px-3.5 py-1.5 rounded-xl border ${currentTheme.accentBadgeBorder} self-start sm:self-auto flex items-center gap-1.5`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>3 Core Focus Areas</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PREFERRED_INTERESTS.map((interest, idx) => (
              <div
                key={interest.id}
                id={`interest-card-${interest.id}`}
                className={`${currentTheme.cardBg} ${currentTheme.cardText} rounded-3xl p-6 sm:p-7 border ${currentTheme.cardBorder} shadow-xl ${currentTheme.cardHover} transition-all flex flex-col justify-between group relative overflow-hidden`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className={`w-10 h-10 rounded-2xl ${currentTheme.innerBoxBg} ${currentTheme.accentText} flex items-center justify-center border ${currentTheme.innerBoxBorder} group-hover:scale-105 transition-all shadow-xs`}>
                      {idx === 0 && <Palette className="w-5 h-5" />}
                      {idx === 1 && <Sparkles className="w-5 h-5" />}
                      {idx === 2 && <Code2 className="w-5 h-5" />}
                    </div>

                    <span className={`text-[11px] font-bold ${currentTheme.accentBadgeText} ${currentTheme.accentBadgeBg} px-2.5 py-1 rounded-xl border ${currentTheme.accentBadgeBorder}`}>
                      {interest.category}
                    </span>
                  </div>

                  <h3 className={`text-xl font-black ${currentTheme.cardHeading} mb-1.5`}>
                    {interest.title}
                  </h3>

                  <div className={`text-xs font-bold ${currentTheme.accentText} mb-3 flex items-center gap-1.5`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span>{interest.highlight}</span>
                  </div>

                  <p className={`text-xs sm:text-sm ${currentTheme.cardText} leading-relaxed font-normal`}>
                    {interest.description}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t ${currentTheme.sectionBorder}`}>
                  <div className={`text-[11px] font-bold uppercase tracking-wider ${currentTheme.accentText} mb-2`}>
                    Key Competencies:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {interest.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-2.5 py-1 ${currentTheme.innerBoxBg} ${currentTheme.accentText} text-[11px] font-semibold rounded-lg border ${currentTheme.innerBoxBorder} transition-colors`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS & SYSTEM ARCHITECTURE */}
        <section id="projects" className="space-y-6">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b ${currentTheme.sectionBorder} gap-2`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${currentTheme.accentGradient} flex items-center justify-center font-black shadow-md`}>
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-2xl font-extrabold ${currentTheme.heroHeading} tracking-tight`}>
                  Featured Software Projects
                </h2>
                <p className={`text-xs ${currentTheme.cardSubtext} font-medium`}>
                  End-to-End System Design, Database Architecture & Civic Tech
                </p>
              </div>
            </div>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 text-xs font-bold ${currentTheme.accentBadgeText} ${currentTheme.accentBadgeBg} px-3.5 py-1.5 rounded-xl border ${currentTheme.accentBadgeBorder} self-start sm:self-auto transition-colors`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>Explore GitHub Repos</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS_LIST.map((project, idx) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className={`${currentTheme.cardBg} ${currentTheme.cardText} rounded-3xl p-6 sm:p-7 border ${currentTheme.cardBorder} shadow-xl ${currentTheme.cardHover} transition-all flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-extrabold ${currentTheme.accentText} tracking-wider uppercase`}>
                      Case Study 0{idx + 1}
                    </span>
                    <span className={`px-3 py-0.5 ${currentTheme.accentBadgeBg} ${currentTheme.accentBadgeText} text-xs font-bold rounded-full border ${currentTheme.accentBadgeBorder}`}>
                      {project.category}
                    </span>
                  </div>

                  <h3 className={`text-xl font-bold ${currentTheme.cardHeading} mb-2.5`}>
                    {project.title}
                  </h3>

                  <p className={`text-xs sm:text-sm ${currentTheme.cardText} leading-relaxed mb-4 font-normal`}>
                    {project.description}
                  </p>

                  {/* Impact / Outcome Box */}
                  <div className={`p-3 ${currentTheme.accentBadgeBg} rounded-2xl border ${currentTheme.accentBadgeBorder} mb-4`}>
                    <div className={`text-[11px] font-bold ${currentTheme.accentText} uppercase tracking-wider mb-1 flex items-center gap-1`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Key Result & Impact
                    </div>
                    <p className={`text-xs ${currentTheme.accentBadgeText} leading-snug`}>
                      {project.outcomes}
                    </p>
                  </div>

                  {/* Architecture Details */}
                  <div className="space-y-1.5 mb-4">
                    {project.details.map((detail, dIdx) => (
                      <div key={dIdx} className={`flex items-start gap-2 text-xs ${currentTheme.cardSubtext}`}>
                        <ChevronRight className={`w-3.5 h-3.5 ${currentTheme.accentText} shrink-0 mt-0.5`} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`mt-4 pt-4 border-t ${currentTheme.sectionBorder}`}>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techTags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 ${currentTheme.innerBoxBg} ${currentTheme.accentText} text-[11px] font-semibold rounded-lg border ${currentTheme.innerBoxBorder}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS & RESEARCH PUBLICATIONS */}
        <section id="achievements" className="space-y-6">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b ${currentTheme.sectionBorder} gap-2`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${currentTheme.accentGradient} flex items-center justify-center font-black shadow-md`}>
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-2xl font-extrabold ${currentTheme.heroHeading} tracking-tight`}>
                  Research Honors & Achievements
                </h2>
                <p className={`text-xs ${currentTheme.cardSubtext} font-medium`}>
                  International Conference Paper Presentations, Awards & Leadership
                </p>
              </div>
            </div>
            <span className={`text-xs font-bold ${
              currentTheme.isLight ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
            } px-3.5 py-1.5 rounded-xl border self-start sm:self-auto flex items-center gap-1`}>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              International AI Distinction
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ACHIEVEMENTS_LIST.map((ach) => (
              <div
                key={ach.id}
                id={`achievement-${ach.id}`}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                  ach.isSpecial
                    ? `${currentTheme.heroBg} ${currentTheme.heroBorder} shadow-2xl ring-2 ${
                        currentTheme.isLight ? 'ring-blue-300' : 'ring-teal-500/30'
                      }`
                    : `${currentTheme.cardBg} ${currentTheme.cardBorder} shadow-xl ${currentTheme.cardHover}`
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2.5 rounded-2xl shrink-0 ${
                      ach.isSpecial ? `${currentTheme.accentGradient} shadow-md` : `${currentTheme.innerBoxBg} ${currentTheme.accentText} border ${currentTheme.innerBoxBorder}`
                    }`}
                  >
                    <Award className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`text-base font-bold ${currentTheme.cardHeading} leading-snug`}>
                        {ach.title}
                      </h3>
                      {ach.isSpecial && (
                        <span className="shrink-0 px-2.5 py-1 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-md shadow-xs">
                          Top Honor
                        </span>
                      )}
                    </div>

                    <p className={`text-xs ${currentTheme.cardSubtext} mt-1.5 leading-relaxed font-normal`}>
                      {ach.organization}
                    </p>
                  </div>
                </div>

                {ach.date && (
                  <div className={`mt-4 pt-3 border-t ${currentTheme.sectionBorder} flex items-center justify-between text-xs`}>
                    <span className={`${currentTheme.cardSubtext} font-medium`}>Conferred:</span>
                    <span className={`inline-flex items-center gap-1 font-bold ${currentTheme.accentBadgeText} ${currentTheme.accentBadgeBg} px-2.5 py-1 rounded-lg border ${currentTheme.accentBadgeBorder}`}>
                      <Calendar className="w-3 h-3 opacity-80" />
                      {ach.date}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CERTIFICATIONS & CREDENTIALS */}
        <section id="certifications" className="space-y-6">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b ${currentTheme.sectionBorder} gap-2`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${currentTheme.accentGradient} flex items-center justify-center font-black shadow-md`}>
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-2xl font-extrabold ${currentTheme.heroHeading} tracking-tight`}>
                  Certifications & Diplomas
                </h2>
                <p className={`text-xs ${currentTheme.cardSubtext} font-medium`}>
                  Verified Diplomas, Global Accreditations & Specialized Symposiums
                </p>
              </div>
            </div>
            <span className={`text-xs font-bold ${currentTheme.accentBadgeText} ${currentTheme.accentBadgeBg} px-3.5 py-1.5 rounded-xl border ${currentTheme.accentBadgeBorder} self-start sm:self-auto`}>
              4 Verified Accreditations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CERTIFICATIONS_LIST.map((cert) => (
              <div
                key={cert.id}
                id={`cert-item-${cert.id}`}
                className={`${currentTheme.cardBg} ${currentTheme.cardText} rounded-3xl p-5 sm:p-6 border ${currentTheme.cardBorder} shadow-xl ${currentTheme.cardHover} transition-all flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className={`w-4 h-4 ${currentTheme.accentText}`} />
                    <span className={`text-[11px] font-bold ${currentTheme.accentText} uppercase tracking-wider`}>
                      Verified Credential
                    </span>
                  </div>

                  <h3 className={`text-base font-bold ${currentTheme.cardHeading} leading-snug`}>
                    {cert.title}
                  </h3>

                  {cert.organization && (
                    <p className={`text-xs ${currentTheme.cardSubtext} mt-1.5 leading-relaxed`}>
                      {cert.organization}
                    </p>
                  )}
                </div>

                {cert.date && (
                  <div className={`mt-4 pt-3 border-t ${currentTheme.sectionBorder} flex items-center justify-between text-xs`}>
                    <span className={`${currentTheme.cardSubtext} font-medium`}>Timeline:</span>
                    <span className={`inline-flex items-center gap-1 font-semibold ${currentTheme.accentBadgeText} ${currentTheme.accentBadgeBg} px-2.5 py-1 rounded-lg border ${currentTheme.accentBadgeBorder}`}>
                      <Calendar className="w-3 h-3 opacity-80" />
                      {cert.date}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CURRICULUM VITAE & PDF RESUME SECTION */}
        <section id="resume" className="space-y-6 pt-2">
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b ${currentTheme.sectionBorder} gap-2`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${currentTheme.accentGradient} flex items-center justify-center font-black shadow-md`}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className={`text-2xl font-extrabold ${currentTheme.heroHeading} tracking-tight`}>
                  Curriculum Vitae / Resume
                </h2>
                <p className={`text-xs ${currentTheme.cardSubtext} font-medium`}>
                  Comprehensive Academic, Technical & Industry Credentials in Verified PDF Format
                </p>
              </div>
            </div>
            <div className={`inline-flex items-center gap-2 text-xs font-bold ${currentTheme.accentBadgeText} ${currentTheme.accentBadgeBg} px-3.5 py-1.5 rounded-xl border ${currentTheme.accentBadgeBorder} self-start sm:self-auto`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>ATS-Compliant & Verified</span>
            </div>
          </div>

          {/* Interactive Resume Card */}
          <div className={`${currentTheme.heroBg} ${currentTheme.cardText} rounded-3xl p-6 sm:p-8 border ${currentTheme.heroBorder} shadow-2xl overflow-hidden relative`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Quick Snapshot Summary */}
              <div className="lg:col-span-7 space-y-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 ${currentTheme.accentBadgeBg} border ${currentTheme.accentBadgeBorder} ${currentTheme.accentBadgeText} rounded-full text-xs font-extrabold`}>
                  <GraduationCap className="w-3.5 h-3.5 opacity-80" />
                  <span>Sandhiya_P_Resume.pdf • Updated 2026</span>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-black ${currentTheme.heroHeading} tracking-tight`}>
                  Official Technical & Academic Resume
                </h3>

                <p className={`text-sm ${currentTheme.heroText} leading-relaxed`}>
                  Synthesized from all portfolio milestones, including my <strong className={currentTheme.accentText}>MCA (8.50 CGPA)</strong> and <strong className={currentTheme.accentText}>BCA (8.78 CGPA)</strong>, <strong className={currentTheme.accentText}>4 industry internships</strong> across Data Analytics, IoT/Sensors, UI/UX, and Python, international AI conference awards, and software projects.
                </p>

                {/* Highlights Pill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className={`p-2.5 rounded-xl ${currentTheme.innerBoxBg} border ${currentTheme.innerBoxBorder} text-xs`}>
                    <span className={`text-[10px] ${currentTheme.cardSubtext} font-bold uppercase block`}>Postgraduate</span>
                    <span className={`font-extrabold ${currentTheme.accentText}`}>MCA • 8.50 CGPA</span>
                  </div>
                  <div className={`p-2.5 rounded-xl ${currentTheme.innerBoxBg} border ${currentTheme.innerBoxBorder} text-xs`}>
                    <span className={`text-[10px] ${currentTheme.cardSubtext} font-bold uppercase block`}>Undergraduate</span>
                    <span className={`font-extrabold ${currentTheme.accentText}`}>BCA • 8.78 CGPA</span>
                  </div>
                  <div className={`p-2.5 rounded-xl ${
                    currentTheme.isLight ? 'bg-amber-50 border-amber-300' : 'bg-amber-950/60 border-amber-500/40'
                  } border text-xs col-span-2 sm:col-span-1`}>
                    <span className="text-[10px] text-amber-500 font-bold uppercase block">Research Award</span>
                    <span className={`font-extrabold ${currentTheme.isLight ? 'text-amber-900' : 'text-amber-300'}`}>Best Paper Award</span>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    id="resume-section-open-btn"
                    onClick={() => setResumeModalOpen(true)}
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl ${currentTheme.primaryBtn} text-sm transition-all active:scale-98 cursor-pointer`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Open Interactive PDF Resume</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setResumeModalOpen(true)}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl ${currentTheme.secondaryBtn} text-sm transition-all active:scale-98 cursor-pointer`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Quick Preview & Print</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Visual Simulated PDF Page Preview */}
              <div className="lg:col-span-5 flex justify-center">
                <div 
                  onClick={() => setResumeModalOpen(true)}
                  className={`w-full max-w-[300px] ${currentTheme.cardBg} p-5 rounded-2xl border ${currentTheme.cardBorder} shadow-xl hover:shadow-2xl transition-all cursor-pointer group text-center space-y-3 relative overflow-hidden`}
                  title="Click to open interactive PDF resume"
                >
                  <div className={`w-12 h-12 rounded-2xl ${currentTheme.accentGradient} flex items-center justify-center mx-auto shadow-md group-hover:scale-105 transition-transform`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`text-sm font-black ${currentTheme.cardHeading}`}>
                      Sandhiya_P_Resume.pdf
                    </div>
                    <div className={`text-[11px] ${currentTheme.cardSubtext} font-semibold mt-0.5`}>
                      Executive A4 Format • Multi-Theme Supported
                    </div>
                  </div>
                  <div className={`space-y-1.5 text-left text-[11px] ${currentTheme.innerBoxText} ${currentTheme.innerBoxBg} p-3.5 rounded-xl border ${currentTheme.innerBoxBorder} shadow-2xs`}>
                    <div className={`font-extrabold ${currentTheme.cardHeading} border-b ${currentTheme.sectionBorder} pb-1.5 flex justify-between items-center`}>
                      <span>SANDHIYA P</span>
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded border ${currentTheme.accentBadgeBg} ${currentTheme.accentBadgeBorder} ${currentTheme.accentBadgeText}`}>MCA Candidate</span>
                    </div>
                    <div className={`${currentTheme.cardSubtext} font-medium pt-1`}>• <strong className={currentTheme.accentText}>MCA (8.50)</strong> & <strong className={currentTheme.accentText}>BCA (8.78)</strong></div>
                    <div className={`${currentTheme.cardSubtext} font-medium`}>• <strong className={currentTheme.accentText}>4 Internships</strong> (Analytics, IoT, UI/UX, Python)</div>
                    <div className={`${currentTheme.cardSubtext} font-medium`}>• <strong className="text-amber-500">Best Paper Award</strong> (AI Conf Jan 2026)</div>
                    <div className={`${currentTheme.cardSubtext} font-medium`}>• <strong className={currentTheme.accentText}>Full-Stack Projects & Certifications</strong></div>
                  </div>
                  <div className={`pt-1 text-xs font-extrabold ${currentTheme.accentText} group-hover:underline flex items-center justify-center gap-1`}>
                    <span>Click to View Full Document</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CONTACT & DIRECT COMMUNICATION */}
        <ContactSection />
      </main>

      {/* Professional Footer */}
      <footer className={`w-full ${currentTheme.footerBg} ${currentTheme.footerBorder} py-10 mt-12 transition-colors duration-200`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl ${currentTheme.accentGradient} flex items-center justify-center font-black text-xs shadow-md`}>
              SP
            </div>
            <div>
              <div className={`text-sm font-black ${currentTheme.footerText} tracking-tight`}>
                {PERSONAL_INFO.name}
              </div>
              <div className={`text-xs ${currentTheme.accentText} font-semibold mt-0.5`}>
                {PERSONAL_INFO.title}
              </div>
            </div>
          </div>

          <div className={`flex flex-wrap items-center justify-center gap-6 text-xs font-bold ${currentTheme.footerSubtext}`}>
            <button
              type="button"
              onClick={() => setResumeModalOpen(true)}
              className={`hover:opacity-100 transition-colors inline-flex items-center gap-1.5 cursor-pointer ${currentTheme.accentText} font-bold`}
            >
              <FileText className="w-3.5 h-3.5" />
              Resume (PDF)
            </button>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-colors inline-flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:opacity-100 transition-colors inline-flex items-center gap-1.5 ${currentTheme.accentText}`}
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:opacity-100 transition-colors inline-flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              {PERSONAL_INFO.email}
            </a>
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="hover:opacity-100 transition-colors inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 {PERSONAL_INFO.phone}
            </a>
          </div>

          <div className={`text-xs ${currentTheme.footerSubtext} font-medium`}>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Interactive PDF Resume Modal Viewer */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        candidatePhoto={candidatePhoto}
      />

      {/* Profile Photo Manager / Upload Modal */}
      <PhotoManagerModal
        isOpen={photoModalOpen}
        onClose={() => setPhotoModalOpen(false)}
        currentPhoto={candidatePhoto}
        onUpdatePhoto={handleUpdatePhoto}
        onRemovePhoto={handleResetPhoto}
      />

      {/* Floating Photo Update Toast Notification */}
      {photoToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-2xl border border-emerald-400/40 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
          <span>{photoToast}</span>
        </div>
      )}
    </div>
  );
}
