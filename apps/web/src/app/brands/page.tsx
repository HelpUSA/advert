const brands = [
 { name: 'HelpUS BR', type: 'Company', status: 'active', goal: 'Promote HelpUS services and projects with owned channels.', audience: 'Brazilian and Portuguese-speaking clients', offer: 'Services and project support', channels: 'Site, LinkedIn, Instagram, Facebook' },
 { name: 'Advert HelpUS BR', type: 'Product', status: 'building', goal: 'Build the internal platform for watcher-powered promotion.', audience: 'Internal operators and future clients', offer: 'Owned advertising operations platform', channels: 'Site, Docs, LinkedIn' },
 { name: 'Professional Profile', type: 'Person', status: 'seed', goal: 'Promote a person, authority profile or specialist service.', audience: 'Clients and partners looking for expertise', offer: 'Authority positioning and consultation', channels: 'LinkedIn, Site, Instagram' },
];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>Brand registry</h1>
 <p className='lead'>Every campaign, draft, approval and report starts with a registered company, person, product or service.</p>
 <div className='statusbar'><span>3 profiles</span><span>Approval-first</span><span>Owned channels</span></div>
 </section>
 <h2 className='sectiontitle'>Registered profiles</h2>
 <section className='grid'>
 {brands.map((brand) => <article className='card' key={brand.name}><p className='eyebrow'>{brand.status} - {brand.type}</p><h2>{brand.name}</h2><p><strong>Goal:</strong> {brand.goal}</p><p><strong>Audience:</strong> {brand.audience}</p><p><strong>Offer:</strong> {brand.offer}</p><p><strong>Channels:</strong> {brand.channels}</p></article>)}
 </section>
 <div className='modulehint'>Next backend version: create, edit, pause and archive brand profiles with audit logs.</div>
 </main>
 );
}
