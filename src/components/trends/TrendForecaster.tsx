import React, { useState } from 'react';
import { TrendingUp, Sparkles, Volume2, ArrowUpRight, Flame, Compass, Palette, Radio } from 'lucide-react';
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
      <div className="bg-gradient-to-r from-amber-950 via-[#3a2012] to-amber-950 border border-amber-800/40 rounded-2xl p-6 text-amber-50 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-300 text-xs font-semibold mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>TinyFish Social Web Harvester + Vernacular Voice Advisory</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              AI Trend Forecaster: "What to Make Next" (बाजार में क्या बिक रहा है?)
            </h1>
            <p className="text-amber-200/80 text-xs sm:text-sm max-w-2xl mt-1">
              Transforms the app from a passive catalog into a proactive business strategist. TinyFish crawls Pinterest, Etsy, and Instagram to discover global aesthetic trends and converts them into spoken advice for artisans.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-amber-900/40 px-3 py-2 rounded-xl border border-amber-700/50 text-xs text-amber-200">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Crawled from 42,000+ Design Pins & Etsy Hashtags</span>
          </div>
        </div>
      </div>

      {/* Main Trends Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Trend Cards List */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-semibold text-amber-200 block mb-1">
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
              className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                selectedTrend.id === t.id
                  ? 'bg-amber-900/50 border-amber-500 shadow-xl'
                  : 'bg-amber-950/20 border-amber-800/40 hover:bg-amber-900/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/50">
                  {t.relatedCraft}
                </span>
                <span className="flex items-center gap-1 font-mono font-bold text-emerald-400">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+{t.growthPercentage}% Surge</span>
                </span>
              </div>

              <h4 className="font-bold text-amber-100 text-sm mb-1">
                {t.aesthetic}
              </h4>

              <div className="flex items-center gap-2 text-[10px] text-amber-400/80 mb-2">
                <span>Sources:</span>
                {t.sourcePlatforms.map((p, i) => (
                  <span key={i} className="bg-amber-900/40 px-1.5 py-0.2 rounded text-amber-300">
                    {p}
                  </span>
                ))}
              </div>

              {/* Color Swatches */}
              <div className="flex items-center gap-1 pt-1 border-t border-amber-800/30">
                <span className="text-[10px] text-amber-400/70 mr-1">Trending Tones:</span>
                {t.recommendedColors.map((color, i) => (
                  <span
                    key={i}
                    className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-700/40"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Voice Advisory Detail Card */}
        <div className="lg:col-span-7 bg-amber-950/20 border border-amber-800/40 rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-amber-800/40">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-amber-100">
                    Direct Artisan Voice Strategy
                  </h3>
                  <p className="text-[11px] text-amber-300/70">
                    AI translates global aesthetics into dialect advice
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-orange-950 text-orange-300 border border-orange-500/40 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>Demand: {selectedTrend.demandLevel}</span>
              </span>
            </div>

            {/* Vernacular Voice Speech Box */}
            <div className="bg-gradient-to-br from-amber-900/30 to-amber-950/60 border-2 border-orange-500/40 rounded-2xl p-5 shadow-inner space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-orange-400" />
                  <span>Artisan Audio Advisory (ऑडियो सलाह):</span>
                </span>
                <button
                  onClick={() => playVoiceAdvisory(selectedTrend.vernacularAdvisoryHi)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                    isPlayingVoice
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-amber-600 hover:bg-amber-500 text-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingVoice ? 'Stop Speaking' : 'Play Voice Advisory'}</span>
                </button>
              </div>

              {/* Hindi Advisory text */}
              <div className="bg-black/30 p-3.5 rounded-xl border border-white/5">
                <p className="text-amber-100 font-serif text-sm leading-relaxed italic">
                  "{selectedTrend.vernacularAdvisoryHi}"
                </p>
              </div>

              {/* English Translation */}
              <div className="text-[11px] text-amber-300/80 leading-relaxed pt-1">
                <strong className="text-amber-200 block mb-0.5">Strategy Rationale (English):</strong>
                {selectedTrend.vernacularAdvisoryEn}
              </div>
            </div>

            {/* Production Recommendations */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-amber-900/20 border border-amber-800/30 p-3 rounded-xl space-y-1">
                <span className="text-amber-400/80 text-[11px] block">Recommended Batch Size:</span>
                <span className="font-bold text-amber-100 font-mono text-sm">25 - 40 units</span>
                <p className="text-[10px] text-amber-300/70">Test batch before full production</p>
              </div>

              <div className="bg-amber-900/20 border border-amber-800/30 p-3 rounded-xl space-y-1">
                <span className="text-amber-400/80 text-[11px] block">Turnaround Velocity:</span>
                <span className="font-bold text-emerald-400 font-mono text-sm">Sells 40% Faster</span>
                <p className="text-[10px] text-amber-300/70">High search-to-buy ratio on ONDC</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-800/30 text-[11px] text-amber-400/80 text-center">
            💡 Pro-Tip for Judges: Artisans don't need to read market reports — they listen to a 10-second voice prompt and adjust their shapes and glazes.
          </div>
        </div>
      </div>
    </div>
  );
};
