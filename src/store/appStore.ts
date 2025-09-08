import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AppSettings {
  language: 'it' | 'en';
  timezone: string;
  notifications: boolean;
  reminderTime: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: number;
}

interface AppState {
  settings: AppSettings;
  currentDate: string;
  selectedDate: string | null;
  location: LocationData | null;
  updateSettings: (settings: Partial<AppSettings>) => void;
  setCurrentDate: (date: string) => void;
  setSelectedDate: (date: string | null) => void;
  setLocation: (location: LocationData | null) => void;
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
      location: null,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
      setCurrentDate: (date) => set({ currentDate: date }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      setLocation: (location) => set({ location })
    }),
    {
      name: 'lunar-beauty-storage'
    }
  )
);