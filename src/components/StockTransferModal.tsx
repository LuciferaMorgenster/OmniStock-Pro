import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import { X, ArrowRightLeft, AlertCircle } from 'lucide-react';

interface StockTransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultItemId?: string;
  defaultFromWhId?: string;
}

export const StockTransferModal: React.FC<StockTransferModalProps> = ({
  isOpen,
  onClose,
  defaultItemId,
  defaultFromWhId,
}) => {
  const { language, items, warehouses, transferStock } = useInventory();
  const t = translations[language];

  const [selectedItemId, setSelectedItemId] = useState<string>(
    defaultItemId || (items[0]?.id ?? '')
  );
  const [fromWarehouseId, setFromWarehouseId] = useState<string>(
    defaultFromWhId || warehouses[0]?.id || ''
  );
  const [toWarehouseId, setToWarehouseId] = useState<string>(
    warehouses[1]?.id || ''
  );
  const [quantity, setQuantity] = useState<string>('5');
  const [operator, setOperator] = useState<string>('Sophie van Dijk');
  const [notes, setNotes] = useState<string>('Stock balancing transfer');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentItem = items.find((i) => i.id === selectedItemId) || items[0];
  const availableStock = currentItem ? currentItem.stock[fromWarehouseId] || 0 : 0;

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (fromWarehouseId === toWarehouseId) {
      setErrorMessage('Source and destination warehouse cannot be the same facility.');
      return;
    }

    const qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty <= 0) {
      setErrorMessage('Transfer quantity must be greater than zero.');
      return;
    }

    if (qty > availableStock) {
      setErrorMessage(
        `Insufficient stock: Only ${availableStock} units available at origin facility.`
      );
      return;
    }

    const success = transferStock(
      currentItem.id,
      fromWarehouseId,
      toWarehouseId,
      qty,
      operator.trim(),
      notes.trim()
    );

    if (success) {
      onClose();
    } else {
      setErrorMessage('Transfer failed. Please check facility stock counts.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.warehouses.transferBetween}
              </h3>
              <p className="text-xs text-slate-500">
                Move stock between logistics locations with immediate audit logging.
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
        <form onSubmit={handleTransfer} className="p-6 space-y-4 text-xs">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Select Item */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Select Product SKU *
            </label>
            <select
              value={selectedItemId}
              onChange={(e) => setSelectedItemId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {items.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.sku} – {i.name}
                </option>
              ))}
            </select>
          </div>

          {/* Origin & Destination */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                From Facility *
              </label>
              <select
                value={fromWarehouseId}
                onChange={(e) => setFromWarehouseId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {warehouses.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.code} ({w.name.split(' ')[0]})
                  </option>
                ))}
              </select>
              <div className="text-[10px] text-slate-500">
                Available: <strong className="font-mono">{availableStock}</strong> {currentItem?.unit}
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                To Destination *
              </label>
              <select
                value={toWarehouseId}
                onChange={(e) => setToWarehouseId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {warehouses.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.code} ({w.name.split(' ')[0]})
                  </option>
                ))}
              </select>
              <div className="text-[10px] text-slate-500">
                Current: <strong className="font-mono">{currentItem?.stock[toWarehouseId] || 0}</strong> {currentItem?.unit}
              </div>
            </div>
          </div>

          {/* Quantity & Operator */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Transfer Quantity ({currentItem?.unit}) *
              </label>
              <input
                type="number"
                min="1"
                max={availableStock}
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Authorized Operator *
              </label>
              <input
                type="text"
                required
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Audit Notes & Reference
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Stock balancing, Customer order preparation"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Actions */}
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
              className="px-4 py-2 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Confirm Inter-Facility Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
