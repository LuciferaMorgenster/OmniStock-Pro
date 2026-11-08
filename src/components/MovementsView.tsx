import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import { MovementType, StockMovement } from '../types';
import {
  History,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowRightLeft,
  Sliders,
  RotateCcw,
  Plus,
  Filter,
} from 'lucide-react';

interface MovementsViewProps {
  onOpenRecordMovement: () => void;
}

export const MovementsView: React.FC<MovementsViewProps> = ({ onOpenRecordMovement }) => {
  const { language, movements, warehouses } = useInventory();
  const t = translations[language];

  const [typeFilter, setTypeFilter] = useState<string>('all');

  const getWarehouseName = (id?: string) => {
    if (!id) return '-';
    const wh = warehouses.find((w) => w.id === id);
    return wh ? `${wh.code} (${wh.name.split(' ')[0]})` : id;
  };

  const getMovementIcon = (type: MovementType) => {
    switch (type) {
      case 'receive':
        return <ArrowDownLeft className="w-4 h-4 text-emerald-600" />;
      case 'sale':
        return <ArrowUpRight className="w-4 h-4 text-blue-600" />;
      case 'transfer':
        return <ArrowRightLeft className="w-4 h-4 text-indigo-600" />;
      case 'adjust':
        return <Sliders className="w-4 h-4 text-amber-600" />;
      case 'project_req':
        return <History className="w-4 h-4 text-purple-600" />;
      case 'return':
        return <RotateCcw className="w-4 h-4 text-rose-600" />;
      default:
        return <History className="w-4 h-4 text-slate-500" />;
    }
  };

  const filteredMovements = movements.filter((m) => {
    if (typeFilter === 'all') return true;
    return m.type === typeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {t.movements.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {t.movements.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Movement Types</option>
            <option value="receive">{t.movements.types.receive}</option>
            <option value="transfer">{t.movements.types.transfer}</option>
            <option value="adjust">{t.movements.types.adjust}</option>
            <option value="sale">{t.movements.types.sale}</option>
            <option value="project_req">{t.movements.types.project_req}</option>
            <option value="return">{t.movements.types.return}</option>
          </select>

          <button
            onClick={onOpenRecordMovement}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>{t.movements.recordNew}</span>
          </button>
        </div>
      </div>

      {/* Movements Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">{t.movements.date}</th>
                <th className="py-3 px-4">{t.movements.type}</th>
                <th className="py-3 px-4">{t.movements.item}</th>
                <th className="py-3 px-4 text-center">{t.movements.qty}</th>
                <th className="py-3 px-4">{t.movements.from}</th>
                <th className="py-3 px-4">{t.movements.to}</th>
                <th className="py-3 px-4">{t.movements.operator}</th>
                <th className="py-3 px-4">{t.movements.notes}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredMovements.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                    {new Date(m.timestamp).toLocaleString(language === 'nl' ? 'nl-NL' : 'en-US', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 font-medium text-slate-800 dark:text-slate-200">
                      {getMovementIcon(m.type)}
                      <span>{t.movements.types[m.type] || m.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                    <div>{m.itemName}</div>
                    <div className="font-mono text-[10px] text-slate-400">{m.sku}</div>
                  </td>
                  <td className="py-3 px-4 text-center font-mono tabular-nums font-bold text-slate-900 dark:text-white">
                    {m.quantity}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                    {getWarehouseName(m.fromWarehouseId)}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                    {getWarehouseName(m.toWarehouseId)}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    {m.operator}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px] max-w-xs truncate" title={m.notes}>
                    <span>{m.notes}</span>
                    {m.suiteRef && (
                      <span className="ml-2 font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                        [{m.suiteRef}]
                      </span>
                    )}
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
