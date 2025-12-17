import React from 'react';
import { BookOpen, User } from 'lucide-react';
import type { DictionaryEntry } from '../data/dictionary';

interface DictionaryGridProps {
  data: Record<string, DictionaryEntry>;
}

export const DictionaryGrid: React.FC<DictionaryGridProps> = ({ data }) => {
  const entries = Object.entries(data);

  if (entries.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900/50 p-8 text-center text-slate-500">
        Henüz veri yok.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {entries.map(([key, entry]) => (
        <div 
          key={key} 
          className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-slate-800 bg-slate-900 p-4 shadow-sm transition-all hover:border-orange-500/50 hover:shadow-[0_0_15px_rgba(249,115,22,0.1)]"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-orange-500 opacity-70 group-hover:opacity-100 transition-opacity" />
                <h3 className="font-semibold text-slate-200 capitalize truncate" title={key}>
                {key}
                </h3>
            </div>
            <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
              {entry.text}
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
             <span className="text-[10px] font-medium text-slate-600 uppercase tracking-widest group-hover:text-orange-500/70 transition-colors">Tanım</span>
             <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <User className="h-3 w-3" />
                <span>{entry.author}</span>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};