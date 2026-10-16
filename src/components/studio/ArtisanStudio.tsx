import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Tag, 
  ChevronRight, 
  Check 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, CraftSample, GeneratedListing } from '../../types';
import { SAMPLE_CRAFTS } from '../../data/mockData';
import { AIPipelineService, AIPipelineProgress } from '../../services/aiPipeline';
import { VoiceRecorder } from './VoiceRecorder';
import { PhotoProcessor } from './PhotoProcessor';
import { ConfidenceCoach } from './ConfidenceCoach';
import { PriceAdvisor } from './PriceAdvisor';

interface ArtisanStudioProps {
  language: Language;
  onNavigateToTab: (tabId: string) => void;
  onListingPublished?: (listing: GeneratedListing, craft: CraftSample) => void;
}

export const ArtisanStudio: React.FC<ArtisanStudioProps> = ({
  language,
  onNavigateToTab,
  onListingPublished,
}) => {
  const [selectedCraftId, setSelectedCraftId] = useState<string>('craft-1');
  const currentCraft = SAMPLE_CRAFTS.find((c) => c.id === selectedCraftId) || SAMPLE_CRAFTS[0];

  const [voiceTranscript, setVoiceTranscript] = useState<string>(currentCraft.regionalAudioText);
  const [isProcessingAI, setIsProcessingAI] = useState<boolean>(false);
  const [pipelineProgress, setPipelineProgress] = useState<AIPipelineProgress | null>(null);
  
  const [generatedListing, setGeneratedListing] = useState<GeneratedListing | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<'hi' | 'en'>('hi');
  const [isPublished, setIsPublished] = useState<boolean>(false);

  const handleGenerateListing = async () => {
    setIsProcessingAI(true);
    setIsPublished(false);
    try {
      const listing = await AIPipelineService.processCraftMedia(
        currentCraft,
        voiceTranscript,
        (progress) => setPipelineProgress(progress)
      );
      setGeneratedListing(listing);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessingAI(false);
    }
  };

  const handleCraftChange = (craftId: string) => {
    setSelectedCraftId(craftId);
    const craft = SAMPLE_CRAFTS.find((c) => c.id === craftId) || SAMPLE_CRAFTS[0];
    setVoiceTranscript(craft.regionalAudioText);
    setGeneratedListing(null);
    setIsPublished(false);
  };

  const handlePublish = () => {
    setIsPublished(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c2410c', '#166534', '#1c1917', '#e7e5e4'],
    });

    if (generatedListing && onListingPublished) {
      onListingPublished(generatedListing, currentCraft);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Studio Header & Artisan Heritage Strip */}
      <div className="bg-white border border-[#eae5dc] rounded-2xl p-6 shadow-[0_2px_12px_rgba(35,25,15,0.03)] text-stone-900 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fbf5ee] border border-[#f2e2d0] text-[#9c3e1e] text-xs font-semibold mb-2.5">
              <span>🏺</span>
              <span>CraftsConnect • Zero-Tech Vernacular Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
              Digitize Your Craft (अपनी हस्तकला को ऑनलाइन बेचें)
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mt-1.5 leading-relaxed">
              No technical skills needed. Snap a quick photo and speak in your mother tongue.
              CraftsConnect cleans the image, crafts SEO listings in Hindi & English, and benchmarks fair prices backed by live web data.
            </p>
          </div>

          <button
            onClick={handleGenerateListing}
            disabled={isProcessingAI}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold shadow-sm transition-all shrink-0 ${
              isProcessingAI
                ? 'bg-stone-200 text-stone-500 cursor-wait'
                : 'bg-stone-900 hover:bg-stone-800 text-amber-50 hover:scale-[1.01]'
            }`}
          >
            <Sparkles className={`w-4 h-4 text-amber-400 ${isProcessingAI ? 'animate-spin' : ''}`} />
            <span>{isProcessingAI ? 'AI Studio Processing...' : 'Generate Catalog & Fair Price'}</span>
          </button>
        </div>

        {/* Human Artisan Story Highlight Strip */}
        <div className="bg-[#fcfbf9] border border-[#eae5dc] rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
          <img
            src={currentCraft.artisanPhoto}
            alt={currentCraft.artisanName}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm shrink-0"
          />
          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="font-serif font-bold text-sm text-stone-900">
                {currentCraft.artisanName}
              </span>
              <span className="text-[10px] bg-[#f0f7f4] text-[#1b4d3e] font-semibold px-2 py-0.5 rounded-full border border-[#d6eae2]">
                {currentCraft.village}, {currentCraft.state}
              </span>
              <span className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full border border-stone-200 font-mono">
                {currentCraft.giTag.split('(')[0].trim()}
              </span>
            </div>
            <p className="text-xs text-stone-600 italic">
              "I know how to shape clay on the wheel, but mobile forms were intimidating. With CraftsConnect, I speak in my dialect, and my handicrafts reach buyers across India with 0% platform commission."
            </p>
          </div>
        </div>

        {/* Stepper Visualizer with Human Warmth */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#f2eee6] text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-[#b84a28] text-white font-bold flex items-center justify-center text-[11px] shadow-2xs">
              1
            </span>
            <div>
              <div className="font-semibold text-stone-900">Snap & Speak</div>
              <div className="text-[11px] text-stone-500">Workshop Photo + Vernacular Voice</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-[11px] ${
              generatedListing ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 border border-stone-200'
            }`}>
              2
            </span>
            <div>
              <div className="font-semibold text-stone-900">CraftsConnect Studio</div>
              <div className="text-[11px] text-stone-500">rembg Clean + Whisper + Bilingual SEO</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-[11px] ${
              isPublished ? 'bg-[#1b4d3e] text-white' : 'bg-stone-100 text-stone-500 border border-stone-200'
            }`}>
              3
            </span>
            <div>
              <div className="font-semibold text-stone-900">1-Tap ONDC Publish</div>
              <div className="text-[11px] text-stone-500">Live TinyFish Pricing + Direct Sale</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Progress Banner */}
      {isProcessingAI && pipelineProgress && (
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-stone-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-stone-900 animate-ping" />
              <span>{pipelineProgress.message}</span>
            </span>
            <span className="font-mono font-bold text-stone-900">
              {pipelineProgress.progressPercent}%
            </span>
          </div>
          <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-stone-900 rounded-full transition-all duration-300"
              style={{ width: `${pipelineProgress.progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Grid: Left = Media Capture, Right = AI Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN: Media Capture & Edge Pre-Processing */}
        <div className="space-y-6">
          <PhotoProcessor
            craft={currentCraft}
            onCraftChange={handleCraftChange}
            allCrafts={SAMPLE_CRAFTS}
          />

          <VoiceRecorder
            language={language}
            onTranscriptReady={(t) => setVoiceTranscript(t)}
            initialTranscript={currentCraft.regionalAudioText}
          />
        </div>

        {/* RIGHT COLUMN: AI Generation Output, Coach & Publishing */}
        <div className="space-y-6">
          {generatedListing ? (
            <>
              {/* Product Catalog Card */}
              <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      ONDC Catalog Ready
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                      {currentCraft.giTag.split('(')[0]}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                    <button
                      onClick={() => setActiveLangTab('hi')}
                      className={`px-2.5 py-0.5 rounded text-xs font-medium transition-all ${
                        activeLangTab === 'hi'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      हिंदी (Hindi)
                    </button>
                    <button
                      onClick={() => setActiveLangTab('en')}
                      className={`px-2.5 py-0.5 rounded text-xs font-medium transition-all ${
                        activeLangTab === 'en'
                          ? 'bg-white text-stone-900 shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                {/* Title & Descriptions */}
                <div className="space-y-2.5">
                  <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                    {activeLangTab === 'hi' ? generatedListing.titleHi : generatedListing.titleEn}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {activeLangTab === 'hi'
                      ? generatedListing.descriptionHi
                      : generatedListing.descriptionEn}
                  </p>

                  <div className="bg-[#fcfbf9] border-l-2 border-[#b84a28] p-3 rounded-r-lg text-xs text-stone-700 italic space-y-1">
                    <strong className="text-stone-900 not-italic font-semibold block">
                      Artisan Lineage & Craft Provenance:
                    </strong>
                    <p>{generatedListing.heritageStory}</p>
                    <div className="pt-1 flex items-center justify-between text-[11px] not-italic text-stone-500 border-t border-[#f0ece4]">
                      <span>Authentic Batch: <strong>#CC-{currentCraft.id.toUpperCase()}-2026</strong></span>
                      <span className="font-serif italic text-stone-800">✍️ Handcrafted by {currentCraft.artisanName}</span>
                    </div>
                  </div>

                  {/* Human Dignity & Direct Payout Notice */}
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#f0f7f4] border border-[#d6eae2] text-xs">
                    <span className="text-[#1b4d3e] font-medium flex items-center gap-1.5">
                      <span>🌿</span>
                      <span>100% of purchase goes directly to artisan bank account via ONDC</span>
                    </span>
                    <span className="font-bold text-[#1b4d3e] font-mono">0% Middleman Cut</span>
                  </div>

                  {/* SEO Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {generatedListing.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-[10px] text-stone-700"
                      >
                        <Tag className="w-2.5 h-2.5 text-stone-500" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Confidence Coach Module */}
              <ConfidenceCoach
                listing={generatedListing}
                onUpdateListing={(updated) => setGeneratedListing(updated)}
              />

              {/* Price Advisor Module */}
              <PriceAdvisor
                craft={currentCraft}
                currentPrice={generatedListing.suggestedPrice}
                onPriceChange={(newPrice) =>
                  setGeneratedListing({ ...generatedListing, suggestedPrice: newPrice })
                }
              />

              {/* Publish Action Card */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-stone-900 text-xs font-semibold mb-0.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Human-in-the-Loop Safeguard: Verified by Artisan</span>
                    </div>
                    <p className="text-xs text-stone-500">
                      Single tap distributes your verified catalog to ONDC (Paytm, Magicpin, Mystore) with 0% platform fee.
                    </p>
                  </div>

                  <button
                    onClick={handlePublish}
                    className={`shrink-0 w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all ${
                      isPublished
                        ? 'bg-emerald-700 text-white'
                        : 'bg-stone-900 hover:bg-stone-800 text-white hover:scale-[1.01]'
                    }`}
                  >
                    {isPublished ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Published to ONDC!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>List for Sale (बिक्री के लिए पोस्ट करें)</span>
                      </>
                    )}
                  </button>
                </div>

                {isPublished && (
                  <div className="pt-3 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-emerald-800 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Product Live on ONDC! Next actions:</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigateToTab('passport')}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-medium"
                      >
                        View Maker QR Passport
                      </button>
                      <button
                        onClick={() => onNavigateToTab('tinyfish')}
                        className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 text-xs font-medium"
                      >
                        Cross-Publish via TinyFish
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full min-h-[380px] bg-white border border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-600 flex items-center justify-center border border-stone-200 mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                AI Studio Ready for Input
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mt-1 leading-relaxed">
                Click <strong>"Generate Catalog & Price"</strong> to run background removal, Whisper transcription, Groq LLaMA 3 bilingual copy, and live market pricing.
              </p>
              <button
                onClick={handleGenerateListing}
                className="mt-4 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-sm transition-transform hover:scale-[1.01]"
              >
                Run AI Pipeline with Sample Craft
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
