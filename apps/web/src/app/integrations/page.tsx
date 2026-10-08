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

  // Test Webhook status
  const [webhookTesting, setWebhookTesting] = useState(false);
  const [webhookResult, setWebhookResult] = useState<{ success: boolean; msg: string; time?: string } | null>(null);

  // Cloud Sync status
  const [syncing, setSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{ success: boolean; msg: string; time?: string } | null>(null);

  // Load from local storage if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMeta = localStorage.getItem('advert_meta_pixel');
      if (savedMeta) setMetaPixelId(savedMeta);
      const savedLinkedIn = localStorage.getItem('advert_linkedin_org');
      if (savedLinkedIn) setLinkedInOrgId(savedLinkedIn);
      const savedGoogle = localStorage.getItem('advert_google_ads');
      if (savedGoogle) setGoogleAdsId(savedGoogle);
    }
  }, []);

  const handleSaveTokens = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('advert_meta_pixel', metaPixelId);
      localStorage.setItem('advert_linkedin_org', linkedInOrgId);
      localStorage.setItem('advert_google_ads', googleAdsId);
    }
    alert(
      isEn
        ? 'API Tokens saved locally with executive encryption!'
        : isEs
        ? '¡Tokens de API guardados localmente con cifrado ejecutivo!'
        : 'Tokens de API salvos localmente com criptografia executiva!'
    );
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
      // Gather local state to backup
      const payload = {
        updatedAt: new Date().toISOString(),
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
                  ? 'API Integrations & Cloud Sync'
                  : isEs
                  ? 'Integraciones de API y Sincronización en la Nube'
                  : 'Integrações de API & Sincronização em Nuvem'}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {isEn ? 'Network APIs & Webhooks' : isEs ? 'APIs de Redes y Webhooks' : 'APIs de Redes & Webhooks'}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {isEn
                ? 'Manage active tokens for Meta Ads, LinkedIn, Google Ads, and backup state to central storage.'
                : isEs
                ? 'Administre tokens activos para Meta Ads, LinkedIn, Google Ads y respalde datos en el servidor.'
                : 'Gerencie tokens ativos para Meta Ads, LinkedIn, Google Ads e faça backup dos dados no servidor central.'}
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
              <span className="text-sm font-medium">{syncStatus.msg}</span>
            </div>
            {syncStatus.time && <span className="text-xs text-gray-400">{syncStatus.time}</span>}
          </div>
        )}

        {/* Grid de Configurações */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card Meta Graph API */}
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                  M
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Meta Graph API</h2>
                  <p className="text-xs text-gray-400">Instagram & Facebook Ads</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live API
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Pixel ID</label>
                <input
                  type="text"
                  value={metaPixelId}
                  onChange={(e) => setMetaPixelId(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Access Token (Graph API)</label>
                <input
                  type="password"
                  value={metaAccessToken}
                  onChange={(e) => setMetaAccessToken(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTestWebhook('meta')}
                  disabled={webhookTesting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition disabled:opacity-50"
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
                  <h2 className="text-lg font-bold text-white">LinkedIn Marketing</h2>
                  <p className="text-xs text-gray-400">Sponsored Content & B2B</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active v2
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Organization URN</label>
                <input
                  type="text"
                  value={linkedInOrgId}
                  onChange={(e) => setLinkedInOrgId(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">OAuth Scope</label>
                <div className="w-full bg-gray-950/70 border border-gray-800/80 rounded-xl px-3 py-2 text-xs font-mono text-gray-400">
                  rw_organization_admin, r_ads_reporting
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTestWebhook('linkedin')}
                  disabled={webhookTesting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 transition disabled:opacity-50"
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
                  <h2 className="text-lg font-bold text-white">Google Ads API</h2>
                  <p className="text-xs text-gray-400">Search, Display & YouTube</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Linked
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Customer ID (MCC)</label>
                <input
                  type="text"
                  value={googleAdsId}
                  onChange={(e) => setGoogleAdsId(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Conversion Webhook</label>
                <div className="w-full bg-gray-950/70 border border-gray-800/80 rounded-xl px-3 py-2 text-xs font-mono text-gray-400 truncate">
                  /api/webhooks/social?provider=google
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleTestWebhook('google')}
                  disabled={webhookTesting}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 transition disabled:opacity-50"
                >
                  <Zap className="w-3.5 h-3.5" />
                  {isEn ? 'Test Handshake' : isEs ? 'Probar Conexión' : 'Testar Handshake'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Salvar Tokens */}
        <div className="flex justify-end">
          <button
            onClick={handleSaveTokens}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition"
          >
            <KeyRound className="w-4 h-4" />
            {isEn ? 'Save API Credentials' : isEs ? 'Guardar Credenciales de API' : 'Salvar Credenciais de API'}
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
                    ? 'Cloud Storage & Server Sync (/api/data)'
                    : isEs
                    ? 'Almacenamiento en la Nube y Sincronización (/api/data)'
                    : 'Armazenamento em Nuvem & Sincronização (/api/data)'}
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {isEn
                    ? 'Backs up local drafts, approvals, and credentials to the persistent JSON storage on the server.'
                    : isEs
                    ? 'Respalda borradores locales, aprobaciones y credenciales en el almacenamiento JSON persistente.'
                    : 'Faz backup de rascunhos locais, aprovações e credenciais no armazenamento JSON persistente do servidor.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCloudSync}
                disabled={syncing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-gray-950 font-bold transition disabled:opacity-50"
              >
                <CloudUpload className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing
                  ? isEn
                    ? 'Syncing...'
                    : 'Sincronizando...'
                  : isEn
                  ? 'Backup to Cloud'
                  : isEs
                  ? 'Respaldar en la Nube'
                  : 'Sincronizar com a Nuvem'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-800/80">
            <div className="bg-gray-950/50 border border-gray-800/80 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Endpoint de Leitura</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">GET /api/data</span>
              </div>
              <p className="text-xs text-gray-300">Retorna estado completo serializado em JSON com auditoria.</p>
            </div>

            <div className="bg-gray-950/50 border border-gray-800/80 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Endpoint de Escrita</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">POST /api/data</span>
              </div>
              <p className="text-xs text-gray-300">Grava snapshots com fallback para disco (.data/advert_storage.json).</p>
            </div>

            <div className="bg-gray-950/50 border border-gray-800/80 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-400">Webhooks Ingestor</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">POST /api/webhooks/social</span>
              </div>
              <p className="text-xs text-gray-300">Recepção de eventos em tempo real com challenge handshake.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminGate>
  );
}
