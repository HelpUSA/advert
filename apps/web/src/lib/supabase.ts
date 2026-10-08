import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Cache da instância
let supabaseClient: SupabaseClient | null = null;

export function getSupabaseClient(customUrl?: string, customKey?: string): SupabaseClient | null {
  const url =
    customUrl ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    '';

  const key =
    customKey ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    '';

  if (!url || !key) {
    return null;
  }

  // Se parâmetros customizados foram passados, cria cliente ad-hoc
  if (customUrl && customKey) {
    return createClient(url, key, {
      auth: { persistSession: false },
    });
  }

  if (!supabaseClient) {
    supabaseClient = createClient(url, key, {
      auth: { persistSession: false },
    });
  }

  return supabaseClient;
}

export interface AdvertStorageRecord {
  id: string;
  key: string;
  data: any;
  updated_at: string;
  created_by?: string;
}
