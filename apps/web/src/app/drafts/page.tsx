'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useLanguage } from '../../lib/LanguageContext';
import {
  FileText,
  ArrowLeft,
  Plus,
  Sparkles,
  Send,
  CheckCircle2,
  Share2,
  Trash2,
  Check,
  Layers,
  Eye,
  X,
  Download,
  Image as ImageIcon,
} from 'lucide-react';

interface Draft {
  id: string;
  title: string;
  brand: string;
  channel: string;
  format: string;
  pillar: string;
  status: string;
  statusColor: string;
  cta: string;
  readiness: string;
  next: string;
  generatedImageTheme?: string;
}

const initialDrafts: Draft[] = [
  {
    id: 'draft-1',
    title: 'Por que operações próprias de publicidade transformam o ROI de marcas',
    brand: 'Advert HelpUS BR',
    channel: 'LinkedIn',
    format: 'Artigo & Post Executivo',
    pillar: 'Autoridade Técnica',
    status: 'Rascunho Pronto',
    statusColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    cta: 'Acompanhar a evolução do ecossistema HelpUS',
    readiness: 'Pronto para fila de aprovação',
    next: 'Encaminhar ao SuperAdmin para validação final',
    generatedImageTheme: 'from-blue-950 via-slate-900 to-indigo-950',
  },
  {
    id: 'draft-2',
    title: 'Checklist: 5 pilares de infraestrutura e IA para sua empresa crescer',
    brand: 'HelpUS BR',
    channel: 'Instagram (@helpus.ecommerce)',
    format: 'Carrossel Visual (7 slides)',
    pillar: 'Utilidade & Conteúdo Prático',
    status: 'Em Criação',
    statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    cta: 'Solicitar diagnóstico gratuito no portal helpusbr.com',
    readiness: 'Estruturação dos slides com IA Criativa HelpUS',
    next: 'Gerar artes visuais finais com a paleta Dark HelpUS',
    generatedImageTheme: 'from-amber-950/60 via-slate-900 to-slate-950',
  },
  {
    id: 'draft-3',
    title: 'FIRST CVSS v4.0 vs v3.1: Entenda o novo cálculo de risco cibernético',
    brand: 'HelpUS CVSS',
    channel: 'LinkedIn + Portal',
    format: 'Post Analítico & Whitepaper',
    pillar: 'Liderança Científica',
    status: 'Em Revisão',
    statusColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    cta: 'Simular vetores de risco em cvss.helpusbr.com',
    readiness: 'Aguardando decisão de aprovação',
    next: 'Validar copy técnica e disparar nos canais',
    generatedImageTheme: 'from-purple-950/60 via-slate-900 to-slate-950',
  },
];

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Draft[]>(initialDrafts);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [previewDraft, setPreviewDraft] = useState<Draft | null>(null);

  // Formulário do Gerador IA
  const [theme, setTheme] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('HelpUS BR');
  const [format, setFormat] = useState('Carrossel Visual (7 slides)');
  const [channel, setChannel] = useState('LinkedIn');

  const { t } = useLanguage();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('helpus_advert_drafts');
      if (saved) {
        setDrafts(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const saveDrafts = (newDrafts: Draft[]) => {
    setDrafts(newDrafts);
    try {
      localStorage.setItem('helpus_advert_drafts', JSON.stringify(newDrafts));
    } catch {}
  };

  const handleGenerateAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) return;

    setIsGenerating(true);

    const gradientThemes = [
      'from-blue-950 via-slate-900 to-indigo-950',
      'from-purple-950/60 via-slate-900 to-slate-950',
      'from-emerald-950/60 via-slate-900 to-slate-950',
      'from-amber-950/60 via-slate-900 to-slate-950',
    ];
    const randomTheme = gradientThemes[Math.floor(Math.random() * gradientThemes.length)];

    setTimeout(() => {
      const newDraft: Draft = {
        id: `draft-${Date.now()}`,
        title: theme.trim(),
        brand: selectedBrand,
        channel: channel,
        format: format,
        pillar: 'Autoridade & Conversão',
        status: 'Rascunho Pronto (Gerado IA)',
        statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        cta: 'Conheça o ecossistema HelpUS e fale no WhatsApp',
        readiness: 'Copy e arte visual geradas com sucesso',
        next: 'Enviar para esteira de aprovação Master',
        generatedImageTheme: randomTheme,
      };

      const updated = [newDraft, ...drafts];
      saveDrafts(updated);
      setIsGenerating(false);
      setTheme('');
      setNotification(`Criativo e Arte Visual "${newDraft.title}" gerados com sucesso!`);
      setPreviewDraft(newDraft);
      setTimeout(() => setNotification(null), 5000);
    }, 1200);
  };

  const handleDelete = (id: string) => {
    saveDrafts(drafts.filter((d) => d.id !== id));
  };

  return (
    <AdminGate>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-purple-400 transition mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> {t.modules.backToLanding}
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-purple-400/10 text-purple-400 border border-purple-400/20">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {t.nav.drafts}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Rascunhos e criativos de conteúdo gerados com IA Criativa HelpUS
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/approvals"
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ir para Aprovações
          </Link>
        </div>

        {/* NOTIFICAÇÃO DE SUCESSO */}
        {notification && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* GERADOR DE CRIATIVOS COM IA */}
        <section className="bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border-2 border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Motor IA de Criação de Rascunhos & Artes</h2>
              <p className="text-xs text-slate-400">
                Gere roteiros, carrosséis, anúncios e prévias visuais instantâneas com a IA da HelpUS.
              </p>
            </div>
          </div>

          <form onSubmit={handleGenerateAI} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">
                Tema, Gancho ou Briefing do Conteúdo *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Ex: Como empresas tradicionais perdem clientes ao demorar dias para aprovar criativos..."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-purple-400 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Marca / Cliente</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-400 focus:outline-none"
                >
                  <option value="HelpUS BR">HelpUS BR</option>
                  <option value="Advert HelpUS BR">Advert HelpUS BR</option>
                  <option value="HelpUS CVSS">HelpUS CVSS</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Formato do Criativo</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-400 focus:outline-none"
                >
                  <option value="Carrossel Visual (7 slides)">Carrossel Visual (7 slides)</option>
                  <option value="Roteiro de Vídeo (Reels / TikTok)">Roteiro de Vídeo (Reels / TikTok)</option>
                  <option value="Anúncio de Tráfego Pago (Conversão)">Anúncio de Tráfego Pago (Conversão)</option>
                  <option value="Artigo & Post Executivo">Artigo & Post Executivo</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Canal Principal</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-400 focus:outline-none"
                >
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Instagram (@helpus.ecommerce)">Instagram</option>
                  <option value="Meta Ads / Google Search">Meta Ads / Google Search</option>
                  <option value="Portal Oficial">Portal Oficial</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-600/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'Gerando Copy & Arte com IA...' : '⚡ Gerar Rascunho com IA'}</span>
              </button>
            </div>
          </form>
        </section>

        {/* LISTAGEM DE RASCUNHOS ATIVOS */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Rascunhos no Pipeline ({drafts.length})</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drafts.map((draft) => (
              <article
                key={draft.id}
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-6 rounded-2xl flex flex-col justify-between space-y-5 shadow-lg transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-purple-400 border border-slate-700">
                      {draft.brand}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${draft.statusColor}`}
                    >
                      {draft.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">{draft.title}</h3>

                  <div className="space-y-1.5 pt-2 text-xs border-t border-slate-800 text-slate-300">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-purple-400" />
                      <span>{draft.format}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Share2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>{draft.channel}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-[11px] space-y-1">
                    <span className="font-bold text-slate-400 block">Chamada para Ação (CTA):</span>
                    <p className="text-slate-300 italic">{draft.cta}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setPreviewDraft(draft)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ver Arte</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <Link
                      href="/approvals"
                      className="text-xs font-bold text-purple-400 hover:underline flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" />
                    </Link>

                    <button
                      onClick={() => handleDelete(draft.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition cursor-pointer"
                      title="Excluir rascunho"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* MODAL DE PRÉ-VISUALIZAÇÃO DA ARTE VISUAL DO CRIATIVO */}
        {previewDraft && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          >
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
              <button
                onClick={() => setPreviewDraft(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded">
                    Prévia Visual do Criativo
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{previewDraft.brand}</h3>
                </div>
                <span className="text-xs text-slate-400 font-mono">{previewDraft.channel}</span>
              </div>

              {/* CARD VISUAL SIMULADO (POST DE REDE SOCIAL) */}
              <div
                className={`w-full aspect-[4/3] rounded-2xl p-6 bg-gradient-to-br ${
                  previewDraft.generatedImageTheme || 'from-blue-950 via-slate-900 to-indigo-950'
                } border border-slate-700 flex flex-col justify-between shadow-2xl relative overflow-hidden`}
              >
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <img
                      src="/img/helpus-logo.png"
                      alt="HelpUS Logo"
                      className="w-7 h-7 rounded-full object-contain border border-amber-400/40"
                    />
                    <div>
                      <span className="text-xs font-black text-white block leading-tight">{previewDraft.brand}</span>
                      <span className="text-[9px] text-amber-400 font-bold uppercase">Operações de Mídia</span>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 border border-slate-800">
                    {previewDraft.format.split(' ')[0]}
                  </span>
                </div>

                <div className="z-10 space-y-2 my-auto">
                  <h4 className="text-base sm:text-lg font-black text-white leading-tight drop-shadow-md">
                    {previewDraft.title}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    Acelere o crescimento da sua marca com tecnologia proprietária, produção contínua e esteira executiva de aprovações.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 z-10">
                  <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> HelpUS Ad Engine
                  </span>
                  <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-amber-400 text-slate-950">
                    Saiba Mais
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/approvals"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-md flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" /> Enviar para Aprovação Master
                </Link>

                <button
                  onClick={() => setPreviewDraft(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </AdminGate>
  );
}
