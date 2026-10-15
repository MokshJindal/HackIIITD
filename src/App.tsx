import React, { useState } from 'react';
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
  ChevronRight, 
  CheckCircle2, 
  Info,
  HelpCircle
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { ArtisanStudio } from './components/studio/ArtisanStudio';
import { TinyFishHub } from './components/tinyfish/TinyFishHub';
import { TrendForecaster } from './components/trends/TrendForecaster';
import { ONDCGateway } from './components/ondc/ONDCGateway';
import { MakerPassport } from './components/passport/MakerPassport';
import { ARViewer3D } from './components/ar/ARViewer3D';
import { NegotiationBot } from './components/b2b/NegotiationBot';
import { ShilpScore } from './components/fintech/ShilpScore';
import { ClusterCoShipping } from './components/logistics/ClusterCoShipping';
import { EcoPassport } from './components/eco/EcoPassport';
import { ClusterOperations } from './components/cluster/ClusterOperations';
import { Language, GeneratedListing, CraftSample } from './types';
import './App.css';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('studio');
  const [language, setLanguage] = useState<Language>('hi'); // Default Hindi for authentic artisan vernacular feel
  const [offlineQueueCount, setOfflineQueueCount] = useState<number>(0);
  const [publishedListing, setPublishedListing] = useState<GeneratedListing | null>(null);

  // Quick navigation items for the Hackathon Judge Showcase Bar
  const showcaseModules = [
    { id: 'studio', label: '1. Voice-to-Listing Studio', icon: Mic },
    { id: 'tinyfish', label: '2. TinyFish Headless Agent', icon: Sparkles },
    { id: 'trends', label: '3. AI Trend Forecaster', icon: TrendingUp },
    { id: 'ondc', label: '4. ONDC 0% Commission', icon: Globe },
    { id: 'passport', label: '5. Maker QR Passport', icon: ShieldCheck },
    { id: 'ar3d', label: '6. 3D/AR "Will It Fit?"', icon: Box },
    { id: 'b2b-bot', label: '7. B2B Negotiation Bot', icon: MessageSquare },
    { id: 'shilp-score', label: '8. Shilp-Score Credit', icon: CreditCard },
    { id: 'co-shipping', label: '9. Smart Co-Shipping', icon: Truck },
    { id: 'eco-passport', label: '10. Eco-Passport (ESG)', icon: Leaf },
    { id: 'cluster-ops', label: '11. Cluster Operations', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#1c150f] text-amber-50 flex flex-col font-sans selection:bg-amber-600 selection:text-white">
      {/* Top Main Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        offlineQueueCount={offlineQueueCount}
      />

      {/* Main Tab Content Viewport */}
      <main className="flex-1 pb-16">
        {activeTab === 'studio' && (
          <ArtisanStudio
            language={language}
            onNavigateToTab={(t) => setActiveTab(t)}
            onListingPublished={(listing) => {
              setPublishedListing(listing);
            }}
          />
        )}

        {activeTab === 'tinyfish' && <TinyFishHub />}
        {activeTab === 'trends' && <TrendForecaster />}
        {activeTab === 'ondc' && <ONDCGateway />}
        {activeTab === 'passport' && <MakerPassport />}
        {activeTab === 'ar3d' && <ARViewer3D />}
        {activeTab === 'b2b-bot' && <NegotiationBot />}
        {activeTab === 'shilp-score' && <ShilpScore />}
        {activeTab === 'co-shipping' && <ClusterCoShipping />}
        {activeTab === 'eco-passport' && <EcoPassport />}
        {activeTab === 'cluster-ops' && <ClusterOperations />}
      </main>

      {/* Persistent Bottom Hackathon Judge Navigation Pill Bar */}
      <footer className="sticky bottom-0 z-40 bg-stone-950/95 border-t border-amber-800/60 backdrop-blur-md py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-300">
            <span className="font-bold text-amber-400 font-serif">KalaSetu Evaluation Deck:</span>
            <span className="hidden md:inline text-stone-400 text-[11px]">
              Directly jump to any of the 11 hackathon modules:
            </span>
          </div>

          {/* Quick jump pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            {showcaseModules.map((mod) => {
              const Icon = mod.icon;
              const isSelected = activeTab === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveTab(mod.id)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-amber-600 text-white font-bold shadow'
                      : 'bg-stone-900 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  <Icon className="w-3 h-3 text-amber-400" />
                  <span>{mod.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
