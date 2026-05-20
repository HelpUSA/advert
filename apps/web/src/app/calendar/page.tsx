const items = [
 { date: '2026-05-21', campaign: 'Advert build in public', channel: 'LinkedIn', topic: 'Why owned advertising matters', status: 'drafted', draft: 'Why owned advertising matters', owner: 'Watcher', readiness: 'Draft ready for approval request', next: 'Send to approvals' },
 { date: '2026-05-22', campaign: 'HelpUS service awareness', channel: 'Instagram', topic: 'HelpUS service checklist', status: 'idea', draft: 'HelpUS service checklist', owner: 'Watcher', readiness: 'Needs carousel outline', next: 'Expand draft and asset brief' },
 { date: '2026-05-24', campaign: 'Professional profile authority', channel: 'Site', topic: 'Professional authority bio', status: 'in_review', draft: 'Professional authority bio', owner: 'Manager', readiness: 'Waiting for approval decision', next: 'Approve or request changes' },
 { date: '2026-05-27', campaign: 'Advert build in public', channel: 'Docs', topic: 'Stage 2 planning model summary', status: 'planned', draft: 'Not started', owner: 'Watcher', readiness: 'Needs draft generation', next: 'Create summary draft' },
];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>Content calendar</h1>
 <p className='lead'>The calendar turns campaign strategy into planned content slots with channel, date, topic, draft and readiness status.</p>
 <div className='statusbar'><span>4 slots</span><span>3 channels</span><span>2 watcher owned</span><span>approval gated</span></div>
 </section>
 <h2 className='sectiontitle'>Publishing plan</h2>
 <section className='grid'>
 {items.map((item) => <article className='card' key={item.date + item.topic}><p className='eyebrow'>{item.date} - {item.status}</p><h2>{item.topic}</h2><p><strong>Campaign:</strong> {item.campaign}</p><p><strong>Channel:</strong> {item.channel}</p><p><strong>Draft:</strong> {item.draft}</p><p><strong>Owner:</strong> {item.owner}</p><p><strong>Readiness:</strong> {item.readiness}</p><p><strong>Next:</strong> {item.next}</p></article>)}
 </section>
 <div className='modulehint'>Next backend version: generate calendar items from approved campaigns and convert approved drafts into publishing tasks.</div>
 </main>
 );
}
