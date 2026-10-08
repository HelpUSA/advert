'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../lib/LanguageContext';
import { useGoogleAuth } from '../lib/useGoogleAuth';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Play,
  Layers,
  BarChart3,
  Calendar,
  Send,
  Eye,
  MessageSquare,
  Lock,
  Building,
  Target,
  ExternalLink,
} from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();
  const { user, isAuthenticated, login } = useGoogleAuth();

  const caseImages = [
    {
      name: 'PublicArt Mídia & Comunicação',
      category: 'Mídia Exterior & OOH',
      image: '/media/publicart-site.png',
      metric: '+230% de Alcance',
    },
    {
      name: 'CG Details Studio',
      category: 'Estética Automotiva Premium',
      image: '/media/details-site.png',
      metric: '+185% de Conversão',
    },
    {
      name: 'Kátia Xavier Imóveis',
      category: 'Mercado Imobiliário de Alto Padrão',
      image: '/media/katia-site.png',
      metric: 'Gestão Editorial 100% IA',
    },
    {
      name: 'BlueBox Soluções',
      category: 'Arquitetura & Módulos Sustentáveis',
      image: '/media/bluebox-site.png',
      metric: 'Tráfego Qualificado',
    },
  ];

  return (
    <main className="space-y-24 py-8">
      {/* 1. HERO COM VÍDEO & APRESENTAÇÃO COMERCIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/50 border border-slate-800 rounded-3xl p-8 sm:p-14 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/3 -mb-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Texto do Hero */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-amber-400/30 text-xs font-bold text-amber-400 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
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
                  href="#contato"
                  className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-400/20 transition flex items-center gap-2"
                >
                  <span>{t.publicLanding.ctaHire}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {isAuthenticated ? (
                  <Link
                    href="/brands"
                    className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Mesa de Operações (Ativa)</span>
                  </Link>
                ) : (
                  <button
                    onClick={login}
                    className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition flex items-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4 text-sky-400" />
                    <span>{t.publicLanding.ctaAdmin}</span>
                  </button>
                )}
              </div>

              {/* Badges de Confiança */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800/80 text-xs text-slate-400 font-medium">
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

            {/* Vídeo / Demonstração Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-950 group">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-80 object-cover opacity-90 transition group-hover:scale-105 duration-700"
                >
                  <source src="/media/video-ia.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      IA Watcher em Execução
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Processamento contínuo de dados de mercado e geração de ativos publicitários.
                  </p>
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
            Soluções para Empresas & Marcas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.publicLanding.servicesTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t.publicLanding.servicesSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.publicLanding.services.map((svc, idx) => (
            <article
              key={idx}
              className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-7 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg transition duration-200 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700 uppercase">
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
                <span className="text-[11px] text-slate-400">Disponível para contratação</span>
                <span className="text-amber-400 font-semibold group-hover:translate-x-1 transition flex items-center gap-1">
                  Saiba mais <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. DEMONSTRAÇÃO EM VÍDEO COMPLEMENTAR */}
      <section id="video" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-400/10 px-3 py-1 rounded-full border border-sky-400/20 inline-block">
              Mídia Audiovisual
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.publicLanding.videoTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.publicLanding.videoSubtitle}
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-black">
            <video
              controls
              loop
              muted
              playsInline
              className="w-full max-h-[500px] object-cover mx-auto"
            >
              <source src="/media/video-ecommerce.mp4" type="video/mp4" />
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>
        </div>
      </section>

      {/* 4. CASES & FOTOS DE MARCAS ATENDIDAS */}
      <section id="cases" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 inline-block">
            Resultados Comprovados
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.publicLanding.casesTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {t.publicLanding.casesSubtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {caseImages.map((c, idx) => (
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

      {/* 5. TABELA COMPARATIVA: AGÊNCIA TRADICIONAL vs HELPUS ADVERT */}
      <section id="comparativo" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block">
              Por que a HelpUS?
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t.publicLanding.comparisonTitle}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-4 font-bold">Critério Operacional</th>
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

      {/* 6. BANNER DE CONTRATAÇÃO & CONTATO */}
      <section id="contato" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-sky-500/20 border-2 border-amber-400/40 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
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
              href="mailto:helpus.ecommerce@gmail.com?subject=Interesse%20em%20Publicidade%20HelpUS%20Advert"
              className="px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl transition flex items-center gap-2"
            >
              <span>{t.publicLanding.contactBtn}</span>
              <Send className="w-4 h-4" />
            </a>

            <a
              href="https://helpusbr.com/contato"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition flex items-center gap-2"
            >
              <span>Portal HelpUS Principal</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
