import React from 'react';
import { Frown, CheckCircle2 } from 'lucide-react';

interface ResultCardProps {
  searchTerm: string;
  result: string | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ searchTerm, result }) => {
  if (!searchTerm) {
    return (
      <div className="mt-20 flex flex-col items-center justify-center text-center opacity-50">
        <div className="mb-4 rounded-full bg-slate-100 p-4">
          <SearchIconPlaceholder />
        </div>
        <p className="text-slate-500">Aramak için yukarıya yazmaya başlayın</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="overflow-hidden rounded-xl border border-blue-100 bg-white shadow-lg shadow-blue-500/5">
          <div className="border-b border-blue-50 bg-blue-50/50 px-6 py-4 flex items-center gap-3">
             <CheckCircle2 className="h-5 w-5 text-green-500" />
             <h2 className="text-sm font-semibold text-blue-900 uppercase tracking-wider">Sonuç Bulundu</h2>
          </div>
          <div className="p-6">
            <p className="text-lg leading-relaxed text-slate-700">
              {result}
            </p>
          </div>
          <div className="bg-slate-50 px-6 py-3">
            <p className="text-xs text-slate-400">
              Aranan terim: <span className="font-medium text-slate-600">"{searchTerm}"</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
       <div className="overflow-hidden rounded-xl border border-red-100 bg-white shadow-sm">
          <div className="flex items-start gap-4 p-6">
            <div className="flex-shrink-0 rounded-full bg-red-50 p-2">
              <Frown className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-base font-medium text-slate-900">Sonuç Bulunamadı</h3>
              <p className="mt-1 text-slate-500">
                Aradığınız <strong>"{searchTerm}"</strong> terimi için sistemde bir kayıt bulunamadı.
              </p>
            </div>
          </div>
       </div>
    </div>
  );
};

const SearchIconPlaceholder = () => (
  <svg
    className="h-10 w-10 text-slate-300"
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