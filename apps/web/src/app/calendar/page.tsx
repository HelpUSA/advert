const items = [
 { date: '2026-05-21', campaign: 'Advert build in public', channel: 'LinkedIn', topic: 'Why owned advertising matters', status: 'drafted', draft: 'Why owned advertising matters' },
 { date: '2026-05-22', campaign: 'HelpUS service awareness', channel: 'Instagram', topic: 'HelpUS service checklist', status: 'idea', draft: 'HelpUS service checklist' },
 { date: '2026-05-24', campaign: 'Professional profile authority', channel: 'Site', topic: 'Professional authority bio', status: 'in_review', draft: 'Professional authority bio' },
 { date: '2026-05-27', campaign: 'Advert build in public', channel: 'Docs', topic: 'Stage 2 planning model summary', status: 'planned', draft: 'Not started' },
];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>Content calendar</h1>
 <p className='lead'>The calendar turns campaign strategy into planned content slots with channel, date, topic, draft and readiness status.</p>
 </section>
 <section className='grid'>
 {items.map((item) => <article className='card' key={item.date + item.topic}><p className='eyebrow'>{item.date} - {item.status}</p><h2>{item.topic}</h2><p><strong>Campaign:</strong> {item.campaign}</p><p><strong>Channel:</strong> {item.channel}</p><p><strong>Draft:</strong> {item.draft}</p></article>)}
 </section>
 </main>
 );
}
