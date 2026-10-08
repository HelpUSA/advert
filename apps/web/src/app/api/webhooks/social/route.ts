import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Arquivo de persistência de notificações de leads
const DATA_DIR = path.join(process.cwd(), '.data');
const NOTIF_FILE = path.join(DATA_DIR, 'advert_notifications.json');

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

const initialNotifications: LeadNotification[] = [
  {
    id: 'notif-1',
    source: 'meta',
    brand: 'CG Details Studio',
    title: 'Novo Lead Qualificado',
    details: 'Interesse em Estética Automotiva Premium via Instagram Ads',
    value: 'R$ 680,00',
    channel: 'Instagram',
    createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(), // 8 min atrás
    read: false,
  },
  {
    id: 'notif-2',
    source: 'linkedin',
    brand: 'Advert HelpUS BR',
    title: 'Lead Corporativo B2B',
    details: 'Diretor de Marketing solicitou proposta de Mídia Proprietária',
    value: 'R$ 8.500,00',
    channel: 'LinkedIn',
    createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 min atrás
    read: false,
  },
  {
    id: 'notif-3',
    source: 'google',
    brand: 'HelpUS CVSS',
    title: 'Conversão de Tráfego',
    details: 'Download de Whitepaper Técnico FIRST CVSS v4.0',
    value: 'Orgânico',
    channel: 'Google Search',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2h atrás
    read: true,
  },
];

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {}
  }
}

function readNotifications(): LeadNotification[] {
  ensureDir();
  if (fs.existsSync(NOTIF_FILE)) {
    try {
      const raw = fs.readFileSync(NOTIF_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return initialNotifications;
    }
  }
  return initialNotifications;
}

function saveNotifications(notifications: LeadNotification[]) {
  ensureDir();
  try {
    fs.writeFileSync(NOTIF_FILE, JSON.stringify(notifications, null, 2), 'utf-8');
  } catch {}
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // 1. Validação padrão de handshake Meta Webhook
  if (mode === 'subscribe' && token === 'helpus_advert_secret_2026') {
    return new Response(challenge || 'OK', { status: 200 });
  }

  // 2. Retorna a lista de notificações de leads e webhooks
  const notifications = readNotifications();

  return NextResponse.json({
    success: true,
    status: 'online',
    service: 'HelpUS Advert Social Webhook Dispatcher',
    unreadCount: notifications.filter((n) => !n.read).length,
    notifications,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const current = readNotifications();

    // Se a requisição for para marcar como lidas
    if (payload.action === 'mark_read') {
      const updated = current.map((n) => ({ ...n, read: true }));
      saveNotifications(updated);
      return NextResponse.json({ success: true, message: 'Todas as notificações marcadas como lidas.' });
    }

    // Se for um novo evento de webhook / lead
    const source = payload.source || payload.provider || 'meta';
    const brand = payload.brand || payload.data?.brand || 'HelpUS BR';
    const title = payload.title || 'Novo Lead Recebido via Webhook';
    const details = payload.details || payload.data?.campaign || 'Lead qualificado registrado em tempo real';
    const value = payload.value || 'Sob Demanda';
    const channel = payload.channel || (source === 'meta' ? 'Instagram/Meta' : source === 'linkedin' ? 'LinkedIn' : 'Google Ads');

    const newNotification: LeadNotification = {
      id: `lead-${Date.now()}`,
      source,
      brand,
      title,
      details,
      value,
      channel,
      createdAt: new Date().toISOString(),
      read: false,
    };

    const updated = [newNotification, ...current].slice(0, 50); // Mantém as 50 mais recentes
    saveNotifications(updated);

    return NextResponse.json({
      success: true,
      received: true,
      notification: newNotification,
      message: `Lead de ${brand} registrado com sucesso na esteira da HelpUS.`,
      processedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Payload de webhook inválido' },
      { status: 400 }
    );
  }
}
