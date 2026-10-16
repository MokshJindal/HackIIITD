import React from 'react';
import { 
  Sparkles, 
  Mic, 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  Box, 
  MessageSquare, 
  CreditCard, 
  Truck, 
  Leaf, 
  Users, 
  Wifi, 
  Languages
} from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  offlineQueueCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  offlineQueueCount,
}) => {
  const navTabs = [
    { id: 'studio', label: 'Artisan Studio', labelHi: 'शिल्प स्टूडियो', icon: Mic },
    { id: 'tinyfish', label: 'TinyFish Intel', labelHi: 'टाइनीफिश इंटेलिजेंस', icon: Sparkles },
    { id: 'trends', label: 'Trend Forecaster', labelHi: 'ट्रेंड फोरकास्टर', icon: TrendingUp },
    { id: 'ondc', label: 'ONDC Gateway', labelHi: 'ओएनडीसी नेटवर्क', icon: Globe },
    { id: 'passport', label: 'Maker Passport', labelHi: 'शिल्पकार पासपोर्ट', icon: ShieldCheck },
    { id: 'ar3d', label: '3D & AR Room', labelHi: '3D/AR रूम व्यू', icon: Box },
    { id: 'b2b-bot', label: 'Negotiation Bot', labelHi: 'वार्तालाप बॉट', icon: MessageSquare },
    { id: 'shilp-score', label: 'Shilp-Score', labelHi: 'शिल्प-स्कोर क्रेडिट', icon: CreditCard },
    { id: 'co-shipping', label: 'Co-Shipping', labelHi: 'क्लस्टर शिपिंग', icon: Truck },
    { id: 'eco-passport', label: 'Eco-Passport', labelHi: 'पर्यावरण पासपोर्ट', icon: Leaf },
    { id: 'cluster-ops', label: 'Cluster Ops', labelHi: 'क्लस्टर प्रबंधन', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Subtle Utility Topbar */}
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 text-xs text-stone-600">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="font-semibold text-stone-900 tracking-tight font-serif">
            CraftsConnect (क्राफ्ट्सकनेक्ट)
          </span>
          <span className="text-stone-300">/</span>
          <span className="hidden sm:inline text-stone-500">
            HACKIIITD • Handicraft Digitization & ONDC Direct Linkage
          </span>
        </div>

        {/* Status Indicators & Language Selector */}
        <div className="flex items-center gap-2.5">
          {/* Offline Local Queue Status */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-50 border border-stone-200 text-[11px] text-stone-600">
            <Wifi className="w-3 h-3 text-emerald-600" />
            <span>SQLite Offline Sync:</span>
            <span className="font-semibold text-stone-800">
              {offlineQueueCount === 0 ? 'Ready' : `${offlineQueueCount} Cached`}
            </span>
          </div>

          {/* Regional Dialect Selector */}
          <div className="flex items-center gap-1 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-200">
            <Languages className="w-3 h-3 text-stone-500" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-stone-800 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="or">ଓଡ଼ିଆ (Odia)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="bn">বাংলা (Bengali)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        <div 
          onClick={() => setActiveTab('studio')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#b84a28] to-[#8c3216] text-white flex items-center justify-center font-serif font-black text-base shadow-sm group-hover:scale-105 transition-transform border border-amber-900/20">
            <span>🏺</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-stone-900 font-serif">CraftsConnect</span>
              <span className="text-[10px] font-semibold text-amber-900 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/80">
                क्राफ्ट्सकनेक्ट
              </span>
            </div>
            <p className="text-[11px] text-stone-500 -mt-0.5">
              Empowering Traditional Artisans with Zero Technical Barriers
            </p>
          </div>
        </div>

        {/* Scrollable Clean Navigation Pills */}
        <nav className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                <span>{language === 'hi' ? tab.labelHi : tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
