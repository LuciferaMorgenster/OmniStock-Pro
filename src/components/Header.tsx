import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import { Language } from '../types';
import {
  Boxes,
  Globe,
  Heart,
  Plus,
  RefreshCw,
  FolderGit2,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  onOpenAddItem: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAddItem }) => {
  const {
    language,
    setLanguage,
    activeTab,
    setActiveTab,
    openSponsorModal,
    triggerSuiteSync,
    isSyncingAny,
  } = useInventory();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const t = translations[language];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (Nav links) — Zone 3 (Primary Action & Utilities) */}
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Boxes className="w-5 h-5" />
            </div>
            <button
              onClick={() => setActiveTab('inventory')}
              className="text-left group cursor-pointer"
            >
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors whitespace-nowrap">
                OmniStock Pro
              </span>
            </button>
          </div>

          {/* Zone 2: Single-line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'inventory'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 font-semibold'
                  : ''
              }`}
            >
              {t.nav.inventory}
            </button>
            <button
              onClick={() => setActiveTab('warehouses')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'warehouses'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 font-semibold'
                  : ''
              }`}
            >
              {t.nav.warehouses}
            </button>
            <button
              onClick={() => setActiveTab('movements')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'movements'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 font-semibold'
                  : ''
              }`}
            >
              {t.nav.movements}
            </button>
            <button
              onClick={() => setActiveTab('integrations')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'integrations'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 font-semibold'
                  : ''
              }`}
            >
              {t.nav.integrations}
            </button>
            <button
              onClick={() => setActiveTab('cloud')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                activeTab === 'cloud'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 font-semibold'
                  : ''
              }`}
            >
              {t.nav.cloudSync}
            </button>
            <button
              onClick={() => setActiveTab('readme')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'readme'
                  ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 font-semibold'
                  : ''
              }`}
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              {t.nav.readme}
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action + Clean Utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Suite Sync indicator */}
            <button
              onClick={() => triggerSuiteSync()}
              disabled={isSyncingAny}
              title="Synchronize all 4 suite applications"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isSyncingAny ? 'animate-spin' : ''}`} />
              <span className="whitespace-nowrap">{isSyncingAny ? t.integrations.syncing : 'Sync Apps'}</span>
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer"
                aria-label="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="uppercase font-semibold tracking-wider text-xs">{language}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-800 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer ${
                        language === l.code ? 'font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-sm">{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* PayPal Sponsor / Support Button */}
            <button
              onClick={openSponsorModal}
              title="Support developer via PayPal (luciferamorgenster@gmail.com)"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 rounded-md transition-colors cursor-pointer whitespace-nowrap"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span className="hidden sm:inline">{t.nav.sponsor}</span>
            </button>

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* Primary Action Button */}
            <button
              onClick={onOpenAddItem}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 rounded-md shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.inventory.addNewItem}</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="flex lg:hidden overflow-x-auto gap-4 py-2 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`whitespace-nowrap ${activeTab === 'inventory' ? 'text-indigo-600 font-semibold' : ''}`}
          >
            {t.nav.inventory}
          </button>
          <button
            onClick={() => setActiveTab('warehouses')}
            className={`whitespace-nowrap ${activeTab === 'warehouses' ? 'text-indigo-600 font-semibold' : ''}`}
          >
            {t.nav.warehouses}
          </button>
          <button
            onClick={() => setActiveTab('movements')}
            className={`whitespace-nowrap ${activeTab === 'movements' ? 'text-indigo-600 font-semibold' : ''}`}
          >
            {t.nav.movements}
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`whitespace-nowrap ${activeTab === 'integrations' ? 'text-indigo-600 font-semibold' : ''}`}
          >
            {t.nav.integrations}
          </button>
          <button
            onClick={() => setActiveTab('cloud')}
            className={`whitespace-nowrap ${activeTab === 'cloud' ? 'text-indigo-600 font-semibold' : ''}`}
          >
            {t.nav.cloudSync}
          </button>
          <button
            onClick={() => setActiveTab('readme')}
            className={`whitespace-nowrap ${activeTab === 'readme' ? 'text-indigo-600 font-semibold' : ''}`}
          >
            {t.nav.readme}
          </button>
        </div>
      </div>
    </header>
  );
};
