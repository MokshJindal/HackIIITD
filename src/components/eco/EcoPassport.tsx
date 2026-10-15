import React, { useState } from 'react';
import { Leaf, Droplets, Zap, ShieldCheck, Sparkles, Share2, Award, Copy, CheckCircle2 } from 'lucide-react';
import { SAMPLE_CRAFTS } from '../../data/mockData';
import { CraftSample } from '../../types';

export const EcoPassport: React.FC = () => {
  const [selectedCraftId, setSelectedCraftId] = useState<string>('craft-1');
  const craft: CraftSample = SAMPLE_CRAFTS.find(c => c.id === selectedCraftId) || SAMPLE_CRAFTS[0];

  const [copiedBadge, setCopiedBadge] = useState(false);

  const handleCopyBadge = () => {
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 border border-emerald-800/40 rounded-2xl p-6 text-emerald-50 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Automated ESG & Climate Impact Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Eco-Passport & Carbon Footprint Badge
            </h1>
            <p className="text-emerald-200/80 text-xs sm:text-sm max-w-2xl mt-1">
              Urban and Western buyers pay up to 40% premium for sustainable living. KalaSetu automatically computes carbon and water savings vs factory mass production, attaching a verified ESG badge.
            </p>
          </div>

          {/* Craft Selector */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-emerald-900/50 p-1.5 rounded-xl border border-emerald-700/50">
            <span className="text-xs text-emerald-300 font-medium">Craft:</span>
            <select
              value={craft.id}
              onChange={(e) => setSelectedCraftId(e.target.value)}
              className="bg-emerald-950 text-emerald-100 text-xs font-medium rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
            >
              {SAMPLE_CRAFTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name.split(' ')[0]} - {c.category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = Verified Metrics vs Factory, Right = Embeddable E-Commerce Badge Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: ESG Lifecycle Analysis */}
        <div className="lg:col-span-7 bg-amber-950/20 border border-amber-800/40 rounded-3xl p-6 shadow-2xl space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold block mb-1">
              Life Cycle Assessment (LCA) vs Mass Factory Production
            </span>
            <h3 className="text-xl font-serif font-bold text-amber-100">
              Climate Savings for {craft.name}
            </h3>
          </div>

          {/* Metric Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Metric 1: CO2 */}
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-2xl space-y-1 shadow-md">
              <div className="flex items-center gap-2 text-emerald-400">
                <Leaf className="w-5 h-5" />
                <span className="font-semibold text-[11px]">CO₂ Emissions Avoided</span>
              </div>
              <div className="text-2xl font-black font-mono text-emerald-300 pt-1">
                -{craft.esgMetrics.co2SavedKg} kg
              </div>
              <p className="text-[10px] text-emerald-200/80">
                vs industrial ceramic kiln fired with coal
              </p>
            </div>

            {/* Metric 2: Water */}
            <div className="bg-teal-950/40 border border-teal-500/40 p-4 rounded-2xl space-y-1 shadow-md">
              <div className="flex items-center gap-2 text-teal-400">
                <Droplets className="w-5 h-5" />
                <span className="font-semibold text-[11px]">Freshwater Saved</span>
              </div>
              <div className="text-2xl font-black font-mono text-teal-300 pt-1">
                +{craft.esgMetrics.waterSavedLiters} L
              </div>
              <p className="text-[10px] text-teal-200/80">
                Natural closed-loop settling basins
              </p>
            </div>

            {/* Metric 3: Power */}
            <div className="bg-amber-950/40 border border-amber-500/40 p-4 rounded-2xl space-y-1 shadow-md">
              <div className="flex items-center gap-2 text-amber-400">
                <Zap className="w-5 h-5" />
                <span className="font-semibold text-[11px]">Electricity Consumed</span>
              </div>
              <div className="text-2xl font-black font-mono text-amber-300 pt-1">
                0 kWh
              </div>
              <p className="text-[10px] text-amber-200/80">
                100% manual wheel & solar drying
              </p>
            </div>
          </div>

          {/* Raw Material Audit */}
          <div className="bg-amber-900/20 border border-amber-800/30 rounded-2xl p-4 text-xs space-y-2">
            <h4 className="font-semibold text-amber-200 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bio-Circular Material Provenance:</span>
            </h4>
            <div className="text-amber-200/80 leading-relaxed space-y-1 text-[11px]">
              <div>• <strong>Primary Substance:</strong> {craft.material}</div>
              <div>• <strong>Microplastics & Chemical Polymers:</strong> 0% Synthetic Additives</div>
              <div>• <strong>End of Life:</strong> 100% Biodegradable into soil within 60 days</div>
            </div>
          </div>
        </div>

        {/* RIGHT: Live E-Commerce Product Card with Leaf Badge */}
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-semibold text-amber-200 block">
            What the Urban / International Buyer Sees:
          </span>

          {/* Product Listing Card Mockup */}
          <div className="bg-white text-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
            <div className="relative h-56 bg-stone-100 flex items-center justify-center p-4">
              <img
                src={craft.processedImage}
                alt={craft.name}
                className="max-h-full object-contain filter drop-shadow-xl"
              />

              {/* Glowing Leaf Badge on top of product */}
              <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-lg">
                <Leaf className="w-3.5 h-3.5 fill-current" />
                <span>Eco-Passport Certified</span>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <div className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">
                  {craft.category} • {craft.village}
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
                  {craft.name}
                </h3>
              </div>

              {/* The Eco Badge Callout */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-xs space-y-1 text-emerald-950">
                <div className="font-bold flex items-center gap-1 text-emerald-800 text-[11px]">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Climate Impact Verified:</span>
                </div>
                <p className="text-[11px] text-emerald-900 font-medium">
                  🍃 100% Handcrafted • Zero Electricity • Saved {craft.esgMetrics.waterSavedLiters}L water and {craft.esgMetrics.co2SavedKg}kg CO₂ vs factory goods.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[10px] text-stone-500 block">Artisan Price:</span>
                  <span className="text-lg font-black font-mono text-stone-900">₹{craft.marketPrice}</span>
                </div>
                <button
                  onClick={handleCopyBadge}
                  className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  {copiedBadge ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedBadge ? 'Copied HTML!' : 'Copy ESG Badge'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
