import React, { useRef, useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import {
  Cloud,
  HardDrive,
  Download,
  Upload,
  RefreshCw,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  FileCode,
  ShieldAlert,
} from 'lucide-react';

export const CloudSyncView: React.FC = () => {
  const {
    language,
    backups,
    createSnapshot,
    restoreSnapshot,
    exportDataAsJson,
    exportDataAsCsv,
    items,
    warehouses,
    totalValuation,
  } = useInventory();

  const t = translations[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [restoreStatus, setRestoreStatus] = useState<string | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(
      language === 'nl' ? 'nl-NL' : language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US',
      { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }
    ).format(val);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.items || !Array.isArray(parsed.items)) {
          alert('Invalid snapshot file format. Missing "items" array.');
          return;
        }

        const confirmRestore = window.confirm(
          `Found ${parsed.items.length} SKUs in backup "${file.name}". Do you want to restore and overwrite current inventory records?`
        );

        if (confirmRestore) {
          restoreSnapshot(parsed);
          setRestoreStatus(`Restored ${parsed.items.length} items from ${file.name}`);
          setTimeout(() => setRestoreStatus(null), 4000);
        }
      } catch (err) {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t.cloud.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {t.cloud.subtitle}
        </p>
      </div>

      {/* Restore feedback toast */}
      {restoreStatus && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{restoreStatus}</span>
        </div>
      )}

      {/* Google Workspace & Drive Status Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
              <Cloud className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {t.cloud.googleDriveTitle}
                </h3>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  · {t.cloud.connected}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                {t.cloud.googleDriveDesc}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={createSnapshot}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.cloud.createSnapshot}</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{t.cloud.importLocal}</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* Operational Highlights */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <span className="text-slate-500 font-medium">Active Items in Cache:</span>
            <div className="text-sm font-bold font-mono text-slate-900 dark:text-white mt-0.5">
              {items.length} SKUs across {warehouses.length} Warehouses
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <span className="text-slate-500 font-medium">Protected Valuation:</span>
            <div className="text-sm font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">
              {formatCurrency(totalValuation)}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
            <span className="text-slate-500 font-medium">Export Formats:</span>
            <div className="flex items-center gap-3 mt-1">
              <button
                onClick={exportDataAsCsv}
                className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                CSV Catalog
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={exportDataAsJson}
                className="text-xs font-semibold text-indigo-600 hover:underline cursor-pointer"
              >
                Full JSON Vault
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backup Vault List */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {t.cloud.backupsList}
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {backups.length} Snapshots Saved
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">{t.cloud.fileName}</th>
                <th className="py-3 px-4">{t.cloud.date}</th>
                <th className="py-3 px-4 text-center">{t.cloud.items}</th>
                <th className="py-3 px-4 text-right">{t.cloud.valuation}</th>
                <th className="py-3 px-4 text-center">Storage Target</th>
                <th className="py-3 px-4 text-center">{t.cloud.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {backups.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-indigo-600" />
                      <span>{b.fileName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono whitespace-nowrap">
                    {b.timestamp}
                  </td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums font-bold">
                    {b.itemCount} SKUs
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(b.totalValuation)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                      {b.location}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={createSnapshot}
                      className="px-2.5 py-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 rounded bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      {t.cloud.download}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
