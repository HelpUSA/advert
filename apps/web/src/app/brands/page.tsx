'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useLanguage } from '../../lib/LanguageContext';
import {
  Building2,
  ArrowLeft,
  Plus,
  Globe,
  Share2,
  Target,
  CheckCircle2,
  X,
  Search,
  Check,
} from 'lucide-react';

const initialBrands = [
  {
    id: 'helpus-global',
    name: 'HelpUS LLC / HelpUS BR',
    type: 'Empresa Matriz / Core',
    status: 'Ativo',
    goal: 'Promover soluções corporativas, serviços de tecnologia e o hub de inovação.',
    audience: 'Empresas, empreendedores e clientes de alta exigência tecnológica.',
    offer: 'Consultoria, arquitetura de software e automação inteligente.',
    channels: ['Site Oficial', 'LinkedIn', 'Instagram (@helpus.ecommerce)', 'Google'],
  },
  {
    id: 'helpus-advert',
    name: 'Advert HelpUS BR',
    type: 'Produto Proprietário',
    status: 'Operacional',
    goal: 'Mesa de operações de marketing orientada a eventos e Motor IA Criativo para canais próprios.',
    audience: 'Gestores internos, analistas de mídia e marcas assistidas.',
    offer: 'Operações de publicidade sem intermediários.',
    channels: ['advert.helpusbr.com', 'Docs', 'LinkedIn'],
  },
  {
    id: 'helpus-cvss',
    name: 'HelpUS CVSS',
    type: 'Solução Científica',
    status: 'Ativo',
    goal: 'Posicionamento de autoridade em cibersegurança e conformidade FIRST CVSS v4.0.',
    audience: 'Especialistas de segurança, compliance e C-levels de tecnologia.',
    offer: 'Calculadora e simulador de mitigação de vulnerabilidades com IA.',
    channels: ['cvss.helpusbr.com', 'LinkedIn', 'GitHub'],
  },
];

export default function BrandsPage() {
  const [brands, setBrands] = useState(initialBrands);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Cliente Corporativo',
    offer: '',
    goal: '',
    audience: '',
    channels: '',
  });

  const { t } = useLanguage();

  const handleCreateBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newBrand = {
      id: `brand-${Date.now()}`,
      name: formData.name.trim(),
      type: formData.type.trim(),
      status: 'Ativo',
      offer: formData.offer.trim() || 'Serviços e posicionamento de marca',
      goal: formData.goal.trim() || 'Crescimento e captação de clientes qualificados',
      audience: formData.audience.trim() || 'Público corporativo e consumidores finais',
      channels: formData.channels
        ? formData.channels.split(',').map((c) => c.trim()).filter(Boolean)
        : ['Instagram', 'LinkedIn'],
    };

    setBrands([newBrand, ...brands]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      type: 'Cliente Corporativo',
      offer: '',
      goal: '',
      audience: '',
      channels: '',
    });
  };

  const filteredBrands = brands.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.offer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminGate>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Topo / Voltar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> {t.modules.backToLanding}
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t.nav.brands}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Cadastro central de marcas e clientes operados pelo SuperAdmin
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar marca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Nova Marca
            </button>
          </div>
        </div>

        {/* Grade de Marcas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <article
              key={brand.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between space-y-5 shadow-lg transition"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {brand.type}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> {brand.status}
                  </span>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">{brand.name}</h2>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{brand.offer}</p>
                </div>

                <div className="space-y-2.5 pt-2 text-xs border-t border-slate-800/80">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-300 block">Objetivo:</span>
                      <span className="text-slate-400 text-[11px]">{brand.goal}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Globe className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-300 block">Público-Alvo:</span>
                      <span className="text-slate-400 text-[11px]">{brand.audience}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1">
                  <Share2 className="w-3 h-3 text-slate-400" /> Canais Conectados
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {brand.channels.map((ch) => (
                    <span
                      key={ch}
                      className="text-[10px] bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-slate-300 font-mono"
                    >
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal de Nova Marca */}
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
                <h3 className="text-xl font-bold text-white">Cadastrar Nova Marca</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adicione uma nova empresa para gerenciar conteúdo e campanhas na mesa HelpUS.
                </p>
              </div>

              <form onSubmit={handleCreateBrand} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Nome da Marca / Cliente *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Prime Odonto, TechFlow AI"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Tipo de Operação</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Cliente Corporativo">Cliente Corporativo</option>
                    <option value="Produto Proprietário">Produto Proprietário</option>
                    <option value="Empresa Matriz / Core">Empresa Matriz / Core</option>
                    <option value="Parceiro Estratégico">Parceiro Estratégico</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Oferta Principal / Posicionamento</label>
                  <input
                    type="text"
                    placeholder="Ex: Consultoria de tecnologia e IA aplicada"
                    value={formData.offer}
                    onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Objetivo Estratégico</label>
                    <input
                      type="text"
                      placeholder="Ex: Gerar leads B2B"
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Público-Alvo</label>
                    <input
                      type="text"
                      placeholder="Ex: C-levels, médicos"
                      value={formData.audience}
                      onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Canais (separados por vírgula)</label>
                  <input
                    type="text"
                    placeholder="Instagram, LinkedIn, Google Ads, Site Oficial"
                    value={formData.channels}
                    onChange={(e) => setFormData({ ...formData, channels: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-amber-400 focus:outline-none"
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
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-md"
                  >
                    Salvar Marca
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
