//api/gold-rate/route.js
import { NextResponse } from "next/server";

const GOLD_API_URL = "https://api.gold-api.com/price/XAU";
const EXCHANGE_API_URL = "https://api.exchangerate-api.com/v4/latest/USD"; // Free exchange rate API
// Alternative: https://api.exchangerate.host/latest?base=USD

// Cache configuration
const CACHE_DURATION = 300; // 5 minutes in seconds
let cache = {
  data: null,
  timestamp: 0,
};

export async function GET() {
  try {
    // Check cache first
    const now = Math.floor(Date.now() / 1000);
    if (cache.data && (now - cache.timestamp) < CACHE_DURATION) {
      console.log("Returning cached gold rate");
      return NextResponse.json(cache.data);
    }

    console.log("Fetching fresh gold rate...");
    
    // Step 1: Fetch gold price from gold-api.com (FREE, no API key needed)
    const goldResponse = await fetch(GOLD_API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'ValueGold/1.0',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });
    
    if (!goldResponse.ok) {
      throw new Error(`Gold API responded with ${goldResponse.status}`);
    }
    
    const goldData = await goldResponse.json();
    console.log("Gold API data:", goldData);
    
    // Step 2: Fetch USD to INR exchange rate from free API
    const exchangeResponse = await fetch(EXCHANGE_API_URL, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ValueGold/1.0',
      },
      signal: AbortSignal.timeout(10000),
    });
    
    if (!exchangeResponse.ok) {
      throw new Error(`Exchange API responded with ${exchangeResponse.status}`);
    }
    
    const exchangeData = await exchangeResponse.json();
    console.log("Exchange API data received");
    
    // For silver price, we'll estimate it or use a fixed ratio
    // Gold/Silver ratio is typically around 80:1
    const estimatedGoldSilverRatio = 80;
    const silverUsdPerTroyOz = goldData.price / estimatedGoldSilverRatio;
    
    // Calculate rates
    const calculations = calculateAllRates(goldData, exchangeData, silverUsdPerTroyOz);
    
    // Prepare response data
    const responseData = {
      success: true,
      timestamp: new Date().toISOString(),
      sources: {
        gold: 'gold-api.com (free)',
        exchange: 'exchangerate-api.com (free)',
        silver: 'estimated from gold-silver ratio',
      },
      cache: {
        cached: false,
        duration: CACHE_DURATION,
        nextRefresh: now + CACHE_DURATION,
      },
      ...calculations,
    };
    
    // Update cache
    cache.data = responseData;
    cache.timestamp = now;
    
    return NextResponse.json(responseData);
    
  } catch (error) {
    console.error("API error:", error);
    
    // Return cached data if available (even if stale)
    if (cache.data) {
      console.log("Returning stale cached data due to error");
      return NextResponse.json({
        ...cache.data,
        success: false,
        error: error.message,
        sources: 'cached (stale)',
        timestamp: new Date().toISOString(),
      });
    }
    
    // Otherwise use fallback
    const fallbackData = getFallbackRates();
    
    return NextResponse.json({
      ...fallbackData,
      success: false,
      error: error.message,
      sources: 'fallback',
    });
  }
}

// Calculate all rates from API responses
function calculateAllRates(goldData, exchangeData, silverUsdPerTroyOz) {
  // Extract values
  const goldUsdPerTroyOz = goldData.price; // USD per troy ounce of gold
  const usdToInrRate = exchangeData.rates.INR; // INR per 1 USD
  
  // Constants
  const TROY_OUNCE_TO_GRAMS = 31.1035;
  
  // Calculate 24K gold rate per gram in INR
  const goldRate24KPerGram = (goldUsdPerTroyOz * usdToInrRate) / TROY_OUNCE_TO_GRAMS;
  const roundedGoldRate = Math.round(goldRate24KPerGram);
  
  // Calculate silver rate per gram in INR
  const silverRatePerGram = (silverUsdPerTroyOz * usdToInrRate) / TROY_OUNCE_TO_GRAMS;
  const roundedSilverRate = Math.round(silverRatePerGram * 100) / 100; // 2 decimal places
  
  // Calculate purity multipliers
  const purityMultipliers = {
    24: 1.000, // 99.9%
    22: 0.916, // 91.6%
    20: 0.833, // 83.3%
    18: 0.750, // 75.0%
    14: 0.585, // 58.5%
  };
  
  // Calculate gold rates for all purities
  const goldRatesByPurity = {};
  Object.entries(purityMultipliers).forEach(([karat, multiplier]) => {
    const rate = Math.round(roundedGoldRate * multiplier);
    goldRatesByPurity[karat] = {
      rate,
      formatted: `₹${rate.toLocaleString('en-IN')}`,
      purity: `${(multiplier * 100).toFixed(1)}%`,
    };
  });
  
  return {
    rates: {
      gold: {
        '24k': {
          perGram: roundedGoldRate,
          formatted: `₹${roundedGoldRate.toLocaleString('en-IN')}`,
          perTola: Math.round(roundedGoldRate * 11.664), // 1 tola = 11.664 grams
          perKg: roundedGoldRate * 1000,
          usdPerOz: goldUsdPerTroyOz,
          metadata: {
            calculation: `(${goldUsdPerTroyOz.toFixed(2)} USD/oz × ${usdToInrRate.toFixed(2)} INR/USD) ÷ ${TROY_OUNCE_TO_GRAMS}g = ₹${roundedGoldRate}`,
            rawCalculation: `${goldUsdPerTroyOz} × ${usdToInrRate} ÷ ${TROY_OUNCE_TO_GRAMS}`,
            lastUpdated: goldData.updatedAt,
          },
        },
        byPurity: goldRatesByPurity,
      },
      silver: {
        perGram: roundedSilverRate,
        formatted: `₹${roundedSilverRate.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        usdPerOz: silverUsdPerTroyOz,
        note: 'Estimated from gold-silver ratio (80:1)',
      },
      currency: {
        usdToInr: usdToInrRate,
        inrToUsd: 1 / usdToInrRate,
      },
    },
    calculations: {
      goldPerGram: goldRate24KPerGram,
      silverPerGram: silverRatePerGram,
      formula: {
        gold: `(goldUsdPerOz × usdToInrRate) ÷ ${TROY_OUNCE_TO_GRAMS}`,
        example: `(${goldUsdPerTroyOz.toFixed(2)} × ${usdToInrRate.toFixed(2)}) ÷ ${TROY_OUNCE_TO_GRAMS} = ₹${goldRate24KPerGram.toFixed(2)}/gram`,
      },
      baseValues: {
        goldUsdPerOz: goldUsdPerTroyOz,
        silverUsdPerOz: silverUsdPerTroyOz,
        usdToInr: usdToInrRate,
        troyOzToGrams: TROY_OUNCE_TO_GRAMS,
        goldSilverRatio: 80,
      },
    },
    timestamps: {
      gold: goldData.updatedAt,
      exchange: exchangeData.date,
      calculation: new Date().toISOString(),
    },
  };
}

// Fallback rates when API fails
function getFallbackRates() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  
  // Get current UTC time to check if market is open
  const utcHour = now.getUTCHours();
  const isMarketHours = (utcHour >= 0 && utcHour <= 12); // Roughly NY market hours
  
  // Base rate - you can adjust this based on current trends
  let baseGoldRate = 13220; // Based on your ₹13,220 per gram example
  
  // Adjust for market hours
  if (isMarketHours) {
    baseGoldRate += Math.random() * 100; // Some variation during market hours
  }
  
  // Weekend adjustment
  if (day === 0 || day === 6) {
    baseGoldRate *= 0.995; // 0.5% lower on weekends
  }
  
  // Add small random variation (±0.3%)
  const variation = (Math.random() * 0.006) - 0.003;
  const finalGoldRate = Math.round(baseGoldRate * (1 + variation));
  
  // Calculate silver based on current ratio
  const silverRate = Math.round((finalGoldRate / 80) * 100) / 100;
  
  return {
    rates: {
      gold: {
        '24k': {
          perGram: finalGoldRate,
          formatted: `₹${finalGoldRate.toLocaleString('en-IN')}`,
          perTola: Math.round(finalGoldRate * 11.664),
          perKg: finalGoldRate * 1000,
          usdPerOz: 4570.30,
        },
        byPurity: {
          24: { rate: finalGoldRate, formatted: `₹${finalGoldRate.toLocaleString('en-IN')}`, purity: '99.9%' },
          22: { rate: Math.round(finalGoldRate * 0.916), formatted: `₹${Math.round(finalGoldRate * 0.916).toLocaleString('en-IN')}`, purity: '91.6%' },
          20: { rate: Math.round(finalGoldRate * 0.833), formatted: `₹${Math.round(finalGoldRate * 0.833).toLocaleString('en-IN')}`, purity: '83.3%' },
          18: { rate: Math.round(finalGoldRate * 0.750), formatted: `₹${Math.round(finalGoldRate * 0.750).toLocaleString('en-IN')}`, purity: '75.0%' },
          14: { rate: Math.round(finalGoldRate * 0.585), formatted: `₹${Math.round(finalGoldRate * 0.585).toLocaleString('en-IN')}`, purity: '58.5%' },
        },
        metadata: {
          note: 'Using estimated market rate (fallback mode)',
        },
      },
      silver: {
        perGram: silverRate,
        formatted: `₹${silverRate.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        note: 'Estimated from gold-silver ratio (80:1)',
      },
      currency: {
        usdToInr: 89.86,
      },
    },
    timestamp: now.toISOString(),
    note: 'Fallback rates are being used due to API failure',
  };
}

export const dynamic = 'force-dynamic';