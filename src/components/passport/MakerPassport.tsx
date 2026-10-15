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
  CheckCircle2, 
  HelpCircle
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

  useEffect(() => {
    const passportUrl = `https://kalasetu.in/verify/${craft.id}?artisan=${encodeURIComponent(craft.artisanName)}`;
    QRCode.toDataURL(passportUrl, {
      width: 240,
      margin: 1.5,
      color: {
        dark: '#1c1917',
        light: '#ffffff',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));
  }, [craft]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm text-stone-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Digital Authenticity & Provenance Passport</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
              "Meet the Maker" & GI Traceability Passport
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Guarantees zero factory counterfeits. Every piece receives a unique verifiable QR code linking physical craft to the artisan's personal story, verified village origin, and care guide.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto bg-stone-50 p-1.5 rounded-xl border border-stone-200">
            <span className="text-xs text-stone-600 font-medium">Select Craft:</span>
            <select
              value={craft.id}
              onChange={(e) => setSelectedCraftId(e.target.value)}
              className="bg-white text-stone-900 text-xs font-medium rounded-lg px-2.5 py-1 border border-stone-200 focus:outline-none cursor-pointer"
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

      {/* Main Grid: Left = Public Passport, Right = Printable Sticker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Public Passport Certificate */}
        <div className="lg:col-span-8 bg-white border border-stone-200/90 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Handcrafted in India</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200 text-xs font-mono">
                Cert ID: #KALA-{craft.id.toUpperCase()}-7721
              </span>
            </div>

            <span className="text-xs text-stone-500 font-mono">
              GI Registry: {craft.giTag}
            </span>
          </div>

          {/* Artisan Profile & Origin */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img
              src={craft.artisanPhoto}
              alt={craft.artisanName}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border border-stone-200 shadow-sm"
            />
            <div className="text-center sm:text-left space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-orange-800 font-semibold">
                Master Craftsperson
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                {craft.artisanName}
              </h2>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-stone-600">
                <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span>
                  Village of {craft.village}, {craft.state}
                </span>
              </div>
              <p className="text-xs text-stone-600 max-w-lg leading-relaxed pt-1">
                4th generation traditional artisan carrying forward the heritage of {craft.category}. Every single piece is shaped without industrial machinery.
              </p>
            </div>
          </div>

          {/* Process Clip */}
          <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden border border-stone-200 shadow-inner bg-stone-900 group">
            <img
              src={craft.rawImage}
              alt="Artisan at work"
              className="w-full h-full object-cover filter brightness-85 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 flex flex-col justify-between p-4">
              <span className="self-start bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono font-medium text-white border border-white/10">
                Workshop Footage
              </span>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-serif font-bold text-white">
                    Watch {craft.artisanName} craft this piece
                  </h4>
                  <p className="text-xs text-stone-300">
                    Hand-thrown on traditional wheel, sun-dried, and wood kiln fired
                  </p>
                </div>

                <button
                  onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  className="w-11 h-11 rounded-full bg-white text-stone-900 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Craft Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl space-y-1">
              <span className="text-stone-500 text-[11px] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-stone-600" />
                <span>Production Time</span>
              </span>
              <strong className="text-stone-900 font-mono text-sm block">
                {craft.productionDays} Days
              </strong>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl space-y-1">
              <span className="text-stone-500 text-[11px] flex items-center gap-1">
                <Hammer className="w-3.5 h-3.5 text-stone-600" />
                <span>Natural Materials</span>
              </span>
              <strong className="text-stone-900 text-xs block truncate">
                {craft.material.split(',')[0]}
              </strong>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl space-y-1">
              <span className="text-stone-500 text-[11px] flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                <span>Carbon Saved</span>
              </span>
              <strong className="text-emerald-800 font-mono text-sm block">
                {craft.esgMetrics.co2SavedKg} kg CO₂
              </strong>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-3 rounded-xl space-y-1">
              <span className="text-stone-500 text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-600" />
                <span>Electricity</span>
              </span>
              <strong className="text-stone-900 font-mono text-sm block">
                0% (Handloom/Wheel)
              </strong>
            </div>
          </div>

          {/* Care & Custom Work */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-2">
            <h4 className="font-semibold text-stone-900 text-xs">
              Heritage Care & Preservation Guide:
            </h4>
            <p className="text-stone-600 leading-relaxed text-xs">
              Clean gently using a dry soft cloth. Avoid harsh chemical detergents or dishwasher soaking. Natural clay matures gracefully with time.
            </p>
            <div className="pt-1">
              <button
                onClick={() => setRepairModalOpen(true)}
                className="text-xs font-semibold text-orange-800 hover:text-orange-900 underline flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Need Repair or Custom Commission from {craft.artisanName}?</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Printable Sticker */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white text-stone-900 rounded-2xl p-6 shadow-sm border border-stone-200 text-center space-y-4">
            <div className="border-b border-stone-200 pb-3">
              <div className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
                Packaging Authenticity Seal
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 mt-0.5">
                KalaSetu Verified Seal
              </h3>
              <p className="text-xs text-stone-500">
                Scan with any phone camera to meet the maker
              </p>
            </div>

            <div className="flex justify-center p-3 bg-stone-50 rounded-xl border border-stone-200">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Maker Passport QR"
                  className="w-44 h-44 object-contain"
                />
              ) : (
                <div className="w-44 h-44 flex items-center justify-center text-stone-400">
                  <QrCode className="w-14 h-14 animate-pulse" />
                </div>
              )}
            </div>

            <div className="text-xs space-y-1">
              <div className="font-bold text-stone-900 text-sm">{craft.name}</div>
              <div className="text-stone-600">Crafted by: <strong>{craft.artisanName}</strong></div>
              <div className="text-[11px] font-mono text-stone-700 bg-stone-100 py-1 rounded border border-stone-200">
                {craft.giTag}
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Packaging Sticker (2×3")</span>
            </button>
          </div>
        </div>
      </div>

      {/* Repair Modal */}
      {repairModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 max-w-md w-full text-stone-900 space-y-4 shadow-xl">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Request Repair or Custom Work
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Your inquiry will be translated and relayed to <strong>{craft.artisanName}</strong> via voice note in their native dialect.
            </p>

            {repairSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-7 h-7 text-emerald-700 mx-auto" />
                <div className="font-bold text-emerald-900 text-sm">
                  Request Relayed to Artisan!
                </div>
                <p className="text-xs text-emerald-800">
                  You will receive an audio update directly from the artisan's cluster coordinator.
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
                  <label className="block text-stone-700 mb-1 font-medium">Your Name & Phone:</label>
                  <input
                    type="text"
                    placeholder="e.g. Aditi Sharma (+91 98765 43210)"
                    className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 mb-1 font-medium">Nature of Request:</label>
                  <textarea
                    rows={3}
                    placeholder="Describe custom dimension or repair needed..."
                    className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setRepairModalOpen(false)}
                    className="flex-1 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setRepairSubmitted(true)}
                    className="flex-1 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold"
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
