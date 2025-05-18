import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'src', 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'images/icons/*.png'],
      manifest: {
        name: 'Your App Name',
        short_name: 'AppShort',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4a90e2',
        icons: [
          { src: '/images/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/images/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
        ],
        shortcuts: [
          {
            name: 'Tambah Data',
            short_name: 'Tambah',
            url: '/#/add',
            icons: [{ src: '/images/icons/shortcut-add.png', sizes: '96x96', type: 'image/png' }]
          }
        ],
        screenshots: [
          { src: '/screenshots/desktop.png', sizes: '1024x768', type: 'image/png' },
          { src: '/screenshots/mobile.png', sizes: '360x640', type: 'image/png' }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/your-api-domain\.com\/api\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 86400 },
            },
          },
        ],
      },
    }),
  ],
});
