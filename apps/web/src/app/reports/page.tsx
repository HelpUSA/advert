const items = ['Plan', 'Create', 'Approve', 'Publish', 'Report'];

export default function Page() {
 return (
 <main className='page'>
 <section className='hero compact'>
 <p className='eyebrow'>Advert module</p>
 <h1>
Reports
</h1>
 <p className='lead'>Operational workspace for watcher-powered advertising tasks, approval gates and audit-friendly execution.</p>
 </section>
 <section className='grid'>
 {items.map((item) => <article className='card' key={item}><h2>{item}</h2><p>Seed workflow card for 
Reports
 operations.</p></article>)}
 </section>
 </main>
 );
}
