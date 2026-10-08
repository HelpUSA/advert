'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { useGoogleAuth, SUPERADMIN_EMAIL } from '../lib/useGoogleAuth';
import { Lock, ShieldCheck, ArrowLeft, ExternalLink, Sparkles } from 'lucide-react';

interface AdminGateProps {
  children: React.ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const { t } = useLanguage();
  const { user, isAuthenticated, isLoading, error, login } = useGoogleAuth();

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
          <button
            onClick={login}
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isLoading ? '...' : t.adminAccess.loginSuperadmin}</span>
          </button>

          <p className="text-[11px] text-slate-500 font-mono">
            {t.adminAccess.onlyEmail} <span className="text-slate-300 font-semibold">{SUPERADMIN_EMAIL}</span>
          </p>
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
