import React from 'react';
import { Instagram, Twitter, MessageCircle, Music2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterProps {
    lang: 'ar' | 'en';
}

const FOOTER_DECORATION_IMAGE = "/images/Asset 14@2x.png";

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const content = {
      ar: {
          links: [
              { label: 'الرئيسية', path: '/' },
              { label: 'رحلة القبول', path: '/admissions' },
              { label: 'رحلة الحياة الجامعية', path: '/university-life' },
              { label: 'رحلة المنح الدراسية والحلول المالية', path: '/scholarships-journey' },
              { label: 'رحلة الأكاديمية', path: '/academic-journey' },
              { label: 'رحلة قيمية', path: '/values-journey' },
              { label: 'خدمـــاتي', path: '/#services-section' },
              { label: 'خدمات سند', path: '/#sanad-services-section' }
          ],
          title: 'مركز سند',
          subtitle: 'لرعاية الطلاب المستفيدين',
          desc: 'مركز سند نموذجاً رائداً في رعاية وتمكين المستفيدين بالجامعة.'
      },
      en: {
          links: [
              { label: 'Home', path: '/' },
              { label: 'Admissions Journey', path: '/admissions' },
              { label: 'University Life Journey', path: '/university-life' },
              { label: 'Scholarships & Financial Solutions', path: '/scholarships-journey' },
              { label: 'Academic Journey', path: '/academic-journey' },
              { label: 'Values Journey', path: '/values-journey' },
              { label: 'My Services', path: '/#services-section' },
              { label: 'Sanad Services', path: '/#sanad-services-section' }
          ],
          title: 'Sanad Center',
          subtitle: 'Student Care & Support',
          desc: 'Sanad Center is a pioneering model in caring for and empowering beneficiaries at the university.'
      }
  };

  const t = content[lang];

  const handleLinkClick = (path: string) => {
    if (path.includes('#')) {
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="relative w-full bg-[#9b8bd9] text-white pt-32 pb-20 overflow-visible z-0 rounded-t-[50px] md:rounded-t-[100px]">
        <div className="container mx-auto px-6 md:px-20 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-4">
                
                {/* 1. Navigation Links */}
                <div className={`w-full md:w-1/3 text-center pt-2 order-1 ${lang === 'ar' ? 'md:text-right' : 'md:text-left'}`}>
                    <ul className="space-y-4 text-lg md:text-xl font-bold">
                        {t.links.map((link, idx) => (
                             <li key={idx}>
                                <Link 
                                    to={link.path} 
                                    onClick={() => handleLinkClick(link.path)}
                                    className="hover:opacity-80 transition-opacity inline-block"
                                >
                                    {link.label}
                                </Link>
                             </li>
                        ))}
                    </ul>
                </div>

                {/* 2. CENTER SECTION */}
                <div className="w-full md:w-1/3 text-center order-2 md:mt-0 flex flex-col items-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-2 tracking-wide">{t.title}</h2>
                    <p className="text-xl md:text-2xl font-bold mb-8 opacity-90">{t.subtitle}</p>
                    <p className="text-xl md:text-2xl leading-loose font-medium opacity-95 max-w-sm mx-auto">
                        {t.desc}
                    </p>
                </div>

                {/* 3. Social Icons */}
                <div className={`w-full md:w-1/3 flex flex-col order-3 ${lang === 'ar' ? 'items-center md:items-end' : 'items-center md:items-start'}`}>
                    <div className="-mt-32 mb-6 relative z-20">
                         <img src={FOOTER_DECORATION_IMAGE} alt="Decoration" className="w-48 md:w-56 h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className={`flex md:flex-col gap-5 items-center ${lang === 'ar' ? 'md:items-end' : 'md:items-start'}`}>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#9b8bd9] hover:scale-110 transition-transform shadow-lg">
                             <Twitter className="w-7 h-7 fill-current" />
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#9b8bd9] hover:scale-110 transition-transform shadow-lg">
                            <Music2 className="w-7 h-7" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#9b8bd9] hover:scale-110 transition-transform shadow-lg">
                            <Instagram className="w-7 h-7" />
                        </a>
                        <a href="https://wa.me/yournumber" target="_blank" rel="noreferrer" className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#9b8bd9] hover:scale-110 transition-transform shadow-lg">
                             <MessageCircle className="w-7 h-7 fill-current" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;