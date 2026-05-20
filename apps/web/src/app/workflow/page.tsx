const steps = [
 { name: '1. Register profile', owner: 'Manager + watcher', status: 'active', gate: 'Brand gate', output: 'BrandProfile with goal, audience, offer, tone and constraints.', next: 'Use profile to create campaigns' },
 { name: '2. Plan campaign', owner: 'Manager + watcher', status: 'active', gate: 'Campaign gate', output: 'Campaign with objective, channels, cadence and readiness.', next: 'Convert campaign into calendar slots' },
 { name: '3. Create drafts', owner: 'Watcher', status: 'active', gate: 'Draft gate', output: 'ContentDrafts, variants and asset briefs.', next: 'Send ready drafts to approval' },
 { name: '4. Review approvals', owner: 'Manager', status: 'gated', gate: 'Approval gate', output: 'Approved, rejected or changes requested decisions.', next: 'Only approved drafts can become publishing tasks' },
 { name: '5. Prepare publishing', owner: 'Watcher', status: 'blocked until policy', gate: 'Channel policy gate', output: 'PublishingTask checklist and audit log.', next: 'Manual checklist first, connectors later' },
 { name: '6. Report results', owner: 'Watcher', status: 'planned', gate: 'Audit gate', output: 'Weekly report with wins, issues and next actions.', next: 'Feed insights back into campaigns' },
];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>Watcher workflow</h1>
 <p className='lead'>The workflow defines how watcher can safely support promotion without bypassing approvals, logs or channel policies.</p>
 <div className='statusbar'><span>6 steps</span><span>approval gated</span><span>manual publishing first</span><span>audit required</span></div>
 </section>
 <h2 className='sectiontitle'>Operational flow</h2>
 <section className='grid'>
 {steps.map((step) => <article className='card' key={step.name}><p className='eyebrow'>{step.status} - {step.gate}</p><h2>{step.name}</h2><p><strong>Owner:</strong> {step.owner}</p><p><strong>Output:</strong> {step.output}</p><p><strong>Next:</strong> {step.next}</p></article>)}
 </section>
 <div className='modulehint'>Next backend version: turn each step into auditable watcher tasks with status, command id, input summary and output summary.</div>
 </main>
 );
}
