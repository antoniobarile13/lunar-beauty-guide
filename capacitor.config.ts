import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.antoniobarile.lunarbeautyguide',
  appName: 'Lunar Beauty Guide',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    StatusBar: {
      style: 'light',
      backgroundColor: '#8B5AA6',
      overlay: false
    }
  }
};

export default config;