import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import { SuiteAppId } from '../types';
import {
  Users,
  Briefcase,
  Calculator,
  Compass,
  RefreshCw,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const SuiteIntegrationHub: React.FC = () => {
  const { language, integrations, triggerSuiteSync, isSyncingAny, items } = useInventory();
  const t = translations[language];

  const [selectedAppId, setSelectedAppId] = useState<SuiteAppId>('talentPulse');

  const appIcons: Record<SuiteAppId, React.ReactNode> = {
    talentPulse: <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    kopilot: <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    boekhoudGemak: <Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    nexusCrm: <Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
  };

  const selectedApp = integrations.find((a) => a.id === selectedAppId) || integrations[0];

  return (
    <div className="space-y-6">
      {/* Top Banner / Sync Action */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <Activity className="w-4 h-4" />
            <span>{t.integrations.badge}</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.integrations.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            {t.integrations.subtitle}
          </p>
        </div>

        <button
          onClick={() => triggerSuiteSync()}
          disabled={isSyncingAny}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-sm transition-all cursor-pointer whitespace-nowrap self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncingAny ? 'animate-spin' : ''}`} />
          <span>{isSyncingAny ? t.integrations.syncing : t.integrations.syncAllNow}</span>
        </button>
      </div>

      {/* 4 App Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrations.map((app) => {
          const isSelected = app.id === selectedAppId;
          const appTrans = t.integrations.apps[app.id];

          return (
            <div
              key={app.id}
              onClick={() => setSelectedAppId(app.id)}
              className={`rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-400 dark:border-indigo-600 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    {appIcons[app.id]}
                  </div>

                  {/* Status Indicator (zero-pill: clean text with dot) */}
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{app.status === 'syncing' ? t.integrations.statusSyncing : t.integrations.statusConnected}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {app.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 mb-3">
                  {appTrans.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="text-[11px] text-slate-500">{appTrans.metricLabel}</div>
                <div className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-0.5">
                  {app.primaryMetric.value}
                </div>

                <div className="flex items-center justify-between mt-3 text-[11px]">
                  <span className="text-slate-400 font-mono text-[10px]">{app.lastSynced.split(' ')[1]}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      triggerSuiteSync(app.id);
                    }}
                    disabled={isSyncingAny}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <span>{t.integrations.triggerManualSync}</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected App Detailed View & Linked Records Inspector */}
      {selectedApp && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {appIcons[selectedApp.id]}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selectedApp.name} – {selectedApp.tagline}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{t.integrations.lastSynced}: <strong className="font-mono text-slate-700 dark:text-slate-300">{selectedApp.lastSynced}</strong></span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedApp.syncInterval}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => triggerSuiteSync(selectedApp.id)}
              disabled={isSyncingAny}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${selectedApp.status === 'syncing' ? 'animate-spin' : ''}`} />
              <span>{selectedApp.status === 'syncing' ? t.integrations.syncing : t.integrations.triggerManualSync}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: App Features & Operational Rules */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Cross-Application Features
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                {t.integrations.apps[selectedApp.id].features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Linked Items from Inventory */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Linked Stock Items ({selectedApp.syncedRecordsCount} Total Active)
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {items.map((item) => {
                    let linkVal = '';
                    if (selectedApp.id === 'talentPulse') linkVal = item.linkedSuite?.talentPulsePicker || '';
                    if (selectedApp.id === 'kopilot') linkVal = item.linkedSuite?.kopilotProjectId || '';
                    if (selectedApp.id === 'boekhoudGemak') linkVal = item.linkedSuite?.boekhoudGemakAccount || '';
                    if (selectedApp.id === 'nexusCrm') linkVal = item.linkedSuite?.nexusCrmOrderId || '';

                    if (!linkVal) return null;

                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs"
                      >
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{item.name}</span>
                          <span className="text-slate-400 font-mono text-[11px] ml-2">({item.sku})</span>
                        </div>
                        <span className="font-mono text-[11px] font-medium text-indigo-600 dark:text-indigo-400">
                          {linkVal}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Sync Audit Log Timeline */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Live Handshake & Event Log
              </h4>
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {selectedApp.logs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {log.event}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400">
                        {log.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {log.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
