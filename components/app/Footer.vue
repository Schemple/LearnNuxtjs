<!-- components/Layout/AppFooter.vue -->
<template>
<footer class="app-footer bg-light py-4 mt-5">
    <div class="container">
    <div class="row">
        <div class="col-md-6">
        <h6 class="mb-3">
            <i class="fas fa-building me-2"></i>
            Hệ thống Quản lý Tòa nhà
        </h6>
        <p class="text-muted mb-2">
            Phiên bản {{ $config.public.appVersion }}
        </p>
        <p class="text-muted mb-0">
            © {{ currentYear }} - Thành phố Hà Nội
        </p>
        </div>
        <div class="col-md-6">
        <h6 class="mb-3">Thông tin liên hệ</h6>
        <div class="contact-info">
            <p class="mb-2">
            <i class="fas fa-map-marker-alt me-2"></i>
            Thành phố Hà Nội
            </p>
            <p class="mb-2">
            <i class="fas fa-phone me-2"></i>
            Hotline: 1900-1234
            </p>
            <p class="mb-0">
            <i class="fas fa-envelope me-2"></i>
            info@hanoi.vn
            </p>
        </div>
        </div>
    </div>
    <hr class="my-4">
    <div class="row align-items-center">
        <div class="col-md-6">
        <p class="text-muted mb-0">
            Được xây dựng bằng Nuxt.js & Vue.js
        </p>
        </div>
        <div class="col-md-6 text-end">
        <div class="social-links">
            <a href="#" class="text-muted me-3" title="Facebook">
            <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="text-muted me-3" title="Twitter">
            <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="text-muted" title="LinkedIn">
            <i class="fab fa-linkedin-in"></i>
            </a>
        </div>
        </div>
    </div>
    </div>
</footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
const config = useRuntimeConfig()
</script>

<style scoped>
.app-footer {
border-top: 1px solid #dee2e6;
margin-top: auto;
}

.contact-info p {
font-size: 0.9rem;
}

.social-links a {
font-size: 1.2rem;
transition: color 0.3s ease;
}

.social-links a:hover {
color: #667eea !important;
}

@media (max-width: 768px) {
.text-end {
    text-align: left !important;
    margin-top: 1rem;
}
}
</style>