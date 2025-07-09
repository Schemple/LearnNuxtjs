// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: false,

  css: [
    '~/assets/styles.css',
    '~/assets/styles.scss'
  ],
  
  app: {
    head: {
      title: 'Quản lý Tòa nhà - Thành phố Hà Nội',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Hệ thống quản lý thông tin các tòa nhà trên địa bàn Thành phố Hà Nội' },
        { name: 'keywords', content: 'quản lý tòa nhà, Hà Nội, building management' }
      ],
    }
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  
  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/leaflet'
  ],

  primevue: {
    // usePrimeVue: false,
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark'
        }
      }
    }
  },

  build: {
    
  },
  
  runtimeConfig: {
    public: {
      appName: 'Quản lý Tòa nhà - Thành phố Hà Nội',
      appVersion: '1.0.0',
      apiBase: 'http://localhost:3000/api/'
    }
  }
})