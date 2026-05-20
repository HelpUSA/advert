const approvals = [
 { draft: 'Why owned advertising matters', brand: 'Advert HelpUS BR', reviewer: 'Manager', status: 'approved', priority: 'ready', decision: 'Approved for publishing task preparation', note: 'Ready to become a publishing task.', next: 'Create publishing checklist' },
 { draft: 'HelpUS service checklist', brand: 'HelpUS BR', reviewer: 'Manager', status: 'changes_requested', priority: 'needs edits', decision: 'Revise before approval', note: 'Needs clearer CTA and audience definition.', next: 'Update carousel brief and resubmit' },
 { draft: 'Professional authority bio', brand: 'Professional Profile', reviewer: 'Manager', status: 'requested', priority: 'waiting', decision: 'Pending review', note: 'Waiting for review before publication planning.', next: 'Manager review required' },
 { draft: 'Mass DM outreach idea', brand: 'Professional Profile', reviewer: 'Safety gate', status: 'blocked', priority: 'blocked', decision: 'Rejected by safety gate', note: 'Mass DMs are not allowed in Advert automation.', next: 'Replace with owned-channel content plan' },
];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>Approval queue</h1>
 <p className='lead'>Approvals protect the workflow. Drafts must be reviewed before they can become ready publishing tasks.</p>
 <div className='statusbar'><span>4 approval items</span><span>1 approved</span><span>1 needs edits</span><span>1 blocked</span></div>
 </section>
 <h2 className='sectiontitle'>Review decisions</h2>
 <section className='grid'>
 {approvals.map((item) => <article className='card' key={item.draft}><p className='eyebrow'>{item.status} - {item.priority}</p><h2>{item.draft}</h2><p><strong>Brand:</strong> {item.brand}</p><p><strong>Reviewer:</strong> {item.reviewer}</p><p><strong>Decision:</strong> {item.decision}</p><p><strong>Note:</strong> {item.note}</p><p><strong>Next:</strong> {item.next}</p></article>)}
 </section>
 <div className='modulehint'>Next backend version: store approval history, reviewer notes and immutable safety decisions.</div>
 </main>
 );
}
