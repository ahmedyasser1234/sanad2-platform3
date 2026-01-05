
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatAssistant from './ChatAssistant';
import SanadCharacter from './SanadCharacter';
import { User, Book, Calendar, Bell, LogOut, Award, GraduationCap, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../store.ts';

interface ProfileProps {
  lang: 'ar' | 'en';
  setLang: (lang: 'ar' | 'en') => void;
}

const Profile: React.FC<ProfileProps> = ({ lang, setLang }) => {
  const navigate = useNavigate();
  const user = db.getCurrentUser();
  const notifications = db.getNotifications();
  const totalSteps = db.getTotalCompletedSteps();

  if (!user) return null;

  const t = {
    ar: {
      profile: 'الملف الشخصي',
      myJourneys: 'رحلاتي الحالية',
      academicInfo: 'المعلومات الأكاديمية',
      schedule: 'الجدول الدراسي اليوم',
      notifications: 'التنبيهات والمهام',
      logout: 'تسجيل الخروج',
      credits: 'الساعات المعتمدة',
      active: 'منتظم',
      completedSteps: 'الخطوات المنجزة',
      startJourney: 'متابعة الرحلة'
    },
    en: {
      profile: 'My Profile',
      myJourneys: 'My Active Journeys',
      academicInfo: 'Academic Information',
      schedule: 'Today\'s Schedule',
      notifications: 'Alerts & Tasks',
      logout: 'Logout',
      credits: 'Credit Hours',
      active: 'Active',
      completedSteps: 'Steps Completed',
      startJourney: 'Continue Journey'
    }
  }[lang];

  const myJourneys = [
    { id: 'university', title: lang === 'ar' ? 'رحلتي في الحياة الجامعية' : 'University Life Journey', icon: "journey-university.png", link: '/university-life' },
    { id: 'financial', title: lang === 'ar' ? 'رحلتي في الحلول المالية' : 'Scholarships & Financial', icon: "journey-financial.png", link: '/scholarships-journey' },
    { id: 'academic', title: lang === 'ar' ? 'رحلتي الأكاديمية' : 'Academic Journey', icon: "journey-academic.png", link: '/academic-journey' },
    { id: 'values', title: lang === 'ar' ? 'رحلتي القيمية' : 'Values Journey', icon: "journey-values.png", link: '/values-journey' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 font-sans">
      <Header lang={lang} setLang={setLang} />
      
      <main className="flex-grow pt-28 pb-20 container mx-auto px-4 md:px-6">
        {/* Profile Hero Header */}
        <div className="relative mb-10">
          <div className="bg-gradient-to-r from-[#be63f9] to-[#4b74f6] h-56 rounded-[3rem] shadow-xl overflow-hidden relative" />
          
          <div className="absolute -bottom-16 left-8 md:left-16 flex flex-col md:flex-row items-end gap-6 w-full px-4">
            <div className="w-40 h-40 md:w-52 md:h-52 bg-white rounded-[2.5rem] p-2 shadow-2xl">
                <div className="w-full h-full bg-gray-100 rounded-[2rem] overflow-hidden flex items-center justify-center">
                    <SanadCharacter className="w-full h-full object-contain" />
                </div>
            </div>
            <div className="mb-4 text-center md:text-right flex-1">
                <h1 className="text-3xl md:text-5xl font-black text-gray-800">{lang === 'ar' ? user.nameAr : user.nameEn}</h1>
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start mt-2">
                    <span className="bg-white px-4 py-1.5 rounded-full text-sanad-primary font-black shadow-sm">ID: {user.id}</span>
                    <span className="bg-[#37d39a]/10 px-4 py-1.5 rounded-full text-[#37d39a] font-black border border-[#37d39a]/20">{t.active}</span>
                </div>
            </div>
            <div className="hidden lg:flex gap-4 pr-16 mb-4">
                <button 
                  onClick={() => {
                    db.logout();
                    navigate('/');
                  }} 
                  className="bg-white text-red-500 px-6 py-3 rounded-2xl font-black shadow-md border border-red-50 hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                >
                    <LogOut size={20} />
                    <span>{t.logout}</span>
                </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center group hover:border-purple-200 transition-all">
                <GraduationCap className="mx-auto text-[#be63f9] mb-4 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-gray-400 font-bold mb-1 uppercase tracking-wide">{t.credits}</h3>
                <span className="text-4xl font-black text-gray-800">{user.credits}</span>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center group hover:border-blue-200 transition-all">
                <Award className="mx-auto text-[#4b74f6] mb-4 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-gray-400 font-bold mb-1 uppercase tracking-wide">GPA</h3>
                <span className="text-4xl font-black text-gray-800">{user.gpa}</span>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center group hover:border-green-200 transition-all">
                <CheckCircle2 className="mx-auto text-[#37d39a] mb-4 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-gray-400 font-bold mb-1 uppercase tracking-wide">{t.completedSteps}</h3>
                <span className="text-4xl font-black text-gray-800">{totalSteps}</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content Area: My Journeys */}
            <div className="lg:col-span-8 space-y-12">
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-black text-gray-800 flex items-center gap-3">
                            <span className="w-3 h-10 bg-gradient-to-b from-[#be63f9] to-[#4b74f6] rounded-full" />
                            {t.myJourneys}
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {myJourneys.map((journey) => (
                            <div key={journey.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500">
                                <div className="mb-6 w-24 h-24 bg-gray-50 rounded-3xl p-4 group-hover:bg-purple-50 transition-colors">
                                    <img src={journey.icon} alt={journey.title} className="w-full h-full object-contain" />
                                </div>
                                <h3 className="text-xl font-black text-gray-800 mb-6 px-4">{journey.title}</h3>
                                <Link 
                                    to={journey.link} 
                                    className="w-full bg-gradient-to-r from-[#be63f9] to-[#4b74f6] text-white py-3 rounded-2xl font-black flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform"
                                >
                                    <span>{t.startJourney}</span>
                                    {lang === 'ar' ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-8 md:p-10">
                    <h3 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
                        <Calendar className="text-sanad-primary" /> {t.schedule}
                    </h3>
                    <div className="space-y-4">
                        {[
                            { time: '08:00 - 10:00', subject: lang === 'ar' ? 'علم الأوبئة' : 'Epidemiology', room: 'Hall 12-A', type: 'Lecture' },
                            { time: '10:30 - 12:30', subject: lang === 'ar' ? 'الجراحة العامة' : 'General Surgery', room: 'Lab 5', type: 'Lab' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-6 p-6 rounded-3xl border border-gray-50 bg-gray-50/30 hover:bg-gray-50 transition-colors">
                                <div className="font-black text-gray-400 w-24 text-sm md:text-base">{item.time}</div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-black text-gray-800">{item.subject}</h4>
                                    <p className="text-gray-500 font-bold">{item.room}</p>
                                </div>
                                <span className="hidden md:inline-block px-4 py-1.5 bg-white rounded-full text-xs font-black text-gray-400 border border-gray-100 uppercase">{item.type}</span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Sidebar Area */}
            <div className="lg:col-span-4 space-y-8">
                <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-8">
                    <h3 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
                        <Book className="text-purple-500" /> {t.academicInfo}
                    </h3>
                    <div className="space-y-8">
                        <div>
                            <span className="text-gray-400 font-bold text-xs uppercase tracking-widest block mb-2">{lang === 'ar' ? 'الكلية' : 'College'}</span>
                            <p className="text-lg font-black text-gray-700 leading-tight">{lang === 'ar' ? user.collegeAr : user.collegeEn}</p>
                        </div>
                        <div className="h-px bg-gray-50" />
                        <div>
                            <span className="text-gray-400 font-bold text-xs uppercase tracking-widest block mb-2">{lang === 'ar' ? 'المستوى الدراسي' : 'Academic Level'}</span>
                            <p className="text-lg font-black text-gray-700 leading-tight">{lang === 'ar' ? user.levelAr : user.levelEn}</p>
                        </div>
                        <div className="h-px bg-gray-50" />
                        <div>
                            <span className="text-gray-400 font-bold text-xs uppercase tracking-widest block mb-2">{lang === 'ar' ? 'البريد الجامعي' : 'University Email'}</span>
                            <p className="text-lg font-black text-gray-700 leading-tight break-all">{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 p-8">
                    <h3 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
                        <Bell className="text-orange-500" /> {t.notifications}
                    </h3>
                    <div className="space-y-4">
                        {notifications.map((notif: any) => (
                            <div key={notif.id} className="flex gap-4 p-5 rounded-3xl bg-gray-50 border border-gray-100 hover:border-orange-100 transition-colors">
                                <div className={`w-2 h-10 rounded-full shrink-0 ${notif.type === 'urgent' ? 'bg-red-500' : 'bg-blue-500'}`} />
                                <div>
                                    <h5 className="font-black text-gray-800 leading-tight mb-1">{lang === 'ar' ? notif.titleAr : notif.titleEn}</h5>
                                    <span className="text-xs font-bold text-gray-400">{notif.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </main>
      <ChatAssistant lang={lang} />
      <Footer lang={lang} />
    </div>
  );
};

export default Profile;
