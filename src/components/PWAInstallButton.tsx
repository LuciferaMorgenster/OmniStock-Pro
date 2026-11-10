import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useInventory } from '../context/InventoryContext';
import { Download, Smartphone, X, Check } from 'lucide-react';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { language } = useInventory();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running inside standalone PWA mode, hide install button
  if (isInstalled) {
    return null;
  }

  const labels = {
    en: {
      install: 'Install App',
      installIOS: 'Install App',
      modalTitle: 'Install OmniStock Pro on iPhone / iPad',
      step1: 'Tap the Share icon in the Safari toolbar.',
      step2: 'Scroll down and tap "Add to Home Screen".',
      close: 'Got It',
    },
    nl: {
      install: 'App Installeren',
      installIOS: 'App Installeren',
      modalTitle: 'Installeer OmniStock Pro op iPhone / iPad',
      step1: 'Tik op het Deel-icoon in de Safari werkbalk.',
      step2: 'Scrol omlaag en kies "Zet op beginscherm".',
      close: 'Begrepen',
    },
    de: {
      install: 'App Installieren',
      installIOS: 'App Installieren',
      modalTitle: 'OmniStock Pro auf iPhone / iPad installieren',
      step1: 'Tippen Sie auf das Teilen-Symbol in Safari.',
      step2: 'Wählen Sie "Zum Home-Bildschirm hinzufügen".',
      close: 'Verstanden',
    },
    fr: {
      install: "Installer l'App",
      installIOS: "Installer l'App",
      modalTitle: 'Installer OmniStock Pro sur iPhone / iPad',
      step1: "Appuyez sur l'icône Partager dans la barre Safari.",
      step2: 'Faites défiler et appuyez sur "Sur l\'écran d\'accueil".',
      close: 'Compris',
    },
  }[language] || {
    install: 'Install App',
    installIOS: 'Install App',
    modalTitle: 'Install OmniStock Pro on iPhone / iPad',
    step1: 'Tap the Share icon in the Safari toolbar.',
    step2: 'Scroll down and tap "Add to Home Screen".',
    close: 'Got It',
  };

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        title="Install OmniStock Pro as a native desktop/mobile app"
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 rounded-md shadow-sm transition-all cursor-pointer whitespace-nowrap"
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{labels.install}</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          title="Install OmniStock Pro on iOS Home Screen"
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer whitespace-nowrap"
        >
          <Smartphone className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span className="hidden sm:inline">{labels.installIOS}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white relative">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3">
                <Smartphone className="w-5 h-5" />
              </div>

              <h3 className="text-base font-bold">{labels.modalTitle}</h3>
              <div className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600 font-mono">1.</span>
                  <span>{labels.step1}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-indigo-600 font-mono">2.</span>
                  <span>{labels.step2}</span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition cursor-pointer"
              >
                {labels.close}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback for browsers that don't trigger beforeinstallprompt right away (desktop Chrome before interaction or other browsers)
  return (
    <button
      onClick={() => {
        alert(
          language === 'nl'
            ? 'Voorraadbeheer als PWA installeren: Gebruik het installatie-icoon in de adresbalk van uw browser of voeg toe aan uw beginscherm.'
            : 'To install OmniStock Pro as an app: Click the install icon in your browser address bar or add to home screen.'
        );
      }}
      title="PWA App Install"
      className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors cursor-pointer whitespace-nowrap"
    >
      <Download className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
      <span className="hidden xl:inline">{labels.install}</span>
    </button>
  );
};
