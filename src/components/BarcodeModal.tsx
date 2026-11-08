import React, { useState } from 'react';
import { InventoryItem } from '../types';
import { X, Copy, Check, Printer, Barcode as BarcodeIcon } from 'lucide-react';

interface BarcodeModalProps {
  item: InventoryItem | null;
  onClose: () => void;
}

export const BarcodeModal: React.FC<BarcodeModalProps> = ({ item, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.barcode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Generate SVG barcode stripes deterministically from barcode digits
  const renderBarcodeBars = () => {
    const digits = item.barcode || '8719324001923';
    const bars: React.ReactNode[] = [];
    let xOffset = 10;

    // Guard bar
    bars.push(<rect key="start-1" x={xOffset} y="0" width="2" height="60" fill="currentColor" />);
    xOffset += 4;
    bars.push(<rect key="start-2" x={xOffset} y="0" width="2" height="60" fill="currentColor" />);
    xOffset += 6;

    // Pattern bars based on digit values
    for (let i = 0; i < digits.length; i++) {
      const d = parseInt(digits[i], 10) || 3;
      const width = (d % 3) + 1.5;
      bars.push(
        <rect
          key={`bar-${i}`}
          x={xOffset}
          y="0"
          width={width}
          height="54"
          fill="currentColor"
        />
      );
      xOffset += width + 2 + (d % 2);
    }

    // Center divider
    xOffset += 4;
    bars.push(<rect key="mid-1" x={xOffset} y="0" width="2" height="60" fill="currentColor" />);
    xOffset += 4;
    bars.push(<rect key="mid-2" x={xOffset} y="0" width="2" height="60" fill="currentColor" />);
    xOffset += 8;

    // Trailing digits
    for (let i = digits.length - 1; i >= 0; i--) {
      const d = parseInt(digits[i], 10) || 2;
      const width = (d % 3) + 1.5;
      bars.push(
        <rect
          key={`bar-end-${i}`}
          x={xOffset}
          y="0"
          width={width}
          height="54"
          fill="currentColor"
        />
      );
      xOffset += width + 2;
    }

    // End guard
    xOffset += 6;
    bars.push(<rect key="end-1" x={xOffset} y="0" width="2" height="60" fill="currentColor" />);
    xOffset += 4;
    bars.push(<rect key="end-2" x={xOffset} y="0" width="2" height="60" fill="currentColor" />);

    return { bars, totalWidth: xOffset + 14 };
  };

  const { bars, totalWidth } = renderBarcodeBars();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 text-center space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <BarcodeIcon className="w-4 h-4 text-indigo-600" />
            <span>Industrial Barcode Label</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white">
          <div className="text-xs font-bold uppercase tracking-wide mb-1">
            {item.name}
          </div>
          <div className="text-[11px] font-mono text-slate-500 mb-3">
            SKU: {item.sku} · {item.category}
          </div>

          {/* SVG Barcode */}
          <div className="flex justify-center my-3 bg-white p-3 rounded border border-slate-200 text-black">
            <svg
              viewBox={`0 0 ${totalWidth} 64`}
              className="w-full max-w-[240px] h-16 text-black"
              preserveAspectRatio="xMidYMid meet"
            >
              {bars}
            </svg>
          </div>

          <div className="font-mono text-xs font-bold tracking-widest text-slate-900 dark:text-slate-100">
            {item.barcode}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Barcode</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Label</span>
          </button>
        </div>
      </div>
    </div>
  );
};
