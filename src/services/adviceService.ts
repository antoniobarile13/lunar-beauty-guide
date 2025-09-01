import { BeautyCategory, BadgeType, BeautyAdviceItem, DailyAdvice, MoonPhase, AdviceRules } from "@/types/lunar";
import { getMoonPhase } from "./moonService";
import adviceRulesData from "@/data/adviceRules.json";

// Cast the imported JSON to our AdviceRules type
const adviceRules: AdviceRules = adviceRulesData as AdviceRules;

// Map score to badge type
function scoreToBadge(score: number): BadgeType {
  if (score >= 2) return 'Excellent';
  if (score === 1) return 'Good';
  if (score === 0) return 'Neutral';
  if (score === -1) return 'NotIdeal';
  return 'Avoid'; // score <= -2
}

// Get advice for a specific phase and locale
export function getAdviceForPhase(phase: MoonPhase, locale: 'it' | 'en' | 'de' | 'es' | 'fr' | 'pt' = 'it'): Record<BeautyCategory, BeautyAdviceItem> {
  const phaseRules = adviceRules[phase];
  
  if (!phaseRules) {
    throw new Error(`No advice rules found for phase: ${phase}`);
  }
  
  const categories: BeautyCategory[] = ['cut', 'color', 'wax', 'treat'];
  const result: Record<BeautyCategory, BeautyAdviceItem> = {} as Record<BeautyCategory, BeautyAdviceItem>;
  
  categories.forEach(category => {
    const rule = phaseRules[category];
    // Use Italian text for Italian, English for others as fallback
    const useItalian = locale === 'it';
    result[category] = {
      score: rule.score,
      title: useItalian ? rule.title_it : rule.title_en,
      text: useItalian ? rule.text_it : rule.text_en,
      badge: scoreToBadge(rule.score)
    };
  });
  
  return result;
}

// Determine the best category for the day (highest score, with priority order as tiebreaker)
function getBestCategory(items: Record<BeautyCategory, BeautyAdviceItem>): BeautyCategory {
  const priorities: BeautyCategory[] = ['cut', 'color', 'wax', 'treat'];
  let bestCategory: BeautyCategory = 'cut';
  let bestScore = items.cut.score;
  
  priorities.forEach(category => {
    const score = items[category].score;
    if (score > bestScore || (score === bestScore && category === priorities[0])) {
      bestScore = score;
      bestCategory = category;
    }
  });
  
  return bestCategory;
}

// Generate complete daily advice
export function getDailyAdvice(dateISO: string, timezone: string = 'Europe/Zurich', locale: 'it' | 'en' | 'de' | 'es' | 'fr' | 'pt' = 'it'): DailyAdvice {
  const moonPhase = getMoonPhase(dateISO, timezone);
  const items = getAdviceForPhase(moonPhase.phase, locale);
  const bestCategory = getBestCategory(items);
  
  return {
    dateISO,
    tz: timezone,
    phase: moonPhase.phase,
    illumination: moonPhase.illumination,
    ageDays: moonPhase.ageDays,
    zodiacSign: moonPhase.zodiacSign,
    bestCategory,
    items
  };
}

// Generate advice for multiple days (for calendar seeding)
export function generateDailyAdviceRange(
  startDate: string, 
  endDate: string, 
  timezone: string = 'Europe/Zurich',
  locale: 'it' | 'en' | 'de' | 'es' | 'fr' | 'pt' = 'it'
): DailyAdvice[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const results: DailyAdvice[] = [];
  
  const current = new Date(start);
  while (current <= end) {
    const dateISO = current.toISOString().split('T')[0];
    results.push(getDailyAdvice(dateISO, timezone, locale));
    current.setDate(current.getDate() + 1);
  }
  
  return results;
}

// Cache for daily advice (90 days as specified)
const adviceCache = new Map<string, DailyAdvice>();
const CACHE_DURATION = 90; // days

export function getCachedDailyAdvice(dateISO: string, timezone: string = 'Europe/Zurich', locale: 'it' | 'en' | 'de' | 'es' | 'fr' | 'pt' = 'it'): DailyAdvice {
  const cacheKey = `advice:${dateISO}:${timezone}:${locale}`;
  
  if (adviceCache.has(cacheKey)) {
    return adviceCache.get(cacheKey)!;
  }
  
  const advice = getDailyAdvice(dateISO, timezone, locale);
  
  // Clean old cache entries if we have too many
  if (adviceCache.size > CACHE_DURATION * 2) {
    const oldestKeys = Array.from(adviceCache.keys()).slice(0, CACHE_DURATION);
    oldestKeys.forEach(key => adviceCache.delete(key));
  }
  
  adviceCache.set(cacheKey, advice);
  return advice;
}

// Get today's advice (convenience function)
export function getTodayAdvice(timezone: string = 'Europe/Zurich', locale: 'it' | 'en' | 'de' | 'es' | 'fr' | 'pt' = 'it'): DailyAdvice {
  const today = new Date().toISOString().split('T')[0];
  return getCachedDailyAdvice(today, timezone, locale);
}