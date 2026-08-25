import { Education, Internship, CertificationItem, AchievementItem, Project, PreferredInterest } from './types';

export const PERSONAL_INFO = {
  name: "Sandhiya P",
  title: "Master of Computer Applications (MCA) Candidate",
  tagline: "Bridging modern full-stack engineering, data analytics, and applied artificial intelligence research.",
  email: "padhasandhiya@gmail.com",
  phone: "6383125387",
  location: "Trichy, Tamil Nadu, India",
  availability: "Available for Software Engineering & Analytics Roles",
  github: "https://github.com/Sandhiya-Padmanaban",
  linkedin: "https://www.linkedin.com/in/sandhiya-padmanaban-1b1003398",
  photoUrl: "", // Paste your permanent image link (Google Drive / GitHub / direct URL) here or upload via the portfolio camera button
  bio: "Master of Computer Applications candidate with a distinguished academic record (8.50 MCA / 8.78 BCA) and hands-on internship experience across Data Analytics, Sensor Tech, UI/UX, and Python Development. Recognized with a Best Paper Award at an International AI Conference for research in next-generation computing architectures."
};

export const METRICS = [
  { label: "MCA Academic CGPA", value: "8.50 / 10", highlight: "Holy Cross College" },
  { label: "BCA Academic CGPA", value: "8.78 / 10", highlight: "Seethalakshmi Ramaswami" },
  { label: "Industry Internships", value: "4 Completed", highlight: "Analytics, Sensors, UI/UX, Python" },
  { label: "Research Honors", value: "Best Paper Award", highlight: "International AI Conference" }
];

export const EDUCATION_LIST: Education[] = [
  {
    id: "pg",
    level: "Postgraduate Degree",
    degree: "Master of Computer Applications (MCA)",
    institution: "Holy Cross College (Autonomous)",
    location: "Trichy, Tamil Nadu",
    duration: "2025 - 2027",
    score: "CGPA: 8.50"
  },
  {
    id: "ug",
    level: "Undergraduate Degree",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Seethalakshmi Ramaswami College (Autonomous)",
    location: "Trichy, Tamil Nadu",
    duration: "2022 - 2025",
    score: "CGPA: 8.78"
  }
];

export const INTERNSHIPS_LIST: (Internship & { techStack: string[]; description: string })[] = [
  {
    id: "int-1",
    domain: "Data Analytics",
    company: "T4TEQ Software Solutions",
    location: "Trichy, India",
    duration: "Feb 2026",
    techStack: ["Data Analysis", "Python", "Business Intelligence", "SQL"],
    description: "Evaluated large-scale tabular datasets, designed structured analytical pipelines, and produced actionable visualization reports for business decision optimization."
  },
  {
    id: "int-2",
    domain: "Sensor Technology & IoT",
    company: "HCIICT, Holy Cross College",
    location: "Trichy, India",
    duration: "Sep 2025",
    techStack: ["IoT Hardware", "Microcontrollers", "Embedded C", "Sensor Calibration"],
    description: "Hands-on engineering with sensor hardware integration, real-time telemetry extraction, and signal processing protocols for smart computing prototypes."
  },
  {
    id: "int-3",
    domain: "UI / UX Design",
    company: "RTS Invention",
    location: "Trichy, India",
    duration: "Sep - Oct 2023",
    techStack: ["Figma", "User Flow Design", "Interactive Wireframes", "Usability Heuristics"],
    description: "Architected high-fidelity component libraries, intuitive application wireframes, and responsive user journey diagrams prioritizing accessibility."
  },
  {
    id: "int-4",
    domain: "Python Programming",
    company: "Greensoft Groups",
    location: "Trichy, India",
    duration: "Jan 2023",
    techStack: ["Python 3", "Data Structures", "OOP", "Algorithm Optimization"],
    description: "Built modular object-oriented backend scripts, database automation tools, and validated computational logic algorithms."
  }
];

export const SKILL_CATEGORIES = [
  {
    category: "Languages & Frameworks",
    icon: "Code2",
    skills: [
      { name: "Java", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "JavaScript", level: "Proficient" },
      { name: "C Programming", level: "Proficient" },
      { name: "PHP", level: "Working Knowledge" },
      { name: "HTML5 / CSS3", level: "Advanced" },
      { name: "SQL", level: "Advanced" }
    ]
  },
  {
    category: "Database & Backend Engineering",
    icon: "Database",
    skills: [
      { name: "Relational Schema Design", level: "Advanced" },
      { name: "MySQL / PostgreSQL", level: "Proficient" },
      { name: "RESTful API Concept", level: "Proficient" },
      { name: "Query Optimization", level: "Proficient" }
    ]
  },
  {
    category: "Specialized Domains",
    icon: "Cpu",
    skills: [
      { name: "Data Analytics & Reporting", level: "Advanced" },
      { name: "IoT & Sensor Architecture", level: "Proficient" },
      { name: "UI/UX & Design Systems", level: "Proficient" },
      { name: "Academic Research Writing", level: "Distinction" }
    ]
  },
  {
    category: "Developer Tools & Productivity",
    icon: "Wrench",
    skills: [
      { name: "Visual Studio Code", level: "Daily Driver" },
      { name: "Git & GitHub Version Control", level: "Proficient" },
      { name: "Microsoft Excel (Advanced Analysis)", level: "Advanced" },
      { name: "PowerPoint & Technical Docs", level: "Advanced" }
    ]
  }
];

export const PROJECTS_LIST: (Project & { techTags: string[]; outcomes: string; details: string[] })[] = [
  {
    id: "proj-1",
    title: "Student Result Management System",
    category: "Enterprise Web Application",
    description: "A centralized academic assessment portal enabling students to securely query performance records and empowering educators to perform bulk transcript management with data integrity validation.",
    techTags: ["PHP", "MySQL", "JavaScript", "HTML/CSS", "Authentication"],
    outcomes: "Eliminated manual paper queries by automating grade calculation and report card generation with sub-second lookup times.",
    details: [
      "Role-based authentication ensuring isolated student and admin access control.",
      "Optimized relational SQL database schema for rapid student index queries.",
      "Clean, responsive printable mark sheet generator."
    ],
    githubUrl: "https://github.com/Sandhiya-Padmanaban"
  },
  {
    id: "proj-2",
    title: "CivicConnect – Public Grievance Platform",
    category: "Civic Tech & IoT Integration",
    description: "An intuitive citizen reporting portal allowing residents to submit location-tagged urban infrastructure issues (e.g. damaged streetlights, water pipeline leaks) directly to civic administrators.",
    techTags: ["Web Platform", "SQL", "Geo-tagging", "Workflow Management"],
    outcomes: "Streamlined grievance resolution timelines through transparent ticket tracking and automated status updates.",
    details: [
      "Structured incident logging with photo uploads and priority categorization.",
      "Administrative triage dashboard with status transition triggers.",
      "Public transparency log for real-time status tracking."
    ],
    githubUrl: "https://github.com/Sandhiya-Padmanaban"
  }
];

export const ACHIEVEMENTS_LIST: AchievementItem[] = [
  {
    id: "ach-1",
    title: "Best Paper Award – International AI Conference",
    organization: "St. Joseph's College, Crossian Centre for AI Excellence & Globethics",
    date: "Jan 2026",
    isSpecial: true
  },
  {
    id: "ach-2",
    title: "Research Presentation on Next-Gen AI & Sustainable Tech",
    organization: "International Conference on Next Gen AI and Emerging Technologies",
    date: "Jan 2026",
    isSpecial: false
  },
  {
    id: "ach-3",
    title: 'Published Research Paper: "Internet of Things: A Review"',
    organization: "International Conference on Contemporary Trends in Computer Science (CTCS-2K24)",
    date: "Aug 2024",
    isSpecial: false
  },
  {
    id: "ach-4",
    title: "Student Council Member – Certificate of Appreciation",
    organization: "College Students' Union, Seethalakshmi Ramaswami College",
    date: "2024 - 2025",
    isSpecial: false
  }
];

export const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Diploma in Information Technology",
    organization: "Seethalakshmi Ramaswami College & InfoSchool",
    date: "2022 - 2025"
  },
  {
    id: "cert-2",
    title: "Basics of Python Certification",
    organization: "UniAthena in partnership with Cambridge Qualifications, UK",
    date: "Certified"
  },
  {
    id: "cert-3",
    title: "Next Gen AI: Innovations & Impacts Symposium",
    organization: "HCIICT, Holy Cross College (Autonomous)",
    date: "2025"
  },
  {
    id: "cert-4",
    title: "Professional Placement & Aptitude Training",
    organization: "Seethalakshmi Ramaswami College, Trichy",
    date: "Dec 2024"
  }
];

export const PREFERRED_INTERESTS: PreferredInterest[] = [
  {
    id: "ui-ux",
    title: "UI/UX Design",
    category: "Human-Centered Design & Prototyping",
    description: "Designing intuitive, accessible, and user-centric wireframes, interactive prototypes, and modular design systems in Figma with a strong emphasis on visual hierarchy, seamless navigation flows, and responsive web usability.",
    highlight: "Figma & Interactive Wireframing",
    skills: ["Figma Design Systems", "User Journey Flows", "Interactive Wireframing", "Usability Heuristics", "Responsive Layouts", "Accessibility (WCAG)"]
  },
  {
    id: "prompt-eng",
    title: "Prompt Engineering",
    category: "Generative AI & LLM Systems",
    description: "Formulating structured system prompts, few-shot conditioning, chain-of-thought (CoT) reasoning paths, and evaluation benchmarks to steer large language models (LLMs) toward deterministic, accurate, and high-quality outputs.",
    highlight: "LLM Reasoning & Structured Conditioning",
    skills: ["System Prompt Architecture", "Few-Shot Prompting", "Chain-of-Thought (CoT)", "Context Window Optimization", "Structured Output Parsing", "AI Workflow Automation"]
  },
  {
    id: "web-dev",
    title: "Web Development",
    category: "Modern Full-Stack & Frontend Engineering",
    description: "Engineering responsive, performant, and dynamic web applications utilizing modern JavaScript/TypeScript frameworks, HTML5/CSS3 semantics, RESTful APIs, and relational databases with high attention to component modularity and clean code standards.",
    highlight: "Full-Stack & Frontend Architecture",
    skills: ["React & TypeScript", "HTML5 / CSS3 / Tailwind", "PHP & Backend Logic", "SQL & Relational Databases", "REST API Integration", "Responsive & Mobile-First Design"]
  }
];
