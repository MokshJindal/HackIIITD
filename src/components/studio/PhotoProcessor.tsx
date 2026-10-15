import React, { useState } from 'react';
import { Camera, Sliders, Wand2, Layers, Check } from 'lucide-react';
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
  const [sliderPos, setSliderPos] = useState(50);
  const [activeBackground, setActiveBackground] = useState<'white' | 'sand' | 'transparent'>('white');
  const [showEdgeHighlights, setShowEdgeHighlights] = useState(false);

  const bgStyles = {
    white: 'bg-white',
    sand: 'bg-[#faf7f2]',
    transparent: 'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px] bg-stone-50',
  };

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center border border-stone-200">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-stone-900 font-serif">
              Computer Vision Studio (फोटो प्री-प्रोसेसिंग)
            </h4>
            <p className="text-xs text-stone-500">
              Auto-removes workshop clutter & prepares standard white e-commerce canvas
            </p>
          </div>
        </div>

        {/* Quick Craft Sample Switcher */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <span className="text-xs text-stone-500 font-medium">Craft Sample:</span>
          <select
            value={craft.id}
            onChange={(e) => onCraftChange(e.target.value)}
            className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-xs text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-stone-400 cursor-pointer"
          >
            {allCrafts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name.split(' ')[0]} - {c.category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Split-Screen / Comparison Viewport */}
      <div className="relative w-full h-72 sm:h-80 md:h-92 rounded-xl overflow-hidden border border-stone-200 shadow-inner select-none bg-stone-100 group">
        {/* Background Canvas Underlay */}
        <div className={`absolute inset-0 transition-colors duration-200 ${bgStyles[activeBackground]}`} />

        {/* Processed Studio Image */}
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <img
            src={craft.processedImage}
            alt="AI Studio Enhanced"
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.12)] transition-all"
          />
        </div>

        {/* Raw Image (Clipped by sliderPos) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <div className="absolute inset-0 bg-stone-900/10">
            <img
              src={craft.rawImage}
              alt="Raw Workshop Capture"
              className="w-full h-full object-cover filter contrast-95"
              style={{ width: '100%', height: '100%', objectPosition: 'center' }}
            />
          </div>
          {showEdgeHighlights && (
            <div className="absolute inset-0 border-r-2 border-emerald-500/80 bg-emerald-500/10" />
          )}
        </div>

        {/* Vertical Divider Line with Clean Drag Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)] cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-7 h-7 rounded-full bg-white text-stone-700 shadow-md flex items-center justify-center border border-stone-300 -ml-3.5">
            <Sliders className="w-3.5 h-3.5 rotate-90" />
          </div>
        </div>

        {/* Corner Badges */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold text-stone-700 uppercase tracking-wider border border-stone-200 pointer-events-none shadow-sm">
          Raw Workshop Photo
        </div>
        <div className="absolute top-3 right-3 bg-stone-900/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-semibold text-white uppercase tracking-wider pointer-events-none flex items-center gap-1 shadow-sm">
          <Wand2 className="w-3 h-3 text-orange-400" />
          <span>Clean Studio Canvas</span>
        </div>

        {/* Hidden Range Slider Overlay for Mouse/Touch scrub */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-10"
        />
      </div>

      {/* Studio Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
        <div className="flex items-center gap-2">
          <span className="text-stone-500 font-medium text-xs">Backdrop Canvas:</span>
          <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
            <button
              onClick={() => setActiveBackground('white')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                activeBackground === 'white'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Pure White
            </button>
            <button
              onClick={() => setActiveBackground('sand')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                activeBackground === 'sand'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Warm Sand
            </button>
            <button
              onClick={() => setActiveBackground('transparent')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                activeBackground === 'transparent'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Transparent
            </button>
          </div>
        </div>

        {/* Edge Mask Toggle */}
        <button
          onClick={() => setShowEdgeHighlights(!showEdgeHighlights)}
          className={`flex items-center gap-1 px-3 py-1 rounded-lg border transition-all text-xs font-medium ${
            showEdgeHighlights
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{showEdgeHighlights ? 'Edge Mask: Active' : 'Inspect Edge Mask'}</span>
        </button>
      </div>
    </div>
  );
};
