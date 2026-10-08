'use client';

import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { Cookie, ShieldAlert, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  const handleOpenCookieModal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('openCookieModal'));
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-10 text-center text-xs text-slate-400 mt-20">
      <div className="max-w-6xl mx-auto px-4 space-y-4">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-300">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          <span>{t.footer.company}</span>
        </div>

        <p className="leading-relaxed text-slate-400">
          <span>{t.footer.email} </span>
          <a
            href="mailto:helpus.ecommerce@gmail.com"
            className="text-amber-400 hover:text-amber-300 underline font-mono ml-1"
          >
            helpus.ecommerce@gmail.com
          </a>
          <span className="mx-2 text-slate-600">|</span>
          <span>{t.footer.portal} </span>
          <a
            href="https://helpusbr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 underline ml-1 inline-flex items-center gap-0.5"
          >
            helpusbr.com <ArrowUpRight className="w-3 h-3" />
          </a>
          <span className="mx-2 text-slate-600">|</span>
          <span>{t.footer.instagram} </span>
          <a
            href="https://www.instagram.com/helpus.ecommerce"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 underline ml-1"
          >
            @helpus.ecommerce
          </a>
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-slate-400">
          <button
            onClick={handleOpenCookieModal}
            className="hover:text-amber-400 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Cookie className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.cookies.settings}</span>
          </button>
          <span className="text-slate-700">•</span>
          <a
            href="https://helpusbr.com/sobre"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-200 transition flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-sky-400" />
            <span>{t.cookies.policy}</span>
          </a>
        </div>

        <p className="text-[11px] text-slate-400 font-sans pt-2 border-t border-slate-900/60 max-w-sm mx-auto">
          {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
