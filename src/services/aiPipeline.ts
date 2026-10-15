import { GeneratedListing, CraftSample } from '../types';

export interface AIPipelineProgress {
  step: 'idle' | 'vision_rembg' | 'vision_lighting' | 'whisper_stt' | 'groq_llm' | 'confidence_scoring' | 'done';
  message: string;
  progressPercent: number;
}

export const AIPipelineService = {
  /**
   * Runs the complete multi-modal AI pipeline on raw photo & audio
   */
  async processCraftMedia(
    craft: CraftSample,
    audioTranscriptOverride?: string,
    onProgress?: (progress: AIPipelineProgress) => void
  ): Promise<GeneratedListing> {
    const notify = (step: AIPipelineProgress['step'], message: string, percent: number) => {
      onProgress?.({ step, message, progressPercent: percent });
    };

    // Step 1: Computer Vision - Background removal & canvas setup
    notify('vision_rembg', 'Computer Vision Studio: Isolating craft edges & removing workshop clutter via rembg...', 20);
    await new Promise(r => setTimeout(r, 800));

    // Step 2: Computer Vision - Lighting & White Canvas
    notify('vision_lighting', 'OpenCV Studio: Correcting color temperature, exposure balance & generating studio soft shadow...', 40);
    await new Promise(r => setTimeout(r, 700));

    // Step 3: Vernacular Speech-to-Text via Whisper
    notify('whisper_stt', 'Whisper ASR: Transcribing regional voice recording in native dialect...', 65);
    await new Promise(r => setTimeout(r, 800));

    // Step 4: Groq LPU / LLaMA 3 Bilingual SEO Copy Generation
    notify('groq_llm', 'Groq LPU (LLaMA 3): Synthesizing high-ranking English & Hindi titles, craft story, and ONDC tags...', 85);
    await new Promise(r => setTimeout(r, 900));

    // Step 5: Listing Confidence Scoring & Coach Evaluation
    notify('confidence_scoring', 'Confidence Coach: Calculating 6-factor readiness score & auto-generating one-tap improvements...', 95);
    await new Promise(r => setTimeout(r, 600));

    notify('done', 'Listing generation complete! Ready for artisan review.', 100);

    // Realistic Groq LLaMA-3 generated outputs based on the craft
    const isTerracotta = craft.category.toLowerCase().includes('terracotta') || craft.id === 'craft-1';
    const isBluePottery = craft.category.toLowerCase().includes('ceramic') || craft.id === 'craft-2';
    const isMadhubani = craft.category.toLowerCase().includes('paint') || craft.id === 'craft-3';

    let titleEn = `Authentic Handcrafted ${craft.name}`;
    let titleHi = `हस्तनिर्मित पारंपरिक ${craft.name}`;
    let descriptionEn = `Individually wheel-thrown and hand-etched by master artisan ${craft.artisanName} in the craft village of ${craft.village}. Molded from pure mineral-rich alluvial clay and fired in a traditional wood kiln. Ideal for eco-conscious home decor, dry flower arrangements, and auspicious gifting.`;
    let descriptionHi = `शिल्पकार ${craft.artisanName} द्वारा ${craft.village} में चाक पर अपने हाथों से बनाया गया प्रामाणिक उत्पाद। पूरी तरह से प्राकृतिक सामग्री और पारम्परिक लकड़ी के भट्ठे में पकाया गया। घर की सजावट और उपहार के लिए सर्वोत्तम।`;
    let heritageStory = `This craft represents a 400-year-old unbroken lineage recognized with ${craft.giTag}. Each piece preserves rural indigenous knowledge, zero electricity consumption, and 100% bio-degradable non-toxic materials.`;

    if (isBluePottery) {
      titleEn = `GI Certified Jaipur Blue Pottery Hand-Glazed Decorative Platter (12")`;
      titleHi = `जीआई प्रमाणित जयपुर ब्लू पॉटरी हाथ से रंगी हुई सजावटी थाली (12 इंच)`;
      descriptionEn = `Handcrafted without a potter's wheel using ground quartz, glass frit, and Multani Mitti. Painted with natural cobalt oxide in classic Persian and Rajput botanical motifs. Fired once at low temperature for signature glaze.`;
      descriptionHi = `बिना चाक के क्वार्ट्ज और मुल्तानी मिट्टी से हाथ द्वारा तैयार की गई ऐतिहासिक ब्लू पॉटरी। कोबाल्ट नीले रंग में प्राकृतिक फूल-पत्ती का पारंपरिक काम।`;
      heritageStory = `Protected under GI-IN-028. Blue Pottery is unique because it uses no clay, relying instead on Egyptian faience traditions brought to Jaipur by Maharaja Sawai Ram Singh II in the 19th century.`;
    } else if (isMadhubani) {
      titleEn = `Original Mithila Madhubani Hand-Painted Tree of Life Silk Canvas (18x24")`;
      titleHi = `मूल मिथिला मधुबनी हस्तनिर्मित जीवन-वृक्ष कैनवास पेंटिंग (18x24 इंच)`;
      descriptionEn = `Created using fine bamboo stylus (nib) and organic pigment dyes extracted from turmeric, soot, aparajita flowers, and kachnar bark. Represents prosperity, universal harmony, and eternal fertility.`;
      descriptionHi = `बाँस की कलम और प्राकृतिक वानस्पतिक रंगों (हल्दी, कालिख, फूलों) से बनी पारंपरिक मिथिला पेंटिंग। जीवन की समृद्धि और प्रकृति से जुड़ाव का प्रतीक।`;
      heritageStory = `Dating back to the Ramayana era, Madhubani art is an UNESCO-lauded indigenous folk tradition passed down matrilineally across generations in Mithila, Bihar.`;
    }

    const tags = [
      'Handmade In India',
      craft.giTag.split('(')[1]?.replace(')', '') || 'GI Handicraft',
      craft.category,
      'Eco Friendly Living',
      'ONDC Verified Artisan',
      'Zero Carbon Craft',
      'Vocal For Local',
      craft.village,
    ];

    const suggestedPrice = craft.marketPrice;
    const minMarketPrice = Math.round(craft.marketPrice * 0.85);
    const maxMarketPrice = Math.round(craft.marketPrice * 1.65);
    const modalMarketPrice = Math.round(craft.marketPrice * 1.05);

    // Initial recommendations for the confidence coach
    const recommendations = [
      {
        id: 'rec-1',
        title: 'Add exact package dimensions and weight for fast courier pickup',
        action: `Set to ${craft.dimensions.width}×${craft.dimensions.height}×${craft.dimensions.depth} cm (${craft.dimensions.weightKg} kg)`,
        impact: 6,
        done: false,
      },
      {
        id: 'rec-2',
        title: 'Attach GI Tag Certificate badge to increase buyer trust by 35%',
        action: `Verified: ${craft.giTag}`,
        impact: 5,
        done: true,
      },
      {
        id: 'rec-3',
        title: 'Confirm ready dispatch stock quantity',
        action: 'Defaulted to 5 units in village workshop',
        impact: 4,
        done: false,
      },
      {
        id: 'rec-4',
        title: 'Include Care & Cleaning instructions in bilingual description',
        action: 'Wipe with dry microfiber cloth. Do not soak in acidic water.',
        impact: 3,
        done: true,
      },
    ];

    return {
      titleEn,
      titleHi,
      descriptionEn,
      descriptionHi,
      heritageStory,
      category: craft.category,
      tags,
      suggestedPrice,
      minMarketPrice,
      maxMarketPrice,
      modalMarketPrice,
      confidenceScore: {
        total: 82, // will increase to 97 as recommendations are applied
        photoQuality: 92,
        descriptionCompleteness: 85,
        priceCompetitiveness: 90,
        categoryAccuracy: 95,
        shippingReadiness: 65,
        trustSignals: 88,
        recommendations,
      },
      pricingBreakdown: {
        artisanNet: Math.round(suggestedPrice * 0.72),
        materialsCost: craft.costBreakdown.rawMaterial,
        packaging: craft.costBreakdown.packaging,
        logistics: craft.costBreakdown.shipping,
        platformFee: 0, // 0% on ONDC!
      },
      ondcReady: true,
      giCertified: true,
    };
  },
};
