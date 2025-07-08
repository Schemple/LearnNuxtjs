// plugins/primevue.ts
import PrimeVue from 'primevue/config'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    unstyled: true
  })
  console.log('PrimeVue plugin loaded')
})
