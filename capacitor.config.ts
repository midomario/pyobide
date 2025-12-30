import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pyobide.app',
  appName: 'PyobIDE',
  webDir: 'www'
,
    android: {
       buildOptions: {
          keystorePath: 'undefined',
          keystoreAlias: 'undefined',
          signingType: 'apksigner',
       }
    }
  };

export default config;
