import React, { useState } from 'react';
import {
  Search,
  Upload,
  Sparkles,
  Globe,
  Shield,
  Bell,
  Trash2,
  CheckCircle2,
  RefreshCw,
  Menu,
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import { SupportedLanguage, Translations } from '../i18n/translations';

interface TopNavProps {
  currentTitle: string;
  onOpenUpload: () => void;
  onLoadSamples: () => void;
  onClearAll: () => void;
  onOpenSearch: () => void;
  language: SupportedLanguage;
  onChangeLanguage: (lang: SupportedLanguage) => void;
  currentUser: UserProfile;
  onChangeRole: (role: UserRole) => void;
  t: Translations;
  isLoading?: boolean;
  onOpenMobileMenu?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentTitle,
  onOpenUpload,
  onLoadSamples,
  onClearAll,
  onOpenSearch,
  language,
  onChangeLanguage,
  currentUser,
  onChangeRole,
  t,
  isLoading,
  onOpenMobileMenu,
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const roles: UserRole[] = ['ADMIN', 'MANAGER', 'OFFICER', 'REVIEWER'];
  const languages: { code: SupportedLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ml', label: 'മലയാളം', flag: '🌴' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', label: 'தமிழ்', flag: '🏛️' },
  ];

  return (
    <header className="h-16 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile Toggle & Current View Title */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 md:hidden"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm md:text-base font-bold text-slate-100 flex items-center gap-2 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {currentTitle}
              {isLoading && (
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin shrink-0" />
              )}
            </h1>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-900 text-teal-400 border border-slate-800">
              SIH25080
            </span>
          </div>
          <p className="text-[10px] md:text-[11px] text-slate-400 hidden lg:block font-mono">
            {t.coreFlow}
          </p>
        </div>
      </div>

      {/* Center: Global Search Bar trigger */}
      <div className="flex-1 max-w-xs lg:max-w-md mx-3 lg:mx-6 hidden md:block">
        <div
          onClick={onOpenSearch}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200 cursor-pointer transition-all text-xs"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate flex-1 text-[11px]">{t.searchPlaceholder}</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono border border-slate-700">
            Ctrl + K
          </kbd>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Load KMRL Sample Suite Button */}
        <button
          onClick={onLoadSamples}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-700/60 hover:bg-cyan-900 transition-colors shadow-sm shadow-cyan-950/50"
          title="Load 5 authentic KMRL technical circulars, contracts and inspections"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">{t.loadSampleBtn}</span>
        </button>

        {/* Upload/Ingest Document Button */}
        <button
          onClick={onOpenUpload}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-md shadow-teal-950/60 transition-all active:scale-95"
        >
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t.uploadDocBtn}</span>
        </button>

        {/* Clear Data (Empty State Test) */}
        <button
          onClick={onClearAll}
          className="p-1.5 sm:p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
          title="Clear Database to verify 'No Fake Data' empty state behavior"
        >
          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>

        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLangDropdown(!showLangDropdown);
              setShowRoleDropdown(false);
            }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium"
          >
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="uppercase font-mono text-[10px] sm:text-[11px]">{language}</span>
          </button>

          {showLangDropdown && (
            <div className="absolute right-0 mt-2 w-36 rounded-lg bg-slate-900 border border-slate-800 shadow-xl py-1 z-50">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    onChangeLanguage(l.code);
                    setShowLangDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between ${
                    language === l.code
                      ? 'bg-cyan-950/60 text-cyan-300 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </span>
                  {language === l.code && <CheckCircle2 className="w-3 h-3 text-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Role Selector (RBAC Simulation) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowRoleDropdown(!showRoleDropdown);
              setShowLangDropdown(false);
            }}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200"
            title="Switch User Role to test RBAC permissions"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold text-amber-300 hidden sm:inline">
              {currentUser.role}
            </span>
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-slate-900 border border-slate-800 shadow-xl p-2 z-50 space-y-1">
              <div className="px-2 py-1 text-[10px] uppercase font-mono text-slate-400 font-bold border-b border-slate-800">
                Switch RBAC Role
              </div>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    onChangeRole(r);
                    setShowRoleDropdown(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between ${
                    currentUser.role === r
                      ? 'bg-amber-950/60 text-amber-300 font-bold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div>
                    <div className="font-semibold">{r}</div>
                    <div className="text-[10px] text-slate-400 font-normal">
                      {r === 'ADMIN' && 'Full system & schema access'}
                      {r === 'MANAGER' && 'Approve impact & actions'}
                      {r === 'OFFICER' && 'Ingest & query docs'}
                      {r === 'REVIEWER' && 'Verify risks & compliance'}
                    </div>
                  </div>
                  {currentUser.role === r && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-cyan-600 to-teal-800 flex items-center justify-center font-bold text-xs text-white shadow-inner">
            {currentUser.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)}
          </div>
        </div>
      </div>
    </header>
  );
};
