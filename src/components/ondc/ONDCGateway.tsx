import React, { useState } from 'react';
import { 
  Globe, 
  Share2, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  Code2, 
  Smartphone, 
  Search, 
  Zap, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const ONDCGateway: React.FC = () => {
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [activeBuyerApp, setActiveBuyerApp] = useState<'Paytm' | 'Pincode' | 'Magicpin' | 'Mystore'>('Paytm');

  const buyerApps = [
    {
      name: 'Paytm ONDC Store',
      tagline: 'Consumer Payments & Commerce',
      users: '300M+ Active Users',
      badge: 'Active & Indexed',
      color: 'bg-blue-600',
    },
    {
      name: 'PhonePe Pincode',
      tagline: 'Hyperlocal & Regional Commerce',
      users: '100M+ App Installs',
      badge: 'Active & Indexed',
      color: 'bg-purple-600',
    },
    {
      name: 'Magicpin ONDC Node',
      tagline: 'Lifestyle & Gifting Discovery',
      users: '10M+ Urban Shoppers',
      badge: 'Active & Indexed',
      color: 'bg-rose-600',
    },
    {
      name: 'Mystore Seller SNP',
      tagline: 'ONDC Core Seller Network Participant',
      users: 'Full Network Gateway',
      badge: 'BPP Provider Node',
      color: 'bg-emerald-600',
    },
  ];

  // Beckn Protocol v1.2 JSON-LD payload compliant with ONDC Retail specification
  const becknPayload = {
    context: {
      domain: 'ONDC:RET10',
      action: 'on_search',
      core_version: '1.2.0',
      bap_id: 'buyer-app.paytm.com',
      bpp_id: 'snp.kalasetu.mystore.in',
      bpp_uri: 'https://snp.kalasetu.mystore.in/beckn',
      transaction_id: 'tx-kala-98214-ondc',
      message_id: 'msg-ondc-beckn-5521',
      timestamp: new Date().toISOString(),
      country: 'IND',
      city: 'std:0551', // Gorakhpur STD code
    },
    message: {
      catalog: {
        'bpp/descriptor': {
          name: 'KalaSetu Artisan Federation (Gorakhpur Cluster)',
          symbol: 'https://kalasetu.in/assets/logo.png',
          short_desc: 'Direct Rural Artisan Empowerment Node',
        },
        'bpp/providers': [
          {
            id: 'PROV-RAMESH-PRAJAPATI',
            descriptor: {
              name: 'Rameshwar Prajapati (Master Terracotta Artisan)',
              images: ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400'],
            },
            items: [
              {
                id: 'ITEM-TERRA-VASE-01',
                descriptor: {
                  name: 'GI Certified Gorakhpur Terracotta Hand-Painted Vase (35cm)',
                  code: 'HSN:69120010',
                  symbol: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600',
                  short_desc: 'Molded from alluvial clay. 100% biodegradable and wood kiln fired.',
                },
                price: {
                  currency: 'INR',
                  value: '680.00',
                  maximum_value: '750.00',
                },
                category_id: 'Handicrafts & Decor',
                fulfillment_id: 'FUL-INDIA-POST-SHARED',
                tags: [
                  { code: 'gi_tag', value: 'GI-AP-541' },
                  { code: 'shilp_score', value: '785' },
                  { code: 'platform_fee', value: '0%' },
                  { code: 'carbon_saved_kg', value: '14.8' },
                ],
              },
            ],
          },
        ],
      },
    },
  };

  const handleCopySchema = () => {
    navigator.clipboard.writeText(JSON.stringify(becknPayload, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 border border-emerald-800/40 rounded-2xl p-6 text-emerald-50 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-2">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Digital Public Infrastructure (DPI) Hook</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              One-Tap ONDC Multi-App Distribution
            </h1>
            <p className="text-emerald-200/80 text-xs sm:text-sm max-w-2xl mt-1">
              Connecting traditional artisans directly to India's Open Network for Digital Commerce via Seller Network Participants (SNP), eliminating 15–30% private marketplace commissions.
            </p>
          </div>

          {/* 0% Commission Badge */}
          <div className="bg-gradient-to-tr from-amber-500 to-yellow-400 text-stone-950 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border-2 border-yellow-200 self-start md:self-auto">
            <Zap className="w-6 h-6 fill-current" />
            <div>
              <div className="text-xs uppercase font-extrabold tracking-wider leading-none">
                Zero Platform Commission
              </div>
              <div className="text-lg font-black font-mono leading-tight">
                0% Fee via ONDC
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Visual Architecture Flowchart */}
      <div className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-6 shadow-xl">
        <h3 className="text-sm font-semibold text-amber-200 font-serif mb-4 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-orange-400" />
          <span>One Single Voice/Photo Upload Branches Out to 5+ National Buyer Apps</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-xs text-center">
          {/* Node 1: Artisan App */}
          <div className="bg-amber-900/30 border border-amber-600/50 p-4 rounded-xl space-y-1 shadow-md">
            <div className="w-8 h-8 rounded-full bg-orange-600 text-white mx-auto flex items-center justify-center font-bold">
              1
            </div>
            <div className="font-bold text-amber-100 text-sm">Artisan App</div>
            <p className="text-[11px] text-amber-300/80">Voice Note + Photo Upload</p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex justify-center text-amber-400">
            <ArrowRight className="w-6 h-6" />
          </div>

          {/* Node 2: KalaSetu SNP Gateway */}
          <div className="bg-emerald-950/40 border border-emerald-500/50 p-4 rounded-xl space-y-1 shadow-md">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">
              2
            </div>
            <div className="font-bold text-emerald-200 text-sm">KalaSetu SNP Adapter</div>
            <p className="text-[11px] text-emerald-300/80">Beckn Protocol & GI Validation</p>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex justify-center text-amber-400">
            <ArrowRight className="w-6 h-6" />
          </div>

          {/* Node 3: Open Network */}
          <div className="bg-gradient-to-br from-blue-950/60 to-purple-950/60 border border-cyan-500/50 p-4 rounded-xl space-y-1 shadow-md">
            <div className="w-8 h-8 rounded-full bg-cyan-600 text-white mx-auto flex items-center justify-center font-bold">
              3
            </div>
            <div className="font-bold text-cyan-200 text-sm">ONDC Network Registry</div>
            <p className="text-[11px] text-cyan-300/80">Simultaneous Broadcast</p>
          </div>
        </div>

        {/* Buyer App Cards Grid */}
        <div className="mt-6 pt-5 border-t border-amber-800/40">
          <span className="text-xs font-semibold text-amber-300 block mb-3">
            Real-Time Searchable on Consumer Buyer Apps:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {buyerApps.map((app, idx) => (
              <div
                key={idx}
                className="bg-amber-900/20 border border-amber-800/30 p-3.5 rounded-xl hover:border-amber-600 transition-all text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-amber-100 text-sm">{app.name}</span>
                    <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                      {app.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-300/70 mb-2">{app.tagline}</div>
                  <div className="text-[10px] text-amber-400 font-mono font-semibold">
                    {app.users}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Beckn Protocol JSON-LD Schema Inspector */}
      <div className="bg-[#141210] border border-amber-900/50 rounded-2xl p-5 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-amber-900/40">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-mono text-sm font-bold text-amber-200">
                Beckn Protocol Retail v1.2 (JSON-LD Payload)
              </h3>
              <p className="text-[11px] text-stone-400">
                Strict compliance with ONDC seller network participant specifications
              </p>
            </div>
          </div>

          <button
            onClick={handleCopySchema}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-mono transition-all self-start sm:self-auto border border-stone-700"
          >
            {copiedSchema ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSchema ? 'Copied Payload!' : 'Copy Beckn JSON'}</span>
          </button>
        </div>

        {/* Code View */}
        <pre className="h-64 overflow-y-auto text-[11px] font-mono p-3 bg-black/60 rounded-xl text-emerald-300/90 border border-amber-950/80 leading-relaxed scrollbar-none">
          {JSON.stringify(becknPayload, null, 2)}
        </pre>
      </div>
    </div>
  );
};
