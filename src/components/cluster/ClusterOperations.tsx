import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  ShoppingBag, 
  Layers, 
  Building2, 
  ShieldCheck, 
  ArrowRight,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { SAMPLE_CRAFTS } from '../../data/mockData';

export const ClusterOperations: React.FC = () => {
  const [subTab, setSubTab] = useState<'review' | 'cooperative'>('review');

  // Pending listings queue submitted by village artisans
  const [pendingQueue, setPendingQueue] = useState([
    {
      id: 'LST-101',
      artisan: 'Manoj Kumar Prajapati',
      village: 'Aurangabad, Gorakhpur',
      craft: 'Hand-Carved Earthen Decorative Diya Plate (Set of 6)',
      suggestedPrice: 480,
      photoQuality: '94%',
      giVerified: true,
      status: 'pending',
    },
    {
      id: 'LST-102',
      artisan: 'Kamla Devi',
      village: 'Jitwarpur, Madhubani',
      craft: 'Fish Motifs Madhubani Bookmark on Handmade Khadi',
      suggestedPrice: 220,
      photoQuality: '88%',
      giVerified: true,
      status: 'pending',
    },
    {
      id: 'LST-103',
      artisan: 'Balram Sahu',
      village: 'Kot Jewar, Jaipur',
      craft: 'Cobalt Blue Glazed Ceramic Coaster Set (4 pcs)',
      suggestedPrice: 650,
      photoQuality: '91%',
      giVerified: true,
      status: 'pending',
    },
  ]);

  // Cooperative bulk raw material procurement orders
  const [materials] = useState([
    {
      name: 'Alluvial River Clay (Fine Sieved)',
      totalArtisans: 14,
      aggregatedQuantity: '2,800 kg',
      individualRate: '₹14 / kg',
      coopBulkRate: '₹9 / kg',
      savings: '35% Bulk Discount',
      supplier: 'Gorakhpur Riverbed Mineral Federation',
      status: 'Ready for Group Purchase',
    },
    {
      name: 'Cobalt Oxide Mineral Glaze Pigment',
      totalArtisans: 8,
      aggregatedQuantity: '45 kg',
      individualRate: '₹1,200 / kg',
      coopBulkRate: '₹840 / kg',
      savings: '30% Bulk Discount',
      supplier: 'Rajasthan Mineral Refineries, Jaipur',
      status: 'Quotes Received',
    },
    {
      name: 'Biodegradable 5-Ply Corrugated Shipping Boxes',
      totalArtisans: 22,
      aggregatedQuantity: '1,500 boxes',
      individualRate: '₹35 / box',
      coopBulkRate: '₹18 / box',
      savings: '48% Bulk Discount',
      supplier: 'GreenPack India, Noida',
      status: 'Supplier Shortlisted',
    },
  ]);

  const handleApprove = (id: string) => {
    setPendingQueue(pendingQueue.map((item) => (item.id === id ? { ...item, status: 'approved' } : item)));
  };

  const handleReject = (id: string) => {
    setPendingQueue(pendingQueue.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item)));
  };

  const handleBatchApproveAll = () => {
    setPendingQueue(pendingQueue.map((item) => ({ ...item, status: 'approved' })));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-[#3a2012] to-amber-950 border border-amber-800/40 rounded-2xl p-6 text-amber-50 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-300 text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5 text-orange-400" />
              <span>Human-in-the-Loop Operations & Self-Help Group (SHG) Federation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Cluster Operations & Material Buying Cooperative
            </h1>
            <p className="text-amber-200/80 text-xs sm:text-sm max-w-2xl mt-1">
              Cluster coordinators verify listings in bulk before national ONDC dispatch, and pool raw material demand across 20+ village artisans to negotiate up to 48% bulk supplier discounts.
            </p>
          </div>

          {/* Sub-Tabs */}
          <div className="flex items-center gap-1.5 bg-amber-950/80 p-1.5 rounded-xl border border-amber-800/60 self-start md:self-auto">
            <button
              onClick={() => setSubTab('review')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'review'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              Bulk Listing Review
            </button>
            <button
              onClick={() => setSubTab('cooperative')}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'cooperative'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              Material Cooperative
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: BULK LISTING REVIEW QUEUE */}
      {subTab === 'review' && (
        <div className="bg-amber-950/20 border border-amber-800/40 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-800/40">
            <div>
              <h3 className="font-serif font-bold text-base text-amber-100">
                Pending Cluster Listings Queue (Gorakhpur SHG Hub)
              </h3>
              <p className="text-[11px] text-amber-300/70">
                Coordinator review ensures photos, pricing, and GI tags comply with ONDC guidelines
              </p>
            </div>

            <button
              onClick={handleBatchApproveAll}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md self-start sm:self-auto"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Batch Approve All to ONDC</span>
            </button>
          </div>

          <div className="space-y-3">
            {pendingQueue.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                  item.status === 'approved'
                    ? 'bg-emerald-950/30 border-emerald-600/50'
                    : item.status === 'rejected'
                    ? 'bg-rose-950/30 border-rose-600/50'
                    : 'bg-amber-900/20 border-amber-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-amber-400/80 bg-black/40 px-1.5 py-0.2 rounded">
                      {item.id}
                    </span>
                    <span className="font-bold text-amber-100 text-sm">{item.craft}</span>
                    {item.giVerified && (
                      <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-500/30">
                        GI Verified
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-amber-300/80">
                    Artisan: <strong>{item.artisan}</strong> • {item.village}
                  </div>
                  <div className="flex gap-3 text-[10px] text-amber-400/70 mt-1 font-mono">
                    <span>Suggested Price: <strong className="text-emerald-400">₹{item.suggestedPrice}</strong></span>
                    <span>Photo AI Score: <strong>{item.photoQuality}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {item.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-all"
                      >
                        Request Reshoot
                      </button>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow"
                      >
                        Approve & Publish
                      </button>
                    </>
                  ) : item.status === 'approved' ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approved for ONDC</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4" />
                      <span>Reshoot Requested</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: MATERIAL BUYING COOPERATIVE */}
      {subTab === 'cooperative' && (
        <div className="bg-amber-950/20 border border-amber-800/40 rounded-3xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-800/40">
            <div>
              <h3 className="font-serif font-bold text-base text-amber-100">
                Material Buying Cooperative (थोक कच्चा माल खरीद संघ)
              </h3>
              <p className="text-[11px] text-amber-300/70">
                Combines individual artisans' clay, glaze, and box orders for bulk negotiation
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
              Avg Savings: 38%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {materials.map((m, idx) => (
              <div
                key={idx}
                className="bg-amber-900/20 border border-amber-800/30 rounded-2xl p-4 flex flex-col justify-between text-xs space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-100 text-sm">{m.name}</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    {m.savings}
                  </span>

                  <div className="mt-3 bg-black/30 p-2.5 rounded-xl border border-white/5 space-y-1 font-mono text-[11px]">
                    <div className="flex justify-between text-stone-300">
                      <span>Artisans Pooled:</span>
                      <strong className="text-amber-200">{m.totalArtisans} makers</strong>
                    </div>
                    <div className="flex justify-between text-stone-300">
                      <span>Total Volume:</span>
                      <strong className="text-amber-200">{m.aggregatedQuantity}</strong>
                    </div>
                    <div className="flex justify-between text-stone-300">
                      <span>Individual Retail:</span>
                      <span className="line-through text-stone-400">{m.individualRate}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Co-op Negotiated:</span>
                      <span>{m.coopBulkRate}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-amber-400/80 mt-2">
                    Supplier: <strong>{m.supplier}</strong>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Group Purchase Order for ${m.aggregatedQuantity} sent to ${m.supplier}!`)}
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition-all shadow"
                >
                  Confirm Group Purchase Order
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
