import React, { useState } from 'react';
import { TrendingUp, Volume2, ArrowUpRight, Flame, Compass, Radio } from 'lucide-react';
import { MOCK_TRENDS } from '../../data/mockData';
import { TrendSignal } from '../../types';

export const TrendForecaster: React.FC = () => {
  const [trends] = useState<TrendSignal[]>(MOCK_TRENDS);
  const [selectedTrend, setSelectedTrend] = useState<TrendSignal>(MOCK_TRENDS[0]);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);

  const playVoiceAdvisory = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (!isPlayingVoice) {
        setIsPlayingVoice(true);
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'hi-IN';
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlayingVoice(false);
        utterance.onerror = () => setIsPlayingVoice(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setIsPlayingVoice(false);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm text-stone-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-orange-700" />
              <span>TinyFish Social Web Harvester & Voice Strategy</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
              AI Trend Forecaster: "What to Make Next" (बाजार में क्या बिक रहा है?)
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Crawls Pinterest, Etsy trends, and Instagram to discover global aesthetic demands and converts them into spoken advice for rural artisans.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200 text-xs text-stone-600">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Crawled from 42,000+ Design Pins & Etsy Hashtags</span>
          </div>
        </div>
      </div>

      {/* Main Trends Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Trend Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-semibold text-stone-700 block">
            Surging Global Design Aesthetics:
          </span>

          {trends.map((t) => (
            <div
              key={t.id}
              onClick={() => {
                setSelectedTrend(t);
                if (isPlayingVoice) {
                  window.speechSynthesis?.cancel();
                  setIsPlayingVoice(false);
                }
              }}
              className={`p-4 rounded-xl border text-xs cursor-pointer transition-colors ${
                selectedTrend.id === t.id
                  ? 'bg-stone-100/90 border-stone-400 shadow-xs'
                  : 'bg-white border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                  {t.relatedCraft}
                </span>
                <span className="flex items-center gap-1 font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>+{t.growthPercentage}% Surge</span>
                </span>
              </div>

              <h4 className="font-bold text-stone-900 text-sm mb-1">
                {t.aesthetic}
              </h4>

              <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-2">
                <span>Sources:</span>
                {t.sourcePlatforms.map((p, i) => (
                  <span key={i} className="bg-stone-100 px-1.5 py-0.2 rounded text-stone-700 border border-stone-200 text-[10px]">
                    {p}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1 pt-1.5 border-t border-stone-100">
                <span className="text-[10px] text-stone-500 mr-1">Trending Tones:</span>
                {t.recommendedColors.map((color, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Voice Advisory Detail Card */}
        <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center border border-stone-200">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    Direct Artisan Voice Strategy
                  </h3>
                  <p className="text-xs text-stone-500">
                    AI translates global aesthetics into regional dialect advice
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>Demand: {selectedTrend.demandLevel}</span>
              </span>
            </div>

            {/* Voice Speech Box */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-orange-700" />
                  <span>Artisan Audio Advisory (ऑडियो सलाह):</span>
                </span>
                <button
                  onClick={() => playVoiceAdvisory(selectedTrend.vernacularAdvisoryHi)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                    isPlayingVoice
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingVoice ? 'Stop Speaking' : 'Play Voice Advisory'}</span>
                </button>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-stone-200">
                <p className="text-stone-900 font-serif text-sm leading-relaxed italic">
                  "{selectedTrend.vernacularAdvisoryHi}"
                </p>
              </div>

              <div className="text-xs text-stone-600 leading-relaxed pt-1">
                <strong className="text-stone-800 block mb-0.5">Strategy Rationale (English):</strong>
                {selectedTrend.vernacularAdvisoryEn}
              </div>
            </div>

            {/* Production Recommendations */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl space-y-1">
                <span className="text-stone-500 text-xs block">Recommended Batch Size:</span>
                <span className="font-bold text-stone-900 font-mono text-sm">25 - 40 units</span>
                <p className="text-[11px] text-stone-500">Test batch before full production</p>
              </div>

              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl space-y-1">
                <span className="text-stone-500 text-xs block">Turnaround Velocity:</span>
                <span className="font-bold text-emerald-800 font-mono text-sm">Sells 40% Faster</span>
                <p className="text-[11px] text-stone-500">High search-to-buy ratio on ONDC</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 text-xs text-stone-500 text-center">
            💡 Artisans listen to a 10-second voice prompt in their mother tongue and adjust clay forms or glazes.
          </div>
        </div>
      </div>
    </div>
  );
};
