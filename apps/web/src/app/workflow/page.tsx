'use client';

import React from 'react';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useLanguage } from '../../lib/LanguageContext';
import { GitBranch, ArrowLeft, Shield } from 'lucide-react';

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
  const { t } = useLanguage();

  return (
    <AdminGate>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 transition mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> {t.modules.backToLanding}
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-blue-400/10 text-blue-400 border border-blue-400/20">
                <GitBranch className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t.nav.workflow}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Esteira de automação ponta a ponta com portões de segurança e conformidade
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Shield className="w-4 h-4 text-sky-400" />
            <span>Esteira Segura com Portão de Aprovação</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((item) => (
            <article
              key={item.step}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between space-y-5 shadow-lg transition"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                    Etapa {item.step}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.status}
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">{item.name}</h2>
                  <p className="text-xs text-sky-400 font-semibold mt-1">
                    Portão: {item.gate}
                  </p>
                </div>

                <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block">Entrega Gerada:</span>
                    <span className="text-slate-200 text-[11px] leading-relaxed block">
                      {item.output}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">Responsável:</span>
                    <span className="text-slate-300">{item.owner}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                  Próximo passo:
                </span>
                <p className="text-slate-300 text-[11px]">{item.next}</p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </AdminGate>
  );
}
