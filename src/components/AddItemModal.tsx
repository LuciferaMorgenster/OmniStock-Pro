import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import { X, Plus, Sparkles, Building2, Package } from 'lucide-react';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose }) => {
  const { language, warehouses, addItem } = useInventory();
  const t = translations[language];

  const [name, setName] = useState('');
  const [sku, setSku] = useState(`OMNI-${Math.floor(1000 + Math.random() * 9000)}`);
  const [category, setCategory] = useState('Commercial Hardware');
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
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
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
                Register new inventory SKU with multi-warehouse allocation and suite tags.
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
          {/* Row 1: Name & SKU */}
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
                SKU Identifier *
              </label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full px-3 py-2 font-mono uppercase rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Row 2: Category, Unit, Supplier */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="Commercial Hardware">Commercial Hardware</option>
                <option value="Industrial Supplies">Industrial Supplies</option>
                <option value="Packaging & Fulfillment">Packaging & Fulfillment</option>
                <option value="Warehouse Equipment">Warehouse Equipment</option>
                <option value="Raw Materials">Raw Materials</option>
              </select>
            </div>

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

            <div className="space-y-1">
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

          {/* Row 3: Financials & Reorder Threshold */}
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
              <span className="font-mono text-[11px] text-indigo-600 dark:text-indigo-400">
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
