'use client';

import React from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { WHATSAPP_NUMBER } from '../lib/i18n';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsapp() {
  const { language } = useLanguage();

  const msg =
    language === 'en'
      ? 'Hello! I would like to learn more about HelpUS Advert solutions.'
      : language === 'es'
      ? 'Hola, me gustaría saber más sobre las soluciones de HelpUS Advert.'
      : 'Olá! Gostaria de saber mais sobre os serviços de publicidade HelpUS Advert.';

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  return (
    <aside aria-label="WhatsApp Floating Action" className="fixed bottom-6 right-6 z-40">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 transition-all duration-300 hover:scale-110 group focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
        title="Falar no WhatsApp HelpUS"
      >
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500 group-hover:scale-110 transition" />
        <span className="sr-only">WhatsApp HelpUS</span>
      </a>
    </aside>
  );
}
