'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Megaphone, ArrowLeft, Plus, Clock, CheckCircle2, AlertCircle, Calendar, ArrowRight } from 'lucide-react';

const initialCampaigns = [
  {
    id: 'camp-1',
    name: 'Autoridade & Alcance HelpUS 2026',
    brand: 'HelpUS BR',
    objective: 'Autoridade técnica + Geração de oportunidades',
    status: 'Ativa',
    cadence: '3 posts / semana',
    channels: 'Site, LinkedIn, Instagram (@helpus.ecommerce)',
    readiness: 'Pronta com calendário vinculado',
    next: 'Publicação do carrossel técnico da esteira',
  },
  {
    id: 'camp-2',
    name: 'Lançamento & Posicionamento Advert',
    brand: 'Advert HelpUS BR',
    objective: 'Demonstração de produto proprietário sem intermediários',
    status: 'Em Execução',
    cadence: 'Atualizações semanais',
    channels: 'advert.helpusbr.com, Docs, LinkedIn',
    readiness: 'Criativos em esteira de aprovação',
    next: 'Validação executiva dos criativos com o SuperAdmin',
  },
  {
    id: 'camp-3',
    name: 'Conscientização Científica CVSS v4.0',
    brand: 'HelpUS CVSS',
    objective: 'Posicionamento em auditoria e cibersegurança avançada',
    status: 'Planejada',
    cadence: '2 posts / semana',
    channels: 'LinkedIn, Artigos, GitHub',
    readiness: 'Aguardando expansão de rascunhos',
    next: 'Elaboração de infográfico comparativo v3.1 vs v4.0',
  },
];

export default function CampaignsPage() {
  const [campaigns] = useState(initialCampaigns);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Topo / Voltar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Dashboard
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-sky-400/10 text-sky-400 border border-sky-400/20">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Planejador de Campanhas
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Estratégias de mídia multicanal conectando marcas, objetivos e cadência de veiculação
              </p>
            </div>
          </div>
        </div>

        <button className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Nova Campanha
        </button>
      </div>

      {/* Grade de Campanhas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <article
            key={camp.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between space-y-5 shadow-lg transition"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-sky-400 border border-slate-700">
                  {camp.brand}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> {camp.status}
                </span>
              </div>

              <div>
                <h2 className="text-lg font-bold text-white tracking-tight">{camp.name}</h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{camp.objective}</p>
              </div>

              <div className="space-y-2 pt-2 text-xs border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Cadência:</span>
                  <span className="font-semibold text-slate-200 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-sky-400" /> {camp.cadence}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Canais:</span>
                  <span className="text-[11px] text-slate-300 font-mono">{camp.channels}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Prontidão:</span>
                  <span className="text-emerald-400 text-[11px] font-semibold">{camp.readiness}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 bg-slate-950/40 p-3 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                Próxima Ação:
              </span>
              <p className="text-xs text-slate-300 leading-snug">{camp.next}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
