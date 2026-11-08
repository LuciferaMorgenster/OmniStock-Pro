import React, { useState, useMemo } from 'react';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import { InventoryItem } from '../types';
import {
  Search,
  Filter,
  Download,
  Barcode,
  ArrowRightLeft,
  Sliders,
  Trash2,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  FileSpreadsheet,
  FileCode,
  Sparkles,
} from 'lucide-react';

interface InventoryListProps {
  onSelectItem: (item: InventoryItem) => void;
  onOpenTransfer: (itemId?: string) => void;
  onOpenAdjust: (itemId: string, warehouseId: string) => void;
  onOpenBarcode: (item: InventoryItem) => void;
}

export const InventoryList: React.FC<InventoryListProps> = ({
  onSelectItem,
  onOpenTransfer,
  onOpenAdjust,
  onOpenBarcode,
}) => {
  const {
    language,
    items,
    warehouses,
    deleteItem,
    exportDataAsCsv,
    exportDataAsJson,
  } = useInventory();

  const t = translations[language];

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => set.add(i.category));
    return Array.from(set);
  }, [items]);

  // Currency formatter
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat(
      language === 'nl' ? 'nl-NL' : language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US',
      { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }
    ).format(amount);
  };

  // Filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Search matching
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.barcode.includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q));

      // Category matching
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;

      // Warehouse matching
      const matchesWh =
        selectedWarehouse === 'all' || (item.stock[selectedWarehouse] || 0) > 0;

      // Stock status matching
      const totalStock = Object.values(item.stock).reduce((a, b) => a + (b || 0), 0);
      let status = 'in_stock';
      if (totalStock === 0) status = 'out_of_stock';
      else if (totalStock <= Math.floor(item.reorderThreshold * 0.5)) status = 'critical';
      else if (totalStock <= item.reorderThreshold) status = 'low_stock';

      const matchesStatus =
        selectedStatus === 'all' ||
        (selectedStatus === 'in_stock' && status === 'in_stock') ||
        (selectedStatus === 'low_stock' && (status === 'low_stock' || status === 'critical')) ||
        (selectedStatus === 'critical' && status === 'critical') ||
        (selectedStatus === 'out_of_stock' && status === 'out_of_stock');

      return matchesSearch && matchesCat && matchesWh && matchesStatus;
    });
  }, [items, searchTerm, selectedCategory, selectedWarehouse, selectedStatus]);

  // Compute item health label (zero-pill design: clean typographic label with separator)
  const renderStockHealth = (item: InventoryItem) => {
    const totalStock = Object.values(item.stock).reduce((a, b) => a + (b || 0), 0);
    if (totalStock === 0) {
      return (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
          <XCircle className="w-3.5 h-3.5" />
          <span>{t.inventory.statusOutOfStock}</span>
        </div>
      );
    }
    if (totalStock <= Math.floor(item.reorderThreshold * 0.5)) {
      return (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{t.inventory.statusCritical}</span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span className="font-mono">{totalStock} {item.unit}</span>
        </div>
      );
    }
    if (totalStock <= item.reorderThreshold) {
      return (
        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{t.inventory.statusLowStock}</span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span className="font-mono">{totalStock} {item.unit}</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
        <CheckCircle className="w-3.5 h-3.5" />
        <span>{t.inventory.statusInStock}</span>
        <span aria-hidden="true" className="text-slate-400">·</span>
        <span className="font-mono">{totalStock} {item.unit}</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.inventory.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Filter Controls (interactive segmented buttons / selects) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">{t.inventory.allCategories}</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Warehouse */}
          <select
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">{t.inventory.allWarehouses}</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.id}>
                {w.code} – {w.name}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">{t.inventory.allStatuses}</option>
            <option value="in_stock">{t.inventory.statusInStock}</option>
            <option value="low_stock">{t.inventory.statusLowStock}</option>
            <option value="critical">{t.inventory.statusCritical}</option>
            <option value="out_of_stock">{t.inventory.statusOutOfStock}</option>
          </select>

          {/* Exports */}
          <button
            onClick={exportDataAsCsv}
            title={t.inventory.exportCsv}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">CSV</span>
          </button>

          <button
            onClick={exportDataAsJson}
            title={t.inventory.exportJson}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <FileCode className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">JSON</span>
          </button>
        </div>
      </div>

      {/* Main High-Density Inventory Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {filteredItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">{t.inventory.table.sku}</th>
                  <th className="py-3 px-4">{t.inventory.table.product}</th>
                  <th className="py-3 px-4">{t.inventory.table.stockStatus}</th>
                  <th className="py-3 px-4">{t.inventory.table.distribution}</th>
                  <th className="py-3 px-4 text-right">{t.inventory.table.cost}</th>
                  <th className="py-3 px-4 text-right">{t.inventory.table.price}</th>
                  <th className="py-3 px-4 text-right">{t.inventory.table.totalValue}</th>
                  <th className="py-3 px-4">{t.inventory.table.suiteLinks}</th>
                  <th className="py-3 px-4 text-center">{t.inventory.table.actions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredItems.map((item) => {
                  const totalUnits = Object.values(item.stock).reduce((a, b) => a + (b || 0), 0);
                  const totalValuation = totalUnits * item.unitCost;

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* SKU / Barcode */}
                      <td className="py-3 px-4 font-mono font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span>{item.sku}</span>
                          <button
                            onClick={() => onOpenBarcode(item)}
                            title="View Barcode"
                            className="text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer"
                          >
                            <Barcode className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[10px] text-slate-400 font-sans tracking-normal">
                          {item.barcode}
                        </div>
                      </td>

                      {/* Product Name & Category */}
                      <td className="py-3 px-4 min-w-[200px]">
                        <button
                          onClick={() => onSelectItem(item)}
                          className="text-left font-semibold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer block line-clamp-1"
                        >
                          {item.name}
                        </button>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          <span>{item.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-slate-400">{item.supplier}</span>
                        </div>
                      </td>

                      {/* Stock Health */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        {renderStockHealth(item)}
                        <div className="text-[10px] text-slate-400 mt-0.5 font-sans">
                          {t.itemDetail.reorderLevel}: {item.reorderThreshold} {item.unit}
                        </div>
                      </td>

                      {/* Warehouse Distribution */}
                      <td className="py-3 px-4 min-w-[170px]">
                        <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] font-mono tabular-nums text-slate-600 dark:text-slate-300">
                          {warehouses.map((wh) => (
                            <span key={wh.id} className="whitespace-nowrap">
                              <span className="text-slate-400 font-sans">{wh.code}:</span>{' '}
                              <span className="font-semibold">{item.stock[wh.id] || 0}</span>
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Unit Cost */}
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {formatMoney(item.unitCost)}
                      </td>

                      {/* Unit Price */}
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-900 dark:text-slate-100 font-medium whitespace-nowrap">
                        {formatMoney(item.unitPrice)}
                      </td>

                      {/* Total Valuation */}
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-indigo-600 dark:text-indigo-400 font-semibold whitespace-nowrap">
                        {formatMoney(totalValuation)}
                      </td>

                      {/* Suite Links (TalentPulse, Kopilot, BoekhoudGemak, NexusCRM) */}
                      <td className="py-3 px-4 min-w-[150px]">
                        <div className="flex flex-col gap-0.5 text-[10px]">
                          {item.linkedSuite?.talentPulsePicker && (
                            <span className="text-slate-600 dark:text-slate-400 truncate max-w-[140px]" title={item.linkedSuite.talentPulsePicker}>
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400">TP:</span> {item.linkedSuite.talentPulsePicker.split(' ')[0]}
                            </span>
                          )}
                          {item.linkedSuite?.kopilotProjectId && (
                            <span className="text-slate-600 dark:text-slate-400 truncate max-w-[140px]">
                              <span className="font-semibold text-indigo-600 dark:text-indigo-400">KP:</span> {item.linkedSuite.kopilotProjectId}
                            </span>
                          )}
                          {item.linkedSuite?.boekhoudGemakAccount && (
                            <span className="text-slate-600 dark:text-slate-400 truncate max-w-[140px]">
                              <span className="font-semibold text-amber-600 dark:text-amber-400">BG:</span> {item.linkedSuite.boekhoudGemakAccount.split(' ')[0]}
                            </span>
                          )}
                          {item.linkedSuite?.nexusCrmOrderId && (
                            <span className="text-slate-600 dark:text-slate-400 truncate max-w-[140px]">
                              <span className="font-semibold text-blue-600 dark:text-blue-400">CRM:</span> {item.linkedSuite.nexusCrmOrderId}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => onOpenTransfer(item.id)}
                            title="Inter-Warehouse Transfer"
                            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                          >
                            <ArrowRightLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onOpenAdjust(item.id, 'wh-ams')}
                            title="Adjust Stock Count"
                            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-amber-600 transition-colors cursor-pointer"
                          >
                            <Sliders className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onSelectItem(item)}
                            title="View Full Item Specs"
                            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                          >
                            <Info className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${item.name} (${item.sku})?`)) {
                                deleteItem(item.id);
                              }
                            }}
                            title="Delete Item"
                            className="p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {t.inventory.noItemsFound}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              {t.inventory.noItemsSub}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedWarehouse('all');
                setSelectedStatus('all');
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              {t.inventory.resetFilters}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
