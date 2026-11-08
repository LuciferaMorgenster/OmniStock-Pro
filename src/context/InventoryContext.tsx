import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  InventoryItem,
  Warehouse,
  StockMovement,
  SuiteAppIntegration,
  SuiteAppId,
  CloudBackup,
} from '../types';
import {
  initialItems,
  initialWarehouses,
  initialMovements,
  initialIntegrations,
  initialBackups,
} from '../data/initialData';
import { updateDocumentSEO } from '../utils/seo';

interface InventoryContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  items: InventoryItem[];
  warehouses: Warehouse[];
  movements: StockMovement[];
  integrations: SuiteAppIntegration[];
  backups: CloudBackup[];
  isSponsorModalOpen: boolean;
  openSponsorModal: () => void;
  closeSponsorModal: () => void;
  // Item actions
  addItem: (item: Omit<InventoryItem, 'id' | 'lastUpdated'>) => void;
  updateItem: (id: string, updates: Partial<InventoryItem>) => void;
  deleteItem: (id: string) => void;
  // Movement actions
  transferStock: (
    itemId: string,
    fromWarehouseId: string,
    toWarehouseId: string,
    quantity: number,
    operator: string,
    notes: string
  ) => boolean;
  adjustStock: (
    itemId: string,
    warehouseId: string,
    newQuantity: number,
    operator: string,
    notes: string
  ) => void;
  receiveStock: (
    itemId: string,
    warehouseId: string,
    quantity: number,
    operator: string,
    notes: string
  ) => void;
  // Suite sync
  triggerSuiteSync: (appId?: SuiteAppId) => Promise<void>;
  isSyncingAny: boolean;
  // Snapshots & backups
  createSnapshot: () => void;
  restoreSnapshot: (data: { items: InventoryItem[]; warehouses?: Warehouse[]; movements?: StockMovement[] }) => void;
  exportDataAsJson: () => void;
  exportDataAsCsv: () => void;
  resetToDefaults: () => void;
  // Aggregated metrics
  totalValuation: number;
  totalUnits: number;
  lowStockItemsCount: number;
}

const InventoryContext = createContext<InventoryContextType | null>(null);

const STORAGE_KEYS = {
  LANG: 'omnistock_lang_v1',
  ITEMS: 'omnistock_items_v1',
  WAREHOUSES: 'omnistock_warehouses_v1',
  MOVEMENTS: 'omnistock_movements_v1',
  INTEGRATIONS: 'omnistock_integrations_v1',
  BACKUPS: 'omnistock_backups_v1',
};

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved as Language) || 'en';
  });

  const [activeTab, setActiveTab] = useState<string>('inventory');
  const [isSponsorModalOpen, setIsSponsorModalOpen] = useState(false);
  const [isSyncingAny, setIsSyncingAny] = useState(false);

  const [items, setItems] = useState<InventoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ITEMS);
      return saved ? JSON.parse(saved) : initialItems;
    } catch {
      return initialItems;
    }
  });

  const [warehouses, setWarehouses] = useState<Warehouse[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WAREHOUSES);
      return saved ? JSON.parse(saved) : initialWarehouses;
    } catch {
      return initialWarehouses;
    }
  });

  const [movements, setMovements] = useState<StockMovement[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MOVEMENTS);
      return saved ? JSON.parse(saved) : initialMovements;
    } catch {
      return initialMovements;
    }
  });

  const [integrations, setIntegrations] = useState<SuiteAppIntegration[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INTEGRATIONS);
      return saved ? JSON.parse(saved) : initialIntegrations;
    } catch {
      return initialIntegrations;
    }
  });

  const [backups, setBackups] = useState<CloudBackup[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BACKUPS);
      return saved ? JSON.parse(saved) : initialBackups;
    } catch {
      return initialBackups;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ITEMS, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WAREHOUSES, JSON.stringify(warehouses));
  }, [warehouses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MOVEMENTS, JSON.stringify(movements));
  }, [movements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INTEGRATIONS, JSON.stringify(integrations));
  }, [integrations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BACKUPS, JSON.stringify(backups));
  }, [backups]);

  // Handle language changes & dynamic SEO
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
    updateDocumentSEO(lang);
  };

  useEffect(() => {
    updateDocumentSEO(language);
  }, []);

  const openSponsorModal = () => setIsSponsorModalOpen(true);
  const closeSponsorModal = () => setIsSponsorModalOpen(false);

  // Aggregated calculations
  const totalValuation = items.reduce((sum, item) => {
    const totalItemQty = Object.values(item.stock).reduce((a, b) => a + (b || 0), 0);
    return sum + totalItemQty * item.unitCost;
  }, 0);

  const totalUnits = items.reduce((sum, item) => {
    return sum + Object.values(item.stock).reduce((a, b) => a + (b || 0), 0);
  }, 0);

  const lowStockItemsCount = items.filter((item) => {
    const totalItemQty = Object.values(item.stock).reduce((a, b) => a + (b || 0), 0);
    return totalItemQty <= item.reorderThreshold;
  }).length;

  // Add Item
  const addItem = (itemData: Omit<InventoryItem, 'id' | 'lastUpdated'>) => {
    const newItem: InventoryItem = {
      ...itemData,
      id: `item-${Date.now().toString(36)}`,
      lastUpdated: new Date().toISOString(),
    };
    setItems((prev) => [newItem, ...prev]);

    // Record initial receipt movement if initial stock exists
    const totalInit = Object.values(newItem.stock).reduce((a, b) => a + (b || 0), 0);
    if (totalInit > 0) {
      const movement: StockMovement = {
        id: `mov-${Date.now().toString(36)}`,
        itemId: newItem.id,
        itemName: newItem.name,
        sku: newItem.sku,
        type: 'receive',
        quantity: totalInit,
        timestamp: new Date().toISOString(),
        operator: 'Inventory Administrator',
        notes: `Initial stock registration for SKU ${newItem.sku}`,
      };
      setMovements((prev) => [movement, ...prev]);
    }
  };

  // Update Item
  const updateItem = (id: string, updates: Partial<InventoryItem>) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updates, lastUpdated: new Date().toISOString() } : item
      )
    );
  };

  // Delete Item
  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Transfer stock
  const transferStock = (
    itemId: string,
    fromWarehouseId: string,
    toWarehouseId: string,
    quantity: number,
    operator: string,
    notes: string
  ): boolean => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return false;
    const currentFrom = item.stock[fromWarehouseId] || 0;
    if (currentFrom < quantity) return false;

    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== itemId) return i;
        const newStock = { ...i.stock };
        newStock[fromWarehouseId] = (newStock[fromWarehouseId] || 0) - quantity;
        newStock[toWarehouseId] = (newStock[toWarehouseId] || 0) + quantity;
        return {
          ...i,
          stock: newStock,
          lastUpdated: new Date().toISOString(),
        };
      })
    );

    const movement: StockMovement = {
      id: `mov-${Date.now().toString(36)}`,
      itemId: item.id,
      itemName: item.name,
      sku: item.sku,
      type: 'transfer',
      quantity,
      fromWarehouseId,
      toWarehouseId,
      timestamp: new Date().toISOString(),
      operator: operator || 'Authorized Warehouse Operator',
      notes: notes || `Transferred from ${fromWarehouseId} to ${toWarehouseId}`,
    };
    setMovements((prev) => [movement, ...prev]);
    return true;
  };

  // Adjust stock
  const adjustStock = (
    itemId: string,
    warehouseId: string,
    newQuantity: number,
    operator: string,
    notes: string
  ) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;
    const prevQty = item.stock[warehouseId] || 0;
    const delta = newQuantity - prevQty;

    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== itemId) return i;
        const newStock = { ...i.stock, [warehouseId]: Math.max(0, newQuantity) };
        return { ...i, stock: newStock, lastUpdated: new Date().toISOString() };
      })
    );

    const movement: StockMovement = {
      id: `mov-${Date.now().toString(36)}`,
      itemId: item.id,
      itemName: item.name,
      sku: item.sku,
      type: 'adjust',
      quantity: Math.abs(delta),
      fromWarehouseId: delta < 0 ? warehouseId : undefined,
      toWarehouseId: delta > 0 ? warehouseId : undefined,
      timestamp: new Date().toISOString(),
      operator: operator || 'Cycle Count Auditor',
      notes: notes || `Audit recount adjusted stock from ${prevQty} to ${newQuantity} units.`,
    };
    setMovements((prev) => [movement, ...prev]);
  };

  // Receive stock
  const receiveStock = (
    itemId: string,
    warehouseId: string,
    quantity: number,
    operator: string,
    notes: string
  ) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== itemId) return i;
        const newStock = { ...i.stock };
        newStock[warehouseId] = (newStock[warehouseId] || 0) + quantity;
        return { ...i, stock: newStock, lastUpdated: new Date().toISOString() };
      })
    );

    const movement: StockMovement = {
      id: `mov-${Date.now().toString(36)}`,
      itemId: item.id,
      itemName: item.name,
      sku: item.sku,
      type: 'receive',
      quantity,
      toWarehouseId: warehouseId,
      timestamp: new Date().toISOString(),
      operator: operator || 'Receiving Dock Lead',
      notes: notes || `Inbound shipment received at facility ${warehouseId}.`,
    };
    setMovements((prev) => [movement, ...prev]);
  };

  // Trigger suite sync
  const triggerSuiteSync = async (appId?: SuiteAppId) => {
    setIsSyncingAny(true);
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

    setIntegrations((prev) =>
      prev.map((app) =>
        !appId || app.id === appId ? { ...app, status: 'syncing' } : app
      )
    );

    // Simulate realistic asynchronous network handshake
    await new Promise((resolve) => setTimeout(resolve, 900));

    setIntegrations((prev) =>
      prev.map((app) => {
        if (appId && app.id !== appId) return app;
        const newRecordCount = app.syncedRecordsCount + Math.floor(Math.random() * 3) + 1;
        const newLogEntry = {
          id: `log-${Date.now().toString(36)}`,
          timestamp: nowStr,
          event: `2-Way Synchronization Completed`,
          status: 'success' as const,
          details: `Reconciled ${items.length} inventory SKUs across ${warehouses.length} facilities with ${app.name}.`,
        };
        return {
          ...app,
          status: 'synced',
          lastSynced: nowStr,
          syncedRecordsCount: newRecordCount,
          logs: [newLogEntry, ...app.logs.slice(0, 7)],
        };
      })
    );

    setIsSyncingAny(false);
  };

  // Create Snapshot
  const createSnapshot = () => {
    const now = new Date();
    const dateFormatted = now.toISOString().split('T')[0];
    const timeFormatted = now.toTimeString().split(' ')[0];
    const fileName = `omnistock-backup-${dateFormatted}-${now.getTime().toString(36)}.json`;

    const snapshotPayload = {
      appName: 'OmniStock Pro',
      version: '2.4.0',
      createdAt: now.toISOString(),
      valuation: totalValuation,
      itemCount: items.length,
      items,
      warehouses,
      movements,
      integrations,
    };

    const jsonString = JSON.stringify(snapshotPayload, null, 2);
    const sizeKb = Number((new Blob([jsonString]).size / 1024).toFixed(1));

    const newBackup: CloudBackup = {
      id: `bak-${now.getTime()}`,
      fileName,
      timestamp: `${dateFormatted} ${timeFormatted}`,
      itemCount: items.length,
      totalValuation,
      sizeKb,
      location: 'Local Vault',
    };

    setBackups((prev) => [newBackup, ...prev]);

    // Trigger download
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Restore snapshot
  const restoreSnapshot = (data: { items: InventoryItem[]; warehouses?: Warehouse[]; movements?: StockMovement[] }) => {
    if (data.items && Array.isArray(data.items)) {
      setItems(data.items);
    }
    if (data.warehouses && Array.isArray(data.warehouses)) {
      setWarehouses(data.warehouses);
    }
    if (data.movements && Array.isArray(data.movements)) {
      setMovements(data.movements);
    }
  };

  // Export as JSON
  const exportDataAsJson = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      items,
      warehouses,
      movements,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `omnistock-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Export as CSV
  const exportDataAsCsv = () => {
    const headers = [
      'SKU',
      'Name',
      'Category',
      'Barcode',
      'UnitCost',
      'UnitPrice',
      'TotalUnits',
      'Valuation',
      'ReorderThreshold',
      'Supplier',
    ];
    const rows = items.map((i) => {
      const units = Object.values(i.stock).reduce((a, b) => a + (b || 0), 0);
      return [
        `"${i.sku}"`,
        `"${i.name.replace(/"/g, '""')}"`,
        `"${i.category}"`,
        `"${i.barcode}"`,
        i.unitCost.toFixed(2),
        i.unitPrice.toFixed(2),
        units,
        (units * i.unitCost).toFixed(2),
        i.reorderThreshold,
        `"${i.supplier.replace(/"/g, '""')}"`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `omnistock-catalog-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Reset defaults
  const resetToDefaults = () => {
    setItems(initialItems);
    setWarehouses(initialWarehouses);
    setMovements(initialMovements);
    setIntegrations(initialIntegrations);
    setBackups(initialBackups);
  };

  return (
    <InventoryContext.Provider
      value={{
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        items,
        warehouses,
        movements,
        integrations,
        backups,
        isSponsorModalOpen,
        openSponsorModal,
        closeSponsorModal,
        addItem,
        updateItem,
        deleteItem,
        transferStock,
        adjustStock,
        receiveStock,
        triggerSuiteSync,
        isSyncingAny,
        createSnapshot,
        restoreSnapshot,
        exportDataAsJson,
        exportDataAsCsv,
        resetToDefaults,
        totalValuation,
        totalUnits,
        lowStockItemsCount,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
