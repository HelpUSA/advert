import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, brand, format, channel } = await request.json();

    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Prompt é obrigatório' }, { status: 400 });
    }

    const brandName = brand || 'HelpUS BR';
    const channelName = channel || 'LinkedIn';
    const formatType = format || 'Carrossel';

    // Dimensões do formato
    let width = 1080;
    let height = 1080;
    if (formatType.toLowerCase().includes('vídeo') || formatType.toLowerCase().includes('reels')) {
      width = 1080;
      height = 1920;
    } else if (formatType.toLowerCase().includes('artigo') || channelName.toLowerCase().includes('banner')) {
      width = 1200;
      height = 628;
    }

    // Gera um SVG de alta qualidade padronizado no Design System Dark HelpUS
    const svgGraphic = `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#020617" />
            <stop offset="50%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#1e1b4b" />
          </linearGradient>
          <radialGradient id="glowGrad" cx="80%" cy="20%" r="60%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.15" />
            <stop offset="100%" stop-color="#020617" stop-opacity="0" />
          </radialGradient>
        </defs>

        <!-- Fundo -->
        <rect width="100%" height="100%" fill="url(#bgGrad)" />
        <rect width="100%" height="100%" fill="url(#glowGrad)" />

        <!-- Grid Tecnológico Sutil -->
        <line x1="80" y1="80" x2="${width - 80}" y2="80" stroke="#334155" stroke-width="1" stroke-dasharray="6,6" />
        <line x1="80" y1="${height - 80}" x2="${width - 80}" y2="${height - 80}" stroke="#334155" stroke-width="1" stroke-dasharray="6,6" />

        <!-- Topo: Marca & Canal -->
        <text x="90" y="140" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="1">
          HELP<tspan fill="#3b82f6">US</tspan> • ${brandName.toUpperCase()}
        </text>
        <rect x="${width - 240}" y="110" width="150" height="42" rx="12" fill="#1e293b" stroke="#475569" stroke-width="1" />
        <text x="${width - 165}" y="137" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#f59e0b" text-anchor="middle">
          ${channelName}
        </text>

        <!-- Conteúdo Central: Headline e Gancho -->
        <text x="90" y="320" font-family="system-ui, sans-serif" font-size="44" font-weight="900" fill="#f8fafc">
          ${prompt.length > 55 ? prompt.slice(0, 52) + '...' : prompt}
        </text>

        <rect x="90" y="370" width="60" height="4" rx="2" fill="#f59e0b" />

        <text x="90" y="440" font-family="system-ui, sans-serif" font-size="24" font-weight="400" fill="#94a3b8">
          Tecnologia proprietária, cadência contínua e esteira executiva de aprovações.
        </text>

        <!-- Rodapé: Badges de Segurança -->
        <rect x="90" y="${height - 150}" width="${width - 180}" height="70" rx="20" fill="#090d16" stroke="#1e293b" stroke-width="1" />
        <text x="130" y="${height - 108}" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="#10b981">
          ● Master Approval Verified • HelpUS Ad Engine
        </text>
        <rect x="${width - 270}" y="${height - 135}" width="140" height="40" rx="20" fill="#f59e0b" />
        <text x="${width - 200}" y="${height - 110}" font-family="system-ui, sans-serif" font-size="15" font-weight="900" fill="#020617" text-anchor="middle">
          SAIBA MAIS
        </text>
      </svg>
    `.trim();

    const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgGraphic)}`;

    return NextResponse.json({
      success: true,
      imageUrl: dataUri,
      dimensions: { width, height },
      format: formatType,
      brand: brandName,
      channel: channelName,
      generatedAt: new Date().toISOString(),
      engine: 'HelpUS Creative Canvas Engine v2.0',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao gerar imagem' },
      { status: 500 }
    );
  }
}
