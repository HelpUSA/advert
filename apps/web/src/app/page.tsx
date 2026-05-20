import Link from 'next/link';

export default function Home() {
 return (
 <main className='page'>
 <section className='hero'>
 <p className='eyebrow'>Advert HelpUS BR</p>
 <h1>Owned advertising operations powered by watcher workflows.</h1>
 <p className='lead'>Plan, create, approve, prepare and report promotion for companies, people, services and products using our own product stack.</p>
 <div className='pills'><span>Stage 3 active</span><span>Next.js frontend</span><span>Railway API later</span><span>advert.helpusbr.com</span></div>
 </section>
 <section className='summary'>
 <div className='metric'><strong>OK</strong><span>Stage 1 completed: product foundation</span></div>
 <div className='metric'><strong>OK</strong><span>Stage 2 completed: core planning model</span></div>
 <div className='metric'><strong>NOW</strong><span>Stage 3 active: frontend MVP refinement</span></div>
 </section>
 <section className='grid'>
 <Link className='card linkcard' href='/brands'><p className='eyebrow'>3 items</p><h2>Brand registry</h2><p>Companies, products and professional profiles ready for planning.</p><span>Open module</span></Link>
 <Link className='card linkcard' href='/campaigns'><p className='eyebrow'>3 items</p><h2>Campaigns</h2><p>Seed campaigns with objective, channels, cadence and readiness.</p><span>Open module</span></Link>
 <Link className='card linkcard' href='/calendar'><p className='eyebrow'>4 items</p><h2>Calendar slots</h2><p>Planned content items connected to campaigns and drafts.</p><span>Open module</span></Link>
 <Link className='card linkcard' href='/drafts'><p className='eyebrow'>3 items</p><h2>Content drafts</h2><p>Reusable content assets awaiting review or expansion.</p><span>Open module</span></Link>
 <Link className='card linkcard' href='/approvals'><p className='eyebrow'>4 items</p><h2>Approvals</h2><p>Review queue with requested, approved, changed and blocked states.</p><span>Open module</span></Link>
 <Link className='card linkcard' href='/reports'><p className='eyebrow'>3 items</p><h2>Reports</h2><p>Weekly summaries, wins, issues and next actions.</p><span>Open module</span></Link>
 </section>
 </main>
 );
}
