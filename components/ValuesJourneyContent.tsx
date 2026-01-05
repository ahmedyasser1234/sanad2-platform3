import React from 'react';
import { ShieldCheck, Laptop } from 'lucide-react';
import SanadCharacter from './SanadCharacter.tsx';
import { useNavigate } from 'react-router-dom';

const ValuesJourneyContent: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const navigate = useNavigate();
  const t = {
    ar: {
      title: 'رحلتي القيمية',
      items: [
        { title: 'التزاماتي القيمية', desc: 'ميثاق الطالب والالتزامات الأخلاقية داخل الحرم الجامعي.', icon: ShieldCheck, path: '/rationale/values/obligations' },
        { title: 'البرامج القيمية', desc: 'مبادرات لتعزيز القيم الإنسانية والوطنية والمهنية.', icon: Laptop, path: '/rationale/values/programs' }
      ],
      btnText: 'انطلق الآن'
    },
    en: {
      title: 'Values Journey',
      items: [
        { title: 'My Value Obligations', desc: 'Student charter and ethical obligations on campus.', icon: ShieldCheck, path: '/rationale/values/obligations' },
        { title: 'Value Programs', desc: 'Initiatives to enhance human, national, and professional values.', icon: Laptop, path: '/rationale/values/programs' }
      ],
      btnText: 'Start Now'
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {t.items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative mt-12 bg-white border border-pink-100 px-6 pb-8 pt-20 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 z-20">
                  <SanadCharacter className="w-full h-full drop-shadow-xl" />
                </div>
                <div className="bg-pink-50 p-4 rounded-full mb-4"><Icon className="w-8 h-8 text-pink-600" /></div>
                <h3 className="text-2xl font-black text-[#a087d3] mb-4">{item.title}</h3>
                <p className="text-gray-600 font-bold text-lg mb-8 flex-grow">{item.desc}</p>
                <button 
                  onClick={() => navigate(item.path)}
                  className="w-full bg-gradient-to-r from-[#be63f9] to-[#4b74f6] text-white py-3 rounded-full font-bold shadow-lg"
                >
                  {t.btnText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default ValuesJourneyContent;