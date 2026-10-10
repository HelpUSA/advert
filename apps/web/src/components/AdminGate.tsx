'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { useGoogleAuth } from '../lib/useGoogleAuth';
import { ArrowLeft, ExternalLink } from 'lucide-react';

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

        {/* Logo Oficial HelpUS Padrão */}
        <div className="text-center space-y-2">
          <div className="relative w-12 h-12 mx-auto rounded-full border-2 border-amber-400 overflow-hidden shadow-lg shadow-amber-400/20">
            <img
              src="/img/helpus-logo.png"
              alt="HelpUS Logo"
              className="w-full h-full object-contain bg-slate-950"
            />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Login HelpUS</h2>
          <p className="text-xs text-slate-400">
            {isEn
              ? 'Restricted access to the operations cockpit'
              : isEs
              ? 'Acceso restringido al panel de operaciones'
              : 'Acesso restrito ao painel e mesa de operações'}
          </p>
        </div>

        {/* Mensagem de Erro (Sem vazar dados de configuração interna) */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl text-center leading-relaxed">
            {error}
          </div>
        )}

        {/* Botão Oficial Padronizado: Entrar com o Google */}
        <div className="space-y-4 pt-2">
          <button
            type="button"
            onClick={login}
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs shadow-xl shadow-white/5 transition flex items-center justify-center gap-3 cursor-pointer border border-slate-200 group active:scale-[0.99] disabled:opacity-60"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-4 w-4 text-slate-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
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
            )}
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

        {/* Rodapé da Tela de Login */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <Link
            href="/"
            className="hover:text-amber-400 transition flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.adminAccess.backHome}</span>
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
