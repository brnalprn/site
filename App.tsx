import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { ResultCard } from './components/ResultCard';
import { DictionaryGrid } from './components/DictionaryGrid';
import { AddTermForm } from './components/AddTermForm';
import { LoginModal } from './components/LoginModal';
import { searchData as initialData, DictionaryEntry } from './data/dictionary';
import { getLevenshteinDistance } from './utils/stringUtils';
import { Sparkles, Lock, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

// Keys that should be hidden from the public grid but are still searchable (Easter Eggs)
const HIDDEN_KEYS = ["bizde bir birdir"];
const STORAGE_KEY = 'portaSearch_dictionary';
const HISTORY_KEY = 'portaSearch_history';
const USER_KEY = 'portaSearch_user';

interface UserSession {
  username: string;
  role: 'admin' | 'user';
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // -- Data State --
  const [dictionary, setDictionary] = useState<Record<string, DictionaryEntry>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migration: If values are strings, convert to objects
        const migrated: Record<string, DictionaryEntry> = {};
        Object.keys(parsed).forEach(key => {
            const val = parsed[key];
            if (typeof val === 'string') {
                migrated[key] = { text: val, author: 'admin' };
            } else {
                migrated[key] = val;
            }
        });
        return migrated;
      }
      return initialData;
    } catch (e) {
      console.error("Failed to load dictionary from storage", e);
      return initialData;
    }
  });

  // -- History State --
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // -- User/Login State --
  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // -- Logic: Search Result --
  const result = useMemo(() => {
    const trimmedTerm = searchTerm.trim().toLowerCase();
    if (!trimmedTerm) return null;
    return dictionary[trimmedTerm] || null;
  }, [searchTerm, dictionary]);

  // -- Confetti Easter Egg Effect --
  useEffect(() => {
    if (result && searchTerm.trim().toLowerCase() === "bizde bir birdir") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#ffffff', '#000000'],
        disableForReducedMotion: true
      });
    }
  }, [result, searchTerm]);

  // -- Logic: Visible Dictionary (Filtered & Limited) --
  const visibleDictionary = useMemo(() => {
    const filtered: Record<string, DictionaryEntry> = {};
    
    // Get all entries that aren't hidden
    const entries = Object.entries(dictionary)
      .filter(([key]) => !HIDDEN_KEYS.includes(key));
    
    // Show only the LAST 4 added entries
    const recentEntries = entries.reverse().slice(0, 4);

    recentEntries.forEach(([key, value]) => {
      filtered[key] = value;
    });

    return filtered;
  }, [dictionary]);

  // -- Logic: Suggestions --
  const suggestion = useMemo(() => {
    const trimmedTerm = searchTerm.trim().toLowerCase();
    if (!trimmedTerm || result || HIDDEN_KEYS.includes(trimmedTerm)) return null;

    let bestMatch = "";
    let minDistance = Infinity;
    const allVisibleKeys = Object.keys(dictionary).filter(k => !HIDDEN_KEYS.includes(k));

    allVisibleKeys.forEach((key) => {
      const distance = getLevenshteinDistance(trimmedTerm, key);
      if (distance < minDistance) {
        minDistance = distance;
        bestMatch = key;
      }
    });

    const maxEdits = trimmedTerm.length <= 4 ? 1 : 3;
    if (bestMatch && minDistance <= maxEdits) return bestMatch;
    return null;
  }, [searchTerm, result, dictionary]);


  // -- Handlers --

  const handleSearchSubmit = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    // Update History
    setSearchHistory(prev => {
      const newHistory = [trimmed, ...prev.filter(h => h !== trimmed)].slice(0, 5); // Keep max 5 unique
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  };

  const handleAddTerm = (key: string, value: string) => {
    if (!user) return; // Guard clause

    const newDictionary = {
      ...dictionary,
      [key.toLowerCase()]: { 
          text: value, 
          author: user.username 
      }
    };
    setDictionary(newDictionary);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newDictionary));
    } catch (e) { console.error(e); }
  };

  const handleLogin = (username: string, pass: string) => {
    let role: 'user' | 'admin' = 'user';
    
    if (username === 'admin' && pass === 'admin123') {
      role = 'admin';
    }

    const newUser: UserSession = { username, role };
    setUser(newUser);
    localStorage.setItem(USER_KEY, JSON.stringify(newUser));
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-200">
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin}
      />

      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        onClear={() => setSearchTerm('')}
        onSearchSubmit={handleSearchSubmit}
        recentSearches={searchHistory}
        onHistorySelect={(t) => { setSearchTerm(t); }}
        onClearHistory={handleClearHistory}
        user={user}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogoutClick={handleLogout}
      />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        
        {/* Search Result & Suggestion */}
        <section className="space-y-4">
          {suggestion && (
            <div className="animate-in fade-in slide-in-from-top-2 ml-1">
              <p className="flex items-center gap-2 text-slate-400">
                <Sparkles className="h-4 w-4 text-orange-500" />
                <span>Bunu mu demek istemiştiniz:</span>
                <button 
                  onClick={() => setSearchTerm(suggestion)}
                  className="font-bold text-orange-400 hover:text-orange-300 hover:underline italic transition-colors"
                >
                  {suggestion}
                </button>
                ?
              </p>
            </div>
          )}
          <ResultCard searchTerm={searchTerm} result={result} />
        </section>

        {/* Dictionary Grid - Last 4 items */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-500 delay-100">
           <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-2">
             <h2 className="text-xl font-semibold text-white">Sözlük İçeriği (Son Eklenenler)</h2>
             <span className="text-sm text-slate-400 bg-slate-900 border border-slate-800 px-2 py-1 rounded-md">
               {Object.keys(visibleDictionary).length} gösteriliyor
             </span>
           </div>
           <DictionaryGrid data={visibleDictionary} />
        </section>

        {/* Add New Term - Only for Logged In Users */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
          <div className="mb-6 border-b border-slate-800 pb-2 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Yeni Veri Ekle</h2>
            {!user && <Lock className="h-4 w-4 text-slate-500" />}
          </div>
          
          {user ? (
            <AddTermForm onAdd={handleAddTerm} />
          ) : (
            <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/50 p-8 text-center">
                <p className="text-slate-400 mb-4">Yeni içerik eklemek için lütfen giriş yapın.</p>
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-sm font-medium text-white hover:bg-slate-700 hover:text-orange-400 transition-colors"
                >
                    Giriş Yap
                </button>
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/50 bg-slate-950/80 py-6 text-center backdrop-blur-sm">
        <p className="flex items-center justify-center gap-1 text-sm text-slate-500">
          Created by 
          <span className="font-semibold text-orange-500 hover:text-orange-400 transition-colors cursor-default">
            brnalprn
          </span>
        </p>
      </footer>
      
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-950 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
    </div>
  );
}