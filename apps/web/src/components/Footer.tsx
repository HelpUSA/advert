'use client';

import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { WHATSAPP_NUMBER } from '../lib/i18n';
import { Cookie, ShieldAlert, ArrowUpRight, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { language, t } = useLanguage();

  const handleOpenCookieModal = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('openCookieModal'));
    }
  };

  const whatsappMsg =
    language === 'en'
      ? 'Hello! I would like to speak with a HelpUS representative about advertising solutions.'
      : language === 'es'
      ? 'Hola, me gustaría hablar con un representante de HelpUS sobre soluciones de publicidad.'
      : 'Olá! Gostaria de conversar com um especialista da HelpUS sobre publicidade.';

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-center text-xs text-slate-400 mt-20">
      <div className="max-w-6xl mx-auto px-4 space-y-5">
        {/* Logo HelpUS Oficial no Footer */}
        <div className="flex items-center justify-center gap-3">
          <img
            src="/img/helpus-logo.png"
            alt="HelpUS Logo"
            className="w-10 h-10 object-contain rounded-full border border-blue-400/40 shadow-sm"
          />
          <div className="text-left">
            <span className="font-extrabold text-sm text-white block">
              Help<span className="text-blue-500">US</span> Advert
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              {t.footer.company}
            </span>
          </div>
        </div>

        {/* Canais Oficiais de Contato */}
        <p className="leading-relaxed text-slate-400 flex flex-wrap items-center justify-center gap-y-1">
          <span>{t.footer.email} </span>
          <a
            href="mailto:helpus.ecommerce@gmail.com"
            className="text-amber-400 hover:text-amber-300 underline font-mono ml-1 mr-2"
          >
            helpus.ecommerce@gmail.com
          </a>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="ml-2">{t.footer.whatsapp} </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 underline font-mono ml-1 mr-2 inline-flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" /> +55 (83) 99872-1848
          </a>
          <span className="text-slate-700 hidden sm:inline">|</span>
          <span className="ml-2">{t.footer.portal} </span>
          <a
            href="https://helpusbr.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 hover:text-sky-300 underline ml-1 inline-flex items-center gap-0.5"
          >
            helpusbr.com <ArrowUpRight className="w-3 h-3" />
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
          <span className="text-slate-700">•</span>
          <a
            href="https://helpusbr.com/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition flex items-center gap-1.5"
          >
            <span>Central HelpUS Hub</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <p className="text-[11px] text-slate-500 font-sans pt-2 border-t border-slate-900/80 max-w-sm mx-auto">
          {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
