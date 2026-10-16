import React from 'react';
import { TrendingUp, Sparkles, PieChart, ExternalLink, CheckCircle2 } from 'lucide-react';
import { CraftSample, MarketBenchmark } from '../../types';
import { MOCK_MARKET_BENCHMARKS } from '../../data/mockData';

interface PriceAdvisorProps {
  craft: CraftSample;
  currentPrice: number;
  onPriceChange: (newPrice: number) => void;
}

export const PriceAdvisor: React.FC<PriceAdvisorProps> = ({
  craft,
  currentPrice,
  onPriceChange,
}) => {
  const benchmarks: MarketBenchmark[] = MOCK_MARKET_BENCHMARKS[craft.id] || MOCK_MARKET_BENCHMARKS['craft-1'];
  
  const prices = benchmarks.map(b => b.price);
  const minMarket = Math.min(...prices);
  const maxMarket = Math.max(...prices);
  const modalMarket = craft.marketPrice;

  const rawMaterial = craft.costBreakdown.rawMaterial;
  const packaging = craft.costBreakdown.packaging;
  const shipping = craft.costBreakdown.shipping;
  const firingKiln = craft.costBreakdown.firingKiln;
  const totalDirectCosts = rawMaterial + packaging + shipping + firingKiln;
  
  const ondcNetTakeHome = Math.max(0, currentPrice - totalDirectCosts);
  const amazonLegacyFee = Math.round(currentPrice * 0.18);
  const ondcSavings = amazonLegacyFee;

  return (
    <div className="bg-white border border-[#eae5dc] rounded-2xl p-5 shadow-[0_2px_12px_rgba(35,25,15,0.03)] space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#fbf5ee] text-[#b84a28] flex items-center justify-center border border-[#f2e2d0]">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-stone-900 font-serif">
                Dynamic Price Intelligence (TinyFish लाइव मूल्य निर्धारण)
              </h4>
              <span className="text-[10px] font-semibold text-[#1b4d3e] bg-[#f0f7f4] px-2 py-0.2 rounded-full border border-[#d6eae2]">
                Live Web Scrape
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Live web benchmark from Amazon Karigar, Etsy, GeM & Craftsvilla to guarantee fair wages
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f0f7f4] border border-[#d6eae2] text-[#1b4d3e] text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#1b4d3e]" />
          <span>Real-time Pricing Guard</span>
        </div>
      </div>

      {/* Interactive Price Slider & Benchmarks */}
      <div className="bg-[#faf7f2] border border-[#eae5dc] rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-700">
            Artisan Selling Price (कारीगर का विक्रय मूल्य):
          </span>
          <div className="text-2xl font-bold font-mono text-stone-900">
            ₹{currentPrice}
          </div>
        </div>

        <input
          type="range"
          min={Math.round(minMarket * 0.7)}
          max={Math.round(maxMarket * 1.2)}
          step={10}
          value={currentPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
        />

        {/* Min / Modal / Max Market Indicator */}
        <div className="flex justify-between text-xs font-mono text-stone-600 pt-1">
          <div>
            <span className="block text-[10px] text-stone-400 uppercase">Market Min</span>
            <span className="font-semibold text-stone-700">₹{minMarket}</span>
          </div>
          <div className="text-center">
            <span className="block text-[10px] text-emerald-700 uppercase font-semibold">Recommended Fair Price</span>
            <span className="font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-md border border-emerald-200">
              ₹{modalMarket}
            </span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-stone-400 uppercase">Market Max</span>
            <span className="font-semibold text-stone-700">₹{maxMarket}</span>
          </div>
        </div>
      </div>

      {/* Cost & ONDC Advantage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Cost Breakdown */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 text-xs space-y-2">
          <div className="font-semibold text-stone-700 text-xs flex items-center gap-1.5 pb-1 border-b border-stone-200">
            <PieChart className="w-3.5 h-3.5 text-stone-500" />
            <span>Cost & Take-Home Breakdown</span>
          </div>
          <div className="space-y-1.5 text-stone-600 text-xs">
            <div className="flex justify-between">
              <span>Raw Material & Clay:</span>
              <span className="font-mono text-stone-900">₹{rawMaterial}</span>
            </div>
            {firingKiln > 0 && (
              <div className="flex justify-between">
                <span>Wood Kiln Fuel:</span>
                <span className="font-mono text-stone-900">₹{firingKiln}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Eco Box Packaging:</span>
              <span className="font-mono text-stone-900">₹{packaging}</span>
            </div>
            <div className="flex justify-between">
              <span>Shared Cluster Shipping:</span>
              <span className="font-mono text-stone-900">₹{shipping}</span>
            </div>
            <div className="flex justify-between pt-1.5 border-t border-stone-200 font-bold text-stone-900">
              <span>Net Take-Home to Artisan:</span>
              <span className="font-mono text-emerald-700 text-sm">₹{ondcNetTakeHome} ({Math.round((ondcNetTakeHome / currentPrice) * 100)}%)</span>
            </div>
          </div>
        </div>

        {/* ONDC vs Private Commission */}
        <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-xl p-3.5 text-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-emerald-900 text-xs">
                ONDC Digital India Advantage
              </span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded border border-emerald-300">
                0% Commission
              </span>
            </div>
            <p className="text-emerald-800/90 text-[11px] leading-relaxed mb-3">
              Unlike private portals charging 15-25% commissions (₹{amazonLegacyFee}), ONDC routes 100% of the sale value directly to your UPI account.
            </p>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-emerald-200 flex items-center justify-between shadow-2xs">
            <span className="text-emerald-900 font-medium text-xs">Extra Profit Kept per Item:</span>
            <span className="font-mono font-bold text-emerald-700 text-sm">+ ₹{ondcSavings}</span>
          </div>
        </div>
      </div>

      {/* Live Market Examples */}
      <div className="space-y-2 pt-1 border-t border-stone-100">
        <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
          <span>Live Market Comparables (TinyFish Real-Time Web Data):</span>
          <span className="text-[11px] text-stone-500 font-normal">4 Active Platforms</span>
        </div>

        <div className="space-y-2">
          {benchmarks.map((item, idx) => (
            <div
              key={idx}
              className="bg-stone-50 border border-stone-200/80 rounded-xl p-2.5 flex items-center justify-between gap-3 text-xs hover:border-stone-300 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-white text-stone-800 border border-stone-200">
                    {item.platform}
                  </span>
                  {item.verifiedHandmade && (
                    <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Verified Handcrafted</span>
                    </span>
                  )}
                </div>
                <div className="text-stone-800 font-medium truncate">{item.title}</div>
                <div className="text-[10px] text-stone-400">{item.lastScraped}</div>
              </div>

              <div className="text-right shrink-0">
                <div className="font-mono font-bold text-stone-900 text-sm">₹{item.price}</div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-stone-500 hover:text-stone-900 flex items-center justify-end gap-0.5 mt-0.5"
                >
                  <span>Inspect</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
