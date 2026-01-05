
import React from 'react';
import { MessageSquare, Search } from 'lucide-react';

interface SanadServicesProps {
  lang: 'ar' | 'en';
}

const SanadServices: React.FC<SanadServicesProps> = ({ lang }) => {
  const content = {
    ar: {
      title: 'خدمات سند',
      services: [
        {
          title: 'التواصل والدعم',
          desc: 'منصة موحدة للتواصل، نظام تذاكر إلكترونية لمتابعة الطلبات.',
          icon: MessageSquare,
          color: 'text-teal-500',
          bg: 'bg-teal-50'
        },
        {
          title: 'دليل تفاعلي ذكي',
          desc: 'تصنيف للخدمات، ومحرك بحث ذكي للوصول السريع.',
          icon: Search,
          color: 'text-indigo-500',
          bg: 'bg-indigo-50'
        }
      ]
    },
    en: {
      title: 'Sanad Services',
      services: [
        {
          title: 'Communication',
          desc: 'Unified communication platform, electronic ticketing system.',
          icon: MessageSquare,
          color: 'text-teal-500',
          bg: 'bg-teal-50'
        },
        {
          title: 'Smart Guide',
          desc: 'Service classification and smart search for quick access.',
          icon: Search,
          color: 'text-indigo-500',
          bg: 'bg-indigo-50'
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <section id="sanad-services-section" className="py-20 relative bg-transparent">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full flex justify-center">
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 px-24 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
            <h2 className="text-3xl md:text-4xl font-bold pb-1 bg-gradient-to-r from-[#b05df5] to-[#5582f6] bg-clip-text text-transparent">
                {t.title}
            </h2>
        </div>
      </div>
      <div className="container mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {t.services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div key={idx} className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 group hover:-translate-y-1 flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${service.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-[#b05df5] to-[#5582f6] bg-clip-text text-transparent mb-3">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SanadServices;
