const campaigns = [
 { name: 'HelpUS service awareness', brand: 'HelpUS BR', objective: 'authority + lead generation', status: 'planned', audience: 'Brazilian and Portuguese-speaking clients', offer: 'Services and project support', channels: 'Site, LinkedIn, Instagram, Facebook', cadence: '3 posts/week', readiness: 'Ready for content calendar', next: 'Create first weekly content package' },
 { name: 'Advert build in public', brand: 'Advert HelpUS BR', objective: 'authority + product documentation', status: 'active', audience: 'Internal operators and future clients', offer: 'Owned advertising operations platform', channels: 'Site, Docs, LinkedIn', cadence: 'weekly progress summary', readiness: 'Ready for drafts', next: 'Publish Stage 2 summary draft' },
 { name: 'Professional profile authority', brand: 'Professional Profile', objective: 'authority + audience trust', status: 'draft', audience: 'Clients and partners looking for expertise', offer: 'Authority positioning and consultation', channels: 'LinkedIn, Site, Instagram', cadence: '2 posts/week', readiness: 'Needs offer and audience detail', next: 'Clarify niche and proof points' },
];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>Campaign planner</h1>
 <p className='lead'>Campaigns connect a brand profile to an objective, audience, offer, channels and cadence before content is generated.</p>
 <div className='statusbar'><span>3 campaigns</span><span>2 ready</span><span>1 needs detail</span></div>
 </section>
 <h2 className='sectiontitle'>Campaign pipeline</h2>
 <section className='grid'>
 {campaigns.map((campaign) => <article className='card' key={campaign.name}><p className='eyebrow'>{campaign.status}</p><h2>{campaign.name}</h2><p><strong>Brand:</strong> {campaign.brand}</p><p><strong>Objective:</strong> {campaign.objective}</p><p><strong>Audience:</strong> {campaign.audience}</p><p><strong>Offer:</strong> {campaign.offer}</p><p><strong>Channels:</strong> {campaign.channels}</p><p><strong>Cadence:</strong> {campaign.cadence}</p><p><strong>Readiness:</strong> {campaign.readiness}</p><p><strong>Next:</strong> {campaign.next}</p></article>)}
 </section>
 <div className='modulehint'>Next backend version: convert planned campaigns into calendar items and draft generation jobs.</div>
 </main>
 );
}
