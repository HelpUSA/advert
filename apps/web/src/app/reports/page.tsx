'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useLanguage } from '../../lib/LanguageContext';
import {
  BarChart3,
  ArrowLeft,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  Calendar,
  DollarSign,
  Users,
} from 'lucide-react';

const periodData = {
  '7d': {
    label: 'Últimos 7 dias',
    reach: '84.200',
    spend: 'R$ 3.800',
    leads: '340',
    cpl: 'R$ 11,17',
    roi: '+265%',
  },
  '30d': {
    label: 'Últimos 30 dias',
    reach: '342.800',
    spend: 'R$ 14.500',
    leads: '1.420',
    cpl: 'R$ 10,21',
    roi: '+214%',
  },
  '90d': {
    label: 'Trimestre Q4 2026',
    reach: '980.500',
    spend: 'R$ 42.000',
    leads: '4.150',
    cpl: 'R$ 10,12',
    roi: '+238%',
  },
  '2026': {
    label: 'Ano Completo 2026',
    reach: '2.450.000',
    spend: 'R$ 115.000',
    leads: '11.800',
    cpl: 'R$ 9,74',
    roi: '+252%',
  },
};

const initialReports = [
  {
    id: 'rep-1',
    name: 'Consolidado Operacional Advert • Q4 2026',
    brand: 'Advert HelpUS BR',
    period: 'Outubro de 2026',
    status: 'Concluído',
    wins: 'Mesa de operações própria implementada, eliminando custos com intermediários e agências terceiras.',
    issues: 'Refinar conectores diretos de API social para publicação 1-clique.',
    next: 'Expandir esteira de criativos automáticos com IA de Publicidade HelpUS.',
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
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '2026'>('30d');
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const currentMetrics = periodData[selectedPeriod];

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Período,Alcance Total,Investimento em Mídia,Leads Gerados,Custo por Lead,ROI\n' +
      `${currentMetrics.label},"${currentMetrics.reach}","${currentMetrics.spend}","${currentMetrics.leads}","${currentMetrics.cpl}","${currentMetrics.roi}"\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `relatorio_executivo_helpus_${selectedPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySummary = () => {
    const text = `📊 RELATÓRIO EXECUTIVO HELPUS ADVERT\nPeríodo: ${currentMetrics.label}\nAlcance Total: ${currentMetrics.reach}\nInvestimento: ${currentMetrics.spend}\nLeads Qualificados: ${currentMetrics.leads}\nCusto por Lead: ${currentMetrics.cpl}\nROI Médio: ${currentMetrics.roi}\nEmitido por: SuperAdmin HelpUS LLC`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <AdminGate>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
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
                  Consolidação executiva de ROI, métricas de mídia e aprendizados
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopySummary}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado!' : 'Copiar Resumo'}</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Exportar CSV
            </button>
          </div>
        </div>

        {/* SELETOR DE PERÍODO & MÉTRICAS CONSOLIDADAS */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Painel Consolidado de Negócio
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                Indicadores de Performance ({currentMetrics.label})
              </h2>
            </div>

            <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
              {(['7d', '30d', '90d', '2026'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                    selectedPeriod === p
                      ? 'bg-rose-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {p === '7d' ? '7 Dias' : p === '30d' ? '30 Dias' : p === '90d' ? 'Trimestre' : 'Ano 2026'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Alcance Total</span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono block">
                {currentMetrics.reach}
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> Verificado
              </span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Investimento Mídia</span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono block">
                {currentMetrics.spend}
              </span>
              <span className="text-[10px] text-slate-500">Meta + Google</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Leads Gerados</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono block">
                {currentMetrics.leads}
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">Qualificados</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Custo Médio / Lead</span>
              <span className="text-xl sm:text-2xl font-black text-sky-400 font-mono block">
                {currentMetrics.cpl}
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">-42% vs mercado</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1 col-span-2 md:col-span-1">
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Retorno (ROI)</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono block">
                {currentMetrics.roi}
              </span>
              <span className="text-[10px] text-slate-500">Retorno auditado</span>
            </div>
          </div>
        </section>

        {/* LISTAGEM DE RELATÓRIOS REGISTRADOS */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Relatórios & Auditorias em Arquivo</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialReports.map((rep) => (
              <article
                key={rep.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between space-y-5 shadow-lg transition"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-rose-400 border border-slate-700">
                      {rep.brand}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> {rep.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{rep.name}</h3>
                    <span className="text-[11px] text-slate-400 block mt-1">{rep.period}</span>
                  </div>

                  <div className="space-y-2.5 pt-2 text-xs border-t border-slate-800/80">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ganhos & Resultados:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{rep.wins}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <span className="font-bold text-amber-400 flex items-center gap-1.5 text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5" /> Pontos de Atenção:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{rep.issues}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
                  Próxima Ação: {rep.next}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </AdminGate>
  );
}
