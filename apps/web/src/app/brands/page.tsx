'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useLanguage } from '../../lib/LanguageContext';
import { Building2, ArrowLeft, Plus, Globe, Share2, Target, CheckCircle2 } from 'lucide-react';

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
    goal: 'Mesa de operações de marketing orientada a eventos e IA Watcher para canais próprios.',
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
  const [brands] = useState(initialBrands);
  const { t } = useLanguage();

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

          <button className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition flex items-center gap-2">
            <Plus className="w-4 h-4" /> Nova Marca
          </button>
        </div>

        {/* Grade de Marcas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
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
      </main>
    </AdminGate>
  );
}
