import React from 'react';

interface VisionMissionProps {
    lang: 'ar' | 'en';
}

// --- CONFIGURATION ---
const VISION_ICON = "/images/Asset 18@2x.png";
const MISSION_ICON = "/images/Asset 15@2x.png";

const VisionMission: React.FC<VisionMissionProps> = ({ lang }) => {
  const content = {
      ar: {
          visionTitle: 'الرؤية',
          visionDesc: 'أن يكون مركز سند نموذجاً رائداً في رعاية وتمكين المستفيدين بالجامعة.',
          missionTitle: 'الرسالة',
          missionDesc: 'تقديم خدمات متكاملة تضمن رضا المستفيد، وتسهم في تحسين تجربتهم الجامعية.'
      },
      en: {
          visionTitle: 'Our Vision',
          visionDesc: 'To be a pioneering model in caring for and empowering beneficiaries at the university.',
          missionTitle: 'Our Mission',
          missionDesc: 'Providing integrated services that ensure beneficiary satisfaction and contribute to improving their university experience.'
      }
  };

  const t = content[lang];

  return (
    <section className="py-16 pb-32">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center gap-10 md:gap-20 items-stretch">
        
        {/* Vision Card */}
        <div className="relative w-full max-w-md group">
             {/* Icon Header - Replaced Icon with Image */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="bg-white p-4 rounded-full shadow-lg border border-purple-50">
                    <img 
                        src={VISION_ICON} 
                        alt="Vision" 
                        className="w-10 h-10 object-contain"
                    />
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 pt-16 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-50 text-center h-full flex flex-col items-center hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-sanad-soft mb-6">{t.visionTitle}</h2>
                <p className="text-sanad-dark leading-loose text-lg font-medium">
                    {t.visionDesc}
                </p>
            </div>
        </div>

        {/* Mission Card */}
        <div className="relative w-full max-w-md mt-16 md:mt-0 group">
             {/* Icon Header - Replaced Icon with Image */}
             <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10 transition-transform duration-300 group-hover:-translate-y-2">
                <div className="bg-white p-4 rounded-full shadow-lg border border-purple-50">
                    <img 
                        src={MISSION_ICON} 
                        alt="Mission" 
                        className="w-10 h-10 object-contain"
                    />
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 pt-16 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-50 text-center h-full flex flex-col items-center hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] transition-shadow duration-300">
                <h2 className="text-3xl font-bold text-sanad-soft mb-6">{t.missionTitle}</h2>
                <p className="text-sanad-dark leading-loose text-lg font-medium">
                    {t.missionDesc}
                </p>
            </div>
        </div>

      </div>
    </section>
  );
};

export default VisionMission;