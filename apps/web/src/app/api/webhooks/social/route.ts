import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Validação padrão do Meta Webhook
  if (mode === 'subscribe' && token === 'helpus_advert_secret_2026') {
    return new Response(challenge || 'OK', { status: 200 });
  }

  return NextResponse.json({
    status: 'online',
    service: 'HelpUS Advert Social Webhook Dispatcher',
    endpoints: ['Meta Graph API v19.0', 'LinkedIn Marketing API v2', 'Google Ads API v16'],
    timestamp: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Log e processamento de evento de anúncio/campanha
    const eventType = payload.event_type || 'lead_generated';
    const campaignId = payload.campaign_id || 'camp-general';

    return NextResponse.json({
      success: true,
      received: true,
      eventType,
      campaignId,
      processedAt: new Date().toISOString(),
      status: '200 OK • Processado pela mesa de operações HelpUS',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Payload inválido' },
      { status: 400 }
    );
  }
}
