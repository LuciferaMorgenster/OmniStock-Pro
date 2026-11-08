import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import { X, Sliders, Check } from 'lucide-react';

interface StockAdjustModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  warehouseId: string;
}

export const StockAdjustModal: React.FC<StockAdjustModalProps> = ({
  isOpen,
  onClose,
  itemId,
  warehouseId,
}) => {
  const { language, items, warehouses, adjustStock } = useInventory();
  const t = translations[language];

  const item = items.find((i) => i.id === itemId);
  const [selectedWhId, setSelectedWhId] = useState(warehouseId || warehouses[0]?.id || '');
  const currentUnits = item ? item.stock[selectedWhId] || 0 : 0;

  const [newCount, setNewCount] = useState<string>(currentUnits.toString());
  const [operator, setOperator] = useState('Cycle Count Auditor');
  const [reason, setReason] = useState('Periodic physical audit count');

  if (!isOpen || !item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(newCount, 10);
    if (isNaN(qty) || qty < 0) return;

    adjustStock(item.id, selectedWhId, qty, operator.trim(), reason.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.itemDetail.adjustStock}
              </h3>
              <p className="text-xs text-slate-500">
                {item.sku} – {item.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Facility Select */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Warehouse Facility
            </label>
            <select
              value={selectedWhId}
              onChange={(e) => {
                setSelectedWhId(e.target.value);
                setNewCount((item.stock[e.target.value] || 0).toString());
              }}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {warehouses.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.code} ({w.name}) · Current: {item.stock[w.id] || 0}
                </option>
              ))}
            </select>
          </div>

          {/* Current vs New Count */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-[11px] text-slate-400 font-medium">Recorded Count:</span>
              <div className="text-lg font-mono font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {currentUnits} {item.unit}
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Actual Recounted ({item.unit}) *
              </label>
              <input
                type="number"
                min="0"
                required
                value={newCount}
                onChange={(e) => setNewCount(e.target.value)}
                className="w-full px-3 py-2 font-mono text-base font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Operator & Reason */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Auditor / Operator Name
            </label>
            <input
              type="text"
              required
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Adjustment Justification
            </label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {t.common.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg font-bold text-white bg-amber-600 hover:bg-amber-700 transition-colors cursor-pointer"
            >
              Update Physical Stock Count
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
