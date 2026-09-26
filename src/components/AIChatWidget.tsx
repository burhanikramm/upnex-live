import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  from: 'bot' | 'user';
  time: string;
}

// Funnel States to guide lead generation smoothly
type ChatStage = 'conversational' | 'awaiting_email' | 'awaiting_phone' | 'lead_captured';

const getTime = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hi there! 👋 I'm the Upnex Digital Agency AI assistant. How can I help you scale your brand today?", 
      from: 'bot', 
      time: getTime() 
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lead capture state management
  const [stage, setStage] = useState<ChatStage>('conversational');
  const [leadData, setLeadData] = useState({ email: '', phone: '', requestedTopic: '' });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fallback pattern matching dictionary for human-like natural conversation
  const dynamicBrain = (text: string): string => {
    const clean = text.toLowerCase();
    
    if (clean.includes('web') || clean.includes('site') || clean.includes('dev')) {
      return "We design stunning, ultra-fast custom websites engineered to convert traffic into revenue. Our corporate builds typically spin up within 2 to 6 weeks. Would you like me to walk you through our deployment roadmap?";
    }
    if (clean.includes('seo') || clean.includes('rank') || clean.includes('search')) {
      return "Our strategic optimization focuses on systemic keyword visibility and core web vital infrastructure, boosting organic search capture for our clients by over 400%.";
    }
    if (clean.includes('ad') || clean.includes('facebook') || clean.includes('google') || clean.includes('tiktok') || clean.includes('meta')) {
      return "We structure full-funnel Paid Ad matrices with highly optimized media assets. Across over $1M in managed ad spend, we maintain client conversion loops at solid performance metrics.";
    }
    if (clean.includes('hello') || clean.includes('hi ') || clean.includes('hey')) {
      return "Hello! Great to connect with you. I can brief you on our web development, search optimization, or paid advertising services. What are your core growth targets?";
    }
    if (clean.includes('where') || clean.includes('location') || clean.includes('office')) {
      return "Upnex Digital Agency is located at Office 4083, 4th Floor, Giga Mall, Islamabad. Feel free to request a face-to-face consultation strategy session!";
    }
    
    return "That sounds like a brilliant target. We optimize frameworks across web UI/UX, organic SEO scaling, and aggressive paid media acquisition to solve exactly that. What specific channel are you looking to scale first?";
  };

  const handleBotLogic = (userText: string) => {
    const cleanText = userText.toLowerCase();
    
    // Stage 1: Detect Pricing / Consultation intent
    if (stage === 'conversational') {
      if (cleanText.includes('price') || cleanText.includes('pricing') || cleanText.includes('cost') || cleanText.includes('plan') || cleanText.includes('book') || cleanText.includes('consult')) {
        const topic = cleanText.includes('price') || cleanText.includes('cost') ? 'Pricing' : 'Consultation';
        setLeadData(prev => ({ ...prev, requestedTopic: topic }));
        setStage('awaiting_email');
        
        return `I would love to share our tailored ${topic.toLowerCase()} plans with you right away! To get started, what is your best professional email address?`;
      }
      return dynamicBrain(userText);
    }

    // Stage 2: Capture Email
    if (stage === 'awaiting_email') {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(userText)) {
        return "Hmm, that format doesn't look quite right. Please drop a valid email address so we can route the brief accurately:";
      }
      setLeadData(prev => ({ ...prev, email: userText }));
      setStage('awaiting_phone');
      return "Perfect, received! And what is the best direct phone or WhatsApp number to connect with you regarding these metrics?";
    }

    // Stage 3: Capture Phone number & close loop
    if (stage === 'awaiting_phone') {
      setLeadData(prev => ({ ...prev, phone: userText }));
      setStage('lead_captured');
      
      // Console log for your backend database mapping hookups
      console.log('Lead Data Secured Successfully:', { ...leadData, phone: userText });

      return `Awesome! Thanks for sharing. Our specialized growth strategists will shoot over our custom ${leadData.requestedTopic || 'Pricing'} breakdown package to your inbox at (${leadData.email || userText}) and reach out via text inside 2 business hours. \n\nMeanwhile, is there any specific project detail you want our technical team to look over?`;
    }

    // Stage 4: Maintain ongoing humanized discussion post capture
    return dynamicBrain(userText);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now(), text, from: 'user', time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const systemReply = handleBotLogic(text);
      const botMsg: Message = { id: Date.now() + 1, text: systemReply, from: 'bot', time: getTime() };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { 
      e.preventDefault(); 
      sendMessage(input); 
    }
  };

  const currentQuickReplies = stage === 'conversational' 
    ? ['Website Development', 'SEO Services', 'Facebook & Google Ads', 'Pricing Plans', 'Book Consultation']
    : [];

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-[9991] w-14 h-14 rounded-full flex items-center justify-center shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #4359A3, #2B3D70)', boxShadow: '0 4px 25px rgba(67,89,163,0.4)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        aria-label="Open Agency Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">1</span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15, originX: 0, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="fixed bottom-24 left-6 z-[9991] w-[340px] sm:w-[380px] bg-[#0B1020] rounded-3xl overflow-hidden border border-white/10 flex flex-col"
            style={{ height: 500, boxShadow: '0 30px 60px rgba(0,0,0,0.6), 0 0 50px rgba(67,89,163,0.03)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4359A3] to-[#2B3D70] p-4 flex items-center gap-3">
              <div className="w-9 h-9 bg-black/10 rounded-full flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-sm tracking-tight font-space">Upnex AI Partner</div>
                <div className="text-white/75 text-xs flex items-center gap-1 font-inter">
                  <span className="w-1.5 h-1.5 bg-black/60 rounded-full animate-pulse" /> Live Support · Verified Agent
                </div>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.from === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#4359A3] to-[#2B3D70] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                      <Bot size={13} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[78%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    msg.from === 'user'
                      ? 'bg-gradient-to-r from-[#4359A3] to-[#2B3D70] text-white font-medium rounded-br-sm shadow-md'
                      : 'bg-white/5 border border-white/5 text-white/90 rounded-bl-sm'
                  }`}>
                    {msg.text}
                    <div className={`text-[10px] mt-1 text-right ${msg.from === 'user' ? 'text-white/50' : 'text-white/30'}`}>{msg.time}</div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#4359A3] to-[#2B3D70] flex items-center justify-center flex-shrink-0">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl rounded-bl-sm px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-1.5 h-1.5 bg-[#8AA2E0] rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Interactive Dynamic Quick Replies */}
            {currentQuickReplies.length > 0 && (
              <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
                {currentQuickReplies.map(qr => (
                  <button
                    key={qr}
                    onClick={() => sendMessage(qr)}
                    className="text-[11px] bg-white/[0.03] hover:bg-[#8AA2E0]/10 border border-white/5 hover:border-[#8AA2E0]/30 text-white/60 hover:text-[#8AA2E0] rounded-full px-2.5 py-1.5 transition-all duration-200 font-inter"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 border-t border-white/5 bg-[#080C18] flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={
                  stage === 'awaiting_email' ? "Enter your email address..." :
                  stage === 'awaiting_phone' ? "Enter your contact number..." : "Ask us anything..."
                }
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs sm:text-sm placeholder-white/30 focus:outline-none focus:border-[#8AA2E0]/40 transition-colors"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#4359A3] to-[#2B3D70] flex items-center justify-center disabled:opacity-30 transition-all flex-shrink-0"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}