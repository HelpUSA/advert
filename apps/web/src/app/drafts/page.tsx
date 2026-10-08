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
  RefreshCw,
  Camera,
  Boxes,
  Palette,
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
  imageUrl?: string;
  imageStyle?: string;
  engine?: string;
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
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1080&auto=format&fit=crop&q=80',
    imageStyle: 'realistic_photo',
    engine: 'HelpUS Real-Photo AI Engine',
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
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1080&auto=format&fit=crop&q=80',
    imageStyle: 'tech_3d',
    engine: 'HelpUS 3D CyberTech AI Engine',
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
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1080&auto=format&fit=crop&q=80',
    imageStyle: 'tech_3d',
    engine: 'HelpUS 3D CyberTech AI Engine',
  },
];

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<Draft[]>(initialDrafts);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegeneratingImage, setIsRegeneratingImage] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [previewDraft, setPreviewDraft] = useState<Draft | null>(null);

  // Formulário do Gerador IA
  const [theme, setTheme] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('HelpUS BR');
  const [format, setFormat] = useState('Carrossel Visual (7 slides)');
  const [channel, setChannel] = useState('LinkedIn');
  const [visualStyle, setVisualStyle] = useState<'realistic_photo' | 'tech_3d' | 'vector_dark'>('realistic_photo');

  const { t, language } = useLanguage();
  const isEn = language === 'en';
  const isEs = language === 'es';

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

  const handleGenerateAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!theme.trim()) return;

    setIsGenerating(true);

    try {
      // Chamada real ao endpoint de IA Gerativa de Imagem & Layout
      const imgRes = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: theme.trim(),
          brand: selectedBrand,
          format: format,
          channel: channel,
          style: visualStyle,
        }),
      });

      const imgData = await imgRes.json();

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
        readiness: 'Copy e arte fotográfica geradas com sucesso',
        next: 'Enviar para esteira de aprovação Master',
        generatedImageTheme: 'from-blue-950 via-slate-900 to-indigo-950',
        imageUrl: imgData.imageUrl || undefined,
        imageStyle: visualStyle,
        engine: imgData.engine || 'HelpUS Real-Photo AI Engine',
      };

      const updated = [newDraft, ...drafts];
      saveDrafts(updated);
      setTheme('');
      setNotification(`Criativo e Arte "${newDraft.title}" gerados com sucesso pela IA!`);
      setPreviewDraft(newDraft);
      setTimeout(() => setNotification(null), 5000);
    } catch (err: any) {
      alert(`Falha ao gerar com IA: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerateArt = async (draft: Draft) => {
    setIsRegeneratingImage(true);
    try {
      const imgRes = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: draft.title,
          brand: draft.brand,
          format: draft.format,
          channel: draft.channel,
          style: draft.imageStyle || 'realistic_photo',
        }),
      });
      const imgData = await imgRes.json();
      if (imgData.success && imgData.imageUrl) {
        const updated = drafts.map((d) =>
          d.id === draft.id ? { ...d, imageUrl: imgData.imageUrl, engine: imgData.engine } : d
        );
        saveDrafts(updated);
        const updatedTarget = { ...draft, imageUrl: imgData.imageUrl, engine: imgData.engine };
        setPreviewDraft(updatedTarget);
      }
    } catch (err: any) {
      alert('Erro ao regenerar arte: ' + err.message);
    } finally {
      setIsRegeneratingImage(false);
    }
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
                  Rascunhos, copys e artes fotográficas geradas com IA Criativa HelpUS
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Motor IA de Criação de Rascunhos & Artes</h2>
                <p className="text-xs text-slate-400">
                  Gere cópias persuasivas e imagens fotográficas realistas instantâneas com a IA da HelpUS.
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Real Photo & 3D AI Ativo
            </span>
          </div>

          <form onSubmit={handleGenerateAI} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-bold mb-1.5">
                Tema, Gancho ou Briefing do Conteúdo *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Ex: Executivo analisando dashboard de ROI de publicidade em sala de reuniões corporativa de alta tecnologia..."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:border-purple-400 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <option value="CG Details Studio">CG Details Studio</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Formato do Criativo</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:border-purple-400 focus:outline-none"
                >
                  <option value="Carrossel Visual (7 slides)">Carrossel Visual (Square 1:1)</option>
                  <option value="Roteiro de Vídeo (Reels / TikTok)">Vídeo / Stories (Reels 9:16)</option>
                  <option value="Anúncio de Tráfego Pago (Conversão)">Banner de Tráfego (1.91:1)</option>
                  <option value="Artigo & Post Executivo">Artigo Executivo (Landscape)</option>
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
                  <option value="Meta Ads / Google Search">Meta Ads / Google Ads</option>
                  <option value="Portal Oficial">Portal Oficial</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Estilo Visual da IA</label>
                <select
                  value={visualStyle}
                  onChange={(e) => setVisualStyle(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-purple-500/50 text-purple-300 font-medium focus:border-purple-400 focus:outline-none"
                >
                  <option value="realistic_photo">📸 Fotografia Realista (Estúdio)</option>
                  <option value="tech_3d">🌐 3D Cyber-Tech (Neon Dark)</option>
                  <option value="vector_dark">🎨 Layout Vetorial Dark HelpUS</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold shadow-lg shadow-purple-600/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>
                  {isGenerating
                    ? 'Gerando Copy & Arte com IA Generativa...'
                    : '⚡ Gerar Copy & Arte com IA'}
                </span>
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
                className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl flex flex-col justify-between overflow-hidden shadow-lg transition"
              >
                {/* Thumbnail Visual se houver */}
                {draft.imageUrl && (
                  <div className="w-full h-44 bg-slate-950 relative overflow-hidden group">
                    <img
                      src={draft.imageUrl}
                      alt={draft.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-white border border-white/10 flex items-center gap-1">
                      <Camera className="w-3 h-3 text-amber-400" />
                      {draft.imageStyle === 'tech_3d' ? '3D Render' : 'Foto IA'}
                    </span>
                  </div>
                )}

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
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

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setPreviewDraft(draft)}
                      className="px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-purple-500/30"
                    >
                      <Eye className="w-3.5 h-3.5 text-purple-400" />
                      <span>Ver Arte Completa</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <Link
                        href="/approvals"
                        className="p-2 rounded-xl bg-slate-800 text-purple-400 hover:text-white transition"
                        title="Enviar para aprovação"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleDelete(draft.id)}
                        className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-slate-800 transition cursor-pointer"
                        title="Excluir rascunho"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          >
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setPreviewDraft(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded">
                    Arte Fotográfica & Criativo de IA
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">{previewDraft.brand}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-mono block">{previewDraft.channel}</span>
                  {previewDraft.engine && (
                    <span className="text-[10px] text-amber-400 font-semibold">{previewDraft.engine}</span>
                  )}
                </div>
              </div>

              {/* ARTE VISUAL REAL (IMAGEM FOTOGRÁFICA GERADA COM IA) */}
              <div className="w-full rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 relative shadow-2xl">
                {previewDraft.imageUrl ? (
                  <div className="relative group">
                    <img
                      src={previewDraft.imageUrl}
                      alt={previewDraft.title}
                      className="w-full max-h-[440px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src="/img/helpus-logo.png"
                          alt="HelpUS Logo"
                          className="w-6 h-6 rounded-full object-contain border border-amber-400/50"
                        />
                        <span className="text-xs font-black text-white">{previewDraft.brand}</span>
                      </div>
                      <h4 className="text-lg font-black text-white leading-tight drop-shadow-md">
                        {previewDraft.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                        {previewDraft.cta}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`w-full aspect-[4/3] p-6 bg-gradient-to-br ${
                      previewDraft.generatedImageTheme || 'from-blue-950 via-slate-900 to-indigo-950'
                    } flex flex-col justify-between`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{previewDraft.brand}</span>
                      <span className="text-xs text-slate-400">{previewDraft.format}</span>
                    </div>
                    <h4 className="text-lg font-black text-white">{previewDraft.title}</h4>
                    <p className="text-xs text-slate-300">{previewDraft.cta}</p>
                  </div>
                )}
              </div>

              {/* AÇÕES DE EXPORTAÇÃO E REGENERAÇÃO */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRegenerateArt(previewDraft)}
                    disabled={isRegeneratingImage}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRegeneratingImage ? 'animate-spin' : ''}`} />
                    <span>{isRegeneratingImage ? 'Regenerando...' : 'Regenerar Imagem'}</span>
                  </button>

                  {previewDraft.imageUrl && (
                    <a
                      href={previewDraft.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download="arte-helpus.jpg"
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Baixar Imagem</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href="/approvals"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs transition shadow-md flex items-center gap-2"
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
          </div>
        )}
      </main>
    </AdminGate>
  );
}
