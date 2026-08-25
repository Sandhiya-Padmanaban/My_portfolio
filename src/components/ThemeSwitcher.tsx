import React, { useState } from 'react';
import { Palette, Check, Sun, Moon, Sparkles, ChevronDown } from 'lucide-react';
import { useTheme, ThemeId } from '../theme';

interface ThemeSwitcherProps {
  variant?: 'header' | 'floating' | 'drawer';
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ variant = 'header' }) => {
  const { currentTheme, themeId, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {isOpen && (
            <div 
              className={`absolute bottom-full right-0 mb-3 w-72 sm:w-80 rounded-2xl p-3 shadow-2xl border backdrop-blur-xl transition-all animate-in fade-in slide-in-from-bottom-2 ${
                currentTheme.isLight 
                  ? 'bg-white/95 border-blue-200 text-slate-900 shadow-blue-900/20' 
                  : 'bg-[#061224]/95 border-blue-900/80 text-slate-100 shadow-black/80'
              }`}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-inherit/40 px-1">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-black uppercase tracking-wider">Select Theme</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  currentTheme.isLight ? 'bg-blue-100 text-blue-800' : 'bg-teal-950 text-teal-300'
                }`}>
                  {currentTheme.name}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-1.5 max-h-72 overflow-y-auto pr-1">
                {availableThemes.map((theme) => {
                  const isActive = themeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => {
                        setTheme(theme.id);
                        setIsOpen(false);
                      }}
                      className={`flex items-center justify-between p-2 rounded-xl transition-all cursor-pointer text-left border ${
                        isActive
                          ? currentTheme.isLight
                            ? 'bg-blue-50 border-blue-400 font-bold'
                            : 'bg-blue-950/80 border-cyan-400/60 font-bold'
                          : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center -space-x-1">
                          <span 
                            className="w-4 h-4 rounded-full border border-white/40 shadow-xs inline-block"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-xs inline-block"
                            style={{ backgroundColor: theme.secondaryColor }}
                          />
                        </div>
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1.5">
                            <span>{theme.name}</span>
                            {theme.isLight ? (
                              <Sun className="w-3 h-3 text-amber-500" />
                            ) : (
                              <Moon className="w-3 h-3 text-cyan-400" />
                            )}
                          </div>
                          <div className="text-[10px] opacity-75 leading-tight">
                            {theme.isLight ? 'Light Canvas' : 'Dark Canvas'}
                          </div>
                        </div>
                      </div>

                      {isActive && (
                        <Check className="w-4 h-4 text-blue-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`p-3 rounded-2xl shadow-xl border flex items-center gap-2 cursor-pointer transition-all active:scale-95 ${
              currentTheme.isLight
                ? 'bg-white border-blue-300 text-blue-900 hover:bg-blue-50 shadow-blue-500/20'
                : 'bg-[#081d38] border-teal-500/40 text-teal-200 hover:bg-[#0c2a50] shadow-black/60'
            }`}
            title="Change Portfolio Color Theme"
          >
            <Palette className="w-5 h-5 animate-pulse" />
            <span className="text-xs font-black hidden sm:inline">Theme</span>
            <div className="flex items-center -space-x-1">
              <span 
                className="w-3 h-3 rounded-full border border-white inline-block"
                style={{ backgroundColor: currentTheme.primaryColor }}
              />
              <span 
                className="w-2.5 h-2.5 rounded-full border border-white inline-block"
                style={{ backgroundColor: currentTheme.secondaryColor }}
              />
            </div>
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'drawer') {
    return (
      <div className="space-y-2 py-2">
        <div className="flex items-center justify-between text-xs font-bold opacity-80 px-1">
          <span className="flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5" />
            <span>Select Portfolio Theme</span>
          </span>
          <span className="text-[11px] font-extrabold">{currentTheme.name}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {availableThemes.map((theme) => {
            const isActive = themeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setTheme(theme.id)}
                className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30 font-black'
                    : currentTheme.isLight
                      ? 'bg-white text-slate-800 border-blue-200 hover:bg-blue-50'
                      : 'bg-[#041224] text-slate-200 border-blue-950 hover:bg-[#081d38]'
                }`}
              >
                <div className="flex items-center -space-x-1 shrink-0">
                  <span 
                    className="w-3 h-3 rounded-full border border-white/60 inline-block"
                    style={{ backgroundColor: theme.primaryColor }}
                  />
                  <span 
                    className="w-2.5 h-2.5 rounded-full border border-white/60 inline-block"
                    style={{ backgroundColor: theme.secondaryColor }}
                  />
                </div>
                <span className="truncate">{theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Default: Header Dropdown / Quick Swatch Pill
  return (
    <div className="relative">
      <div className="flex items-center gap-1.5 p-1 rounded-xl border bg-black/5 dark:bg-white/5 border-inherit/40">
        {/* Quick Swatch Pills for the two primary user themes: Blue & White + Midnight Navy */}
        <button
          type="button"
          onClick={() => setTheme('blue-white')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
            themeId === 'blue-white'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10'
          }`}
          title="Blue with White Theme (Light)"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white border border-blue-600 inline-block" />
          <span className="hidden xl:inline">Blue & White</span>
          <span className="xl:hidden">Blue</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('midnight-navy')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
            themeId === 'midnight-navy'
              ? 'bg-teal-500 text-teal-950 shadow-xs'
              : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10'
          }`}
          title="Midnight Navy & Teal Theme (Dark)"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#030c18] border border-teal-400 inline-block" />
          <span className="hidden xl:inline">Midnight Navy</span>
          <span className="xl:hidden">Navy</span>
        </button>

        {/* Dropdown for Extra Themes */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`p-1 px-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              themeId !== 'blue-white' && themeId !== 'midnight-navy'
                ? 'bg-blue-600 text-white font-black'
                : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            title="Explore More Themes"
          >
            <Palette className="w-3.5 h-3.5" />
            <ChevronDown className="w-3 h-3" />
          </button>

          {isOpen && (
            <div 
              className={`absolute top-full right-0 mt-2 w-64 rounded-2xl p-2.5 shadow-2xl border backdrop-blur-xl z-50 transition-all ${
                currentTheme.isLight
                  ? 'bg-white/95 border-blue-200 text-slate-900 shadow-blue-900/15'
                  : 'bg-[#061224]/95 border-blue-900/80 text-slate-100 shadow-black/80'
              }`}
            >
              <div className="text-[11px] font-black uppercase tracking-wider px-2 py-1 mb-1 opacity-70 flex items-center justify-between">
                <span>Theme Gallery</span>
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>

              <div className="space-y-1">
                {availableThemes.map((theme) => {
                  const isActive = themeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => {
                        setTheme(theme.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? currentTheme.isLight
                            ? 'bg-blue-100/90 text-blue-900 font-black'
                            : 'bg-blue-950 text-cyan-300 font-black border border-cyan-500/40'
                          : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-85'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex items-center -space-x-1">
                          <span 
                            className="w-3 h-3 rounded-full border border-white/60 inline-block"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-white/60 inline-block"
                            style={{ backgroundColor: theme.secondaryColor }}
                          />
                        </div>
                        <span>{theme.name}</span>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
