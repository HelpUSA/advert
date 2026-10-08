import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '../lib/LanguageContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieConsent from '../components/CookieConsent';

export const metadata: Metadata = {
  title: 'HelpUS Advert • Operações de Publicidade & Marketing com IA',
  description: 'Plataforma corporativa de gestão de campanhas publicitárias, marcas, calendário editorial e esteira de aprovações da HelpUS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
        <LanguageProvider>
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  );
}
