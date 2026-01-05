
import React from 'react';
import { UserCircle, Coffee, Users, GraduationCap } from 'lucide-react';

interface ServicesProps {
  lang: 'ar' | 'en';
}

const Services: React.FC<ServicesProps> = ({ lang }) => {
  const content = {
    ar: {
      title: 'خدماتي',
      subtitle: 'يجمع تطبيق سند في منصة واحدة جميع ما يحتاجه الطالب',
      services: [
        {
          title: 'الملف الشخصي',
          desc: 'بيانات أساسية (الاسم، الرقم الجامعي)، وروابط شخصية للخدمات الأكاديمية.',
          icon: UserCircle,
          color: 'text-[#4C9AFF]', // Blue from design
          bg: 'bg-[#EDF5FF]'      // Light Blue from design
        },
        {
          title: 'الحياة الأكاديمية',
          desc: 'الخطة الدراسية، السياسات الأكاديمية، الجداول الدراسية والاختبارات.',
          icon: GraduationCap,
          color: 'text-[#A575FF]', // Purple from design
          bg: 'bg-[#F5F0FF]'      // Light Purple from design
        },
        {
          title: 'الخدمات الطلابية',
          desc: 'السكن الجامعي، النقل، التغذية، الإرشاد النفسي.',
          icon: Coffee,
          color: 'text-[#FF9F43]', // Orange from design
          bg: 'bg-[#FFF6EA]'      // Light Orange from design
        },
        {
          title: 'الحياة الجامعية',
          desc: 'الأندية والأنشطة، الفعاليات والمبادرات، فرص التطوع.',
          icon: Users,
          color: 'text-[#FF6B9B]', // Pink from design
          bg: 'bg-[#FFEFF5]'      // Light Pink from design
        }
      ]
    },
    en: {
      title: 'My Services',
      subtitle: 'Sanad App consolidates everything a student needs in one platform',
      services: [
        {
          title: 'Personal Profile',
          desc: 'Basic data (Name, ID), and personal links to academic services.',
          icon: UserCircle,
          color: 'text-[#4C9AFF]',
          bg: 'bg-[#EDF5FF]'
        },
        {
          title: 'Academic Life',
          desc: 'Study plans, academic policies, schedules, and exams.',
          icon: GraduationCap,
          color: 'text-[#A575FF]',
          bg: 'bg-[#F5F0FF]'
        },
        {
          title: 'Student Services',
          desc: 'University housing, transport, dining, and counseling.',
          icon: Coffee,
          color: 'text-[#FF9F43]',
          bg: 'bg-[#FFF6EA]'
        },
        {
          title: 'University Life',
          desc: 'Clubs, activities, events, initiatives, and volunteering.',
          icon: Users,
          color: 'text-[#FF6B9B]',
          bg: 'bg-[#FFEFF5]'
        }
      ]
    }
  };

  const t = content[lang];

  return (
    <section id="services-section" className="py-20 relative bg-transparent">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="bg-gradient-to-r from-[#be63f9] to-[#4b74f6] text-white px-12 py-5 rounded-[2rem] shadow-[0_10px_30px_rgba(190,99,249,0.3)] min-w-[280px] text-center">
            <h2 className="text-2xl md:text-3xl font-bold">{t.title}</h2>
        </div>
      </div>
      <div className="container mx-auto px-6 pt-8">
        <div className="text-center mb-16">
          <p className="text-gray-500 font-bold text-xl md:text-2xl">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
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

export default Services;
