import React, { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import {
  X,
  Plus,
  Sparkles,
  Building2,
  Package,
  RefreshCw,
  Barcode as BarcodeIcon,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type SkuPattern = 'CATEGORY-DATE-RANDOM' | 'CATEGORY-YEAR-SEQ' | 'OMNI-CATEGORY-CODE';

export const getCategoryCode = (cat: string): string => {
  switch (cat) {
    case 'Commercial Hardware':
      return 'HDW';
    case 'Industrial Supplies':
      return 'IND';
    case 'Packaging & Fulfillment':
      return 'PKG';
    case 'Warehouse Equipment':
      return 'EQP';
    case 'Raw Materials':
      return 'RAW';
    default: {
      const cleaned = cat.replace(/[^A-Za-z]/g, '').toUpperCase();
      return cleaned.slice(0, 3).padEnd(3, 'X');
    }
  }
};

export const generateStandardSku = (cat: string, pattern: SkuPattern = 'CATEGORY-DATE-RANDOM'): string => {
  const catCode = getCategoryCode(cat);
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randAlpha = '';
  for (let i = 0; i < 4; i++) {
    randAlpha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const randNum = Math.floor(1000 + Math.random() * 9000);

  if (pattern === 'CATEGORY-DATE-RANDOM') {
    return `${catCode}-${yy}${mm}${dd}-${randAlpha}`;
  }
  if (pattern === 'CATEGORY-YEAR-SEQ') {
    return `${catCode}-${now.getFullYear()}-${randNum}`;
  }
  return `OMNI-${catCode}-${randNum}`;
};

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose }) => {
  const { language, warehouses, addItem } = useInventory();
  const t = translations[language];

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Commercial Hardware');
  const [skuPattern, setSkuPattern] = useState<SkuPattern>('CATEGORY-DATE-RANDOM');
  const [autoGenerateOnCategoryChange, setAutoGenerateOnCategoryChange] = useState(true);
  const [sku, setSku] = useState(() => generateStandardSku('Commercial Hardware', 'CATEGORY-DATE-RANDOM'));
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState<'pcs' | 'box' | 'pallet' | 'kg' | 'm'>('pcs');
  const [unitCost, setUnitCost] = useState('120');
  const [unitPrice, setUnitPrice] = useState('195');
  const [reorderThreshold, setReorderThreshold] = useState('15');
  const [supplier, setSupplier] = useState('Apex Supply Chain B.V.');
  const [barcode, setBarcode] = useState(`87193240${Math.floor(10000 + Math.random() * 90000)}`);

  // Initial stock distribution
  const [stockDist, setStockDist] = useState<Record<string, number>>({
    'wh-ams': 10,
    'wh-rtm': 15,
    'wh-utr': 5,
    'wh-ant': 5,
  });

  // Suite linkages
  const [talentPulsePicker, setTalentPulsePicker] = useState('Sophie van Dijk');
  const [kopilotProjectId, setKopilotProjectId] = useState('PRJ-2026-RETAIL-ROLLOUT');
  const [boekhoudGemakAccount, setBoekhoudGemakAccount] = useState('3010 - IT Hardware Assets');
  const [nexusCrmOrderId, setNexusCrmOrderId] = useState(`ORD-NEXUS-${Math.floor(1000 + Math.random() * 9000)}`);

  // Handle regeneration
  const handleRegenerateSku = (newPattern?: SkuPattern, newCat?: string) => {
    const activePat = newPattern || skuPattern;
    const activeCat = newCat || category;
    const generated = generateStandardSku(activeCat, activePat);
    setSku(generated);
    setBarcode(`87193240${Math.floor(10000 + Math.random() * 90000)}`);
  };

  // Re-generate on category change if auto-generate is active
  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    if (autoGenerateOnCategoryChange) {
      handleRegenerateSku(skuPattern, newCat);
    }
  };

  const handlePatternChange = (newPat: SkuPattern) => {
    setSkuPattern(newPat);
    handleRegenerateSku(newPat, category);
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addItem({
      sku: sku.trim().toUpperCase(),
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      unit,
      unitCost: parseFloat(unitCost) || 0,
      unitPrice: parseFloat(unitPrice) || 0,
      reorderThreshold: parseInt(reorderThreshold, 10) || 10,
      supplier: supplier.trim(),
      stock: stockDist,
      tags: [category.split(' ')[0], 'NewStock'],
      barcode,
      linkedSuite: {
        talentPulsePicker,
        kopilotProjectId,
        boekhoudGemakAccount,
        nexusCrmOrderId,
      },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.inventory.addNewItem}
              </h3>
              <p className="text-xs text-slate-500">
                Register new inventory SKU with automated pattern coding and multi-warehouse allocation.
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
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
          {/* Automated SKU Generator Panel */}
          <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="font-bold text-slate-900 dark:text-white">
                  Automated SKU & Inventory Coding
                </span>
              </div>

              {/* Pattern Selector */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-medium">Coding Pattern:</span>
                <select
                  value={skuPattern}
                  onChange={(e) => handlePatternChange(e.target.value as SkuPattern)}
                  className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md border border-indigo-300 dark:border-indigo-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="CATEGORY-DATE-RANDOM">CATEGORY-DATE-RANDOM (e.g. HDW-261110-B84K)</option>
                  <option value="CATEGORY-YEAR-SEQ">CATEGORY-YEAR-SEQ (e.g. HDW-2026-9482)</option>
                  <option value="OMNI-CATEGORY-CODE">OMNI-CATEGORY-CODE (e.g. OMNI-HDW-4820)</option>
                </select>
              </div>
            </div>

            {/* SKU and Barcode generator row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Generated SKU *
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRegenerateSku()}
                    className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Regenerate</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 font-mono font-bold uppercase rounded-lg border border-indigo-300 dark:border-indigo-800 bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Auto-Paired EAN/UPC Barcode
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">GS1 Compatible</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    className="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Format: <strong className="font-mono text-slate-700 dark:text-slate-300">{skuPattern}</strong> (standardized inventory coding)</span>
              </div>

              <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={autoGenerateOnCategoryChange}
                  onChange={(e) => setAutoGenerateOnCategoryChange(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                />
                <span>Auto-update on category change</span>
              </label>
            </div>
          </div>

          {/* Row 1: Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Optical Transceiver 100G QSFP28"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer font-medium"
              >
                <option value="Commercial Hardware">Commercial Hardware (HDW)</option>
                <option value="Industrial Supplies">Industrial Supplies (IND)</option>
                <option value="Packaging & Fulfillment">Packaging & Fulfillment (PKG)</option>
                <option value="Warehouse Equipment">Warehouse Equipment (EQP)</option>
                <option value="Raw Materials">Raw Materials (RAW)</option>
              </select>
            </div>
          </div>

          {/* Row 2: Unit, Description, Supplier */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Unit of Measure
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="pcs">Pieces (pcs)</option>
                <option value="box">Box (box)</option>
                <option value="pallet">Pallet (pallet)</option>
                <option value="kg">Kilogram (kg)</option>
                <option value="m">Meters (m)</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Primary Supplier
              </label>
              <input
                type="text"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Product Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Technical specifications, dimensions, temperature tolerances..."
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Financials & Reorder Threshold */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Unit Cost (€) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={unitCost}
                onChange={(e) => setUnitCost(e.target.value)}
                className="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Selling Price (€) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                className="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Reorder Threshold (Units)
              </label>
              <input
                type="number"
                min="0"
                value={reorderThreshold}
                onChange={(e) => setReorderThreshold(e.target.value)}
                className="w-full px-3 py-2 font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Initial Multi-Warehouse Stock Allocation */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <span>Initial Stock Allocation per Facility</span>
              <span className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400 font-bold">
                Total: {Object.values(stockDist).reduce((a, b) => a + (b || 0), 0)} {unit}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {warehouses.map((wh) => (
                <div key={wh.id} className="space-y-1">
                  <label className="text-[11px] text-slate-500 font-medium">
                    {wh.code} ({wh.name.split(' ')[0]})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stockDist[wh.id] || 0}
                    onChange={(e) =>
                      setStockDist({
                        ...stockDist,
                        [wh.id]: Math.max(0, parseInt(e.target.value, 10) || 0),
                      })
                    }
                    className="w-full px-2.5 py-1.5 font-mono text-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Suite App Connectors Tags */}
          <div className="space-y-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Cross-App Suite Connections
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400">TalentPulse Staff Picker:</span>
                <input
                  type="text"
                  value={talentPulsePicker}
                  onChange={(e) => setTalentPulsePicker(e.target.value)}
                  className="w-full px-2 py-1 mt-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <span className="text-slate-400">Kopilot Project ID:</span>
                <input
                  type="text"
                  value={kopilotProjectId}
                  onChange={(e) => setKopilotProjectId(e.target.value)}
                  className="w-full px-2 py-1 mt-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <span className="text-slate-400">BoekhoudGemak GL Code:</span>
                <input
                  type="text"
                  value={boekhoudGemakAccount}
                  onChange={(e) => setBoekhoudGemakAccount(e.target.value)}
                  className="w-full px-2 py-1 mt-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <span className="text-slate-400">NexusCRM Order ID:</span>
                <input
                  type="text"
                  value={nexusCrmOrderId}
                  onChange={(e) => setNexusCrmOrderId(e.target.value)}
                  className="w-full px-2 py-1 mt-0.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>
            </div>
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
              className="px-4 py-2 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Create Product SKU
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
