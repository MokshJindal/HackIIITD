import React, { useState } from 'react';
import { Truck, MapPin, Sparkles } from 'lucide-react';

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

  const totalIndividual = orders.reduce((sum, o) => sum + o.individualFreight, 0);
  const totalPooled = orders.reduce((sum, o) => sum + o.pooledFreight, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm text-stone-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium mb-2">
              <Truck className="w-3.5 h-3.5 text-stone-700" />
              <span>Geo-Fenced Rural Logistics Pooling (PIN: 273001)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
              Smart Cluster Co-Shipping (साझा लॉजिस्टिक्स)
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Solo courier pickups in remote villages cost ₹150 for a ₹300 item. KalaSetu detects nearby orders within 48h and aggregates them into a single India Post truck.
            </p>
          </div>

          <button
            onClick={() => setPooled(!pooled)}
            className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 shadow-xs transition-colors self-start md:self-auto ${
              pooled
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-100 text-stone-700 border border-stone-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{pooled ? 'Cluster Pooling: ACTIVE (-73%)' : 'View Unpooled Freight'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Clean Map Visualization */}
        <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-100 text-xs">
              <div className="flex items-center gap-2 text-stone-800">
                <MapPin className="w-4 h-4 text-stone-600" />
                <span className="font-semibold">Village Aurangabad Craft Cluster (PIN: 273001)</span>
              </div>
              <span className="text-[10px] font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                Hub: India Post Rural Dak Ghar
              </span>
            </div>

            {/* Stylized Light Village Canvas */}
            <div className="relative w-full h-72 rounded-xl bg-[#f8f7f4] border border-stone-200 p-4 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

              {pooled && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="#78716c" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="#78716c" strokeWidth="1.5" strokeDasharray="4 4" />
                  <line x1="25%" y1="75%" x2="50%" y2="50%" stroke="#78716c" strokeWidth="1.5" strokeDasharray="4 4" />
                </svg>
              )}

              {/* Center Postal Node */}
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-stone-900 text-white flex flex-col items-center justify-center shadow-md border border-stone-700">
                <Truck className="w-7 h-7 text-white" />
                <span className="text-[9px] font-medium mt-1">India Post</span>
              </div>

              {/* Artisan Points */}
              <div className="absolute top-6 left-6 z-10 bg-white border border-stone-200 p-2.5 rounded-xl text-center shadow-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-600 mx-auto" />
                <span className="text-xs text-stone-900 font-bold block mt-1">Rameshwar</span>
                <span className="text-[10px] text-stone-500 font-mono">Terracotta Vase</span>
              </div>

              <div className="absolute top-6 right-6 z-10 bg-white border border-stone-200 p-2.5 rounded-xl text-center shadow-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-600 mx-auto" />
                <span className="text-xs text-stone-900 font-bold block mt-1">Manoj</span>
                <span className="text-[10px] text-stone-500 font-mono">Diya Set</span>
              </div>

              <div className="absolute bottom-6 left-10 z-10 bg-white border border-stone-200 p-2.5 rounded-xl text-center shadow-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-600 mx-auto" />
                <span className="text-xs text-stone-900 font-bold block mt-1">Sarita Devi</span>
                <span className="text-[10px] text-stone-500 font-mono">Wall Tile</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600">
            <span>Pickup Window: <strong>Next 18 Hours</strong></span>
            <span>Cluster Volume: <strong>3.3 kg (Combined)</strong></span>
          </div>
        </div>

        {/* RIGHT: Financial Savings */}
        <div className="lg:col-span-5 bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs uppercase font-bold text-emerald-900 tracking-wide">
                Cluster Freight Reduction
              </span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full font-mono">
                -73% Saved
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-emerald-800">
                ₹{pooled ? totalPooled : totalIndividual}
              </span>
              {pooled && (
                <span className="text-sm font-mono text-stone-400 line-through">
                  ₹{totalIndividual}
                </span>
              )}
            </div>

            <p className="text-xs text-emerald-800/90 mt-1">
              {pooled
                ? `Total freight dropped from ₹${totalIndividual} down to ₹${totalPooled}. Each artisan saves ₹110!`
                : `Individual shipments cost ₹${totalIndividual} total without aggregation.`}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-stone-700 block">
              Aggregated Village Shipments:
            </span>

            {orders.map((o) => (
              <div
                key={o.id}
                className="bg-stone-50 border border-stone-200/80 p-3 rounded-xl flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-stone-900">{o.artisan}</div>
                  <div className="text-[11px] text-stone-500">{o.item} → {o.destination}</div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-stone-900 text-sm">
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

          <button
            onClick={() => alert('India Post Rural Dak Sevak dispatched for cluster pickup!')}
            className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs shadow-xs transition-colors"
          >
            Schedule India Post Dak Sevak Pickup
          </button>
        </div>
      </div>
    </div>
  );
};
