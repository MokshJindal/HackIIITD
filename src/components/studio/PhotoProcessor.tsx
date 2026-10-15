import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sliders, Check, Wand2, UploadCloud, Layers } from 'lucide-react';
import { CraftSample } from '../../types';

interface PhotoProcessorProps {
  craft: CraftSample;
  onCraftChange: (craftId: string) => void;
  allCrafts: CraftSample[];
}

export const PhotoProcessor: React.FC<PhotoProcessorProps> = ({
  craft,
  onCraftChange,
  allCrafts,
}) => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const [activeBackground, setActiveBackground] = useState<'white' | 'sand' | 'dark' | 'transparent'>('white');
  const [showEdgeHighlights, setShowEdgeHighlights] = useState(false);

  const bgStyles = {
    white: 'bg-white',
    sand: 'bg-[#faf6f0]',
    dark: 'bg-[#1e1b18]',
    transparent: 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:12px_12px] bg-slate-100',
  };

  return (
    <div className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-4 md:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-amber-100 font-serif">
              Computer Vision Studio (फोटो प्री-प्रोसेसिंग)
            </h4>
            <p className="text-[11px] text-amber-300/70">
              Auto-removes cluttered workshop backgrounds & applies standard white e-commerce canvas
            </p>
          </div>
        </div>

        {/* Quick Craft Sample Switcher */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-[11px] text-amber-400/80 font-medium">Craft Sample:</span>
          <select
            value={craft.id}
            onChange={(e) => onCraftChange(e.target.value)}
            className="bg-amber-900/60 border border-amber-700/60 rounded-lg px-2 py-1 text-xs text-amber-100 font-medium focus:outline-none cursor-pointer"
          >
            {allCrafts.map((c) => (
              <option key={c.id} value={c.id} className="bg-amber-950 text-amber-100">
                {c.name.split(' ')[0]} - {c.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Split-Screen / Comparison Viewport */}
      <div className="relative w-full h-72 sm:h-84 md:h-96 rounded-xl overflow-hidden border border-amber-800/50 shadow-2xl select-none group">
        {/* Background Canvas Underlay */}
        <div className={`absolute inset-0 transition-colors duration-300 ${bgStyles[activeBackground]}`} />

        {/* Processed Studio Image (Right side revealed by slider) */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <img
            src={craft.processedImage}
            alt="AI Studio Enhanced"
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.25)] transition-all"
          />
        </div>

        {/* Raw Image (Left side clipped by sliderPos) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="absolute inset-0 bg-stone-900/40">
            <img
              src={craft.rawImage}
              alt="Raw Workshop Photo"
              className="w-full h-full object-cover filter contrast-90"
              style={{ width: '100%', height: '100%', objectPosition: 'center' }}
            />
          </div>
          {/* Edge highlight simulation overlay if toggled */}
          {showEdgeHighlights && (
            <div className="absolute inset-0 border-r-2 border-emerald-400/80 bg-emerald-500/10" />
          )}
        </div>

        {/* Vertical Divider Line with Drag Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize flex items-center justify-center"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-white text-stone-900 shadow-xl flex items-center justify-center border-2 border-amber-600 -ml-4">
            <Sliders className="w-4 h-4 rotate-90" />
          </div>
        </div>

        {/* Labels on corners */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold text-amber-300 uppercase tracking-wider border border-white/10 pointer-events-none">
          Raw Workshop Photo
        </div>
        <div className="absolute top-3 right-3 bg-amber-600/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold text-white uppercase tracking-wider border border-amber-400/40 pointer-events-none flex items-center gap-1">
          <Wand2 className="w-3 h-3" />
          <span>rembg Clean Studio</span>
        </div>

        {/* Range Slider Overlay to allow drag/scrub */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
        />
      </div>

      {/* Studio Controls & Background Switcher */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-amber-300 font-medium text-[11px]">Studio Backdrop:</span>
          <div className="flex items-center gap-1.5 bg-amber-900/30 p-1 rounded-lg border border-amber-700/40">
            <button
              onClick={() => setActiveBackground('white')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                activeBackground === 'white'
                  ? 'bg-white text-stone-900 shadow'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              Pure White
            </button>
            <button
              onClick={() => setActiveBackground('sand')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                activeBackground === 'sand'
                  ? 'bg-[#faf6f0] text-amber-950 shadow'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              Warm Sand
            </button>
            <button
              onClick={() => setActiveBackground('transparent')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                activeBackground === 'transparent'
                  ? 'bg-slate-200 text-stone-900 shadow'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              Transparent PNG
            </button>
          </div>
        </div>

        {/* Edge Detection Toggle */}
        <button
          onClick={() => setShowEdgeHighlights(!showEdgeHighlights)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all text-[11px] ${
            showEdgeHighlights
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
              : 'bg-amber-900/30 border-amber-700/40 text-amber-300 hover:bg-amber-800/40'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{showEdgeHighlights ? 'OpenCV Edge Mask: Active' : 'Inspect Edge Mask'}</span>
        </button>
      </div>
    </div>
  );
};
