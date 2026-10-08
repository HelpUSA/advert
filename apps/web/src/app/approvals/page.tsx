'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useLanguage } from '../../lib/LanguageContext';
import { CheckCircle2, ArrowLeft, Check, X, ShieldCheck } from 'lucide-react';

const initialApprovals = [
  {
    id: 'app-1',
    draft: 'Por que operações próprias de publicidade transformam o ROI de marcas',
    brand: 'Advert HelpUS BR',
    reviewer: 'SuperAdmin Master',
    status: 'Aprovado pelo Master',
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    decision: 'Liberado para agendamento de veiculação',
    note: 'Copy excelente, alinhada com os pilares técnicos da HelpUS.',
    next: 'Criar checklist de disparo no LinkedIn',
  },
  {
    id: 'app-2',
    draft: 'Checklist: 5 pilares de infraestrutura e IA para sua empresa crescer',
    brand: 'HelpUS BR',
    reviewer: 'SuperAdmin Master',
    status: 'Ajustes Solicitados',
    statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    decision: 'Revisar arte visual antes de publicar',
    note: 'O slide 4 precisa de um contraste maior no texto secundário.',
    next: 'Ajustar contraste do slide e submeter novamente',
  },
  {
    id: 'app-3',
    draft: 'FIRST CVSS v4.0 vs v3.1: Entenda o novo cálculo de risco cibernético',
    brand: 'HelpUS CVSS',
    reviewer: 'SuperAdmin Master',
    status: 'Pendente',
    statusColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    decision: 'Aguardando validação executiva',
    note: 'Aguardando conferência do link de simulação reversa.',
    next: 'Decisão do SuperAdmin necessária',
  },
  {
    id: 'app-4',
    draft: 'Disparo em massa não-solicitado (Spam Outreach)',
    brand: 'Filtro Automático de Segurança',
    reviewer: 'Safety Gate IA',
    status: 'Recusado pelo Master',
    statusColor: 'text-red-400 bg-red-500/10 border-red-500/20',
    decision: 'Bloqueado por violar diretrizes de reputação HelpUS',
    note: 'Práticas de spam são terminantemente proibidas nas automações do Advert.',
    next: 'Manter bloqueio definitivo',
  },
];

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState(initialApprovals);
  const { t } = useLanguage();

  const handleAction = (id: string, newStatus: string, decision: string) => {
    setApprovals((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
              decision,
              statusColor:
                newStatus === 'Aprovado pelo Master'
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : 'text-red-400 bg-red-500/10 border-red-500/20',
            }
          : item
      )
    );
  };

  return (
    <AdminGate>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-orange-400 transition mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> {t.modules.backToLanding}
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-orange-400/10 text-orange-400 border border-orange-400/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t.nav.approvals}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Fila de governança e validação executiva Master antes da veiculação
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Aprovação Master: <strong>helpus.ecommerce@gmail.com</strong></span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {approvals.map((item) => (
            <article
              key={item.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.brand}
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>

                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                    {item.draft}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Revisor: <strong className="text-slate-300">{item.reviewer}</strong>
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block">Decisão:</span>
                    <span className="text-slate-200">{item.decision}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Observação:</span>
                    <span className="text-slate-300 italic">"{item.note}"</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                <span className="text-[11px] text-slate-400 font-mono">{item.next}</span>

                {item.status === 'Pendente' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAction(item.id, 'Aprovado pelo Master', 'Aprovado pelo SuperAdmin')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition flex items-center gap-1"
                    >
                      <Check className="w-3.5 h-3.5" /> Aprovar
                    </button>
                    <button
                      onClick={() => handleAction(item.id, 'Recusado pelo Master', 'Recusado pelo SuperAdmin')}
                      className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 font-semibold text-xs border border-red-500/30 transition flex items-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" /> Recusar
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
    </AdminGate>
  );
}
