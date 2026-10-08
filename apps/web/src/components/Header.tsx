'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../lib/LanguageContext';
import { useGoogleAuth } from '../lib/useGoogleAuth';
import { WHATSAPP_NUMBER } from '../lib/i18n';
import {
  Globe,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  LogOut,
  Sparkles,
  MessageCircle,
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useGoogleAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Links para o visitante público
  const publicNavItems = [
    { href: '/', label: t.nav.home },
    { href: '/#servicos', label: t.nav.services },
    { href: '/#cases', label: t.nav.cases },
    { href: '/#comparativo', label: t.nav.features },
  ];

  // Links para o SuperAdmin autenticado
  const adminNavItems = [
    { href: '/', label: t.nav.home },
    { href: '/brands', label: t.nav.brands },
    { href: '/campaigns', label: t.nav.campaigns },
    { href: '/calendar', label: t.nav.calendar },
    { href: '/drafts', label: t.nav.drafts },
    { href: '/approvals', label: t.nav.approvals },
    { href: '/workflow', label: t.nav.workflow },
    { href: '/reports', label: t.nav.reports },
  ];

  const currentNavItems = isAuthenticated ? adminNavItems : publicNavItems;

  const languages = [
    { code: 'pt', label: 'Português (BR)', flag: '🇧🇷' },
    { code: 'en', label: 'English (US)', flag: '🇺🇸' },
    { code: 'es', label: 'Español (ES)', flag: '🇪🇸' },
  ];

  const whatsappMsg =
    language === 'en'
      ? 'Hello! I would like to request a commercial proposal for HelpUS Advert services.'
      : language === 'es'
      ? 'Hola, me gustaría solicitar una propuesta comercial para los servicios de HelpUS Advert.'
      : 'Olá! Gostaria de solicitar uma proposta comercial para os serviços de publicidade HelpUS Advert.';

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Marca HelpUS Advert com Logo Oficial */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <img
            src="/img/helpus-logo.png"
            alt="HelpUS Logo Oficial"
            className="w-10 h-10 object-contain rounded-full border border-blue-400/40 shadow-sm transition group-hover:scale-105"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white">
                Help<span className="text-blue-500">US</span>
              </span>
              <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black text-xs tracking-wider">
                ADVERT
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
              {t.brandTagline}
            </span>
          </div>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {currentNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? 'bg-slate-800 text-amber-400 border border-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Controles da Direita */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Seletor de Idioma */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition"
              title="Mudar idioma / Change language"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span className="uppercase text-[11px] font-bold">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code as any);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition ${
                      language === l.code
                        ? 'bg-slate-800 text-amber-400 font-bold'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span>{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botão Comercial WhatsApp para Visitantes */}
          {!isAuthenticated && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          )}

          {/* Se SuperAdmin Autenticado: Menu do Usuário */}
          {isAuthenticated && user && (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-xs transition"
              >
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover border border-emerald-400"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                    SA
                  </div>
                )}
                <span className="hidden sm:inline font-semibold text-emerald-400 text-xs">
                  {t.auth.connectedAs}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 space-y-2">
                  <div className="pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">SuperAdmin HelpUS</span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/brands"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-400 transition"
                  >
                    <span>Mesa de Operações</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </Link>

                  <a
                    href="https://helpusbr.com/admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-xs font-semibold text-sky-400 transition"
                  >
                    <span>{t.nav.backToHub}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition"
                  >
                    <span>{t.auth.logout}</span>
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Atalho Hub Central */}
          <a
            href="https://helpusbr.com/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition"
            title="Ir para a Central Administrativa HelpUS"
          >
            <span>Hub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {/* Botão Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Drawer Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-4 space-y-2">
          {currentNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                pathname === item.href
                  ? 'bg-slate-800 text-amber-400 font-bold border border-slate-700'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </a>
            <a
              href="https://helpusbr.com/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-sky-400 bg-slate-900"
            >
              <span>{t.nav.backToHub}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
