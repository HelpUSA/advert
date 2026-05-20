const steps = [
 { name: '1. Register profile', owner: 'Manager + watcher', status: 'active', output: 'BrandProfile with goal, audience, offer, tone and constraints.' },
 { name: '2. Plan campaign', owner: 'Manager + watcher', status: 'active', output: 'Campaign with objective, channels, cadence and readiness.' },
 { name: '3. Create drafts', owner: 'Watcher', status: 'active', output: 'ContentDrafts, variants and asset briefs.' },
 { name: '4. Review approvals', owner: 'Manager', status: 'gated', output: 'Approved, rejected or changes requested decisions.' },
 { name: '5. Prepare publishing', owner: 'Watcher', status: 'blocked until policy', output: 'PublishingTask checklist and audit log.' },
 { name: '6. Report results', owner: 'Watcher', status: 'planned', output: 'Weekly Report with wins, issues and next actions.' },
];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>Watcher workflow</h1>
 <p className='lead'>The workflow defines how watcher can safely support promotion without bypassing approvals, logs or channel policies.</p>
 </section>
 <section className='grid'>
 {steps.map((step) => <article className='card' key={step.name}><p className='eyebrow'>{step.status}</p><h2>{step.name}</h2><p><strong>Owner:</strong> {step.owner}</p><p><strong>Output:</strong> {step.output}</p></article>)}
 </section>
 </main>
 );
}
