import React, { useState } from 'react';
import { Plus, Save } from 'lucide-react';

interface AddTermFormProps {
  onAdd: (key: string, value: string) => void;
}

export const AddTermForm: React.FC<AddTermFormProps> = ({ onAdd }) => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim() && value.trim()) {
      onAdd(key.trim(), value.trim());
      setKey('');
      setValue('');
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-lg shadow-black/20">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-700 py-8 text-slate-500 hover:border-orange-500 hover:text-orange-500 hover:bg-slate-800/50 transition-all duration-300"
        >
          <Plus className="h-6 w-6" />
          <span className="font-medium">Yeni Kayıt Ekle</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="term" className="text-sm font-medium text-slate-300">
                Anahtar Kelime (Başlık)
              </label>
              <input
                id="term"
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Örn: Yapay Zeka"
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="desc" className="text-sm font-medium text-slate-300">
                Açıklama
              </label>
              <input
                id="desc"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Örn: İnsan zekasını taklit eden sistemler..."
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-colors"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-colors shadow-[0_0_15px_rgba(234,88,12,0.3)]"
            >
              <Save className="h-4 w-4" />
              Kaydet
            </button>
          </div>
        </form>
      )}
    </div>
  );
};