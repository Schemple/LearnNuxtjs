<!-- components/Layout/AppHeader.vue -->
<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
    <div class="container">
        <a class="navbar-brand" href="#">
            <i class="fas fa-building me-2"></i>
            Quản lý Tòa nhà Hà Nội
        </a>
    </div>
</nav>
</template>

<script setup>
</script>

<style scoped>
.header-actions {
margin-top: 1rem;
}

@media (max-width: 768px) {
.header-actions {
    margin-top: 1rem;
    text-align: center !important;
}

.btn {
    margin: 0.25rem;
}
}
</style>