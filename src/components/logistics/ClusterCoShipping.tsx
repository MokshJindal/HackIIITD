import React, { useState } from 'react';
import { Truck, MapPin, Package, CheckCircle2, ArrowRight, Zap, Sparkles } from 'lucide-react';

export const ClusterCoShipping: React.FC = () => {
  const [pooled, setPooled] = useState<boolean>(true);

  const orders = [
    {
      id: 'ORD-01',
      artisan: 'Rameshwar Prajapati',
      item: 'Terracotta Vase (1.4 kg)',
      destination: 'Delhi NCR',
      individualFreight: 150,
      pooledFreight: 40,
    },
    {
      id: 'ORD-02',
      artisan: 'Manoj Kumar',
      item: 'Terracotta Diya Set (0.8 kg)',
      destination: 'Bengaluru',
      individualFreight: 140,
      pooledFreight: 38,
    },
    {
      id: 'ORD-03',
      artisan: 'Sarita Devi',
      item: 'Terracotta Wall Tile (1.1 kg)',
      destination: 'Mumbai',
      individualFreight: 160,
      pooledFreight: 42,
    },
  ];

  const totalIndividual = orders.reduce((sum, o) => sum + o.individualFreight, 0); // ₹450
  const totalPooled = orders.reduce((sum, o) => sum + o.pooledFreight, 0); // ₹120
  const totalSavings = totalIndividual - totalPooled; // ₹330 (73% savings)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-[#3a2012] to-amber-950 border border-amber-800/40 rounded-2xl p-6 text-amber-50 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-300 text-xs font-semibold mb-2">
              <Truck className="w-3.5 h-3.5 text-orange-400" />
              <span>Geo-Fenced Rural Logistics Pooling (PIN Code: 273001)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Smart Cluster Co-Shipping (साझा लॉजिस्टिक्स)
            </h1>
            <p className="text-amber-200/80 text-xs sm:text-sm max-w-2xl mt-1">
              Solo courier pickups in remote villages cost ₹150 for a ₹300 item, wiping out artisan profits. KalaSetu detects nearby orders within 48h and aggregates them into a single bulk India Post truck.
            </p>
          </div>

          {/* Toggle Pooling Mode */}
          <button
            onClick={() => setPooled(!pooled)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xl transition-all self-start md:self-auto ${
              pooled
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-stone-800 hover:bg-stone-700 text-amber-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{pooled ? 'Cluster Pooling: ACTIVE (-73%)' : 'View Unpooled Freight'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left = Visual Geographic Cluster Map, Right = Financial Savings Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Geo-fenced Village Visualization Map */}
        <div className="lg:col-span-7 bg-[#16120e] border border-amber-800/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-800/30 text-xs">
              <div className="flex items-center gap-2 text-amber-200">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="font-semibold">Village Aurangabad Craft Cluster (PIN: 273001)</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                Hub: India Post Rural Dak Ghar
              </span>
            </div>

            {/* Stylized Village Map Canvas */}
            <div className="relative w-full h-72 rounded-2xl bg-[#0f0c0a] border border-amber-900/60 p-4 overflow-hidden flex items-center justify-center">
              {/* Radial Roads / Lines connecting to central truck */}
              <div className="absolute inset-0 bg-[radial-gradient(#452311_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

              {/* Connecting Lines */}
              {pooled && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              )}

              {/* Central Pickup Truck */}
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 text-white flex flex-col items-center justify-center shadow-2xl border-2 border-yellow-300 animate-pulse">
                <Truck className="w-8 h-8" />
                <span className="text-[9px] font-bold mt-1">India Post</span>
              </div>

              {/* Artisan Point 1 */}
              <div className="absolute top-6 left-6 z-10 bg-amber-950/90 border border-amber-500/60 p-2 rounded-xl text-center shadow-lg">
                <div className="w-3 h-3 rounded-full bg-emerald-400 mx-auto animate-ping" />
                <span className="text-[10px] text-amber-200 font-bold block mt-1">Rameshwar</span>
                <span className="text-[9px] text-amber-400/80 font-mono">Terracotta Vase</span>
              </div>

              {/* Artisan Point 2 */}
              <div className="absolute top-6 right-6 z-10 bg-amber-950/90 border border-amber-500/60 p-2 rounded-xl text-center shadow-lg">
                <div className="w-3 h-3 rounded-full bg-emerald-400 mx-auto animate-ping" />
                <span className="text-[10px] text-amber-200 font-bold block mt-1">Manoj</span>
                <span className="text-[9px] text-amber-400/80 font-mono">Diya Set</span>
              </div>

              {/* Artisan Point 3 */}
              <div className="absolute bottom-6 left-10 z-10 bg-amber-950/90 border border-amber-500/60 p-2 rounded-xl text-center shadow-lg">
                <div className="w-3 h-3 rounded-full bg-emerald-400 mx-auto animate-ping" />
                <span className="text-[10px] text-amber-200 font-bold block mt-1">Sarita Devi</span>
                <span className="text-[9px] text-amber-400/80 font-mono">Wall Tile</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-800/30 flex items-center justify-between text-xs text-amber-300">
            <span>Pickup Window: <strong>Next 18 Hours</strong></span>
            <span>Cluster Volume: <strong>3.3 kg (Combined)</strong></span>
          </div>
        </div>

        {/* RIGHT: Financial Savings & Orders List */}
        <div className="lg:col-span-5 bg-amber-950/20 border border-amber-800/40 rounded-3xl p-6 shadow-2xl space-y-5">
          {/* Savings Highlight Card */}
          <div className="bg-gradient-to-br from-emerald-950/80 to-teal-950/80 border-2 border-emerald-500/60 rounded-2xl p-5 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase font-extrabold text-emerald-300 tracking-wider">
                Cluster Cost Reduction
              </span>
              <span className="text-xs bg-emerald-800/80 text-white font-bold px-2 py-0.5 rounded-full font-mono">
                -73% Saved
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-emerald-400">
                ₹{pooled ? totalPooled : totalIndividual}
              </span>
              {pooled && (
                <span className="text-sm font-mono text-stone-400 line-through">
                  ₹{totalIndividual}
                </span>
              )}
            </div>

            <p className="text-xs text-emerald-200/80 mt-1">
              {pooled
                ? `Total shipping dropped from ₹${totalIndividual} down to ₹${totalPooled}. Each artisan saves ₹110 on freight!`
                : `Individual shipments cost ₹${totalIndividual} total without aggregation.`}
            </p>
          </div>

          {/* Orders in the Pool */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold text-amber-200 block">
              Aggregated Village Shipments:
            </span>

            {orders.map((o) => (
              <div
                key={o.id}
                className="bg-amber-900/20 border border-amber-800/30 p-3 rounded-xl flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-amber-100">{o.artisan}</div>
                  <div className="text-[11px] text-amber-300/80">{o.item} → {o.destination}</div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-400 text-sm">
                    ₹{pooled ? o.pooledFreight : o.individualFreight}
                  </div>
                  {pooled && (
                    <div className="text-[10px] text-stone-400 line-through">
                      ₹{o.individualFreight}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action */}
          <button
            onClick={() => alert('India Post Rural Dak Sevak dispatched for cluster pickup!')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-xl transition-all"
          >
            Schedule India Post Dak Sevak Pickup
          </button>
        </div>
      </div>
    </div>
  );
};
