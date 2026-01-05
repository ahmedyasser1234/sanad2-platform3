
import React, { useState, useRef, useEffect } from 'react';
import { Send, GraduationCap, X } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';
import SanadCharacter from './SanadCharacter';

interface ChatAssistantProps {
    lang: 'ar' | 'en';
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ lang }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    // Animation States for Floating Bubble
    const [showDots, setShowDots] = useState(false);
    const [showPill, setShowPill] = useState(false);

    useEffect(() => {
        // Wait for Hero animation to finish (approx 3.5s)
        const delayStart = 3500;
        
        const t1 = setTimeout(() => setShowDots(true), delayStart);
        // Show pill 500ms after dots
        const t2 = setTimeout(() => setShowPill(true), delayStart + 500);
        
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);
    
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    
    const [bottomOffset, setBottomOffset] = useState(30);
    const [placement, setPlacement] = useState<'up' | 'down'>('up');
    const [downMaxHeight, setDownMaxHeight] = useState<number>(480);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const content = {
        ar: {
            placeholder: 'كيفك ؟',
            assistantName: 'مساعد سند',
            intro: 'هلا والله! 👋 أنا مساعدك الذكي في مركز سند. تفضل بالسؤال عن أي رحلة من رحلاتنا.',
            triggerText: 'مساعد سند الذكي',
            error: 'عذراً، حدث خطأ في الاتصال. يرجى المحاولة لاحقاً.',
            unknown: 'عذراً، لم أستطع فهم السؤال. هل يمكنك إعادة صياغته؟'
        },
        en: {
            placeholder: 'How can I help?',
            assistantName: 'Sanad Assistant',
            intro: 'Hello! 👋 I am your Sanad Smart Assistant. Feel free to ask about any of our journeys.',
            triggerText: 'Sanad Smart Assistant',
            error: 'Sorry, connection error. Please try again later.',
            unknown: 'Sorry, I didn\'t understand that. Could you rephrase?'
        }
    };
    
    const t = content[lang];

    useEffect(() => {
        setMessages([
            { id: '1', text: t.intro, sender: 'bot' }
        ]);
    }, [lang, t.intro]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.getElementById('main-footer');
            if (!footer) return;

            const footerRect = footer.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (footerRect.top < windowHeight) {
                const offsetFromBottom = windowHeight - footerRect.top;
                const newOffset = offsetFromBottom + 20;
                setBottomOffset(newOffset);

                if (newOffset > 250) {
                    setPlacement('down');
                    setDownMaxHeight(newOffset - 80); 
                } else {
                    setPlacement('up');
                }
            } else {
                setBottomOffset(30);
                setPlacement('up');
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            text: input,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const SYSTEM_CONTEXT = `
            You are the smart assistant for "Sanad Center".
            Your task is to help students and visitors based on the following info:
            
            1. **About Us**: Sanad Center is a pioneering model in caring for and empowering beneficiaries at the university.
            2. **Vision**: To be a pioneering model in caring for and empowering beneficiaries.
            3. **Mission**: Providing integrated services ensuring beneficiary satisfaction.
            4. **Journeys (Services)**:
               - Admissions Journey: Registration and acceptance.
               - University Life Journey: Student support during studies.
               - Scholarships & Financial: Financial aid and grants.
               - Academic Journey: Academic affairs and excellence.
               - Values Journey: Extracurricular activities and values.
            
            5. **Contact**: Twitter, TikTok, Instagram, WhatsApp.
            
            **Style Instructions**:
            - If the user speaks Arabic, reply in friendly Arabic (Khaleeji or simple Fusha).
            - If the user speaks English, reply in friendly English.
            - Keep answers short and useful.
            - Use emojis 🎓✨.
            - Current Interface Language: ${lang === 'ar' ? 'Arabic' : 'English'}.
            `;

            const recentMessages = messages.slice(-5);
            const history = recentMessages.map(m => 
                `${m.sender === 'user' ? 'User' : 'Model'}: ${m.text}`
            ).join('\n');

            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Conversation History:\n${history}\n\nUser Question: ${userMessage.text}`,
                config: {
                    systemInstruction: SYSTEM_CONTEXT,
                }
            });

            const botText = response.text || t.unknown;

            const botMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: botText,
                sender: 'bot'
            };

            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Error connecting to Gemini:", error);
            const errorMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: t.error,
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const positionClasses = lang === 'ar' 
        ? 'left-4 md:left-8 items-end origin-bottom-left' 
        : 'right-4 md:right-8 items-end origin-bottom-right';

    const chatWindowContent = (
        <div 
            className={`
                w-[300px] md:w-[340px] flex flex-col rounded-[2rem] shadow-2xl overflow-hidden relative z-10
                ${placement === 'up' 
                    ? 'mb-4 animate-in slide-in-from-bottom-10 h-[480px] max-h-[70vh]' 
                    : 'absolute top-[calc(100%-10px)] mt-0 animate-in slide-in-from-top-10'
                }
                duration-300
            `}
            style={{ 
                height: placement === 'down' ? `${Math.min(downMaxHeight, 480)}px` : undefined 
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#bd5df5] to-[#2b75e7] z-0"></div>
            <div className="relative z-10 p-4 pt-5 flex justify-between items-center">
                <button 
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white"
                >
                    <X className="w-6 h-6" />
                </button>
                <span className="font-bold text-white text-lg drop-shadow-sm">{t.assistantName}</span>
                <div className="w-8"></div>
            </div>

            <div className="flex-1 relative z-10 overflow-y-auto p-4 space-y-6 scrollbar-hide">
                {messages.map((msg) => (
                    <div 
                        key={msg.id} 
                        className={`flex items-end gap-3 ${msg.sender === 'user' ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                        <div className="shrink-0 mb-1">
                            {msg.sender === 'user' ? (
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#127fc0] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                    <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                            ) : (
                                <div className="w-12 h-12 md:w-14 md:h-14 relative z-10 -ml-1">
                                    <SanadCharacter className="w-full h-full object-contain drop-shadow-sm" />
                                </div>
                            )}
                        </div>
                        <div 
                            className={`
                                max-w-[75%] py-2.5 px-3.5 text-sm font-bold leading-relaxed shadow-md
                                ${msg.sender === 'user' 
                                    ? 'bg-white text-[#127fc0] rounded-2xl rounded-br-none' 
                                    : 'bg-white text-[#b558f0] rounded-2xl rounded-bl-none'
                                }
                            `}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex items-end gap-3 flex-row-reverse">
                        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 -ml-1">
                            <SanadCharacter className="w-full h-full object-contain drop-shadow-sm" />
                        </div>
                        <div className="bg-white py-3 px-4 rounded-2xl rounded-bl-none shadow-md">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 bg-[#b558f0] rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-[#b558f0] rounded-full animate-bounce delay-100"></div>
                                <div className="w-2 h-2 bg-[#b558f0] rounded-full animate-bounce delay-200"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="relative z-10 p-4 pb-6 flex items-center gap-2">
                <div className="flex-1 bg-white rounded-3xl shadow-lg h-10 md:h-12 flex items-center px-1">
                        <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={t.placeholder}
                        className={`w-full h-full bg-transparent border-none focus:ring-0 text-gray-700 font-bold px-4 placeholder-gray-400 outline-none rounded-3xl text-sm md:text-base ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    />
                </div>
                <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 shrink-0 ${
                        isLoading ? 'bg-gray-200 cursor-not-allowed' : 'bg-white text-[#9333ea]'
                    }`}
                >
                    <Send className={`w-5 h-5 md:w-6 md:h-6 ${input.trim() && !isLoading ? (lang === 'ar' ? 'translate-x-0.5' : '-translate-x-0.5') : ''} transition-all`} fill="currentColor" />
                </button>
            </div>
        </div>
    );

    return (
        <div 
            className={`fixed z-50 flex flex-col font-sans ${positionClasses}`}
            style={{ bottom: `${bottomOffset}px` }}
        >
            {isOpen && placement === 'up' && chatWindowContent}
            <div 
                id="chat-trigger-btn"
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer group flex items-center gap-3 relative z-50"
            >
                {!isOpen && (
                    <div className="hidden md:flex items-end gap-2 animate-bounce mb-16 -ml-8" style={{ animationDuration: '3s' }}>
                        <div className={`bg-sanad-soft text-white px-6 py-2 rounded-full font-bold text-sm shadow-sm whitespace-nowrap mb-2 transition-all duration-500 ease-out transform ${showPill ? 'opacity-100 scale-100' : 'opacity-0 scale-0'} origin-bottom-left`}>
                            {t.triggerText}
                        </div>
                        <div className={`flex items-end gap-1 mb-1 transition-all duration-500 ease-out transform ${showDots ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                            <div className="w-3 h-3 bg-sanad-soft rounded-full"></div>
                            <div className="w-1.5 h-1.5 bg-sanad-soft rounded-full"></div>
                        </div>
                    </div>
                )}
                <div className={`w-20 h-20 md:w-28 md:h-28 relative transform transition-transform duration-300 z-50 ${isOpen ? 'scale-90 rotate-6' : 'group-hover:scale-110'}`}>
                    <SanadCharacter className="w-full h-full object-contain drop-shadow-2xl filter" />
                </div>
            </div>
            {isOpen && placement === 'down' && chatWindowContent}
        </div>
    );
};

export default ChatAssistant;
