import React from 'react';
import { InventoryItem } from '../types';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import {
  X,
  Package,
  Layers,
  ArrowRightLeft,
  Sliders,
  Building,
  CheckCircle2,
  Barcode,
  Truck,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

interface ItemDetailDrawerProps {
  item: InventoryItem | null;
  onClose: () => void;
  onOpenTransfer: (itemId: string) => void;
  onOpenAdjust: (itemId: string, warehouseId: string) => void;
  onOpenBarcode: (item: InventoryItem) => void;
}

export const ItemDetailDrawer: React.FC<ItemDetailDrawerProps> = ({
  item,
  onClose,
  onOpenTransfer,
  onOpenAdjust,
  onOpenBarcode,
}) => {
  const { language, warehouses } = useInventory();
  const t = translations[language];

  if (!item) return null;

  const totalStock = Object.values(item.stock).reduce((a, b) => a + (b || 0), 0);
  const totalValuation = totalStock * item.unitCost;
  const grossMargin =
    item.unitPrice > 0
      ? Math.round(((item.unitPrice - item.unitCost) / item.unitPrice) * 100)
      : 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat(
      language === 'nl' ? 'nl-NL' : language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US',
      { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }
    ).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 h-full shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-right duration-250">
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3 bg-slate-50/50 dark:bg-slate-800/40">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 dark:text-indigo-400 font-semibold uppercase">
              <span>{item.sku}</span>
              <span aria-hidden="true">·</span>
              <span>{item.category}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              {item.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 font-medium">{t.inventory.table.totalUnits}</span>
              <div className="text-lg font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-0.5">
                {totalStock} {item.unit}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 font-medium">{t.inventory.table.totalValue}</span>
              <div className="text-lg font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-0.5">
                {formatCurrency(totalValuation)}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-400 font-medium">Gross Margin</span>
              <div className="text-lg font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-400 mt-0.5">
                {grossMargin}%
              </div>
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <div className="space-y-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Description</span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          )}

          {/* Warehouse Stock Breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between font-semibold text-slate-800 dark:text-slate-200">
              <span>{t.itemDetail.stockBreakdown}</span>
              <button
                onClick={() => onOpenTransfer(item.id)}
                className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Transfer Stock</span>
              </button>
            </div>

            <div className="space-y-2">
              {warehouses.map((wh) => {
                const count = item.stock[wh.id] || 0;
                return (
                  <div
                    key={wh.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30"
                  >
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {wh.name} <span className="font-mono text-slate-400 text-[10px]">({wh.code})</span>
                      </div>
                      <div className="text-[10px] text-slate-400">{wh.location}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-slate-900 dark:text-white tabular-nums">
                        {count} {item.unit}
                      </span>
                      <button
                        onClick={() => onOpenAdjust(item.id, wh.id)}
                        className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-amber-600 transition-colors cursor-pointer"
                        title="Adjust count at this facility"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing & Commercial Data */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-2">
              Financial & Procurement Details
            </span>
            <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
              <div>
                <span className="text-slate-400">Unit Cost:</span>{' '}
                <strong className="font-mono text-slate-900 dark:text-white">{formatCurrency(item.unitCost)}</strong>
              </div>
              <div>
                <span className="text-slate-400">Unit Price:</span>{' '}
                <strong className="font-mono text-slate-900 dark:text-white">{formatCurrency(item.unitPrice)}</strong>
              </div>
              <div>
                <span className="text-slate-400">Reorder Threshold:</span>{' '}
                <strong className="font-mono text-slate-900 dark:text-white">{item.reorderThreshold} {item.unit}</strong>
              </div>
              <div>
                <span className="text-slate-400">Supplier:</span>{' '}
                <strong className="text-slate-900 dark:text-white">{item.supplier}</strong>
              </div>
            </div>
          </div>

          {/* Suite App Integrations Linked */}
          <div className="space-y-3">
            <span className="font-semibold text-slate-800 dark:text-slate-200 block">
              {t.itemDetail.suiteConnections}
            </span>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50">
                <span className="font-semibold text-emerald-800 dark:text-emerald-300">TalentPulse-HRIS Assigned Picker:</span>
                <div className="font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                  {item.linkedSuite?.talentPulsePicker || 'None assigned'}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50">
                <span className="font-semibold text-indigo-800 dark:text-indigo-300">Kopilot Projects BOM Allocation:</span>
                <div className="font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                  {item.linkedSuite?.kopilotProjectId || 'No active project reservation'}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50">
                <span className="font-semibold text-amber-800 dark:text-amber-300">BoekhoudGemak Asset Ledger:</span>
                <div className="font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                  {item.linkedSuite?.boekhoudGemakAccount || 'Unallocated GL code'}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50">
                <span className="font-semibold text-blue-800 dark:text-blue-300">NexusCRM Order Allocation:</span>
                <div className="font-mono text-slate-800 dark:text-slate-200 mt-0.5">
                  {item.linkedSuite?.nexusCrmOrderId || 'No customer deal allocation'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between gap-3">
          <button
            onClick={() => onOpenBarcode(item)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 transition-colors cursor-pointer"
          >
            <Barcode className="w-4 h-4 text-indigo-600" />
            <span>Show Barcode</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenTransfer(item.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Transfer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
