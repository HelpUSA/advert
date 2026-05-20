const drafts = [
 { title: 'Why owned advertising matters', brand: 'Advert HelpUS BR', channel: 'LinkedIn', format: 'social_post', pillar: 'authority', status: 'drafted', audience: 'Operators and future clients', cta: 'Follow the build progress', readiness: 'Ready for approval request', next: 'Send to approval queue' },
 { title: 'HelpUS service checklist', brand: 'HelpUS BR', channel: 'Instagram', format: 'carousel_outline', pillar: 'utility', status: 'idea', audience: 'Brazilian and Portuguese-speaking clients', cta: 'Request a consultation', readiness: 'Needs slide outline and CTA refinement', next: 'Expand into carousel asset brief' },
 { title: 'Professional authority bio', brand: 'Professional Profile', channel: 'Site', format: 'profile_bio', pillar: 'authority', status: 'in_review', audience: 'Clients and partners looking for expertise', cta: 'Book a conversation', readiness: 'Waiting for manager review', next: 'Approve or request changes' },
];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>Draft generator</h1>
 <p className='lead'>Drafts are reusable content assets that can become posts, scripts, carousels, bios, articles or publishing tasks after review.</p>
 <div className='statusbar'><span>3 drafts</span><span>1 drafted</span><span>1 in review</span><span>1 idea</span></div>
 </section>
 <h2 className='sectiontitle'>Content draft queue</h2>
 <section className='grid'>
 {drafts.map((draft) => <article className='card' key={draft.title}><p className='eyebrow'>{draft.status} - {draft.format}</p><h2>{draft.title}</h2><p><strong>Brand:</strong> {draft.brand}</p><p><strong>Channel:</strong> {draft.channel}</p><p><strong>Pillar:</strong> {draft.pillar}</p><p><strong>Audience:</strong> {draft.audience}</p><p><strong>CTA:</strong> {draft.cta}</p><p><strong>Readiness:</strong> {draft.readiness}</p><p><strong>Next:</strong> {draft.next}</p></article>)}
 </section>
 <div className='modulehint'>Next backend version: generate content variants, attach asset briefs and route drafts into approval requests.</div>
 </main>
 );
}
