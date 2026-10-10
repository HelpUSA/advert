'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { useGoogleAuth, SUPERADMIN_EMAIL } from '../lib/useGoogleAuth';
import { Lock, ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';

interface AdminGateProps {
  children: React.ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const { t, language } = useLanguage();
  const { user, isAuthenticated, isLoading, error, login } = useGoogleAuth();

  const isEn = language === 'en';
  const isEs = language === 'es';

  if (isAuthenticated && user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="w-16 h-16 bg-amber-400/10 border border-amber-400/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400 shadow-inner">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> HelpUS Advert
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {t.adminAccess.restrictedTitle}
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            {t.adminAccess.restrictedDesc}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl text-left leading-relaxed">
            {error}
          </div>
        )}

        <div className="space-y-4 pt-2">
          {/* Card de Informação da Conta Autorizada */}
          <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-center space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
              Conta Google Autorizada
            </span>
            <p className="text-xs font-mono font-bold text-white tracking-wide">
              {SUPERADMIN_EMAIL}
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
              Apenas este e-mail possui permissão de SuperAdmin na Mesa de Operações.
            </p>
          </div>

          {/* Único Botão Oficial: Conectar com o Google */}
          <button
            onClick={login}
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-xl shadow-white/5 transition flex items-center justify-center gap-3 cursor-pointer border border-slate-200 group active:scale-[0.99]"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>
              {isLoading
                ? isEn
                  ? 'Connecting to Google...'
                  : isEs
                  ? 'Conectando con Google...'
                  : 'Conectando ao Google...'
                : isEn
                ? 'Sign in with Google'
                : isEs
                ? 'Iniciar sesión con Google'
                : 'Entrar com o Google'}
            </span>
          </button>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <Link
            href="/"
            className="hover:text-amber-400 transition flex items-center gap-1 font-medium"
          >
            {t.adminAccess.backHome}
          </Link>
          <a
            href="https://helpusbr.com/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition flex items-center gap-1 font-medium"
          >
            <span>Hub HelpUS</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
