import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import SanadCharacter from './SanadCharacter';

interface AboutSanadProps {
  lang: 'ar' | 'en';
}

const AboutSanad: React.FC<AboutSanadProps> = ({ lang }) => {
  const content = {
    ar: {
      title: 'تعرف على سند',
      description: 'تحرص الجامعة على تقديم تجربة تعليمية متكاملة لطلبتها، ويأتي مقترح إنشاء تطبيق "سند" كمنصة تفاعلية رقمية حديثة تواكب هوية الجامعة وتجمع في مكان واحد جميع ما يحتاجه الطالب في حياته الجامعية.',
      justificationsTitle: 'المبررات',
      objectivesTitle: 'الأهداف',
      justifications: [
        'غياب وجود دليل طالبي محدث ومتكامل.',
        'تشتت المعلومات بين عدة مصادر وإدارات.',
        'الحاجة لتجربة طالبية رقمية تفاعلية تتماشى مع رؤية التحول الرقمي.',
        'تعزيز سهولة الوصول للمعلومات والخدمات عبر الأجهزة الذكية.',
        'إبراز هوية الجامعة الحديثة وتجسيد اهتمامها بجودة تجربة الطالب.'
      ],
      objectives: [
        'إنشاء منصة موحدة للطالب تسهّل الوصول إلى المعلومات والخدمات.',
        'تعزيز تجربة الطالب في جميع الجوانب (الأكاديمية، الخدمية، الاجتماعية).',
        'تحسين قنوات التواصل بين الطالب والإدارات الجامعية.',
        'تقديم تجربة رقمية محدثة بشكل مستمر ومرنة للتطوير.',
        'دعم توجه الجامعة في التميز والابتكار في تجربة الطالب.'
      ]
    },
    en: {
      title: 'About Sanad',
      description: 'The university is keen on providing an integrated educational experience. The "Sanad" app proposal serves as a modern interactive digital platform aligning with the university identity and consolidating all student needs in one place.',
      justificationsTitle: 'Rationale',
      objectivesTitle: 'Objectives',
      justifications: [
        'Lack of an updated and integrated student guide.',
        'Information scattered across multiple sources and departments.',
        'Need for an interactive digital experience matching the digital transformation vision.',
        'Enhancing ease of access to information and services via smart devices.',
        'Highlighting the modern university identity and focus on student experience quality.'
      ],
      objectives: [
        'Creating a unified platform for easy access to info and services.',
        'Enhancing student experience in all aspects (Academic, Service, Social).',
        'Improving communication channels between students and university departments.',
        'Providing a continuously updated and flexible digital experience.',
        'Supporting the university’s drive for excellence and innovation in student experience.'
      ]
    }
  };

  const t = content[lang];

  return (
    <section className="py-20 bg-transparent relative overflow-visible">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-sanad-secondary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-sanad-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute top-12 md:top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="bg-gradient-to-r from-[#be63f9] to-[#4b74f6] text-white px-12 py-5 rounded-[2rem] shadow-[0_10px_30px_rgba(190,99,249,0.3)] min-w-[280px] text-center">
            <h2 className="text-2xl md:text-3xl font-bold">{t.title}</h2>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-bold">
            {t.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 pt-4">
          <div className="relative mt-12 bg-gradient-to-br from-purple-50 to-white border border-purple-100 px-6 pb-8 pt-20 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
            <div className={`absolute -top-16 ${lang === 'en' ? 'left-[30%]' : 'left-[35%]'} md:left-[310px] transform -translate-x-1/2 md:translate-x-0 w-32 h-32 z-20 animate-bounce`} style={{ animationDuration: '3s' }}>
                 <SanadCharacter className="w-full h-full drop-shadow-xl" />
            </div>
            <div className="flex flex-col items-center gap-2 mb-5 text-center">
              <h3 className="text-3xl md:text-4xl font-black text-[#a087d3] tracking-wide pb-1">{t.justificationsTitle}</h3>
            </div>
            <ul className="space-y-3">
              {t.justifications.map((item, idx) => (
                <li key={idx} className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-purple-100 shrink-0">
                    <Sparkles className="w-5 h-5 text-[#b558f0] fill-purple-100" />
                  </div>
                  <span className="text-gray-700 font-bold text-lg md:text-xl leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mt-12 bg-gradient-to-br from-sky-50 to-white border border-sky-100 px-6 pb-8 pt-20 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow">
             <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 z-20 animate-pulse" style={{ animationDuration: '4s' }}>
                 <SanadCharacter className="w-full h-full drop-shadow-xl" />
            </div>
            <div className="flex flex-col items-center gap-2 mb-5 text-center">
              <h3 className="text-3xl md:text-4xl font-black text-[#a087d3] tracking-wide pb-1">{t.objectivesTitle}</h3>
            </div>
            <ul className="space-y-3">
              {t.objectives.map((item, idx) => (
                <li key={idx} className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-sky-100 shrink-0">
                     <Check className="w-6 h-6 text-[#127fc0]" strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 font-bold text-lg md:text-xl leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSanad;