import React, { useRef, useState, useEffect } from 'react';
import { 
  Download, 
  Printer, 
  X, 
  Copy, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Award, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  FolderGit2, 
  CheckCircle2,
  Palette,
  Layout,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { 
  PERSONAL_INFO, 
  EDUCATION_LIST, 
  INTERNSHIPS_LIST, 
  SKILL_CATEGORIES, 
  PROJECTS_LIST, 
  ACHIEVEMENTS_LIST, 
  CERTIFICATIONS_LIST 
} from '../data';
import { 
  downloadResumePdf, 
  ResumeTheme, 
  ResumeLayout 
} from '../utils/generateResumePdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidatePhoto?: string | null;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, candidatePhoto }) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(85);
  const [selectedTheme, setSelectedTheme] = useState<ResumeTheme>('navy');
  const [selectedLayout, setSelectedLayout] = useState<ResumeLayout>('executive');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Close on Escape key & manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Zoom controls
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 140));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 60));
  const handleFitPage = () => setZoomLevel(80);
  const handleActualSize = () => setZoomLevel(100);

  // Direct Vector PDF Download matching the selected layout & theme
  const handleDownload = () => {
    try {
      setIsGenerating(true);
      downloadResumePdf(selectedTheme, selectedLayout);
      showToast('1-Page Executive PDF downloaded successfully!');
    } catch (err) {
      console.error('PDF Download Error:', err);
      window.print();
    } finally {
      setIsGenerating(false);
    }
  };

  // Print function
  const handlePrint = () => {
    try {
      const resumeElement = resumeRef.current;
      if (!resumeElement) {
        window.print();
        return;
      }

      const printIframe = document.createElement('iframe');
      printIframe.style.position = 'fixed';
      printIframe.style.top = '-9999px';
      printIframe.style.left = '-9999px';
      printIframe.style.width = '210mm';
      printIframe.style.height = '297mm';
      printIframe.style.border = 'none';
      document.body.appendChild(printIframe);

      const frameDoc = printIframe.contentWindow?.document;
      if (!frameDoc) {
        window.print();
        return;
      }

      frameDoc.open();
      frameDoc.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>Sandhiya_P_Resume</title>
            <style>
              @page {
                size: A4 portrait;
                margin: 0;
              }
              *, *::before, *::after {
                box-sizing: border-box;
              }
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                background: #ffffff !important;
                color: #0f172a !important;
                margin: 0;
                padding: 0;
                font-size: 9.5pt;
                line-height: 1.35;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            </style>
          </head>
          <body>
            ${resumeElement.innerHTML}
          </body>
        </html>
      `);
      frameDoc.close();

      setTimeout(() => {
        try {
          printIframe.contentWindow?.focus();
          printIframe.contentWindow?.print();
          showToast('Print dialog opened.');
        } catch {
          window.print();
        } finally {
          setTimeout(() => {
            if (document.body.contains(printIframe)) {
              document.body.removeChild(printIframe);
            }
          }, 3000);
        }
      }, 400);
    } catch {
      window.print();
    }
  };

  // Plaintext ATS Copy function
  const handleCopyText = async () => {
    const textContent = `
SANDHIYA P
Master of Computer Applications (MCA) Candidate
Trichy, Tamil Nadu, India | Phone: +91 ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email}
LinkedIn: ${PERSONAL_INFO.linkedin}
GitHub: ${PERSONAL_INFO.github}

PROFESSIONAL SUMMARY
${PERSONAL_INFO.bio}

EDUCATION
- Master of Computer Applications (MCA) | Holy Cross College (Autonomous), Trichy (2025 - 2027) | CGPA: 8.50 / 10
- Bachelor of Computer Applications (BCA) | Seethalakshmi Ramaswami College (Autonomous), Trichy (2022 - 2025) | CGPA: 8.78 / 10

TECHNICAL SKILLS
- Languages: Java, Python 3, JavaScript (ES6+), C Programming, PHP, HTML5, CSS3, SQL
- Database & Backend: MySQL, PostgreSQL, Relational Schema Design, RESTful APIs, Query Optimization
- Specialized Domains: Data Analytics & Business Intelligence, IoT & Sensor Architecture, UI/UX Design (Figma), Academic Research Writing
- Developer Tools: VS Code, Git & GitHub, Microsoft Excel (Advanced Modeling), PowerPoint, Linux CLI

PREFERRED INTERESTS
- UI/UX Design: Figma, Interactive Wireframing, Usability Heuristics, Design Systems
- Prompt Engineering: LLM Conditioning, Few-Shot Prompting, Chain-of-Thought Workflows, Structured Outputs
- Web Development: Full-Stack & Frontend Architecture, React, TypeScript, HTML5/CSS3, SQL, REST APIs

INDUSTRY INTERNSHIPS
- Data Analytics Intern | T4TEQ Software Solutions (Feb 2026)
  * Evaluated large-scale tabular datasets, designed structured analytical pipelines, and produced actionable visualization reports.
- Sensor Technology & IoT Intern | HCIICT, Holy Cross College (Sep 2025)
  * Integrated sensor hardware, real-time telemetry extraction, and signal processing protocols.
- UI/UX Design Intern | RTS Invention (Sep - Oct 2023)
  * Architected high-fidelity component libraries, intuitive wireframes, and user journey flows in Figma.
- Python Programming Intern | Greensoft Groups (Jan 2023)
  * Developed modular object-oriented backend scripts and computational database automation tools.

KEY PROJECTS
- Student Result Management System (PHP, MySQL, JavaScript, HTML/CSS)
  * Role-based access control, relational database schema, automated grade evaluation and report generator.
- CivicConnect – Public Grievance Platform (Web Platform, SQL, Geo-tagging)
  * Location-tagged incident reporting, administrative triage dashboard, and real-time status tracking.

HONORS & RESEARCH PUBLICATIONS
- Best Paper Award – International AI Conference (Jan 2026, St. Joseph's College & Globethics)
- Research Presentation on Next-Gen AI & Sustainable Tech (Jan 2026)
- Published Paper: "Internet of Things: A Review" (CTCS-2K24, Aug 2024)
- Student Council Member Appreciation (2024 - 2025)

CERTIFICATIONS
- Diploma in Information Technology (2022 - 2025)
- Basics of Python Certification (UniAthena / Cambridge Qualifications UK)
- Next Gen AI Symposium (HCIICT, Holy Cross College, 2025)
- Professional Placement & Aptitude Training (Dec 2024)
`.trim();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textContent);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textContent;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      showToast('ATS Plaintext copied to clipboard!');
    } catch {
      showToast('Text copied!');
    }
  };

  // Theme styling helpers
  const getThemeStyles = () => {
    switch (selectedTheme) {
      case 'classic':
        return {
          bannerBg: 'bg-[#18181b]',
          bannerText: 'text-white',
          accentColor: 'text-zinc-900',
          accentBg: 'bg-zinc-100',
          accentBorder: 'border-zinc-300',
          badgeBg: 'bg-zinc-900 text-white',
          pillBg: 'bg-zinc-100 text-zinc-800 border-zinc-300',
          headerRule: 'border-zinc-800',
          sectionIcon: 'text-zinc-900',
          scoreBadge: 'bg-zinc-100 text-zinc-900 border-zinc-400',
          sidebarBg: 'bg-zinc-50 border-r border-zinc-200',
          tagColor: 'text-zinc-800 bg-zinc-100 border-zinc-300',
        };
      case 'emerald':
        return {
          bannerBg: 'bg-[#064e3b]',
          bannerText: 'text-white',
          accentColor: 'text-emerald-800',
          accentBg: 'bg-emerald-50',
          accentBorder: 'border-emerald-200',
          badgeBg: 'bg-emerald-700 text-white',
          pillBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
          headerRule: 'border-emerald-800',
          sectionIcon: 'text-emerald-700',
          scoreBadge: 'bg-emerald-50 text-emerald-900 border-emerald-300',
          sidebarBg: 'bg-emerald-50/40 border-r border-emerald-200',
          tagColor: 'text-emerald-900 bg-emerald-50 border-emerald-200',
        };
      case 'burgundy':
        return {
          bannerBg: 'bg-[#881337]',
          bannerText: 'text-white',
          accentColor: 'text-rose-900',
          accentBg: 'bg-rose-50',
          accentBorder: 'border-rose-200',
          badgeBg: 'bg-rose-700 text-white',
          pillBg: 'bg-rose-50 text-rose-900 border-rose-200',
          headerRule: 'border-rose-800',
          sectionIcon: 'text-rose-700',
          scoreBadge: 'bg-rose-50 text-rose-900 border-rose-300',
          sidebarBg: 'bg-rose-50/30 border-r border-rose-200',
          tagColor: 'text-rose-900 bg-rose-50 border-rose-200',
        };
      case 'navy':
      default:
        return {
          bannerBg: 'bg-[#042832]',
          bannerText: 'text-white',
          accentColor: 'text-teal-900',
          accentBg: 'bg-teal-50',
          accentBorder: 'border-teal-200',
          badgeBg: 'bg-teal-800 text-white',
          pillBg: 'bg-teal-50/80 text-teal-950 border-teal-200',
          headerRule: 'border-teal-900',
          sectionIcon: 'text-teal-700',
          scoreBadge: 'bg-teal-50 text-teal-900 border-teal-300',
          sidebarBg: 'bg-teal-50/40 border-r border-teal-200',
          tagColor: 'text-teal-900 bg-teal-50 border-teal-200',
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-slate-950/85 backdrop-blur-md overflow-hidden animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      {/* Top Professional PDF Control Bar */}
      <div className="no-print bg-[#020813] text-white border-b border-blue-950 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xl shrink-0">
        
        {/* Title & Document Badge */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 flex items-center justify-center text-teal-950 shadow-lg shadow-teal-500/30">
            <FileText className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 id="resume-modal-title" className="text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Sandhiya_P_Resume.pdf</span>
              <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 bg-teal-500/20 text-teal-300 border border-teal-500/40 rounded-full">
                1-Page Executive Format
              </span>
            </h2>
            <p className="text-[11px] text-teal-200/90 font-medium">
              Verified Master of Computer Applications (MCA) Curriculum Vitae
            </p>
          </div>
        </div>

        {/* Template Layout Chooser */}
        <div className="hidden md:flex items-center bg-[#05172d] border border-blue-950 rounded-xl p-1 gap-1 text-xs">
          <span className="px-2 text-teal-300 font-semibold flex items-center gap-1">
            <Layout className="w-3.5 h-3.5" /> Layout:
          </span>
          <button
            type="button"
            onClick={() => setSelectedLayout('executive')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              selectedLayout === 'executive'
                ? 'bg-gradient-to-r from-teal-400 to-cyan-600 text-teal-950 shadow-xs font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Executive Modern
          </button>
          <button
            type="button"
            onClick={() => setSelectedLayout('classic')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              selectedLayout === 'classic'
                ? 'bg-gradient-to-r from-teal-400 to-cyan-600 text-teal-950 shadow-xs font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Classic Ivy (ATS)
          </button>
          <button
            type="button"
            onClick={() => setSelectedLayout('tech-split')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
              selectedLayout === 'tech-split'
                ? 'bg-gradient-to-r from-teal-400 to-cyan-600 text-teal-950 shadow-xs font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Tech Sidebar
          </button>
        </div>

        {/* Theme Color Chooser */}
        <div className="hidden lg:flex items-center bg-[#05172d] border border-blue-950 rounded-xl p-1 gap-1 text-xs">
          <span className="px-2 text-teal-300 font-semibold flex items-center gap-1">
            <Palette className="w-3.5 h-3.5" /> Color:
          </span>
          <button
            type="button"
            onClick={() => setSelectedTheme('navy')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedTheme === 'navy'
                ? 'bg-gradient-to-r from-teal-400 to-cyan-600 text-teal-950 shadow-xs font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#030c18] border border-teal-400 inline-block" />
            <span>Deep Navy</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedTheme('classic')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedTheme === 'classic'
                ? 'bg-zinc-800 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#18181b] border border-white/50 inline-block" />
            <span>Onyx</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedTheme('emerald')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedTheme === 'emerald'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#0f766e] border border-white/50 inline-block" />
            <span>Ocean Teal</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedTheme('burgundy')}
            className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedTheme === 'burgundy'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#881337] border border-white/50 inline-block" />
            <span>Burgundy</span>
          </button>
        </div>

        {/* Center Zoom Controls & Fit Presets */}
        <div className="flex items-center bg-[#05172d] border border-blue-950 rounded-xl px-2 py-1 gap-1">
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-mono font-bold px-1.5 text-teal-300 min-w-[40px] text-center">
            {zoomLevel}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleFitPage}
            className={`px-2 py-0.5 rounded text-[11px] font-bold border-l border-blue-950 ml-1 transition-colors cursor-pointer ${
              zoomLevel === 80 ? 'bg-teal-600 text-white font-bold' : 'text-teal-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="Fit Entire Page on Screen"
          >
            Fit Page
          </button>
          <button
            type="button"
            onClick={handleActualSize}
            className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
              zoomLevel === 100 ? 'bg-teal-600 text-white font-bold' : 'text-teal-300 hover:text-white hover:bg-slate-800/60'
            }`}
            title="100% Standard Scale"
          >
            100%
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Copy Plaintext ATS */}
          <button
            type="button"
            onClick={handleCopyText}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#05172d] hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-bold border border-blue-950 transition-all cursor-pointer active:scale-95 shadow-xs"
            title="Copy ATS-Friendly Plain Text"
          >
            <Copy className="w-3.5 h-3.5 text-teal-300" />
            <span>Copy Text</span>
          </button>

          {/* Print / Save PDF */}
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#081d38] hover:bg-slate-800 text-white text-xs font-bold border border-teal-500/30 transition-all active:scale-95 shadow-xs cursor-pointer"
            title="Print or Save via Browser Print Dialog"
          >
            <Printer className="w-3.5 h-3.5 text-teal-300" />
            <span className="hidden sm:inline">Print / Save</span>
            <span className="sm:hidden">Print</span>
          </button>

          {/* Direct High-Resolution 1-Page PDF Download */}
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-400 via-teal-500 to-cyan-600 hover:from-teal-300 hover:to-cyan-500 disabled:opacity-60 text-teal-950 text-xs font-black shadow-lg shadow-teal-600/30 transition-all active:scale-95 cursor-pointer"
            title="Download 1-Page PDF Resume with exact on-screen styling"
          >
            {isGenerating ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 text-teal-950 animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-teal-950" />
                <span>Download PDF</span>
              </>
            )}
          </button>

          {/* Close Modal */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-red-600 text-slate-300 hover:text-white transition-colors cursor-pointer ml-1"
            aria-label="Close resume modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-60 px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center gap-2.5 shadow-2xl border border-blue-500/40 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main PDF Scrollable Document Canvas - perfectly centered with smooth scrolling */}
      <div className="flex-1 overflow-y-auto overflow-x-auto p-2 sm:p-6 flex justify-center items-start bg-slate-900/90 custom-pdf-viewer-area">
        <div 
          className="transition-transform duration-200 origin-top flex flex-col items-center my-auto"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
        >
          {/* Printable 1-Page A4 Sheet */}
          <div 
            ref={resumeRef}
            id="sandhiya-resume-document"
            className="w-[210mm] min-h-[297mm] max-w-[210mm] bg-white text-slate-900 shadow-2xl rounded-sm border border-slate-200 text-[11px] leading-[1.35] font-sans antialiased box-border print:border-none print:shadow-none print:m-0 overflow-hidden flex flex-col justify-between"
          >
            {/* ========================================================================= */}
            {/* TEMPLATE 1: EXECUTIVE MODERN LAYOUT */}
            {/* ========================================================================= */}
            {selectedLayout === 'executive' && (
              <>
                {/* Header Banner */}
                <div className={`${themeStyles.bannerBg} ${themeStyles.bannerText} px-6 py-4.5 transition-colors shrink-0`}>
                  <div className="flex flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      {candidatePhoto && (
                        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white/40 shadow-sm shrink-0 bg-slate-800">
                          <img
                            src={candidatePhoto}
                            alt={PERSONAL_INFO.name}
                            className="w-full h-full object-cover object-center"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div>
                        <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase">
                          {PERSONAL_INFO.name}
                        </h1>
                        <p className="text-xs font-bold opacity-95 tracking-wide mt-0.5 uppercase text-blue-200">
                          Master of Computer Applications (MCA) Candidate
                        </p>
                        <p className="text-[10px] opacity-80 mt-0.5">
                          Full-Stack Software Engineering • Data Analytics • Sensor IoT Systems
                        </p>
                      </div>
                    </div>
                    
                    {/* Contact Information */}
                    <div className="text-right text-[10.5px] font-medium space-y-0.5 opacity-95">
                      <div className="flex items-center justify-end gap-1.5">
                        <MapPin className="w-3 h-3 shrink-0 opacity-80" />
                        <span>{PERSONAL_INFO.location}</span>
                      </div>
                      <div className="flex items-center justify-end gap-1.5">
                        <Phone className="w-3 h-3 shrink-0 opacity-80" />
                        <span>+91 {PERSONAL_INFO.phone}</span>
                      </div>
                      <div className="flex items-center justify-end gap-1.5">
                        <Mail className="w-3 h-3 shrink-0 opacity-80" />
                        <span className="font-bold underline">{PERSONAL_INFO.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Profiles Bar */}
                  <div className="flex flex-wrap items-center gap-4 mt-2.5 pt-2 border-t border-white/20 text-[10.5px] font-semibold">
                    <a 
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:underline opacity-90 hover:opacity-100"
                    >
                      <Linkedin className="w-3 h-3" />
                      <span>linkedin.com/in/sandhiya-padmanaban</span>
                    </a>
                    <span className="opacity-40">•</span>
                    <a 
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:underline opacity-90 hover:opacity-100"
                    >
                      <Github className="w-3 h-3" />
                      <span>github.com/Sandhiya-Padmanaban</span>
                    </a>
                  </div>
                </div>

                {/* Body Content */}
                <div className="px-6 py-4 space-y-3.5 bg-white flex-1 flex flex-col justify-between">
                  
                  {/* Summary */}
                  <div>
                    <h2 className={`text-[11px] font-black uppercase tracking-wider ${themeStyles.accentColor} flex items-center gap-1.5 pb-1 mb-2 border-b-2 ${themeStyles.headerRule}`}>
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Professional Summary</span>
                    </h2>
                    <p className="text-[10.5px] text-slate-700 leading-relaxed text-justify">
                      Distinguished <strong>Master of Computer Applications (MCA)</strong> candidate with a strong academic foundation (<strong>8.50 MCA CGPA / 8.78 BCA CGPA</strong>) and practical experience across four specialized internships in <strong>Data Analytics, Sensor Technology & IoT, UI/UX Design, and Python Backend Development</strong>. Winner of the <strong>Best Paper Award at an International AI Conference</strong> for research in next-generation computing architectures. Seeking software engineering and analytics roles to build high-impact, data-driven solutions.
                    </p>
                  </div>

                  {/* Education & Skills */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h2 className={`text-[11px] font-black uppercase tracking-wider ${themeStyles.accentColor} flex items-center gap-1.5 pb-1 mb-2 border-b-2 ${themeStyles.headerRule}`}>
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Education</span>
                      </h2>
                      <div className="space-y-2">
                        {EDUCATION_LIST.map((edu) => (
                          <div key={edu.id} className="text-[10.5px]">
                            <div className="flex justify-between items-baseline">
                              <span className="font-extrabold text-slate-950 text-[11px]">{edu.degree}</span>
                              <span className={`font-extrabold px-1.5 py-0.2 rounded border text-[10px] ${themeStyles.scoreBadge}`}>
                                {edu.score}
                              </span>
                            </div>
                            <div className="text-slate-700 font-medium text-[10px]">{edu.institution}</div>
                            <div className="text-slate-500 text-[9.5px] font-semibold">{edu.location} | {edu.duration}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className={`text-[11px] font-black uppercase tracking-wider ${themeStyles.accentColor} flex items-center gap-1.5 pb-1 mb-2 border-b-2 ${themeStyles.headerRule}`}>
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Technical Skills</span>
                      </h2>
                      <div className="space-y-1.5 text-[10px]">
                        {SKILL_CATEGORIES.map((cat) => (
                          <div key={cat.category} className="flex items-baseline gap-1">
                            <span className="font-extrabold text-slate-900 shrink-0">{cat.category}:</span>
                            <span className="text-slate-700 font-medium">
                              {cat.skills.map(s => s.name).join(', ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Internships */}
                  <div>
                    <h2 className={`text-[11px] font-black uppercase tracking-wider ${themeStyles.accentColor} flex items-center gap-1.5 pb-1 mb-2 border-b-2 ${themeStyles.headerRule}`}>
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Industry Internship Experience</span>
                    </h2>
                    <div className="space-y-2 text-[10.5px]">
                      {INTERNSHIPS_LIST.map((intern) => (
                        <div key={intern.id} className="space-y-0.5">
                          <div className="flex flex-row items-baseline justify-between gap-1">
                            <div>
                              <span className="font-extrabold text-slate-950 text-[11px]">{intern.domain} Intern</span>
                              <span className="text-slate-600 font-semibold"> — {intern.company}</span>
                            </div>
                            <span className="text-slate-500 font-bold text-[9.5px] shrink-0">{intern.duration} | {intern.location}</span>
                          </div>
                          <p className="text-slate-700 text-[10px] leading-snug">
                            • {intern.description}
                          </p>
                          <div className="text-[9.5px] text-slate-500 font-medium italic">
                            Technologies: {intern.techStack.join(' • ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects & Honors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h2 className={`text-[11px] font-black uppercase tracking-wider ${themeStyles.accentColor} flex items-center gap-1.5 pb-1 mb-2 border-b-2 ${themeStyles.headerRule}`}>
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>Key Projects</span>
                      </h2>
                      <div className="space-y-2 text-[10px]">
                        {PROJECTS_LIST.map((proj) => (
                          <div key={proj.id} className="space-y-0.5">
                            <div className="flex justify-between items-baseline">
                              <span className="font-extrabold text-slate-950 text-[10.5px]">{proj.title}</span>
                              <span className="text-blue-800 font-bold text-[9px]">{proj.techTags.slice(0, 3).join(', ')}</span>
                            </div>
                            <p className="text-slate-700 leading-snug">
                              • {proj.description}
                            </p>
                            {proj.details.length > 0 && (
                              <div className="text-slate-500 text-[9.5px]">
                                - {proj.details[0]}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className={`text-[11px] font-black uppercase tracking-wider ${themeStyles.accentColor} flex items-center gap-1.5 pb-1 mb-2 border-b-2 ${themeStyles.headerRule}`}>
                        <Award className="w-3.5 h-3.5" />
                        <span>Honors & Certifications</span>
                      </h2>
                      <div className="space-y-1.5 text-[10px]">
                        {ACHIEVEMENTS_LIST.slice(0, 3).map((ach) => (
                          <div key={ach.id} className="flex justify-between items-baseline">
                            <div className="pr-1">
                              <span className="font-bold text-slate-900">• {ach.title}</span>
                              <span className="text-slate-500 text-[9.5px]"> — {ach.organization}</span>
                            </div>
                            <span className="text-slate-400 font-semibold text-[9px] shrink-0">{ach.date}</span>
                          </div>
                        ))}
                        {CERTIFICATIONS_LIST.slice(0, 2).map((cert) => (
                          <div key={cert.id} className="flex justify-between items-baseline pt-0.5">
                            <div className="pr-1">
                              <span className="font-bold text-slate-900">• {cert.title}</span>
                              <span className="text-slate-500 text-[9.5px]"> — {cert.organization}</span>
                            </div>
                            <span className="text-slate-400 font-semibold text-[9px] shrink-0">{cert.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer */}
                <div className="border-t border-slate-200 px-6 py-2 bg-slate-50 text-center text-[9px] text-slate-500 font-medium shrink-0">
                  Sandhiya P — Curriculum Vitae (MCA)  |  padhasandhiya@gmail.com  |  Single Page Executive Format
                </div>
              </>
            )}

            {/* ========================================================================= */}
            {/* TEMPLATE 2: CLASSIC IVY / ATS MINIMALIST LAYOUT */}
            {/* ========================================================================= */}
            {selectedLayout === 'classic' && (
              <div className="p-8 space-y-4 bg-white flex-1 flex flex-col justify-between font-serif">
                {/* Header */}
                <div className="text-center space-y-1 pb-3 border-b-2 border-slate-900">
                  <h1 className="text-2xl font-bold tracking-wider text-slate-900 uppercase font-serif">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="text-xs font-sans text-slate-700 font-medium">
                    {PERSONAL_INFO.location}  •  +91 {PERSONAL_INFO.phone}  •  {PERSONAL_INFO.email}
                  </p>
                  <p className="text-xs font-sans text-slate-600 font-medium">
                    linkedin.com/in/sandhiya-padmanaban  •  github.com/Sandhiya-Padmanaban
                  </p>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-[12px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-serif">
                    Education
                  </h2>
                  <div className="space-y-2 font-sans text-[10.5px]">
                    {EDUCATION_LIST.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{edu.institution}</span>
                          <span className="text-slate-600 font-normal">{edu.location} | {edu.duration}</span>
                        </div>
                        <div className="flex justify-between text-slate-800 italic">
                          <span>{edu.degree}</span>
                          <span className="font-bold text-slate-900 not-italic">CGPA: {edu.score}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Skills */}
                <div>
                  <h2 className="text-[12px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-serif">
                    Technical Skills
                  </h2>
                  <div className="space-y-1 font-sans text-[10.5px]">
                    {SKILL_CATEGORIES.map((cat) => (
                      <div key={cat.category} className="flex">
                        <span className="font-bold text-slate-900 w-36 shrink-0">• {cat.category}:</span>
                        <span className="text-slate-800">{cat.skills.map(s => s.name).join(', ')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h2 className="text-[12px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-serif">
                    Professional Internship Experience
                  </h2>
                  <div className="space-y-2 font-sans text-[10.5px]">
                    {INTERNSHIPS_LIST.map((intern) => (
                      <div key={intern.id} className="space-y-0.5">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{intern.company} — {intern.domain} Intern</span>
                          <span className="text-slate-600 font-normal">{intern.duration} | {intern.location}</span>
                        </div>
                        <p className="text-slate-700">• {intern.description}</p>
                        <p className="text-[9.5px] text-slate-500 italic">Tools: {intern.techStack.join(', ')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h2 className="text-[12px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-serif">
                    Software Projects
                  </h2>
                  <div className="space-y-2 font-sans text-[10.5px]">
                    {PROJECTS_LIST.map((proj) => (
                      <div key={proj.id} className="space-y-0.5">
                        <div className="flex justify-between font-bold text-slate-900">
                          <span>{proj.title}</span>
                          <span className="text-slate-600 font-semibold text-[9.5px]">[ {proj.techTags.join(', ')} ]</span>
                        </div>
                        <p className="text-slate-700">• {proj.description}</p>
                        {proj.details.length > 0 && (
                          <p className="text-[9.5px] text-slate-500 pl-2">- {proj.details[0]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Honors */}
                <div>
                  <h2 className="text-[12px] font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-serif">
                    Honors & Certifications
                  </h2>
                  <div className="space-y-1 font-sans text-[10px]">
                    {ACHIEVEMENTS_LIST.slice(0, 2).map((ach) => (
                      <div key={ach.id} className="flex justify-between">
                        <span>• <strong className="text-slate-900">{ach.title}</strong> — {ach.organization}</span>
                        <span className="text-slate-500">{ach.date}</span>
                      </div>
                    ))}
                    {CERTIFICATIONS_LIST.slice(0, 2).map((cert) => (
                      <div key={cert.id} className="flex justify-between">
                        <span>• <strong className="text-slate-900">{cert.title}</strong> — {cert.organization}</span>
                        <span className="text-slate-500">{cert.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TEMPLATE 3: TECH SPLIT SIDEBAR LAYOUT */}
            {/* ========================================================================= */}
            {selectedLayout === 'tech-split' && (
              <div className="flex flex-1 min-h-[297mm]">
                {/* Left Sidebar (32%) */}
                <div className={`w-[66mm] p-5 space-y-4 ${themeStyles.sidebarBg} shrink-0 text-[10.5px] flex flex-col justify-between`}>
                  <div className="space-y-4">
                    {/* Identity */}
                    <div className="text-center sm:text-left">
                      {candidatePhoto && (
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-300 shadow-sm mx-auto sm:mx-0 mb-2.5 bg-slate-800">
                          <img
                            src={candidatePhoto}
                            alt={PERSONAL_INFO.name}
                            className="w-full h-full object-cover object-center"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <h1 className="text-xl font-black uppercase tracking-tight text-slate-950">
                        {PERSONAL_INFO.name}
                      </h1>
                      <p className={`text-xs font-extrabold uppercase mt-0.5 ${themeStyles.accentColor}`}>
                        MCA Candidate
                      </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-2 border-t border-slate-200/80 pt-3">
                      <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                        Contact
                      </h2>
                      <div className="space-y-1.5 text-[10px] text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{PERSONAL_INFO.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>+91 {PERSONAL_INFO.phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 break-all">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-bold underline">{PERSONAL_INFO.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Github className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>github.com/...</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Linkedin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>linkedin.com/...</span>
                        </div>
                      </div>
                    </div>

                    {/* Education */}
                    <div className="space-y-2 border-t border-slate-200/80 pt-3">
                      <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                        Education
                      </h2>
                      <div className="space-y-2 text-[10px]">
                        {EDUCATION_LIST.map((edu) => (
                          <div key={edu.id}>
                            <div className="font-extrabold text-slate-950">{edu.degree}</div>
                            <div className={`font-bold ${themeStyles.accentColor}`}>CGPA: {edu.score}</div>
                            <div className="text-slate-600 text-[9.5px]">{edu.institution}</div>
                            <div className="text-slate-400 text-[9px]">{edu.duration}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="space-y-2 border-t border-slate-200/80 pt-3">
                      <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                        Technical Skills
                      </h2>
                      <div className="space-y-1.5 text-[9.5px]">
                        {SKILL_CATEGORIES.map((cat) => (
                          <div key={cat.category}>
                            <div className="font-bold text-slate-900">{cat.category}</div>
                            <div className="text-slate-600">{cat.skills.map(s => s.name).join(', ')}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="space-y-2 border-t border-slate-200/80 pt-3">
                      <h2 className="text-[11px] font-black uppercase tracking-wider text-slate-900">
                        Certifications
                      </h2>
                      <div className="space-y-1 text-[9.5px]">
                        {CERTIFICATIONS_LIST.slice(0, 3).map((cert) => (
                          <div key={cert.id}>
                            <div className="font-bold text-slate-900">• {cert.title}</div>
                            <div className="text-slate-500 text-[9px]">{cert.organization}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Main Area (68%) */}
                <div className="flex-1 p-6 space-y-4 bg-white flex flex-col justify-between">
                  {/* Profile Summary */}
                  <div>
                    <h2 className={`text-[11px] font-black uppercase tracking-wider ${themeStyles.accentColor} flex items-center gap-1.5 pb-1 mb-2 border-b-2 ${themeStyles.headerRule}`}>
                      <span>Executive Profile</span>
                    </h2>
                    <p className="text-[10.5px] text-slate-700 leading-relaxed text-justify">
                      Distinguished <strong>Master of Computer Applications (MCA)</strong> candidate with a strong academic foundation (<strong>8.50 MCA CGPA / 8.78 BCA CGPA</strong>) and practical experience across four specialized internships in <strong>Data Analytics, Sensor Technology & IoT, UI/UX Design, and Python Backend Development</strong>. Recipient of the <strong>Best Paper Award at the International AI Conference</strong> for research in next-generation computing architectures. Seeking software engineering and analytics roles to build high-impact, scalable solutions.
                    </p>
                  </div>

                  {/* Internships */}
                  <div>
                    <h2 className={`text-[11px] font-black uppercase tracking-wider ${themeStyles.accentColor} flex items-center gap-1.5 pb-1 mb-2 border-b-2 ${themeStyles.headerRule}`}>
                      <span>Industry Internship Experience</span>
                    </h2>
                    <div className="space-y-2.5 text-[10.5px]">
                      {INTERNSHIPS_LIST.map((intern) => (
                        <div key={intern.id} className="space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <span className="font-extrabold text-slate-950 text-[11px]">{intern.domain} Intern</span>
                            <span className="text-slate-500 font-bold text-[9.5px]">{intern.duration}</span>
                          </div>
                          <div className="text-slate-600 font-semibold text-[10px]">{intern.company} • {intern.location}</div>
                          <p className="text-slate-700 text-[10px] leading-snug">• {intern.description}</p>
                          <div className="text-[9.5px] text-slate-500 italic">Stack: {intern.techStack.join(' • ')}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div>
                    <h2 className={`text-[11px] font-black uppercase tracking-wider ${themeStyles.accentColor} flex items-center gap-1.5 pb-1 mb-2 border-b-2 ${themeStyles.headerRule}`}>
                      <span>Key Software Projects</span>
                    </h2>
                    <div className="space-y-2 text-[10.5px]">
                      {PROJECTS_LIST.map((proj) => (
                        <div key={proj.id} className="space-y-0.5">
                          <div className="flex justify-between items-baseline">
                            <span className="font-extrabold text-slate-950 text-[10.5px]">{proj.title}</span>
                            <span className="text-blue-800 font-bold text-[9px]">{proj.techTags.slice(0, 3).join(', ')}</span>
                          </div>
                          <p className="text-slate-700 text-[10px] leading-snug">• {proj.description}</p>
                          {proj.details.length > 0 && (
                            <div className="text-slate-500 text-[9.5px]">- {proj.details[0]}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Honors */}
                  <div>
                    <h2 className={`text-[11px] font-black uppercase tracking-wider ${themeStyles.accentColor} flex items-center gap-1.5 pb-1 mb-2 border-b-2 ${themeStyles.headerRule}`}>
                      <span>Honors & Research Publications</span>
                    </h2>
                    <div className="space-y-1.5 text-[10px]">
                      {ACHIEVEMENTS_LIST.slice(0, 3).map((ach) => (
                        <div key={ach.id} className="flex justify-between items-baseline">
                          <div>
                            <span className="font-bold text-slate-900">★ {ach.title}</span>
                            <span className="text-slate-500 text-[9.5px]"> — {ach.organization}</span>
                          </div>
                          <span className="text-slate-400 font-semibold text-[9px] shrink-0">{ach.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-slate-200 pt-2 text-center text-[9px] text-slate-400 font-medium">
                    Sandhiya P — MCA Candidate  |  padhasandhiya@gmail.com  |  Single Page Executive Format
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
