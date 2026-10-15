import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Terminal, 
  ExternalLink, 
  FileCheck, 
  Calendar, 
  Award, 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  Play
} from 'lucide-react';
import { TinyFishService } from '../../services/tinyfish';
import { TinyFishAgentTask, GovScheme, CraftExhibition, B2BTender } from '../../types';
import { MOCK_GOV_SCHEMES, MOCK_EXHIBITIONS, MOCK_B2B_TENDERS } from '../../data/mockData';

export const TinyFishHub: React.FC = () => {
  const [subTab, setSubTab] = useState<'agent' | 'schemes' | 'tenders'>('agent');

  // Agent State
  const [selectedPortal, setSelectedPortal] = useState<'GeM' | 'Etsy' | 'Amazon Karigar'>('GeM');
  const [agentRunning, setAgentRunning] = useState<boolean>(false);
  const [agentTask, setAgentTask] = useState<TinyFishAgentTask | null>(null);

  // Schemes State
  const [schemes] = useState<GovScheme[]>(MOCK_GOV_SCHEMES);
  const [exhibitions] = useState<CraftExhibition[]>(MOCK_EXHIBITIONS);
  const [schemeFilter, setSchemeFilter] = useState<'All' | 'Credit' | 'Marketing' | 'Cluster'>('All');

  // Tenders State
  const [tenders] = useState<B2BTender[]>(MOCK_B2B_TENDERS);
  const [selectedTender, setSelectedTender] = useState<B2BTender | null>(MOCK_B2B_TENDERS[0]);
  const [quoteSent, setQuoteSent] = useState<boolean>(false);

  const handleRunAgent = async () => {
    setAgentRunning(true);
    try {
      await TinyFishService.runZeroApiPublisher(
        selectedPortal,
        {
          title: 'Handcrafted GI Gorakhpur Terracotta Earthen Decorative Vase (35cm)',
          price: 680,
          description: 'Molded from pure alluvial clay by master artisan Rameshwar Prajapati. Wood kiln fired.',
          imageUrl: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
          giTag: 'GI-AP-541 (Gorakhpur Terracotta Craft)',
        },
        (updatedTask) => {
          setAgentTask({ ...updatedTask });
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setAgentRunning(false);
    }
  };

  const filteredSchemes = schemeFilter === 'All'
    ? schemes
    : schemes.filter((s) => s.category === schemeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm text-stone-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium mb-2">
              <Sparkles className="w-3.5 h-3.5 text-orange-700" />
              <span>TinyFish Web Intelligence Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-stone-900">
              Live Web Intelligence & Headless Browser Agent
            </h1>
            <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Real-time e-commerce price discovery, zero-API autonomous listing creation on government portals (GeM), and automated B2B tender matching.
            </p>
          </div>

          {/* Sub-Tabs */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 self-start md:self-auto">
            <button
              onClick={() => setSubTab('agent')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'agent'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Zero-API Agent</span>
            </button>
            <button
              onClick={() => setSubTab('schemes')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'schemes'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Schemes & Melas</span>
            </button>
            <button
              onClick={() => setSubTab('tenders')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'tenders'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>B2B Tenders</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: ZERO-API AGENT */}
      {subTab === 'agent' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Config Card */}
          <div className="lg:col-span-5 bg-white border border-stone-200/90 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-700 flex items-center justify-center border border-stone-200">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-stone-900 font-serif">
                  Zero-API Headless Browser Agent
                </h3>
                <p className="text-xs text-stone-500">
                  Target portals without open developer APIs (GeM, Regional Emporiums)
                </p>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-stone-700 block mb-1.5">
                Target Marketplace Portal:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['GeM', 'Etsy', 'Amazon Karigar'] as const).map((portal) => (
                  <button
                    key={portal}
                    onClick={() => setSelectedPortal(portal)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium border transition-all text-center ${
                      selectedPortal === portal
                        ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {portal}
                  </button>
                ))}
              </div>
            </div>

            {/* Agent Payload Summary */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3.5 text-xs space-y-2">
              <div className="font-semibold text-stone-800 text-xs flex items-center justify-between">
                <span>Natural Language Agent Goal:</span>
                <span className="text-[10px] text-stone-500 font-mono">TinyFish Agent API</span>
              </div>
              <p className="text-stone-700 italic font-mono text-[11px] leading-relaxed bg-white p-2 rounded border border-stone-200">
                "Navigate to seller listing page on {selectedPortal}. Authenticate, fill product title, select category 'Handicrafts', enter ₹680, attach studio canvas, attach GI certificate, and submit draft."
              </p>
              <div className="text-[11px] text-stone-600 pt-1 space-y-1">
                <div>• HSN Code: <strong>69120010 (Clay / Terracotta)</strong></div>
                <div>• GI Provenance: <strong>GI-AP-541 Verified</strong></div>
                <div>• Image URL: <strong>s3://kalasetu-cdn/craft-1-clean.png</strong></div>
              </div>
            </div>

            <button
              onClick={handleRunAgent}
              disabled={agentRunning}
              className={`w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all ${
                agentRunning
                  ? 'bg-stone-200 text-stone-500 cursor-wait'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${agentRunning ? 'animate-spin' : ''}`} />
              <span>{agentRunning ? `Executing on ${selectedPortal}...` : `Dispatch TinyFish Agent to ${selectedPortal}`}</span>
            </button>
          </div>

          {/* Right Clean Terminal */}
          <div className="lg:col-span-7 bg-stone-900 text-stone-100 border border-stone-800 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-700" />
                  </div>
                  <span className="font-mono text-stone-300 font-medium ml-1">
                    tinyfish-browser-agent: {selectedPortal.toLowerCase()}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-stone-400 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>HEADLESS CHROMIUM</span>
                </div>
              </div>

              {agentTask && (
                <div className="mb-3">
                  <div className="flex justify-between text-xs font-mono text-stone-300 mb-1">
                    <span>{agentTask.currentStep}</span>
                    <span>{agentTask.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-300"
                      style={{ width: `${agentTask.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Terminal Logs */}
              <div className="h-64 overflow-y-auto font-mono text-[11px] space-y-1.5 p-3 bg-black/40 rounded-xl border border-stone-800 scrollbar-none text-stone-300">
                {agentTask ? (
                  agentTask.logs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2 ${
                        log.type === 'success'
                          ? 'text-emerald-400'
                          : log.type === 'warn'
                          ? 'text-amber-400'
                          : 'text-stone-300'
                      }`}
                    >
                      <span className="text-stone-500 shrink-0">[{log.time}]</span>
                      <span>{log.message}</span>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-stone-500 text-center">
                    <Terminal className="w-7 h-7 mb-2 opacity-40" />
                    <p>Agent session idle. Click "Dispatch TinyFish Agent" to execute headless publishing.</p>
                  </div>
                )}
              </div>
            </div>

            {agentTask?.draftUrl && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-semibold block">Draft Formed on {selectedPortal}</span>
                    <span className="text-[10px] text-emerald-300/80">Saved in seller draft review queue</span>
                  </div>
                </div>
                <a
                  href={agentTask.draftUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-medium flex items-center gap-1 text-xs"
                >
                  <span>Open Draft</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: SCHEMES & MELAS */}
      {subTab === 'schemes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-stone-700">Filter:</span>
              <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                {(['All', 'Credit', 'Marketing', 'Cluster'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSchemeFilter(cat)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                      schemeFilter === cat
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-stone-500 flex items-center gap-1 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-stone-400" />
              <span>Crawled every 12h via TinyFish Scheduled Tasks</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-white border border-stone-200/90 rounded-2xl p-5 hover:border-stone-300 transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                      {scheme.ministry}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {scheme.category}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-stone-900 leading-snug">
                    {scheme.title}
                  </h3>
                  <div className="text-xs text-stone-500 font-medium mb-2.5">
                    {scheme.titleHi}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-3">
                    {scheme.benefit}
                  </p>

                  <div className="bg-stone-50 border border-stone-200/80 rounded-xl p-3 text-xs mb-3 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Cap Amount:</span>
                      <strong className="text-stone-900 font-mono">{scheme.maxAmount}</strong>
                    </div>
                    {scheme.interestRate && (
                      <div className="flex justify-between">
                        <span className="text-stone-500">Subsidized Interest:</span>
                        <strong className="text-stone-900 font-mono">{scheme.interestRate}</strong>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-stone-500">Deadline:</span>
                      <span className="text-stone-800">{scheme.deadline}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={scheme.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          {/* Trade Fairs */}
          <div className="mt-8 space-y-3">
            <h2 className="text-base font-serif font-bold text-stone-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-stone-700" />
              <span>National Crafts Melas (Surajkund, Dilli Haat, Shilp Samagam)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {exhibitions.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-white border border-stone-200/90 rounded-2xl p-4 flex flex-col justify-between text-xs shadow-sm space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                        {ex.type} Mela
                      </span>
                      <span className="text-stone-500 font-mono text-[10px]">
                        {ex.expectedFootfall}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">
                      {ex.name}
                    </h4>
                    <div className="text-stone-500 text-[11px] mb-2">
                      📍 {ex.venue}, {ex.city}
                    </div>

                    <div className="bg-stone-50 rounded-lg p-2.5 border border-stone-200 space-y-1 text-[11px]">
                      <div><strong>Dates:</strong> {ex.dates}</div>
                      <div><strong>Stall Subsidy:</strong> <span className="text-emerald-800 font-medium">{ex.stallSubsidy}</span></div>
                    </div>
                  </div>

                  <a
                    href={ex.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-center text-xs border border-stone-300 transition-colors"
                  >
                    Register for Stall
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: B2B TENDERS */}
      {subTab === 'tenders' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-stone-700">
                Active B2B Tenders (TinyFish Scout):
              </span>
              <span className="text-xs font-mono text-stone-500">
                {tenders.length} Matches
              </span>
            </div>

            {tenders.map((tender) => (
              <div
                key={tender.id}
                onClick={() => {
                  setSelectedTender(tender);
                  setQuoteSent(false);
                }}
                className={`p-4 rounded-xl border text-xs cursor-pointer transition-colors ${
                  selectedTender?.id === tender.id
                    ? 'bg-stone-100/90 border-stone-400 shadow-xs'
                    : 'bg-white border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200">
                    {tender.buyerType}
                  </span>
                  <span className="font-mono font-bold text-stone-900">
                    ₹{(tender.totalBudget / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <div className="font-bold text-stone-900 text-sm mb-1">
                  {tender.buyerName}
                </div>
                <p className="text-stone-600 text-[11px] line-clamp-2 mb-2">
                  {tender.requirement}
                </p>
                <div className="flex justify-between text-[11px] text-stone-500 border-t border-stone-100 pt-1.5">
                  <span>Qty: <strong>{tender.quantity} units</strong></span>
                  <span>Due: <strong>{tender.deadline}</strong></span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
            {selectedTender && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-stone-700" />
                    <div>
                      <h3 className="font-serif font-bold text-stone-900 text-base">
                        Auto-Drafted Formal Bulk Quotation
                      </h3>
                      <p className="text-xs text-stone-500">
                        Synthesized for {selectedTender.buyerName}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                    Capacity Match: 100%
                  </span>
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs space-y-3 font-sans">
                  <div className="grid grid-cols-2 gap-2 text-[11px] pb-2 border-b border-stone-200">
                    <div>
                      <span className="text-stone-500 block">Seller Cluster:</span>
                      <strong className="text-stone-800">Gorakhpur Terracotta SHG Federation</strong>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Client RFP ID:</span>
                      <strong className="text-stone-800">RFP-{selectedTender.id.toUpperCase()}-2026</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-stone-500 text-[11px] block mb-1">Scope of Supply:</span>
                    <p className="text-stone-700 leading-relaxed text-xs">
                      {selectedTender.quantity} units of authentic handcrafted terracotta craft, individually finished with organic ochre pigments, packed in shockproof 5-ply corrugated boxes.
                    </p>
                  </div>

                  <div className="bg-white rounded-lg p-3 space-y-1.5 font-mono text-[11px] border border-stone-200">
                    <div className="flex justify-between text-stone-600">
                      <span>Unit Offer Price:</span>
                      <span>₹{selectedTender.targetUnitBudget} / piece</span>
                    </div>
                    <div className="flex justify-between text-stone-600">
                      <span>Quantity:</span>
                      <span>{selectedTender.quantity} units</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Cluster Bulk Discount (8%):</span>
                      <span>- ₹{(selectedTender.totalBudget * 0.08).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-stone-200 font-bold text-stone-900 text-xs">
                      <span>Total Net Quotation:</span>
                      <span className="text-sm">₹{(selectedTender.totalBudget * 0.92).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setQuoteSent(true)}
                  disabled={quoteSent}
                  className={`w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all ${
                    quoteSent
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {quoteSent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Quotation Transmitted to {selectedTender.buyerName}!</span>
                    </>
                  ) : (
                    <>
                      <FileCheck className="w-4 h-4" />
                      <span>Sign with Cluster Pehchan & Submit Quotation</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
