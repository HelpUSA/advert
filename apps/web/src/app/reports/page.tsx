'use client';

import React from 'react';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useLanguage } from '../../lib/LanguageContext';
import { BarChart3, ArrowLeft, TrendingUp, AlertTriangle, CheckCircle2, FileSpreadsheet } from 'lucide-react';

const reports = [
  {
    id: 'rep-1',
    name: 'Consolidado Operacional Advert • Q4 2026',
    brand: 'Advert HelpUS BR',
    period: 'Outubro de 2026',
    status: 'Concluído',
    wins: 'Mesa de operações própria implementada, eliminando custos com intermediários e agências terceiras.',
    issues: 'Refinar conectores diretos de API social para publicação 1-clique.',
    next: 'Expandir esteira de criativos automáticos com IA Watcher.',
  },
  {
    id: 'rep-2',
    name: 'Relatório de Posicionamento e Autoridade HelpUS',
    brand: 'HelpUS BR',
    period: 'Semana 41 / 2026',
    status: 'Em Análise',
    wins: 'Aumento na taxa de conversão orgânica via portal helpusbr.com e engajamento no LinkedIn.',
    issues: 'Manter cadência constante de 3 postagens estratégicas semanais.',
    next: 'Publicar carrossel técnico da suíte corporativa.',
  },
  {
    id: 'rep-3',
    name: 'Auditoria de Cibersegurança & Métricas CVSS',
    brand: 'HelpUS CVSS',
    period: 'Setembro / Outubro 2026',
    status: 'Concluído',
    wins: 'Alta adesão à calculadora FIRST CVSS v4.0 e reconhecimento da IA Watcher científica.',
    issues: 'Necessidade de mais estudos de caso públicos de mitigação reversa.',
    next: 'Divulgar novo artigo de benchmark v3.1 vs v4.0.',
  },
];

export default function ReportsPage() {
  const { t } = useLanguage();

  return (
    <AdminGate>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> {t.modules.backToLanding}
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-rose-400/10 text-rose-400 border border-rose-400/20">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t.nav.reports}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Consolidação de resultados, vitórias, gargalos e próximos passos estratégicos
                </p>
              </div>
            </div>
          </div>

          <button className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4" /> Exportar Dados
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <article
              key={report.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between space-y-5 shadow-lg transition"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-300 border border-slate-700">
                    {report.brand}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 font-mono">
                    {report.period}
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-white tracking-tight leading-snug">
                    {report.name}
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mt-1">
                    <CheckCircle2 className="w-3 h-3" /> {report.status}
                  </span>
                </div>

                <div className="space-y-2 pt-2 text-xs border-t border-slate-800/80">
                  <div className="p-2.5 bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
                    <span className="font-bold text-emerald-400 block flex items-center gap-1 mb-0.5">
                      <TrendingUp className="w-3.5 h-3.5" /> Conquistas & Vitórias:
                    </span>
                    <span className="text-slate-300 text-[11px] leading-relaxed block">
                      {report.wins}
                    </span>
                  </div>

                  <div className="p-2.5 bg-amber-950/20 border border-amber-500/20 rounded-xl">
                    <span className="font-bold text-amber-400 block flex items-center gap-1 mb-0.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Pontos de Atenção:
                    </span>
                    <span className="text-slate-300 text-[11px] leading-relaxed block">
                      {report.issues}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 bg-slate-950/40 p-3 rounded-xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Próxima Ação Recomendada:
                </span>
                <p className="text-xs text-slate-300 leading-snug">{report.next}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </AdminGate>
  );
}
