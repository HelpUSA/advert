'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, ArrowLeft, Plus, Sparkles, Send, Tag, Layers } from 'lucide-react';

const initialDrafts = [
  {
    id: 'draft-1',
    title: 'Por que operações próprias de publicidade transformam o ROI de marcas',
    brand: 'Advert HelpUS BR',
    channel: 'LinkedIn',
    format: 'Artigo & Post Executivo',
    pillar: 'Autoridade Técnica',
    status: 'Rascunho Pronto',
    statusColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    cta: 'Acompanhar a evolução do ecossistema HelpUS',
    readiness: 'Pronto para fila de aprovação',
    next: 'Encaminhar ao SuperAdmin para validação final',
  },
  {
    id: 'draft-2',
    title: 'Checklist: 5 pilares de infraestrutura e IA para sua empresa crescer',
    brand: 'HelpUS BR',
    channel: 'Instagram (@helpus.ecommerce)',
    format: 'Carrossel Visual (7 slides)',
    pillar: 'Utilidade & Conteúdo Prático',
    status: 'Em Criação',
    statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    cta: 'Solicitar diagnóstico gratuito no portal helpusbr.com',
    readiness: 'Estruturação dos slides com IA Watcher',
    next: 'Gerar artes visuais finais com a paleta Dark HelpUS',
  },
  {
    id: 'draft-3',
    title: 'FIRST CVSS v4.0 vs v3.1: Entenda o novo cálculo de risco cibernético',
    brand: 'HelpUS CVSS',
    channel: 'LinkedIn + Portal',
    format: 'Post Analítico & Whitepaper',
    pillar: 'Liderança Científica',
    status: 'Em Revisão',
    statusColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    cta: 'Simular vetores de risco em cvss.helpusbr.com',
    readiness: 'Aguardando decisão de aprovação',
    next: 'Validar copy técnica e disparar nos canais',
  },
];

export default function DraftsPage() {
  const [drafts] = useState(initialDrafts);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Topo / Voltar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-purple-400 transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Dashboard
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-purple-400/10 text-purple-400 border border-purple-400/20">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Rascunhos & Criativos de Conteúdo
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Ativos de conteúdo gerados e refinados com IA Watcher prontos para revisão e publicação
              </p>
            </div>
          </div>
        </div>

        <button className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" /> Gerar Rascunho com IA
        </button>
      </div>

      {/* Grade de Rascunhos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drafts.map((draft) => (
          <article
            key={draft.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between space-y-5 shadow-lg transition"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-purple-300 border border-slate-700">
                  {draft.brand}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${draft.statusColor}`}>
                  {draft.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  {draft.format}
                </span>
                <h2 className="text-base font-bold text-white tracking-tight leading-snug">
                  {draft.title}
                </h2>
              </div>

              <div className="space-y-2 pt-2 text-xs border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Canal:</span>
                  <span className="font-semibold text-slate-200">{draft.channel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Pilar Editorial:</span>
                  <span className="text-sky-400 font-semibold">{draft.pillar}</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-400 block mb-1">CTA (Chamada de Ação):</span>
                  <span className="text-[11px] text-amber-300 bg-amber-400/10 px-2 py-1 rounded block border border-amber-400/20 font-medium">
                    "{draft.cta}"
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-emerald-400 font-semibold">{draft.readiness}</span>
              <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5">
                <Send className="w-3 h-3 text-sky-400" /> Aprovar
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
