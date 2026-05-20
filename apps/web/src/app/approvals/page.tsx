const approvals = [
 { draft: 'Why owned advertising matters', brand: 'Advert HelpUS BR', reviewer: 'Manager', status: 'approved', note: 'Ready to become a publishing task.' },
 { draft: 'HelpUS service checklist', brand: 'HelpUS BR', reviewer: 'Manager', status: 'changes_requested', note: 'Needs clearer CTA and audience definition.' },
 { draft: 'Professional authority bio', brand: 'Professional Profile', reviewer: 'Manager', status: 'requested', note: 'Waiting for review before publication planning.' },
 { draft: 'Mass DM outreach idea', brand: 'Professional Profile', reviewer: 'Safety gate', status: 'blocked', note: 'Mass DMs are not allowed in Advert automation.' },
];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>Approval queue</h1>
 <p className='lead'>Approvals protect the workflow. Drafts must be reviewed before they can become ready publishing tasks.</p>
 </section>
 <section className='grid'>
 {approvals.map((item) => <article className='card' key={item.draft}><p className='eyebrow'>{item.status}</p><h2>{item.draft}</h2><p><strong>Brand:</strong> {item.brand}</p><p><strong>Reviewer:</strong> {item.reviewer}</p><p><strong>Note:</strong> {item.note}</p></article>)}
 </section>
 </main>
 );
}
