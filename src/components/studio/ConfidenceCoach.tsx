import React, { useState } from 'react';
import { Award, CheckCircle2, Sparkles, Check } from 'lucide-react';
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

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center border border-stone-200">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-stone-900 font-serif">
              Listing Confidence Coach (लिस्टिंग गुणवत्ता स्कोर)
            </h4>
            <p className="text-xs text-stone-500">
              Evaluates buyer conversion readiness & provides 1-tap coaching fixes
            </p>
          </div>
        </div>

        {/* Clean Score Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono font-medium text-stone-500">Confidence</div>
            <div className="text-lg font-bold font-mono text-stone-900 leading-tight">
              {currentTotal} / 100
            </div>
          </div>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
            currentTotal >= 90
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-amber-100 text-amber-800'
          }`}>
            {currentTotal >= 90 ? 'E-Commerce Ready' : 'Needs 1-2 Fixes'}
          </span>
        </div>
      </div>

      {/* 6 Core Pillars Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <div className="bg-stone-50 border border-stone-200/80 p-2.5 rounded-xl">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-stone-600">Photo Quality</span>
            <span className="font-mono font-bold text-stone-900">{listing.confidenceScore.photoQuality}%</span>
          </div>
          <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${listing.confidenceScore.photoQuality}%` }} />
          </div>
        </div>

        <div className="bg-stone-50 border border-stone-200/80 p-2.5 rounded-xl">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-stone-600">Description</span>
            <span className="font-mono font-bold text-stone-900">{listing.confidenceScore.descriptionCompleteness}%</span>
          </div>
          <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${listing.confidenceScore.descriptionCompleteness}%` }} />
          </div>
        </div>

        <div className="bg-stone-50 border border-stone-200/80 p-2.5 rounded-xl">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-stone-600">Price Fairness</span>
            <span className="font-mono font-bold text-stone-900">{listing.confidenceScore.priceCompetitiveness}%</span>
          </div>
          <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${listing.confidenceScore.priceCompetitiveness}%` }} />
          </div>
        </div>

        <div className="bg-stone-50 border border-stone-200/80 p-2.5 rounded-xl">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-stone-600">Category Match</span>
            <span className="font-mono font-bold text-stone-900">{listing.confidenceScore.categoryAccuracy}%</span>
          </div>
          <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${listing.confidenceScore.categoryAccuracy}%` }} />
          </div>
        </div>

        <div className="bg-stone-50 border border-stone-200/80 p-2.5 rounded-xl">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-stone-600">Shipping Ready</span>
            <span className="font-mono font-bold text-stone-900">
              {recommendations.find(r => r.id === 'rec-1')?.done ? '95%' : '65%'}
            </span>
          </div>
          <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-stone-800 rounded-full transition-all duration-300" 
              style={{ width: `${recommendations.find(r => r.id === 'rec-1')?.done ? 95 : 65}%` }} 
            />
          </div>
        </div>

        <div className="bg-stone-50 border border-stone-200/80 p-2.5 rounded-xl">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-stone-600">Trust Signals</span>
            <span className="font-mono font-bold text-stone-900">{listing.confidenceScore.trustSignals}%</span>
          </div>
          <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${listing.confidenceScore.trustSignals}%` }} />
          </div>
        </div>
      </div>

      {/* One-Tap Coach Fixes */}
      <div className="pt-2 border-t border-stone-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-700" />
            <span>One-Tap Coach Fixes (सुझाव लागू करें):</span>
          </span>
          <span className="text-xs text-stone-500">
            {recommendations.filter(r => r.done).length} of {recommendations.length} completed
          </span>
        </div>

        <div className="space-y-2">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              onClick={() => toggleRecommendation(rec.id)}
              className={`flex items-start justify-between gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                rec.done
                  ? 'bg-emerald-50/60 border-emerald-200'
                  : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div className={`mt-0.5 rounded-full p-0.5 ${rec.done ? 'text-emerald-700' : 'text-stone-400'}`}>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className={`font-medium ${rec.done ? 'text-emerald-900 line-through' : 'text-stone-900'}`}>
                    {rec.title}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    {rec.action}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  rec.done ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                }`}>
                  +{rec.impact}%
                </span>
                <button
                  type="button"
                  className={`text-xs font-medium px-2.5 py-1 rounded transition-colors ${
                    rec.done
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 text-white hover:bg-stone-800'
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
