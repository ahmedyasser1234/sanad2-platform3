import React, { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';
import UniversityLifeJourneys from './UniversityLifeJourneys';

interface UniversityLifePageProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
}

const UniversityLifePage: React.FC<UniversityLifePageProps> = ({ lang, setLang }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
      ar: {
          heroWelcome: 'رحلة الحياة الجامعية',
          heroTitle: 'كل ما تحتاجه لتجربة جامعية ثرية وملهمة.. من الأنظمة الأكاديمية إلى الأنشطة الطلابية.',
      },
      en: {
          heroWelcome: 'University Life Journey',
          heroTitle: 'Everything you need for an enriching and inspiring university experience.. from academic systems to student activities.',
      }
  };
  
  const t = content[lang];

  return (
    <div className="flex flex-col relative font-sans">
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} customTitle={t.heroTitle} customWelcome={t.heroWelcome} />
      
      <main className="flex-grow">
        <UniversityLifeJourneys lang={lang} />
      </main>

      <ChatAssistant lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default UniversityLifePage;