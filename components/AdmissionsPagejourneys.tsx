import React from 'react';
import { ScrollText, ClipboardList, Headphones } from 'lucide-react';
import SanadCharacter from './SanadCharacter.tsx';
import { useNavigate } from 'react-router-dom';

interface AdmissionsPagejourneysProps {
  lang: 'ar' | 'en';
}

const AdmissionsPagejourneys: React.FC<AdmissionsPagejourneysProps> = ({ lang }) => {
  const navigate = useNavigate();
  
  const content = {
    ar: {
      title: 'رحلتي في القبول',
      description: 'دليلك الشامل لضوابط وإجراءات القبول في الجامعة.',
      items: [
        { 
          title: 'ضوابط القبول', 
          desc: 'تعرف على الشروط والمعايير اللازمة للتقديم في مختلف الكليات.', 
          icon: ScrollText,
          path: '/rationale/admissions/rules'
        },
        { 
          title: 'إجراءات القبول', 
          desc: 'خطوات تقديم الطلب، المستندات المطلوبة، ومواعيد التسجيل.', 
          icon: ClipboardList,
          path: '/rationale/admissions/procedures'
        },
        { 
          title: 'دعم القبول', 
          desc: 'فريق متخصص لمساعدتك في حل أي تحديات تواجهك أثناء التقديم.', 
          icon: Headphones,
          path: '/rationale/admissions/support'
        }
      ],
      btnText: 'عرض التفاصيل'
    },
    en: {
      title: 'Admissions Journey',
      description: 'Your comprehensive guide to university admission rules and procedures.',
      items: [
        { 
          title: 'Admission Rules', 
          desc: 'Learn about the requirements and criteria for various colleges.', 
          icon: ScrollText,
          path: '/rationale/admissions/rules'
        },
        { 
          title: 'Admission Procedures', 
          desc: 'Application steps, required documents, and registration dates.', 
          icon: ClipboardList,
          path: '/rationale/admissions/procedures'
        },
        { 
          title: 'Admission Support', 
          desc: 'A dedicated team to help you solve any challenges during application.', 
          icon: Headphones,
          path: '/rationale/admissions/support'
        }
      ],
      btnText: 'View Details'
    }
  };

  const t = content[lang];

  return (
    <section className="py-20 bg-transparent relative overflow-visible">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="bg-gradient-to-r from-[#be63f9] to-[#4b74f6] text-white px-12 py-5 rounded-[2rem] shadow-lg min-w-[280px] text-center">
            <h2 className="text-2xl md:text-3xl font-bold">{t.title}</h2>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-bold">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {t.items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative mt-12 bg-white border border-purple-100 px-6 pb-8 pt-20 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                  <SanadCharacter className="w-full h-full drop-shadow-xl" />
                </div>
                <div className="bg-purple-50 p-4 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-black text-[#a087d3] mb-4">{item.title}</h3>
                <p className="text-gray-600 font-bold text-lg mb-8 leading-relaxed flex-grow">{item.desc}</p>
                
                <button 
                  onClick={() => navigate(item.path)}
                  className="w-full bg-gradient-to-r from-[#be63f9] to-[#4b74f6] hover:opacity-95 text-white text-lg font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
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

export default AdmissionsPagejourneys;