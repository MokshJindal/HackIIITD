import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  Download, 
  TrendingUp, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  Award, 
  Building2, 
  ArrowUpRight,
  Printer
} from 'lucide-react';
import { MOCK_SHILP_CREDIT } from '../../data/mockData';
import { ShilpCreditProfile } from '../../types';

export const ShilpScore: React.FC = () => {
  const [profile] = useState<ShilpCreditProfile>(MOCK_SHILP_CREDIT);
  const [appliedLoan, setAppliedLoan] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-[#3a2012] to-amber-950 border border-amber-800/40 rounded-2xl p-6 text-amber-50 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Alternative FinTech Credit Infrastructure for Unbanked Artisans</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              "Shilp-Score": AI-Driven Alternative Credit Gauge
            </h1>
            <p className="text-amber-200/80 text-xs sm:text-sm max-w-2xl mt-1">
              Rural artisans lack formal salary slips, tax filings, or collateral for bank loans. Shilp-Score synthesizes app activity, digitized inventory collateral, and ONDC fulfillment records into a verifiable credit score.
            </p>
          </div>

          {/* Download Official Report Button */}
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-xl transition-all self-start md:self-auto"
          >
            <Printer className="w-4 h-4" />
            <span>Download Bank Credit PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left = Shilp-Score Gauge & Metrics, Right = Pre-Approved Loan Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Shilp-Score Gauge & Breakdown */}
        <div className="lg:col-span-6 bg-amber-950/20 border border-amber-800/40 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block">
                Artisan Digital Trust Rating
              </span>
              <h3 className="text-xl font-serif font-bold text-amber-100">
                Shilp-Score: {profile.score} / 900
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
              Tier 1: {profile.tier}
            </span>
          </div>

          {/* Big Score Visualizer Bar */}
          <div>
            <div className="h-4 bg-amber-950 rounded-full overflow-hidden border border-amber-800/60 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${(profile.score / 900) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-amber-400/80 mt-1.5">
              <span>300 (Poor)</span>
              <span>600 (Fair)</span>
              <span>750 (Good)</span>
              <span className="font-bold text-emerald-400">900 (Flawless)</span>
            </div>
          </div>

          {/* Underwriting Indicators Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-amber-900/20 border border-amber-800/30 p-3.5 rounded-xl space-y-1">
              <span className="text-amber-400/80 text-[11px] block">Digitized Inventory Collateral:</span>
              <span className="text-base font-bold font-mono text-emerald-400">
                ₹{profile.inventoryValuation.toLocaleString('en-IN')}
              </span>
              <p className="text-[10px] text-amber-300/70">Verified stock across 28 craft items</p>
            </div>

            <div className="bg-amber-900/20 border border-amber-800/30 p-3.5 rounded-xl space-y-1">
              <span className="text-amber-400/80 text-[11px] block">ONDC Order Fulfillment Rate:</span>
              <span className="text-base font-bold font-mono text-emerald-400">
                {profile.ondcFulfillmentRate}%
              </span>
              <p className="text-[10px] text-amber-300/70">Zero defaults across 14 months</p>
            </div>

            <div className="bg-amber-900/20 border border-amber-800/30 p-3.5 rounded-xl space-y-1">
              <span className="text-amber-400/80 text-[11px] block">Avg Delivery Dispatch:</span>
              <span className="text-base font-bold font-mono text-amber-200">
                {profile.avgDeliveryDays} Days
              </span>
              <p className="text-[10px] text-amber-300/70">Top 5% of craft clusters</p>
            </div>

            <div className="bg-amber-900/20 border border-amber-800/30 p-3.5 rounded-xl space-y-1">
              <span className="text-amber-400/80 text-[11px] block">Repeat Buyer Rate:</span>
              <span className="text-base font-bold font-mono text-amber-200">
                {profile.repeatBuyerRate}%
              </span>
              <p className="text-[10px] text-amber-300/70">Urban corporate repeat buyers</p>
            </div>
          </div>

          <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-3 text-[11px] text-emerald-200/90 leading-relaxed flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              Verifiable under PM Vishwakarma & PM MUDRA underwriting guidelines. Digitized inventory acts as pseudo-collateral to secure working capital.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Pre-Approved Micro-Loan Offers */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-200">
              Pre-Approved Bank Credit Offers (तत्काल ऋण स्वीकृति):
            </span>
            <span className="text-[11px] font-mono text-emerald-400">
              3 Offers Available
            </span>
          </div>

          {profile.preApprovedLoans.map((loan, idx) => (
            <div
              key={idx}
              className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-5 hover:border-amber-600 transition-all shadow-xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-100">{loan.schemeName}</span>
                <span className="text-sm font-black font-mono text-emerald-400">
                  ₹{loan.amount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] font-mono bg-amber-900/20 p-2.5 rounded-xl border border-amber-800/30 text-amber-200">
                <div>
                  <span className="text-amber-400/70 text-[10px] block">Interest</span>
                  <span>{loan.interestRate}</span>
                </div>
                <div>
                  <span className="text-amber-400/70 text-[10px] block">Tenure</span>
                  <span>{loan.tenure}</span>
                </div>
                <div>
                  <span className="text-amber-400/70 text-[10px] block">Est. EMI</span>
                  <span>{loan.emi > 0 ? `₹${loan.emi}/mo` : 'Revolving'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-amber-400/70">
                  Partner: {loan.sanctionPartner}
                </span>

                <button
                  onClick={() => setAppliedLoan(loan.schemeName)}
                  disabled={appliedLoan === loan.schemeName}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    appliedLoan === loan.schemeName
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 hover:bg-amber-500 text-white'
                  }`}
                >
                  {appliedLoan === loan.schemeName ? 'Loan Disbursed to Bank!' : 'Accept & Disburse'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
