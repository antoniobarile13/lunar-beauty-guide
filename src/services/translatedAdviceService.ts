import { BeautyCategory, BadgeType, BeautyAdviceItem, DailyAdvice, MoonPhase } from "@/types/lunar";
import { getMoonPhase } from "./moonService";
import { useTranslation } from "react-i18next";

// Map score to badge type
function scoreToBadge(score: number): BadgeType {
  if (score >= 2) return 'Excellent';
  if (score === 1) return 'Good';
  if (score === 0) return 'Neutral';
  if (score === -1) return 'NotIdeal';
  return 'Avoid'; // score <= -2
}

// Score mapping for each phase and category
const phaseScores: Record<MoonPhase, Record<BeautyCategory, number>> = {
  NEW: { cut: -1, color: 0, wax: 1, treat: 1 },
  WAXING_CRESCENT: { cut: 1, color: 1, wax: 0, treat: 1 },
  FIRST_QUARTER: { cut: 2, color: 1, wax: -1, treat: 1 },
  WAXING_GIBBOUS: { cut: 2, color: 2, wax: -1, treat: 1 },
  FULL: { cut: 0, color: 1, wax: -2, treat: 2 },
  WANING_GIBBOUS: { cut: -1, color: 0, wax: 1, treat: 2 },
  LAST_QUARTER: { cut: -1, color: -1, wax: 2, treat: 1 },
  WANING_CRESCENT: { cut: -1, color: 0, wax: 2, treat: 1 }
};

// Get advice using i18n translations
export function getTranslatedAdviceForPhase(phase: MoonPhase, t: (key: string) => string): Record<BeautyCategory, BeautyAdviceItem> {
  const scores = phaseScores[phase];
  
  if (!scores) {
    throw new Error(`No scores found for phase: ${phase}`);
  }
  
  const categories: BeautyCategory[] = ['cut', 'color', 'wax', 'treat'];
  const result: Record<BeautyCategory, BeautyAdviceItem> = {} as Record<BeautyCategory, BeautyAdviceItem>;
  
  categories.forEach(category => {
    const score = scores[category];
    result[category] = {
      score,
      title: t(`explanations.${category}.${phase}.title`),
      text: t(`explanations.${category}.${phase}.text`),
      badge: scoreToBadge(score)
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

// Generate complete daily advice using translations
export function getTranslatedDailyAdvice(dateISO: string, timezone: string = 'Europe/Zurich', t: (key: string) => string): DailyAdvice {
  const moonPhase = getMoonPhase(dateISO, timezone);
  const items = getTranslatedAdviceForPhase(moonPhase.phase, t);
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

// Get today's advice with translations
export function getTranslatedTodayAdvice(timezone: string = 'Europe/Zurich', t: (key: string) => string): DailyAdvice {
  const today = new Date().toISOString().split('T')[0];
  return getTranslatedDailyAdvice(today, timezone, t);
}