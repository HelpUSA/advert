'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useLanguage } from '../../lib/LanguageContext';
import {
  CheckCircle2,
  ArrowLeft,
  Check,
  X,
  ShieldCheck,
  Send,
  ExternalLink,
  Clock,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';

interface ApprovalItem {
  id: string;
  draft: string;
  brand: string;
  reviewer: string;
  status: 'Aprovado pelo Master' | 'Ajustes Solicitados' | 'Pendente' | 'Recusado pelo Master' | 'Publicado via API';
  statusColor: string;
  decision: string;
  note: string;
  next: string;
  publishedAt?: string;
}

const initialApprovals: ApprovalItem[] = [
  {
    id: 'app-1',
    draft: 'Por que operações próprias de publicidade transformam o ROI de marcas',
    brand: 'Advert HelpUS BR',
    reviewer: 'SuperAdmin Master',
    status: 'Aprovado pelo Master',
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    decision: 'Liberado para agendamento de veiculação',
    note: 'Copy excelente, alinhada com os pilares técnicos da HelpUS.',
    next: 'Pronto para disparo nas redes',
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
  const [approvals, setApprovals] = useState<ApprovalItem[]>(initialApprovals);
  const [dispatchAlert, setDispatchAlert] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('helpus_advert_approvals');
      if (saved) {
        setApprovals(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const saveApprovals = (items: ApprovalItem[]) => {
    setApprovals(items);
    try {
      localStorage.setItem('helpus_advert_approvals', JSON.stringify(items));
    } catch {}
  };

  const handleAction = (id: string, newStatus: ApprovalItem['status'], decision: string) => {
    const updated = approvals.map((item) =>
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
    );
    saveApprovals(updated);
  };

  const handleDispatchAPI = (id: string) => {
    const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const updated = approvals.map((item) =>
      item.id === id
        ? {
            ...item,
            status: 'Publicado via API' as const,
            decision: `Disparo executado com sucesso às ${now} via Webhook Meta/LinkedIn`,
            statusColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
            next: 'Publicado em produção (Status: 200 OK)',
            publishedAt: now,
          }
        : item
    );
    saveApprovals(updated);
    setDispatchAlert(`Publicação disparada com sucesso via API oficial às ${now}!`);
    setTimeout(() => setDispatchAlert(null), 5000);
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

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Aprovação Master: <strong className="text-white">helpus.ecommerce@gmail.com</strong></span>
          </div>
        </div>

        {/* FEEDBACK DE DISPARO */}
        {dispatchAlert && (
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <span>{dispatchAlert}</span>
          </div>
        )}

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
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-white tracking-tight leading-snug">
                    {item.draft}
                  </h2>
                  <span className="text-xs text-slate-400 block mt-1">
                    Revisor Responsável: <strong>{item.reviewer}</strong>
                  </span>
                </div>

                <div className="space-y-2 pt-2 text-xs border-t border-slate-800 text-slate-300">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                    <span className="font-bold text-slate-400 block">Decisão Formal:</span>
                    <p className="text-slate-200">{item.decision}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/50 space-y-1">
                    <span className="font-bold text-slate-400 block">Nota do Revisor:</span>
                    <p className="text-slate-300 italic">{item.note}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400">{item.next}</span>

                <div className="flex items-center gap-2">
                  {item.status !== 'Aprovado pelo Master' && item.status !== 'Publicado via API' && (
                    <button
                      onClick={() =>
                        handleAction(item.id, 'Aprovado pelo Master', 'Validado e liberado pelo SuperAdmin Master')
                      }
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5" /> Aprovar
                    </button>
                  )}

                  {item.status === 'Aprovado pelo Master' && (
                    <button
                      onClick={() => handleDispatchAPI(item.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-md flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> Disparar API
                    </button>
                  )}

                  {item.status !== 'Recusado pelo Master' && item.status !== 'Publicado via API' && (
                    <button
                      onClick={() =>
                        handleAction(item.id, 'Recusado pelo Master', 'Rejeitado por incompatibilidade de diretrizes')
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" /> Recusar
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </AdminGate>
  );
}
