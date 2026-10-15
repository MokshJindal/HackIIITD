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
      {/* Studio Header & Workflow Stepper */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm text-stone-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-700" />
              <span>Voice & Computer Vision Onboarding Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
              Digitize Your Craft (अपनी हस्तकला को ऑनलाइन बेचें)
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              No technical skills needed. Capture a photo and record your voice in your mother tongue.
              Our AI Studio cleans the photo, writes bilingual listings, and suggests fair market prices.
            </p>
          </div>

          <button
            onClick={handleGenerateListing}
            disabled={isProcessingAI}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold shadow-sm transition-all ${
              isProcessingAI
                ? 'bg-stone-200 text-stone-500 cursor-wait'
                : 'bg-stone-900 hover:bg-stone-800 text-white hover:scale-[1.01]'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${isProcessingAI ? 'animate-spin' : ''}`} />
            <span>{isProcessingAI ? 'AI Studio Processing...' : 'Generate Catalog & Price'}</span>
          </button>
        </div>

        {/* Stepper Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-stone-100 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-stone-900 text-white font-bold flex items-center justify-center text-[11px]">
              1
            </span>
            <div>
              <div className="font-semibold text-stone-900">Media Capture</div>
              <div className="text-[11px] text-stone-500">Photo + Vernacular Voice</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-[11px] ${
              generatedListing ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 border border-stone-200'
            }`}>
              2
            </span>
            <div>
              <div className="font-semibold text-stone-900">AI Studio Pipeline</div>
              <div className="text-[11px] text-stone-500">rembg + Whisper + Groq SEO</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-[11px] ${
              isPublished ? 'bg-emerald-700 text-white' : 'bg-stone-100 text-stone-500 border border-stone-200'
            }`}>
              3
            </span>
            <div>
              <div className="font-semibold text-stone-900">Review & Publish</div>
              <div className="text-[11px] text-stone-500">TinyFish Pricing + ONDC Push</div>
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

                  <div className="bg-stone-50 border-l-2 border-stone-800 p-3 rounded-r-lg text-xs text-stone-600 italic">
                    <strong className="text-stone-900 not-italic font-semibold block mb-0.5">
                      Artisan Lineage & Craft Provenance:
                    </strong>
                    {generatedListing.heritageStory}
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
