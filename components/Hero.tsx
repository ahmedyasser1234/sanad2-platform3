
import React, { useState, useEffect } from 'react';
import SanadCharacter from './SanadCharacter';

interface HeroProps {
    lang: 'ar' | 'en';
    customTitle?: string;
    customWelcome?: string;
}

const Hero: React.FC<HeroProps> = ({ lang, customTitle, customWelcome }) => {
  const content = {
      ar: {
          welcome: 'هلا وغلا سند معك',
          title: 'مركز سند نموذجاً رائداً في رعاية وتمكين المستفيدين بالجامعة.',
      },
      en: {
          welcome: 'Hello & Welcome, Sanad here',
          title: 'Sanad Center is a pioneering model in caring for and empowering beneficiaries at the university.',
      }
  };

  const t = {
      ...content[lang],
      title: customTitle || content[lang].title,
      welcome: customWelcome || content[lang].welcome
  };
  
  const [showDots, setShowDots] = useState(false);
  const [showPill, setShowPill] = useState(false);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    const t1 = setTimeout(() => setShowDots(true), 500);
    const t2 = setTimeout(() => setShowPill(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (showPill && displayText.length < t.welcome.length) {
      const timeout = setTimeout(() => {
        setDisplayText(t.welcome.slice(0, displayText.length + 1));
      }, 70);
      return () => clearTimeout(timeout);
    }
  }, [displayText, showPill, t.welcome]);

  const triggerChat = () => {
    const chatTrigger = document.getElementById('chat-trigger-btn');
    if (chatTrigger) chatTrigger.click();
  };

  return (
    <section className="relative w-full pt-20 md:pt-32 pb-4 overflow-visible">
        <div className="container mx-auto px-4 relative min-h-[500px] lg:min-h-[550px]">
            
            <div className={`absolute top-0 z-20 flex flex-col transition-all duration-500 ${lang === 'ar' ? 'right-0 items-end' : 'left-0 items-start'}`}>
                {/* Adjusted mobile margins: -mr-12 for Arabic and ml-16 for English on mobile to move right */}
                <div className={`relative mt-12 md:mt-0 ${lang === 'ar' ? '-mr-12 md:mr-12 lg:mr-24 xl:mr-32' : 'ml-16 md:ml-12 lg:ml-24 xl:ml-32'}`}>
                    
                    <div className={`absolute z-30 flex items-end min-w-max transition-all duration-500 ${lang === 'ar' ? 'top-[15%] right-[85%]' : 'top-[15%] left-[85%]'}`}>
                         <div className="flex items-end gap-2">
                             <div className={`flex items-end mb-1 gap-1 transition-all duration-500 ease-out transform ${showDots ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                                <div className="w-2 h-2 bg-sanad-soft rounded-full"></div>
                                <div className="w-4 h-4 bg-sanad-soft rounded-full"></div>
                            </div>

                             <div className={`bg-sanad-soft text-white px-8 py-3 md:px-10 md:py-4 rounded-[2rem] text-sm md:text-2xl font-bold shadow-sm whitespace-nowrap mb-2 min-w-[120px] md:min-w-[200px] transition-all duration-500 ease-out transform ${showPill ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} ${lang === 'ar' ? 'origin-bottom-right' : 'origin-bottom-left'}`}>
                                {displayText}
                                {displayText.length < t.welcome.length && <span className="animate-pulse">|</span>}
                             </div>
                         </div>
                    </div>

                    <div 
                        onClick={triggerChat}
                        className={`w-[280px] md:w-[480px] lg:w-[520px] flex items-end justify-center relative z-0 mt-8 md:mt-12 transition-transform duration-500 cursor-pointer hover:scale-105 active:scale-95 ${lang === 'en' ? 'scale-x-[-1]' : ''}`}
                    >
                         <SanadCharacter className="w-full h-auto drop-shadow-xl relative z-10" />
                         <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 w-[60%] h-6 bg-black/10 blur-xl rounded-[100%] z-0"></div>
                    </div>
                </div>
            </div>

            <div className={`w-full flex flex-col items-center justify-center relative z-10 pt-96 md:pt-96 lg:pt-64 ${lang === 'ar' ? 'lg:pr-[35%]' : 'lg:pl-[35%]'}`}>
                <div className="bg-white/90 backdrop-blur-xl border border-white/50 px-8 py-8 md:px-12 md:py-10 lg:px-16 lg:py-12 rounded-[2.5rem] md:rounded-[3rem] w-full max-w-2xl shadow-[0_15px_40px_rgba(255,200,220,0.1)] text-center transition-all">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-700 leading-snug">
                        {t.title}
                    </h2>
                </div>
            </div>

        </div>
    </section>
  );
};

export default Hero;
