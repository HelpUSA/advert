import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getSupabaseClient } from '@/lib/supabase';

// Caminho do arquivo de persistência em disco local/servidor
const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'advert_storage.json');

// Garante que o diretório existe
function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {}
  }
}

// Leitura local com fallback
function readLocalData() {
  ensureDir();
  if (fs.existsSync(DATA_FILE)) {
    try {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return null;
}

// Gravação local segura
function writeLocalData(data: any) {
  ensureDir();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customUrl = searchParams.get('supabaseUrl') || undefined;
  const customKey = searchParams.get('supabaseKey') || undefined;

  const supabase = getSupabaseClient(customUrl, customKey);

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('advert_sync')
        .select('*')
        .eq('key', 'main_state')
        .maybeSingle();

      if (!error && data?.data) {
        return NextResponse.json({
          success: true,
          source: 'supabase',
          data: data.data,
          updatedAt: data.updated_at,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (e: any) {
      console.warn('[Data API] Falha na consulta Supabase, usando fallback local:', e.message);
    }
  }

  // Fallback para disco local
  const localData = readLocalData();
  return NextResponse.json({
    success: true,
    source: 'local_disk',
    data: localData || {},
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customSupabaseUrl, customSupabaseKey, ...payload } = body;

    const supabase = getSupabaseClient(customSupabaseUrl, customSupabaseKey);
    let supabaseSuccess = false;

    // Persistência local (garantia de resiliência e réplica)
    const currentLocal = readLocalData() || {};
    const updatedLocal = {
      ...currentLocal,
      ...payload,
      updatedAt: new Date().toISOString(),
    };
    writeLocalData(updatedLocal);

    if (supabase) {
      try {
        const { error } = await supabase.from('advert_sync').upsert(
          {
            key: 'main_state',
            data: updatedLocal,
            updated_at: new Date().toISOString(),
            created_by: 'helpus.ecommerce@gmail.com',
          },
          { onConflict: 'key' }
        );

        if (!error) {
          supabaseSuccess = true;
        } else {
          console.warn('[Data API] Supabase upsert error:', error.message);
        }
      } catch (err: any) {
        console.warn('[Data API] Supabase connection error:', err.message);
      }
    }

    return NextResponse.json({
      success: true,
      source: supabaseSuccess ? 'supabase' : 'local_disk',
      message: supabaseSuccess
        ? 'Dados sincronizados com o banco de dados Supabase / PostgreSQL da HelpUS.'
        : 'Dados salvos no armazenamento local do servidor (réplica ativa).',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao processar dados' },
      { status: 500 }
    );
  }
}
