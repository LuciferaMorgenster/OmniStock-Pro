import React from 'react';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import {
  BookOpen,
  Heart,
  Globe,
  ExternalLink,
  Layers,
  CheckCircle2,
  Boxes,
} from 'lucide-react';

export const ReadmeView: React.FC = () => {
  const { language, openSponsorModal } = useInventory();
  const t = translations[language];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Multilingual Documentation (README.md)</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            OmniStock Pro System Guide
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Architecture, suite integrations, multi-warehouse operational guide, and developer sponsorship.
          </p>
        </div>

        <button
          onClick={openSponsorModal}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>Support via PayPal</span>
        </button>
      </div>

      {/* Cover Image Showcase */}
      <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-950">
        <img
          src="/src/assets/images/omnistock_cover_showcase_1794120091394.jpg"
          alt="OmniStock Pro Operations Showcase"
          referrerPolicy="no-referrer"
          className="w-full h-64 sm:h-80 object-cover"
        />
        <div className="p-4 bg-slate-900 text-slate-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Cover Showcase: Modern Enterprise Logistics & Automated Fulfillment Center</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">16:9 4K Quality</span>
        </div>
      </div>

      {/* Live Production Version Banner */}
      <div className="p-5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Live Production Instance & PWA
            </span>
          </div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white font-mono">
            omnistock-pro.lucifera.eu
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Access the live deployed instance or install directly to home screen / desktop with offline cache.
          </p>
        </div>

        <a
          href="https://omnistock-pro.lucifera.eu"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-sm"
        >
          <span>Open omnistock-pro.lucifera.eu</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* PayPal Patronage Notice */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-rose-50/60 to-indigo-50/60 dark:from-slate-800 dark:to-slate-900 border border-rose-200/60 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Developer Patronage & Continuous Engineering</span>
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            PayPal Account: <strong className="font-mono text-slate-900 dark:text-white">luciferamorgenster@gmail.com</strong>
          </p>
        </div>

        <a
          href="https://www.paypal.com/donate/?business=luciferamorgenster@gmail.com&currency_code=EUR"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0"
        >
          <span>Donate via PayPal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Guide Content */}
      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            1. Multi-Warehouse Architecture
          </h3>
          <p>
            OmniStock Pro natively organizes stock across decentralized locations: Amsterdam Central Hub, Rotterdam Port Terminal, Utrecht Regional Depot, and Antwerp Gateway Terminal. Storage capacities, utilization percentages, and inventory valuations are computed in real time.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            2. The 4 Cross-Application Suite Connectors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <strong className="text-emerald-700 dark:text-emerald-400 font-semibold block mb-1">
                TalentPulse-HRIS
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Synchronizes staff shifts, warehouse picker assignments, and authorized inventory auditor tracking directly with HR records.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <strong className="text-indigo-700 dark:text-indigo-400 font-semibold block mb-1">
                Kopilot Projects
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Automates Bill-of-Materials (BOM) stock reservations when project tasks start, ensuring parts are not double-booked.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <strong className="text-amber-700 dark:text-amber-400 font-semibold block mb-1">
                BoekhoudGemak
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Synchronizes FIFO and Weighted Average stock valuation directly with the general ledger, generating automated Cost of Goods Sold (COGS) journal lines.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <strong className="text-blue-700 dark:text-blue-400 font-semibold block mb-1">
                NexusCRM Suite
              </strong>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Connects sales pipeline deals and won customer orders with warehouse picking orders, plus customer return (RMA) intake.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
            3. Dynamic Multilingual SEO & OpenGraph Social Sharing
          </h3>
          <p>
            The application incorporates full dynamic SEO updates. Whenever the language is switched between English, Dutch, German, and French:
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2 text-xs text-slate-600 dark:text-slate-400">
            <li>Document title and meta descriptions update reactively in the DOM.</li>
            <li>Facebook, LinkedIn, and Twitter OpenGraph cards leverage the high-res cover image showcase.</li>
            <li>Schema.org JSON-LD structured data specifies multi-language support (<code className="font-mono">inLanguage</code>) and software offers.</li>
            <li>Multilingual alternate tags (<code className="font-mono">hreflang</code>) enable search engine indexing across international markets.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
