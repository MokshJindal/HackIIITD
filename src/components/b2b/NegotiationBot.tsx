import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Mic, 
  ArrowRightLeft, 
  Languages, 
  ShieldCheck,
  User,
  Bot
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'buyer' | 'bot' | 'artisan';
  textEn?: string;
  textRegional?: string;
  regionalLang?: string;
  audioVoice?: string;
  time: string;
}

export const NegotiationBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'buyer',
      textEn: 'Hello! I represent Taj Corporate Gifting, Mumbai. We are looking for 60 terracotta vases for our Diwali executive hamper. Can you do ₹380 per unit?',
      time: '10:30 AM',
    },
    {
      id: 'm-2',
      sender: 'bot',
      textRegional: 'नमस्ते रमेश जी! मुंबई से ताज होटल वाले 60 फूलदान दिवाली के लिए मांग रहे हैं। वो एक पीस के लिए ₹380 दे रहे हैं। क्या आप इस भाव में देंगे?',
      regionalLang: 'Hindi (अवधी/हिंदी)',
      audioVoice: 'Namaste Ramesh ji, Mumbai se Taj Hotel wale 60 phool-daan mang rahe hain...',
      time: '10:30 AM',
    },
  ]);

  const [buyerInput, setBuyerInput] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [dealFinalized, setDealFinalized] = useState(false);

  // Quick counter-offer presets for artisan in regional dialect
  const artisanQuickReplies = [
    {
      labelHi: 'कम से कम ₹440 लगेंगे (शुद्ध हाथ का काम)',
      textHi: 'नहीं भैया, ₹380 बहुत कम है। कम से कम ₹440 लगेगा। 4 दिन में एक बनता है, शुद्ध ताल की मिट्टी है।',
      targetEnglish: 'The artisan explains that each vase takes 4 days of manual wheel-crafting with pure alluvial clay. He can offer ₹440 per unit for 60 pieces with GI tagging.',
    },
    {
      labelHi: '₹420 में दे देंगे अगर 100 पीस लें',
      textHi: 'अगर वो 100 पीस लें, तो हम ₹420 में दे सकते हैं।',
      targetEnglish: 'The artisan is willing to lower the unit price to ₹420 if you can increase the order volume to 100 units.',
    },
    {
      labelHi: 'सौदा पक्का! ₹430 पर तैयार हैं',
      textHi: 'हाँ, ₹430 का भाव सही है। 60 पीस 15 दिन में तैयार कर देंगे।',
      targetEnglish: 'We accept your offer at ₹430 per unit. The cluster can dispatch 60 units within 15 days.',
    },
  ];

  const handleArtisanReply = (reply: typeof artisanQuickReplies[0]) => {
    setIsTranslating(true);

    // 1. Add artisan message
    const artisanMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'artisan',
      textRegional: reply.textHi,
      regionalLang: 'Hindi (कारीगर बोली)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, artisanMsg]);

    // 2. AI Bot formulates professional English counter-offer
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        sender: 'bot',
        textEn: `[KalaSetu Vernacular AI Mediator]: ${reply.targetEnglish}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTranslating(false);

      if (reply.labelHi.includes('सौदा पक्का')) {
        setDealFinalized(true);
      }
    }, 1000);
  };

  const handleBuyerSend = () => {
    if (!buyerInput.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'buyer',
      textEn: buyerInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    const input = buyerInput;
    setBuyerInput('');
    setIsTranslating(true);

    // AI bot translates to Hindi for artisan
    setTimeout(() => {
      const translatedForArtisan: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        sender: 'bot',
        textRegional: `खरीदार का नया संदेश: "${input}"। AI सलाह: आप ₹430 का अंतिम प्रस्ताव रख सकते हैं।`,
        regionalLang: 'Hindi (कारीगर बोली)',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, translatedForArtisan]);
      setIsTranslating(false);
    }, 900);
  };

  const playTTS = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'hi-IN';
      window.speechSynthesis.speak(u);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-[#3a2012] to-amber-950 border border-amber-800/40 rounded-2xl p-6 text-amber-50 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-300 text-xs font-semibold mb-2">
              <Languages className="w-3.5 h-3.5 text-orange-400" />
              <span>Real-Time Vernacular B2B Voice & Text Mediator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Multilingual Negotiation Bot (द्विभाषी सौदा वार्तालाप)
            </h1>
            <p className="text-amber-200/80 text-xs sm:text-sm max-w-2xl mt-1">
              Solves the critical "last mile" of closing bulk wholesale deals. Corporate buyers message in professional English while rural artisans respond naturally in their mother tongue.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/80 px-3 py-2 rounded-xl border border-emerald-500/40 text-xs text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Smart Contract & Escrow Protected</span>
          </div>
        </div>
      </div>

      {/* Main Split Chat: Left = Corporate Buyer (English), Right = Artisan Dialect (Hindi/Odia) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Corporate Buyer Interface (English) */}
        <div className="lg:col-span-6 bg-amber-950/20 border border-amber-800/40 rounded-3xl p-5 shadow-2xl flex flex-col justify-between h-[520px]">
          <div>
            {/* Buyer Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-800/40">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-sm">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-100">
                    Taj Corporate Procurement (Mumbai)
                  </h4>
                  <p className="text-[10px] text-amber-400/80">
                    Buyer Language: English (Formal B2B)
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-blue-950 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                Verified B2B Buyer
              </span>
            </div>

            {/* Buyer Message Feed */}
            <div className="h-[340px] overflow-y-auto space-y-3 p-2 scrollbar-none">
              {messages
                .filter((m) => m.sender === 'buyer' || (m.sender === 'bot' && m.textEn))
                .map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      m.sender === 'buyer' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs ${
                        m.sender === 'buyer'
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-amber-900/40 border border-amber-700/50 text-amber-100'
                      }`}
                    >
                      {m.sender === 'bot' && (
                        <div className="flex items-center gap-1 text-[10px] text-orange-300 font-bold mb-1">
                          <Bot className="w-3 h-3" />
                          <span>AI Negotiator</span>
                        </div>
                      )}
                      <p className="leading-relaxed">{m.textEn}</p>
                    </div>
                    <span className="text-[9px] text-amber-400/60 mt-0.5 px-1 font-mono">
                      {m.time}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Buyer Input Box */}
          <div className="flex gap-2 pt-2 border-t border-amber-800/40">
            <input
              type="text"
              value={buyerInput}
              onChange={(e) => setBuyerInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBuyerSend()}
              placeholder="Counter-offer (e.g. Can you do ₹430 for 60 units?)..."
              className="flex-1 bg-amber-950/60 border border-amber-700/60 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none placeholder-amber-400/40"
            />
            <button
              onClick={handleBuyerSend}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Artisan Regional Dialect Interface (Hindi / Odia) */}
        <div className="lg:col-span-6 bg-[#1f1610] border-2 border-amber-600/50 rounded-3xl p-5 shadow-2xl flex flex-col justify-between h-[520px]">
          <div>
            {/* Artisan Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-800/40">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
                  alt="Artisan"
                  className="w-9 h-9 rounded-full object-cover border border-amber-500"
                />
                <div>
                  <h4 className="text-sm font-bold text-amber-100">
                    Rameshwar Prajapati (कारीगर स्क्रीन)
                  </h4>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Dialect: Hindi (अवधी) Voice & Script</span>
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                Pehchan ID: 8849-01
              </span>
            </div>

            {/* Artisan Regional Feed */}
            <div className="h-[270px] overflow-y-auto space-y-3 p-2 scrollbar-none">
              {messages
                .filter((m) => m.sender === 'artisan' || (m.sender === 'bot' && m.textRegional))
                .map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      m.sender === 'artisan' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs ${
                        m.sender === 'artisan'
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'bg-amber-900/40 border border-amber-700/50 text-amber-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] text-amber-300 font-bold">
                          {m.sender === 'artisan' ? 'आपका उत्तर' : 'बॉट का अनुवाद (ऑडियो)'}
                        </span>
                        {m.textRegional && (
                          <button
                            onClick={() => playTTS(m.textRegional || '')}
                            className="text-[10px] text-amber-300 hover:text-white flex items-center gap-0.5 bg-black/30 px-1.5 py-0.5 rounded"
                          >
                            <Volume2 className="w-2.5 h-2.5" />
                            <span>सुनें</span>
                          </button>
                        )}
                      </div>
                      <p className="leading-relaxed font-serif">{m.textRegional}</p>
                    </div>
                    <span className="text-[9px] text-amber-400/60 mt-0.5 px-1 font-mono">
                      {m.time}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Vernacular One-Tap Replies for Artisan */}
          <div className="pt-2 border-t border-amber-800/40 space-y-2">
            <span className="text-[11px] font-semibold text-amber-300 block">
              कारीगर के लिए त्वरित विकल्प (1-Tap Dialect Replies):
            </span>
            <div className="space-y-1.5">
              {artisanQuickReplies.map((reply, i) => (
                <button
                  key={i}
                  disabled={isTranslating}
                  onClick={() => handleArtisanReply(reply)}
                  className="w-full text-left p-2 rounded-xl bg-amber-900/30 hover:bg-amber-800/50 border border-amber-700/40 text-amber-200 text-xs font-serif transition-all hover:scale-[1.01] flex items-center justify-between"
                >
                  <span className="truncate">{reply.labelHi}</span>
                  <span className="text-[10px] text-amber-400 font-sans font-semibold shrink-0 ml-2">
                    भेजें →
                  </span>
                </button>
              ))}
            </div>

            {dealFinalized && (
              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>डील पक्की! ₹430 × 60 = ₹25,800</span>
                </span>
                <button
                  onClick={() => alert('Official ONDC B2B Purchase Order & Advance Escrow Invoice Generated!')}
                  className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-[11px]"
                >
                  Generate Invoice
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
