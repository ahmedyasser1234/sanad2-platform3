import React from 'react';
import { BookOpen, GraduationCap, Star } from 'lucide-react';
import SanadCharacter from './SanadCharacter.tsx';
import { useNavigate } from 'react-router-dom';

const AcademicJourneyContent: React.FC<{ lang: 'ar' | 'en' }> = ({ lang }) => {
  const navigate = useNavigate();
  const t = {
    ar: {
      title: 'رحلتي الأكاديمية',
      items: [
        { title: 'الكليات', desc: 'استكشف كليات الطب، العلوم التطبيقية، التمريض، والأعمال.', icon: BookOpen, path: '/colleges' },
        { title: 'التسجيل والإرشاد الأكاديمي', desc: 'بوابتك لتسجيل المقررات والحصول على الدعم الأكاديمي.', icon: GraduationCap, path: '/rationale/academic/registration' },
        { title: 'المهارات الأساسية', desc: 'برامج لتطوير المهارات العلمية والبحثية والتقنية.', icon: Star, path: '/rationale/academic/skills' }
      ],
      btnText: 'ابدأ الآن'
    },
    en: {
      title: 'Academic Journey',
      items: [
        { title: 'Colleges', desc: 'Explore Medicine, Applied Sciences, Nursing, and Business colleges.', icon: BookOpen, path: '/colleges' },
        { title: 'Registration & Advising', desc: 'Your portal for course registration and academic support.', icon: GraduationCap, path: '/rationale/academic/registration' },
        { title: 'Basic Skills', desc: 'Programs to develop scientific, research, and technical skills.', icon: Star, path: '/rationale/academic/skills' }
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="relative mt-12 bg-white border border-purple-100 px-6 pb-8 pt-20 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 z-20">
                  <SanadCharacter className="w-full h-full drop-shadow-xl" />
                </div>
                <div className="bg-purple-50 p-4 rounded-full mb-4"><Icon className="w-8 h-8 text-purple-600" /></div>
                <h3 className="text-2xl font-black text-[#a087d3] mb-4">{item.title}</h3>
                <p className="text-gray-600 font-bold text-lg mb-8 leading-relaxed flex-grow">{item.desc}</p>
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
export default AcademicJourneyContent;