import Link from 'next/link';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
 title: 'Advert HelpUS BR',
 description: 'Owned advertising operations powered by watcher workflows.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return (
 <html lang='en'>
 <body>
 <header className='topbar'>
 <Link className='brandmark' href='/'>Advert</Link>
 <nav className='navlinks'>
 <Link href='/'>Dashboard</Link>
 <Link href='/brands'>Brands</Link>
 <Link href='/campaigns'>Campaigns</Link>
 <Link href='/calendar'>Calendar</Link>
 <Link href='/drafts'>Drafts</Link>
 <Link href='/approvals'>Approvals</Link>
 <Link href='/workflow'>Workflow</Link>
 <Link href='/reports'>Reports</Link>
 </nav>
 </header>
 {children}
 </body>
 </html>
 );
}
