import { MoonPhase, MoonPhaseResult, ZodiacSign } from "@/types/lunar";

// Astronomical constants
const SYNODIC_MONTH = 29.530588; // days
const KNOWN_NEW_MOON = new Date('2000-01-06T18:14:00Z'); // Known new moon reference

// Calculate moon's zodiac sign based on approximate lunar longitude
function calculateMoonZodiacSign(date: Date): ZodiacSign {
  const J2000 = new Date('2000-01-01T12:00:00Z');
  const daysSinceJ2000 = (date.getTime() - J2000.getTime()) / (1000 * 60 * 60 * 24);
  
  // Simplified lunar longitude calculation (moon moves ~13.2° per day)
  let moonLongitude = (280 + daysSinceJ2000 * 13.176396) % 360;
  if (moonLongitude < 0) moonLongitude += 360;
  
  // Map longitude to zodiac signs (each sign = 30°)
  const signs: ZodiacSign[] = [
    'ARIES', 'TAURUS', 'GEMINI', 'CANCER', 'LEO', 'VIRGO',
    'LIBRA', 'SCORPIO', 'SAGITTARIUS', 'CAPRICORN', 'AQUARIUS', 'PISCES'
  ];
  
  const signIndex = Math.floor(moonLongitude / 30);
  return signs[signIndex];
}

// Moon phase emojis and icons
const MOON_DATA = {
  NEW: { emoji: '🌑', iconName: 'new-moon' },
  WAXING_CRESCENT: { emoji: '🌒', iconName: 'waxing-crescent' },
  FIRST_QUARTER: { emoji: '🌓', iconName: 'first-quarter' },
  WAXING_GIBBOUS: { emoji: '🌔', iconName: 'waxing-gibbous' },
  FULL: { emoji: '🌕', iconName: 'full-moon' },
  WANING_GIBBOUS: { emoji: '🌖', iconName: 'waning-gibbous' },
  LAST_QUARTER: { emoji: '🌗', iconName: 'last-quarter' },
  WANING_CRESCENT: { emoji: '🌘', iconName: 'waning-crescent' }
};

// Convert date to Julian Day Number for astronomical calculations
function toJulianDay(date: Date): number {
  return (date.getTime() / 86400000) + 2440587.5;
}

// Calculate moon age in days from a reference new moon
function calculateMoonAge(date: Date): number {
  const julianDay = toJulianDay(date);
  const referenceJulian = toJulianDay(KNOWN_NEW_MOON);
  const daysSinceReference = julianDay - referenceJulian;
  
  // Calculate cycles since reference and get remainder
  const cycles = Math.floor(daysSinceReference / SYNODIC_MONTH);
  const ageInCycle = daysSinceReference - (cycles * SYNODIC_MONTH);
  
  return ageInCycle >= 0 ? ageInCycle : ageInCycle + SYNODIC_MONTH;
}

// Determine moon phase based on age
function getPhaseFromAge(ageInDays: number): MoonPhase {
  const normalizedAge = ageInDays % SYNODIC_MONTH;
  
  if (normalizedAge < 1.84566) return 'NEW';
  if (normalizedAge < 5.53699) return 'WAXING_CRESCENT';
  if (normalizedAge < 9.22831) return 'FIRST_QUARTER';
  if (normalizedAge < 12.91963) return 'WAXING_GIBBOUS';
  if (normalizedAge < 16.61096) return 'FULL';
  if (normalizedAge < 20.30228) return 'WANING_GIBBOUS';
  if (normalizedAge < 23.99361) return 'LAST_QUARTER';
  if (normalizedAge < 27.68493) return 'WANING_CRESCENT';
  return 'NEW';
}

// Calculate illumination percentage
function calculateIllumination(ageInDays: number): number {
  const normalizedAge = ageInDays % SYNODIC_MONTH;
  const angle = (normalizedAge / SYNODIC_MONTH) * 2 * Math.PI;
  
  // Illumination follows a cosine curve, adjusted to 0-1 range
  const illumination = (1 - Math.cos(angle)) / 2;
  return Math.max(0, Math.min(1, illumination));
}

// Cache for moon phase calculations
const phaseCache = new Map<string, MoonPhaseResult>();

export function getMoonPhase(dateISO: string, timezone: string = 'Europe/Zurich'): MoonPhaseResult {
  const cacheKey = `phase:${dateISO}:${timezone}`;
  
  if (phaseCache.has(cacheKey)) {
    return phaseCache.get(cacheKey)!;
  }
  
  // Parse date and adjust for timezone
  const date = new Date(dateISO);
  
  // Calculate moon age and phase
  const ageInDays = calculateMoonAge(date);
  const phase = getPhaseFromAge(ageInDays);
  const illumination = calculateIllumination(ageInDays);
  
  const result: MoonPhaseResult = {
    phase,
    illumination,
    ageDays: ageInDays,
    emoji: MOON_DATA[phase].emoji,
    iconName: MOON_DATA[phase].iconName,
    zodiacSign: calculateMoonZodiacSign(date)
  };
  
  // Cache the result
  phaseCache.set(cacheKey, result);
  
  return result;
}

// Mock API endpoint for future API integration
export async function fetchPhaseFromAPI(dateISO: string, timezone: string): Promise<MoonPhaseResult> {
  // This would be replaced with actual API call when USE_API=true
  const mockDelay = Math.random() * 500 + 200; // 200-700ms delay
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMoonPhase(dateISO, timezone));
    }, mockDelay);
  });
}

// Generate moon phases for a date range (for seeding calendar)
export function generateMoonPhases(startDate: string, endDate: string, timezone: string = 'Europe/Zurich'): MoonPhaseResult[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const results: MoonPhaseResult[] = [];
  
  const current = new Date(start);
  while (current <= end) {
    const dateISO = current.toISOString().split('T')[0];
    results.push(getMoonPhase(dateISO, timezone));
    current.setDate(current.getDate() + 1);
  }
  
  return results;
}