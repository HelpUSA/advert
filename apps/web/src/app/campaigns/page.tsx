'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useLanguage } from '../../lib/LanguageContext';
import {
  Megaphone,
  ArrowLeft,
  Plus,
  CheckCircle2,
  Calendar,
  X,
  Search,
  Target,
  Share2,
} from 'lucide-react';

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
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    brand: 'HelpUS BR',
    objective: '',
    cadence: '3 posts / semana',
    channels: 'LinkedIn, Instagram',
    next: '',
  });

  const { t } = useLanguage();

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newCamp = {
      id: `camp-${Date.now()}`,
      name: formData.name.trim(),
      brand: formData.brand,
      objective: formData.objective.trim() || 'Aumento de conversão e autoridade',
      status: 'Ativa',
      cadence: formData.cadence.trim(),
      channels: formData.channels.trim(),
      readiness: 'Iniciada e vinculada à mesa operacional',
      next: formData.next.trim() || 'Gerar primeiros rascunhos com IA',
    };

    setCampaigns([newCamp, ...campaigns]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      brand: 'HelpUS BR',
      objective: '',
      cadence: '3 posts / semana',
      channels: 'LinkedIn, Instagram',
      next: '',
    });
  };

  const filteredCampaigns = campaigns.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.objective.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminGate>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 transition mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> {t.modules.backToLanding}
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-sky-400/10 text-sky-400 border border-sky-400/20">
                <Megaphone className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t.nav.campaigns}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Planejamento e esteira de campanhas multicanal
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar campanha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition"
              />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Nova Campanha
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((camp) => (
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

                <div className="space-y-2.5 pt-2 text-xs border-t border-slate-800/80">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-300 block">Cadência:</span>
                      <span className="text-slate-400 text-[11px]">{camp.cadence}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Share2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-300 block">Canais:</span>
                      <span className="text-slate-400 text-[11px]">{camp.channels}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-300 block">Próximo Passo:</span>
                      <span className="text-slate-400 text-[11px]">{camp.next}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-mono">{camp.readiness}</span>
                <span className="text-sky-400 font-bold hover:underline cursor-pointer">
                  Ver Esteira &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Modal de Nova Campanha */}
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
                <h3 className="text-xl font-bold text-white">Criar Nova Campanha</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Defina o objetivo, cadência e canais para a nova esteira de publicidade.
                </p>
              </div>

              <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Nome da Campanha *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Escala Q4 2026 • Lançamento de Oferta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-sky-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Marca Vinculada</label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-sky-400 focus:outline-none"
                  >
                    <option value="HelpUS BR">HelpUS BR</option>
                    <option value="Advert HelpUS BR">Advert HelpUS BR</option>
                    <option value="HelpUS CVSS">HelpUS CVSS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Objetivo Estratégico</label>
                  <input
                    type="text"
                    placeholder="Ex: Geração de leads qualificados para o comercial"
                    value={formData.objective}
                    onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-sky-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Cadência</label>
                    <input
                      type="text"
                      placeholder="Ex: 3 posts / semana"
                      value={formData.cadence}
                      onChange={(e) => setFormData({ ...formData, cadence: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Canais</label>
                    <input
                      type="text"
                      placeholder="LinkedIn, Instagram Ads"
                      value={formData.channels}
                      onChange={(e) => setFormData({ ...formData, channels: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-sky-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Primeiro Passo da Esteira</label>
                  <input
                    type="text"
                    placeholder="Ex: Gerar roteiros dos 3 primeiros vídeos"
                    value={formData.next}
                    onChange={(e) => setFormData({ ...formData, next: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-sky-400 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold shadow-md"
                  >
                    Salvar Campanha
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
