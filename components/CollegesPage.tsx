import React, { useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';
import SanadCharacter from './SanadCharacter';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, FlaskConical, HeartPulse, Briefcase } from 'lucide-react';

interface Props {
  lang: 'ar' | 'en';
  setLang: (l: any) => void;
}

const CollegesPage: React.FC<Props> = ({ lang, setLang }) => {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const t = {
    ar: {
      welcome: 'الكليات والبرامج',
      title: 'استكشف التخصصات الأكاديمية والمسارات العلمية المتاحة لك.',
      items: [
        { title: 'كلية الطب', icon: Stethoscope, id: 'medicine' },
        { title: 'العلوم التطبيقية', icon: FlaskConical, id: 'applied-sciences' },
        { title: 'كلية التمريض', icon: HeartPulse, id: 'nursing' },
        { title: 'كلية الأعمال', icon: Briefcase, id: 'business' }
      ],
      btn: 'عرض تفاصيل الكلية'
    },
    en: {
      welcome: 'Colleges & Programs',
      title: 'Explore available academic majors and scientific tracks.',
      items: [
        { title: 'College of Medicine', icon: Stethoscope, id: 'medicine' },
        { title: 'Applied Sciences', icon: FlaskConical, id: 'applied-sciences' },
        { title: 'College of Nursing', icon: HeartPulse, id: 'nursing' },
        { title: 'Business College', icon: Briefcase, id: 'business' }
      ],
      btn: 'View College Details'
    }
  }[lang];

  return (
    <div className="flex flex-col relative font-sans">
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} customTitle={t.title} customWelcome={t.welcome} />
      
      <main className="flex-grow py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.items.map((college, idx) => {
              const Icon = college.icon;
              return (
                <div key={idx} className="relative mt-12 bg-white border border-purple-100 px-6 pb-8 pt-20 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center">
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 z-20">
                    <SanadCharacter className="w-full h-full drop-shadow-xl" />
                  </div>
                  <div className="bg-purple-50 p-4 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-black text-[#a087d3] mb-6 min-h-[4rem] flex items-center">{college.title}</h3>
                  <button 
                    onClick={() => navigate(`/rationale/academic-colleges/${college.id}`)}
                    className="w-full bg-gradient-to-r from-[#be63f9] to-[#4b74f6] text-white py-3 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all"
                  >
                    {t.btn}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <ChatAssistant lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default CollegesPage;