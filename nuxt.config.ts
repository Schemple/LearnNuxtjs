// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  ssr: false,

  css: [
    '~/assets/css/main.css',
    '~/assets/css/bootstrap.css'
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
      // link: [
      //   { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      //   {
      //     rel: 'stylesheet',
      //     href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
      //     integrity: 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=',
      //     crossorigin: ''
      //   }
      // ],
      // script: [
      //   {
      //     src: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
      //     integrity: 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=',
      //     crossorigin: '',
      //     body: true // Load script in the body
      //   }
      // ]
    }
  },

  plugins: [
    // '~/plugins/bootstrap.client.js',
    '~/plugins/sweetalert2.client.js'
  ],
  
  modules: [
    // '@pinia/nuxt',
  ],
  
  build: {
    
  },
  
  runtimeConfig: {
    public: {
      appName: 'Quản lý Tòa nhà - Thành phố Hà Nội',
      appVersion: '1.0.0'
    }
  }
})