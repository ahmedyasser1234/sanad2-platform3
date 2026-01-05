import React from 'react';
import { UserCheck, Heart, Coffee } from 'lucide-react';
import SanadCharacter from './SanadCharacter.tsx';
import { useNavigate } from 'react-router-dom';

interface UniversityLifeJourneysProps {
  lang: 'ar' | 'en';
}

const UniversityLifeJourneys: React.FC<UniversityLifeJourneysProps> = ({ lang }) => {
  const navigate = useNavigate();
  const content = {
    ar: {
      title: 'رحلتي في الحياة الجامعية',
      items: [
        { title: 'المهارات والقيادة', desc: 'برامج تطوير الشخصية والمهارات القيادية للطلاب.', icon: UserCheck, path: '/rationale/university-life/skills' },
        { title: 'العمل التطوعي', desc: 'فرص العطاء والمشاركة المجتمعية الفعالة.', icon: Heart, path: '/rationale/university-life/volunteering' },
        { title: 'الخدمات الطلابية', desc: 'السكن، التغذية، والمرافق الداعمة للطالب.', icon: Coffee, path: '/rationale/university-life/services' }
      ],
      btnText: 'استكشف الآن'
    },
    en: {
      title: 'University Life Journey',
      items: [
        { title: 'Skills & Leadership', desc: 'Personal development and leadership skills programs.', icon: UserCheck, path: '/rationale/university-life/skills' },
        { title: 'Volunteering', desc: 'Giving opportunities and active community participation.', icon: Heart, path: '/rationale/university-life/volunteering' },
        { title: 'Student Services', desc: 'Housing, dining, and supportive student facilities.', icon: Coffee, path: '/rationale/university-life/services' }
      ],
      btnText: 'Explore Now'
    }
  };

  const t = content[lang];

  return (
    <section className="py-20 bg-transparent relative overflow-visible">
      <div className="absolute top-12 md:top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="bg-gradient-to-r from-[#be63f9] to-[#4b74f6] text-white px-12 py-5 rounded-[2rem] shadow-lg min-w-[280px] text-center">
            <h2 className="text-2xl md:text-3xl font-bold">{t.title}</h2>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative mt-12 bg-white border border-sky-100 px-6 pb-8 pt-20 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 z-20 animate-pulse">
                  <SanadCharacter className="w-full h-full drop-shadow-xl" />
                </div>
                <div className="bg-sky-50 p-4 rounded-full mb-4"><Icon className="w-8 h-8 text-sky-600" /></div>
                <h3 className="text-2xl font-black text-[#a087d3] mb-4">{item.title}</h3>
                <p className="text-gray-600 font-bold text-lg leading-relaxed mb-8 flex-grow">{item.desc}</p>
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

export default UniversityLifeJourneys;