import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  Printer, 
  Building2 
} from 'lucide-react';
import { MOCK_SHILP_CREDIT } from '../../data/mockData';
import { ShilpCreditProfile } from '../../types';

export const ShilpScore: React.FC = () => {
  const [profile] = useState<ShilpCreditProfile>(MOCK_SHILP_CREDIT);
  const [appliedLoan, setAppliedLoan] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm text-stone-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium mb-2">
              <CreditCard className="w-3.5 h-3.5 text-stone-700" />
              <span>Alternative Credit Infrastructure for Unbanked Artisans</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
              "Shilp-Score": AI-Driven Alternative Credit Gauge
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Rural artisans lack formal salary slips or property mortgage. Shilp-Score uses digitized inventory valuation and ONDC order fulfillment records as verifiable pseudo-collateral.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs shadow-xs transition-colors self-start md:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>Download Bank Credit PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Score Gauge */}
        <div className="lg:col-span-6 bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block">
                Artisan Digital Trust Rating
              </span>
              <h3 className="text-2xl font-serif font-bold text-stone-900">
                Shilp-Score: {profile.score} / 900
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold">
              Tier 1: {profile.tier}
            </span>
          </div>

          <div>
            <div className="h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-200 p-0.5">
              <div
                className="h-full bg-emerald-700 rounded-full transition-all duration-700"
                style={{ width: `${(profile.score / 900) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-stone-500 mt-1.5">
              <span>300 (Poor)</span>
              <span>600 (Fair)</span>
              <span>750 (Good)</span>
              <span className="font-semibold text-stone-800">900 (Flawless)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl space-y-1">
              <span className="text-stone-500 text-xs block">Inventory Collateral:</span>
              <span className="text-lg font-bold font-mono text-stone-900">
                ₹{profile.inventoryValuation.toLocaleString('en-IN')}
              </span>
              <p className="text-[11px] text-stone-500">28 verified craft items</p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl space-y-1">
              <span className="text-stone-500 text-xs block">ONDC Fulfillment:</span>
              <span className="text-lg font-bold font-mono text-emerald-700">
                {profile.ondcFulfillmentRate}%
              </span>
              <p className="text-[11px] text-stone-500">Zero defaults in 14 months</p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl space-y-1">
              <span className="text-stone-500 text-xs block">Avg Delivery Dispatch:</span>
              <span className="text-lg font-bold font-mono text-stone-800">
                {profile.avgDeliveryDays} Days
              </span>
              <p className="text-[11px] text-stone-500">Top 5% of craft clusters</p>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl space-y-1">
              <span className="text-stone-500 text-xs block">Repeat Buyer Rate:</span>
              <span className="text-lg font-bold font-mono text-stone-800">
                {profile.repeatBuyerRate}%
              </span>
              <p className="text-[11px] text-stone-500">Corporate repeat orders</p>
            </div>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <span>
              Verifiable under PM Vishwakarma & PM MUDRA underwriting guidelines. Digitized inventory acts as pseudo-collateral for instant working capital.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Pre-Approved Loan Offers */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-700">
              Pre-Approved Bank Credit Offers (तत्काल ऋण स्वीकृति):
            </span>
            <span className="text-xs font-mono text-stone-500">
              3 Offers Available
            </span>
          </div>

          {profile.preApprovedLoans.map((loan, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200/90 rounded-2xl p-5 hover:border-stone-300 transition-colors shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-stone-900">{loan.schemeName}</span>
                <span className="text-base font-bold font-mono text-stone-900">
                  ₹{loan.amount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-stone-700">
                <div>
                  <span className="text-stone-500 text-[10px] block">Interest</span>
                  <span>{loan.interestRate}</span>
                </div>
                <div>
                  <span className="text-stone-500 text-[10px] block">Tenure</span>
                  <span>{loan.tenure}</span>
                </div>
                <div>
                  <span className="text-stone-500 text-[10px] block">Est. EMI</span>
                  <span>{loan.emi > 0 ? `₹${loan.emi}/mo` : 'Revolving'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-stone-500">
                  Partner: {loan.sanctionPartner}
                </span>

                <button
                  onClick={() => setAppliedLoan(loan.schemeName)}
                  disabled={appliedLoan === loan.schemeName}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    appliedLoan === loan.schemeName
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {appliedLoan === loan.schemeName ? 'Disbursed to Bank!' : 'Accept & Disburse'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
