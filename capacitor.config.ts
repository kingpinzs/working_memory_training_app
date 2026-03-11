import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.workingmemorylab.app',
  appName: 'Working Memory Lab',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
