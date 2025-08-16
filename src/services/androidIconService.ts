import { MoonPhase } from '@/types/lunar';
import { getMoonPhase } from './moonService';
import { Capacitor } from '@capacitor/core';

// Icon mapping for each moon phase
const PHASE_ICON_MAP: Record<MoonPhase, string> = {
  NEW: 'moon_new',
  WAXING_CRESCENT: 'moon_waxing_crescent', 
  FIRST_QUARTER: 'moon_first_quarter',
  WAXING_GIBBOUS: 'moon_waxing_gibbous',
  FULL: 'moon_full',
  WANING_GIBBOUS: 'moon_waning_gibbous',
  LAST_QUARTER: 'moon_last_quarter',
  WANING_CRESCENT: 'moon_waning_crescent'
};

export class AndroidIconService {
  /**
   * Updates the app shortcuts to show current moon phase
   */
  static async updateMoonPhaseShortcuts(): Promise<void> {
    if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') {
      return;
    }

    try {
      const today = new Date().toISOString().split('T')[0];
      const currentPhase = getMoonPhase(today);
      
      // Update shortcuts using Capacitor plugin
      if ((window as any).ShortcutManager) {
        await (window as any).ShortcutManager.updateShortcuts({
          shortcuts: [
            {
              id: PHASE_ICON_MAP[currentPhase.phase],
              icon: `ic_launcher_${currentPhase.iconName}`,
              shortLabel: this.getPhaseLabel(currentPhase.phase),
              longLabel: `Today is ${this.getPhaseLabel(currentPhase.phase)}`,
              intent: {
                action: 'android.intent.action.VIEW',
                data: `lunarguide://moon/${currentPhase.iconName}`
              }
            }
          ]
        });
      }
    } catch (error) {
      console.warn('Failed to update moon phase shortcuts:', error);
    }
  }

  /**
   * Initialize daily shortcut updates
   */
  static initDailyUpdates(): void {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    // Update immediately
    this.updateMoonPhaseShortcuts();

    // Schedule daily updates at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    
    setTimeout(() => {
      this.updateMoonPhaseShortcuts();
      // Then update every 24 hours
      setInterval(() => {
        this.updateMoonPhaseShortcuts();
      }, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
  }

  private static getPhaseLabel(phase: MoonPhase): string {
    const labels: Record<MoonPhase, string> = {
      NEW: 'New Moon',
      WAXING_CRESCENT: 'Waxing Crescent',
      FIRST_QUARTER: 'First Quarter',
      WAXING_GIBBOUS: 'Waxing Gibbous', 
      FULL: 'Full Moon',
      WANING_GIBBOUS: 'Waning Gibbous',
      LAST_QUARTER: 'Last Quarter',
      WANING_CRESCENT: 'Waning Crescent'
    };
    return labels[phase];
  }
}