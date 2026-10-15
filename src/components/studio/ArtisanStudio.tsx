import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Layers, 
  FileText, 
  Globe2, 
  ChevronRight, 
  RotateCcw, 
  Share2, 
  Check, 
  ArrowRight,
  ShieldCheck,
  Tag
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

  // Run AI processing pipeline
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

  // Switch craft sample
  const handleCraftChange = (craftId: string) => {
    setSelectedCraftId(craftId);
    const craft = SAMPLE_CRAFTS.find((c) => c.id === craftId) || SAMPLE_CRAFTS[0];
    setVoiceTranscript(craft.regionalAudioText);
    setGeneratedListing(null);
    setIsPublished(false);
  };

  // Single-Tap List for Sale
  const handlePublish = () => {
    setIsPublished(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#ea580c', '#10b981', '#ffffff'],
    });

    if (generatedListing && onListingPublished) {
      onListingPublished(generatedListing, currentCraft);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Studio Header & Workflow Stepper */}
      <div className="bg-gradient-to-r from-amber-950 via-[#3a2012] to-amber-950 border border-amber-800/50 rounded-2xl p-6 shadow-2xl text-amber-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/80 border border-orange-500/40 text-orange-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step-by-Step Artisan Onboarding Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
              Digitize Your Craft (अपनी हस्तकला को ऑनलाइन बेचें)
            </h1>
            <p className="text-amber-200/80 text-xs sm:text-sm max-w-2xl mt-1">
              No technical skills needed. Simply capture a photo and record your voice in your mother tongue.
              Our AI Studio cleans the photo, writes bilingual SEO listings, and fetches live market prices.
            </p>
          </div>

          {/* Action to trigger AI pipeline */}
          <button
            onClick={handleGenerateListing}
            disabled={isProcessingAI}
            className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold shadow-xl transition-all duration-300 ${
              isProcessingAI
                ? 'bg-amber-800 text-amber-300 cursor-wait'
                : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-bold hover:scale-[1.02] shadow-orange-950/50'
            }`}
          >
            <Sparkles className={`w-5 h-5 ${isProcessingAI ? 'animate-spin' : ''}`} />
            <span>{isProcessingAI ? 'AI Studio Processing...' : 'Generate Catalog & Price'}</span>
          </button>
        </div>

        {/* Stepper Visualizer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-amber-800/40 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-[11px]">
              1
            </span>
            <div>
              <div className="font-semibold text-amber-200">Media Capture & Audio</div>
              <div className="text-[10px] text-amber-400/70">Photo + Vernacular Voice Note</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-[11px] ${
              generatedListing ? 'bg-amber-600 text-white' : 'bg-amber-900/60 text-amber-400'
            }`}>
              2
            </span>
            <div>
              <div className="font-semibold text-amber-200">AI Studio & NLP Engine</div>
              <div className="text-[10px] text-amber-400/70">rembg + Whisper + Groq LLaMA 3</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-[11px] ${
              isPublished ? 'bg-emerald-600 text-white' : 'bg-amber-900/60 text-amber-400'
            }`}>
              3
            </span>
            <div>
              <div className="font-semibold text-amber-200">Review & One-Tap Publish</div>
              <div className="text-[10px] text-amber-400/70">TinyFish Pricing + ONDC Push</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Pipeline Processing Overlay/Progress Banner */}
      {isProcessingAI && pipelineProgress && (
        <div className="bg-amber-900/40 border-2 border-amber-500/60 rounded-2xl p-5 shadow-2xl animate-pulse">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-amber-200 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span>{pipelineProgress.message}</span>
            </span>
            <span className="font-mono font-bold text-amber-300">
              {pipelineProgress.progressPercent}%
            </span>
          </div>
          <div className="h-2.5 bg-amber-950 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300"
              style={{ width: `${pipelineProgress.progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Grid: Left = Media Capture, Right = AI Output & Review */}
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
              {/* Product Catalog Card Preview */}
              <div className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-5 shadow-xl">
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-amber-800/40">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      ONDC Catalog Ready
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950 text-amber-300 border border-amber-500/40">
                      {currentCraft.giTag.split('(')[0]}
                    </span>
                  </div>

                  {/* Language Toggle for Catalog */}
                  <div className="flex items-center gap-1 bg-amber-900/40 p-0.5 rounded-lg border border-amber-700/50">
                    <button
                      onClick={() => setActiveLangTab('hi')}
                      className={`px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${
                        activeLangTab === 'hi'
                          ? 'bg-amber-600 text-white'
                          : 'text-amber-300 hover:text-white'
                      }`}
                    >
                      हिंदी (Hindi)
                    </button>
                    <button
                      onClick={() => setActiveLangTab('en')}
                      className={`px-2.5 py-0.5 rounded text-xs font-semibold transition-all ${
                        activeLangTab === 'en'
                          ? 'bg-amber-600 text-white'
                          : 'text-amber-300 hover:text-white'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>

                {/* Generated Title & Story */}
                <div className="space-y-3">
                  <h3 className="text-lg font-serif font-bold text-amber-100 leading-snug">
                    {activeLangTab === 'hi' ? generatedListing.titleHi : generatedListing.titleEn}
                  </h3>

                  <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
                    {activeLangTab === 'hi'
                      ? generatedListing.descriptionHi
                      : generatedListing.descriptionEn}
                  </p>

                  {/* Heritage Story Callout */}
                  <div className="bg-amber-900/30 border-l-2 border-orange-500 p-2.5 rounded-r-lg text-[11px] text-amber-200/80 italic">
                    <strong className="text-amber-300 not-italic font-semibold block mb-0.5">
                      Artisan Lineage & Craft Provenance:
                    </strong>
                    {generatedListing.heritageStory}
                  </div>

                  {/* SEO Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {generatedListing.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-900/30 border border-amber-700/40 text-[10px] text-amber-300"
                      >
                        <Tag className="w-2.5 h-2.5 text-amber-400" />
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

              {/* Human-In-The-Loop Approval & Single-Tap Publish Button */}
              <div className="bg-gradient-to-r from-amber-950 via-amber-900/40 to-amber-950 border-2 border-amber-600/60 rounded-2xl p-5 shadow-2xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold mb-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Human-in-the-Loop Safeguard: Verified by Artisan</span>
                    </div>
                    <p className="text-[11px] text-amber-200/80">
                      Single tap distributes your verified catalog to ONDC (Paytm, Magicpin, Mystore) and prepares draft on GeM.
                    </p>
                  </div>

                  <button
                    onClick={handlePublish}
                    className={`shrink-0 w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all duration-300 ${
                      isPublished
                        ? 'bg-emerald-600 text-white shadow-emerald-950/50'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white hover:scale-105'
                    }`}
                  >
                    {isPublished ? (
                      <>
                        <Check className="w-5 h-5 text-emerald-200" />
                        <span>Published to ONDC!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>List for Sale (बिक्री के लिए पोस्ट करें)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Post-Publish Next Action Quick Links */}
                {isPublished && (
                  <div className="mt-4 pt-4 border-t border-amber-800/40 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-emerald-300 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Product Live on ONDC Registry! Explore Next:</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onNavigateToTab('passport')}
                        className="px-3 py-1 rounded-lg bg-amber-800/40 hover:bg-amber-700/60 text-amber-200 border border-amber-600/40 flex items-center gap-1 text-[11px]"
                      >
                        <span>View Maker QR Passport</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onNavigateToTab('tinyfish')}
                        className="px-3 py-1 rounded-lg bg-orange-800/40 hover:bg-orange-700/60 text-orange-200 border border-orange-600/40 flex items-center gap-1 text-[11px]"
                      >
                        <span>Cross-Publish via TinyFish</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Empty State Guidance */
            <div className="h-full min-h-[380px] bg-amber-950/15 border-2 border-dashed border-amber-800/40 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-900/30 text-amber-400 flex items-center justify-center border border-amber-700/40 mb-4 shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif font-bold text-amber-100">
                AI Studio Ready for Input
              </h3>
              <p className="text-xs text-amber-300/80 max-w-sm mt-1.5 leading-relaxed">
                Click <strong>"Generate Catalog & Price"</strong> at the top to run the background removal, Whisper dialect transcription, Groq LLaMA 3 bilingual listing, and TinyFish live pricing.
              </p>
              <button
                onClick={handleGenerateListing}
                className="mt-5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-lg transition-transform hover:scale-105"
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
