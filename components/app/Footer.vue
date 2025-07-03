<!-- components/app/Footer.vue -->
<script setup>
const currentYear = new Date().getFullYear()
const config = useRuntimeConfig()
</script>

<template>
  <footer class="bg-gray-100 py-8 mt-12 border-t border-gray-200">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Left Column -->
        <div>
          <h6 class="text-lg font-semibold mb-4 text-gray-800">
            <i class="fas fa-building mr-2"></i>
            Hệ thống Quản lý Tòa nhà
          </h6>
          <p class="text-gray-600 mb-2 text-sm">
            Phiên bản {{ $config.public.appVersion }}
          </p>
          <p class="text-gray-600 mb-0 text-sm">
            © {{ currentYear }} - Thành phố Hà Nội
          </p>
        </div>
        
        <!-- Right Column -->
        <div>
          <h6 class="text-lg font-semibold mb-4 text-gray-800">Thông tin liên hệ</h6>
          <div class="space-y-2">
            <p class="text-gray-600 text-sm flex items-center">
              <i class="fas fa-map-marker-alt mr-2 w-4"></i>
              Thành phố Hà Nội
            </p>
            <p class="text-gray-600 text-sm flex items-center">
              <i class="fas fa-phone mr-2 w-4"></i>
              Hotline: 1900-1234
            </p>
            <p class="text-gray-600 text-sm flex items-center">
              <i class="fas fa-envelope mr-2 w-4"></i>
              info@hanoi.vn
            </p>
          </div>
        </div>
      </div>
      
      <!-- Divider -->
      <hr class="my-8 border-gray-300">
      
      <!-- Bottom Row -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <p class="text-gray-600 mb-0 text-sm">
            Được xây dựng bằng Nuxt.js & Vue.js
          </p>
        </div>
        <div class="text-left md:text-right mt-4 md:mt-0">
          <div class="flex space-x-4 md:justify-end">
            <a href="#" class="text-gray-600 hover:text-indigo-500 transition-colors duration-300" title="Facebook">
              <i class="fab fa-facebook-f text-lg"></i>
            </a>
            <a href="#" class="text-gray-600 hover:text-indigo-500 transition-colors duration-300" title="Twitter">
              <i class="fab fa-twitter text-lg"></i>
            </a>
            <a href="#" class="text-gray-600 hover:text-indigo-500 transition-colors duration-300" title="LinkedIn">
              <i class="fab fa-linkedin-in text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>