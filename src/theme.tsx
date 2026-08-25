import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeId = 'blue-white' | 'midnight-navy' | 'cobalt-dark' | 'emerald-dark' | 'violet-night' | 'amber-gold';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  category: 'light' | 'dark';
  description: string;
  isLight: boolean;
  
  // Swatches for theme switcher UI
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  
  // App-level CSS classes
  pageBg: string;
  headerBg: string;
  headerBorder: string;
  headerText: string;
  headerSubtext: string;
  
  // Card styles
  cardBg: string;
  cardBorder: string;
  cardHover?: string;
  cardHoverBorder: string;
  cardShadow: string;
  cardText: string;
  cardHeading: string;
  cardSubtext: string;
  
  // Hero styles
  heroBg: string;
  heroBorder: string;
  heroText: string;
  heroHeading: string;
  heroSubtext: string;
  heroGlow1: string;
  heroGlow2: string;
  
  // Accent & Interactive
  accentGradient: string;
  accentGradientText: string;
  accentText: string;
  accentBadgeBg: string;
  accentBadgeBorder: string;
  accentBadgeText: string;
  
  // Secondary boxes (metrics, tags, skill pills, inner cards)
  innerBoxBg: string;
  innerBoxBorder: string;
  innerBoxText: string;
  innerBoxHover: string;
  
  // Section headers
  sectionBorder: string;
  sectionTitle: string;
  sectionDesc: string;
  
  // Buttons
  primaryBtn: string;
  secondaryBtn: string;
  outlineBtn: string;
  
  // Footer
  footerBg: string;
  footerBorder: string;
  footerText: string;
  footerSubtext: string;
  
  // Selection
  selection: string;
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  'blue-white': {
    id: 'blue-white',
    name: 'Royal Blue & White',
    category: 'light',
    description: 'Crisp White Canvas with Vibrant Cobalt & Royal Blue Accents',
    isLight: true,
    primaryColor: '#2563eb',
    secondaryColor: '#ffffff',
    accentColor: '#1d4ed8',
    
    pageBg: 'bg-gradient-to-b from-[#f8faff] via-[#edf3fc] to-[#f1f6ff] text-slate-900',
    headerBg: 'bg-white/95 backdrop-blur-md border-b border-blue-200/80 shadow-md shadow-blue-900/5',
    headerBorder: 'border-blue-200/80',
    headerText: 'text-slate-900',
    headerSubtext: 'text-blue-700 font-bold',
    
    cardBg: 'bg-white text-slate-900',
    cardBorder: 'border-blue-200 shadow-lg shadow-blue-900/5',
    cardHover: 'hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10',
    cardHoverBorder: 'hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10',
    cardShadow: 'shadow-lg shadow-blue-900/5',
    cardText: 'text-slate-700',
    cardHeading: 'text-slate-900',
    cardSubtext: 'text-slate-600',
    
    heroBg: 'bg-gradient-to-b from-white via-blue-50/70 to-white text-slate-900',
    heroBorder: 'border-blue-300 shadow-xl shadow-blue-600/10',
    heroText: 'text-slate-700',
    heroHeading: 'text-slate-900',
    heroSubtext: 'text-blue-700 font-bold',
    heroGlow1: 'bg-blue-400/20',
    heroGlow2: 'bg-sky-400/20',
    
    accentGradient: 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 text-white',
    accentGradientText: 'text-white',
    accentText: 'text-blue-700',
    accentBadgeBg: 'bg-blue-100/90',
    accentBadgeBorder: 'border-blue-300/80',
    accentBadgeText: 'text-blue-900',
    
    innerBoxBg: 'bg-blue-50/80',
    innerBoxBorder: 'border-blue-200',
    innerBoxText: 'text-blue-950 font-semibold',
    innerBoxHover: 'hover:bg-blue-100 hover:border-blue-400',
    
    sectionBorder: 'border-blue-200',
    sectionTitle: 'text-slate-900',
    sectionDesc: 'text-slate-600',
    
    primaryBtn: 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black shadow-md shadow-blue-600/25',
    secondaryBtn: 'bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold border border-blue-300 shadow-xs',
    outlineBtn: 'border border-blue-300 bg-white text-blue-900 hover:bg-blue-50 hover:border-blue-400',
    
    footerBg: 'bg-slate-900 border-t border-slate-800 text-white',
    footerBorder: 'border-slate-800',
    footerText: 'text-slate-400',
    footerSubtext: 'text-slate-400',
    
    selection: 'selection:bg-blue-600 selection:text-white',
  },
  
  'midnight-navy': {
    id: 'midnight-navy',
    name: 'Midnight Navy & Teal',
    category: 'dark',
    description: 'Deep Midnight Navy with Vibrant Ocean Teal Accents (Default)',
    isLight: false,
    primaryColor: '#0f766e',
    secondaryColor: '#030c18',
    accentColor: '#2dd4bf',
    
    pageBg: 'bg-gradient-to-b from-[#030c18] via-[#06152b] to-[#020813] text-slate-100',
    headerBg: 'bg-[#040e1e]/95 backdrop-blur-md border-b border-blue-950/80 shadow-lg shadow-black/50',
    headerBorder: 'border-blue-950/80',
    headerText: 'text-slate-50',
    headerSubtext: 'text-teal-400 font-semibold',
    
    cardBg: 'bg-gradient-to-b from-[#081d38] to-[#040f1f] text-slate-100',
    cardBorder: 'border-teal-500/25 shadow-xl',
    cardHover: 'hover:border-teal-400/50 hover:shadow-2xl',
    cardHoverBorder: 'hover:border-teal-400/50 hover:shadow-2xl',
    cardShadow: 'shadow-xl shadow-black/40',
    cardText: 'text-slate-300',
    cardHeading: 'text-slate-100',
    cardSubtext: 'text-slate-400',
    
    heroBg: 'bg-gradient-to-b from-[#081f3d] via-[#06172e] to-[#030d1b] text-slate-100',
    heroBorder: 'border-teal-500/30 shadow-2xl shadow-black/60',
    heroText: 'text-slate-300',
    heroHeading: 'text-slate-50',
    heroSubtext: 'text-teal-400 font-bold',
    heroGlow1: 'bg-teal-400/10',
    heroGlow2: 'bg-cyan-500/10',
    
    accentGradient: 'bg-gradient-to-r from-teal-400 via-teal-500 to-cyan-600 text-teal-950',
    accentGradientText: 'text-teal-950',
    accentText: 'text-teal-300',
    accentBadgeBg: 'bg-teal-950/80',
    accentBadgeBorder: 'border-teal-600/50',
    accentBadgeText: 'text-teal-300',
    
    innerBoxBg: 'bg-[#030b17]',
    innerBoxBorder: 'border-blue-950',
    innerBoxText: 'text-slate-200',
    innerBoxHover: 'hover:bg-teal-950/50 hover:border-teal-600/50',
    
    sectionBorder: 'border-blue-950/80',
    sectionTitle: 'text-slate-50',
    sectionDesc: 'text-slate-300',
    
    primaryBtn: 'bg-gradient-to-r from-teal-400 via-teal-500 to-cyan-600 hover:from-teal-300 hover:to-cyan-500 text-teal-950 font-black shadow-md shadow-teal-600/20',
    secondaryBtn: 'bg-[#092242] hover:bg-teal-900/60 text-teal-200 hover:text-white font-bold border border-teal-500/40 shadow-xs',
    outlineBtn: 'border border-blue-900/60 bg-[#05172d] text-slate-200 hover:bg-[#092548] hover:border-teal-500/40',
    
    footerBg: 'bg-[#020813] border-t border-blue-950 text-white',
    footerBorder: 'border-blue-950',
    footerText: 'text-slate-400',
    footerSubtext: 'text-teal-400/70',
    
    selection: 'selection:bg-teal-400 selection:text-teal-950',
  },

  'cobalt-dark': {
    id: 'cobalt-dark',
    name: 'Cobalt Night & Cyan',
    category: 'dark',
    description: 'Electrifying Cobalt Blue with Neon Cyan Highlights',
    isLight: false,
    primaryColor: '#0284c7',
    secondaryColor: '#07132a',
    accentColor: '#38bdf8',
    
    pageBg: 'bg-gradient-to-b from-[#07132a] via-[#0b1c3e] to-[#040b18] text-blue-50',
    headerBg: 'bg-[#081530]/95 backdrop-blur-md border-b border-blue-900/80 shadow-lg shadow-black/50',
    headerBorder: 'border-blue-900/80',
    headerText: 'text-blue-50',
    headerSubtext: 'text-cyan-400 font-semibold',
    
    cardBg: 'bg-gradient-to-b from-[#0e244d] to-[#081733] text-blue-100',
    cardBorder: 'border-cyan-500/30 shadow-xl',
    cardHover: 'hover:border-cyan-400/60 hover:shadow-2xl',
    cardHoverBorder: 'hover:border-cyan-400/60 hover:shadow-2xl',
    cardShadow: 'shadow-xl shadow-black/50',
    cardText: 'text-blue-200',
    cardHeading: 'text-blue-50',
    cardSubtext: 'text-blue-300',
    
    heroBg: 'bg-gradient-to-b from-[#102a5c] via-[#0c1f44] to-[#061229] text-blue-50',
    heroBorder: 'border-cyan-400/40 shadow-2xl shadow-cyan-900/20',
    heroText: 'text-blue-200',
    heroHeading: 'text-white',
    heroSubtext: 'text-cyan-300 font-bold',
    heroGlow1: 'bg-cyan-400/15',
    heroGlow2: 'bg-blue-500/15',
    
    accentGradient: 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-blue-950',
    accentGradientText: 'text-blue-950',
    accentText: 'text-cyan-300',
    accentBadgeBg: 'bg-blue-950/90',
    accentBadgeBorder: 'border-cyan-500/50',
    accentBadgeText: 'text-cyan-300',
    
    innerBoxBg: 'bg-[#06132b]',
    innerBoxBorder: 'border-blue-900/80',
    innerBoxText: 'text-blue-100',
    innerBoxHover: 'hover:bg-blue-950 hover:border-cyan-500/50',
    
    sectionBorder: 'border-blue-900/80',
    sectionTitle: 'text-blue-50',
    sectionDesc: 'text-blue-200',
    
    primaryBtn: 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-blue-950 font-black shadow-md shadow-cyan-600/30',
    secondaryBtn: 'bg-[#122e61] hover:bg-blue-900 text-cyan-200 hover:text-white font-bold border border-cyan-500/40 shadow-xs',
    outlineBtn: 'border border-blue-800 bg-[#081a3d] text-blue-200 hover:bg-[#102759] hover:border-cyan-400/50',
    
    footerBg: 'bg-[#040a17] border-t border-blue-950 text-white',
    footerBorder: 'border-blue-950',
    footerText: 'text-blue-300',
    footerSubtext: 'text-cyan-400/70',
    
    selection: 'selection:bg-cyan-400 selection:text-blue-950',
  },

  'emerald-dark': {
    id: 'emerald-dark',
    name: 'Emerald & Mint',
    category: 'dark',
    description: 'Deep Obsidian with Glowing Emerald & Mint Accents',
    isLight: false,
    primaryColor: '#059669',
    secondaryColor: '#021811',
    accentColor: '#34d399',
    
    pageBg: 'bg-gradient-to-b from-[#021811] via-[#04241b] to-[#010e0a] text-emerald-50',
    headerBg: 'bg-[#031c15]/95 backdrop-blur-md border-b border-emerald-950/80 shadow-lg shadow-black/50',
    headerBorder: 'border-emerald-950/80',
    headerText: 'text-emerald-50',
    headerSubtext: 'text-emerald-400 font-semibold',
    
    cardBg: 'bg-gradient-to-b from-[#063325] to-[#031d15] text-emerald-100',
    cardBorder: 'border-emerald-500/25 shadow-xl',
    cardHover: 'hover:border-emerald-400/50 hover:shadow-2xl',
    cardHoverBorder: 'hover:border-emerald-400/50 hover:shadow-2xl',
    cardShadow: 'shadow-xl shadow-black/40',
    cardText: 'text-emerald-200',
    cardHeading: 'text-emerald-50',
    cardSubtext: 'text-emerald-300',
    
    heroBg: 'bg-gradient-to-b from-[#083d2d] via-[#05281e] to-[#021610] text-emerald-50',
    heroBorder: 'border-emerald-500/30 shadow-2xl shadow-black/60',
    heroText: 'text-emerald-200',
    heroHeading: 'text-emerald-50',
    heroSubtext: 'text-emerald-400 font-bold',
    heroGlow1: 'bg-emerald-400/10',
    heroGlow2: 'bg-teal-400/10',
    
    accentGradient: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500 text-emerald-950',
    accentGradientText: 'text-emerald-950',
    accentText: 'text-emerald-300',
    accentBadgeBg: 'bg-emerald-950/80',
    accentBadgeBorder: 'border-emerald-600/50',
    accentBadgeText: 'text-emerald-300',
    
    innerBoxBg: 'bg-[#02150f]',
    innerBoxBorder: 'border-emerald-950',
    innerBoxText: 'text-emerald-200',
    innerBoxHover: 'hover:bg-emerald-950/50 hover:border-emerald-500/50',
    
    sectionBorder: 'border-emerald-950/80',
    sectionTitle: 'text-emerald-50',
    sectionDesc: 'text-emerald-200',
    
    primaryBtn: 'bg-gradient-to-r from-emerald-400 via-teal-400 to-green-500 hover:from-emerald-300 hover:to-green-400 text-emerald-950 font-black shadow-md shadow-emerald-600/20',
    secondaryBtn: 'bg-[#0a4231] hover:bg-emerald-900/60 text-emerald-200 hover:text-white font-bold border border-emerald-500/40 shadow-xs',
    outlineBtn: 'border border-emerald-900/60 bg-[#042118] text-emerald-200 hover:bg-[#0a3a2b] hover:border-emerald-500/40',
    
    footerBg: 'bg-[#010a07] border-t border-emerald-950 text-white',
    footerBorder: 'border-emerald-950',
    footerText: 'text-emerald-300',
    footerSubtext: 'text-emerald-400/70',
    
    selection: 'selection:bg-emerald-400 selection:text-emerald-950',
  },

  'violet-night': {
    id: 'violet-night',
    name: 'Amethyst & Violet',
    category: 'dark',
    description: 'Royal Purple Velvet with Vibrant Neon Violet Accents',
    isLight: false,
    primaryColor: '#7c3aed',
    secondaryColor: '#110722',
    accentColor: '#c084fc',
    
    pageBg: 'bg-gradient-to-b from-[#110722] via-[#1a0c33] to-[#0a0414] text-purple-50',
    headerBg: 'bg-[#15092a]/95 backdrop-blur-md border-b border-purple-950/80 shadow-lg shadow-black/50',
    headerBorder: 'border-purple-950/80',
    headerText: 'text-purple-50',
    headerSubtext: 'text-purple-300 font-semibold',
    
    cardBg: 'bg-gradient-to-b from-[#251047] to-[#140826] text-purple-100',
    cardBorder: 'border-purple-500/30 shadow-xl',
    cardHover: 'hover:border-purple-400/60 hover:shadow-2xl',
    cardHoverBorder: 'hover:border-purple-400/60 hover:shadow-2xl',
    cardShadow: 'shadow-xl shadow-black/40',
    cardText: 'text-purple-200',
    cardHeading: 'text-purple-50',
    cardSubtext: 'text-purple-300',
    
    heroBg: 'bg-gradient-to-b from-[#2c1354] via-[#1d0c38] to-[#0f051c] text-purple-50',
    heroBorder: 'border-purple-500/35 shadow-2xl shadow-purple-950/50',
    heroText: 'text-purple-200',
    heroHeading: 'text-purple-50',
    heroSubtext: 'text-purple-300 font-bold',
    heroGlow1: 'bg-purple-400/12',
    heroGlow2: 'bg-fuchsia-500/12',
    
    accentGradient: 'bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-500 text-purple-950',
    accentGradientText: 'text-purple-950',
    accentText: 'text-purple-300',
    accentBadgeBg: 'bg-purple-950/80',
    accentBadgeBorder: 'border-purple-600/50',
    accentBadgeText: 'text-purple-300',
    
    innerBoxBg: 'bg-[#0f061e]',
    innerBoxBorder: 'border-purple-950',
    innerBoxText: 'text-purple-200',
    innerBoxHover: 'hover:bg-purple-950/60 hover:border-purple-500/50',
    
    sectionBorder: 'border-purple-950/80',
    sectionTitle: 'text-purple-50',
    sectionDesc: 'text-purple-200',
    
    primaryBtn: 'bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-500 hover:from-purple-300 hover:to-fuchsia-400 text-purple-950 font-black shadow-md shadow-purple-600/25',
    secondaryBtn: 'bg-[#31165e] hover:bg-purple-900/60 text-purple-200 hover:text-white font-bold border border-purple-500/40 shadow-xs',
    outlineBtn: 'border border-purple-900/60 bg-[#190a32] text-purple-200 hover:bg-[#2b1054] hover:border-purple-500/40',
    
    footerBg: 'bg-[#07020d] border-t border-purple-950 text-white',
    footerBorder: 'border-purple-950',
    footerText: 'text-purple-300',
    footerSubtext: 'text-purple-400/70',
    
    selection: 'selection:bg-purple-400 selection:text-purple-950',
  },

  'amber-gold': {
    id: 'amber-gold',
    name: 'Gold & Bronze',
    category: 'dark',
    description: 'Sophisticated Dark Bronze with Luminous Golden Amber Accents',
    isLight: false,
    primaryColor: '#d97706',
    secondaryColor: '#191106',
    accentColor: '#fbbf24',
    
    pageBg: 'bg-gradient-to-b from-[#191106] via-[#241909] to-[#0e0a03] text-amber-50',
    headerBg: 'bg-[#1e1508]/95 backdrop-blur-md border-b border-amber-950/80 shadow-lg shadow-black/50',
    headerBorder: 'border-amber-950/80',
    headerText: 'text-amber-50',
    headerSubtext: 'text-amber-400 font-semibold',
    
    cardBg: 'bg-gradient-to-b from-[#33220c] to-[#1c1306] text-amber-100',
    cardBorder: 'border-amber-500/25 shadow-xl',
    cardHover: 'hover:border-amber-400/50 hover:shadow-2xl',
    cardHoverBorder: 'hover:border-amber-400/50 hover:shadow-2xl',
    cardShadow: 'shadow-xl shadow-black/40',
    cardText: 'text-amber-200',
    cardHeading: 'text-amber-50',
    cardSubtext: 'text-amber-300',
    
    heroBg: 'bg-gradient-to-b from-[#3d290f] via-[#2a1c0a] to-[#150e05] text-amber-50',
    heroBorder: 'border-amber-500/30 shadow-2xl shadow-black/60',
    heroText: 'text-amber-200',
    heroHeading: 'text-amber-50',
    heroSubtext: 'text-amber-400 font-bold',
    heroGlow1: 'bg-amber-400/10',
    heroGlow2: 'bg-yellow-500/10',
    
    accentGradient: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950',
    accentGradientText: 'text-amber-950',
    accentText: 'text-amber-300',
    accentBadgeBg: 'bg-amber-950/80',
    accentBadgeBorder: 'border-amber-600/50',
    accentBadgeText: 'text-amber-300',
    
    innerBoxBg: 'bg-[#150d04]',
    innerBoxBorder: 'border-amber-950',
    innerBoxText: 'text-amber-200',
    innerBoxHover: 'hover:bg-amber-950/50 hover:border-amber-500/50',
    
    sectionBorder: 'border-amber-950/80',
    sectionTitle: 'text-amber-50',
    sectionDesc: 'text-amber-200',
    
    primaryBtn: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 text-amber-950 font-black shadow-md shadow-amber-600/20',
    secondaryBtn: 'bg-[#473010] hover:bg-amber-900/60 text-amber-200 hover:text-white font-bold border border-amber-500/40 shadow-xs',
    outlineBtn: 'border border-amber-900/60 bg-[#241708] text-amber-200 hover:bg-[#3d270e] hover:border-amber-500/40',
    
    footerBg: 'bg-[#090602] border-t border-amber-950 text-white',
    footerBorder: 'border-amber-950',
    footerText: 'text-amber-300',
    footerSubtext: 'text-amber-400/70',
    
    selection: 'selection:bg-amber-400 selection:text-amber-950',
  },
};

interface ThemeContextType {
  currentTheme: ThemeConfig;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
  availableThemes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sandhiya_portfolio_theme') as ThemeId;
      if (saved && THEMES[saved]) {
        return saved;
      }
    }
    return 'blue-white'; // Default to the newly requested Blue with White or Midnight Navy
  });

  const setTheme = (id: ThemeId) => {
    if (THEMES[id]) {
      setThemeId(id);
      try {
        localStorage.setItem('sandhiya_portfolio_theme', id);
      } catch (e) {
        console.warn('Could not save theme preference', e);
      }
    }
  };

  const currentTheme = THEMES[themeId] || THEMES['blue-white'];
  const availableThemes = Object.values(THEMES);

  return (
    <ThemeContext.Provider value={{ currentTheme, themeId, setTheme, availableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
