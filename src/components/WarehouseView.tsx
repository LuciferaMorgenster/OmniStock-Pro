import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import {
  Warehouse as WarehouseIcon,
  MapPin,
  UserCheck,
  Package,
  TrendingUp,
  ArrowRightLeft,
  Boxes,
} from 'lucide-react';

interface WarehouseViewProps {
  onOpenTransfer: (itemId?: string, defaultWarehouseId?: string) => void;
}

export const WarehouseView: React.FC<WarehouseViewProps> = ({ onOpenTransfer }) => {
  const { language, warehouses, items } = useInventory();
  const t = translations[language];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(
      language === 'nl' ? 'nl-NL' : language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US',
      { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }
    ).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.warehouses.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {t.warehouses.subtitle}
          </p>
        </div>

        <button
          onClick={() => onOpenTransfer()}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>{t.warehouses.transferBetween}</span>
        </button>
      </div>

      {/* Warehouses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {warehouses.map((wh) => {
          // Calculate total units and valuation in this warehouse
          let totalWhUnits = 0;
          let totalWhValuation = 0;
          let storedSkusCount = 0;

          items.forEach((item) => {
            const qty = item.stock[wh.id] || 0;
            if (qty > 0) {
              totalWhUnits += qty;
              totalWhValuation += qty * item.unitCost;
              storedSkusCount += 1;
            }
          });

          const utilizationPct = Math.min(100, Math.round((totalWhUnits / wh.capacity) * 100));

          return (
            <div
              key={wh.id}
              className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <WarehouseIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {wh.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{wh.location}</span>
                    </div>
                  </div>
                </div>

                <span className="font-mono text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded">
                  {wh.code}
                </span>
              </div>

              {/* Manager & Utilization Bar */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.warehouses.manager}:</span>
                    <strong className="text-slate-900 dark:text-white font-medium">
                      {wh.manager}
                    </strong>
                  </div>
                  <div className="font-mono tabular-nums text-slate-500">
                    {utilizationPct}% {t.warehouses.utilization}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      utilizationPct > 85
                        ? 'bg-rose-500'
                        : utilizationPct > 65
                        ? 'bg-amber-500'
                        : 'bg-indigo-600'
                    }`}
                    style={{ width: `${utilizationPct}%` }}
                  />
                </div>

                {/* Key Numbers */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="text-[11px] text-slate-500">{t.warehouses.stockLevels}</div>
                    <div className="text-sm font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-0.5">
                      {totalWhUnits.toLocaleString()}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="text-[11px] text-slate-500">SKUs Stored</div>
                    <div className="text-sm font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-0.5">
                      {storedSkusCount} / {items.length}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="text-[11px] text-slate-500">Asset Value</div>
                    <div className="text-sm font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-400 mt-0.5">
                      {formatCurrency(totalWhValuation)}
                    </div>
                  </div>
                </div>

                {/* Quick Action Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onOpenTransfer(undefined, wh.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors cursor-pointer"
                  >
                    <ArrowRightLeft className="w-3.5 h-3.5" />
                    <span>Initiate Inter-Warehouse Transfer</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
