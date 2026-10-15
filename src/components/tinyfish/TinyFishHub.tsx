import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  Terminal, 
  ExternalLink, 
  FileCheck, 
  Calendar, 
  Award, 
  Search, 
  Building2, 
  Briefcase, 
  FileText, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Play,
  RotateCcw
} from 'lucide-react';
import { TinyFishService, TinyFishPriceAnalysis } from '../../services/tinyfish';
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
  const [tenders, setTenders] = useState<B2BTender[]>(MOCK_B2B_TENDERS);
  const [selectedTender, setSelectedTender] = useState<B2BTender | null>(MOCK_B2B_TENDERS[0]);
  const [quoteSent, setQuoteSent] = useState<boolean>(false);

  // Trigger Zero-API Autonomous Cross-Publisher Agent
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
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 border border-amber-800/40 rounded-2xl p-6 text-amber-50 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>TinyFish Real-Time Web Intelligence Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Live Web Scraping & Headless Autonomous Agent
            </h1>
            <p className="text-amber-200/80 text-xs sm:text-sm max-w-2xl mt-1">
              Solves the primary market linkage challenge: real-time e-commerce price discovery, zero-API autonomous listing creation on government portals, and automated B2B tender matching.
            </p>
          </div>

          {/* Sub-Tabs */}
          <div className="flex items-center gap-1.5 bg-amber-950/80 p-1.5 rounded-xl border border-amber-800/60 self-start md:self-auto">
            <button
              onClick={() => setSubTab('agent')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'agent'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Zero-API Publisher Agent</span>
            </button>
            <button
              onClick={() => setSubTab('schemes')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'schemes'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Schemes & Melas</span>
            </button>
            <button
              onClick={() => setSubTab('tenders')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                subTab === 'tenders'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                  : 'text-amber-300 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>B2B Tender Scout</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: ZERO-API AUTONOMOUS MARKETPLACE CROSS-PUBLISHER */}
      {subTab === 'agent' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Config Card */}
          <div className="lg:col-span-5 bg-amber-950/20 border border-amber-800/40 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-amber-100 font-serif">
                  Zero-API Headless Browser Agent
                </h3>
                <p className="text-[11px] text-amber-300/70">
                  Target portals without open developer APIs (GeM, Regional Emporiums)
                </p>
              </div>
            </div>

            {/* Target Portal Selection */}
            <div>
              <label className="text-xs font-semibold text-amber-200 block mb-1.5">
                Target Marketplace Portal:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['GeM', 'Etsy', 'Amazon Karigar'] as const).map((portal) => (
                  <button
                    key={portal}
                    onClick={() => setSelectedPortal(portal)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                      selectedPortal === portal
                        ? 'bg-amber-600 border-amber-400 text-white shadow-lg'
                        : 'bg-amber-900/30 border-amber-800/50 text-amber-200 hover:bg-amber-900/50'
                    }`}
                  >
                    {portal}
                  </button>
                ))}
              </div>
            </div>

            {/* Agent Payload Summary */}
            <div className="bg-amber-900/20 border border-amber-800/30 rounded-xl p-3 text-xs space-y-2">
              <div className="font-semibold text-amber-300 text-[11px] flex items-center justify-between">
                <span>Natural Language Agent Goal:</span>
                <span className="text-[10px] text-amber-400/80 font-mono">TinyFish Agent API v2</span>
              </div>
              <p className="text-amber-100 italic font-mono text-[11px] leading-relaxed bg-black/30 p-2 rounded border border-white/5">
                "Navigate to seller listing page on {selectedPortal}. Authenticate, fill product title, select category 'Handicrafts', enter ₹680, attach enhanced studio image, attach GI certificate, and submit draft."
              </p>
              <div className="text-[11px] text-amber-300/80 pt-1 space-y-1">
                <div>• HSN Code: <strong>69120010 (Clay / Terracotta)</strong></div>
                <div>• GI Provenance: <strong>GI-AP-541 Verified</strong></div>
                <div>• Image URL: <strong>s3://kalasetu-cdn/studio/craft-1-clean.png</strong></div>
              </div>
            </div>

            {/* Run Button */}
            <button
              onClick={handleRunAgent}
              disabled={agentRunning}
              className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xl transition-all duration-300 ${
                agentRunning
                  ? 'bg-amber-800 text-amber-300 cursor-wait'
                  : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white hover:scale-[1.02]'
              }`}
            >
              <Play className={`w-4 h-4 ${agentRunning ? 'animate-spin' : ''}`} />
              <span>{agentRunning ? `TinyFish Agent Executing on ${selectedPortal}...` : `Dispatch TinyFish Agent to ${selectedPortal}`}</span>
            </button>
          </div>

          {/* Right Live Execution Terminal */}
          <div className="lg:col-span-7 bg-[#141210] border border-amber-900/50 rounded-2xl p-5 shadow-2xl flex flex-col justify-between">
            <div>
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-900/40">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-amber-300 font-semibold ml-2">
                    tinyfish-browser-agent-session: {selectedPortal.toLowerCase()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-mono text-amber-400/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>HEADLESS CHROMIUM V122</span>
                </div>
              </div>

              {/* Progress Bar */}
              {agentTask && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs font-mono text-amber-300 mb-1">
                    <span>{agentTask.currentStep}</span>
                    <span>{agentTask.progress}%</span>
                  </div>
                  <div className="h-2 bg-stone-900 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                      style={{ width: `${agentTask.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Real-Time Terminal Log Stream */}
              <div className="h-64 overflow-y-auto font-mono text-[11px] space-y-2 p-3 bg-black/50 rounded-xl border border-amber-950/80 scrollbar-none">
                {agentTask ? (
                  agentTask.logs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2 ${
                        log.type === 'success'
                          ? 'text-emerald-400'
                          : log.type === 'warn'
                          ? 'text-yellow-400'
                          : 'text-amber-200/90'
                      }`}
                    >
                      <span className="text-stone-500 shrink-0">[{log.time}]</span>
                      <span>{log.message}</span>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-stone-500 text-center">
                    <Terminal className="w-8 h-8 mb-2 opacity-50" />
                    <p>Agent session idle. Click "Dispatch TinyFish Agent" to execute headless publishing.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Generated Draft URL Alert */}
            {agentTask?.draftUrl && (
              <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-semibold block">Draft Successfully Formed on {selectedPortal}!</span>
                    <span className="text-[10px] text-emerald-200/80">Pending human click to activate live</span>
                  </div>
                </div>
                <a
                  href={agentTask.draftUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold flex items-center gap-1 text-[11px] transition-all"
                >
                  <span>Open Draft</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: GOVERNMENT SCHEME & EXHIBITION DISCOVERY */}
      {subTab === 'schemes' && (
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-200">Category Filter:</span>
              <div className="flex items-center gap-1.5 bg-amber-950/60 p-1 rounded-xl border border-amber-800/40">
                {(['All', 'Credit', 'Marketing', 'Cluster'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSchemeFilter(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      schemeFilter === cat
                        ? 'bg-amber-600 text-white shadow'
                        : 'text-amber-300 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Crawled every 12h via TinyFish Scheduled Tasks</span>
            </div>
          </div>

          {/* Schemes Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSchemes.map((scheme) => (
              <div
                key={scheme.id}
                className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-5 hover:border-amber-600 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-900/60 text-amber-300 border border-amber-700/50">
                      {scheme.ministry}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      {scheme.category} Scheme
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-amber-100 leading-snug">
                    {scheme.title}
                  </h3>
                  <div className="text-xs text-amber-400/80 font-medium mb-3">
                    {scheme.titleHi}
                  </div>

                  <p className="text-xs text-amber-200/90 leading-relaxed mb-3">
                    {scheme.benefit}
                  </p>

                  <div className="bg-amber-900/25 border border-amber-800/40 rounded-xl p-3 text-xs mb-3 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-amber-300/70">Subsidy / Loan Cap:</span>
                      <strong className="text-emerald-400 font-mono">{scheme.maxAmount}</strong>
                    </div>
                    {scheme.interestRate && (
                      <div className="flex justify-between">
                        <span className="text-amber-300/70">Subsidized Interest:</span>
                        <strong className="text-amber-200 font-mono">{scheme.interestRate}</strong>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-amber-300/70">Current Deadline:</span>
                      <span className="text-amber-200">{scheme.deadline}</span>
                    </div>
                  </div>

                  {/* Eligibility Checklist */}
                  <div className="mb-4">
                    <span className="text-[11px] font-semibold text-amber-300 block mb-1">
                      Eligibility Criteria:
                    </span>
                    <ul className="text-[11px] text-amber-200/80 space-y-1">
                      {scheme.eligibility.map((el, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{el}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href={scheme.applyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          {/* Trade Fairs & Melas Section */}
          <div className="mt-8">
            <h2 className="text-lg font-serif font-bold text-amber-100 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-400" />
              <span>National Crafts Melas & Exhibitions (Surajkund, Dilli Haat, Shilp Samagam)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {exhibitions.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-amber-950/20 border border-amber-800/40 rounded-2xl p-4 flex flex-col justify-between text-xs shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-950 text-orange-300 border border-orange-500/40">
                        {ex.type} Mela
                      </span>
                      <span className="text-emerald-400 font-mono text-[10px]">
                        {ex.expectedFootfall}
                      </span>
                    </div>

                    <h4 className="font-serif font-bold text-amber-100 text-sm mb-1">
                      {ex.name}
                    </h4>
                    <div className="text-amber-300/80 text-[11px] mb-2">
                      📍 {ex.venue}, {ex.city}
                    </div>

                    <div className="bg-amber-900/20 rounded-lg p-2.5 border border-amber-800/30 mb-3 space-y-1 text-[11px]">
                      <div><strong>Dates:</strong> {ex.dates}</div>
                      <div><strong>Stall Subsidy:</strong> <span className="text-emerald-400">{ex.stallSubsidy}</span></div>
                      <div><strong>Deadline:</strong> <span className="text-amber-200">{ex.applicationDeadline}</span></div>
                    </div>
                  </div>

                  <a
                    href={ex.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 rounded-lg bg-amber-800/60 hover:bg-amber-700/80 text-amber-100 font-semibold text-center text-[11px] border border-amber-600/40 transition-all"
                  >
                    Register for Stall
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: B2B CORPORATE GIFTING & TENDER AUTO-MATCHER */}
      {subTab === 'tenders' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Tenders List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-amber-200">
                Active Corporate & Government Tenders (TinyFish B2B Scout):
              </span>
              <span className="text-[11px] font-mono text-emerald-400">
                {tenders.length} Matches Found
              </span>
            </div>

            {tenders.map((tender) => (
              <div
                key={tender.id}
                onClick={() => {
                  setSelectedTender(tender);
                  setQuoteSent(false);
                }}
                className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                  selectedTender?.id === tender.id
                    ? 'bg-amber-900/50 border-amber-500 shadow-lg'
                    : 'bg-amber-950/20 border-amber-800/40 hover:bg-amber-900/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/50">
                    {tender.buyerType}
                  </span>
                  <span className="font-mono font-bold text-emerald-400">
                    ₹{(tender.totalBudget / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <div className="font-bold text-amber-100 text-sm mb-1">
                  {tender.buyerName}
                </div>
                <p className="text-amber-200/80 text-[11px] line-clamp-2 mb-2">
                  {tender.requirement}
                </p>
                <div className="flex justify-between text-[10px] text-amber-400/80 border-t border-amber-800/30 pt-1.5">
                  <span>Qty: <strong>{tender.quantity} units</strong></span>
                  <span>Due: <strong>{tender.deadline}</strong></span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Quotation Auto-Generator Preview */}
          <div className="lg:col-span-7 bg-amber-950/20 border border-amber-800/40 rounded-2xl p-5 shadow-2xl flex flex-col justify-between">
            {selectedTender && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-amber-800/40">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-400" />
                    <div>
                      <h3 className="font-serif font-bold text-amber-100 text-base">
                        Auto-Drafted Formal Bulk Quotation
                      </h3>
                      <p className="text-[11px] text-amber-300/70">
                        Synthesized by AI for {selectedTender.buyerName}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                    Capacity Match: 100%
                  </span>
                </div>

                {/* Quotation Details Box */}
                <div className="bg-amber-900/15 border border-amber-800/30 rounded-xl p-4 text-xs space-y-3 font-sans">
                  <div className="grid grid-cols-2 gap-2 text-[11px] pb-2 border-b border-amber-800/30">
                    <div>
                      <span className="text-amber-400/70 block">Seller Cluster:</span>
                      <strong className="text-amber-100">Gorakhpur Terracotta SHG Federation</strong>
                    </div>
                    <div>
                      <span className="text-amber-400/70 block">Client RFP ID:</span>
                      <strong className="text-amber-100">RFP-{selectedTender.id.toUpperCase()}-2026</strong>
                    </div>
                  </div>

                  <div>
                    <span className="text-amber-400/70 text-[11px] block mb-1">Scope of Supply:</span>
                    <p className="text-amber-100 leading-relaxed text-xs">
                      {selectedTender.quantity} units of authentic handcrafted terracotta craft, individually finished with organic ochre pigments, packed in shockproof 5-ply corrugated craft boxes with custom client gift card.
                    </p>
                  </div>

                  {/* Financial Breakdown Table */}
                  <div className="bg-black/30 rounded-lg p-3 space-y-1.5 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-stone-300">Unit Offer Price:</span>
                      <span>₹{selectedTender.targetUnitBudget} / piece</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-300">Total Quantity:</span>
                      <span>{selectedTender.quantity} units</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-300">Bulk Cluster Discount (8%):</span>
                      <span className="text-emerald-400">- ₹{(selectedTender.totalBudget * 0.08).toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-white/10 font-bold text-amber-300 text-xs">
                      <span>Total Net Quotation:</span>
                      <span className="text-emerald-400 text-sm">
                        ₹{(selectedTender.totalBudget * 0.92).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submission Action */}
                <div className="pt-2">
                  <button
                    onClick={() => setQuoteSent(true)}
                    disabled={quoteSent}
                    className={`w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xl transition-all ${
                      quoteSent
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white'
                    }`}
                  >
                    {quoteSent ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-200" />
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
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
