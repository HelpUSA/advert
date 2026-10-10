'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useGoogleAuth } from '../../lib/useGoogleAuth';
import { ShieldCheck, Sparkles, ArrowRight, LayoutDashboard } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useGoogleAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Pequeno timeout para permitir visualização ou redirecionamento suave
      const timer = setTimeout(() => {
        router.push('/brands');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, router]);

  return (
    <AdminGate>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Sessão Ativa
            </span>
            <h1 className="text-2xl font-black text-white">SuperAdmin Conectado!</h1>
            <p className="text-xs text-slate-300">
              Bem-vindo, <strong className="text-white">{user?.name}</strong> ({user?.email}).
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/brands"
              className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/20 transition flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Acessar Mesa de Operações</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </AdminGate>
  );
}
