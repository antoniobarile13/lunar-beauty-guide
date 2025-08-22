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
      style: 'default', // Si adatta automaticamente al tema del sistema
      backgroundColor: 'transparent', // Trasparente per seguire il tema
      overlay: false // Non sovrapporre il contenuto
    }
  }
};

export default config;