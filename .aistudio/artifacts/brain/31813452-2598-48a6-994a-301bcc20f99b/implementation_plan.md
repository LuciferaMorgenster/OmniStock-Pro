# OmniStock Pro – Multilingual Enterprise Inventory Management & Ecosystem Suite

An enterprise-grade, multi-warehouse inventory management system designed for modern commerce and retail operations, featuring unified cross-application synchronization with TalentPulse-HRIS, Kopilot Projects, BoekhoudGemak, and NexusCRM Suite, bidirectional Google Drive cloud backup, multilingual SEO architecture, and creator sponsorship integration.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following key decisions were confirmed during the interactive clarification interview and will form the core baseline of the system:

- **Confirmed Decision 1 (Inventory Domain)**: Optimized for general retail, wholesale, and multi-warehouse operations (multi-location stock tracking, SKU variants, reorder triggers, purchase orders, batch transfers, and barcode scanning).
- **Confirmed Decision 2 (Suite Integration Architecture)**: Unified Integration Hub with automated 2-way sync, event bus, cross-app record linking, and manual sync simulation with audit trails for TalentPulse-HRIS, Kopilot Projects, BoekhoudGemak, and NexusCRM Suite.
- **Confirmed Decision 3 (Language Support)**: First-class multilingual system supporting English (default), Dutch (Nederlands), German (Deutsch), and French (Français), complete with dynamic localized SEO meta tags, `hreflang` alternates, and JSON-LD structured data.
- **Decision 4 (Google Workspace & Cloud Sync)**: Seamless Google Drive integration using the Google Drive API (`drive.file` scope) for encrypted inventory snapshots, automatic scheduled backups, spreadsheet export, and point-in-time state recovery.
- **Decision 5 (Sponsorship & Support)**: Integrated creator patronage widget and PayPal direct support portal targeting `luciferamorgenster@gmail.com` with one-click donation tiers and appreciation recognition.

---

## 1. Overview & Core Concept

### What It Does
**OmniStock Pro** gives business operators, logistics teams, and enterprise managers complete real-time visibility over multi-warehouse stock levels, reorder pipelines, supplier transactions, and multi-channel fulfillment. It serves as the single source of truth for physical inventory while acting as the central nervous system connecting HR personnel records, project material requisitions, accounting ledgers, and customer sales pipelines.

### Target Audience & Persona
- **Warehouse & Inventory Managers**: Managing stock counts, transfers between locations, receiving purchase shipments, and barcode audits.
- **Operations & Project Directors**: Reserving inventory for specific projects and client deliveries without double-booking stock.
- **Financial Controllers & Accountants**: Tracking inventory valuation (FIFO/Moving Average), cost of goods sold (COGS), VAT/BTW, and supplier bill reconciliation.
- **Sales & Support Specialists**: Real-time stock lookups, order allocation, and customer RMA return tracking.

### Key Value
- **Zero Stock Discrepancies**: Unified stock allocation preventing stockouts and over-selling across warehouse locations.
- **Frictionless App Interoperability**: Seamless coordination between staff shift logs (TalentPulse), project billables (Kopilot), balance sheets (BoekhoudGemak), and customer deals (NexusCRM).
- **Global Readiness**: Native 4-language localization with instant switcher and localized search engine metadata.
- **Cloud Peace of Mind**: Automatic, user-confirmed backups directly to Google Drive.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Inventory Management & Multi-Warehouse Navigation**:
   - The user views an interactive stock ledger filtered by warehouse (e.g., *Main Logistics Hub*, *West Regional Facility*, *Retail Flagship Store*), product category, and stock health (In Stock, Low Stock, Critical, Out of Stock).
   - Fast batch operations: stock adjustments, inter-warehouse transfers, barcode generation, and quick-add modals with validation.
2. **Suite App Synchronization Hub**:
   - Visual connector matrix displaying live sync health and bidirectional linked records for **TalentPulse-HRIS** (warehouse pickers and shift assignments), **Kopilot Projects** (task material allocations), **BoekhoudGemak** (journal entries and valuation ledger), and **NexusCRM Suite** (sales order reservations and RMA returns).
   - Real-time sync triggers, event log viewer, and automated webhook simulation.
3. **Google Drive Cloud Sync & Backup**:
   - Google Workspace sign-in with Google-branded authentication.
   - One-click cloud snapshot generation saving `omnistock-backup-YYYY-MM-DD.json` directly to the user's Google Drive.
   - File explorer for Drive backups with point-in-time restore, automated diff review, and CSV export.
4. **Multilingual Localization & SEO Engine**:
   - Persistent language selector (EN, NL, DE, FR) updating all interface labels, currency formatting, dates, and dynamic document `<title>`, `<meta name="description">`, OpenGraph social share cards, and Schema.org JSON-LD tags in real time.
5. **Support & PayPal Sponsorship Modal**:
   - Header button opening a styled creator patron modal featuring direct PayPal donation links to `luciferamorgenster@gmail.com` with preset amounts (€5, €15, €50, custom) and personalized backer notes.

### Visual Identity & Theme
- **Aesthetic Direction**: High-precision enterprise operational workspace. Clean lines, restrained density, high contrast, zero unnecessary fluff, and professional scannability.
- **Color Palette (60-30-10 Rule)**:
  - *Dominant Canvas (60%)*: Crisp neutral slate (`bg-slate-50 dark:bg-slate-950`).
  - *Structural Surfaces (30%)*: Pure white and deep charcoal containers (`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800`).
  - *Accent Budget (10%)*: High-intent deep indigo / electric cobalt (`bg-indigo-600 hover:bg-indigo-700 text-white`) for primary CTAs and active states. Semantic status indicators: emerald (`#16a34a`) for nominal stock, amber (`#d97706`) for reorder warnings, crimson (`#dc2626`) for critical shortages.
- **Typography**:
  - *Display / Headings*: **Plus Jakarta Sans** (clean, geometric, highly legible at micro and macro scales).
  - *Body Prose*: **Plus Jakarta Sans** / **DM Sans** (comfortable reading density, 15px baseline).
  - *Data, SKUs & Financials*: Strictly tabular figures (**JetBrains Mono** / `tabular-nums`) for vertical numeral alignment.
- **Zero-Pill Discipline**: Metadata uses clean unboxed typography with typographic dots (`·`) and subtle borders; no badge sandwiches or neon pills.
- **Top Bar Contract**:
  - *Zone 1*: Single wordmark: **OmniStock Pro**
  - *Zone 2*: 4 single-line nav links: `Inventory`, `Warehouses`, `Integrations`, `Cloud Sync`
  - *Zone 3*: Language Switcher, Google Drive Status, Sponsor Button, and Primary Action (`+ Add Item`)

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: High-Fidelity Cover Image & Multilingual Social Graph Cards
- **Chosen Approach**: Generate a professional 16:9 cinematic cover image (`omnistock_cover_showcase`) featuring modern logistics and inventory technology. Embed this image in `index.html` meta tags (`og:image`, `twitter:image`), dynamic client-side head updates, and within the multilingual `README.md`.
- **Why**: Ensures Facebook, LinkedIn, Twitter/X, and messaging apps render a high-converting, crisp rich preview card with localized descriptions for all target markets.
- **Alternatives Considered**: Generic stock SVG illustration (rejected due to lack of visual impact and poor social media open rates).

### Decision 2: Google Drive Workspace Sync Architecture
- **Chosen Approach**: Client-side OAuth authorization via `set_up_oauth` requesting the least-privilege `drive.file` scope. The user can create, list, and restore app-created inventory backup files with explicit confirmation dialogs before any data restoration or overwrites.
- **Why**: Adheres strictly to the Google Workspace integration skill and zero-server-redirect constraint for preview environments, ensuring zero permission leaks while providing robust cloud persistence.
- **Alternatives Considered**: Full Google Drive root scope (rejected: violates least privilege principle).

### Decision 3: Cross-App Integration Hub Model
- **Chosen Approach**: A centralized bidirectional integration bus connecting TalentPulse-HRIS, Kopilot Projects, BoekhoudGemak, and NexusCRM Suite with simulated realistic RPC payloads, sync event histories, linked entity inspectors, and manual trigger controls.
- **Why**: Delivers a fully working, interactive ecosystem experience where stock movements immediately reflect in accounting COGS, warehouse employee schedules, project BOM allocations, and CRM customer deals without dead clicks.
- **Alternatives Considered**: Simple external hyperlink redirects (rejected: leaves user with mock shell rather than real interoperability).

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          OmniStock Pro Layout                          │
├────────────────────────────────────────────────────────────────────────┤
│ Top Bar: Brand · Nav Links · Lang Switcher · Sync Status · Support CTA │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌──────────────────────┐  ┌────────────────────────────────────────┐  │
│  │   Navigation Views   │  │           Main Viewport                │  │
│  │  ──────────────────  │  │  ───────────────────────────────────  │  │
│  │  • Stock Catalog     │  │  [KPI Summary Cards: Valuation, SKUs] │  │
│  │  • Multi-Warehouse   │  │  [Filter Bar: Search, Category, Status]│  │
│  │  • Transfers & Orders│  │  [Tabular Inventory Ledger (Tabular)] │  │
│  │  • Suite Integrations│  │  [Stock Detail / Movement Drawer]      │  │
│  │  • Google Cloud Sync │  │                                        │  │
│  │  • Sponsor / Donate  │  │                                        │  │
│  └──────────────────────┘  └────────────────────────────────────────┘  │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                      Cross-Ecosystem Integrations                      │
│ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌──────────────┐ │
│ │ TalentPulse   │ │ Kopilot       │ │ BoekhoudGemak │ │ NexusCRM     │ │
│ │ HRIS Workers  │ │ Project BOM   │ │ Ledger & COGS │ │ Deals & RMA  │ │
│ └───────────────┘ └───────────────┘ └───────────────┘ └──────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│                 Google Workspace & Drive Cloud Sync                    │
│      [OAuth Session] ──> [Backup Creation] ──> [Point-in-Time Restore]  │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & State Stores
- **InventoryItem**: `id`, `sku`, `name`, `category`, `unit`, `unitCost`, `unitPrice`, `stockByWarehouse: Record<string, number>`, `reorderThreshold`, `supplier`, `lastRestocked`, `linkedSuiteEntities`.
- **Warehouse**: `id`, `code`, `name`, `location`, `capacity`, `managerId`, `utilization`.
- **StockMovement**: `id`, `itemId`, `type` (Receive, Transfer, Adjust, OutboundSale, ProjectRequisition), `quantity`, `fromWarehouse`, `toWarehouse`, `timestamp`, `operator`, `suiteRef`.
- **SuiteIntegrationConfig**:
  - `talentPulse`: Staff directory, warehouse shift assignments, audit authorizations.
  - `kopilot`: Project catalog, bill of materials (BOM), active task reservations.
  - `boekhoudGemak`: Chart of accounts, journal sync history, automated COGS & BTW tax calculator.
  - `nexusCrm`: Customer leads, open orders, reserved deal stock, RMA return tickets.
- **CloudBackupMetadata**: `id`, `fileId`, `fileName`, `createdTime`, `itemCount`, `totalValuation`, `checksum`.
- **Locale**: `en` | `nl` | `de` | `fr`, with reactive SEO metadata synchronization (`document.title`, description, canonical, OpenGraph, Schema.org).

### Verification & Implementation Milestones
1. **Asset Generation & SEO Head**: Generate cover image `omnistock_cover_showcase` (16:9), configure `index.html` tags, OpenGraph, Twitter cards, and Schema.org JSON-LD structured data.
2. **Core Inventory Engine**: Multi-warehouse stock tracking, SKU generator, category filtering, reorder alerts, low-stock warnings, and transaction drawer.
3. **Suite Connector Engine**: Build interactive sync consoles and linked-record bridges for TalentPulse-HRIS, Kopilot Projects, BoekhoudGemak, and NexusCRM Suite.
4. **Google Workspace & Drive Sync**: Setup Google Drive OAuth integration, backup file generation, remote file browser, and safe restore with user confirmation.
5. **Multilingual Architecture**: Complete translation matrices for EN, NL, DE, FR across all workflows and dynamic SEO updates.
6. **Support / Sponsor Portal**: Prominent PayPal patronage modal configured for `luciferamorgenster@gmail.com`.
7. **Comprehensive Multilingual README.md**: Full documentation in EN, NL, DE, FR with embedded cover image and usage guides.
