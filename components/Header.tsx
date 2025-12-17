import React from 'react';
import { Search, X } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClear: () => void;
}

export const Header: React.FC<HeaderProps> = ({ searchTerm, onSearchChange, onClear }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Area */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm">
            <Search className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Ara</span>
        </div>

        {/* Search Bar Container - Centered and responsive */}
        <div className="flex flex-1 items-center justify-center px-4 md:px-12">
          <div className="relative w-full max-w-md group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-200" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buraya yazın..."
              className="block w-full rounded-full border border-slate-200 bg-slate-100 py-2 pl-10 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shadow-sm"
              autoComplete="off"
              autoFocus
            />
            {searchTerm && (
              <button
                onClick={onClear}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <X className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer" />
              </button>
            )}
          </div>
        </div>

        {/* Placeholder for right side actions (Profile, etc) - optional */}
        <div className="hidden sm:flex w-8 h-8 rounded-full bg-slate-200 items-center justify-center text-xs font-medium text-slate-600">
           U
        </div>

      </div>
    </header>
  );
};