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
  Radio
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
    { id: 'tinyfish', label: 'TinyFish Live Intel', labelHi: 'टाइनीफिश इंटेलिजेंस', icon: Sparkles },
    { id: 'trends', label: 'AI Trend Forecaster', labelHi: 'ट्रेंड फोरकास्टर', icon: TrendingUp },
    { id: 'ondc', label: 'ONDC Gateway', labelHi: 'ओएनडीसी नेटवर्क', icon: Globe },
    { id: 'passport', label: 'Maker Passport & QR', labelHi: 'शिल्पकार पासपोर्ट', icon: ShieldCheck },
    { id: 'ar3d', label: '3D & AR "Will It Fit?"', labelHi: '3D/AR रूम व्यू', icon: Box },
    { id: 'b2b-bot', label: 'B2B Negotiation Bot', labelHi: 'वार्तालाप बॉट', icon: MessageSquare },
    { id: 'shilp-score', label: 'Shilp-Score Credit', labelHi: 'शिल्प-स्कोर क्रेडिट', icon: CreditCard },
    { id: 'co-shipping', label: 'Smart Co-Shipping', labelHi: 'क्लस्टर शिपिंग', icon: Truck },
    { id: 'eco-passport', label: 'Eco-Passport (ESG)', labelHi: 'पर्यावरण पासपोर्ट', icon: Leaf },
    { id: 'cluster-ops', label: 'Cluster Operations', labelHi: 'क्लस्टर प्रबंधन', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#2c1d11] text-amber-50 shadow-xl border-b border-amber-900/60 backdrop-blur-md">
      {/* Top Banner with Project Branding and Government/ONDC Affiliation */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-amber-800/40 text-xs">
        <div className="flex items-center gap-2 text-amber-200">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium tracking-wide">
            HACKIIITD Finalist Project: <strong className="text-amber-100">KalaSetu (कलासेतु)</strong>
          </span>
          <span className="hidden md:inline text-amber-400/60">|</span>
          <span className="hidden md:inline text-amber-300">
            Powered by TinyFish Web Scrape & Autonomous Agent APIs + ONDC Beckn Protocol
          </span>
        </div>

        {/* Status Indicators & Language Selector */}
        <div className="flex items-center gap-3">
          {/* Offline Local Queue Status (Flutter/SQLite Simulation) */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-700/50 text-[11px] text-amber-300">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span>SQLite Offline Queue:</span>
            <span className="font-semibold text-emerald-400">
              {offlineQueueCount === 0 ? 'Synced (Online)' : `${offlineQueueCount} Cached`}
            </span>
          </div>

          {/* Regional Dialect Selector */}
          <div className="flex items-center gap-1.5 bg-amber-900/40 px-2 py-0.5 rounded border border-amber-700/50">
            <Radio className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-amber-100 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-amber-950 text-amber-100">English (India)</option>
              <option value="hi" className="bg-amber-950 text-amber-100">हिंदी (Hindi)</option>
              <option value="or" className="bg-amber-950 text-amber-100">ଓଡ଼ିଆ (Odia)</option>
              <option value="ta" className="bg-amber-950 text-amber-100">தமிழ் (Tamil)</option>
              <option value="bn" className="bg-amber-950 text-amber-100">বাংলা (Bengali)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Logo & Navigation Pills */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <div 
          onClick={() => setActiveTab('studio')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-amber-400/30">
            <Sparkles className="w-6 h-6 text-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-serif">KalaSetu</span>
              <span className="text-sm font-semibold text-amber-400 bg-amber-950/90 px-1.5 py-0.5 rounded border border-amber-600/40">कलासेतु</span>
            </div>
            <p className="text-[11px] text-amber-300/80 -mt-0.5">
              Zero-Technical Skill Artisan Digitization & Autonomous Market Linkage
            </p>
          </div>
        </div>

        {/* Scrollable Tab Navigation */}
        <nav className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-orange-950/50 border border-amber-400/40'
                    : 'text-amber-200/80 hover:text-white hover:bg-amber-900/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-amber-400'}`} />
                <span>{language === 'hi' ? tab.labelHi : tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
