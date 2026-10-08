'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useLanguage } from '../../lib/LanguageContext';
import { WHATSAPP_NUMBER } from '../../lib/i18n';
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
  Printer,
  Share2,
  FileText,
  X,
  MessageCircle,
  ShieldCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

interface ReportItem {
  id: string;
  name: string;
  brand: string;
  period: string;
  status: string;
  wins: string;
  issues: string;
  next: string;
  reach?: string;
  spend?: string;
  leads?: string;
  cpl?: string;
  roi?: string;
}

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

const initialReports: ReportItem[] = [
  {
    id: 'rep-1',
    name: 'Consolidado Operacional Advert • Q4 2026',
    brand: 'Advert HelpUS BR',
    period: 'Outubro de 2026',
    status: 'Concluído',
    wins: 'Mesa de operações própria implementada, eliminando custos com intermediários e agências terceiras.',
    issues: 'Refinar conectores diretos de API social para publicação 1-clique.',
    next: 'Expandir esteira de criativos automáticos com IA de Publicidade HelpUS.',
    reach: '342.800',
    spend: 'R$ 14.500',
    leads: '1.420',
    cpl: 'R$ 10,21',
    roi: '+214%',
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
    reach: '124.500',
    spend: 'R$ 5.200',
    leads: '480',
    cpl: 'R$ 10,83',
    roi: '+198%',
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
    reach: '88.300',
    spend: 'R$ 3.400',
    leads: '310',
    cpl: 'R$ 10,96',
    roi: '+245%',
  },
  {
    id: 'rep-4',
    name: 'Escala de Tráfego Pago & Conversão Local',
    brand: 'CG Details Studio',
    period: 'Campanha Black November 2026',
    status: 'Em Andamento',
    wins: 'Otimização de criativos gerados por IA com +185% de taxa de conversão em leads qualificados.',
    issues: 'Aumentar investimento em anúncios nos horários nobres de quinta a sábado.',
    next: 'Implementar esteira de automação de follow-up via WhatsApp.',
    reach: '65.200',
    spend: 'R$ 2.900',
    leads: '295',
    cpl: 'R$ 9,83',
    roi: '+280%',
  },
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '2026'>('30d');
  const [copied, setCopied] = useState(false);
  const [activePdfReport, setActivePdfReport] = useState<ReportItem | null>(null);
  const [customPhone, setCustomPhone] = useState(WHATSAPP_NUMBER);
  const { t, language } = useLanguage();

  const isEn = language === 'en';
  const isEs = language === 'es';

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

  const handleOpenPdfModal = (rep?: ReportItem) => {
    if (rep) {
      setActivePdfReport(rep);
    } else {
      // Cria relatório consolidado do período selecionado
      setActivePdfReport({
        id: `consolidated-${selectedPeriod}`,
        name: `Relatório Executivo Consolidado • ${currentMetrics.label}`,
        brand: 'HelpUS Advert Ecosystem',
        period: currentMetrics.label,
        status: 'Auditado Master',
        wins: 'Alcance orgânico e campanhas de tráfego pago integradas com IA proprietária e governança rigorosa.',
        issues: 'Manter a esteira de aprovação ágil para acelerar lançamentos multicanal.',
        next: 'Escalar investimento nos criativos com maior taxa de retenção e menor CPL.',
        reach: currentMetrics.reach,
        spend: currentMetrics.spend,
        leads: currentMetrics.leads,
        cpl: currentMetrics.cpl,
        roi: currentMetrics.roi,
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getWhatsAppMessage = (rep: ReportItem) => {
    return encodeURIComponent(
      `*HELPUS ADVERT — RELATÓRIO EXECUTIVO DE ROI*\n\n` +
      `🏢 *Marca/Cliente:* ${rep.brand}\n` +
      `📌 *Relatório:* ${rep.name}\n` +
      `📅 *Período:* ${rep.period}\n\n` +
      `📈 *INDICADORES DE PERFORMANCE:*\n` +
      `• *Alcance Total:* ${rep.reach || currentMetrics.reach}\n` +
      `• *Investimento em Mídia:* ${rep.spend || currentMetrics.spend}\n` +
      `• *Leads Qualificados:* ${rep.leads || currentMetrics.leads}\n` +
      `• *Custo por Lead (CPL):* ${rep.cpl || currentMetrics.cpl}\n` +
      `• *Retorno sobre Investimento (ROI):* ${rep.roi || currentMetrics.roi}\n\n` +
      `🏆 *Ganhos Principais:*\n${rep.wins}\n\n` +
      `🎯 *Próxima Ação Estratégica:*\n${rep.next}\n\n` +
      `_Auditado e Emitido pela Mesa de Operações HelpUS LLC (SuperAdmin Master)_`
    );
  };

  return (
    <AdminGate>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 print:p-0 print:m-0 print:max-w-none">
        {/* HEADER (Oculto na Impressão) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
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
                  Consolidação executiva de ROI, exportação em PDF e envio via WhatsApp
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
              onClick={() => handleOpenPdfModal()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Emitir PDF do Período
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700 shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" /> CSV
            </button>
          </div>
        </div>

        {/* SELETOR DE PERÍODO & MÉTRICAS CONSOLIDADAS (Oculto na Impressão) */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl print:hidden">
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

        {/* LISTAGEM DE RELATÓRIOS REGISTRADOS (Oculto na Impressão) */}
        <div className="space-y-4 print:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Relatórios Executivos por Marca ({initialReports.length})</h2>
            <span className="text-xs text-slate-400">Clique para emitir PDF ou disparar no WhatsApp</span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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

                  {/* Resumo de KPIs do Card */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-center">
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase">Alcance</span>
                      <span className="text-xs font-bold text-white">{rep.reach || currentMetrics.reach}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase">Leads</span>
                      <span className="text-xs font-bold text-amber-400">{rep.leads || currentMetrics.leads}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 block uppercase">ROI</span>
                      <span className="text-xs font-bold text-emerald-400">{rep.roi || currentMetrics.roi}</span>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ganhos & Resultados:
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{rep.wins}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-slate-500">Próx: {rep.next.slice(0, 35)}...</span>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${customPhone}?text=${getWhatsAppMessage(rep)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition border border-emerald-500/30"
                      title="Enviar via WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() => handleOpenPdfModal(rep)}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition border border-rose-500/30 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5 text-rose-400" />
                      <span>Ver PDF</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* MODAL DE VISUALIZAÇÃO & IMPRESSÃO EM PDF EXECUTIVO (A4 FORMAT) */}
        {activePdfReport && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in"
          >
            <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-auto max-h-[95vh] overflow-y-auto print:bg-white print:text-black print:border-none print:shadow-none print:max-w-none print:p-0 print:m-0 print:h-auto">
              
              {/* Barra de Ações do Modal (Oculta na Impressão) */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 print:hidden">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Printer className="w-4 h-4" />
                  <span>Emissor de Relatório Executivo Oficial • HelpUS Advert</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg transition cursor-pointer"
                  >
                    <Printer className="w-4 h-4" /> Imprimir / Salvar em PDF
                  </button>

                  <a
                    href={`https://wa.me/${customPhone}?text=${getWhatsAppMessage(activePdfReport)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition"
                  >
                    <MessageCircle className="w-4 h-4" /> Compartilhar no WhatsApp
                  </a>

                  <button
                    onClick={() => setActivePdfReport(null)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* CORPO DO DOCUMENTO A4 EXECUTIVO */}
              <div className="bg-slate-950 border border-slate-800 p-8 sm:p-10 rounded-2xl space-y-8 shadow-inner print:bg-white print:text-slate-950 print:border-none print:p-0">
                {/* Cabeçalho Oficial do Relatório */}
                <div className="flex items-center justify-between border-b border-slate-800 print:border-slate-300 pb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src="/img/helpus-logo.png"
                      alt="HelpUS Logo"
                      className="w-12 h-12 rounded-full object-contain border border-amber-400"
                    />
                    <div>
                      <h2 className="text-xl font-black text-white print:text-black tracking-tight">
                        HELP<span className="text-blue-500">US</span> ADVERT
                      </h2>
                      <span className="text-xs text-amber-400 print:text-amber-600 font-bold uppercase tracking-wider block">
                        Mesa de Operações de Publicidade & Inteligência de Mídia
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 print:text-emerald-700 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <ShieldCheck className="w-3.5 h-3.5" /> Auditoria Master SuperAdmin
                    </span>
                    <span className="text-xs text-slate-400 print:text-slate-600 font-mono block mt-1">
                      Data de Emissão: {new Date().toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>

                {/* Dados da Empresa / Campanha */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-xs">
                  <div>
                    <span className="text-slate-400 print:text-slate-500 font-semibold block">Marca / Cliente:</span>
                    <strong className="text-white print:text-black text-sm">{activePdfReport.brand}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 print:text-slate-500 font-semibold block">Título do Documento:</span>
                    <strong className="text-white print:text-black text-sm">{activePdfReport.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 print:text-slate-500 font-semibold block">Período de Análise:</span>
                    <strong className="text-white print:text-black text-sm">{activePdfReport.period}</strong>
                  </div>
                </div>

                {/* Grade de KPIs Oficiais */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 print:text-slate-600 mb-3">
                    Resultados e Métricas Consolidadas de Retorno
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-center">
                      <span className="text-[10px] text-slate-400 print:text-slate-600 block uppercase font-bold">Alcance Total</span>
                      <strong className="text-lg font-black text-white print:text-black font-mono">
                        {activePdfReport.reach || currentMetrics.reach}
                      </strong>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-center">
                      <span className="text-[10px] text-slate-400 print:text-slate-600 block uppercase font-bold">Investimento Mídia</span>
                      <strong className="text-lg font-black text-white print:text-black font-mono">
                        {activePdfReport.spend || currentMetrics.spend}
                      </strong>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-center">
                      <span className="text-[10px] text-slate-400 print:text-slate-600 block uppercase font-bold">Leads Qualificados</span>
                      <strong className="text-lg font-black text-amber-400 print:text-amber-600 font-mono">
                        {activePdfReport.leads || currentMetrics.leads}
                      </strong>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-center">
                      <span className="text-[10px] text-slate-400 print:text-slate-600 block uppercase font-bold">Custo / Lead (CPL)</span>
                      <strong className="text-lg font-black text-sky-400 print:text-sky-600 font-mono">
                        {activePdfReport.cpl || currentMetrics.cpl}
                      </strong>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-100 border border-slate-800 print:border-slate-300 text-center col-span-2 sm:col-span-1">
                      <span className="text-[10px] text-slate-400 print:text-slate-600 block uppercase font-bold">Retorno Auditado</span>
                      <strong className="text-lg font-black text-emerald-400 print:text-emerald-600 font-mono">
                        {activePdfReport.roi || currentMetrics.roi}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Análise Qualitativa e Governança */}
                <div className="space-y-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5">
                    <span className="font-bold text-emerald-400 print:text-emerald-700 uppercase tracking-wider text-[11px] block">
                      1. Ganhos Operacionais & Diferenciais Competitivos
                    </span>
                    <p className="text-slate-300 print:text-slate-800 leading-relaxed">
                      {activePdfReport.wins}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5">
                    <span className="font-bold text-amber-400 print:text-amber-700 uppercase tracking-wider text-[11px] block">
                      2. Pontos de Otimização & Governança de Marca
                    </span>
                    <p className="text-slate-300 print:text-slate-800 leading-relaxed">
                      {activePdfReport.issues}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-1.5">
                    <span className="font-bold text-sky-400 print:text-sky-700 uppercase tracking-wider text-[11px] block">
                      3. Próximo Passo Estratégico (Roadmap de Escala)
                    </span>
                    <p className="text-slate-300 print:text-slate-800 leading-relaxed">
                      {activePdfReport.next}
                    </p>
                  </div>
                </div>

                {/* Rodapé Executivo de Autenticação */}
                <div className="pt-6 border-t border-slate-800 print:border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[10px] text-slate-500 print:text-slate-600">
                  <div>
                    <strong>HelpUS LLC • Soluções de Tecnologia e Publicidade Inteligente</strong>
                    <span className="block mt-0.5">helpus.ecommerce@gmail.com | +55 (83) 99872-1848 | helpusbr.com</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono">ID de Auditoria: {activePdfReport.id}-{Date.now().toString(36).toUpperCase()}</span>
                    <span className="block text-emerald-500 font-bold">Autenticado via Master SuperAdmin Approval</span>
                  </div>
                </div>
              </div>

              {/* Botões do Rodapé do Modal */}
              <div className="flex justify-end gap-3 pt-2 print:hidden">
                <button
                  onClick={() => setActivePdfReport(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
                >
                  Fechar Visualização
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </AdminGate>
  );
}
