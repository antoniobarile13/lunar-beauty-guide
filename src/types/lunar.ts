export type MoonPhase =
  | 'NEW' | 'WAXING_CRESCENT' | 'FIRST_QUARTER' | 'WAXING_GIBBOUS'
  | 'FULL' | 'WANING_GIBBOUS' | 'LAST_QUARTER' | 'WANING_CRESCENT';

export type BeautyCategory = 'cut' | 'color' | 'wax' | 'treat';

export type BadgeType = 'Excellent' | 'Good' | 'Neutral' | 'NotIdeal' | 'Avoid';

export interface MoonPhaseResult {
  phase: MoonPhase;
  illumination: number; // 0-1
  ageDays: number; // 0-29.53
  emoji: string;
  iconName: string;
}

export interface BeautyAdviceItem {
  score: number;
  title: string;
  text: string;
  badge: BadgeType;
}

export interface DailyAdvice {
  dateISO: string;
  tz: string;
  phase: MoonPhase;
  illumination: number;
  ageDays: number;
  bestCategory: BeautyCategory;
  items: Record<BeautyCategory, BeautyAdviceItem>;
}

export interface AdviceRule {
  score: number;
  title_it: string;
  text_it: string;
  title_en: string;
  text_en: string;
}

export interface AdviceRules {
  [phase: string]: {
    cut: AdviceRule;
    color: AdviceRule;
    wax: AdviceRule;
    treat: AdviceRule;
  };
}