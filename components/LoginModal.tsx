import React, { useState } from 'react';
import { X, Lock, User, UserPlus } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (username: string, pass: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    onLogin(username, password);
    // Reset state after successful login handled by parent
    if (username === 'admin' && password === 'admin123') {
       setUsername('');
       setPassword('');
       setError('');
    } else {
        // Simple client side logic for 'other' users
         setUsername('');
         setPassword('');
         setError('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-2xl shadow-orange-500/10">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-slate-500 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
        
        {/* Tabs */}
        <div className="flex border-b border-slate-800">
            <button 
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'login' ? 'bg-slate-900 text-orange-500 border-b-2 border-orange-500' : 'bg-slate-950 text-slate-400 hover:text-slate-200'}`}
            >
                Giriş Yap
            </button>
            <button 
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'register' ? 'bg-slate-900 text-orange-500 border-b-2 border-orange-500' : 'bg-slate-950 text-slate-400 hover:text-slate-200'}`}
            >
                Kullanıcı Ekle
            </button>
        </div>

        <div className="p-6">
            {activeTab === 'login' ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-400">Kullanıcı Adı</label>
                    <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="Kullanıcı adınızı girin"
                    />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-400">Şifre</label>
                    <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        placeholder="••••••"
                    />
                    </div>
                </div>

                {error && <p className="text-xs text-red-500">{error}</p>}

                <button 
                    type="submit"
                    className="w-full rounded-lg bg-orange-600 py-2 text-sm font-semibold text-white hover:bg-orange-500 transition-colors shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                >
                    Giriş Yap
                </button>
                </form>
            ) : (
                <div className="flex flex-col items-center justify-center py-4 text-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-slate-900 flex items-center justify-center mb-2">
                        <UserPlus className="h-8 w-8 text-slate-600" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Yakında...</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Kayıt sistemi şu an bakım aşamasındadır.
                    </p>
                    <div className="mt-4 rounded-lg bg-orange-500/10 border border-orange-500/20 p-4">
                        <p className="text-xs text-orange-300">
                           O zamana kadar <span className="font-bold text-white">admin</span> kullanıcı adı ve <span className="font-bold text-white">admin123</span> şifresi ile giriş yapabilirsiniz.
                        </p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};