import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AppSettings {
  language: 'it' | 'en' | 'de' | 'es' | 'fr' | 'pt';
  timezone: string;
  notifications: boolean;
  reminderTime: string;
}

interface AppState {
  settings: AppSettings;
  currentDate: string;
  selectedDate: string | null;
  updateSettings: (settings: Partial<AppSettings>) => void;
  setCurrentDate: (date: string) => void;
  setSelectedDate: (date: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      settings: {
        language: 'it',
        timezone: 'Europe/Zurich',
        notifications: false,
        reminderTime: '09:00'
      },
      currentDate: new Date().toISOString().split('T')[0],
      selectedDate: null,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
      setCurrentDate: (date) => set({ currentDate: date }),
      setSelectedDate: (date) => set({ selectedDate: date })
    }),
    {
      name: 'lunar-beauty-storage'
    }
  )
);