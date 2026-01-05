
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Journeys from './components/Journeys.tsx';
import VisionMission from './components/VisionMission.tsx';
import Footer from './components/Footer.tsx';
import ChatAssistant from './components/ChatAssistant.tsx';
import AboutSanad from './components/AboutSanad.tsx';
import AboutSanadPage from './components/AboutSanadPage.tsx';
import Services from './components/Services.tsx';
import SanadServices from './components/SanadServices.tsx';
import AdmissionsPage from './components/AdmissionsPage.tsx';
import UniversityLifePage from './components/UniversityLifePage.tsx';
import AcademicJourneyPage from './components/AcademicJourneyPage.tsx';
import ScholarshipsJourneyPage from './components/ScholarshipsJourneyPage.tsx';
import ValuesJourneyPage from './components/ValuesJourneyPage.tsx';
import CollegesPage from './components/CollegesPage.tsx';
import Rationale from './components/Rationale.tsx';
import Login from './components/Login.tsx';
import Profile from './components/Profile.tsx';

const Home: React.FC<{ lang: 'ar' | 'en'; setLang: (l: any) => void }> = ({ lang, setLang }) => {
    return (
        <div className="flex flex-col relative w-full">
            <Header lang={lang} setLang={setLang} />
            <main className="flex-grow">
                <Hero lang={lang} />
                <AboutSanad lang={lang} />
                <VisionMission lang={lang} />
                <Journeys lang={lang} />
                <Services lang={lang} />
                <SanadServices lang={lang} />
            </main>
            <ChatAssistant lang={lang} />
            <Footer lang={lang} />
        </div>
    );
};

const App: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const bgGradient = lang === 'en' 
    ? 'bg-gradient-to-l from-[#bce6f9] via-[#e6f5fc] to-white' 
    : 'bg-gradient-to-r from-[#bce6f9] via-[#e6f5fc] to-white';

  return (
    <div className={`min-h-screen flex flex-col relative font-sans transition-all duration-500 ${bgGradient}`}>
      <Routes>
        <Route path="/" element={<Home lang={lang} setLang={setLang} />} />
        <Route path="/about-sanad" element={<AboutSanadPage lang={lang} setLang={setLang} />} />
        <Route path="/admissions" element={<AdmissionsPage lang={lang} setLang={setLang} />} />
        <Route path="/university-life" element={<UniversityLifePage lang={lang} setLang={setLang} />} />
        <Route path="/academic-journey" element={<AcademicJourneyPage lang={lang} setLang={setLang} />} />
        <Route path="/colleges" element={<CollegesPage lang={lang} setLang={setLang} />} />
        <Route path="/scholarships-journey" element={<ScholarshipsJourneyPage lang={lang} setLang={setLang} />} />
        <Route path="/values-journey" element={<ValuesJourneyPage lang={lang} setLang={setLang} />} />
        <Route path="/rationale/:journey/:section" element={<Rationale lang={lang} setLang={setLang} />} />
        <Route path="/login" element={<Login lang={lang} />} />
        <Route path="/profile" element={<Profile lang={lang} setLang={setLang} />} />
      </Routes>
    </div>
  );
};

export default App;
