import React, { useState, useEffect } from 'react';
import SanadCharacter from './SanadCharacter.tsx';
import { ArrowRight, X, ChevronRight, ChevronLeft, Lock, CheckCircle2, Clock, PlayCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../store.ts';

interface QuizQuestion {
    question: string;
    options: string[];
    correctIndex: number;
}

interface NodeDetail {
    id: number;
    title: string;
    description: string;
    fullContent: string;
    videoUrl?: string;
    status: 'locked' | 'unlocked' | 'completed' | 'time-locked';
    semester?: number;
    unlockDate?: Date;
    quiz: QuizQuestion[];
}

interface RationaleProps {
    lang: 'ar' | 'en';
    setLang: (lang: 'ar' | 'en') => void;
}

const Rationale: React.FC<RationaleProps> = ({ lang, setLang }) => {
  const navigate = useNavigate();
  const { journey, section } = useParams<{ journey: string; section: string }>();
  
  const [nodes, setNodes] = useState<NodeDetail[]>([]);
  const [selectedNode, setSelectedNode] = useState<NodeDetail | null>(null);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);

  const isAcademicFlow = journey === 'academic' || journey === 'academic-colleges';

  const t = {
    ar: {
      back: 'العودة',
      details: 'التفاصيل',
      startQuiz: 'ابدأ الاختبار المعرفي',
      finish: 'إكمال الخطوة',
      passed: 'رائع! لقد أتممت هذه المرحلة بنجاح.',
      failed: 'تحتاج للمراجعة مرة أخرى لتجاوز هذه المرحلة.',
      locked: 'هذه الخطوة مغلقة، يجب إكمال ما قبلها أولاً',
      semester: 'الفصل الدراسي',
      timeLocked: 'تفتح هذه الخطوة في',
      videoIntro: 'شاهد الفيديو التعريفي أولاً'
    },
    en: {
      back: 'Back',
      details: 'Details',
      startQuiz: 'Start Quiz',
      finish: 'Complete Step',
      passed: 'Great job! Stage completed.',
      failed: 'You need to review content to pass this stage.',
      locked: 'Step locked, complete previous one first',
      semester: 'Semester',
      timeLocked: 'Unlocks on',
      videoIntro: 'Watch intro video first'
    }
  }[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
    loadData();
  }, [journey, section, lang]);

  const loadData = () => {
    const rawData = getJourneyDataMap(journey || '', section || '', lang);
    const dbProgress = db.getProgress(journey || '', section || '');
    const now = new Date();
    
    const updatedNodes = rawData.map((node, index) => {
        let status: 'locked' | 'unlocked' | 'completed' | 'time-locked' = 'locked';
        const isCompleted = dbProgress.completedNodes.includes(node.id);
        const prevIsCompleted = index === 0 || dbProgress.completedNodes.includes(rawData[index - 1]?.id);
        const isTimeRestricted = isAcademicFlow && node.unlockDate && now < node.unlockDate;

        if (isCompleted) {
            status = 'completed';
        } else if (prevIsCompleted) {
            if (isTimeRestricted) {
                status = 'time-locked';
            } else {
                status = 'unlocked';
            }
        }
        return { ...node, status };
    });

    setNodes(updatedNodes);
    updateProgress(updatedNodes);
  };

  const updateProgress = (currentNodes: NodeDetail[]) => {
    const completed = currentNodes.filter(n => n.status === 'completed').length;
    setProgress(Math.round((completed / currentNodes.length) * 100));
  };

  const handleNodeClick = (node: NodeDetail) => {
    if (node.status === 'locked' || node.status === 'time-locked') return;
    setSelectedNode(node);
    setIsQuizMode(false);
    setQuizStep(0);
    setScore(0);
    setShowResult(false);
  };

  const handleQuizAnswer = (index: number) => {
    if (!selectedNode) return;
    if (index === selectedNode.quiz[quizStep].correctIndex) {
      setScore(s => s + 1);
    }
    
    if (quizStep < selectedNode.quiz.length - 1) {
      setQuizStep(s => s + 1);
    } else {
      setShowResult(true);
    }
  };

  const finishQuiz = () => {
    if (!selectedNode) return;
    const passed = score >= Math.ceil(selectedNode.quiz.length * 0.6);
    if (passed) {
      db.saveProgress(journey || '', section || '', selectedNode.id, score);
      loadData();
    }
    setSelectedNode(null);
  };

  const renderNode = (node: NodeDetail) => (
    <div 
        key={node.id} 
        onClick={() => handleNodeClick(node)} 
        className={`relative p-8 rounded-[2.5rem] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 border-2 group cursor-pointer ${node.status === 'locked' || node.status === 'time-locked' ? 'opacity-70 bg-gray-50 cursor-not-allowed' : 'hover:-translate-y-2 border-transparent hover:border-blue-100 hover:shadow-xl'}`}
    >
        <div className={`flex items-start gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'} justify-between`}>
            <div className="flex-1 text-right">
                <h3 className="text-2xl font-black text-gray-800 mb-1">{node.title}</h3>
                <p className="text-lg font-bold text-gray-400 leading-tight">{node.description}</p>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-md shrink-0 transition-transform group-hover:rotate-6 ${node.status === 'completed' ? 'bg-[#37d39a]' : (node.status === 'unlocked' ? 'bg-[#127fc0]' : 'bg-[#9ea4ad]')}`}>
                {node.status === 'locked' || node.status === 'time-locked' ? <Lock size={24} /> : node.id}
            </div>
        </div>

        {node.videoUrl && node.status !== 'locked' && (
          <div className="mt-4 flex items-center gap-2 text-sanad-primary font-bold text-sm">
             <PlayCircle size={18} />
             <span>{t.videoIntro}</span>
          </div>
        )}

        <div className={`mt-10 flex items-center gap-1 font-black text-lg transition-colors ${lang === 'ar' ? 'justify-start' : 'justify-end'} ${node.status === 'locked' || node.status === 'time-locked' ? 'text-gray-400' : 'text-[#5582f6] group-hover:text-blue-700'}`}>
            <span className="pt-1">{t.details}</span>
            {lang === 'ar' ? <ChevronLeft size={20} className="mt-1" /> : <ChevronRight size={20} className="mt-1" />}
        </div>

        {node.status === 'completed' && (
            <div className="absolute top-4 left-4 bg-[#37d39a] text-white p-1 rounded-full shadow-sm">
                <CheckCircle2 size={20} />
            </div>
        )}
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden font-sans">
      <div className="absolute top-8 right-8 md:right-16 z-[100]">
        <button onClick={() => navigate(-1)} className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all text-[#1c1716] font-bold border border-gray-100">
           <ArrowRight size={22} className={lang === 'ar' ? '' : 'rotate-180'} />
           <span className="text-xl pt-0.5">{t.back}</span>
        </button>
      </div>

      <div className="container mx-auto px-6 pt-24 pb-32">
        <div className="flex flex-col items-center mb-16">
           <h1 className="text-3xl md:text-5xl font-black text-gray-800 mb-6 text-center">
             {getSectionTitle(journey, section, lang)}
           </h1>
           <div className="w-full max-w-2xl bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
             <div className="flex justify-between items-center mb-3">
               <span className="text-xl font-black text-sanad-primary">{progress}% {lang === 'ar' ? 'مكتمل' : 'Completed'}</span>
             </div>
             <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden p-1 shadow-inner">
               <div className="h-full bg-gradient-to-r from-[#bd5df5] to-[#2b75e7] transition-all duration-1000 rounded-full" style={{ width: `${progress}%` }} />
             </div>
           </div>
        </div>

        {isAcademicFlow ? (
            [1, 2].map(sem => (
                <div key={sem} className="mb-16">
                    <div className="flex items-center gap-4 mb-8 px-4">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <h2 className="text-2xl font-black text-sanad-soft uppercase tracking-wider">{t.semester} {sem}</h2>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {nodes.filter(n => n.semester === sem).map(renderNode)}
                    </div>
                </div>
            ))
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {nodes.map(renderNode)}
            </div>
        )}
      </div>

      {selectedNode && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setSelectedNode(null)} />
          <div className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-gradient-to-r from-[#bd5df5] to-[#2b75e7] p-8 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-black text-2xl">{selectedNode.id}</div>
                <h2 className="text-3xl font-black">{selectedNode.title}</h2>
              </div>
              <button onClick={() => setSelectedNode(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors"><X size={32} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              {!isQuizMode ? (
                <div className="space-y-8">
                  {selectedNode.videoUrl && (
                    <div className="aspect-video w-full rounded-[2rem] overflow-hidden bg-black shadow-2xl relative">
                      <iframe 
                        className="w-full h-full border-0" 
                        src={`https://www.youtube.com/embed/jX8rBu-4Z2U?si=Yw5S97dash48iztX&rel=0&modestbranding=1&showinfo=0`} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                        loading="lazy"
                        frameBorder="0"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 opacity-0 hover:opacity-70 transition-opacity duration-300">
                        <PlayCircle size={64} className="text-white opacity-80" />
                      </div>
                    </div>
                  )}
                  <div className="prose prose-xl max-w-none text-gray-700 font-bold leading-relaxed whitespace-pre-line bg-gray-50 p-8 rounded-3xl">
                    {selectedNode.fullContent}
                  </div>
                  <div className="flex justify-center pt-8">
                    <button onClick={() => setIsQuizMode(true)} className="bg-gradient-to-r from-[#bd5df5] to-[#2b75e7] text-white px-12 py-4 rounded-full text-2xl font-black shadow-xl hover:scale-105 active:scale-95 transition-all">
                      {t.startQuiz}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto py-10">
                  <div className="flex justify-between items-center mb-8 px-4">
                    <span className="text-gray-400 font-bold">{lang === 'ar' ? `السؤال ${quizStep + 1} من ${selectedNode.quiz.length}` : `Question ${quizStep + 1} of ${selectedNode.quiz.length}`}</span>
                    <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                       <div className="h-full bg-sanad-primary transition-all" style={{ width: `${((quizStep + 1) / selectedNode.quiz.length) * 100}%` }} />
                    </div>
                  </div>
                  {!showResult ? (
                    <div className="space-y-10">
                       <h2 className="text-2xl md:text-3xl font-black text-gray-800 text-center leading-snug">{selectedNode.quiz[quizStep].question}</h2>
                       <div className="grid grid-cols-1 gap-4">
                          {selectedNode.quiz[quizStep].options.map((opt, i) => (
                            <button key={i} onClick={() => handleQuizAnswer(i)} className="w-full p-6 text-right bg-white hover:bg-blue-50 border-2 border-gray-100 rounded-[1.5rem] transition-all text-xl font-bold text-gray-700 shadow-sm hover:border-sanad-primary">
                              {opt}
                            </button>
                          ))}
                       </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-8 py-10">
                       <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto border-4 border-sanad-primary">
                          <span className="text-4xl font-black text-sanad-primary">{score} / {selectedNode.quiz.length}</span>
                       </div>
                       <p className="text-2xl font-bold text-gray-500">{score >= Math.ceil(selectedNode.quiz.length * 0.6) ? t.passed : t.failed}</p>
                       <button onClick={finishQuiz} className="bg-gradient-to-r from-[#bd5df5] to-[#2b75e7] text-white px-16 py-5 rounded-full text-2xl font-black shadow-xl hover:scale-105 transition-all">{t.finish}</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getSectionTitle = (journey: string | undefined, section: string | undefined, lang: string) => {
    const titlesAr: any = {
        admissions: { rules: 'ضوابط القبول', procedures: 'إجراءات القبول', support: 'دعم القبول' },
        scholarships: { grants: 'المنح الدراسية', obligations: 'التزاماتي المالية', solutions: 'الحلول المالية' },
        'university-life': { skills: 'المهارات والقيادة', volunteering: 'العمل التطوعي', services: 'الخدمات الطلابية' },
        academic: { registration: 'التسجيل والإرشاد الأكاديمي', skills: 'المهارات الأساسية' },
        'academic-colleges': { medicine: 'كلية الطب والجراحة', 'applied-sciences': 'العلوم الطبية التطبيقية', nursing: 'كلية التمريض', business: 'كلية الأعمال' },
        values: { obligations: 'التزاماتي القيمية', programs: 'البرامج القيمية' }
    };
    return titlesAr[journey as any]?.[section as any] || (lang === 'ar' ? 'تفاصيل الرحلة' : 'Journey Details');
};

const getJourneyDataMap = (journey: string, section: string, lang: 'ar' | 'en'): NodeDetail[] => {
  const isAr = lang === 'ar';
  
  // Step 1: Determine Step Count
  let stepCount = 4;
  if (journey === 'admissions') stepCount = 3;
  else if (journey === 'scholarships') stepCount = 4;
  else if (journey === 'university-life') stepCount = 5;
  else if (journey === 'academic' || journey === 'academic-colleges') stepCount = 7;
  else if (journey === 'values') stepCount = 4;

  // Step 2: Define Content Bank
  const contentBank: any = {
      admissions: {
          rules: {
              titles: isAr ? ['الشروط العامة', 'معايير المفاضلة', 'المستندات المطلوبة'] : ['General Terms', 'Criteria', 'Required Docs'],
              quizzes: [
                  [
                    { qAr: 'ما هي الوثيقة الأساسية للقبول؟', qEn: 'Main admission doc?', oAr: ['الهوية', 'الصورة', 'شهادة الميلاد', 'الإيصال'], oEn: ['ID', 'Photo', 'Birth Cert', 'Receipt'], c: 0 },
                    { qAr: 'هل التقديم متاح لغير المواطنين؟', qEn: 'Available for non-citizens?', oAr: ['نعم', 'لا', 'بشروط', 'فقط للمنح'], oEn: ['Yes', 'No', 'Conditions', 'Grants only'], c: 2 },
                    { qAr: 'ما هو الحد الأدنى للعمر؟', qEn: 'Minimum age?', oAr: ['17', '18', '19', '20'], oEn: ['17', '18', '19', '20'], c: 1 },
                    { qAr: 'هل يلزم اختبار القدرات؟', qEn: 'Aptitude test required?', oAr: ['نعم', 'لا', 'اختياري', 'لبعض الكليات'], oEn: ['Yes', 'No', 'Optional', 'Some colleges'], c: 0 },
                    { qAr: 'أين يتم رفع الملفات؟', qEn: 'Where to upload?', oAr: ['البوابة', 'البريد', 'الواتساب', 'الحضور الشخصي'], oEn: ['Portal', 'Email', 'WhatsApp', 'In person'], c: 0 }
                  ]
              ]
          }
      },
      scholarships: {
          grants: {
              titles: isAr ? ['أنواع المنح', 'شروط الاستحقاق', 'آلية التقديم', 'تجديد المنحة'] : ['Types', 'Eligibility', 'Process', 'Renewal'],
              quizzes: [
                  [
                    { qAr: 'ما هو معدل الحفاظ على المنحة؟', qEn: 'Renewal GPA?', oAr: ['2.0', '3.0', '3.5', '4.0'], oEn: ['2.0', '3.0', '3.5', '4.0'], c: 2 },
                    { qAr: 'هل تشمل المنحة الكتب؟', qEn: 'Does it cover books?', oAr: ['نعم', 'لا', 'جزئياً', 'للمتميزين'], oEn: ['Yes', 'No', 'Partially', 'For honors'], c: 1 },
                    { qAr: 'كم مرة يتم صرف المنحة؟', qEn: 'How often paid?', oAr: ['شهرياً', 'فصلياً', 'سنوياً', 'مرة واحدة'], oEn: ['Monthly', 'Semester', 'Yearly', 'Once'], c: 1 },
                    { qAr: 'هل يمكن الجمع بين منحتين؟', qEn: 'Combine two grants?', oAr: ['نعم', 'لا', 'بموافقة', 'للمحتاجين'], oEn: ['Yes', 'No', 'Approval', 'Needy only'], c: 1 },
                    { qAr: 'متى يفتح باب التقديم؟', qEn: 'When does it open?', oAr: ['بداية الفصل', 'منتصف السنة', 'نهاية العام', 'دائماً'], oEn: ['Start of term', 'Mid year', 'End of year', 'Always'], c: 0 }
                  ]
              ]
          }
      },
      'university-life': {
          services: {
            titles: isAr ? ['السكن الجامعي', 'التغذية', 'النقل والمواصلات', 'الإرشاد النفسي', 'المرافق الرياضية'] : ['Housing', 'Dining', 'Transport', 'Counseling', 'Sports'],
            quizzes: [
                [
                    { qAr: 'أين يقع السكن؟', qEn: 'Where is housing?', oAr: ['داخل الحرم', 'خارج الحرم', 'قريب من الجامعة', 'في المدينة'], oEn: ['On-campus', 'Off-campus', 'Nearby', 'In city'], c: 0 },
                    { qAr: 'هل الوجبات مجانية؟', qEn: 'Meals free?', oAr: ['نعم', 'لا', 'مدعومة', 'للمنح فقط'], oEn: ['Yes', 'No', 'Subsidized', 'Grants only'], c: 2 },
                    { qAr: 'كيف يتم حجز الباص؟', qEn: 'Book bus?', oAr: ['تطبيق سند', 'اتصال', 'مكتب النقل', 'بدون حجز'], oEn: ['Sanad App', 'Call', 'Office', 'No booking'], c: 0 },
                    { qAr: 'هل الإرشاد سري؟', qEn: 'Counseling private?', oAr: ['نعم تماماً', 'غالباً', 'بإذن ولي الأمر', 'للمشاكل الكبيرة'], oEn: ['Totally', 'Mostly', 'Parental consent', 'Serious only'], c: 0 },
                    { qAr: 'ساعات عمل النادي؟', qEn: 'Gym hours?', oAr: ['24 ساعة', '8ص-10م', '6ص-11م', 'فترة الصباح'], oEn: ['24h', '8am-10pm', '6am-11pm', 'Morning only'], c: 2 }
                ]
            ]
          }
      }
  };

  const nodes: NodeDetail[] = [];
  for (let i = 1; i <= stepCount; i++) {
      // Logic for fallback titles and quizzes if not specifically defined
      const specificData = contentBank[journey]?.[section];
      const title = specificData?.titles?.[i-1] || (isAr ? `المرحلة ${i}` : `Phase ${i}`);
      
      // Select quiz set: specifically defined or fallback dummy set
      const quizSet = specificData?.quizzes?.[0] || Array.from({length: 5}, (_, idx) => ({
          qAr: `سؤال ${idx+1} حول ${getSectionTitle(journey, section, 'ar')}`,
          qEn: `Question ${idx+1} about ${getSectionTitle(journey, section, 'en')}`,
          oAr: ['إجابة صحيحة', 'خيار 2', 'خيار 3', 'خيار 4'],
          oEn: ['Correct Answer', 'Option 2', 'Option 3', 'Option 4'],
          c: 0
      }));

      nodes.push({
          id: i,
          title: title,
          description: isAr ? `خطوات تفصيلية للمرحلة ${i}` : `Detailed steps for phase ${i}`,
          fullContent: isAr 
            ? `أهلاً بك في المرحلة ${i} من ${getSectionTitle(journey, section, 'ar')}. نرجو مراجعة المادة التعليمية بتركيز.`
            : `Welcome to Phase ${i} of ${getSectionTitle(journey, section, 'en')}. Please review the materials carefully.`,
          videoUrl: i <= 2 ? 'https://www.youtube.com/embed/jX8rBu-4Z2U?si=Yw5S97dash48iztX' : undefined,
          status: i === 1 ? 'unlocked' : 'locked',
          semester: i <= Math.ceil(stepCount / 2) ? 1 : 2,
          quiz: quizSet.map((q: any) => ({
              question: isAr ? q.qAr : q.qEn,
              options: isAr ? q.oAr : q.oEn,
              correctIndex: q.c
          }))
      });
  }

  return nodes;
};

export default Rationale;
