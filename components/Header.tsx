import React from 'react';
import { Search, X, LogIn, LogOut } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onClear: () => void;
  onSearchSubmit: () => void;
  recentSearches: string[];
  onHistorySelect: (term: string) => void;
  onClearHistory: () => void;
  user: { username: string; role: string } | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  searchTerm, 
  onSearchChange, 
  onClear,
  onSearchSubmit,
  user,
  onLoginClick,
  onLogoutClick
}) => {
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-8 gap-4">
        
        {/* Left: Logo & Text */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative flex h-10 w-10 items-center justify-center shrink-0">
            {/* Custom Orange with Sunglasses Logo */}
            <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]">
              <circle cx="50" cy="50" r="45" fill="#f97316" />
              <circle cx="70" cy="30" r="10" fill="#fb923c" fillOpacity="0.6" />
              <path d="M50 5 Q50 -10 70 5 Q50 5 50 5" fill="#22c55e" />
              <path d="M20 45 H45 V55 A10 10 0 0 1 20 55 Z" fill="#1e293b" />
              <path d="M55 45 H80 V55 A10 10 0 0 1 55 55 Z" fill="#1e293b" />
              <rect x="45" y="48" width="10" height="3" fill="#1e293b" />
            </svg>
          </div>
          <span className="hidden sm:block text-2xl font-bold tracking-tight text-white">
            porta<span className="text-orange-500">Search</span>
          </span>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl px-2 sm:px-6">
          <div className="relative w-full group">
            <div className="absolute inset-y-0 left-1.5 flex items-center pointer-events-none z-10">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 group-focus-within:bg-orange-500/20 transition-colors">
                 <Search className="h-4 w-4 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ara..."
              className="block w-full rounded-full border border-slate-700 bg-slate-900 py-3 pl-12 pr-10 text-sm text-slate-100 placeholder:text-slate-500 focus:border-orange-500 focus:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all duration-200 shadow-lg shadow-black/20"
              autoComplete="off"
            />
            {searchTerm && (
              <button
                onClick={onClear}
                className="absolute inset-y-0 right-2 flex items-center pr-2"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-slate-800 transition-colors">
                    <X className="h-3.5 w-3.5 text-slate-500 hover:text-slate-300" />
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Right: Login/User Area */}
        <div className="flex shrink-0 items-center justify-end">
           {user ? (
             <div className="flex items-center gap-3">
                <div className="flex flex-col items-end hidden md:flex">
                  <span className="text-sm font-medium text-white">{user.username}</span>
                  <span className="text-[10px] uppercase tracking-wide text-orange-500 font-bold">{user.role}</span>
                </div>
                <button 
                  onClick={onLogoutClick}
                  className="rounded-full bg-slate-800 p-2 text-slate-400 hover:bg-red-900/20 hover:text-red-500 transition-colors border border-slate-700"
                  title="Çıkış Yap"
                >
                  <LogOut className="h-4 w-4" />
                </button>
             </div>
           ) : (
             <button
                onClick={onLoginClick}
                className="flex items-center gap-2 rounded-full bg-slate-900 border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white hover:border-orange-500/50 transition-all shadow-sm"
             >
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Giriş Yap</span>
             </button>
           )}
        </div>

      </div>
    </header>
  );
};