const reports = [
 { name: 'Advert Stage 2 weekly report', brand: 'Advert HelpUS BR', period: '2026-05-20 to 2026-05-27', status: 'draft', wins: 'Core model and seed screens created.', next: 'Close Stage 2 and start frontend MVP refinement.' },
 { name: 'HelpUS service awareness summary', brand: 'HelpUS BR', period: 'Planning period', status: 'planned', wins: 'Campaign and draft structures defined.', next: 'Prepare first content package.' },
 { name: 'Professional profile authority summary', brand: 'Professional Profile', period: 'Planning period', status: 'planned', wins: 'Profile workflow and approval gates defined.', next: 'Clarify audience, offer and tone.' },
];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>Metrics report</h1>
 <p className='lead'>Reports summarize what happened, what worked, what is blocked and what the watcher should do next.</p>
 </section>
 <section className='grid'>
 {reports.map((report) => <article className='card' key={report.name}><p className='eyebrow'>{report.status}</p><h2>{report.name}</h2><p><strong>Brand:</strong> {report.brand}</p><p><strong>Period:</strong> {report.period}</p><p><strong>Wins:</strong> {report.wins}</p><p><strong>Next:</strong> {report.next}</p></article>)}
 </section>
 </main>
 );
}
