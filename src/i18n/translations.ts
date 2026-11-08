import { Language } from '../types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  nav: {
    inventory: string;
    warehouses: string;
    movements: string;
    integrations: string;
    cloudSync: string;
    readme: string;
    sponsor: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  stats: {
    totalItems: string;
    totalValuation: string;
    activeWarehouses: string;
    lowStockAlerts: string;
    suiteSyncHealth: string;
    allSystemsNormal: string;
  };
  inventory: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategories: string;
    allWarehouses: string;
    allStatuses: string;
    statusInStock: string;
    statusLowStock: string;
    statusCritical: string;
    statusOutOfStock: string;
    addNewItem: string;
    exportCsv: string;
    exportJson: string;
    table: {
      sku: string;
      product: string;
      category: string;
      stockStatus: string;
      totalUnits: string;
      distribution: string;
      cost: string;
      price: string;
      totalValue: string;
      suiteLinks: string;
      actions: string;
    };
    noItemsFound: string;
    noItemsSub: string;
    resetFilters: string;
  };
  itemDetail: {
    title: string;
    editProduct: string;
    generalInfo: string;
    stockBreakdown: string;
    adjustStock: string;
    quickTransfer: string;
    suiteConnections: string;
    reorderLevel: string;
    barcode: string;
    supplier: string;
  };
  warehouses: {
    title: string;
    subtitle: string;
    code: string;
    location: string;
    manager: string;
    capacity: string;
    utilization: string;
    stockLevels: string;
    transferBetween: string;
  };
  movements: {
    title: string;
    subtitle: string;
    recordNew: string;
    type: string;
    item: string;
    from: string;
    to: string;
    qty: string;
    operator: string;
    date: string;
    notes: string;
    types: {
      receive: string;
      transfer: string;
      adjust: string;
      sale: string;
      project_req: string;
      return: string;
    };
  };
  integrations: {
    title: string;
    subtitle: string;
    badge: string;
    statusConnected: string;
    statusSyncing: string;
    statusPending: string;
    syncAllNow: string;
    syncing: string;
    lastSynced: string;
    syncInterval: string;
    recordsLinked: string;
    viewAuditLog: string;
    triggerManualSync: string;
    apps: {
      talentPulse: {
        name: string;
        desc: string;
        metricLabel: string;
        features: string[];
      };
      kopilot: {
        name: string;
        desc: string;
        metricLabel: string;
        features: string[];
      };
      boekhoudGemak: {
        name: string;
        desc: string;
        metricLabel: string;
        features: string[];
      };
      nexusCrm: {
        name: string;
        desc: string;
        metricLabel: string;
        features: string[];
      };
    };
  };
  cloud: {
    title: string;
    subtitle: string;
    googleDriveTitle: string;
    googleDriveDesc: string;
    connected: string;
    disconnected: string;
    createSnapshot: string;
    restoreSnapshot: string;
    restoreConfirm: string;
    exportLocal: string;
    importLocal: string;
    backupsList: string;
    fileName: string;
    items: string;
    valuation: string;
    date: string;
    actions: string;
    download: string;
  };
  sponsor: {
    title: string;
    subtitle: string;
    creatorMessage: string;
    paypalAccount: string;
    tier5Title: string;
    tier5Desc: string;
    tier15Title: string;
    tier15Desc: string;
    tier50Title: string;
    tier50Desc: string;
    customAmount: string;
    donateViaPaypal: string;
    copied: string;
    copyEmail: string;
    heartNote: string;
  };
  common: {
    cancel: string;
    save: string;
    delete: string;
    close: string;
    confirm: string;
    filter: string;
    clear: string;
    success: string;
    warning: string;
    currency: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'OmniStock Pro',
    tagline: 'Enterprise Multilingual Multi-Warehouse Inventory System',
    nav: {
      inventory: 'Inventory',
      warehouses: 'Warehouses',
      movements: 'Movements & Audit',
      integrations: 'Suite Integrations',
      cloudSync: 'Cloud & Sync',
      readme: 'Documentation',
      sponsor: 'Support / Sponsor',
    },
    seo: {
      title: 'OmniStock Pro – Multilingual Enterprise Inventory Management',
      description: 'Streamline multi-warehouse stock, reorders, and 2-way cross-app sync with TalentPulse-HRIS, Kopilot Projects, BoekhoudGemak, and NexusCRM Suite.',
      keywords: 'inventory management, multi-warehouse, TalentPulse, Kopilot, BoekhoudGemak, NexusCRM, stock control, logistics',
    },
    stats: {
      totalItems: 'Total Catalog SKUs',
      totalValuation: 'Total Stock Valuation',
      activeWarehouses: 'Active Logistics Facilities',
      lowStockAlerts: 'Low Stock Reorder Alerts',
      suiteSyncHealth: 'Suite Sync Ecosystem',
      allSystemsNormal: 'All 4 Connectors Synced',
    },
    inventory: {
      title: 'Inventory & Stock Catalog',
      subtitle: 'Real-time multi-warehouse inventory levels, valuations, and linked enterprise records.',
      searchPlaceholder: 'Search by SKU, product name, or tag...',
      allCategories: 'All Categories',
      allWarehouses: 'All Warehouses',
      allStatuses: 'All Health Statuses',
      statusInStock: 'In Stock',
      statusLowStock: 'Low Stock',
      statusCritical: 'Critical Deficit',
      statusOutOfStock: 'Out of Stock',
      addNewItem: '+ Add New Item',
      exportCsv: 'Export CSV',
      exportJson: 'Export JSON',
      table: {
        sku: 'SKU / Barcode',
        product: 'Product & Category',
        category: 'Category',
        stockStatus: 'Stock Status',
        totalUnits: 'Total Units',
        distribution: 'Warehouse Distribution',
        cost: 'Unit Cost',
        price: 'Unit Price',
        totalValue: 'Total Valuation',
        suiteLinks: 'Suite Integrations',
        actions: 'Actions',
      },
      noItemsFound: 'No inventory items match your criteria.',
      noItemsSub: 'Try adjusting your search terms or filters to find what you are looking for.',
      resetFilters: 'Reset Filters',
    },
    itemDetail: {
      title: 'Stock Item Details',
      editProduct: 'Edit Product Details',
      generalInfo: 'General Information',
      stockBreakdown: 'Warehouse Stock Breakdown',
      adjustStock: 'Adjust Count',
      quickTransfer: 'Transfer Stock',
      suiteConnections: 'Connected Suite Entities',
      reorderLevel: 'Reorder Threshold',
      barcode: 'Barcode & SKU',
      supplier: 'Primary Supplier',
    },
    warehouses: {
      title: 'Logistics Facilities & Warehouses',
      subtitle: 'Manage multi-location capacity, storage utilization, and stock redistribution.',
      code: 'Facility Code',
      location: 'Location',
      manager: 'Facility Lead',
      capacity: 'Total Capacity',
      utilization: 'Storage Utilization',
      stockLevels: 'Stock Units Stored',
      transferBetween: 'Inter-Warehouse Transfer',
    },
    movements: {
      title: 'Stock Movements & Transaction Audit',
      subtitle: 'Immutable chronological ledger of all stock receipts, warehouse transfers, sales allocations, and adjustments.',
      recordNew: '+ Record Stock Movement',
      type: 'Movement Type',
      item: 'Item / SKU',
      from: 'Origin Facility',
      to: 'Destination Facility',
      qty: 'Quantity',
      operator: 'Authorized Operator',
      date: 'Timestamp',
      notes: 'Audit Notes & Reference',
      types: {
        receive: 'Stock Receipt (Supplier)',
        transfer: 'Inter-Warehouse Transfer',
        adjust: 'Physical Audit Adjustment',
        sale: 'Customer Sales Fulfillment',
        project_req: 'Kopilot Project Requisition',
        return: 'Customer Return (RMA)',
      },
    },
    integrations: {
      title: 'Unified Suite Integration Hub',
      subtitle: 'Bidirectional synchronization matrix connecting your HR, project management, accounting, and CRM workflows.',
      badge: '4 Enterprise Connectors Active',
      statusConnected: 'Connected & Live',
      statusSyncing: 'Synchronizing...',
      statusPending: 'Awaiting Next Poll',
      syncAllNow: 'Sync All 4 Apps Now',
      syncing: 'Syncing Data...',
      lastSynced: 'Last Synchronized',
      syncInterval: 'Sync Cadence',
      recordsLinked: 'Linked Records',
      viewAuditLog: 'View Audit Log',
      triggerManualSync: 'Run 2-Way Sync',
      apps: {
        talentPulse: {
          name: 'TalentPulse-HRIS',
          desc: 'Synchronizes warehouse staff shifts, picker-packer roles, and physical audit authorizations directly from HR records.',
          metricLabel: 'Warehouse Workers Assigned',
          features: [
            'Staff picker shift synchronization',
            'Authorized auditor permission mapping',
            'Operator activity attribution log',
          ],
        },
        kopilot: {
          name: 'Kopilot Projects',
          desc: 'Allocates project materials, reserves bill-of-materials (BOM) stock, and links consumption directly to client deliverables.',
          metricLabel: 'Active Project BOM Allocations',
          features: [
            'Automatic stock reservation on task start',
            'Milestone material requisition triggers',
            'Project material cost calculation',
          ],
        },
        boekhoudGemak: {
          name: 'BoekhoudGemak',
          desc: 'Maintains real-time general ledger synchrony for inventory asset valuation, Cost of Goods Sold (COGS), and purchase invoices.',
          metricLabel: 'Synchronized Ledger Accounts',
          features: [
            'Real-time FIFO & Average valuation sync',
            'Automated COGS journal entry creation',
            'Supplier purchase order VAT/BTW ledger',
          ],
        },
        nexusCrm: {
          name: 'NexusCRM Suite',
          desc: 'Connects sales pipeline deals, customer order reservations, and Return Merchandise Authorizations (RMA) with warehouse stock.',
          metricLabel: 'CRM Customer Orders Linked',
          features: [
            'Real-time deal stock availability check',
            'Order reservation on deal won status',
            'Customer RMA return inventory intake',
          ],
        },
      },
    },
    cloud: {
      title: 'Cloud Synchronization & Backup Vault',
      subtitle: 'Comprehensive snapshot management with local point-in-time recovery and cloud export.',
      googleDriveTitle: 'Google Workspace & Drive Cloud Sync',
      googleDriveDesc: 'Save inventory snapshots directly to your Google Drive for disaster recovery and team collaboration.',
      connected: 'Cloud Vault Ready',
      disconnected: 'Local Vault Active',
      createSnapshot: 'Generate Full Snapshot',
      restoreSnapshot: 'Restore from Snapshot',
      restoreConfirm: 'Restoring a snapshot will update your current inventory records. Do you wish to continue?',
      exportLocal: 'Export to JSON File',
      importLocal: 'Import JSON Backup',
      backupsList: 'Snapshot History & Recovery Vault',
      fileName: 'Backup File',
      items: 'SKU Count',
      valuation: 'Valuation',
      date: 'Created At',
      actions: 'Actions',
      download: 'Download File',
    },
    sponsor: {
      title: 'Support & Sponsor OmniStock Pro',
      subtitle: 'Empower ongoing engineering, new suite integrations, and open-source supply chain tooling.',
      creatorMessage: 'Thank you for utilizing OmniStock Pro! Your support ensures continuous maintenance, enterprise performance enhancements, and new app integrations.',
      paypalAccount: 'luciferamorgenster@gmail.com',
      tier5Title: 'Supporter Tier · €5',
      tier5Desc: 'Buy the developer a specialty coffee and fuel the next bugfix release.',
      tier15Title: 'Professional Backer · €15',
      tier15Desc: 'Sponsors continuous development, unit test suites, and documentation updates.',
      tier50Title: 'Enterprise Patron · €50',
      tier50Desc: 'Sponsors full ecosystem connectors and advanced multi-warehouse algorithms.',
      customAmount: 'Custom Donation Amount',
      donateViaPaypal: 'Donate via PayPal',
      copied: 'PayPal email copied to clipboard!',
      copyEmail: 'Copy PayPal Email',
      heartNote: 'All donations directly support developer maintenance and infrastructure.',
    },
    common: {
      cancel: 'Cancel',
      save: 'Save Changes',
      delete: 'Delete',
      close: 'Close',
      confirm: 'Confirm Action',
      filter: 'Filter',
      clear: 'Clear',
      success: 'Operation completed successfully.',
      warning: 'Attention required',
      currency: '€',
    },
  },

  nl: {
    appName: 'OmniStock Pro',
    tagline: 'Meertalig Bedrijfsmatig Voorraadbeheersysteem voor Meerdere Magazijnen',
    nav: {
      inventory: 'Voorraadbeheer',
      warehouses: 'Magazijnen',
      movements: 'Mutaties & Audit',
      integrations: 'App Koppelingen',
      cloudSync: 'Cloud & Synchronisatie',
      readme: 'Documentatie',
      sponsor: 'Ondersteun / Sponsor',
    },
    seo: {
      title: 'OmniStock Pro – Meertalig Voorraadbeheer & Magazijn Systeem',
      description: 'Stroomlijn voorraadbeheer, inkooporders en 2-weg koppelingen met TalentPulse-HRIS, Kopilot Projects, BoekhoudGemak en NexusCRM Suite.',
      keywords: 'voorraadbeheer, meertalig, multi-warehouse, TalentPulse, Kopilot, BoekhoudGemak, NexusCRM, voorraad controle, logistiek',
    },
    stats: {
      totalItems: 'Totaal Aantal Artikelen (SKU)',
      totalValuation: 'Totale Voorraadwaarde',
      activeWarehouses: 'Actieve Magazijnlocaties',
      lowStockAlerts: 'Meldingen Lage Voorraad',
      suiteSyncHealth: 'Ecosysteem Synchronisatie',
      allSystemsNormal: 'Alle 4 Apps Gesynchroniseerd',
    },
    inventory: {
      title: 'Voorraad & Artikelcatalogus',
      subtitle: 'Realtime voorraadniveaus per magazijn, waarderingen en gekoppelde bedrijfsdossiers.',
      searchPlaceholder: 'Zoek op SKU, artikelnaam of categorie...',
      allCategories: 'Alle Categorieën',
      allWarehouses: 'Alle Magazijnen',
      allStatuses: 'Alle Voorraadstatussen',
      statusInStock: 'Op Voorraad',
      statusLowStock: 'Lage Voorraad',
      statusCritical: 'Kritiek Tekort',
      statusOutOfStock: 'Niet op Voorraad',
      addNewItem: '+ Nieuw Artikel Toevoegen',
      exportCsv: 'Exporteer CSV',
      exportJson: 'Exporteer JSON',
      table: {
        sku: 'SKU / Barcode',
        product: 'Artikel & Categorie',
        category: 'Categorie',
        stockStatus: 'Voorraadstatus',
        totalUnits: 'Totaal Stuks',
        distribution: 'Magazijn Verdeling',
        cost: 'Inkoopprijs',
        price: 'Verkoopprijs',
        totalValue: 'Totale Waarde',
        suiteLinks: 'App Koppelingen',
        actions: 'Acties',
      },
      noItemsFound: 'Geen voorraadartikelen gevonden.',
      noItemsSub: 'Pas uw zoekterm of filters aan om artikelen te vinden.',
      resetFilters: 'Filters Herstellen',
    },
    itemDetail: {
      title: 'Artikeldetails',
      editProduct: 'Artikel Bewerken',
      generalInfo: 'Algemene Informatie',
      stockBreakdown: 'Voorraad per Magazijn',
      adjustStock: 'Aantal Corrigeren',
      quickTransfer: 'Voorraad Verplaatsen',
      suiteConnections: 'Gekoppelde App Gegevens',
      reorderLevel: 'Besteldrempel',
      barcode: 'Barcode & SKU',
      supplier: 'Hoofdleverancier',
    },
    warehouses: {
      title: 'Logistieke Faciliteiten & Magazijnen',
      subtitle: 'Beheer capaciteit, bezettingsgraad en verplaatsingen tussen verschillende vestigingen.',
      code: 'Locatiecode',
      location: 'Locatie',
      manager: 'Locatieleider',
      capacity: 'Totale Capaciteit',
      utilization: 'Bezetting',
      stockLevels: 'Opgeslagen Eenheden',
      transferBetween: 'Overboeking Tussen Magazijnen',
    },
    movements: {
      title: 'Voorraadmutaties & Audittrail',
      subtitle: 'Chronologisch en onveranderlijk register van goederenontvangsten, interne verplaatsingen en verkopen.',
      recordNew: '+ Mutatie Vastleggen',
      type: 'Soort Mutatie',
      item: 'Artikel / SKU',
      from: 'Herkomst Magazijn',
      to: 'Bestemming Magazijn',
      qty: 'Aantal',
      operator: 'Geautoriseerde Medewerker',
      date: 'Tijdstip',
      notes: 'Opmerkingen & Kenmerk',
      types: {
        receive: 'Goederenontvangst (Leverancier)',
        transfer: 'Interne Verplaatsing',
        adjust: 'Voorraadtelling Correctie',
        sale: 'Verkoop Levering',
        project_req: 'Kopilot Projectreservering',
        return: 'Klantretour (RMA)',
      },
    },
    integrations: {
      title: 'Gecoördineerde Suite App Koppelingen',
      subtitle: 'Tweerichtings synchronisatie met HR, projectbeheer, boekhouding en verkoopkanalen.',
      badge: '4 Bedrijfskoppelingen Actief',
      statusConnected: 'Verbonden & Actief',
      statusSyncing: 'Synchroniseren...',
      statusPending: 'Wacht op Volgende Peiling',
      syncAllNow: 'Synchroniseer Alle 4 Apps',
      syncing: 'Gegevens Uitwisselen...',
      lastSynced: 'Laatst Gesynchroniseerd',
      syncInterval: 'Synchronisatie Interval',
      recordsLinked: 'Gekoppelde Records',
      viewAuditLog: 'Bekijk Auditlogboek',
      triggerManualSync: 'Start 2-Weg Sync',
      apps: {
        talentPulse: {
          name: 'TalentPulse-HRIS',
          desc: 'Synchroniseert magazijndiensten, orderpicker-rollen en geautoriseerde voorraadauditors rechtstreeks met personeelsdossiers.',
          metricLabel: 'Toegewezen Magazijnmedewerkers',
          features: [
            'Synchronisatie van picker- en inpakkerdiensten',
            'Autorisaties voor voorraadaudits koppelen',
            'Audittrail met medewerkerstoewijzing',
          ],
        },
        kopilot: {
          name: 'Kopilot Projects',
          desc: 'Reserveert projectmaterialen en stuklijsten (BOM) en koppelt materiaalverbruik direct aan actieve klantprojecten.',
          metricLabel: 'Actieve Project Materiaalreserveringen',
          features: [
            'Automatische materiaalreservering bij projectstart',
            'Materiaalopvraag triggers bij projectmijlpalen',
            'Directe kostprijsberekening op projectniveau',
          ],
        },
        boekhoudGemak: {
          name: 'BoekhoudGemak',
          desc: 'Houdt het grootboek synchroon voor realtime voorraadwaardering, kostprijs omzet (COGS) en inkoopfacturen met BTW.',
          metricLabel: 'Gesynchroniseerde Grootboekrekeningen',
          features: [
            'Realtime FIFO & Gewogen Gemiddelde waardering',
            'Automatische journaalposten voor kostprijs omzet',
            'Inkoopfacturen en BTW-berekening in het grootboek',
          ],
        },
        nexusCrm: {
          name: 'NexusCRM Suite',
          desc: 'Koppelt verkoopkansen, klantorders en RMA-retouren rechtstreeks aan actuele fysieke voorraadposities.',
          metricLabel: 'Gekoppelde CRM Klantorders',
          features: [
            'Realtime voorraadcheck bij offertes en deals',
            'Voorraadreservering bij gewonnen verkoopkansen',
            'Automatische voorraadopname bij RMA retouren',
          ],
        },
      },
    },
    cloud: {
      title: 'Cloud Synchronisatie & Reservekopieën',
      subtitle: 'Volledig beheer van voorraadsnapshots met lokaal herstel en exportmogelijkheden.',
      googleDriveTitle: 'Google Workspace & Google Drive Synchronisatie',
      googleDriveDesc: 'Sla voorraadsnapshots veilig op in uw Google Drive voor noodherstel en samenwerking.',
      connected: 'Cloud Vault Gereed',
      disconnected: 'Lokale Kluis Actief',
      createSnapshot: 'Genereer Volledige Snapshot',
      restoreSnapshot: 'Herstel uit Snapshot',
      restoreConfirm: 'Het herstellen van een snapshot overschrijft huidige voorraadrecords. Wilt u doorgaan?',
      exportLocal: 'Exporteer JSON Bestand',
      importLocal: 'Importeer JSON Reservekopie',
      backupsList: 'Geschiedenis van Reservekopieën',
      fileName: 'Bestandsnaam',
      items: 'Aantal SKU',
      valuation: 'Voorraadwaarde',
      date: 'Aanmaakdatum',
      actions: 'Acties',
      download: 'Bestand Downloaden',
    },
    sponsor: {
      title: 'Ondersteun & Sponsor OmniStock Pro',
      subtitle: 'Draag bij aan voortdurende ontwikkeling, nieuwe integraties en betrouwbare software.',
      creatorMessage: 'Bedankt voor het gebruiken van OmniStock Pro! Jouw steun zorgt voor voortdurende updates, betere prestaties en continue uitbreidingen.',
      paypalAccount: 'luciferamorgenster@gmail.com',
      tier5Title: 'Koffie Donatie · €5',
      tier5Desc: 'Trakteer de ontwikkelaar op een kop koffie voor de volgende softwareverbetering.',
      tier15Title: 'Professionele Sponsor · €15',
      tier15Desc: 'Ondersteun continue doorontwikkeling, geautomatiseerde tests en documentatie.',
      tier50Title: 'Bedrijfs Sponsor · €50',
      tier50Desc: 'Sponsor geavanceerde magazijnfuncties en diepe app-integraties.',
      customAmount: 'Zelf Bedrag Kiezen',
      donateViaPaypal: 'Doneren via PayPal',
      copied: 'PayPal e-mailadres gekopieerd naar klembord!',
      copyEmail: 'Kopieer PayPal E-mail',
      heartNote: 'Elke donatie gaat rechtstreeks naar onderhoud en ontwikkeling.',
    },
    common: {
      cancel: 'Annuleren',
      save: 'Wijzigingen Opslaan',
      delete: 'Verwijderen',
      close: 'Sluiten',
      confirm: 'Bevestigen',
      filter: 'Filteren',
      clear: 'Wissen',
      success: 'Handeling succesvol uitgevoerd.',
      warning: 'Aandacht vereist',
      currency: '€',
    },
  },

  de: {
    appName: 'OmniStock Pro',
    tagline: 'Mehrsprachiges Multi-Lager Bestandsmanagementsystem',
    nav: {
      inventory: 'Warenbestand',
      warehouses: 'Lagerhäuser',
      movements: 'Buchungen & Audit',
      integrations: 'App-Schnittstellen',
      cloudSync: 'Cloud & Sicherung',
      readme: 'Dokumentation',
      sponsor: 'Unterstützen / Spenden',
    },
    seo: {
      title: 'OmniStock Pro – Mehrsprachiges Lager- und Bestandsmanagement',
      description: 'Optimieren Sie Lagerbestände, Nachbestellungen und die 2-Wege-Synchronisation mit TalentPulse-HRIS, Kopilot Projects, BoekhoudGemak und NexusCRM Suite.',
      keywords: 'Warenwirtschaft, Lagerverwaltung, TalentPulse, Kopilot, BoekhoudGemak, NexusCRM, Bestandskontrolle, Logistik',
    },
    stats: {
      totalItems: 'Katalogartikel (SKU)',
      totalValuation: 'Gesamtlagerwert',
      activeWarehouses: 'Aktive Lagerstandorte',
      lowStockAlerts: 'Warnungen bei Niedrigbestand',
      suiteSyncHealth: 'Ökosystem-Status',
      allSystemsNormal: 'Alle 4 Schnittstellen Synchron',
    },
    inventory: {
      title: 'Bestandskatalog & Warenwirtschaft',
      subtitle: 'Echtzeit-Lagerbestände über alle Niederlassungen, Bewertungen und verknüpfte Systeme.',
      searchPlaceholder: 'Nach SKU, Artikelname oder Tag suchen...',
      allCategories: 'Alle Kategorien',
      allWarehouses: 'Alle Lagerorte',
      allStatuses: 'Alle Bestandsstati',
      statusInStock: 'Auf Lager',
      statusLowStock: 'Geringer Bestand',
      statusCritical: 'Kritischer Engpass',
      statusOutOfStock: 'Nicht Vorrätig',
      addNewItem: '+ Neuen Artikel Anlegen',
      exportCsv: 'CSV Exportieren',
      exportJson: 'JSON Exportieren',
      table: {
        sku: 'SKU / Barcode',
        product: 'Artikel & Kategorie',
        category: 'Kategorie',
        stockStatus: 'Status',
        totalUnits: 'Gesamtmenge',
        distribution: 'Lagerverteilung',
        cost: 'Einkaufspreis',
        price: 'Verkaufspreis',
        totalValue: 'Gesamtwert',
        suiteLinks: 'Schnittstellen',
        actions: 'Aktionen',
      },
      noItemsFound: 'Keine Bestandsartikel gefunden.',
      noItemsSub: 'Passen Sie Ihre Filterkriterien an, um Artikel zu finden.',
      resetFilters: 'Filter Zurücksetzen',
    },
    itemDetail: {
      title: 'Artikeldetails',
      editProduct: 'Artikel Bearbeiten',
      generalInfo: 'Allgemeine Daten',
      stockBreakdown: 'Bestand nach Lagerort',
      adjustStock: 'Bestand Anpassen',
      quickTransfer: 'Umlagerung Durchführen',
      suiteConnections: 'Verknüpfte App-Daten',
      reorderLevel: 'Meldebestand',
      barcode: 'Barcode & SKU',
      supplier: 'Hauptlieferant',
    },
    warehouses: {
      title: 'Logistikzentren & Lagerstandorte',
      subtitle: 'Verwalten Sie Lagerkapazitäten, Auslastungsgrade und standortübergreifende Umlagerungen.',
      code: 'Standort-Code',
      location: 'Standort',
      manager: 'Lagerleiter',
      capacity: 'Gesamtkapazität',
      utilization: 'Auslastung',
      stockLevels: 'Lagereinheiten',
      transferBetween: 'Interne Umlagerung',
    },
    movements: {
      title: 'Warenbewegungen & Auditprotokoll',
      subtitle: 'Vollständiges Buchungsjournal für Wareneingänge, interne Umlagerungen und Verkaufsabgänge.',
      recordNew: '+ Buchung Erfassen',
      type: 'Buchungsart',
      item: 'Artikel / SKU',
      from: 'Ursprungslager',
      to: 'Ziellager',
      qty: 'Menge',
      operator: 'Autorisierter Mitarbeiter',
      date: 'Zeitpunkt',
      notes: 'Buchungstext & Referenz',
      types: {
        receive: 'Wareneingang (Lieferant)',
        transfer: 'Interne Umlagerung',
        adjust: 'Inventurkorrektur',
        sale: 'Warenausgang (Verkauf)',
        project_req: 'Kopilot Projektentnahme',
        return: 'Kundenretoure (RMA)',
      },
    },
    integrations: {
      title: 'Zentraler App-Integrations-Hub',
      subtitle: 'Bidirektionale Datenverbindung zwischen Personal, Projektmanagement, Buchhaltung und Vertrieb.',
      badge: '4 Unternehmens-Konnektoren Aktiv',
      statusConnected: 'Verbunden & Aktiv',
      statusSyncing: 'Synchronisiere...',
      statusPending: 'Bereit für Nächsten Abruf',
      syncAllNow: 'Alle 4 Apps Synchronisieren',
      syncing: 'Datenabgleich Läuft...',
      lastSynced: 'Letzte Synchronisation',
      syncInterval: 'Intervall',
      recordsLinked: 'Verknüpfte Datensätze',
      viewAuditLog: 'Audit-Protokoll Einsehen',
      triggerManualSync: 'Manueller 2-Wege-Sync',
      apps: {
        talentPulse: {
          name: 'TalentPulse-HRIS',
          desc: 'Gleicht Schichten von Lagerkommissionierern und Freigabeberechtigungen mit den Personaldaten ab.',
          metricLabel: 'Zugewiesene Lagerkräfte',
          features: [
            'Schichtabgleich für Kommissionierer',
            'Berechtigungskartierung für Inventuren',
            'Bedienerzuordnung im Auditprotokoll',
          ],
        },
        kopilot: {
          name: 'Kopilot Projects',
          desc: 'Reserviert Projektmaterialien, verwaltet Stücklisten (BOM) und verbucht den Verbrauch direkt auf Kundenprojekte.',
          metricLabel: 'Aktive Materialreservierungen',
          features: [
            'Automatische Bestandsreservierung bei Projektstart',
            'Materialanforderungs-Trigger bei Meilensteinen',
            'Echtzeit-Materialkostenkalkulation',
          ],
        },
        boekhoudGemak: {
          name: 'BoekhoudGemak',
          desc: 'Hält Hauptbuchkonten synchron für Bestandsbewertung, Wareneinsatz (COGS) und Vorsteuerverbuchung.',
          metricLabel: 'Synchronisierte Sachkonten',
          features: [
            'Echtzeitbewertung nach FIFO & Durchschnittswert',
            'Automatische Buchungssätze für Wareneinsatz',
            'Eingangsrechnungen und Steuerberechnung',
          ],
        },
        nexusCrm: {
          name: 'NexusCRM Suite',
          desc: 'Verbindet Vertriebschancen, Kundenaufträge und RMA-Rücksendeanträge nahtlos mit den Beständen.',
          metricLabel: 'Verknüpfte CRM-Kundenaufträge',
          features: [
            'Echtzeit-Verfügbarkeitsprüfung bei Angeboten',
            'Bestandssicherung bei Geschäftsabschluss',
            'Automatische Einlagerung bei RMA-Retouren',
          ],
        },
      },
    },
    cloud: {
      title: 'Cloud-Synchronisation & Sicherungstresor',
      subtitle: 'Snapshot-Verwaltung mit lokaler Wiederherstellung und Exportoptionen.',
      googleDriveTitle: 'Google Workspace & Google Drive Cloud-Sync',
      googleDriveDesc: 'Sichern Sie Inventur-Snapshots direkt in Ihrem Google Drive zur Ausfallsicherung.',
      connected: 'Cloud-Tresor Bereit',
      disconnected: 'Lokaler Tresor Aktiv',
      createSnapshot: 'Vollständigen Snapshot Erstellen',
      restoreSnapshot: 'Aus Snapshot Wiederherstellen',
      restoreConfirm: 'Das Wiederherstellen überschreibt die aktuellen Bestandsdaten. Möchten Sie fortfahren?',
      exportLocal: 'Als JSON Exportieren',
      importLocal: 'JSON-Sicherung Importieren',
      backupsList: 'Sicherungsverlauf & Tresor',
      fileName: 'Dateiname',
      items: 'SKU Anzahl',
      valuation: 'Lagerwert',
      date: 'Erstellt Am',
      actions: 'Aktionen',
      download: 'Datei Herunterladen',
    },
    sponsor: {
      title: 'OmniStock Pro Unterstützen',
      subtitle: 'Fördern Sie die Weiterentwicklung, neue Schnittstellen und moderne Open-Source-Tools.',
      creatorMessage: 'Vielen Dank für die Nutzung von OmniStock Pro! Ihre Spende sichert kontinuierliche Verbesserungen, Fehlerbehebungen und neue Integrationen.',
      paypalAccount: 'luciferamorgenster@gmail.com',
      tier5Title: 'Kaffee-Spende · €5',
      tier5Desc: 'Laden Sie den Entwickler auf einen Kaffee ein und beschleunigen Sie das nächste Release.',
      tier15Title: 'Professioneller Förderer · €15',
      tier15Desc: 'Unterstützt automatisierte Tests, Code-Qualität und Dokumentationspflege.',
      tier50Title: 'Unternehmens-Patron · €50',
      tier50Desc: 'Fördert tiefgreifende Schnittstellen und Multi-Lager-Algorithmen.',
      customAmount: 'Eigener Betrag',
      donateViaPaypal: 'Über PayPal Spenden',
      copied: 'PayPal-Adresse in die Zwischenablage kopiert!',
      copyEmail: 'PayPal-Adresse Kopieren',
      heartNote: 'Jede Spende fließt direkt in die Pflege und Weiterentwicklung.',
    },
    common: {
      cancel: 'Abbrechen',
      save: 'Speichern',
      delete: 'Löschen',
      close: 'Schließen',
      confirm: 'Bestätigen',
      filter: 'Filtern',
      clear: 'Zurücksetzen',
      success: 'Vorgang erfolgreich ausgeführt.',
      warning: 'Achtung erforderlich',
      currency: '€',
    },
  },

  fr: {
    appName: 'OmniStock Pro',
    tagline: 'Système Multilingue de Gestion des Stocks Multi-Entrepôts',
    nav: {
      inventory: 'Gestion des Stocks',
      warehouses: 'Entrepôts',
      movements: 'Mouvements & Audit',
      integrations: 'Intégrations Apps',
      cloudSync: 'Cloud & Sauvegarde',
      readme: 'Documentation',
      sponsor: 'Soutenir / Sponsor',
    },
    seo: {
      title: 'OmniStock Pro – Gestion des Stocks & Entrepôts Multilingue',
      description: 'Optimisez les stocks multi-entrepôts, réapprovisionnements et la synchronisation avec TalentPulse-HRIS, Kopilot Projects, BoekhoudGemak et NexusCRM Suite.',
      keywords: 'gestion des stocks, multi-entrepôts, TalentPulse, Kopilot, BoekhoudGemak, NexusCRM, contrôle des stocks, logistique',
    },
    stats: {
      totalItems: 'Articles au Catalogue (SKU)',
      totalValuation: 'Valeur Totale des Stocks',
      activeWarehouses: 'Sites Logistiques Actifs',
      lowStockAlerts: 'Alertes Réapprovisionnement',
      suiteSyncHealth: 'Santé de la Synchronisation',
      allSystemsNormal: '4 Connecteurs Synchronisés',
    },
    inventory: {
      title: 'Catalogue des Stocks & Articles',
      subtitle: 'Niveaux de stocks en temps réel par site, valorisation comptable et liaisons inter-applications.',
      searchPlaceholder: 'Rechercher par SKU, désignation ou tag...',
      allCategories: 'Toutes Catégories',
      allWarehouses: 'Tous Entrepôts',
      allStatuses: 'Tous États',
      statusInStock: 'En Stock',
      statusLowStock: 'Stock Faible',
      statusCritical: 'Rupture Imminente',
      statusOutOfStock: 'Épuisé',
      addNewItem: '+ Ajouter un Article',
      exportCsv: 'Exporter CSV',
      exportJson: 'Exporter JSON',
      table: {
        sku: 'SKU / Code-barres',
        product: 'Article & Catégorie',
        category: 'Catégorie',
        stockStatus: 'État du Stock',
        totalUnits: 'Unités Totales',
        distribution: 'Répartition par Entrepôt',
        cost: 'Coût Unitaire',
        price: 'Prix Vente',
        totalValue: 'Valeur Globale',
        suiteLinks: 'Liaisons Suite',
        actions: 'Actions',
      },
      noItemsFound: 'Aucun article trouvé selon ces critères.',
      noItemsSub: 'Ajustez votre recherche ou réinitialisez les filtres.',
      resetFilters: 'Réinitialiser les Filtres',
    },
    itemDetail: {
      title: 'Fiche Article',
      editProduct: 'Modifier le Produit',
      generalInfo: 'Informations Générales',
      stockBreakdown: 'Stock par Entrepôt',
      adjustStock: 'Ajuster Quantité',
      quickTransfer: 'Transférer du Stock',
      suiteConnections: 'Données Inter-Applications',
      reorderLevel: 'Seuil de Réassort',
      barcode: 'Code-barres & SKU',
      supplier: 'Fournisseur Principal',
    },
    warehouses: {
      title: 'Sites Logistiques & Entrepôts',
      subtitle: 'Gestion des capacités, taux de remplissage et transferts inter-sites.',
      code: 'Code Site',
      location: 'Localisation',
      manager: 'Responsable',
      capacity: 'Capacité Totale',
      utilization: 'Occupation',
      stockLevels: 'Unités Stockées',
      transferBetween: 'Transfert Inter-Entrepôts',
    },
    movements: {
      title: 'Mouvements de Stock & Journal d’Audit',
      subtitle: 'Journal chronologique immuable des réceptions fournisseurs, transferts internes et sorties de ventes.',
      recordNew: '+ Enregistrer un Mouvement',
      type: 'Type de Mouvement',
      item: 'Article / SKU',
      from: 'Entrepôt Origine',
      to: 'Entrepôt Destination',
      qty: 'Quantité',
      operator: 'Opérateur Habilité',
      date: 'Date & Heure',
      notes: 'Notes d’Audit & Référence',
      types: {
        receive: 'Réception Marchandises (Fournisseur)',
        transfer: 'Transfert Interne',
        adjust: 'Ajustement Inventaire Physique',
        sale: 'Expédition Vente Client',
        project_req: 'Réquisition Projet Kopilot',
        return: 'Retour Client (RMA)',
      },
    },
    integrations: {
      title: 'Plateforme d’Intégration Suite Unifiée',
      subtitle: 'Synchronisation bidirectionnelle entre RH, gestion de projets, comptabilité et CRM.',
      badge: '4 Connecteurs d’Entreprise Actifs',
      statusConnected: 'Connecté & Actif',
      statusSyncing: 'Synchronisation...',
      statusPending: 'En Attente',
      syncAllNow: 'Synchroniser les 4 Apps',
      syncing: 'Synchronisation en cours...',
      lastSynced: 'Dernière Synchro',
      syncInterval: 'Cadence',
      recordsLinked: 'Enregistrements Liés',
      viewAuditLog: 'Journal d’Audit',
      triggerManualSync: 'Lancer Synchro 2-Voies',
      apps: {
        talentPulse: {
          name: 'TalentPulse-HRIS',
          desc: 'Synchronise les plannings des préparateurs de commandes et les habilitations d’audit directement depuis les dossiers RH.',
          metricLabel: 'Préparateurs Affectés',
          features: [
            'Synchro des créneaux de préparation',
            'Attribution des droits d’audit physique',
            'Traçabilité nominative des opérateurs',
          ],
        },
        kopilot: {
          name: 'Kopilot Projects',
          desc: 'Alloue les composants et nomenclatures (BOM) aux tâches projets et impute la consommation directement aux chantiers clients.',
          metricLabel: 'Réservations Projets Actives',
          features: [
            'Réservation automatique dès lancement de tâche',
            'Déclencheurs d’approvisionnement par jalon',
            'Calcul en temps réel du coût matière projet',
          ],
        },
        boekhoudGemak: {
          name: 'BoekhoudGemak',
          desc: 'Maintient la balance générale synchronisée pour la valorisation des stocks, le coût des marchandises vendues (COGS) et la TVA.',
          metricLabel: 'Comptes Généraux Synchronisés',
          features: [
            'Valorisation FIFO & Coût Moyen Pondéré',
            'Écritures comptables automatiques du coût des ventes',
            'Comptabilisation des factures fournisseurs et TVA',
          ],
        },
        nexusCrm: {
          name: 'NexusCRM Suite',
          desc: 'Relie les opportunités commerciales, commandes clients et retours RMA directement à la disponibilité physique en stock.',
          metricLabel: 'Commandes CRM Rattachées',
          features: [
            'Vérification du stock lors des devis clients',
            'Réservation dès passage d’affaire en statut Gagné',
            'Réintégration en stock lors des retours RMA',
          ],
        },
      },
    },
    cloud: {
      title: 'Synchronisation Cloud & Coffre de Sauvegardes',
      subtitle: 'Gestion intégrale des instantanés de stock avec restauration locale et export sécurisé.',
      googleDriveTitle: 'Google Workspace & Google Drive Cloud Sync',
      googleDriveDesc: 'Sauvegardez vos instantanés de stock dans votre Google Drive pour assurer la continuité opérationnelle.',
      connected: 'Coffre Cloud Prêt',
      disconnected: 'Coffre Local Actif',
      createSnapshot: 'Créer un Instantané Complet',
      restoreSnapshot: 'Restaurer depuis un Instantané',
      restoreConfirm: 'La restauration va mettre à jour vos données actuelles. Confirmez-vous ?',
      exportLocal: 'Exporter Fichier JSON',
      importLocal: 'Importer Sauvegarde JSON',
      backupsList: 'Historique des Instantanés',
      fileName: 'Nom de Fichier',
      items: 'Nombre de SKU',
      valuation: 'Valeur du Stock',
      date: 'Date de Création',
      actions: 'Actions',
      download: 'Télécharger',
    },
    sponsor: {
      title: 'Soutenir & Sponsoriser OmniStock Pro',
      subtitle: 'Soutenez la maintenance continue, les nouvelles intégrations et les outils open source.',
      creatorMessage: 'Merci d’utiliser OmniStock Pro ! Vos dons garantissent des améliorations continues, des performances d’entreprise et de nouveaux connecteurs.',
      paypalAccount: 'luciferamorgenster@gmail.com',
      tier5Title: 'Don Café · €5',
      tier5Desc: 'Offrez un café au développeur pour financer la prochaine mise à jour.',
      tier15Title: 'Soutien Professionnel · €15',
      tier15Desc: 'Finance les tests automatisés, la sécurité et la documentation.',
      tier50Title: 'Mécène Entreprise · €50',
      tier50Desc: 'Accélère les connecteurs avancés et les algorithmes logistiques.',
      customAmount: 'Montant Personnalisé',
      donateViaPaypal: 'Faire un Don via PayPal',
      copied: 'Adresse email PayPal copiée dans le presse-papiers !',
      copyEmail: 'Copier l’Email PayPal',
      heartNote: 'Chaque don soutient directement le travail de développement.',
    },
    common: {
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      close: 'Fermer',
      confirm: 'Confirmer',
      filter: 'Filtrer',
      clear: 'Effacer',
      success: 'Opération effectuée avec succès.',
      warning: 'Attention requise',
      currency: '€',
    },
  },
};
