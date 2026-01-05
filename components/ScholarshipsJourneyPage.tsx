import React, { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';
import ScholarshipsJourneyContent from './ScholarshipsJourneyContent';

const ScholarshipsJourneyPage: React.FC<{ lang: 'ar' | 'en'; setLang: (l: any) => void }> = ({ lang, setLang }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const t = {
    ar: { welcome: 'رحلة المنح والحلول المالية', title: 'دعمنا المالي يرافقك.. من طلب المنحة إلى استكمال الالتزامات.' },
    en: { welcome: 'Scholarships & Financial Journey', title: 'Our financial support accompanies you.. from application to obligations.' }
  }[lang];

  return (
    <div className="flex flex-col relative font-sans">
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} customTitle={t.title} customWelcome={t.welcome} />
      <main className="flex-grow"><ScholarshipsJourneyContent lang={lang} /></main>
      <ChatAssistant lang={lang} /><Footer lang={lang} />
    </div>
  );
};
export default ScholarshipsJourneyPage;