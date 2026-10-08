'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../lib/LanguageContext';
import { useGoogleAuth } from '../lib/useGoogleAuth';
import {
  Globe,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  User,
  LogOut,
  Sparkles,
  Lock,
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, isLoading, login, logout } = useGoogleAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Links para o visitante público
  const publicNavItems = [
    { href: '/', label: t.nav.home },
    { href: '/#servicos', label: t.nav.services },
    { href: '/#video', label: 'Vídeo' },
    { href: '/#cases', label: t.nav.cases },
    { href: '/#comparativo', label: t.nav.features },
    { href: '/#contato', label: t.nav.contact },
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

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Marca HelpUS Advert Oficial */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group focus:outline-none">
            <span className="bg-amber-400 text-slate-950 px-2.5 py-1 rounded-md shadow-sm font-black text-sm tracking-wide transition group-hover:bg-amber-300">
              HELPUS
            </span>
            <span className="text-amber-400 font-extrabold text-lg tracking-tight group-hover:text-amber-300 transition">
              {t.brandName}
            </span>
          </Link>
          <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-sky-400" /> IA Watcher
          </span>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden xl:flex items-center gap-1">
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
        <div className="flex items-center gap-3">
          {/* Seletor de Idioma */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition"
              title="Mudar idioma / Change language"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span className="uppercase text-[11px]">{language}</span>
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

          {/* Autenticação Google / SuperAdmin */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-xs transition shadow-sm"
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
          ) : (
            <button
              onClick={login}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md transition cursor-pointer"
              title={t.auth.superadminOnly}
            >
              <Lock className="w-3.5 h-3.5 text-blue-200" />
              <span>{isLoading ? '...' : t.publicLanding.ctaAdmin}</span>
            </button>
          )}

          {/* Atalho Hub Central */}
          <a
            href="https://helpusbr.com/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition"
            title="Acessar o Painel Central HelpUS"
          >
            <span>Hub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {/* Botão Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Drawer Mobile */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-6 py-4 space-y-2">
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
            {!isAuthenticated && (
              <button
                onClick={() => {
                  login();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold text-center"
              >
                {t.publicLanding.ctaAdmin}
              </button>
            )}
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
