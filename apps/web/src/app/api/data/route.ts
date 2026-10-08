import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

// Leitura com fallback
function readData() {
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

// Gravação segura
function writeData(data: any) {
  ensureDir();
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

export async function GET() {
  const data = readData();
  return NextResponse.json({
    success: true,
    data: data || {},
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const current = readData() || {};
    const updated = {
      ...current,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    writeData(updated);

    return NextResponse.json({
      success: true,
      message: 'Dados sincronizados com sucesso na nuvem HelpUS',
      updatedAt: updated.updatedAt,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao sincronizar dados' },
      { status: 500 }
    );
  }
}
