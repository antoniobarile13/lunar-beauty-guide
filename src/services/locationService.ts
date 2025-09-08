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
      console.log('Checking location permissions...');
      
      // Check permissions first
      const permission = await Geolocation.checkPermissions();
      console.log('Current permission status:', permission);
      
      if (permission.location !== 'granted') {
        console.log('Requesting location permissions...');
        const requestResult = await Geolocation.requestPermissions();
        console.log('Permission request result:', requestResult);
        
        if (requestResult.location !== 'granted') {
          throw new Error('Location permission denied');
        }
      }

      console.log('Getting current position...');
      // Get current position with more aggressive settings
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 30000, // Increased timeout
        maximumAge: 60000 // 1 minute cache
      });

      console.log('Position obtained:', position);

      const locationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: Date.now()
      };

      this.currentLocation = locationData;
      console.log('Location service updated with:', locationData);
      return locationData;
    } catch (error) {
      console.error('Error getting location:', error);
      console.log('Using fallback location (Geneva)');
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