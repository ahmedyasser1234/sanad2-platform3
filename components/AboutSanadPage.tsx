import React, { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';
import AboutSanadContent from './AboutSanadContent';

const AboutSanadPage: React.FC<{ lang: 'ar' | 'en'; setLang: (l: any) => void }> = ({ lang, setLang }) => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  
  const content = {
    ar: { 
      welcome: 'تعرف على سند', 
      title: 'نحن هنا لنكون عوناً لك في كل خطوة.. اكتشف هوية وأهداف مركز سند.' 
    },
    en: { 
      welcome: 'About Sanad', 
      title: 'We are here to support you at every step.. discover the identity and goals of Sanad Center.' 
    }
  };
  const t = content[lang];

  return (
    <div className="flex flex-col relative font-sans">
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} customTitle={t.title} customWelcome={t.welcome} />
      <main className="flex-grow">
        <AboutSanadContent lang={lang} />
      </main>
      <ChatAssistant lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default AboutSanadPage;