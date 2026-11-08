import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import {
  Layers,
  TrendingUp,
  Warehouse as WarehouseIcon,
  AlertTriangle,
  RefreshCw,
  DownloadCloud,
  ArrowRightLeft,
  CheckCircle2,
} from 'lucide-react';

interface CoverBannerProps {
  onOpenTransfer: () => void;
}

export const CoverBanner: React.FC<CoverBannerProps> = ({ onOpenTransfer }) => {
  const {
    language,
    items,
    warehouses,
    totalValuation,
    totalUnits,
    lowStockItemsCount,
    triggerSuiteSync,
    isSyncingAny,
    createSnapshot,
  } = useInventory();

  const [imageError, setImageError] = useState(false);
  const t = translations[language];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(language === 'nl' ? 'nl-NL' : language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="relative mb-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-sm">
      {/* Visual Cover Image with Scrim */}
      <div className="relative h-48 sm:h-64 md:h-72 w-full overflow-hidden">
        {!imageError ? (
          <img
            src="/src/assets/images/omnistock_cover_showcase_1794120091394.jpg"
            alt="OmniStock Pro modern automated inventory management and warehouse operations center"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center filter brightness-90 transform scale-100 transition-transform duration-700 hover:scale-102"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center">
            <Layers className="w-16 h-16 text-indigo-400/40" />
          </div>
        )}

        {/* Measured Scrim for Maximum Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/40" />

        {/* Hero Copy */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-2">
            <span>OmniStock Core</span>
            <span aria-hidden="true">·</span>
            <span>TalentPulse / Kopilot / BoekhoudGemak / NexusCRM</span>
            <span aria-hidden="true">·</span>
            <span>v2.4 Enterprise</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2 max-w-3xl text-balance">
            {t.appName} – {t.tagline}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl hidden sm:block">
            {t.seo.description}
          </p>
        </div>
      </div>

      {/* KPI Metric Strip (No cards within cards - clean spatial dividing line) */}
      <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800/80 bg-slate-950 text-white">
        {/* Metric 1: Total SKUs */}
        <div className="p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">{t.stats.totalItems}</div>
            <div className="text-lg sm:text-xl font-bold font-mono tabular-nums text-white">
              {items.length} <span className="text-xs font-normal text-slate-400 font-sans">({totalUnits} units)</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Total Valuation */}
        <div className="p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">{t.stats.totalValuation}</div>
            <div className="text-lg sm:text-xl font-bold font-mono tabular-nums text-emerald-400">
              {formatCurrency(totalValuation)}
            </div>
          </div>
        </div>

        {/* Metric 3: Active Warehouses */}
        <div className="p-4 sm:p-5 flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <WarehouseIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">{t.stats.activeWarehouses}</div>
            <div className="text-lg sm:text-xl font-bold font-mono tabular-nums text-white">
              {warehouses.length} Facilities
            </div>
          </div>
        </div>

        {/* Metric 4: Health / Alerts */}
        <div className="p-4 sm:p-5 flex items-center gap-3.5">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${
              lowStockItemsCount > 0
                ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
            }`}
          >
            {lowStockItemsCount > 0 ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <CheckCircle2 className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">{t.stats.lowStockAlerts}</div>
            <div
              className={`text-lg sm:text-xl font-bold font-mono tabular-nums ${
                lowStockItemsCount > 0 ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {lowStockItemsCount > 0 ? `${lowStockItemsCount} Action Needed` : 'All Optimal'}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Toolbar Strip */}
      <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{t.stats.allSystemsNormal}</span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenTransfer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.warehouses.transferBetween}</span>
          </button>

          <button
            onClick={() => triggerSuiteSync()}
            disabled={isSyncingAny}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isSyncingAny ? 'animate-spin' : ''}`} />
            <span>{isSyncingAny ? t.integrations.syncing : t.integrations.syncAllNow}</span>
          </button>

          <button
            onClick={createSnapshot}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors cursor-pointer"
          >
            <DownloadCloud className="w-3.5 h-3.5" />
            <span>{t.cloud.createSnapshot}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
