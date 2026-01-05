
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import SanadCharacter from './SanadCharacter';

interface LoginProps {
  lang: 'ar' | 'en';
}

const Login: React.FC<LoginProps> = ({ lang }) => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const t = {
    ar: {
      title: 'تسجيل الدخول',
      subtitle: 'أهلاً بك في بوابة سند الطلابية',
      idLabel: 'الرقم الجامعي',
      passLabel: 'كلمة المرور',
      loginBtn: 'دخول',
      forgotPass: 'نسيت كلمة المرور؟',
      noAccount: 'ليس لديك حساب؟ تواصل مع الدعم',
      back: 'العودة للرئيسية'
    },
    en: {
      title: 'Login',
      subtitle: 'Welcome to Sanad Student Portal',
      idLabel: 'Student ID',
      passLabel: 'Password',
      loginBtn: 'Login',
      forgotPass: 'Forgot Password?',
      noAccount: 'No account? Contact support',
      back: 'Back to Home'
    }
  }[lang];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, we'll just navigate to profile
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent relative overflow-hidden font-sans">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-5xl w-full flex flex-col md:flex-row bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white overflow-hidden relative z-10">
        
        {/* Left Side: Branding & Illustration */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#be63f9] to-[#4b74f6] p-12 flex flex-col items-center justify-center text-white text-center">
            <div className="w-48 h-48 md:w-64 md:h-64 mb-8 transform hover:scale-105 transition-transform duration-500">
                <SanadCharacter className="w-full h-full drop-shadow-2xl" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black mb-4">{t.subtitle}</h1>
            <p className="text-lg opacity-90 font-bold max-w-xs">{lang === 'ar' ? 'سند هو رفيقك في رحلتك الجامعية، سجل دخولك الآن للوصول لخدماتك.' : 'Sanad is your companion in your university journey, login now to access your services.'}</p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <button 
                onClick={() => navigate('/')}
                className={`flex items-center gap-2 text-gray-400 hover:text-sanad-primary font-bold mb-8 transition-colors ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}
            >
                {lang === 'ar' ? <ArrowRight size={20} /> : <ArrowLeft size={20} />}
                <span>{t.back}</span>
            </button>

            <h2 className="text-4xl font-black text-gray-800 mb-2">{t.title}</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-[#be63f9] to-[#4b74f6] rounded-full mb-10"></div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <label className="block text-gray-700 font-bold px-2">{t.idLabel}</label>
                    <div className="relative">
                        <User className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" size={20} />
                        <input 
                            type="text" 
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-6 focus:border-sanad-primary outline-none transition-all font-bold text-gray-700"
                            placeholder="e.g. 44100XXXX"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-700 font-bold px-2">{t.passLabel}</label>
                    <div className="relative">
                        <Lock className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-400" size={20} />
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50/50 border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-6 focus:border-sanad-primary outline-none transition-all font-bold text-gray-700"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center px-2">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-sanad-primary focus:ring-sanad-primary" />
                        <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700 transition-colors">{lang === 'ar' ? 'تذكرني' : 'Remember me'}</span>
                    </label>
                    <button type="button" className="text-sm font-bold text-sanad-primary hover:underline">{t.forgotPass}</button>
                </div>

                <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#be63f9] to-[#4b74f6] text-white py-4 rounded-2xl text-xl font-black shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    {t.loginBtn}
                </button>
            </form>

            <p className="mt-8 text-center text-gray-500 font-bold">
                {t.noAccount}
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
