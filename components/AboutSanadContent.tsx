import React from 'react';
import { Info, Target, Gem } from 'lucide-react';
import SanadCharacter from './SanadCharacter.tsx';
import { useNavigate } from 'react-router-dom';

const AboutSanadContent: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const navigate = useNavigate();
  const t = {
    ar: {
      title: 'تعرف على مركز سند',
      items: [
        { 
          title: 'من نحن', 
          desc: 'منصة تفاعلية رقمية حديثة تواكب هوية الجامعة وتجمع ما يحتاجه الطالب.', 
          icon: Info 
        },
        { 
          title: 'الرؤية والرسالة', 
          desc: 'أن نكون نموذجاً رائداً في رعاية وتمكين المستفيدين بجودة عالمية.', 
          icon: Target 
        },
        { 
          title: 'قيمنا', 
          desc: 'العناية، الشفافية، التمكين، الشراكة، والجودة في كل خدمة.', 
          icon: Gem 
        }
      ],
      btnText: 'اقرأ المزيد'
    },
    en: {
      title: 'About Sanad Center',
      items: [
        { 
          title: 'Who We Are', 
          desc: 'A modern interactive digital platform aligning with university identity.', 
          icon: Info 
        },
        { 
          title: 'Vision & Mission', 
          desc: 'To be a pioneering model in caring for and empowering beneficiaries.', 
          icon: Target 
        },
        { 
          title: 'Our Values', 
          desc: 'Care, Transparency, Empowerment, Partnership, and Quality.', 
          icon: Gem 
        }
      ],
      btnText: 'Read More'
    }
  }[lang];

  return (
    <section className="py-20 relative pt-12">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="bg-gradient-to-r from-[#be63f9] to-[#4b74f6] text-white px-12 py-5 rounded-[2rem] shadow-lg min-w-[280px] text-center">
            <h2 className="text-2xl md:text-3xl font-bold">{t.title}</h2>
        </div>
      </div>
      <div className="container mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative mt-12 bg-white border border-purple-100 px-6 pb-8 pt-20 rounded-[2.5rem] shadow-sm flex flex-col items-center text-center">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 z-20 animate-float">
                  <SanadCharacter className="w-full h-full drop-shadow-xl" />
                </div>
                <div className="bg-purple-50 p-4 rounded-full mb-4"><Icon className="w-8 h-8 text-purple-600" /></div>
                <h3 className="text-2xl font-black text-[#a087d3] mb-4">{item.title}</h3>
                <p className="text-gray-600 font-bold text-lg mb-8 flex-grow">{item.desc}</p>
                <button 
                  onClick={() => navigate('/rationale/about')}
                  className="w-full bg-gradient-to-r from-[#be63f9] to-[#4b74f6] text-white py-3 rounded-full font-bold shadow-lg"
                >
                  {t.btnText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes float { 0%, 100% { transform: translate(-50%, 0); } 50% { transform: translate(-50%, -10px); } }
        .animate-float { animation: float 3s infinite ease-in-out; }
      `}</style>
    </section>
  );
};
export default AboutSanadContent;