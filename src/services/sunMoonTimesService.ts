import * as SunCalc from 'suncalc';

interface SunMoonTimes {
  solarSunrise: string;
  solarSunset: string;
  lunarSunrise: string;
  lunarSunset: string;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function getSunMoonTimes(
  dateISO: string, 
  timezone: string = 'Europe/Zurich',
  latitude: number = 46.2044,
  longitude: number = 6.1432
): SunMoonTimes {
  const date = new Date(dateISO + 'T12:00:00');
  
  // Use SunCalc for precise solar calculations
  const solarTimes = SunCalc.getTimes(date, latitude, longitude);
  
  // Use SunCalc for precise lunar calculations
  const lunarTimes = SunCalc.getMoonTimes(date, latitude, longitude);
  
  return {
    solarSunrise: formatTime(solarTimes.sunrise),
    solarSunset: formatTime(solarTimes.sunset),
    lunarSunrise: lunarTimes.rise ? formatTime(lunarTimes.rise) : '--:--',
    lunarSunset: lunarTimes.set ? formatTime(lunarTimes.set) : '--:--'
  };
}