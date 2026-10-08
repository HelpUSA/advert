'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useLanguage } from '../../lib/LanguageContext';
import {
  CalendarDays,
  ArrowLeft,
  Plus,
  Clock,
  X,
  Share2,
  Calendar as CalendarIcon,
  List,
  Grid,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

interface Slot {
  id: string;
  date: string;
  channel: string;
  topic: string;
  campaign: string;
  status: string;
  statusColor: string;
  owner: string;
  next: string;
}

const defaultSlots: Slot[] = [
  {
    id: 'cal-1',
    date: '2026-10-10',
    channel: 'LinkedIn',
    topic: 'Por que operações próprias de publicidade eliminam custos com agências',
    campaign: 'Lançamento & Posicionamento Advert',
    status: 'Rascunho Pronto',
    statusColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    owner: 'Motor IA Criativo',
    next: 'Encaminhar para esteira de aprovação SuperAdmin',
  },
  {
    id: 'cal-2',
    date: '2026-10-12',
    channel: 'Instagram (@helpus.ecommerce)',
    topic: 'Checklist de Soluções Inteligentes em Tecnologia HelpUS',
    campaign: 'Autoridade & Alcance HelpUS 2026',
    status: 'Em Criação',
    statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    owner: 'Motor IA Criativo',
    next: 'Finalizar visual do carrossel no padrão Dark HelpUS',
  },
  {
    id: 'cal-3',
    date: '2026-10-15',
    channel: 'LinkedIn',
    topic: 'Mitigação Científica FIRST CVSS v4.0: Casos Práticos',
    campaign: 'Conscientização Científica CVSS v4.0',
    status: 'Em Revisão',
    statusColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    owner: 'SuperAdmin',
    next: 'Aprovar copy e agendar postagem automática',
  },
  {
    id: 'cal-4',
    date: '2026-10-18',
    channel: 'Site Oficial / Blog',
    topic: 'Novidades no Ecossistema Tecnológico HelpUS BR',
    campaign: 'Autoridade & Alcance HelpUS 2026',
    status: 'Agendado',
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    owner: 'Automação HelpUS',
    next: 'Disparo no feed e publicação no portal helpusbr.com',
  },
];

export default function CalendarPage() {
  const [slots, setSlots] = useState<Slot[]>(defaultSlots);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedChannel, setSelectedChannel] = useState<string>('todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    date: '2026-10-20',
    channel: 'LinkedIn',
    topic: '',
    campaign: 'Autoridade & Alcance HelpUS 2026',
    owner: 'Motor IA Criativo',
  });

  const { t } = useLanguage();

  // Carregar do localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('helpus_advert_calendar');
      if (saved) {
        setSlots(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Salvar no localStorage
  const saveSlots = (newSlots: Slot[]) => {
    setSlots(newSlots);
    try {
      localStorage.setItem('helpus_advert_calendar', JSON.stringify(newSlots));
    } catch {}
  };

  const handleCreateSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic.trim()) return;

    const newSlot: Slot = {
      id: `cal-${Date.now()}`,
      date: formData.date,
      channel: formData.channel,
      topic: formData.topic.trim(),
      campaign: formData.campaign,
      status: 'Agendado',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      owner: formData.owner,
      next: 'Aguardando data prevista de veiculação',
    };

    saveSlots([newSlot, ...slots]);
    setIsModalOpen(false);
    setFormData({
      date: '2026-10-20',
      channel: 'LinkedIn',
      topic: '',
      campaign: 'Autoridade & Alcance HelpUS 2026',
      owner: 'Motor IA Criativo',
    });
  };

  const handleDeleteSlot = (id: string) => {
    saveSlots(slots.filter((s) => s.id !== id));
  };

  const filteredSlots = slots.filter((s) => {
    if (selectedChannel === 'todos') return true;
    return s.channel.toLowerCase().includes(selectedChannel.toLowerCase());
  });

  // Dias do mês de Outubro 2026 (31 dias)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

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
                <CalendarDays className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t.nav.calendar}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Grade cronológica de publicações e programação editorial de Outubro 2026
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Alternância Grid / Lista */}
            <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Grade Mensal"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${
                  viewMode === 'list' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
                title="Visualização em Lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Agendar Publicação
            </button>
          </div>
        </div>

        {/* FILTRO POR CANAL */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-bold mr-1">Filtrar Canal:</span>
          {['todos', 'LinkedIn', 'Instagram', 'Site'].map((ch) => (
            <button
              key={ch}
              onClick={() => setSelectedChannel(ch)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition border cursor-pointer ${
                selectedChannel === ch
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {ch.toUpperCase()}
            </button>
          ))}
        </div>

        {/* 1. VISUALIZAÇÃO EM GRADE MENSAL (CALENDÁRIO INTERATIVO) */}
        {viewMode === 'grid' && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-emerald-400" />
                <span>Outubro de 2026</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {filteredSlots.length} publicações programadas
              </span>
            </div>

            {/* Grid dos Dias do Mês */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {daysInMonth.map((day) => {
                const dayString = `2026-10-${day < 10 ? `0${day}` : day}`;
                const dayEvents = filteredSlots.filter((s) => s.date === dayString);
                const hasEvents = dayEvents.length > 0;
                const isSelected = selectedDay === day;

                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDay(isSelected ? null : day)}
                    className={`min-h-[90px] p-2.5 rounded-xl border flex flex-col justify-between transition cursor-pointer ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-500/10'
                        : hasEvents
                        ? 'border-slate-700 bg-slate-950/80 hover:border-emerald-500/50'
                        : 'border-slate-800/60 bg-slate-950/30 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-bold ${hasEvents ? 'text-white' : 'text-slate-600'}`}>
                        {day < 10 ? `0${day}` : day}
                      </span>
                      {hasEvents && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      )}
                    </div>

                    {hasEvents ? (
                      <div className="space-y-1 mt-1">
                        {dayEvents.map((ev) => (
                          <div
                            key={ev.id}
                            className="text-[10px] p-1 rounded bg-slate-900 border border-slate-800 text-slate-200 truncate"
                            title={ev.topic}
                          >
                            <span className="font-bold text-emerald-400 mr-1">
                              {ev.channel.split(' ')[0]}:
                            </span>
                            {ev.topic}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-700 font-mono">Livre</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Detalhe do Dia Selecionado */}
            {selectedDay !== null && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Publicações para o dia {selectedDay}/10/2026:
                  </h3>
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="text-xs text-slate-500 hover:text-white"
                  >
                    Fechar
                  </button>
                </div>
                {filteredSlots.filter((s) => s.date === `2026-10-${selectedDay < 10 ? `0${selectedDay}` : selectedDay}`)
                  .length === 0 ? (
                  <p className="text-xs text-slate-400">Nenhuma postagem agendada para este dia.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {filteredSlots
                      .filter((s) => s.date === `2026-10-${selectedDay < 10 ? `0${selectedDay}` : selectedDay}`)
                      .map((ev) => (
                        <div key={ev.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-white">{ev.channel}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${ev.statusColor}`}>
                              {ev.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-medium">{ev.topic}</p>
                          <span className="text-[10px] text-slate-500 block">Campanha: {ev.campaign}</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 2. VISUALIZAÇÃO EM LISTA CRONOLÓGICA */}
        {viewMode === 'list' && (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSlots.map((slot) => (
              <article
                key={slot.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow-lg transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-amber-400 font-bold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {slot.date}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${slot.statusColor}`}
                    >
                      {slot.status}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-base font-bold text-white tracking-tight leading-snug">
                      {slot.topic}
                    </h2>
                    <span className="text-xs text-slate-400 block mt-1">
                      Campanha: <strong>{slot.campaign}</strong>
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 text-xs border-t border-slate-800 text-slate-300">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>{slot.channel}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Responsável: {slot.owner}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{slot.next}</span>
                  <button
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="p-1 rounded text-slate-500 hover:text-red-400 transition"
                    title="Excluir do calendário"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* MODAL PARA AGENDAR PUBLICAÇÃO */}
        {isModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-xl font-bold text-white">Agendar Publicação Editorial</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adicione uma nova pauta à grade do ecossistema HelpUS.
                </p>
              </div>

              <form onSubmit={handleCreateSlot} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Data de Postagem *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Tema / Pauta do Conteúdo *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Ex: Como configurar esteira de aprovação sem falhas"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Canal de Disparo</label>
                    <select
                      value={formData.channel}
                      onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-400 focus:outline-none"
                    >
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Instagram (@helpus.ecommerce)">Instagram</option>
                      <option value="Meta Ads">Meta Ads</option>
                      <option value="Site Oficial / Blog">Site Oficial / Blog</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Campanha</label>
                    <select
                      value={formData.campaign}
                      onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-emerald-400 focus:outline-none"
                    >
                      <option value="Autoridade & Alcance HelpUS 2026">Autoridade & Alcance HelpUS</option>
                      <option value="Lançamento & Posicionamento Advert">Posicionamento Advert</option>
                      <option value="Conscientização Científica CVSS v4.0">HelpUS CVSS v4.0</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-md cursor-pointer"
                  >
                    Salvar no Calendário
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </AdminGate>
  );
}
