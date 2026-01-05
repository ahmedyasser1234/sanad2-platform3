
import React from 'react';
import { Link } from 'react-router-dom';
import { Journey } from '../types';

interface JourneysProps {
    lang: 'ar' | 'en';
}

const JOURNEY_ICONS = {
        admissions: "/images/Asset 4@2x.png",
    university: "/images/Asset 9@2x.png",
    financial: "/images/Asset 10@2x.png",
    academic: "/images/Asset 16@2x.png",
    values: "/images/Asset 3@2x.png"
};

const DECORATIVE_ROCKET_ICON = "/images/Asset 17@2x.png";

const Journeys: React.FC<JourneysProps> = ({ lang }) => {
  const content = {
      ar: {
          header: 'رحلات سند',
          btn: 'ابدأ الرحلة',
          items: [
            'رحلتي في القبول',
            'رحلتي في الحياة الجامعية',
            'رحلتي في المنح الدراسية والحلول المالية',
            'رحلتي الأكاديمية',
            'رحلتي القيمية'
          ]
      },
      en: {
          header: 'Sanad Journeys',
          btn: 'Start Journey',
          items: [
            'Admissions Journey',
            'University Life Journey',
            'Scholarships & Financial Journey',
            'Academic Journey',
            'Values Journey'
          ]
      }
  };

  const t = content[lang];

  const journeys: (Journey & { link: string; id: string })[] = [
    { id: 'admissions', title: t.items[0], icon: JOURNEY_ICONS.admissions, link: '/admissions' },
    { id: 'university', title: t.items[1], icon: JOURNEY_ICONS.university, link: '/university-life' },
    { id: 'financial', title: t.items[2], icon: JOURNEY_ICONS.financial, link: '/scholarships-journey' },
    { id: 'academic', title: t.items[3], icon: JOURNEY_ICONS.academic, link: '/academic-journey' },
    { id: 'values', title: t.items[4], icon: JOURNEY_ICONS.values, link: '/values-journey' }
  ];

  return (
    <section className="relative z-20 bg-transparent pb-20">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-full flex justify-center">
            <div className="bg-white/40 backdrop-blur-xl border border-white/60 px-12 md:px-24 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                <h2 className="text-2xl md:text-4xl font-bold pb-1 bg-gradient-to-r from-[#b05df5] to-[#5582f6] bg-clip-text text-transparent whitespace-nowrap">
                    {t.header}
                </h2>
            </div>
      </div>

      <div className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {journeys.map((journey) => (
                <div key={journey.id} className="relative group h-full flex flex-col items-center">
                    <div className="w-full flex-1 bg-gradient-to-tl from-white from-50% to-[#E4D3FC] rounded-[2.5rem] p-5 py-10 shadow-[0_15px_35px_-12px_rgba(0,0,0,0.08)] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white flex flex-col items-center justify-center text-center min-h-[260px]">
                        <div className="mb-6 transform transition-transform group-hover:scale-110 duration-300">
                            <img src={journey.icon} alt={journey.title} className="w-24 h-24 object-contain drop-shadow-sm" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold leading-tight px-1 min-h-[4rem] flex items-center justify-center bg-gradient-to-r from-[#a855f7] to-[#3b82f6] bg-clip-text text-transparent">
                            {journey.title}
                        </h3>
                    </div>

                    <Link 
                        to={journey.link}
                        className="mt-8 bg-gradient-to-r from-[#be63f9] to-[#4b74f6] hover:opacity-95 text-white text-lg md:text-xl font-bold py-2.5 px-8 md:px-14 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap inline-block text-center"
                    >
                        {t.btn}
                    </Link>
                </div>
            ))}
        </div>
        
        <div className={`flex justify-center md:justify-start relative mt-4 ${lang === 'ar' ? 'md:mr-32 lg:mr-64' : 'md:ml-32 lg:ml-64 transform scale-x-[-1]'}`}>
             <div className="w-20 h-20 md:w-32 md:h-32 transform rotate-[45deg] relative animate-pulse" style={{ animationDuration: '4s' }}>
                <img src={DECORATIVE_ROCKET_ICON} alt="Rocket" className="w-full h-full object-contain drop-shadow-md" />
             </div>
        </div>
      </div>
    </section>
  );
};

export default Journeys;
