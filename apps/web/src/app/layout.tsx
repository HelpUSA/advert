import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../lib/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';
import FloatingWhatsapp from '../components/FloatingWhatsapp';

export const metadata: Metadata = {
  title: 'HelpUS Advert • Operações de Publicidade & Marketing',
  description: 'Plataforma de gestão de campanhas publicitárias, criativos e estratégias de marketing de alta conversão da HelpUS.',
  icons: {
    icon: '/img/helpus-logo.png',
    shortcut: '/img/helpus-logo.png',
    apple: '/img/helpus-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/img/helpus-logo.png" type="image/png" />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
        <LanguageProvider>
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <CookieConsent />
          <FloatingWhatsapp />
        </LanguageProvider>
      </body>
    </html>
  );
}
