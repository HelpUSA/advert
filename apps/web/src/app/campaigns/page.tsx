const campaigns = [
 { name: 'HelpUS service awareness', brand: 'HelpUS BR', objective: 'authority + lead generation', status: 'planned', channels: 'Site, LinkedIn, Instagram, Facebook', cadence: '3 posts/week', readiness: 'Ready for content calendar' },
 { name: 'Advert build in public', brand: 'Advert HelpUS BR', objective: 'authority + product documentation', status: 'active', channels: 'Site, Docs, LinkedIn', cadence: 'weekly progress summary', readiness: 'Ready for drafts' },
 { name: 'Professional profile authority', brand: 'Professional Profile', objective: 'authority + audience trust', status: 'draft', channels: 'LinkedIn, Site, Instagram', cadence: '2 posts/week', readiness: 'Needs offer and audience detail' },
];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>Campaign planner</h1>
 <p className='lead'>Campaigns connect a brand profile to an objective, audience, offer, channels and cadence before content is generated.</p>
 </section>
 <section className='grid'>
 {campaigns.map((campaign) => <article className='card' key={campaign.name}><p className='eyebrow'>{campaign.status}</p><h2>{campaign.name}</h2><p><strong>Brand:</strong> {campaign.brand}</p><p><strong>Objective:</strong> {campaign.objective}</p><p><strong>Channels:</strong> {campaign.channels}</p><p><strong>Cadence:</strong> {campaign.cadence}</p><p><strong>Readiness:</strong> {campaign.readiness}</p></article>)}
 </section>
 </main>
 );
}
