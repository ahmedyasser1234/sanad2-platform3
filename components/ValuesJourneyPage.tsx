import React, { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';
import ValuesJourneyContent from './ValuesJourneyContent';

const ValuesJourneyPage: React.FC<{ lang: 'ar' | 'en'; setLang: (l: any) => void }> = ({ lang, setLang }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const t = {
    ar: { welcome: 'رحلتي القيمية', title: 'نبني القيم لنصنع المستقبل.. استكشف التزاماتك وبرامجك القيمية.' },
    en: { welcome: 'Values Journey', title: 'Building values for the future.. explore your value obligations and programs.' }
  }[lang];

  return (
    <div className="flex flex-col relative font-sans">
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} customTitle={t.title} customWelcome={t.welcome} />
      <main className="flex-grow"><ValuesJourneyContent lang={lang} /></main>
      <ChatAssistant lang={lang} /><Footer lang={lang} />
    </div>
  );
};
export default ValuesJourneyPage;