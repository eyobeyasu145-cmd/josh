import React, { useState } from 'react';
import { Copy, Check, Share2, QrCode } from 'lucide-react';
import { BankAccount } from '../types';

interface AccountCardProps {
  account: BankAccount;
  key?: string | number;
}

export default function AccountCard({ account }: AccountCardProps) {
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(account.accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleShare = () => {
    const shareText = `Bank Account details for Josh Electronics:
Bank: ${account.bankName}
Account Holder: ${account.holder}
Account Number: ${account.accountNumber}`;
    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="relative group overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      
      {/* Decorative Brand Bank Header Strip */}
      <div 
        className={`h-2 bg-gradient-to-r ${account.colorTheme}`} 
      />

      <div className="p-5 flex flex-col justify-between flex-1">
        
        {/* Bank & Holder Representation */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-heading font-extrabold text-sm text-white"
                style={{ backgroundColor: account.logoHex }}
              >
                {account.bankName.charAt(0)}
              </div>
              <h4 className="font-heading font-extrabold text-slate-800 dark:text-slate-100 text-sm tracking-wide">
                {account.bankName}
              </h4>
            </div>
            
            {/* Owner Label */}
            <span className="text-[10px] font-extrabold px-2 py-1 rounded bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/50 uppercase tracking-widest shrink-0">
              {account.holder.split(' ')[0]} {/* Yishak / Tigilu */}
            </span>
          </div>

          {/* Account Label / Holder Full */}
          <div className="mb-4">
            <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              Account Holder Name
            </p>
            <p className="font-sans font-semibold text-slate-800 dark:text-slate-200 text-xs">
              {account.holder}
            </p>
          </div>

          {/* Large Digit Account Block */}
          <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-100 dark:border-slate-900 mb-4">
            <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider mb-1">
              Account Number / ID
            </p>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-base font-bold text-slate-900 dark:text-white tracking-widest break-all select-all">
                {account.accountNumber}
              </span>
              
              <button
                onClick={handleCopyAccount}
                className={`p-2 rounded-lg border transition-all shrink-0 ${
                  copiedAccount
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900'
                    : 'bg-white text-slate-500 border-slate-200 hover:text-blue-600 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 dark:hover:bg-slate-800'
                }`}
                title="Copy Number"
                aria-label="Copy Account Number"
              >
                {copiedAccount ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 mt-auto">
          
          <button
            onClick={() => setShowQR(!showQR)}
            className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-300 font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            aria-label="Toggle QR Code representation"
          >
            <QrCode className="w-4 h-4 text-slate-500" />
            <span>Show QR Code</span>
          </button>

          <button
            onClick={handleShare}
            className={`p-2 rounded-xl border transition-all ${
              copiedShare
                ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900'
                : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
            title="Share Details"
            aria-label="Copy share information"
          >
            {copiedShare ? (
              <span className="text-[10px] font-bold px-1 text-blue-600 dark:text-blue-400 uppercase tracking-widest shrink-0 block">Copied</span>
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>

      </div>

      {/* Slide-Up QR Mock Overlay drawer */}
      {showQR && (
        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm z-20 flex flex-col justify-center items-center p-5 text-center animate-in fade-in duration-200">
          <div className="bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center mb-3">
            {/* Modern visual custom SVG QR representation to simulate real bank scan block */}
            <div className="w-36 h-36 border border-slate-100 p-2 relative flex flex-col items-center justify-center bg-slate-50">
              {/* Outer boundary lines */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-600" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-600" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-600" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-600" />
              
              {/* QR Code grid blocks layout */}
              <div className="grid grid-cols-5 gap-1.5 w-24 h-24 text-slate-900">
                <div className="bg-slate-900 rounded" />
                <div className="bg-slate-900 rounded" />
                <div className="bg-transparent" />
                <div className="bg-slate-900 rounded" />
                <div className="bg-slate-900 rounded" />

                <div className="bg-slate-900 rounded" />
                <div className="bg-transparent" />
                <div className="bg-slate-900 rounded" />
                <div className="bg-transparent" />
                <div className="bg-slate-900 rounded" />

                <div className="bg-transparent" />
                <div className="bg-slate-900 rounded" />
                <div className="bg-blue-600 rounded flex items-center justify-center font-bold text-[8px] text-white">J</div>
                <div className="bg-slate-900 rounded" />
                <div className="bg-transparent" />

                <div className="bg-slate-900 rounded" />
                <div className="bg-transparent" />
                <div className="bg-slate-900 rounded" />
                <div className="bg-transparent" />
                <div className="bg-slate-900 rounded" />

                <div className="bg-slate-900 rounded" />
                <div className="bg-slate-900 rounded" />
                <div className="bg-transparent" />
                <div className="bg-slate-900 rounded" />
                <div className="bg-slate-900 rounded" />
              </div>
            </div>
            
            <span className="text-[10px] font-sans font-bold text-slate-500 uppercase tracking-widest mt-2 block">
              Scan with Bank App
            </span>
          </div>

          <p className="text-white text-xs font-heading font-extrabold mb-1">
            {account.bankName}
          </p>
          <p className="text-slate-400 text-[10px] mb-4">
            {account.holder}
          </p>

          <button
            onClick={() => setShowQR(false)}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans font-bold text-xs shadow-md transition-all"
            id={`close-qr-${account.id}`}
          >
            Close Scan Screen
          </button>
        </div>
      )}

    </div>
  );
}
