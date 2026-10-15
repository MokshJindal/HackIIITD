import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { 
  ShieldCheck, 
  MapPin, 
  QrCode, 
  Printer, 
  Play, 
  Clock, 
  Hammer, 
  Leaf, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle,
  Share2,
  Download
} from 'lucide-react';
import { SAMPLE_CRAFTS } from '../../data/mockData';
import { CraftSample } from '../../types';

export const MakerPassport: React.FC = () => {
  const [selectedCraftId, setSelectedCraftId] = useState<string>('craft-1');
  const craft: CraftSample = SAMPLE_CRAFTS.find(c => c.id === selectedCraftId) || SAMPLE_CRAFTS[0];

  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [repairModalOpen, setRepairModalOpen] = useState<boolean>(false);
  const [repairSubmitted, setRepairSubmitted] = useState<boolean>(false);

  // Generate dynamic QR code for the public passport verification URL
  useEffect(() => {
    const passportUrl = `https://kalasetu.in/verify/${craft.id}?artisan=${encodeURIComponent(craft.artisanName)}`;
    QRCode.toDataURL(passportUrl, {
      width: 240,
      margin: 1.5,
      color: {
        dark: '#2c1d11',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));
  }, [craft]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-[#3a2012] to-amber-950 border border-amber-800/40 rounded-2xl p-6 text-amber-50 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-300 text-xs font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Digital Authenticity & Provenance Passport</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              "Meet the Maker" & GI Traceability Passport
            </h1>
            <p className="text-amber-200/80 text-xs sm:text-sm max-w-2xl mt-1">
              Guarantees zero factory counterfeits. Every piece receives a unique verifiable QR code linking physical craft to the artisan's personal story, verified village origin, and care guide.
            </p>
          </div>

          {/* Craft Switcher */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-amber-900/40 p-1.5 rounded-xl border border-amber-700/50">
            <span className="text-xs text-amber-300 font-medium">Select Craft:</span>
            <select
              value={craft.id}
              onChange={(e) => setSelectedCraftId(e.target.value)}
              className="bg-amber-950 text-amber-100 text-xs font-medium rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
            >
              {SAMPLE_CRAFTS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name.split(' ')[0]} ({c.artisanName})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = Public Passport Certificate, Right = Printable QR Packaging Sticker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Public Passport Certificate (What the buyer sees when scanning) */}
        <div className="lg:col-span-8 bg-amber-950/20 border-2 border-amber-800/50 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Subtle Watermark Stamp */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border-4 border-amber-600/10 flex items-center justify-center rotate-12 pointer-events-none">
            <span className="text-amber-500/10 font-serif font-black text-4xl uppercase">
              Authentic
            </span>
          </div>

          {/* Top Verification Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-amber-800/40">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 text-xs font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Verified Handmade in India</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-900/60 text-amber-300 border border-amber-600/40 text-xs font-mono font-semibold">
                Cert ID: #KALA-{craft.id.toUpperCase()}-7721
              </span>
            </div>

            <span className="text-xs text-amber-400/80 font-mono">
              GI Registry: {craft.giTag}
            </span>
          </div>

          {/* Artisan Profile & Origin Map */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img
              src={craft.artisanPhoto}
              alt={craft.artisanName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-amber-500/60 shadow-xl"
            />
            <div className="text-center sm:text-left space-y-1.5">
              <div className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                Master Craftsperson
              </div>
              <h2 className="text-2xl font-serif font-bold text-amber-100">
                {craft.artisanName}
              </h2>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-amber-300">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span>
                  Village of {craft.village}, {craft.state}
                </span>
              </div>
              <p className="text-xs text-amber-200/80 max-w-lg leading-relaxed pt-1">
                4th generation traditional artisan carrying forward the authentic craft heritage of {craft.category}. Every single unit is handcrafted without industrial machinery.
              </p>
            </div>
          </div>

          {/* 10-Second Process Video Mockup */}
          <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden border border-amber-800/50 shadow-2xl bg-black group">
            <img
              src={craft.rawImage}
              alt="Artisan at work"
              className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4">
              <span className="self-start bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono font-semibold text-amber-300 border border-white/10">
                Craft Workshop In-Action Clip
              </span>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-serif font-bold text-white">
                    Watch {craft.artisanName} craft this piece
                  </h4>
                  <p className="text-[11px] text-amber-300/80">
                    Hand-thrown on traditional wheel, sun-dried, and wood fired
                  </p>
                </div>

                <button
                  onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  className="w-12 h-12 rounded-full bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Craft Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-amber-900/20 border border-amber-800/30 p-3 rounded-xl space-y-1">
              <span className="text-amber-400/80 text-[11px] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>Making Time</span>
              </span>
              <strong className="text-amber-100 font-mono text-sm block">
                {craft.productionDays} Days
              </strong>
            </div>

            <div className="bg-amber-900/20 border border-amber-800/30 p-3 rounded-xl space-y-1">
              <span className="text-amber-400/80 text-[11px] flex items-center gap-1">
                <Hammer className="w-3.5 h-3.5 text-orange-400" />
                <span>Materials</span>
              </span>
              <strong className="text-amber-100 text-[11px] block truncate">
                {craft.material.split(',')[0]}
              </strong>
            </div>

            <div className="bg-amber-900/20 border border-amber-800/30 p-3 rounded-xl space-y-1">
              <span className="text-amber-400/80 text-[11px] flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>Carbon Saved</span>
              </span>
              <strong className="text-emerald-400 font-mono text-sm block">
                {craft.esgMetrics.co2SavedKg} kg CO₂
              </strong>
            </div>

            <div className="bg-amber-900/20 border border-amber-800/30 p-3 rounded-xl space-y-1">
              <span className="text-amber-400/80 text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Electricity Used</span>
              </span>
              <strong className="text-amber-100 font-mono text-sm block">
                0% (Handloom/Wheel)
              </strong>
            </div>
          </div>

          {/* Care Instructions & Repair Link */}
          <div className="bg-amber-900/15 border border-amber-800/30 rounded-xl p-4 text-xs space-y-2">
            <h4 className="font-semibold text-amber-200 text-xs">
              Heritage Care & Preservation Guide:
            </h4>
            <p className="text-amber-200/80 text-[11px] leading-relaxed">
              Clean gently using a dry soft cloth. Avoid harsh chemical detergents or dishwasher soaking. As a living natural terracotta piece, subtle color aging enhances its rustic charm.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setRepairModalOpen(true)}
                className="text-[11px] font-semibold text-amber-400 hover:text-amber-200 underline flex items-center gap-1"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Need Repair or Custom Commission from {craft.artisanName}?</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Printable Physical Packaging Sticker / QR Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white text-stone-900 rounded-3xl p-6 shadow-2xl border-4 border-amber-800/30 text-center space-y-4">
            <div className="border-b-2 border-stone-200 pb-3">
              <div className="text-[10px] uppercase font-bold tracking-widest text-amber-700">
                Official Authenticity Sticker
              </div>
              <h3 className="font-serif font-black text-xl text-stone-900 leading-tight">
                KalaSetu Authenticity Seal
              </h3>
              <p className="text-[11px] text-stone-500 font-medium">
                Scan with any phone camera to meet the maker
              </p>
            </div>

            {/* Generated QR Code Image */}
            <div className="flex justify-center p-3 bg-stone-50 rounded-2xl border border-stone-200">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Maker Passport QR"
                  className="w-48 h-48 object-contain"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center text-stone-400">
                  <QrCode className="w-16 h-16 animate-pulse" />
                </div>
              )}
            </div>

            {/* Artisan Credential on Sticker */}
            <div className="text-xs space-y-1">
              <div className="font-bold text-stone-800 text-sm">{craft.name}</div>
              <div className="text-stone-600 text-[11px]">Crafted by: <strong>{craft.artisanName}</strong></div>
              <div className="text-[10px] font-mono text-amber-800 font-bold bg-amber-50 py-1 rounded border border-amber-200">
                {craft.giTag}
              </div>
            </div>

            {/* Print Sticker Button */}
            <button
              onClick={() => window.print()}
              className="w-full py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>Print Packaging Sticker (2×3")</span>
            </button>
          </div>
        </div>
      </div>

      {/* Repair / Commission Modal */}
      {repairModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e1712] border border-amber-700/60 rounded-2xl p-6 max-w-md w-full text-amber-50 space-y-4 shadow-2xl">
            <h3 className="font-serif font-bold text-lg text-amber-100">
              Request Repair or Custom Work
            </h3>
            <p className="text-xs text-amber-200/80 leading-relaxed">
              Traditional crafts can be restored by the master maker. Your message will be translated and relayed to <strong>{craft.artisanName}</strong> via voice note.
            </p>

            {repairSubmitted ? (
              <div className="p-4 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-emerald-200 text-sm">
                  Request Relayed to Artisan!
                </div>
                <p className="text-xs text-emerald-300/80">
                  You will receive a WhatsApp audio reply directly from the artisan's cluster coordinator.
                </p>
                <button
                  onClick={() => {
                    setRepairModalOpen(false);
                    setRepairSubmitted(false);
                  }}
                  className="mt-2 px-4 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-amber-300 mb-1">Your Name & Phone:</label>
                  <input
                    type="text"
                    placeholder="e.g. Aditi Sharma (+91 98765 43210)"
                    className="w-full p-2.5 rounded-lg bg-amber-950/80 border border-amber-800/80 text-amber-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-amber-300 mb-1">Nature of Request:</label>
                  <textarea
                    rows={3}
                    placeholder="Describe custom dimension or hairline crack repair needed..."
                    className="w-full p-2.5 rounded-lg bg-amber-950/80 border border-amber-800/80 text-amber-100 focus:outline-none"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setRepairModalOpen(false)}
                    className="flex-1 py-2 rounded-lg bg-stone-800 text-stone-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setRepairSubmitted(true)}
                    className="flex-1 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold"
                  >
                    Send to Artisan
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
