'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useLanguage } from '../../lib/LanguageContext';
import {
  GitBranch,
  ArrowLeft,
  Shield,
  Layers,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Send,
  Calendar,
  Kanban,
  ListOrdered,
} from 'lucide-react';

interface KanbanCard {
  id: string;
  title: string;
  brand: string;
  stage: 'idea' | 'creation' | 'approval' | 'scheduled';
  format: string;
  owner: string;
}

const initialCards: KanbanCard[] = [
  {
    id: 'k1',
    title: 'Posicionamento e Prova Social HelpUS 2026',
    brand: 'HelpUS BR',
    stage: 'idea',
    format: 'Carrossel B2B',
    owner: 'SuperAdmin',
  },
  {
    id: 'k2',
    title: 'Roteiro de Vídeo: Por que eliminar intermediários de marketing',
    brand: 'Advert HelpUS BR',
    stage: 'creation',
    format: 'Reels / TikTok',
    owner: 'Motor IA Criativo',
  },
  {
    id: 'k3',
    title: 'Artigo: Como calcular o custo real por lead qualificado',
    brand: 'Advert HelpUS BR',
    stage: 'approval',
    format: 'Artigo LinkedIn',
    owner: 'SuperAdmin Master',
  },
  {
    id: 'k4',
    title: 'Infográfico Comparativo FIRST CVSS v4.0',
    brand: 'HelpUS CVSS',
    stage: 'scheduled',
    format: 'Anúncio Search',
    owner: 'Automação HelpUS',
  },
];

const steps = [
  {
    step: '01',
    name: 'Cadastro & Posicionamento de Marca',
    owner: 'SuperAdmin + Motor IA',
    status: 'Operacional',
    gate: 'Validação de Marca',
    output: 'Perfil de marca com objetivos, tom de voz, público-alvo e limites de comunicação.',
    next: 'Base para estruturar campanhas',
  },
  {
    step: '02',
    name: 'Planejamento de Campanha',
    owner: 'SuperAdmin + Motor IA',
    status: 'Operacional',
    gate: 'Validação de Mídia',
    output: 'Metas de alcance, canais definidos, cadência semanal e critérios de prontidão.',
    next: 'Conversão em slots no calendário editorial',
  },
  {
    step: '03',
    name: 'Geração de Criativos & Copies',
    owner: 'Motor IA Criativo',
    status: 'Operacional',
    gate: 'Filtro de Criativo',
    output: 'Textos persuasivos, briefings visuais, variantes e chamadas de ação (CTAs).',
    next: 'Encaminhamento para esteira de aprovação',
  },
  {
    step: '04',
    name: 'Governança & Aprovação Executiva',
    owner: 'SuperAdmin Master',
    status: 'Obrigatório (Gate)',
    gate: 'Aprovação Master',
    output: 'Decisões vinculadas de aprovação, solicitação de ajustes ou recusa com registro.',
    next: 'Apenas conteúdos aprovados avançam para veiculação',
  },
  {
    step: '05',
    name: 'Preparação & Disparo Multicanal',
    owner: 'Operador / Automação',
    status: 'Ativo',
    gate: 'Auditoria de Disparo',
    output: 'Checklist de postagem, agendamento em canais próprios e log de auditoria.',
    next: 'Veiculação e monitoramento em tempo real',
  },
  {
    step: '06',
    name: 'Consolidação de Dados & ROI',
    owner: 'Motor IA Analytics',
    status: 'Analítico',
    gate: 'Auditoria de Resultados',
    output: 'Relatórios consolidados de conversão, engajamento e insights estratégicos.',
    next: 'Retroalimentação de campanhas futuras',
  },
];

export default function WorkflowPage() {
  const [cards, setCards] = useState<KanbanCard[]>(initialCards);
  const [viewMode, setViewMode] = useState<'kanban' | 'gates'>('kanban');
  const { t } = useLanguage();

  const stages: { id: KanbanCard['stage']; label: string; color: string }[] = [
    { id: 'idea', label: '1. Ideação & Briefing', color: 'border-blue-500/40 text-blue-400 bg-blue-500/10' },
    { id: 'creation', label: '2. Criação com IA', color: 'border-purple-500/40 text-purple-400 bg-purple-500/10' },
    { id: 'approval', label: '3. Aprovação Master (Gate)', color: 'border-amber-500/40 text-amber-400 bg-amber-500/10' },
    { id: 'scheduled', label: '4. Agendado & Disparo', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' },
  ];

  const moveCard = (id: string, direction: 'forward' | 'backward') => {
    const stageOrder: KanbanCard['stage'][] = ['idea', 'creation', 'approval', 'scheduled'];
    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const currentIdx = stageOrder.indexOf(c.stage);
        const newIdx = direction === 'forward' ? currentIdx + 1 : currentIdx - 1;
        if (newIdx >= 0 && newIdx < stageOrder.length) {
          return { ...c, stage: stageOrder[newIdx] };
        }
        return c;
      })
    );
  };

  return (
    <AdminGate>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> {t.modules.backToLanding}
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                <GitBranch className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t.nav.workflow}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Pipeline operacional e esteira de governança das publicações
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl self-start sm:self-auto">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Kanban className="w-4 h-4" /> Quadro Kanban
            </button>
            <button
              onClick={() => setViewMode('gates')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'gates'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ListOrdered className="w-4 h-4" /> Gates do Método
            </button>
          </div>
        </div>

        {/* VISUALIZAÇÃO 1: KANBAN BOARD */}
        {viewMode === 'kanban' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {stages.map((stage) => {
                const stageCards = cards.filter((c) => c.stage === stage.id);
                return (
                  <div
                    key={stage.id}
                    className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border uppercase tracking-wider ${stage.color}`}
                        >
                          {stage.label}
                        </span>
                        <span className="text-xs font-mono text-slate-500 font-bold">
                          {stageCards.length}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {stageCards.map((card) => (
                          <div
                            key={card.id}
                            className="bg-slate-950 border border-slate-800 hover:border-slate-700 p-4 rounded-xl space-y-3 shadow-md transition"
                          >
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-bold text-slate-400">{card.brand}</span>
                              <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono">
                                {card.format}
                              </span>
                            </div>

                            <h4 className="text-xs font-bold text-white leading-relaxed">
                              {card.title}
                            </h4>

                            <div className="text-[10px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-900">
                              <span>Resp: {card.owner}</span>
                              <div className="flex items-center gap-1">
                                {stage.id !== 'idea' && (
                                  <button
                                    onClick={() => moveCard(card.id, 'backward')}
                                    className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
                                    title="Voltar etapa"
                                  >
                                    &larr;
                                  </button>
                                )}
                                {stage.id !== 'scheduled' && (
                                  <button
                                    onClick={() => moveCard(card.id, 'forward')}
                                    className="p-1 rounded bg-slate-800 text-emerald-400 hover:text-emerald-300"
                                    title="Avançar etapa"
                                  >
                                    &rarr;
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        {stageCards.length === 0 && (
                          <div className="p-6 text-center text-xs text-slate-600 border border-dashed border-slate-800 rounded-xl">
                            Nenhum item nesta etapa
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VISUALIZAÇÃO 2: GATES DE SEGURANÇA */}
        {viewMode === 'gates' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((st) => (
              <article
                key={st.step}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between space-y-5 shadow-lg transition"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-700 font-mono">{st.step}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        st.status === 'Obrigatório (Gate)'
                          ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                          : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                      }`}
                    >
                      {st.status}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight">{st.name}</h2>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Responsável: <strong>{st.owner}</strong>
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 text-xs border-t border-slate-800/80">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <span className="font-bold text-slate-400 block">Entregável (Output):</span>
                      <p className="text-slate-300 text-[11px]">{st.output}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-400 font-medium">
                      <Shield className="w-3.5 h-3.5 shrink-0" />
                      <span>{st.gate}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
                  Próximo: {st.next}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </AdminGate>
  );
}
