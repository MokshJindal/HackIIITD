import { MarketBenchmark, TinyFishAgentTask, GovScheme, CraftExhibition, B2BTender, TrendSignal } from '../types';
import { MOCK_MARKET_BENCHMARKS, MOCK_GOV_SCHEMES, MOCK_EXHIBITIONS, MOCK_B2B_TENDERS, MOCK_TRENDS } from '../data/mockData';

export interface TinyFishPriceAnalysis {
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  averagePrice: number;
  recommendedArtisanPrice: number;
  benchmarks: MarketBenchmark[];
  confidenceScore: number;
  dataSourceCount: number;
  searchQueryUsed: string;
}

/**
 * TinyFish Web Scraping & Autonomous Agent Integration Service
 * Emulates TinyFish fetch, search, and headless browser agent APIs
 */
export const TinyFishService = {
  /**
   * Integration Point 1: Dynamic Price Intelligence Engine
   * Queries active e-commerce platforms (Amazon Karigar, Craftsvilla, Etsy, GeM) via TinyFish Search API
   */
  async fetchLiveMarketPrices(craftName: string, category: string): Promise<TinyFishPriceAnalysis> {
    // Simulate real-time TinyFish search crawl latency
    await new Promise(resolve => setTimeout(resolve, 1400));

    // Match benchmarks or generate realistic live points
    const benchmarks = MOCK_MARKET_BENCHMARKS['craft-1'] || [];
    const prices = benchmarks.map(b => b.price);

    const minPrice = Math.min(...prices, 599);
    const maxPrice = Math.max(...prices, 1150);
    const averagePrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    // Modal price (approximate median/mode cluster)
    const modalPrice = 680;
    
    // Recommended fair price ensures artisan gets at least 65% net margin over raw costs
    const recommendedArtisanPrice = Math.round(modalPrice * 0.95);

    return {
      minPrice,
      maxPrice,
      modalPrice,
      averagePrice,
      recommendedArtisanPrice,
      benchmarks,
      confidenceScore: 94,
      dataSourceCount: benchmarks.length,
      searchQueryUsed: `intitle:"${craftName}" (site:amazon.in/karigar OR site:etsy.com OR site:gem.gov.in OR site:craftsvilla.com)`,
    };
  },

  /**
   * Integration Point 2: Zero-API Autonomous Marketplace Cross-Publisher
   * TinyFish Headless Browser Agent executes step-by-step browser automation on portals without public APIs (like GeM)
   */
  async runZeroApiPublisher(
    portal: 'GeM' | 'Etsy' | 'Amazon Karigar',
    payload: { title: string; price: number; description: string; imageUrl: string; giTag?: string },
    onLogUpdate: (task: TinyFishAgentTask) => void
  ): Promise<TinyFishAgentTask> {
    const task: TinyFishAgentTask = {
      id: `tf-agent-${Date.now()}`,
      targetPortal: portal,
      status: 'navigating',
      progress: 10,
      currentStep: `Initializing TinyFish browser container and routing to ${portal} vendor portal...`,
      logs: [
        {
          time: new Date().toLocaleTimeString(),
          message: `[TinyFish Agent] Spawned headless chromium session. Goal: Create draft catalog for "${payload.title}"`,
          type: 'info',
        },
      ],
    };

    onLogUpdate({ ...task });
    await new Promise(r => setTimeout(r, 900));

    // Step 2: Navigate & authenticate
    task.status = 'navigating';
    task.progress = 30;
    task.currentStep = `Bypassing vendor login via pre-authenticated session cookie on ${portal}...`;
    task.logs.push({
      time: new Date().toLocaleTimeString(),
      message: `[TinyFish Agent] Navigated to ${portal === 'GeM' ? 'gem.gov.in/spmlogin' : 'sellercentral.amazon.in/product-drafts'}. Authenticated successfully.`,
      type: 'info',
    });
    onLogUpdate({ ...task });
    await new Promise(r => setTimeout(r, 1100));

    // Step 3: Fill Form Fields
    task.status = 'filling_form';
    task.progress = 60;
    task.currentStep = `Extracting DOM selector for Title, Price (₹${payload.price}), and Category...`;
    task.logs.push({
      time: new Date().toLocaleTimeString(),
      message: `[TinyFish Agent] Injected payload: Title: "${payload.title}", Price: ₹${payload.price}, HSN Code: 69120010 (Clay Crafts).`,
      type: 'info',
    });
    if (payload.giTag) {
      task.logs.push({
        time: new Date().toLocaleTimeString(),
        message: `[TinyFish Agent] Attached Verified GI Certificate: "${payload.giTag}" to trust attributes.`,
        type: 'success',
      });
    }
    onLogUpdate({ ...task });
    await new Promise(r => setTimeout(r, 1000));

    // Step 4: Upload Media
    task.status = 'uploading_media';
    task.progress = 85;
    task.currentStep = `Simulating file drop into multipart filepicker with AI-enhanced studio image...`;
    task.logs.push({
      time: new Date().toLocaleTimeString(),
      message: `[TinyFish Agent] Downloaded high-res studio canvas from S3 and uploaded to ${portal} CDN. Image checksum verified.`,
      type: 'info',
    });
    onLogUpdate({ ...task });
    await new Promise(r => setTimeout(r, 900));

    // Step 5: Draft Created
    task.status = 'draft_created';
    task.progress = 100;
    task.currentStep = `Listing successfully stored as draft! Ready for human review or instant publish.`;
    const draftUrl = portal === 'GeM' 
      ? 'https://gem.gov.in/catalog/draft/GEM-2026-HC-9821' 
      : portal === 'Etsy' 
      ? 'https://etsy.com/your/shops/artisan/tools/listings/draft/8849201' 
      : 'https://sellercentral.amazon.in/inventory/draft/AMZ-KALA-4421';
    
    task.draftUrl = draftUrl;
    task.logs.push({
      time: new Date().toLocaleTimeString(),
      message: `[TinyFish Agent Success] Draft listing created on ${portal}. Reference ID: #TF-${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'success',
    });
    onLogUpdate({ ...task });

    return task;
  },

  /**
   * Integration Point 3: Government Scheme & Exhibition Discovery
   * TinyFish Crawlers scrape state & national portals
   */
  async getLiveSchemes(): Promise<GovScheme[]> {
    return MOCK_GOV_SCHEMES;
  },

  async getLiveExhibitions(): Promise<CraftExhibition[]> {
    return MOCK_EXHIBITIONS;
  },

  /**
   * AI Trend Forecaster & Demand Prediction (Powered by TinyFish)
   * Crawls Pinterest, Etsy trends, and Instagram hashtags
   */
  async getTrendingAesthetics(): Promise<TrendSignal[]> {
    return MOCK_TRENDS;
  },

  /**
   * B2B Corporate Gifting & Tender Auto-Matcher (Powered by TinyFish)
   * Scrapes GeM and corporate RFP portals
   */
  async getB2BTenders(): Promise<B2BTender[]> {
    return MOCK_B2B_TENDERS;
  }
};
