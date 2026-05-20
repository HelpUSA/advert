const modules = ['Brand registry', 'Campaign planner', 'Content calendar', 'Draft generator', 'Approval queue', 'Publishing checklist', 'Metrics report', 'Watcher handoff'];

export default function Home() {
 return (
 <main className='page'>
 <section className='hero'>
 <p className='eyebrow'>Advert HelpUS BR</p>
 <h1>Owned advertising operations powered by watcher workflows.</h1>
 <p className='lead'>Plan, create, approve, publish and report promotion for companies, people, services and products using our own tools.</p>
 <div className='pills'><span>Vercel frontend</span><span>Railway API</span><span>advert.helpusbr.com</span></div>
 </section>
 <section className='grid'>
 {modules.map((item) => <article className='card' key={item}><h2>{item}</h2><p>Initial MVP module for safe advertising operations with approval, logs and watcher execution.</p></article>)}
 </section>
 </main>
 );
}
