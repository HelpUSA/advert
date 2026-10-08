import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, brand, format, channel, style = 'realistic_photo', customApiKey } = await request.json();

    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Prompt ou tema é obrigatório' }, { status: 400 });
    }

    const brandName = brand || 'HelpUS BR';
    const channelName = channel || 'LinkedIn';
    const formatType = format || 'Carrossel';

    // Determina dimensões padrão por formato
    let width = 1080;
    let height = 1080;
    let aspectRatio = '1:1';

    if (formatType.toLowerCase().includes('vídeo') || formatType.toLowerCase().includes('reels') || formatType.toLowerCase().includes('stories')) {
      width = 1080;
      height = 1920;
      aspectRatio = '9:16';
    } else if (formatType.toLowerCase().includes('artigo') || channelName.toLowerCase().includes('banner') || channelName.toLowerCase().includes('portal')) {
      width = 1200;
      height = 628;
      aspectRatio = '1.91:1';
    }

    let finalImageUrl = '';
    let engineUsed = 'HelpUS Creative Canvas Engine v2.0';

    // 1. Caso o usuário tenha configurado OpenAI API Key para DALL-E 3
    const openAiKey = customApiKey || process.env.OPENAI_API_KEY;
    if (openAiKey && openAiKey.startsWith('sk-')) {
      try {
        const dallePrompt = `Ultra-realistic corporate advertising photography for ${brandName}: ${prompt}. Cinematic lighting, 8k resolution, minimalist dark premium branding, professional marketing composition.`;
        const dalleRes = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: dallePrompt,
            n: 1,
            size: width === 1080 && height === 1920 ? '1024x1792' : '1024x1024',
            quality: 'standard',
          }),
        });
        const dalleData = await dalleRes.json();
        if (dalleData?.data?.[0]?.url) {
          finalImageUrl = dalleData.data[0].url;
          engineUsed = 'OpenAI DALL-E 3 (High-Fidelity AI)';
        }
      } catch (e: any) {
        console.warn('[AI Image Generator] OpenAI fallback:', e.message);
      }
    }

    // 2. Se não usou DALL-E e o estilo é Fotografia Realista ou 3D Tech
    if (!finalImageUrl && (style === 'realistic_photo' || style === 'tech_3d')) {
      const seed = Math.floor(Math.random() * 999999);
      let enhancedPrompt = '';

      if (style === 'realistic_photo') {
        enhancedPrompt = `award-winning commercial photography, professional business executive, ${prompt}, ultra-realistic, shot on 85mm lens, studio lighting, depth of field, high-end advertising campaign for ${brandName}, 8k UHD`;
      } else {
        enhancedPrompt = `futuristic 3D tech visualization, corporate data intelligence, ${prompt}, sleek cyberpunk dark slate and cyan aesthetic, glowing neon data streams, ultra-detailed render, octane render 8k`;
      }

      // Motor de IA Generativa Instantânea Pollinations (zero auth, renderização real de IA)
      const encodedPrompt = encodeURIComponent(enhancedPrompt.slice(0, 300));
      finalImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;
      engineUsed = style === 'realistic_photo' ? 'HelpUS Real-Photo AI Engine (Flux)' : 'HelpUS 3D CyberTech AI Engine';
    }

    // 3. Fallback ou estilo vetorial: Renderiza SVG gráfico com Design System Dark HelpUS
    if (!finalImageUrl || style === 'vector_dark') {
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
          <rect width="100%" height="100%" fill="url(#bgGrad)" />
          <rect width="100%" height="100%" fill="url(#glowGrad)" />
          <line x1="80" y1="80" x2="${width - 80}" y2="80" stroke="#334155" stroke-width="1" stroke-dasharray="6,6" />
          <line x1="80" y1="${height - 80}" x2="${width - 80}" y2="${height - 80}" stroke="#334155" stroke-width="1" stroke-dasharray="6,6" />
          <text x="90" y="140" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#ffffff" letter-spacing="1">
            HELP<tspan fill="#3b82f6">US</tspan> • ${brandName.toUpperCase()}
          </text>
          <rect x="${width - 240}" y="110" width="150" height="42" rx="12" fill="#1e293b" stroke="#475569" stroke-width="1" />
          <text x="${width - 165}" y="137" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#f59e0b" text-anchor="middle">
            ${channelName}
          </text>
          <text x="90" y="320" font-family="system-ui, sans-serif" font-size="42" font-weight="900" fill="#f8fafc">
            ${prompt.length > 55 ? prompt.slice(0, 52) + '...' : prompt}
          </text>
          <rect x="90" y="370" width="60" height="4" rx="2" fill="#f59e0b" />
          <text x="90" y="440" font-family="system-ui, sans-serif" font-size="24" font-weight="400" fill="#94a3b8">
            Tecnologia proprietária, cadência contínua e esteira executiva de aprovações.
          </text>
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
      finalImageUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgGraphic)}`;
      engineUsed = 'HelpUS Vector Dark System';
    }

    return NextResponse.json({
      success: true,
      imageUrl: finalImageUrl,
      dimensions: { width, height },
      aspectRatio,
      format: formatType,
      brand: brandName,
      channel: channelName,
      style,
      generatedAt: new Date().toISOString(),
      engine: engineUsed,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Erro ao gerar imagem' },
      { status: 500 }
    );
  }
}
