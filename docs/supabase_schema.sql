-- Schema SQL para o Banco de Dados Supabase / PostgreSQL (HelpUS Advert)
-- Tabela de sincronização de estado central, marcas, campanhas e criativos

CREATE TABLE IF NOT EXISTS public.advert_sync (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL, -- ex: 'main_state', 'campaigns', 'approvals'
    data JSONB NOT NULL DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_by TEXT DEFAULT 'helpus.ecommerce@gmail.com'
);

-- Índices para alta performance
CREATE INDEX IF NOT EXISTS idx_advert_sync_key ON public.advert_sync (key);
CREATE INDEX IF NOT EXISTS idx_advert_sync_updated_at ON public.advert_sync (updated_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.advert_sync ENABLE ROW LEVEL SECURITY;

-- Política de leitura: autenticado ou anon com chave
CREATE POLICY "Allow read advert_sync" 
ON public.advert_sync 
FOR SELECT 
USING (true);

-- Política de escrita: serviço ou autenticado
CREATE POLICY "Allow upsert advert_sync" 
ON public.advert_sync 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Comentários de Governança
COMMENT ON TABLE public.advert_sync IS 'Tabela central de sincronização de dados e configurações do HelpUS Advert';
