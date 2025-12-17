import React from 'react';
import { Frown, CheckCircle2, UserCircle2 } from 'lucide-react';
import type { DictionaryEntry } from '../data/dictionary';

interface ResultCardProps {
  searchTerm: string;
  result: DictionaryEntry | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ searchTerm, result }) => {
  if (!searchTerm) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center text-center opacity-40">
        <div className="mb-4 rounded-full bg-slate-900 p-4 border border-slate-800 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
          <SearchIconPlaceholder />
        </div>
        <p className="text-slate-500">Aramak için yukarıya yazmaya başlayın</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="overflow-hidden rounded-xl border border-orange-500/30 bg-slate-900 shadow-[0_0_30px_rgba(249,115,22,0.15)]">
          <div className="border-b border-orange-500/20 bg-orange-500/10 px-6 py-4 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-orange-500" />
                <h2 className="text-sm font-semibold text-orange-400 uppercase tracking-wider">Sonuç Bulundu</h2>
             </div>
             {result.author && (
                <div className="flex items-center gap-1.5 rounded-full bg-slate-950/50 px-2.5 py-1 border border-slate-800/50">
                    <UserCircle2 className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs font-medium text-slate-300">{result.author}</span>
                </div>
             )}
          </div>
          <div className="p-6">
            <p className="text-lg leading-relaxed text-slate-100">
              {result.text}
            </p>
          </div>
          <div className="bg-slate-950/50 px-6 py-3 border-t border-slate-800">
            <p className="text-xs text-slate-500">
              Aranan terim: <span className="font-medium text-orange-400">"{searchTerm}"</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
       <div className="overflow-hidden rounded-xl border border-red-900/50 bg-slate-900 shadow-sm">
          <div className="flex items-start gap-4 p-6">
            <div className="flex-shrink-0 rounded-full bg-red-950/50 p-2">
              <Frown className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-base font-medium text-slate-200">Sonuç Bulunamadı</h3>
              <p className="mt-1 text-slate-400">
                Aradığınız <strong className="text-slate-300">"{searchTerm}"</strong> terimi için sistemde bir kayıt bulunamadı.
              </p>
            </div>
          </div>
       </div>
    </div>
  );
};

const SearchIconPlaceholder = () => (
  <svg
    className="h-10 w-10 text-slate-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);