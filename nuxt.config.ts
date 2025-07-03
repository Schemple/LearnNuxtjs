// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: false,

  css: [
    '~/assets/css/main.css',
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

  plugins: [
    '~/plugins/sweetalert2.client.js'
  ],

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
    options: {
      theme: {
        preset: Aura
      }
    }
  },

  build: {
    
  },
  
  runtimeConfig: {
    public: {
      appName: 'Quản lý Tòa nhà - Thành phố Hà Nội',
      appVersion: '1.0.0',
      // apiBase: 'https://6865f1a489803950dbb0b106.mockapi.io/api/'
      apiBase: 'http://localhost:3000/api/'
    }
  }
})