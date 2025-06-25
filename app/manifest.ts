import { type MetadataRoute } from 'next';

import { AppInfo } from '@/constants/app-info';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: AppInfo.APP_NAME,
    short_name: AppInfo.APP_NAME,
    description: AppInfo.APP_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  };
}
