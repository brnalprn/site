import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ResultCard } from './components/ResultCard';
import { searchData } from './data/dictionary';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate the result automatically whenever searchTerm changes
  const result = useMemo(() => {
    const trimmedTerm = searchTerm.trim().toLowerCase();
    if (!trimmedTerm) return null;
    return searchData[trimmedTerm] || null;
  }, [searchTerm]);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header with Search Input */}
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
        onClear={handleClear}
      />

      {/* Main Content Area */}
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <ResultCard searchTerm={searchTerm} result={result} />
      </main>
      
      {/* Subtle Background decoration */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none"></div>
    </div>
  );
}