'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminGate from '../../components/AdminGate';
import { useLanguage } from '../../lib/LanguageContext';
import {
  Share2,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  Database,
  CloudUpload,
  CloudDownload,
  AlertCircle,
  ExternalLink,
  Zap,
  Server,
  Code,
  Copy,
  Check,
} from 'lucide-react';

export default function IntegrationsPage() {
  const { language } = useLanguage();

  const isEn = language === 'en';
  const isEs = language === 'es';

  // Configs state with local storage persistence
  const [metaPixelId, setMetaPixelId] = useState('194820948204918');
  const [metaAccessToken, setMetaAccessToken] = useState('EAAX...helpus_meta_prod_token');
  const [linkedInOrgId, setLinkedInOrgId] = useState('urn:li:organization:9847192');
  const [googleAdsId, setGoogleAdsId] = useState('941-840-2918');

  // Supabase Database Configs
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [supabaseTesting, setSupabaseTesting] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState<{ success: boolean; msg: string; time?: string } | null>(null);
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // Test Webhook status
  const [webhookTesting, setWebhookTesting] = useState(false);
  const [webhookResult, setWebhookResult] = useState<{ success: boolean; msg: string; time?: string } | null>(null);

  // Cloud Sync status
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ success: boolean; msg: string; time?: string; source?: string } | null>(null);

  // Load from local storage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMeta = localStorage.getItem('advert_meta_pixel');
      if (savedMeta) setMetaPixelId(savedMeta);
      const savedLinkedIn = localStorage.getItem('advert_linkedin_org');
      if (savedLinkedIn) setLinkedInOrgId(savedLinkedIn);
      const savedGoogle = localStorage.getItem('advert_google_ads');
      if (savedGoogle) setGoogleAdsId(savedGoogle);
      const savedSupaUrl = localStorage.getItem('advert_supabase_url');
      if (savedSupaUrl) setSupabaseUrl(savedSupaUrl);
      const savedSupaKey = localStorage.getItem('advert_supabase_key');
      if (savedSupaKey) setSupabaseKey(savedSupaKey);
    }
  }, []);

  const handleSaveTokens = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('advert_meta_pixel', metaPixelId);
      localStorage.setItem('advert_linkedin_org', linkedInOrgId);
      localStorage.setItem('advert_google_ads', googleAdsId);
      localStorage.setItem('advert_supabase_url', supabaseUrl);
      localStorage.setItem('advert_supabase_key', supabaseKey);
    }
    alert(
      isEn
        ? 'API Tokens & Supabase settings saved locally!'
        : isEs
        ? '¡Tokens de API y configuración de Supabase guardados localmente!'
        : 'Tokens de API e configurações do Supabase salvos localmente!'
    );
  };

  const handleTestSupabase = async () => {
    setSupabaseTesting(true);
    setSupabaseStatus(null);
    try {
      const url = supabaseUrl
        ? `/api/data?supabaseUrl=${encodeURIComponent(supabaseUrl)}&supabaseKey=${encodeURIComponent(supabaseKey)}`
        : '/api/data';

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data.success) {
        if (data.source === 'supabase') {
          setSupabaseStatus({
            success: true,
            msg: isEn
              ? 'Supabase / PostgreSQL connection established and table advert_sync accessible!'
              : isEs
              ? '¡Conexión Supabase / PostgreSQL establecida y tabla advert_sync accesible!'
              : 'Conexão com Supabase / PostgreSQL estabelecida e tabela advert_sync acessível!',
            time: new Date().toLocaleTimeString(),
          });
        } else {
          setSupabaseStatus({
            success: true,
            msg: isEn
              ? 'Local JSON disk replica is active. Configure URL and Key to switch to direct Supabase PostgreSQL.'
              : isEs
              ? 'La réplica de disco JSON local está activa. Configure URL y Key para alternar a Supabase PostgreSQL.'
              : 'Armazenamento em disco JSON ativo. Informe URL e Key para sincronização direta ao Supabase PostgreSQL.',
            time: new Date().toLocaleTimeString(),
          });
        }
      } else {
        setSupabaseStatus({
          success: false,
          msg: `Erro ao testar conexão: ${data.error || 'Falha desconhecida'}`,
        });
      }
    } catch (err: unknown) {
      setSupabaseStatus({
        success: false,
        msg: `Falha na requisição: ${err instanceof Error ? err.message : String(err)}`,
      });
    } finally {
      setSupabaseTesting(false);
    }
  };

  const handleTestWebhook = async (network: 'meta' | 'linkedin' | 'google') => {
    setWebhookTesting(true);
    setWebhookResult(null);
    try {
      const res = await fetch('/api/webhooks/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: network,
          event: 'conversion_test',
          data: {
            brand: 'CG Details Studio',
            campaign: 'Black November 2026',
            timestamp: new Date().toISOString(),
          },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setWebhookResult({
          success: true,
          msg: `${network.toUpperCase()} Webhook Handshake OK: ${data.message || 'Status 200'}`,
          time: new Date().toLocaleTimeString(),
        });
      } else {
        setWebhookResult({
          success: false,
          msg: `Erro no Webhook: ${data.error || 'Falha de conexão'}`,
        });
      }
    } catch (err: unknown) {
      setWebhookResult({
        success: false,
        msg: `Falha de rede ao disparar webhook: ${err instanceof Error ? err.message : String(err)}`,
      });
    } finally {
      setWebhookTesting(false);
    }
  };

  const handleCloudSync = async () => {
    setSyncing(true);
    setSyncStatus(null);
    try {
      // Coleta dados locais para sincronização
      const payload = {
        updatedAt: new Date().toISOString(),
        customSupabaseUrl: supabaseUrl || undefined,
        customSupabaseKey: supabaseKey || undefined,
        integrations: {
          metaPixelId,
          linkedInOrgId,
          googleAdsId,
        },
        approvalsState: typeof window !== 'undefined' ? localStorage.getItem('advert_approvals') : null,
        campaignsState: typeof window !== 'undefined' ? localStorage.getItem('advert_campaigns') : null,
      };

      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setSyncStatus({
          success: true,
          source: data.source,
          msg: data.message || 'Dados sincronizados com o servidor central HelpUS.',
          time: new Date().toLocaleTimeString(),
        });
      } else {
        setSyncStatus({
          success: false,
          msg: `Erro na sincronização: ${data.error || 'Falha'}`,
        });
      }
    } catch (err: unknown) {
      setSyncStatus({
        success: false,
        msg: `Falha ao conectar com o endpoint de dados: ${err instanceof Error ? err.message : String(err)}`,
      });
    } finally {
      setSyncing(false);
    }
  };

  const sqlCode = `-- SQL para Supabase / PostgreSQL (Executar no SQL Editor do Supabase)
CREATE TABLE IF NOT EXISTS public.advert_sync (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_by TEXT DEFAULT 'helpus.ecommerce@gmail.com'
);

CREATE INDEX IF NOT EXISTS idx_advert_sync_key ON public.advert_sync (key);
ALTER TABLE public.advert_sync ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read advert_sync" ON public.advert_sync FOR SELECT USING (true);
CREATE POLICY "Allow upsert advert_sync" ON public.advert_sync FOR ALL USING (true) WITH CHECK (true);`;

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <AdminGate>
      <div className="min-w-0 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        {/* Header de Navegação */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-cyan-400 font-semibold mb-1">
              <Share2 className="w-4 h-4" />
              <span>
                {isEn
                  ? 'API Integrations & Supabase Database'
                  : isEs
                  ? 'Integraciones de API y Base de Datos Supabase'
                  : 'Integrações de API & Banco de Dados Supabase'}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {isEn ? 'Network APIs & Cloud DB' : isEs ? 'APIs de Redes y Base en la Nube' : 'APIs de Redes & Banco em Nuvem'}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {isEn
                ? 'Manage active tokens for Meta, LinkedIn, Google Ads, and sync live state to Supabase / PostgreSQL.'
                : isEs
                ? 'Administre tokens para Meta, LinkedIn, Google Ads y sincronice datos en vivo con Supabase / PostgreSQL.'
                : 'Gerencie tokens para Meta, LinkedIn, Google Ads e sincronize o estado em tempo real com o Supabase / PostgreSQL.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gray-900 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              {isEn ? 'Back to Landing' : isEs ? 'Volver a la Presentación' : 'Volver à Apresentação'}
            </Link>
          </div>
        </div>

        {/* Notificações de Status */}
        {webhookResult && (
          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              webhookResult.success
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {webhookResult.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <span className="text-sm font-medium">{webhookResult.msg}</span>
            </div>
            {webhookResult.time && <span className="text-xs text-gray-400">{webhookResult.time}</span>}
          </div>
        )}

        {supabaseStatus && (
          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              supabaseStatus.success
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {supabaseStatus.success ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <span className="text-sm font-medium">{supabaseStatus.msg}</span>
            </div>
            {supabaseStatus.time && <span className="text-xs text-gray-400">{supabaseStatus.time}</span>}
          </div>
        )}

        {syncStatus && (
          <div
            className={`p-4 rounded-xl border flex items-center justify-between ${
              syncStatus.success
                ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-300'
                : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {syncStatus.success ? (
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              )}
              <div>
                <span className="text-sm font-medium">{syncStatus.msg}</span>
                {syncStatus.source && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-900/60 text-cyan-300 border border-cyan-700/50">
                    Origem: {syncStatus.source === 'supabase' ? 'Supabase PostgreSQL' : 'Disco Local JSON'}
                  </span>
                )}
              </div>
            </div>
            {syncStatus.time && <span className="text-xs text-gray-400">{syncStatus.time}</span>}
          </div>
        )}

        {/* Grid de Configurações - 4 Colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Supabase PostgreSQL */}
          <div className="bg-gradient-to-b from-gray-900/90 to-gray-950/90 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm shadow-lg shadow-emerald-950/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Supabase / SQL</h2>
                  <p className="text-xs text-gray-400">PostgreSQL Central</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Realtime
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Project URL</label>
                <input
                  type="text"
                  placeholder="https://xyz.supabase.co"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Anon / Service Key</label>
                <input
                  type="password"
                  placeholder="eyJhbGciOi..."
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleTestSupabase}
                  disabled={supabaseTesting}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 transition disabled:opacity-50"
                >
                  <Server className="w-3.5 h-3.5" />
                  {supabaseTesting ? 'Testando...' : isEn ? 'Test Connection' : isEs ? 'Probar Conexión' : 'Testar Conexão'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowSqlModal(!showSqlModal)}
                  className="text-[11px] text-gray-400 hover:text-emerald-400 text-center transition flex items-center justify-center gap-1"
                >
                  <Code className="w-3 h-3" />
                  {showSqlModal ? 'Ocultar Script SQL' : 'Ver Schema SQL da Tabela'}
                </button>
              </div>
            </div>
          </div>

          {/* Card Meta Graph API */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                  M
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Meta Graph API</h2>
                  <p className="text-xs text-gray-400">Instagram & Facebook</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live API
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Pixel ID</label>
                <input
                  type="text"
                  value={metaPixelId}
                  onChange={(e) => setMetaPixelId(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Access Token</label>
                <input
                  type="password"
                  value={metaAccessToken}
                  onChange={(e) => setMetaAccessToken(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleTestWebhook('meta')}
                  disabled={webhookTesting}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5" />
                  {isEn ? 'Test Handshake' : isEs ? 'Probar Conexión' : 'Testar Handshake'}
                </button>
              </div>
            </div>
          </div>

          {/* Card LinkedIn Marketing */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
                  in
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">LinkedIn Marketing</h2>
                  <p className="text-xs text-gray-400">Sponsored Ads</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active v2
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Organization URN</label>
                <input
                  type="text"
                  value={linkedInOrgId}
                  onChange={(e) => setLinkedInOrgId(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">OAuth Scope</label>
                <div className="w-full bg-gray-950/70 border border-gray-800/80 rounded-xl px-3 py-2 text-xs font-mono text-gray-400 truncate">
                  rw_organization_admin
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleTestWebhook('linkedin')}
                  disabled={webhookTesting}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 transition disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5" />
                  {isEn ? 'Test Handshake' : isEs ? 'Probar Conexión' : 'Testar Handshake'}
                </button>
              </div>
            </div>
          </div>

          {/* Card Google Ads API */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                  G
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Google Ads API</h2>
                  <p className="text-xs text-gray-400">Search & Display</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Linked
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Customer ID (MCC)</label>
                <input
                  type="text"
                  value={googleAdsId}
                  onChange={(e) => setGoogleAdsId(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Conversion Webhook</label>
                <div className="w-full bg-gray-950/70 border border-gray-800/80 rounded-xl px-3 py-2 text-xs font-mono text-gray-400 truncate">
                  /api/webhooks/social?google
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleTestWebhook('google')}
                  disabled={webhookTesting}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 transition disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5" />
                  {isEn ? 'Test Handshake' : isEs ? 'Probar Conexión' : 'Testar Handshake'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal / Bloco de Schema SQL */}
        {showSqlModal && (
          <div className="bg-gray-950 border border-emerald-500/40 rounded-2xl p-6 relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <Code className="w-4 h-4" />
                <span>Script de Migração SQL Supabase (Tabela: advert_sync)</span>
              </div>
              <button
                onClick={copySqlToClipboard}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 transition"
              >
                {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedSql ? 'Copiado!' : 'Copiar SQL'}
              </button>
            </div>
            <pre className="bg-gray-900/90 text-gray-300 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-gray-800">
              {sqlCode}
            </pre>
          </div>
        )}

        {/* Botão de Salvar Tokens */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveTokens}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 text-gray-950 font-bold shadow-lg shadow-emerald-500/20 transition"
          >
            <KeyRound className="w-4 h-4" />
            {isEn ? 'Save All Credentials' : isEs ? 'Guardar Todas las Credenciales' : 'Salvar Todas as Credenciais'}
          </button>
        </div>

        {/* Seção de Sincronização em Nuvem (Cloud Persistence) */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isEn
                    ? 'Cloud Persistence & Server Sync (/api/data)'
                    : isEs
                    ? 'Persistencia en la Nube y Sincronización (/api/data)'
                    : 'Persistência em Nuvem & Sincronização (/api/data)'}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isEn
                    ? 'Synchronizes live campaigns, approvals, and tokens to Supabase PostgreSQL with local disk fallback.'
                    : isEs
                    ? 'Sincroniza campañas, aprobaciones y tokens en Supabase PostgreSQL con respaldo local.'
                    : 'Sincroniza campanhas, aprovações e tokens no Supabase PostgreSQL com réplica em disco local.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCloudSync}
                disabled={syncing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-gray-950 transition disabled:opacity-50 shadow-md shadow-cyan-500/20"
              >
                <CloudUpload className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing
                  ? isEn
                    ? 'Syncing to Supabase...'
                    : 'Sincronizando...'
                  : isEn
                  ? 'Sync to Supabase'
                  : isEs
                  ? 'Sincronizar con Supabase'
                  : 'Sincronizar com Supabase'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-800/80">
            <div className="bg-gray-950/50 border border-gray-800/80 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Origem Primária</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Supabase PostgreSQL</span>
              </div>
              <p className="text-xs text-gray-300">Tabela remota advert_sync com RLS, índices e integridade ACID.</p>
            </div>

            <div className="bg-gray-950/50 border border-gray-800/80 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Réplica de Resiliência</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">Disco Local (.data)</span>
              </div>
              <p className="text-xs text-gray-300">Garante que a plataforma nunca fique offline caso a nuvem esteja indisponível.</p>
            </div>

            <div className="bg-gray-950/50 border border-gray-800/80 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Auditoria SuperAdmin</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">helpus.ecommerce</span>
              </div>
              <p className="text-xs text-gray-300">Todas as gravações registram autor e timestamp de sincronização.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminGate>
  );
}
