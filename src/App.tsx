import React, { useState } from 'react';
import { InventoryProvider, useInventory } from './context/InventoryContext';
import { Header } from './components/Header';
import { CoverBanner } from './components/CoverBanner';
import { InventoryList } from './components/InventoryList';
import { WarehouseView } from './components/WarehouseView';
import { SuiteIntegrationHub } from './components/SuiteIntegrationHub';
import { MovementsView } from './components/MovementsView';
import { CloudSyncView } from './components/CloudSyncView';
import { ReadmeView } from './components/ReadmeView';
import { AddItemModal } from './components/AddItemModal';
import { StockTransferModal } from './components/StockTransferModal';
import { StockAdjustModal } from './components/StockAdjustModal';
import { BarcodeModal } from './components/BarcodeModal';
import { ItemDetailDrawer } from './components/ItemDetailDrawer';
import { SponsorModal } from './components/SponsorModal';
import { InventoryItem } from './types';
import { translations } from './i18n/translations';
import { Heart, Boxes } from 'lucide-react';

const AppContent: React.FC = () => {
  const { language, activeTab, openSponsorModal } = useInventory();
  const t = translations[language];

  // Modal states
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [transferItemId, setTransferItemId] = useState<string | undefined>(undefined);
  const [transferFromWhId, setTransferFromWhId] = useState<string | undefined>(undefined);

  const [isAdjustOpen, setIsAdjustOpen] = useState(false);
  const [adjustItemId, setAdjustItemId] = useState<string>('');
  const [adjustWarehouseId, setAdjustWarehouseId] = useState<string>('');

  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [barcodeItem, setBarcodeItem] = useState<InventoryItem | null>(null);

  const handleOpenTransfer = (itemId?: string, defaultWarehouseId?: string) => {
    setTransferItemId(itemId);
    setTransferFromWhId(defaultWarehouseId);
    setIsTransferOpen(true);
  };

  const handleOpenAdjust = (itemId: string, warehouseId: string) => {
    setAdjustItemId(itemId);
    setAdjustWarehouseId(warehouseId);
    setIsAdjustOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Navigation */}
      <Header onOpenAddItem={() => setIsAddItemOpen(true)} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Cover Banner with KPI metrics (rendered across all main views for immediate orientation) */}
        <CoverBanner onOpenTransfer={() => handleOpenTransfer()} />

        {/* View Router */}
        {activeTab === 'inventory' && (
          <InventoryList
            onSelectItem={(item) => setSelectedItem(item)}
            onOpenTransfer={(itemId) => handleOpenTransfer(itemId)}
            onOpenAdjust={(itemId, whId) => handleOpenAdjust(itemId, whId)}
            onOpenBarcode={(item) => setBarcodeItem(item)}
          />
        )}

        {activeTab === 'warehouses' && (
          <WarehouseView onOpenTransfer={handleOpenTransfer} />
        )}

        {activeTab === 'movements' && (
          <MovementsView onOpenRecordMovement={() => handleOpenTransfer()} />
        )}

        {activeTab === 'integrations' && <SuiteIntegrationHub />}

        {activeTab === 'cloud' && <CloudSyncView />}

        {activeTab === 'readme' && <ReadmeView />}
      </main>

      {/* Clean Enterprise Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-500 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Boxes className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              OmniStock Pro
            </span>
            <span aria-hidden="true">·</span>
            <span>Enterprise Multi-Warehouse Inventory System</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={openSponsorModal}
              className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 font-semibold cursor-pointer transition-colors"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Sponsor via PayPal (luciferamorgenster@gmail.com)</span>
            </button>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>4 Languages Active (EN, NL, DE, FR)</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
      />

      <StockTransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        defaultItemId={transferItemId}
        defaultFromWhId={transferFromWhId}
      />

      <StockAdjustModal
        isOpen={isAdjustOpen}
        onClose={() => setIsAdjustOpen(false)}
        itemId={adjustItemId}
        warehouseId={adjustWarehouseId}
      />

      <BarcodeModal
        item={barcodeItem}
        onClose={() => setBarcodeItem(null)}
      />

      <ItemDetailDrawer
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onOpenTransfer={(id) => handleOpenTransfer(id)}
        onOpenAdjust={(id, whId) => handleOpenAdjust(id, whId)}
        onOpenBarcode={(item) => setBarcodeItem(item)}
      />

      <SponsorModal />
    </div>
  );
};

export default function App() {
  return (
    <InventoryProvider>
      <AppContent />
    </InventoryProvider>
  );
}
