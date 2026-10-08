'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { Cookie, Shield, Check } from 'lucide-react';

export default function CookieConsent() {
  const { t } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('helpus_cookie_consent');
      if (!consent) {
        setShowBanner(true);
      }
    } catch {
      // Ignora erro
    }

    const handleOpenCookies = () => setShowBanner(true);
    window.addEventListener('openCookieModal', handleOpenCookies);
    return () => window.removeEventListener('openCookieModal', handleOpenCookies);
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('helpus_cookie_consent', 'accepted');
    } catch {
      // Ignora
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md border border-slate-800 p-5 rounded-2xl shadow-2xl space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-white text-sm">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Privacidade & LGPD</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              {t.cookies.message}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <button
            onClick={handleAccept}
            className="flex-1 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{t.cookies.accept}</span>
          </button>
          <button
            onClick={handleAccept}
            className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition"
          >
            {t.cookies.settings}
          </button>
        </div>
      </div>
    </div>
  );
}
