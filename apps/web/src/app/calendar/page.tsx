'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CalendarDays, ArrowLeft, Plus, Clock, CheckCircle2, AlertCircle, Share2 } from 'lucide-react';

const initialSlots = [
  {
    id: 'cal-1',
    date: '10/10/2026',
    channel: 'LinkedIn',
    topic: 'Por que operações próprias de publicidade eliminam custos com agências',
    campaign: 'Lançamento & Posicionamento Advert',
    status: 'Rascunho Pronto',
    statusColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    owner: 'Watcher IA',
    next: 'Encaminhar para esteira de aprovação SuperAdmin',
  },
  {
    id: 'cal-2',
    date: '12/10/2026',
    channel: 'Instagram (@helpus.ecommerce)',
    topic: 'Checklist de Soluções Inteligentes em Tecnologia HelpUS',
    campaign: 'Autoridade & Alcance HelpUS 2026',
    status: 'Em Criação',
    statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    owner: 'Watcher IA',
    next: 'Finalizar visual do carrossel no padrão Dark HelpUS',
  },
  {
    id: 'cal-3',
    date: '15/10/2026',
    channel: 'LinkedIn + Site',
    topic: 'Mitigação Científica FIRST CVSS v4.0: Casos Práticos',
    campaign: 'Conscientização Científica CVSS v4.0',
    status: 'Em Revisão',
    statusColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    owner: 'SuperAdmin',
    next: 'Aprovar copy e agendar postagem automática',
  },
  {
    id: 'cal-4',
    date: '18/10/2026',
    channel: 'Site Oficial / Blog',
    topic: 'Novidades no Ecossistema Tecnológico HelpUS BR',
    campaign: 'Autoridade & Alcance HelpUS 2026',
    status: 'Agendado',
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    owner: 'Watcher IA',
    next: 'Disparo no feed e publicação no portal helpusbr.com',
  },
];

export default function CalendarPage() {
  const [slots] = useState(initialSlots);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Topo / Voltar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Dashboard
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
              <CalendarDays className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Calendário Editorial & Programação
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Grade cronológica de publicações conectando campanhas, criativos, canais e datas de veiculação
              </p>
            </div>
          </div>
        </div>

        <button className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-2">
          <Plus className="w-4 h-4" /> Agendar Publicação
        </button>
      </div>

      {/* Linha do Tempo de Posts */}
      <div className="grid md:grid-cols-2 gap-6">
        {slots.map((slot) => (
          <article
            key={slot.id}
            className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg transition"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-amber-400 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {slot.date}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${slot.statusColor}`}>
                  {slot.status}
                </span>
              </div>

              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                  {slot.topic}
                </h2>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px] text-slate-400">Campanha:</span>
                  <span className="text-[11px] text-sky-400 font-semibold">{slot.campaign}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 text-xs border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Canal de Destino:</span>
                  <span className="font-semibold text-slate-200">{slot.channel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Responsável / Operador:</span>
                  <span className="text-amber-400 text-[11px] font-semibold">{slot.owner}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 bg-slate-950/40 p-3 rounded-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Etapa Operacional:
              </span>
              <p className="text-xs text-slate-300 leading-snug">{slot.next}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
