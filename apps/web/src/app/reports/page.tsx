const reports = [
 { name: 'Advert Stage 3 frontend MVP report', brand: 'Advert HelpUS BR', period: '2026-05-20 to 2026-05-27', status: 'draft', wins: 'Shared navigation, dashboard and refined MVP screens created.', issues: 'Backend and persistence are not active yet.', next: 'Close Stage 3 and start Railway API skeleton.' },
 { name: 'HelpUS service awareness summary', brand: 'HelpUS BR', period: 'Planning period', status: 'planned', wins: 'Campaign, draft, approval and calendar structures defined.', issues: 'First real content package still needs assets.', next: 'Prepare first weekly content package.' },
 { name: 'Professional profile authority summary', brand: 'Professional Profile', period: 'Planning period', status: 'planned', wins: 'Profile workflow, approval gates and safe outreach boundaries defined.', issues: 'Audience, offer and proof points need refinement.', next: 'Clarify niche, proof and tone.' },
];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>Metrics report</h1>
 <p className='lead'>Reports summarize what happened, what worked, what is blocked and what the watcher should do next.</p>
 <div className='statusbar'><span>3 reports</span><span>1 active stage report</span><span>2 planned summaries</span><span>next actions defined</span></div>
 </section>
 <h2 className='sectiontitle'>Operating reports</h2>
 <section className='grid'>
 {reports.map((report) => <article className='card' key={report.name}><p className='eyebrow'>{report.status} - {report.period}</p><h2>{report.name}</h2><p><strong>Brand:</strong> {report.brand}</p><p><strong>Wins:</strong> {report.wins}</p><p><strong>Issues:</strong> {report.issues}</p><p><strong>Next:</strong> {report.next}</p></article>)}
 </section>
 <div className='modulehint'>Next backend version: generate weekly reports from publishing logs, metric snapshots and watcher handoffs.</div>
 </main>
 );
}
