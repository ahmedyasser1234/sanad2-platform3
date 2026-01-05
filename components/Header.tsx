
import React, { useState, useEffect, useRef } from 'react';
import { User, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
}

// --- CONFIGURATION ---

const HEADER_LOGO_IMAGE = "/images/Asset 11.png";

const Header: React.FC<HeaderProps> = ({ lang, setLang }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isJourneysOpen, setIsJourneysOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsJourneysOpen(false);
        }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const content = {
    ar: {
      home: 'الرئيسية',
      about: 'تعرف على سند',
      journeys: 'رحلات سند',
      chat: 'تحدث مع سند AI',
      contact: 'تواصل مع سند',
      centerName: 'مركز سند',
      tagline: 'لرعاية الطلاب المستفيدين',
      journeyList: [
        { label: 'رحلة القبول', path: '/admissions' },
        { label: 'رحلة الحياة الجامعية', path: '/university-life' },
        { label: 'رحلة المنح والحلول المالية', path: '/scholarships-journey' },
        { label: 'رحلتي الأكاديمية', path: '/academic-journey' },
        { label: 'رحلتي القيمية', path: '/values-journey' }
      ]
    },
    en: {
      home: 'Home',
      about: 'About Sanad',
      journeys: 'Sanad Journeys',
      chat: 'Chat with Sanad AI',
      contact: 'Contact Sanad',
      centerName: 'Sanad Center',
      tagline: 'Student Care & Support',
      journeyList: [
        { label: 'Admissions Journey', path: '/admissions' },
        { label: 'University Life Journey', path: '/university-life' },
        { label: 'Scholarships & Financial', path: '/scholarships-journey' },
        { label: 'Academic Journey', path: '/academic-journey' },
        { label: 'Values Journey', path: '/values-journey' }
      ]
    }
  };

  const t = content[lang];

  const toggleLanguage = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const handleScrollToFooter = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  const triggerChat = (e: React.MouseEvent) => {
    e.preventDefault();
    const chatTrigger = document.getElementById('chat-trigger-btn');
    if (chatTrigger) chatTrigger.click();
    setIsMobileMenuOpen(false);
    setIsJourneysOpen(false);
  };

  return (
    <header className={`w-full fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 lg:px-8 ${isScrolled ? 'bg-white/70 backdrop-blur-xl shadow-sm py-2 border-b border-white/20' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 order-1 min-w-max ltr:mr-8 rtl:ml-8 md:ltr:mr-16 md:rtl:ml-16 cursor-pointer">
          <div className="relative h-12 w-auto">
             <img src={HEADER_LOGO_IMAGE} alt="Sanad Center" className="h-full w-auto object-contain" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xl font-black text-sanad-primary leading-none">{t.centerName}</span>
            <span className="text-xs text-sanad-primary font-bold mt-1">{t.tagline}</span>
          </div>
        </Link>

        <nav className="hidden lg:flex flex-1 max-w-5xl mx-auto bg-sanad-primary rounded-full p-1 ltr:pl-6 ltr:pr-1 rtl:pr-6 rtl:pl-1 shadow-md order-2 items-center justify-between">
            <div className="flex-1 flex justify-between items-center px-4 xl:px-8 text-white font-bold text-sm whitespace-nowrap gap-6">
                <Link to="/" className={`transition-opacity hover:opacity-100 ${location.pathname === '/' ? 'opacity-100' : 'opacity-85'}`}>{t.home}</Link>
                
                <Link to="/about-sanad" className={`transition-opacity hover:opacity-100 ${location.pathname === '/about-sanad' ? 'opacity-100' : 'opacity-85'}`}>{t.about}</Link>
                
                {/* Journeys Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setIsJourneysOpen(!isJourneysOpen)}
                        className="flex items-center gap-1 opacity-85 hover:opacity-100 transition-opacity"
                    >
                        <span>{t.journeys}</span>
                        <ChevronDown size={16} className={`transition-transform duration-300 ${isJourneysOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isJourneysOpen && (
                        <div className="absolute top-full mt-4 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 py-3 min-w-[220px] animate-in fade-in slide-in-from-top-2 duration-200">
                            {t.journeyList.map((journey, idx) => (
                                <Link 
                                    key={idx} 
                                    to={journey.path} 
                                    onClick={() => setIsJourneysOpen(false)}
                                    className="block px-6 py-2.5 text-sanad-dark hover:bg-sanad-primary hover:text-white transition-colors text-sm font-bold"
                                >
                                    {journey.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                <a href="#" onClick={triggerChat} className="transition-opacity hover:opacity-100 opacity-85">{t.chat}</a>
                
                <a href="#main-footer" onClick={(e) => handleScrollToFooter(e, '#main-footer')} className="transition-opacity hover:opacity-100 opacity-85">{t.contact}</a>
            </div>
            
            <div 
              onClick={() => navigate('/login')}
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-sanad-primary cursor-pointer hover:bg-gray-100 transition-colors shadow-sm shrink-0"
            >
                <div className="w-7 h-7 bg-purple-100 rounded-full flex items-center justify-center">
                     <User className="w-3.5 h-3.5 text-purple-600" />
                </div>
            </div>
        </nav>

        <div className="flex items-center gap-3 order-3 min-w-max ltr:ml-8 rtl:mr-8 md:ltr:ml-16 md:rtl:mr-16">
            <button onClick={toggleLanguage} className="flex items-center gap-2 bg-white/90 hover:bg-white backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm transition-all group border border-white/50 hover:shadow-md">
                <Globe className="w-5 h-5 text-sanad-primary group-hover:text-sanad-secondary transition-colors" />
                <span className="font-bold text-sm text-sanad-primary group-hover:text-sanad-secondary transition-colors pt-0.5 leading-none">{lang === 'ar' ? 'EN' : 'AR'}</span>
            </button>
             <button className="lg:hidden p-2 text-sanad-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-white/20 p-6 shadow-xl absolute w-full left-0 top-full z-50 animate-in slide-in-from-top-5 max-h-[80vh] overflow-y-auto">
            <ul className="space-y-4">
                <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-xl hover:bg-sanad-sky/50 text-sanad-dark font-bold text-base transition-colors">{t.home}</Link></li>
                <li><Link to="/about-sanad" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-xl hover:bg-sanad-sky/50 text-sanad-dark font-bold text-base transition-colors">{t.about}</Link></li>
                
                <li className="space-y-2">
                    <span className="block p-3 text-gray-400 font-black text-xs uppercase tracking-widest">{t.journeys}</span>
                    {t.journeyList.map((journey, idx) => (
                        <Link key={idx} to={journey.path} onClick={() => setIsMobileMenuOpen(false)} className="block p-3 pl-6 rounded-xl hover:bg-sanad-sky/50 text-sanad-dark font-bold text-sm transition-colors">• {journey.label}</Link>
                    ))}
                </li>

                <li><button onClick={triggerChat} className="w-full text-right p-3 rounded-xl hover:bg-sanad-sky/50 text-sanad-dark font-bold text-base transition-colors">{t.chat}</button></li>
                <li><a href="#main-footer" onClick={(e) => handleScrollToFooter(e, '#main-footer')} className="block p-3 rounded-xl hover:bg-sanad-sky/50 text-sanad-dark font-bold text-base transition-colors">{t.contact}</a></li>
                
                <li>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-4 rounded-2xl bg-sanad-primary text-white font-bold text-base justify-center"><User size={20} /><span>{lang === 'ar' ? 'تسجيل الدخول' : 'Login'}</span></Link>
                </li>
            </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
