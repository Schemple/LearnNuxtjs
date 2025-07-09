<script setup>
const model = ref([
    {
        label: 'Home',
        items: [
            { label: 'Danh sách tòa nhà', icon: 'pi pi-fw pi-table', to: '/' },
            { label: 'Map', icon: 'pi pi-fw pi-map', to: '/map' },

        ]
    }, 
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <AppMenuItem v-if="!item.separator" :item="item" :index="i"></AppMenuItem>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>