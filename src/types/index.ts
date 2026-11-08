export type Language = 'en' | 'nl' | 'de' | 'fr';

export interface Warehouse {
  id: string;
  code: string;
  name: string;
  location: string;
  manager: string;
  capacity: number; // in units
  currentUnits: number;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  description: string;
  unit: 'pcs' | 'box' | 'pallet' | 'kg' | 'm';
  unitCost: number;
  unitPrice: number;
  reorderThreshold: number;
  supplier: string;
  lastUpdated: string;
  stock: Record<string, number>; // warehouseId -> quantity
  tags: string[];
  barcode: string;
  linkedSuite?: {
    talentPulsePicker?: string; // Assigned staff member
    kopilotProjectId?: string; // Project reservation ID
    boekhoudGemakAccount?: string; // General ledger account code
    nexusCrmOrderId?: string; // Customer sales order allocation
  };
}

export type MovementType =
  | 'receive'
  | 'transfer'
  | 'adjust'
  | 'sale'
  | 'project_req'
  | 'return';

export interface StockMovement {
  id: string;
  itemId: string;
  itemName: string;
  sku: string;
  type: MovementType;
  quantity: number;
  fromWarehouseId?: string;
  toWarehouseId?: string;
  timestamp: string;
  operator: string;
  notes: string;
  suiteRef?: string;
}

export type SuiteAppId =
  | 'talentPulse'
  | 'kopilot'
  | 'boekhoudGemak'
  | 'nexusCrm';

export interface SuiteLogEntry {
  id: string;
  timestamp: string;
  event: string;
  status: 'success' | 'warning' | 'info';
  details: string;
}

export interface SuiteAppIntegration {
  id: SuiteAppId;
  name: string;
  tagline: string;
  status: 'connected' | 'syncing' | 'synced' | 'pending';
  lastSynced: string;
  syncInterval: string;
  syncedRecordsCount: number;
  primaryMetric: {
    label: string;
    value: string;
  };
  features: string[];
  logs: SuiteLogEntry[];
}

export interface CloudBackup {
  id: string;
  fileName: string;
  timestamp: string;
  itemCount: number;
  totalValuation: number;
  sizeKb: number;
  location: 'Local Vault' | 'Google Drive';
}
