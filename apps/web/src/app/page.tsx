import Link from 'next/link';

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
 <Link className='card linkcard' href='/brands'><h2>Brand registry</h2><p>Profiles for companies, people, services and products.</p><span>Open module</span></Link>
 <Link className='card linkcard' href='/campaigns'><h2>Campaign planner</h2><p>Define objective, audience, channels and cadence.</p><span>Open module</span></Link>
 <Link className='card linkcard' href='/calendar'><h2>Content calendar</h2><p>Organize weekly and monthly publishing plans.</p><span>Open module</span></Link>
 <Link className='card linkcard' href='/drafts'><h2>Draft generator</h2><p>Prepare posts, scripts, briefs and reusable assets.</p><span>Open module</span></Link>
 <Link className='card linkcard' href='/approvals'><h2>Approval queue</h2><p>Review and authorize before publishing.</p><span>Open module</span></Link>
 <Link className='card linkcard' href='/reports'><h2>Metrics report</h2><p>Track results and next actions.</p><span>Open module</span></Link>
 <Link className='card linkcard' href='/workflow'><h2>Watcher workflow</h2><p>Operational handoff and execution model.</p><span>Open module</span></Link>
 </section>
 </main>
 );
}
