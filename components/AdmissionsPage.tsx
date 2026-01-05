import React, { useEffect } from 'react';
import Header from './Header.tsx';
import Hero from './Hero.tsx';
import Footer from './Footer.tsx';
import ChatAssistant from './ChatAssistant.tsx';
import AdmissionsPagejourneys from './AdmissionsPagejourneys.tsx';


interface AdmissionsPageProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
}

const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ lang, setLang }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
      ar: {
          heroWelcome: 'رحلة القبول',
          heroTitle: 'بوابتك للانضمام إلى مجتمعنا الأكاديمي المتميز.. كل ما تحتاجه للقبول والتسجيل.',
      },
      en: {
          heroWelcome: 'Admissions Journey',
          heroTitle: 'Your gateway to joining our distinguished academic community... everything you need for admission.',
      }
  };
  
  const t = content[lang];

  return (
    <div className="flex flex-col relative font-sans">
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} customTitle={t.heroTitle} customWelcome={t.heroWelcome} />
      
      <main className="flex-grow">
        <AdmissionsPagejourneys lang={lang} />
      </main>

      <ChatAssistant lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default AdmissionsPage;