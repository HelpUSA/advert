'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { useGoogleAuth } from '../lib/useGoogleAuth';
import { WHATSAPP_NUMBER } from '../lib/i18n';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  MessageCircle,
  ExternalLink,
  X,
  Check,
} from 'lucide-react';

export default function Home() {
  const { language, t } = useLanguage();
  const { isAuthenticated } = useGoogleAuth();

  // Estado para o Modal de "Saiba mais" de cada serviço
  const [selectedService, setSelectedService] = useState<any | null>(null);

  const whatsappGeneralMsg =
    language === 'en'
      ? 'Hello! I would like to request a commercial proposal for HelpUS Advert services.'
      : language === 'es'
      ? 'Hola, me gustaría solicitar una propuesta comercial para los servicios de HelpUS Advert.'
      : 'Olá! Gostaria de solicitar uma proposta comercial para os serviços de publicidade HelpUS Advert.';

  const whatsappGeneralUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappGeneralMsg)}`;

  return (
    <main className="space-y-20 sm:space-y-28 py-6 sm:py-10">
      {/* 1. HERO COM COCKPIT VISUAL DE CAMPANHA & APRESENTAÇÃO COMERCIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/50 border border-slate-800 rounded-3xl p-6 sm:p-12 lg:p-14 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/3 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Texto do Hero */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-amber-400/30 text-xs font-bold text-amber-400 shadow-sm">
                <img
                  src="/img/helpus-logo.png"
                  alt="HelpUS Logo"
                  className="w-4 h-4 object-contain rounded-full"
                />
                <span>{t.publicLanding.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                {t.publicLanding.heroTitle}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {t.publicLanding.heroSubtitle}
              </p>

              {/* Botões de Ação */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={whatsappGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/25 transition flex items-center gap-2 group"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>{t.publicLanding.ctaHire}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </a>

                {isAuthenticated ? (
                  <Link
                    href="/brands"
                    className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Mesa de Operações (Ativa)</span>
                  </Link>
                ) : (
                  <a
                    href="https://helpusbr.com/admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4 text-sky-400" />
                    <span>{t.publicLanding.ctaHub}</span>
                  </a>
                )}
              </div>

              {/* Badges de Confiança */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.publicLanding.badgeAi}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{t.publicLanding.badgeSpeed}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>{t.publicLanding.badgeSecurity}</span>
                </span>
              </div>
            </div>

            {/* Mockup Interativo de Gestão de Mídia & Dashboard */}
            <div className="lg:col-span-5">
              <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 relative overflow-hidden backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {t.publicLanding.cockpit.activeCampaign}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                    {t.publicLanding.cockpit.roi}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                      {t.publicLanding.cockpit.totalReach}
                    </span>
                    <span className="text-xl font-black text-white block">342.800</span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-0.5">
                      <TrendingUp className="w-3 h-3" /> {t.publicLanding.cockpit.thisMonth}
                    </span>
                  </div>

                  <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">
                      {t.publicLanding.cockpit.qualifiedLeads}
                    </span>
                    <span className="text-xl font-black text-amber-400 block">1.420</span>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                      {t.publicLanding.cockpit.costPerLead}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-1 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {t.publicLanding.cockpit.connectedChannels}
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-sky-400 border border-slate-800">
                      {t.publicLanding.cockpit.channels.linkedin}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-pink-400 border border-slate-800">
                      {t.publicLanding.cockpit.channels.instagram}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-emerald-400 border border-slate-800">
                      {t.publicLanding.cockpit.channels.google}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 text-amber-400 border border-slate-800">
                      {t.publicLanding.cockpit.channels.portals}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="font-bold text-white text-[11px] block">
                        {t.publicLanding.cockpit.masterApprovalTitle}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {t.publicLanding.cockpit.masterApprovalDesc}
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    OK
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GRADE DE SERVIÇOS OFERECIDOS AOS CLIENTES */}
      <section id="servicos" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block">
            {t.publicLanding.servicesBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.publicLanding.servicesTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t.publicLanding.servicesSubtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.publicLanding.services.map((svc, idx) => (
            <article
              key={svc.id || idx}
              className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-7 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg transition duration-200 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-slate-800 text-amber-400 border border-slate-700 uppercase">
                    {svc.badge}
                  </span>
                  <span className="text-slate-600 font-mono text-xs">0{idx + 1}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                  {svc.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {svc.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px] text-slate-400">{t.publicLanding.availableForHire}</span>
                <button
                  onClick={() => setSelectedService(svc)}
                  className="text-amber-400 font-semibold group-hover:translate-x-1 transition flex items-center gap-1 cursor-pointer hover:underline focus:outline-none"
                >
                  <span>{t.publicLanding.learnMore}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. CASES & FOTOS DE MARCAS ATENDIDAS */}
      <section id="cases" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 inline-block">
            {t.publicLanding.casesBadge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.publicLanding.casesTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t.publicLanding.casesSubtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.publicLanding.cases.map((c, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-lg transition duration-200 group flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                />
                <div className="absolute top-3 left-3 bg-slate-950/90 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-800">
                  {c.metric}
                </div>
              </div>

              <div className="p-5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {c.category}
                </span>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition">
                  {c.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TABELA COMPARATIVA: AGÊNCIA TRADICIONAL vs HELPUS ADVERT */}
      <section id="comparativo" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block">
              {t.publicLanding.comparisonBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.publicLanding.comparisonTitle}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-4 font-bold">{t.publicLanding.criteriaHeader}</th>
                  <th className="pb-4 font-bold text-red-400">{t.publicLanding.comparisonAgency}</th>
                  <th className="pb-4 font-bold text-amber-400">{t.publicLanding.comparisonHelpUS}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {t.publicLanding.comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition">
                    <td className="py-4 font-semibold text-white">{row.feature}</td>
                    <td className="py-4 text-slate-400">{row.agency}</td>
                    <td className="py-4 font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{row.helpus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. BANNER DE CONTRATAÇÃO & CONTATO VIA WHATSAPP */}
      <section id="contato" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-emerald-600/20 via-slate-900 to-amber-500/20 border-2 border-emerald-500/40 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t.publicLanding.ctaBannerTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.publicLanding.ctaBannerSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 transition flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>{t.publicLanding.contactBtn}</span>
            </a>

            <a
              href="https://helpusbr.com/contato"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition flex items-center gap-2"
            >
              <span>{t.publicLanding.portalShortcut}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 6. MODAL INTERATIVO DE DETALHES DO SERVIÇO ("SAIBA MAIS") */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-slate-800 text-amber-400 border border-slate-700 uppercase">
                {selectedService.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {selectedService.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                {selectedService.details || selectedService.desc}
              </p>
            </div>

            {selectedService.deliverables && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  {t.publicLanding.deliverablesTitle}
                </span>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedService.deliverables.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  selectedService.whatsappMsg || whatsappGeneralMsg
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>{t.publicLanding.hireViaWhatsapp}</span>
              </a>

              <button
                onClick={() => setSelectedService(null)}
                className="py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition"
              >
                {t.publicLanding.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
