import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { translations } from '../i18n/translations';
import {
  Heart,
  Coffee,
  Sparkles,
  ShieldCheck,
  Copy,
  Check,
  ExternalLink,
  X,
  CreditCard,
} from 'lucide-react';

export const SponsorModal: React.FC = () => {
  const { language, isSponsorModalOpen, closeSponsorModal } = useInventory();
  const t = translations[language];

  const [copied, setCopied] = useState(false);
  const [selectedTier, setSelectedTier] = useState<number | 'custom'>(15);
  const [customAmount, setCustomAmount] = useState('25');

  if (!isSponsorModalOpen) return null;

  const paypalEmail = 'luciferamorgenster@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(paypalEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const getDonationAmount = () => {
    if (selectedTier === 'custom') {
      const num = parseFloat(customAmount);
      return isNaN(num) || num <= 0 ? 10 : num;
    }
    return selectedTier;
  };

  const getPaypalLink = () => {
    const amount = getDonationAmount();
    return `https://www.paypal.com/donate/?business=${encodeURIComponent(
      paypalEmail
    )}&amount=${amount}&currency_code=EUR&item_name=${encodeURIComponent('OmniStock Pro Sponsorship')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-br from-rose-50 via-white to-indigo-50/30 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800 relative">
          <button
            onClick={closeSponsorModal}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-sm">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.sponsor.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.sponsor.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.sponsor.creatorMessage}
          </p>

          {/* PayPal Account Target Box */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-semibold tracking-wider">
                Direct PayPal Recipient
              </div>
              <div className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5 select-all">
                {paypalEmail}
              </div>
            </div>

            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">{t.sponsor.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.sponsor.copyEmail}</span>
                </>
              )}
            </button>
          </div>

          {/* Donation Tiers Selection */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Select Sponsorship Tier
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedTier(5)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedTier === 5
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Coffee className="w-4 h-4 text-amber-500" />
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">€5</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">Supporter</div>
                <div className="text-[10px] text-slate-500 line-clamp-1">Coffee & Fuel</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTier(15)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedTier === 15
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-1 ring-indigo-600'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">€15</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">Pro Backer</div>
                <div className="text-[10px] text-slate-500 line-clamp-1">Continuous Code</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTier(50)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedTier === 50
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">€50</span>
                </div>
                <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">Enterprise</div>
                <div className="text-[10px] text-slate-500 line-clamp-1">Deep Connectors</div>
              </button>
            </div>

            {/* Custom Amount option */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedTier('custom')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  selectedTier === 'custom'
                    ? 'border-indigo-600 text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30'
                    : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                }`}
              >
                {t.sponsor.customAmount}
              </button>

              {selectedTier === 'custom' && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500">€</span>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-24 px-2.5 py-1 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Action Button: Opens PayPal Checkout */}
          <div className="pt-2 space-y-2">
            <a
              href={getPaypalLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer text-center"
            >
              <CreditCard className="w-4 h-4" />
              <span>{t.sponsor.donateViaPaypal} (€{getDonationAmount()})</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <div className="text-[11px] text-center text-slate-400">
              {t.sponsor.heartNote}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
