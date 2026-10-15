export type Language = 'en' | 'hi' | 'or' | 'ta' | 'bn';

export interface CraftSample {
  id: string;
  name: string;
  category: string;
  state: string;
  village: string;
  artisanName: string;
  artisanPhoto: string;
  giTag: string;
  rawImage: string;
  processedImage: string;
  regionalAudioText: string;
  regionalLang: string;
  dimensions: { width: number; height: number; depth: number; unit: string; weightKg: number };
  material: string;
  productionDays: number;
  marketPrice: number;
  costBreakdown: {
    rawMaterial: number;
    laborHours: number;
    laborRate: number;
    firingKiln: number;
    packaging: number;
    shipping: number;
  };
  esgMetrics: {
    co2SavedKg: number;
    waterSavedLiters: number;
    zeroElectricity: boolean;
    naturalDyes: boolean;
  };
}

export interface GeneratedListing {
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  heritageStory: string;
  category: string;
  tags: string[];
  suggestedPrice: number;
  minMarketPrice: number;
  maxMarketPrice: number;
  modalMarketPrice: number;
  confidenceScore: {
    total: number;
    photoQuality: number;
    descriptionCompleteness: number;
    priceCompetitiveness: number;
    categoryAccuracy: number;
    shippingReadiness: number;
    trustSignals: number;
    recommendations: { id: string; title: string; action: string; impact: number; done: boolean }[];
  };
  pricingBreakdown: {
    artisanNet: number;
    materialsCost: number;
    packaging: number;
    logistics: number;
    platformFee: number; // 0% on ONDC
  };
  ondcReady: boolean;
  giCertified: boolean;
}

export interface MarketBenchmark {
  platform: 'Amazon Karigar' | 'Etsy' | 'Craftsvilla' | 'GeM' | 'FabIndia';
  title: string;
  price: number;
  rating: number;
  reviewsCount: number;
  verifiedHandmade: boolean;
  link: string;
  lastScraped: string;
}

export interface TinyFishAgentTask {
  id: string;
  targetPortal: 'GeM' | 'Etsy' | 'Amazon Karigar' | 'Dilli Haat Portal';
  status: 'idle' | 'navigating' | 'filling_form' | 'uploading_media' | 'draft_created' | 'published';
  progress: number;
  currentStep: string;
  logs: { time: string; message: string; type: 'info' | 'success' | 'warn' }[];
  draftUrl?: string;
}

export interface GovScheme {
  id: string;
  title: string;
  titleHi: string;
  ministry: string;
  benefit: string;
  maxAmount: string;
  interestRate?: string;
  subsidyRate?: string;
  deadline: string;
  eligibility: string[];
  category: 'Credit' | 'Marketing' | 'Toolkit' | 'Cluster';
  applyUrl: string;
  verifiedActive: boolean;
}

export interface CraftExhibition {
  id: string;
  name: string;
  city: string;
  venue: string;
  dates: string;
  stallSubsidy: string;
  expectedFootfall: string;
  applicationDeadline: string;
  applyUrl: string;
  type: 'National' | 'State' | 'International';
}

export interface TrendSignal {
  id: string;
  aesthetic: string;
  growthPercentage: number;
  sourcePlatforms: ('Pinterest' | 'Etsy' | 'Instagram' | 'Architectural Digest')[];
  relatedCraft: string;
  vernacularAdvisoryHi: string;
  vernacularAdvisoryEn: string;
  recommendedColors: string[];
  demandLevel: 'High' | 'Surging' | 'Emerging';
}

export interface B2BTender {
  id: string;
  buyerName: string;
  buyerType: 'Corporate' | 'PSU' | 'Hotel Chain' | 'Export House';
  requirement: string;
  quantity: number;
  targetUnitBudget: number;
  totalBudget: number;
  deadline: string;
  deliveryLocation: string;
  status: 'Open' | 'Matching' | 'Quotation Sent';
}

export interface ShilpCreditProfile {
  score: number; // 300 - 900
  tier: 'Excellent' | 'Good' | 'Fair';
  inventoryValuation: number;
  ondcFulfillmentRate: number;
  avgDeliveryDays: number;
  repeatBuyerRate: number;
  activeMonths: number;
  preApprovedLoans: {
    schemeName: string;
    amount: number;
    interestRate: string;
    tenure: string;
    emi: number;
    sanctionPartner: string;
  }[];
}
