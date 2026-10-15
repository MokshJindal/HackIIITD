import React, { useState } from 'react';
import { Leaf, Droplets, Zap, ShieldCheck, Award, Copy, CheckCircle2 } from 'lucide-react';
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
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm text-stone-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium mb-2">
              <Leaf className="w-3.5 h-3.5 text-emerald-700" />
              <span>Automated ESG & Climate Impact Verification</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
              Eco-Passport & Carbon Footprint Badge
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Calculates carbon footprint savings and water conservation compared to industrial mass production, generating an authentic ESG badge for export markets.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-stone-50 p-1.5 rounded-xl border border-stone-200">
            <span className="text-xs text-stone-600 font-medium">Craft:</span>
            <select
              value={craft.id}
              onChange={(e) => setSelectedCraftId(e.target.value)}
              className="bg-white text-stone-900 text-xs font-medium rounded-lg px-2.5 py-1 border border-stone-200 focus:outline-none cursor-pointer"
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Life Cycle Assessment */}
        <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-emerald-800 font-semibold block mb-0.5">
              Life Cycle Assessment (LCA) vs Mass Production
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Climate Savings for {craft.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium text-xs">
                <Leaf className="w-4 h-4 text-emerald-700" />
                <span>CO₂ Avoided</span>
              </div>
              <div className="text-2xl font-black font-mono text-emerald-900 pt-1">
                -{craft.esgMetrics.co2SavedKg} kg
              </div>
              <p className="text-[11px] text-emerald-800/80">
                vs coal-fired industrial ceramic kiln
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-stone-700 font-medium text-xs">
                <Droplets className="w-4 h-4 text-stone-600" />
                <span>Water Saved</span>
              </div>
              <div className="text-2xl font-black font-mono text-stone-900 pt-1">
                +{craft.esgMetrics.waterSavedLiters} L
              </div>
              <p className="text-[11px] text-stone-500">
                Closed-loop natural settling
              </p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl space-y-1">
              <div className="flex items-center gap-1.5 text-stone-700 font-medium text-xs">
                <Zap className="w-4 h-4 text-stone-600" />
                <span>Grid Power</span>
              </div>
              <div className="text-2xl font-black font-mono text-stone-900 pt-1">
                0 kWh
              </div>
              <p className="text-[11px] text-stone-500">
                Manual wheel & solar drying
              </p>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2">
            <h4 className="font-semibold text-stone-900 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Bio-Circular Material Provenance:</span>
            </h4>
            <div className="text-stone-600 leading-relaxed space-y-1 text-[11px]">
              <div>• <strong>Primary Substance:</strong> {craft.material}</div>
              <div>• <strong>Polymers & Synthetics:</strong> 0% Chemical Additives</div>
              <div>• <strong>End of Life:</strong> 100% Biodegradable into soil within 60 days</div>
            </div>
          </div>
        </div>

        {/* RIGHT: Live Product Card Mockup */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-semibold text-stone-700 block">
            What the Buyer Sees on E-Commerce:
          </span>

          <div className="bg-white text-stone-900 rounded-2xl overflow-hidden shadow-sm border border-stone-200">
            <div className="relative h-56 bg-stone-50 flex items-center justify-center p-4">
              <img
                src={craft.processedImage}
                alt={craft.name}
                className="max-h-full object-contain filter drop-shadow-md"
              />

              <div className="absolute top-3 right-3 bg-emerald-700 text-white px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 shadow-xs">
                <Leaf className="w-3 h-3 fill-current" />
                <span>Eco-Passport Certified</span>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <div className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                  {craft.category} • {craft.village}
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
                  {craft.name}
                </h3>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-xs space-y-1 text-emerald-950">
                <div className="font-bold flex items-center gap-1 text-emerald-900 text-[11px]">
                  <Award className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Climate Impact Verified:</span>
                </div>
                <p className="text-[11px] text-emerald-800 font-medium">
                  🍃 100% Handcrafted • Zero Electricity • Saved {craft.esgMetrics.waterSavedLiters}L water and {craft.esgMetrics.co2SavedKg}kg CO₂ vs factory goods.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-[10px] text-stone-500 block">Artisan Price:</span>
                  <span className="text-lg font-bold font-mono text-stone-900">₹{craft.marketPrice}</span>
                </div>
                <button
                  onClick={handleCopyBadge}
                  className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
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
