import React, { useState } from 'react';
import { 
  Globe, 
  Share2, 
  CheckCircle2, 
  Copy, 
  Code2, 
  Zap, 
  ArrowRight
} from 'lucide-react';

export const ONDCGateway: React.FC = () => {
  const [copiedSchema, setCopiedSchema] = useState(false);

  const buyerApps = [
    {
      name: 'Paytm ONDC Store',
      tagline: 'Consumer Payments & Commerce',
      users: '300M+ Active Users',
      badge: 'Active & Indexed',
    },
    {
      name: 'PhonePe Pincode',
      tagline: 'Hyperlocal & Regional Commerce',
      users: '100M+ App Installs',
      badge: 'Active & Indexed',
    },
    {
      name: 'Magicpin ONDC Node',
      tagline: 'Lifestyle & Gifting Discovery',
      users: '10M+ Urban Shoppers',
      badge: 'Active & Indexed',
    },
    {
      name: 'Mystore Seller SNP',
      tagline: 'ONDC Core Seller Network Participant',
      users: 'Full Network Gateway',
      badge: 'BPP Provider Node',
    },
  ];

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
      city: 'std:0551',
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
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm text-stone-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium mb-2">
              <Globe className="w-3.5 h-3.5 text-stone-700" />
              <span>Digital Public Infrastructure (DPI) Hook</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
              One-Tap ONDC Multi-App Distribution
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Connecting traditional artisans directly to India's Open Network for Digital Commerce via Seller Network Participants (SNP), eliminating 15–30% private marketplace commissions.
            </p>
          </div>

          {/* 0% Commission Badge */}
          <div className="bg-amber-50 border border-amber-200/90 px-4 py-2.5 rounded-xl flex items-center gap-2.5 text-amber-950 self-start md:self-auto shadow-2xs">
            <Zap className="w-5 h-5 text-amber-700 fill-current" />
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-amber-700 leading-none">
                Zero Platform Commission
              </div>
              <div className="text-base font-bold font-mono leading-tight text-amber-950">
                0% Fee via ONDC
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Architecture Flowchart */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-sm font-semibold text-stone-900 font-serif flex items-center gap-2">
          <Share2 className="w-4 h-4 text-stone-700" />
          <span>One Single Voice/Photo Upload Branches Out to 5+ National Buyer Apps</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center text-xs text-center">
          <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl space-y-1">
            <div className="w-7 h-7 rounded-full bg-stone-900 text-white mx-auto flex items-center justify-center font-bold text-xs">
              1
            </div>
            <div className="font-bold text-stone-900">Artisan Studio</div>
            <p className="text-stone-500 text-[11px]">Voice Note + Photo Upload</p>
          </div>

          <div className="hidden md:flex justify-center text-stone-400">
            <ArrowRight className="w-5 h-5" />
          </div>

          <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl space-y-1">
            <div className="w-7 h-7 rounded-full bg-stone-900 text-white mx-auto flex items-center justify-center font-bold text-xs">
              2
            </div>
            <div className="font-bold text-stone-900">KalaSetu SNP Adapter</div>
            <p className="text-stone-500 text-[11px]">Beckn Protocol & GI Validation</p>
          </div>

          <div className="hidden md:flex justify-center text-stone-400">
            <ArrowRight className="w-5 h-5" />
          </div>

          <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl space-y-1">
            <div className="w-7 h-7 rounded-full bg-stone-900 text-white mx-auto flex items-center justify-center font-bold text-xs">
              3
            </div>
            <div className="font-bold text-stone-900">ONDC Registry</div>
            <p className="text-stone-500 text-[11px]">Simultaneous Broadcast</p>
          </div>
        </div>

        {/* Buyer Apps Grid */}
        <div className="pt-4 border-t border-stone-100">
          <span className="text-xs font-semibold text-stone-700 block mb-3">
            Real-Time Searchable on Consumer Buyer Apps:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {buyerApps.map((app, idx) => (
              <div
                key={idx}
                className="bg-stone-50 border border-stone-200/80 p-3.5 rounded-xl text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">{app.name}</span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-1.5 py-0.2 rounded border border-emerald-200">
                    {app.badge}
                  </span>
                </div>
                <div className="text-stone-500 text-[11px]">{app.tagline}</div>
                <div className="text-[10px] text-stone-600 font-mono font-medium">
                  {app.users}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Beckn Protocol Schema View */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-stone-700" />
            <div>
              <h3 className="font-mono text-sm font-bold text-stone-900">
                Beckn Protocol Retail v1.2 (JSON-LD Payload)
              </h3>
              <p className="text-xs text-stone-500">
                Standard compliance with ONDC seller network participant specifications
              </p>
            </div>
          </div>

          <button
            onClick={handleCopySchema}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-mono transition-colors border border-stone-200"
          >
            {copiedSchema ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSchema ? 'Copied Payload!' : 'Copy Beckn JSON'}</span>
          </button>
        </div>

        <pre className="h-64 overflow-y-auto text-xs font-mono p-3.5 bg-stone-900 rounded-xl text-stone-200 border border-stone-800 leading-relaxed scrollbar-none">
          {JSON.stringify(becknPayload, null, 2)}
        </pre>
      </div>
    </div>
  );
};
