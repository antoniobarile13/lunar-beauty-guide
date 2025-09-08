// Solar and Lunar rise/set calculations

interface SunMoonTimes {
  solarSunrise: string;
  solarSunset: string;
  lunarSunrise: string;
  lunarSunset: string;
}

// Calculate approximate sunrise/sunset times
function calculateSolarTimes(date: Date, latitude: number = 46.2044, longitude: number = 6.1432): { sunrise: Date; sunset: Date } {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const declination = 23.45 * Math.sin(Math.PI * (284 + dayOfYear) / 180);
  const hourAngle = Math.acos(-Math.tan(latitude * Math.PI / 180) * Math.tan(declination * Math.PI / 180)) * 180 / Math.PI;
  
  const solarNoon = 12 - longitude / 15;
  const sunrise = new Date(date);
  const sunset = new Date(date);
  
  sunrise.setHours(Math.floor(solarNoon - hourAngle / 15), Math.floor((solarNoon - hourAngle / 15) % 1 * 60));
  sunset.setHours(Math.floor(solarNoon + hourAngle / 15), Math.floor((solarNoon + hourAngle / 15) % 1 * 60));
  
  return { sunrise, sunset };
}

// Calculate approximate lunar rise/set times
function calculateLunarTimes(date: Date, latitude: number = 46.2044): { moonrise: Date; moonset: Date } {
  // Simplified lunar calculation - in reality this is much more complex
  const daysSinceEpoch = (date.getTime() - new Date('2000-01-01').getTime()) / 86400000;
  const lunarPhaseAngle = (daysSinceEpoch * 360 / 29.53) % 360;
  
  // Approximate lunar transit time based on phase
  const lunarTransit = 12 + (lunarPhaseAngle / 360) * 24;
  
  const moonrise = new Date(date);
  const moonset = new Date(date);
  
  // Moon rises approximately 50 minutes later each day
  const riseOffset = (lunarPhaseAngle / 360) * 24;
  const setOffset = riseOffset + 12; // Moon is up for roughly 12 hours
  
  moonrise.setHours(Math.floor(riseOffset), Math.floor((riseOffset % 1) * 60));
  moonset.setHours(Math.floor(setOffset % 24), Math.floor((setOffset % 1) * 60));
  
  // Adjust for next day if needed
  if (setOffset >= 24) {
    moonset.setDate(moonset.getDate() + 1);
  }
  
  return { moonrise, moonset };
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
  const date = new Date(dateISO + 'T12:00:00'); // Use noon to avoid timezone issues
  
  const solar = calculateSolarTimes(date, latitude, longitude);
  const lunar = calculateLunarTimes(date, latitude);
  
  return {
    solarSunrise: formatTime(solar.sunrise),
    solarSunset: formatTime(solar.sunset),
    lunarSunrise: formatTime(lunar.moonrise),
    lunarSunset: formatTime(lunar.moonset)
  };
}