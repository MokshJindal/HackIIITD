import React, { useState } from 'react';
import { 
  Send, 
  Volume2, 
  CheckCircle2, 
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
      audioVoice: 'Namaste Ramesh ji...',
      time: '10:30 AM',
    },
  ]);

  const [buyerInput, setBuyerInput] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [dealFinalized, setDealFinalized] = useState(false);

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

    const artisanMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'artisan',
      textRegional: reply.textHi,
      regionalLang: 'Hindi (कारीगर बोली)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, artisanMsg]);

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
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm text-stone-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium mb-2">
              <Languages className="w-3.5 h-3.5 text-stone-700" />
              <span>Real-Time Vernacular B2B Voice & Text Mediator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
              Multilingual Negotiation Bot (द्विभाषी सौदा वार्तालाप)
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Wholesale buyers communicate in professional English while rural artisans respond naturally in their mother tongue.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Escrow & Smart Contract Protected</span>
          </div>
        </div>
      </div>

      {/* Main Split Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Corporate Buyer (English) */}
        <div className="lg:col-span-6 bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[520px]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 border border-stone-200 flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Taj Corporate Procurement (Mumbai)
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Buyer Language: English (Formal B2B)
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200">
                Verified Buyer
              </span>
            </div>

            {/* Messages Feed */}
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
                      className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                        m.sender === 'buyer'
                          ? 'bg-stone-900 text-white shadow-2xs'
                          : 'bg-stone-50 border border-stone-200 text-stone-800'
                      }`}
                    >
                      {m.sender === 'bot' && (
                        <div className="flex items-center gap-1 text-[10px] text-orange-700 font-bold mb-1">
                          <Bot className="w-3 h-3" />
                          <span>AI Negotiator</span>
                        </div>
                      )}
                      <p>{m.textEn}</p>
                    </div>
                    <span className="text-[9px] text-stone-400 mt-0.5 px-1 font-mono">
                      {m.time}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Input Box */}
          <div className="flex gap-2 pt-2 border-t border-stone-100">
            <input
              type="text"
              value={buyerInput}
              onChange={(e) => setBuyerInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBuyerSend()}
              placeholder="Type counter-offer in English..."
              className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400 placeholder-stone-400"
            />
            <button
              onClick={handleBuyerSend}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs flex items-center gap-1 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Artisan Dialect Screen */}
        <div className="lg:col-span-6 bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between h-[520px]">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"
                  alt="Artisan"
                  className="w-8 h-8 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Rameshwar Prajapati (कारीगर स्क्रीन)
                  </h4>
                  <p className="text-[11px] text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span>Dialect: Hindi (अवधी) Voice & Text</span>
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200">
                Pehchan ID: 8849-01
              </span>
            </div>

            {/* Regional Feed */}
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
                          ? 'bg-stone-900 text-white shadow-2xs'
                          : 'bg-stone-50 border border-stone-200 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] text-stone-500 font-medium">
                          {m.sender === 'artisan' ? 'आपका उत्तर' : 'बॉट का अनुवाद'}
                        </span>
                        {m.textRegional && (
                          <button
                            onClick={() => playTTS(m.textRegional || '')}
                            className="text-[10px] text-stone-600 hover:text-stone-900 flex items-center gap-0.5 bg-white px-1.5 py-0.5 rounded border border-stone-200"
                          >
                            <Volume2 className="w-2.5 h-2.5" />
                            <span>सुनें</span>
                          </button>
                        )}
                      </div>
                      <p className="leading-relaxed font-serif text-sm">{m.textRegional}</p>
                    </div>
                    <span className="text-[9px] text-stone-400 mt-0.5 px-1 font-mono">
                      {m.time}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Quick Replies */}
          <div className="pt-2 border-t border-stone-100 space-y-2">
            <span className="text-xs font-semibold text-stone-700 block">
              कारीगर के लिए त्वरित विकल्प (1-Tap Dialect Replies):
            </span>
            <div className="space-y-1.5">
              {artisanQuickReplies.map((reply, i) => (
                <button
                  key={i}
                  disabled={isTranslating}
                  onClick={() => handleArtisanReply(reply)}
                  className="w-full text-left p-2 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 text-xs font-serif transition-colors flex items-center justify-between"
                >
                  <span className="truncate">{reply.labelHi}</span>
                  <span className="text-[10px] text-stone-500 font-sans font-medium shrink-0 ml-2">
                    भेजें →
                  </span>
                </button>
              ))}
            </div>

            {dealFinalized && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <span className="font-semibold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>सौदा पक्का! ₹430 × 60 = ₹25,800</span>
                </span>
                <button
                  onClick={() => alert('Official ONDC B2B Purchase Order & Escrow Invoice Generated!')}
                  className="px-2.5 py-1 rounded bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs"
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
