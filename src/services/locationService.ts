import { Geolocation } from '@capacitor/geolocation';
import type { LocationData } from '@/store/appStore';

export class LocationService {
  private static instance: LocationService;
  private currentLocation: LocationData | null = null;
  
  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  async getCurrentPosition(): Promise<LocationData> {
    try {
      // Check permissions first
      const permission = await Geolocation.checkPermissions();
      
      if (permission.location !== 'granted') {
        const requestResult = await Geolocation.requestPermissions();
        if (requestResult.location !== 'granted') {
          throw new Error('Location permission denied');
        }
      }

      // Get current position
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 300000 // 5 minutes cache
      });

      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: Date.now()
      };

      this.currentLocation = locationData;
      return locationData;
    } catch (error) {
      console.error('Error getting location:', error);
      // Fallback to Geneva coordinates if location fails
      return {
        latitude: 46.2044,
        longitude: 6.1432,
        timestamp: Date.now()
      };
    }
  }

  getCachedLocation(): LocationData | null {
    return this.currentLocation;
  }

  isLocationFresh(location: LocationData, maxAge: number = 300000): boolean {
    return Date.now() - location.timestamp < maxAge;
  }
}

export const locationService = LocationService.getInstance();