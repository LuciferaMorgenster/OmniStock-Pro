import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const { language } = useInventory();

  if (isOnline) return null;

  const message = {
    en: 'Offline Mode — Operating from cached local vault data.',
    nl: 'Offline Modus — U werkt met lokaal opgeslagen voorraadgegevens.',
    de: 'Offline-Modus — Daten werden aus dem lokalen Speicher geladen.',
    fr: 'Mode Hors-ligne — Fonctionnement sur les données locales en cache.',
  }[language] || 'Offline Mode — Operating from cached local vault data.';

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-amber-500 text-white px-3.5 py-2 text-xs font-medium shadow-xl border border-amber-600 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
};
