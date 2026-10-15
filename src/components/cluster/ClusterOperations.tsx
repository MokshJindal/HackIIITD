import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Check 
} from 'lucide-react';

export const ClusterOperations: React.FC = () => {
  const [subTab, setSubTab] = useState<'review' | 'cooperative'>('review');

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
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm text-stone-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium mb-2">
              <Users className="w-3.5 h-3.5 text-stone-700" />
              <span>Human-in-the-Loop Operations & Self-Help Group (SHG) Federation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
              Cluster Operations & Material Buying Cooperative
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Cluster coordinators review village listings in bulk and aggregate raw material demand across 20+ makers to negotiate up to 48% bulk discounts.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 self-start md:self-auto">
            <button
              onClick={() => setSubTab('review')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'review'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Bulk Listing Review
            </button>
            <button
              onClick={() => setSubTab('cooperative')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'cooperative'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Material Cooperative
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: BULK LISTING REVIEW */}
      {subTab === 'review' && (
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Pending Cluster Listings Queue (Gorakhpur SHG Hub)
              </h3>
              <p className="text-xs text-stone-500">
                Coordinator review ensures photos, pricing, and GI tags comply with ONDC guidelines
              </p>
            </div>

            <button
              onClick={handleBatchApproveAll}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs self-start sm:self-auto"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Batch Approve All to ONDC</span>
            </button>
          </div>

          <div className="space-y-3">
            {pendingQueue.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  item.status === 'approved'
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : item.status === 'rejected'
                    ? 'bg-rose-50/50 border-rose-200'
                    : 'bg-stone-50 border-stone-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-stone-500 bg-white px-1.5 py-0.2 rounded border border-stone-200">
                      {item.id}
                    </span>
                    <span className="font-bold text-stone-900 text-sm">{item.craft}</span>
                    {item.giVerified && (
                      <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        GI Verified
                      </span>
                    )}
                  </div>
                  <div className="text-stone-600 text-[11px]">
                    Artisan: <strong>{item.artisan}</strong> • {item.village}
                  </div>
                  <div className="flex gap-3 text-[11px] text-stone-500 mt-1 font-mono">
                    <span>Suggested Price: <strong className="text-stone-900">₹{item.suggestedPrice}</strong></span>
                    <span>Photo AI Score: <strong>{item.photoQuality}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {item.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-3 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-medium transition-colors"
                      >
                        Request Reshoot
                      </button>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors shadow-2xs"
                      >
                        Approve & Publish
                      </button>
                    </>
                  ) : item.status === 'approved' ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approved for ONDC</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1">
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

      {/* SUB-TAB 2: MATERIAL COOPERATIVE */}
      {subTab === 'cooperative' && (
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Material Buying Cooperative (थोक कच्चा माल खरीद संघ)
              </h3>
              <p className="text-xs text-stone-500">
                Combines individual artisans' clay, glaze, and box orders for bulk negotiation
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Avg Savings: 38%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {materials.map((m, idx) => (
              <div
                key={idx}
                className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col justify-between text-xs space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-900 text-sm">{m.name}</span>
                  </div>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100/70 px-2 py-0.5 rounded border border-emerald-200">
                    {m.savings}
                  </span>

                  <div className="mt-3 bg-white p-3 rounded-xl border border-stone-200 space-y-1 font-mono text-xs">
                    <div className="flex justify-between text-stone-600">
                      <span>Artisans Pooled:</span>
                      <strong className="text-stone-900">{m.totalArtisans} makers</strong>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Total Volume:</span>
                      <strong className="text-stone-900">{m.aggregatedQuantity}</strong>
                    </div>
                    <div className="flex justify-between text-stone-500">
                      <span>Individual Retail:</span>
                      <span className="line-through">{m.individualRate}</span>
                    </div>
                    <div className="flex justify-between text-emerald-800 font-bold">
                      <span>Co-op Negotiated:</span>
                      <span>{m.coopBulkRate}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-stone-500 mt-2">
                    Supplier: <strong className="text-stone-700">{m.supplier}</strong>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Group Purchase Order for ${m.aggregatedQuantity} sent to ${m.supplier}!`)}
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs transition-colors shadow-2xs"
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
