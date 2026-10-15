import React, { useState } from 'react';
import { Award, CheckCircle2, ChevronRight, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';
import { GeneratedListing } from '../../types';

interface ConfidenceCoachProps {
  listing: GeneratedListing;
  onUpdateListing?: (updated: GeneratedListing) => void;
}

export const ConfidenceCoach: React.FC<ConfidenceCoachProps> = ({
  listing,
  onUpdateListing,
}) => {
  const [recommendations, setRecommendations] = useState(
    listing.confidenceScore.recommendations
  );

  // Compute live dynamic score based on completed recommendations
  const baseScore = 78;
  const bonus = recommendations
    .filter((r) => r.done)
    .reduce((sum, r) => sum + r.impact, 0);
  const currentTotal = Math.min(100, baseScore + bonus);

  const toggleRecommendation = (id: string) => {
    const updated = recommendations.map((r) =>
      r.id === id ? { ...r, done: !r.done } : r
    );
    setRecommendations(updated);

    if (onUpdateListing) {
      onUpdateListing({
        ...listing,
        confidenceScore: {
          ...listing.confidenceScore,
          total: Math.min(100, baseScore + updated.filter((r) => r.done).reduce((s, r) => s + r.impact, 0)),
          recommendations: updated,
        },
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40';
    if (score >= 75) return 'text-amber-400 border-amber-500/50 bg-amber-950/40';
    return 'text-rose-400 border-rose-500/50 bg-rose-950/40';
  };

  return (
    <div className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-4 md:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-100 font-serif">
              Listing Confidence Coach (लिस्टिंग गुणवत्ता स्कोर)
            </h4>
            <p className="text-[11px] text-amber-300/70">
              AI evaluates buyer conversion signals & offers 1-tap coaching improvements
            </p>
          </div>
        </div>

        {/* Big Score Badge */}
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-bold ${getScoreColor(currentTotal)}`}>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-amber-300 font-mono">Confidence</div>
            <div className="text-lg leading-none font-mono">{currentTotal} / 100</div>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">
            {currentTotal >= 90 ? 'E-Commerce Ready' : 'Good (Needs 1-2 Fixes)'}
          </span>
        </div>
      </div>

      {/* 6 Core Pillars Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
        <div className="bg-amber-900/20 border border-amber-800/30 p-2.5 rounded-xl">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-amber-200">Photo Quality</span>
            <span className="font-mono font-bold text-emerald-400">{listing.confidenceScore.photoQuality}%</span>
          </div>
          <div className="h-1.5 bg-amber-950 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${listing.confidenceScore.photoQuality}%` }} />
          </div>
        </div>

        <div className="bg-amber-900/20 border border-amber-800/30 p-2.5 rounded-xl">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-amber-200">Description</span>
            <span className="font-mono font-bold text-emerald-400">{listing.confidenceScore.descriptionCompleteness}%</span>
          </div>
          <div className="h-1.5 bg-amber-950 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${listing.confidenceScore.descriptionCompleteness}%` }} />
          </div>
        </div>

        <div className="bg-amber-900/20 border border-amber-800/30 p-2.5 rounded-xl">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-amber-200">Price Competitiveness</span>
            <span className="font-mono font-bold text-amber-400">{listing.confidenceScore.priceCompetitiveness}%</span>
          </div>
          <div className="h-1.5 bg-amber-950 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${listing.confidenceScore.priceCompetitiveness}%` }} />
          </div>
        </div>

        <div className="bg-amber-900/20 border border-amber-800/30 p-2.5 rounded-xl">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-amber-200">Category Accuracy</span>
            <span className="font-mono font-bold text-emerald-400">{listing.confidenceScore.categoryAccuracy}%</span>
          </div>
          <div className="h-1.5 bg-amber-950 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${listing.confidenceScore.categoryAccuracy}%` }} />
          </div>
        </div>

        <div className="bg-amber-900/20 border border-amber-800/30 p-2.5 rounded-xl">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-amber-200">Shipping Readiness</span>
            <span className="font-mono font-bold text-amber-400">
              {recommendations.find(r => r.id === 'rec-1')?.done ? '95%' : '65%'}
            </span>
          </div>
          <div className="h-1.5 bg-amber-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 rounded-full transition-all duration-300" 
              style={{ width: `${recommendations.find(r => r.id === 'rec-1')?.done ? 95 : 65}%` }} 
            />
          </div>
        </div>

        <div className="bg-amber-900/20 border border-amber-800/30 p-2.5 rounded-xl">
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-amber-200">Trust Signals</span>
            <span className="font-mono font-bold text-emerald-400">{listing.confidenceScore.trustSignals}%</span>
          </div>
          <div className="h-1.5 bg-amber-950 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${listing.confidenceScore.trustSignals}%` }} />
          </div>
        </div>
      </div>

      {/* One-Tap Coach Fixes (Interactive!) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-amber-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>One-Tap Coach Fixes (सुझाव लागू करें):</span>
          </span>
          <span className="text-[10px] text-amber-400/80">
            {recommendations.filter(r => r.done).length} of {recommendations.length} applied
          </span>
        </div>

        <div className="space-y-2">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              onClick={() => toggleRecommendation(rec.id)}
              className={`flex items-start justify-between gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all duration-200 ${
                rec.done
                  ? 'bg-emerald-950/20 border-emerald-800/50 hover:bg-emerald-950/30'
                  : 'bg-amber-900/30 border-amber-700/50 hover:border-amber-500 hover:bg-amber-900/40'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className={`mt-0.5 rounded-full p-0.5 ${rec.done ? 'text-emerald-400' : 'text-amber-400/60'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className={`font-medium ${rec.done ? 'text-emerald-200 line-through' : 'text-amber-100'}`}>
                    {rec.title}
                  </div>
                  <div className="text-[11px] text-amber-300/80 mt-0.5">
                    {rec.action}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                  rec.done ? 'bg-emerald-900/60 text-emerald-300' : 'bg-orange-950/80 text-orange-300 border border-orange-500/30'
                }`}>
                  +{rec.impact}%
                </span>
                <button
                  type="button"
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded transition-all ${
                    rec.done
                      ? 'bg-emerald-800/40 text-emerald-200'
                      : 'bg-amber-600 hover:bg-amber-500 text-white'
                  }`}
                >
                  {rec.done ? 'Applied' : 'Apply'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
