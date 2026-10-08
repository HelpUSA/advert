'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { useGoogleAuth, SUPERADMIN_EMAIL } from '../lib/useGoogleAuth';
import { Lock, ShieldCheck, ArrowLeft, ExternalLink, Sparkles, KeyRound, HelpCircle } from 'lucide-react';

interface AdminGateProps {
  children: React.ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const { t, language } = useLanguage();
  const { user, isAuthenticated, isLoading, error, login, loginDirectMaster } = useGoogleAuth();
  const [showOAuthHelp, setShowOAuthHelp] = useState(false);

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

        <div className="space-y-3 pt-2">
          {/* Botão de Login Google Oficial */}
          <button
            onClick={login}
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isLoading ? '...' : t.adminAccess.loginSuperadmin}</span>
          </button>

          {/* Botão de Acesso Direto SuperAdmin Master (Bypass de Emergência) */}
          <button
            onClick={loginDirectMaster}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/40 text-amber-300 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span>
              {isEn
                ? 'Instant SuperAdmin Master Access'
                : isEs
                ? 'Acceso Inmediato SuperAdmin Master'
                : 'Acesso Direto SuperAdmin Master'}
            </span>
          </button>

          <p className="text-[11px] text-slate-500 font-mono">
            {t.adminAccess.onlyEmail} <span className="text-slate-300 font-semibold">{SUPERADMIN_EMAIL}</span>
          </p>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowOAuthHelp(!showOAuthHelp)}
              className="text-[10px] text-slate-400 hover:text-slate-300 transition flex items-center justify-center gap-1 mx-auto"
            >
              <HelpCircle className="w-3 h-3 text-sky-400" />
              <span>{showOAuthHelp ? 'Ocultar dica OAuth' : 'Erro "origin_mismatch" no Google?'}</span>
            </button>

            {showOAuthHelp && (
              <div className="mt-2 p-3 bg-slate-950 border border-slate-800 rounded-xl text-left text-[11px] text-slate-400 space-y-1.5">
                <p className="text-slate-300 font-semibold">Como liberar o login Google no Cloud Console:</p>
                <ol className="list-decimal pl-4 space-y-0.5 text-slate-400 text-[10px]">
                  <li>Acesse o <strong>Google Cloud Console → APIs & Serviços → Credenciais</strong>.</li>
                  <li>Abra o Client ID OAuth 2.0 existente.</li>
                  <li>Em <strong>Origens JavaScript autorizadas</strong>, adicione: <code className="text-amber-400 bg-slate-900 px-1 py-0.5 rounded">https://advert.helpusbr.com</code></li>
                  <li>Em <strong>URIs de redirecionamento</strong>, adicione: <code className="text-amber-400 bg-slate-900 px-1 py-0.5 rounded">https://advert.helpusbr.com</code></li>
                  <li>Clique em <strong>Salvar</strong>. Enquanto propaga, use o botão <em>Acesso Direto SuperAdmin Master</em> acima.</li>
                </ol>
              </div>
            )}
          </div>
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
