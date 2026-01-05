import React, { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';
import AcademicJourneyContent from './AcademicJourneyContent';

interface Props {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
}

const AcademicJourneyPage: React.FC<Props> = ({ lang, setLang }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const t = {
    ar: { welcome: 'رحلتي الأكاديمية', title: 'دليلك للنجاح الأكاديمي.. من اختيار الكلية إلى إتقان المهارات الأساسية.' },
    en: { welcome: 'Academic Journey', title: 'Your guide to academic success.. from choosing a college to mastering core skills.' }
  }[lang];

  return (
    <div className="flex flex-col relative font-sans">
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} customTitle={t.title} customWelcome={t.welcome} />
      <main className="flex-grow"><AcademicJourneyContent lang={lang} /></main>
      <ChatAssistant lang={lang} /><Footer lang={lang} />
    </div>
  );
};

export default AcademicJourneyPage;