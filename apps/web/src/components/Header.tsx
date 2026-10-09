'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../lib/LanguageContext';
import { useGoogleAuth } from '../lib/useGoogleAuth';
import { WHATSAPP_NUMBER } from '../lib/i18n';
import {
  Globe,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  LogOut,
  Sparkles,
  MessageCircle,
  Bell,
  Volume2,
  VolumeX,
  CheckCircle2,
  Zap,
} from 'lucide-react';

interface LeadNotification {
  id: string;
  source: string;
  brand: string;
  title: string;
  details: string;
  value?: string;
  channel: string;
  createdAt: string;
  read: boolean;
}

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, logout } = useGoogleAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Notificações em Tempo Real de Leads & Webhooks
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<LeadNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const prevCountRef = useRef(0);

  // Links para o visitante público
  const publicNavItems = [
    { href: '/', label: t.nav.home },
    { href: '/#o-que-e', label: t.nav.aboutWhatIs },
    { href: '/#planos', label: t.nav.packages },
    { href: '/#servicos', label: t.nav.services },
    { href: '/#simulador', label: t.nav.simulator },
    { href: '/#formatos', label: t.nav.showcase },
    { href: '/#cases', label: t.nav.cases },
    { href: '/#faq', label: t.nav.faq },
  ];

  // Links para o SuperAdmin autenticado
  const adminNavItems = [
    { href: '/', label: t.nav.home },
    { href: '/brands', label: t.nav.brands },
    { href: '/campaigns', label: t.nav.campaigns },
    { href: '/calendar', label: t.nav.calendar },
    { href: '/drafts', label: t.nav.drafts },
    { href: '/approvals', label: t.nav.approvals },
    { href: '/workflow', label: t.nav.workflow },
    { href: '/reports', label: t.nav.reports },
    { href: '/integrations', label: t.nav.integrations },
  ];

  const currentNavItems = isAuthenticated ? adminNavItems : publicNavItems;

  const languages = [
    { code: 'pt', label: 'Português (BR)', flag: '🇧🇷' },
    { code: 'en', label: 'English (US)', flag: '🇺🇸' },
    { code: 'es', label: 'Español (ES)', flag: '🇪🇸' },
  ];

  const whatsappMsg =
    language === 'en'
      ? 'Hello! I would like to speak with a HelpUS representative about advertising solutions.'
      : language === 'es'
      ? '¡Hola! Me gustaría hablar con un representante de HelpUS sobre soluciones de publicidad.'
      : 'Olá! Gostaria de falar com um especialista da HelpUS sobre operações de publicidade.';

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;

  // Síntese de Alerta Sonoro Suave (Web Audio API)
  const playLeadChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch {}
  };

  // Carrega configuração de som do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSound = localStorage.getItem('advert_sound_notifications');
      if (savedSound !== null) {
        setSoundEnabled(savedSound === 'true');
      }
    }
  }, []);

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    if (typeof window !== 'undefined') {
      localStorage.setItem('advert_sound_notifications', String(nextVal));
    }
  };

  // Polling e carregamento de notificações de webhook/leads
  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/webhooks/social');
      const data = await res.json();
      if (data.success && Array.isArray(data.notifications)) {
        setNotifications(data.notifications);
        const count = data.unreadCount || 0;
        setUnreadCount(count);

        // Se houver novos leads e contagem aumentou, dispara o chime
        if (count > prevCountRef.current && prevCountRef.current !== 0) {
          playLeadChime();
        }
        prevCountRef.current = count;
      }
    } catch {}
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchNotifications();

    // Polling a cada 15 segundos para atualizar leads em tempo real
    const interval = setInterval(fetchNotifications, 15000);

    // Listener para disparo de lead em tempo real na mesma aba
    const handleLocalLead = () => {
      fetchNotifications();
      playLeadChime();
    };
    window.addEventListener('helpus_new_lead', handleLocalLead);

    return () => {
      clearInterval(interval);
      window.removeEventListener('helpus_new_lead', handleLocalLead);
    };
  }, [isAuthenticated, soundEnabled]);

  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/webhooks/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_read' }),
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
      prevCountRef.current = 0;
    } catch {}
  };

  const handleSimulateLead = async () => {
    try {
      const brands = ['CG Details Studio', 'HelpUS CVSS', 'Advert HelpUS BR', 'BlueBox Sustentável'];
      const chosenBrand = brands[Math.floor(Math.random() * brands.length)];
      const res = await fetch('/api/webhooks/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'meta',
          brand: chosenBrand,
          title: 'Novo Lead Qualificado via Webhook',
          details: 'Conversão em anúncio de tráfego pago registrada na esteira HelpUS',
          value: 'R$ 750,00',
          channel: 'Instagram Ads',
        }),
      });
      if (res.ok) {
        await fetchNotifications();
        playLeadChime();
      }
    } catch {}
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* LOGO OFICIAL HELPUS */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden shadow-lg shadow-amber-400/20 group-hover:scale-105 transition duration-300">
            <img
              src="/img/helpus-logo.png"
              alt="HelpUS Logo"
              className="w-full h-full object-contain bg-slate-950"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white">
                HELP<span className="text-blue-500">US</span>
              </span>
              <span className="text-[11px] font-black px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 uppercase tracking-wider">
                {t.brandName}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide hidden sm:block">
              {t.brandTagline}
            </span>
          </div>
        </Link>

        {/* NAVEGAÇÃO DESKTOP */}
        <nav className="hidden lg:flex items-center gap-1">
          {currentNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'text-amber-400 bg-slate-900 border border-slate-800'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CONTROLES DA DIREITA (IDIOMA, NOTIFICAÇÕES, LOGIN, HUB, MOBILE) */}
        <div className="flex items-center gap-2.5">
          {/* Seletor de Idioma */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition cursor-pointer"
              title="Mudar idioma / Change language"
            >
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span className="uppercase text-[11px] font-bold">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-1.5 z-50 animate-in fade-in">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code as any);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition cursor-pointer ${
                      language === l.code
                        ? 'bg-slate-800 text-amber-400 font-bold'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span>{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SINO DE NOTIFICAÇÕES EM TEMPO REAL (SUPERADMIN) */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setNotifMenuOpen(!notifMenuOpen)}
                className="relative p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                title="Notificações de Leads & Webhooks"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black text-white shadow-md shadow-rose-500/50 animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {notifMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-4 z-50 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold text-white">
                        {t.notifications?.title || 'Central de Leads & Webhooks'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleSound}
                        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                        title={
                          soundEnabled
                            ? t.notifications?.mute || 'Silenciar alertas sonoros'
                            : t.notifications?.unmute || 'Ativar alertas sonoros'
                        }
                      >
                        {soundEnabled ? (
                          <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </button>

                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-[10px] text-amber-400 hover:underline font-semibold"
                        >
                          {t.notifications?.markAllRead || 'Limpar Lidas'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Lista de Notificações */}
                  <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-500">
                        {t.notifications?.empty || 'Nenhuma notificação de lead recebida ainda.'}
                      </div>
                    ) : (
                      notifications.slice(0, 6).map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-2xl border text-xs transition ${
                            notif.read
                              ? 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                              : 'bg-gradient-to-r from-amber-950/30 to-slate-950 border-amber-500/40 text-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-white text-[11px] truncate">{notif.brand}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400">
                              {notif.channel}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-snug">{notif.details}</p>
                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-800/60 text-[9px] text-slate-500">
                            <span>{new Date(notif.createdAt).toLocaleTimeString()}</span>
                            {notif.value && <strong className="text-emerald-400">{notif.value}</strong>}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Rodapé do Menu com Botão de Simulação */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <button
                      onClick={handleSimulateLead}
                      className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-[11px] flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{t.notifications?.simulate || 'Simular Lead de Teste (Som Chime)'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Botão Comercial WhatsApp para Visitantes */}
          {!isAuthenticated && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          )}

          {/* Se SuperAdmin Autenticado: Menu do Usuário */}
          {isAuthenticated && user && (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-xs transition cursor-pointer"
              >
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-5 h-5 rounded-full object-cover border border-emerald-400"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">
                    SA
                  </div>
                )}
                <span className="hidden sm:inline font-semibold text-emerald-400 text-xs">
                  {t.auth.connectedAs}
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 z-50 space-y-2 animate-in fade-in">
                  <div className="pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold text-white">SuperAdmin HelpUS</span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5 truncate">
                      {user.email}
                    </p>
                  </div>

                  <Link
                    href="/brands"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-amber-400 transition"
                  >
                    <span>{t.nav.brands}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </Link>

                  <a
                    href="https://helpusbr.com/admin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700 text-xs font-semibold text-sky-400 transition"
                  >
                    <span>{t.nav.backToHub}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                  >
                    <span>{t.auth.logout}</span>
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Atalho Hub Central */}
          <a
            href="https://helpusbr.com/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 transition"
            title="Ir para a Central Administrativa HelpUS"
          >
            <span>Hub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          {/* Botão Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Drawer Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-6 py-4 space-y-2">
          {currentNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                pathname === item.href
                  ? 'bg-slate-800 text-amber-400 font-bold border border-slate-700'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://helpusbr.com/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-sky-400 bg-slate-900"
            >
              <span>{t.nav.backToHub}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
