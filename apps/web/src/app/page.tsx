'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import {
  Sparkles,
  Building2,
  Megaphone,
  CalendarDays,
  FileText,
  CheckCircle2,
  GitBranch,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
} from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();

  const modules = [
    {
      href: '/brands',
      title: t.nav.brands,
      count: '3 marcas',
      description: 'Registro central de empresas, soluções SaaS e perfis de autoridade operados pela HelpUS.',
      icon: Building2,
      accent: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      badge: 'Ativo',
    },
    {
      href: '/campaigns',
      title: t.nav.campaigns,
      count: '4 campanhas',
      description: 'Campanhas estratégicas com definição de público-alvo, canais de distribuição e metas de alcance.',
      icon: Megaphone,
      accent: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
      badge: 'Em Execução',
    },
    {
      href: '/calendar',
      title: t.nav.calendar,
      count: '8 publicações',
      description: 'Cronograma editorial unificado para posts, anúncios, newsletters e lançamentos.',
      icon: CalendarDays,
      accent: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
      badge: 'Semanal',
    },
    {
      href: '/drafts',
      title: t.nav.drafts,
      count: '5 rascunhos',
      description: 'Repositório de criativos, copies persuasivas, scripts de vídeo e carrosséis com IA.',
      icon: FileText,
      accent: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
      badge: 'Criação',
    },
    {
      href: '/approvals',
      title: t.nav.approvals,
      count: '2 pendentes',
      description: 'Fila de revisão e validação executiva de peças publicitárias antes do envio para veiculação.',
      icon: CheckCircle2,
      accent: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
      badge: 'SuperAdmin',
    },
    {
      href: '/workflow',
      title: t.nav.workflow,
      count: 'Watcher IA',
      description: 'Esteira de automação de publicidade orientada a eventos e monitoramento de canais próprios.',
      icon: GitBranch,
      accent: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      badge: 'Automático',
    },
    {
      href: '/reports',
      title: t.nav.reports,
      count: 'ROI & Dados',
      description: 'Relatórios analíticos consolidados de conversão, engajamento e performance de mídia.',
      icon: BarChart3,
      accent: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
      badge: 'Analítico',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Hero Principal */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 -mb-16 w-60 h-60 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.hero.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {t.hero.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Acesso SuperAdmin</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Canais Próprios</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Next.js • Vercel Edge</span>
            </span>
          </div>
        </div>
      </section>

      {/* Métricas do Sistema */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <span className="text-2xl font-black text-amber-400 block">3</span>
          <span className="text-xs font-semibold text-slate-400">{t.hero.metrics.brands}</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <span className="text-2xl font-black text-sky-400 block">4</span>
          <span className="text-xs font-semibold text-slate-400">{t.hero.metrics.campaigns}</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <span className="text-2xl font-black text-orange-400 block">2</span>
          <span className="text-xs font-semibold text-slate-400">{t.hero.metrics.pendingApprovals}</span>
        </div>
        <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
          <span className="text-2xl font-black text-emerald-400 block">8</span>
          <span className="text-xs font-semibold text-slate-400">{t.hero.metrics.scheduledPosts}</span>
        </div>
      </section>

      {/* Grade de Módulos da Plataforma */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Módulos Operacionais de Publicidade
          </h2>
          <span className="text-xs text-slate-400">Total: 7 Módulos</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.href}
                href={mod.href}
                className="group bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl transition duration-200 flex flex-col justify-between space-y-4 shadow-lg hover:shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl border ${mod.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {mod.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition flex items-center gap-1.5">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">{mod.count}</span>
                  <span className="text-amber-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition">
                    Acessar <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
