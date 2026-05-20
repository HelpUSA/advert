const drafts = [
 { title: 'Why owned advertising matters', brand: 'Advert HelpUS BR', channel: 'LinkedIn', format: 'social_post', pillar: 'authority', status: 'drafted', cta: 'Follow the build progress' },
 { title: 'HelpUS service checklist', brand: 'HelpUS BR', channel: 'Instagram', format: 'carousel_outline', pillar: 'utility', status: 'idea', cta: 'Request a consultation' },
 { title: 'Professional authority bio', brand: 'Professional Profile', channel: 'Site', format: 'profile_bio', pillar: 'authority', status: 'in_review', cta: 'Book a conversation' },
];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>Draft generator</h1>
 <p className='lead'>Drafts are reusable content assets that can become posts, scripts, carousels, bios, articles or publishing tasks after review.</p>
 </section>
 <section className='grid'>
 {drafts.map((draft) => <article className='card' key={draft.title}><p className='eyebrow'>{draft.status}</p><h2>{draft.title}</h2><p><strong>Brand:</strong> {draft.brand}</p><p><strong>Channel:</strong> {draft.channel}</p><p><strong>Format:</strong> {draft.format}</p><p><strong>Pillar:</strong> {draft.pillar}</p><p><strong>CTA:</strong> {draft.cta}</p></article>)}
 </section>
 </main>
 );
}
